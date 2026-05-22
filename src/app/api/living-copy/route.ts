import { NextRequest, NextResponse } from "next/server"
import {
  HOME_LIVING_TEXT_SLOTS,
  getFallbackLivingCopy,
  getFallbackLivingSlotCopy,
  homeLivingTextSlotById,
  intentProfiles,
  type HomeIntent,
  type IntentScoreMap,
  type LivingCopy,
  type LivingSlotCopyMap,
  type LivingTextSlot,
  type LivingTextSlotId,
} from "@/lib/home-content"
import { isHomeIntent, sanitizeIntentScores } from "@/lib/living-home"

export const dynamic = "force-dynamic"

type LivingCopySource = "ai" | "fallback"

type LivingCopyResponse = {
  copy: LivingCopy
  source: LivingCopySource
  provider: LivingCopyProvider
  configured: boolean
  model?: string
  cached?: boolean
  reason?: string
}

type LivingSlotCopyResponse = {
  slots: LivingSlotCopyMap
  source: LivingCopySource
  provider: LivingCopyProvider
  configured: boolean
  model?: string
  cached?: boolean
  reason?: string
}

type LivingCopyProvider = "openrouter" | "groq" | "gemini" | "local"

type ConfiguredProvider = {
  provider: Exclude<LivingCopyProvider, "local">
  apiKey: string
  env: string
  model: string
}

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
}

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string | Array<{ text?: string }>
    }
  }>
  model?: string
}

type CacheEntry = {
  expiresAt: number
  copy: LivingCopy
  provider: Exclude<LivingCopyProvider, "local">
  model: string
}

type SlotCacheEntry = {
  expiresAt: number
  slots: LivingSlotCopyMap
  provider: Exclude<LivingCopyProvider, "local">
  model: string
}

const DEFAULT_OPENROUTER_MODEL = "openrouter/free"
const DEFAULT_GROQ_MODEL = "llama-3.1-8b-instant"
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash-lite"
const CACHE_TTL_MS = 10 * 60 * 1000
const cache = new Map<string, CacheEntry>()
const slotCache = new Map<string, SlotCacheEntry>()

export async function GET() {
  const providers = getConfiguredProviders()
  const activeProvider = providers[0]

  return NextResponse.json(
    {
      ok: true,
      provider: activeProvider?.provider ?? "local",
      configured: providers.length > 0,
      model: activeProvider?.model ?? DEFAULT_OPENROUTER_MODEL,
      env: activeProvider?.env ?? "OPENROUTER_API_KEY | GROQ_API_KEY | GEMINI_API_KEY",
      availableProviders: {
        openrouter: Boolean(process.env.OPENROUTER_API_KEY),
        groq: Boolean(process.env.GROQ_API_KEY),
        gemini: Boolean(getGeminiApiKey()),
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  )
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request)
  const rawIntent =
    typeof body?.intent === "string" ? body.intent : typeof body?.activeIntent === "string" ? body.activeIntent : null

  if (!isHomeIntent(rawIntent)) {
    return NextResponse.json(
      {
        error: "A valid home intent is required.",
        validIntents: Object.keys(intentProfiles),
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    )
  }

  const intent = rawIntent
  const scores = sanitizeIntentScores(body?.scores)
  const providers = getConfiguredProviders()
  const slotIds = parseRequestedSlotIds(body)

  if (slotIds.length > 0) {
    const pageId = typeof body?.pageId === "string" ? body.pageId : "home"

    if (pageId !== "home") {
      return NextResponse.json(
        {
          error: "Only the home page supports living text slots in v1.",
        },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      )
    }

    return respondWithLivingSlots({ body, intent, scores, providers, slotIds })
  }

  const fallback = getFallbackLivingCopy(intent)

  if (!providers.length) {
    return respondWithFallback(intent, "missing_key", DEFAULT_OPENROUTER_MODEL)
  }

  for (const provider of providers) {
    const cacheKey = buildCacheKey(provider.provider, intent, scores, provider.model)
    const cached = cache.get(cacheKey)
    if (cached && cached.expiresAt > Date.now()) {
      return NextResponse.json(
        {
          copy: cached.copy,
          source: "ai",
          provider: cached.provider,
          configured: true,
          model: cached.model,
          cached: true,
        } satisfies LivingCopyResponse,
        { headers: { "Cache-Control": "no-store" } },
      )
    }

    try {
      const generated =
        provider.provider === "gemini"
          ? await requestGeminiCopy({ apiKey: provider.apiKey, model: provider.model, intent, scores, fallback })
          : await requestOpenAICompatibleCopy({ provider, intent, scores, fallback })
      const copy = sanitizeGeneratedCopy(generated, fallback)

      cache.set(cacheKey, { copy, provider: provider.provider, model: provider.model, expiresAt: Date.now() + CACHE_TTL_MS })

      return NextResponse.json(
        {
          copy,
          source: "ai",
          provider: provider.provider,
          configured: true,
          model: provider.model,
          cached: false,
        } satisfies LivingCopyResponse,
        { headers: { "Cache-Control": "no-store" } },
      )
    } catch (error) {
      console.warn("[living-copy] provider fallback", {
        provider: provider.provider,
        model: provider.model,
        reason: error instanceof Error ? error.message : "unknown error",
      })
    }
  }

  return respondWithFallback(intent, "upstream_failed", providers.map((provider) => `${provider.provider}:${provider.model}`).join(","), true)
}

async function respondWithLivingSlots({
  body,
  intent,
  scores,
  providers,
  slotIds,
}: {
  body: Record<string, unknown> | null
  intent: HomeIntent
  scores: IntentScoreMap
  providers: ConfiguredProvider[]
  slotIds: LivingTextSlotId[]
}) {
  const requestedSlots = slotIds
    .map((slotId) => homeLivingTextSlotById[slotId])
    .filter((slot): slot is LivingTextSlot => Boolean(slot))
  const fallback = buildFallbackSlotCopy(requestedSlots, intent, readFallbackSlotCopy(body))
  const activeSection = typeof body?.activeSection === "string" ? body.activeSection : undefined

  if (!providers.length) {
    return respondWithSlotFallback(fallback, "missing_key", DEFAULT_OPENROUTER_MODEL)
  }

  for (const provider of providers) {
    const cacheKey = buildSlotCacheKey(provider.provider, intent, scores, provider.model, slotIds)
    const cached = slotCache.get(cacheKey)
    if (cached && cached.expiresAt > Date.now()) {
      return NextResponse.json(
        {
          slots: cached.slots,
          source: "ai",
          provider: cached.provider,
          configured: true,
          model: cached.model,
          cached: true,
        } satisfies LivingSlotCopyResponse,
        { headers: { "Cache-Control": "no-store" } },
      )
    }

    try {
      const generated =
        provider.provider === "gemini"
          ? await requestGeminiSlots({ apiKey: provider.apiKey, model: provider.model, intent, scores, slots: requestedSlots, fallback, activeSection })
          : await requestOpenAICompatibleSlots({ provider, intent, scores, slots: requestedSlots, fallback, activeSection })
      const slots = sanitizeGeneratedSlotCopy(generated, requestedSlots, fallback)

      slotCache.set(cacheKey, { slots, provider: provider.provider, model: provider.model, expiresAt: Date.now() + CACHE_TTL_MS })

      return NextResponse.json(
        {
          slots,
          source: "ai",
          provider: provider.provider,
          configured: true,
          model: provider.model,
          cached: false,
        } satisfies LivingSlotCopyResponse,
        { headers: { "Cache-Control": "no-store" } },
      )
    } catch (error) {
      console.warn("[living-copy] slot provider fallback", {
        provider: provider.provider,
        model: provider.model,
        reason: error instanceof Error ? error.message : "unknown error",
      })
    }
  }

  return respondWithSlotFallback(fallback, "upstream_failed", providers.map((provider) => `${provider.provider}:${provider.model}`).join(","), true)
}

async function requestOpenAICompatibleCopy({
  provider,
  intent,
  scores,
  fallback,
}: {
  provider: ConfiguredProvider
  intent: HomeIntent
  scores: IntentScoreMap
  fallback: LivingCopy
}) {
  const isOpenRouter = provider.provider === "openrouter"
  const url = isOpenRouter ? "https://openrouter.ai/api/v1/chat/completions" : "https://api.groq.com/openai/v1/chat/completions"
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), isOpenRouter ? 9000 : 6500)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${provider.apiKey}`,
        ...(isOpenRouter
          ? {
              "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://www.9ruby.com",
              "X-Title": "9Ruby Living Home",
            }
          : {}),
      },
      body: JSON.stringify({
        model: provider.model,
        messages: [
          {
            role: "system",
            content: [
              "You are 9Ruby.com's ambient site intelligence.",
              "Rewrite only small public website text slots so the page feels responsive to visitor intent.",
              "Do not behave like a chatbot. Do not mention tracking, surveillance, cookies, accounts, databases, or APIs.",
              "Do not make guaranteed revenue claims, legal claims, medical claims, financial advice, or promises.",
              "Use direct, premium agency language in the 9Ruby red/black/white style.",
              "Return only compact JSON.",
            ].join(" "),
          },
          {
            role: "user",
            content: buildPrompt(intent, scores, fallback),
          },
        ],
        temperature: 0.72,
        max_tokens: 240,
      }),
      cache: "no-store",
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`${provider.provider} request failed with ${response.status}`)
    }

    const data = (await response.json()) as ChatCompletionResponse
    const content = data.choices?.[0]?.message?.content
    const text = Array.isArray(content) ? content.map((part) => part.text ?? "").join("").trim() : content?.trim()

    if (!text) {
      throw new Error(`${provider.provider} returned empty copy`)
    }

    return parseJsonObject(text)
  } finally {
    clearTimeout(timeout)
  }
}

async function requestGeminiCopy({
  apiKey,
  model,
  intent,
  scores,
  fallback,
}: {
  apiKey: string
  model: string
  intent: HomeIntent
  scores: IntentScoreMap
  fallback: LivingCopy
}) {
  const modelPath = model.startsWith("models/") ? model : `models/${model}`
  const url = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${encodeURIComponent(apiKey)}`
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 6500)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: [
                "You are 9Ruby.com's ambient site intelligence.",
                "Rewrite only small public website text slots so the page feels responsive to visitor intent.",
                "Do not behave like a chatbot. Do not mention tracking, surveillance, cookies, accounts, databases, or APIs.",
                "Do not make guaranteed revenue claims, legal claims, medical claims, financial advice, or promises.",
                "Use direct, premium agency language in the 9Ruby red/black/white style.",
                "Return only compact JSON.",
              ].join(" "),
            },
          ],
        },
        contents: [
          {
            parts: [
              {
                text: buildPrompt(intent, scores, fallback),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.72,
          topP: 0.9,
          maxOutputTokens: 240,
          responseMimeType: "application/json",
        },
      }),
      cache: "no-store",
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Gemini request failed with ${response.status}`)
    }

    const data = (await response.json()) as GeminiGenerateContentResponse
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim()

    if (!text) {
      throw new Error("Gemini returned empty copy")
    }

    return parseJsonObject(text)
  } finally {
    clearTimeout(timeout)
  }
}

async function requestOpenAICompatibleSlots({
  provider,
  intent,
  scores,
  slots,
  fallback,
  activeSection,
}: {
  provider: ConfiguredProvider
  intent: HomeIntent
  scores: IntentScoreMap
  slots: LivingTextSlot[]
  fallback: LivingSlotCopyMap
  activeSection?: string
}) {
  const isOpenRouter = provider.provider === "openrouter"
  const url = isOpenRouter ? "https://openrouter.ai/api/v1/chat/completions" : "https://api.groq.com/openai/v1/chat/completions"
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), isOpenRouter ? 9000 : 6500)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${provider.apiKey}`,
        ...(isOpenRouter
          ? {
              "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://www.9ruby.com",
              "X-Title": "9Ruby Living Text Slots",
            }
          : {}),
      },
      body: JSON.stringify({
        model: provider.model,
        messages: [
          {
            role: "system",
            content: buildLivingSystemPrompt(),
          },
          {
            role: "user",
            content: buildSlotPrompt(intent, scores, slots, fallback, activeSection),
          },
        ],
        temperature: 0.62,
        max_tokens: Math.min(520, 120 + slots.length * 48),
      }),
      cache: "no-store",
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`${provider.provider} slot request failed with ${response.status}`)
    }

    const data = (await response.json()) as ChatCompletionResponse
    const content = data.choices?.[0]?.message?.content
    const text = Array.isArray(content) ? content.map((part) => part.text ?? "").join("").trim() : content?.trim()

    if (!text) {
      throw new Error(`${provider.provider} returned empty slot copy`)
    }

    return parseJsonObject(text)
  } finally {
    clearTimeout(timeout)
  }
}

async function requestGeminiSlots({
  apiKey,
  model,
  intent,
  scores,
  slots,
  fallback,
  activeSection,
}: {
  apiKey: string
  model: string
  intent: HomeIntent
  scores: IntentScoreMap
  slots: LivingTextSlot[]
  fallback: LivingSlotCopyMap
  activeSection?: string
}) {
  const modelPath = model.startsWith("models/") ? model : `models/${model}`
  const url = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${encodeURIComponent(apiKey)}`
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 6500)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: buildLivingSystemPrompt(),
            },
          ],
        },
        contents: [
          {
            parts: [
              {
                text: buildSlotPrompt(intent, scores, slots, fallback, activeSection),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.62,
          topP: 0.9,
          maxOutputTokens: Math.min(520, 120 + slots.length * 48),
          responseMimeType: "application/json",
        },
      }),
      cache: "no-store",
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Gemini slot request failed with ${response.status}`)
    }

    const data = (await response.json()) as GeminiGenerateContentResponse
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim()

    if (!text) {
      throw new Error("Gemini returned empty slot copy")
    }

    return parseJsonObject(text)
  } finally {
    clearTimeout(timeout)
  }
}

function buildPrompt(intent: HomeIntent, scores: IntentScoreMap, fallback: LivingCopy) {
  const profile = intentProfiles[intent]
  const scoreSummary = Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([key, score]) => `${key}:${score.toFixed(1)}`)
    .join(", ")

  return JSON.stringify({
    task: "Return one JSON object with exactly these keys: heroSignal, priorityLine, taglineLead, taglineRest, finalSignal, primaryCtaLabel, secondaryCtaLabel.",
    activeIntent: intent,
    intentLabel: profile.label,
    behaviorScores: scoreSummary || "fresh visitor",
    brandContext: "9Ruby is an AI-native agency offering AI agents, voice systems, websites, templates, automation, SEO, and free tools.",
    fallbackCopy: fallback,
    limits: {
      heroSignal: "max 64 chars",
      priorityLine: "max 96 chars",
      taglineLead: "max 72 chars, uppercase, no punctuation-heavy slogan",
      taglineRest: "max 120 chars",
      finalSignal: "max 72 chars",
      primaryCtaLabel: "max 32 chars, 2 to 4 words, clear action phrase",
      secondaryCtaLabel: "max 32 chars, 2 to 4 words, clear action phrase",
    },
  })
}

function buildSlotPrompt(
  intent: HomeIntent,
  scores: IntentScoreMap,
  slots: LivingTextSlot[],
  fallback: LivingSlotCopyMap,
  activeSection?: string,
) {
  const profile = intentProfiles[intent]
  const scoreSummary = Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([key, score]) => `${key}:${score.toFixed(1)}`)
    .join(", ")

  return JSON.stringify({
    task: "Return one JSON object with a slots object. Include only the requested slot ids.",
    pageId: "home",
    activeSection: activeSection ?? "visible section",
    activeIntent: intent,
    intentLabel: profile.label,
    behaviorScores: scoreSummary || "fresh visitor",
    brandContext: "9Ruby is an AI-native agency offering AI agents, voice systems, websites, templates, automation, SEO, and free tools.",
    lockedAreas: [
      "Do not rewrite the RUBY hero wordmark.",
      "Do not rewrite navigation, footer, testimonials, stats, pricing, payment, legal, privacy, or exact case-study numbers.",
      "Do not mention tracking, cookies, accounts, databases, API keys, or model providers.",
    ],
    requestedSlots: slots.map((slot) => ({
      slotId: slot.slotId,
      sectionId: slot.sectionId,
      tone: slot.tone,
      maxLength: slot.maxLength,
      fallbackText: fallback[slot.slotId] ?? slot.fallbackText,
    })),
  })
}

function buildLivingSystemPrompt() {
  return [
    "You are 9Ruby.com's quiet living website copy layer.",
    "Rewrite only approved public text slots so the page feels responsive while remaining professional.",
    "Do not behave like a chatbot. Do not address the visitor as an assistant.",
    "Do not mention tracking, surveillance, cookies, accounts, databases, APIs, models, providers, or personalization mechanics.",
    "Do not make guaranteed revenue claims, legal claims, medical claims, financial advice, payment claims, or promises.",
    "Keep copy compact, specific, and compatible with existing page layout.",
    "Use direct premium agency language in the 9Ruby red/black/white style.",
    "Return only compact JSON.",
  ].join(" ")
}

function sanitizeGeneratedCopy(input: unknown, fallback: LivingCopy): LivingCopy {
  if (!isRecord(input)) return fallback

  return {
    heroSignal: cleanCopy(input.heroSignal, fallback.heroSignal, 64),
    priorityLine: cleanCopy(input.priorityLine, fallback.priorityLine, 96),
    taglineLead: cleanCopy(input.taglineLead, fallback.taglineLead, 72).toUpperCase(),
    taglineRest: cleanCopy(input.taglineRest, fallback.taglineRest, 120),
    finalSignal: cleanCopy(input.finalSignal, fallback.finalSignal, 72),
    primaryCtaLabel: cleanCtaCopy(input.primaryCtaLabel, fallback.primaryCtaLabel),
    secondaryCtaLabel: cleanCtaCopy(input.secondaryCtaLabel, fallback.secondaryCtaLabel),
  }
}

function sanitizeGeneratedSlotCopy(input: unknown, slots: LivingTextSlot[], fallback: LivingSlotCopyMap): LivingSlotCopyMap {
  if (!isRecord(input)) return fallback

  const slotRecord = isRecord(input.slots) ? input.slots : input

  return slots.reduce((copy, slot) => {
    const fallbackText = fallback[slot.slotId] ?? slot.fallbackText
    const rawValue = slotRecord[slot.slotId]
    const cleanValue =
      slot.slotId === "primary-cta" || slot.slotId === "secondary-cta"
        ? cleanCtaCopy(rawValue, fallbackText)
        : cleanCopy(rawValue, fallbackText, slot.maxLength)

    copy[slot.slotId] = shouldUppercaseSlot(slot.slotId) ? cleanValue.toUpperCase() : cleanValue
    return copy
  }, {} as LivingSlotCopyMap)
}

function buildFallbackSlotCopy(slots: LivingTextSlot[], intent: HomeIntent, fallbackBySlot: LivingSlotCopyMap) {
  return slots.reduce((copy, slot) => {
    const fallback = fallbackBySlot[slot.slotId] ?? getFallbackLivingSlotCopy(slot.slotId, intent, slot.fallbackText)
    const cleaned =
      slot.slotId === "primary-cta" || slot.slotId === "secondary-cta"
        ? cleanCtaCopy(fallback, slot.fallbackText)
        : cleanCopy(fallback, slot.fallbackText, slot.maxLength)

    copy[slot.slotId] = shouldUppercaseSlot(slot.slotId) ? cleaned.toUpperCase() : cleaned
    return copy
  }, {} as LivingSlotCopyMap)
}

function shouldUppercaseSlot(slotId: LivingTextSlotId) {
  return slotId === "response-headline" || slotId === "service-tagline-headline"
}

function cleanCopy(value: unknown, fallback: string, maxLength: number) {
  if (typeof value !== "string") return fallback

  const cleaned = value
    .replace(/[\r\n\t]+/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()

  if (!cleaned) return fallback
  if (cleaned.length <= maxLength) return cleaned

  return cleaned.slice(0, maxLength).replace(/\s+\S*$/g, "").trim() || fallback
}

function cleanCtaCopy(value: unknown, fallback: string) {
  const cleaned = cleanCopy(value, fallback, 32)
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length

  if (wordCount < 2 || wordCount > 4) return fallback

  return cleaned
}

function parseRequestedSlotIds(body: Record<string, unknown> | null): LivingTextSlotId[] {
  const rawSlots = body?.allowedSlotIds ?? body?.slotIds ?? body?.slots
  if (!Array.isArray(rawSlots)) return []

  const allowedSlotIds = new Set(HOME_LIVING_TEXT_SLOTS.filter((slot) => !slot.locked).map((slot) => slot.slotId))
  const slotIds = rawSlots
    .map((item) => {
      if (typeof item === "string") return item
      if (isRecord(item) && typeof item.slotId === "string") return item.slotId
      return null
    })
    .filter((slotId): slotId is LivingTextSlotId => Boolean(slotId && allowedSlotIds.has(slotId as LivingTextSlotId)))

  return Array.from(new Set(slotIds)).slice(0, 10)
}

function readFallbackSlotCopy(body: Record<string, unknown> | null): LivingSlotCopyMap {
  const rawFallback = body?.fallbackTextBySlot ?? body?.fallbackText ?? body?.currentFallbackText
  if (!isRecord(rawFallback)) return {}

  return Object.entries(rawFallback).reduce((copy, [slotId, value]) => {
    if (slotId in homeLivingTextSlotById && typeof value === "string") {
      copy[slotId as LivingTextSlotId] = value
    }
    return copy
  }, {} as LivingSlotCopyMap)
}

function parseJsonObject(text: string) {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const source = fencedMatch?.[1] ?? text
  const start = source.indexOf("{")
  const end = source.lastIndexOf("}")

  if (start < 0 || end <= start) {
    throw new Error("Gemini returned non-JSON copy")
  }

  return JSON.parse(source.slice(start, end + 1)) as unknown
}

async function readJsonBody(request: NextRequest) {
  try {
    return (await request.json()) as Record<string, unknown>
  } catch {
    return null
  }
}

function respondWithFallback(intent: HomeIntent, reason: string, model: string, configured = false) {
  return NextResponse.json(
    {
      copy: getFallbackLivingCopy(intent),
      source: "fallback",
      provider: "local",
      configured,
      model,
      reason,
    } satisfies LivingCopyResponse,
    { headers: { "Cache-Control": "no-store" } },
  )
}

function respondWithSlotFallback(slots: LivingSlotCopyMap, reason: string, model: string, configured = false) {
  return NextResponse.json(
    {
      slots,
      source: "fallback",
      provider: "local",
      configured,
      model,
      reason,
    } satisfies LivingSlotCopyResponse,
    { headers: { "Cache-Control": "no-store" } },
  )
}

function buildCacheKey(provider: Exclude<LivingCopyProvider, "local">, intent: HomeIntent, scores: IntentScoreMap, model: string) {
  const scoreKey = Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, score]) => `${key}:${Math.round(score)}`)
    .join("|")

  return `${provider}:${model}:${intent}:${scoreKey || "fresh"}`
}

function buildSlotCacheKey(
  provider: Exclude<LivingCopyProvider, "local">,
  intent: HomeIntent,
  scores: IntentScoreMap,
  model: string,
  slotIds: LivingTextSlotId[],
) {
  const slotKey = [...slotIds].sort().join(",")

  return `${buildCacheKey(provider, intent, scores, model)}:slots:${slotKey}`
}

function getConfiguredProviders(): ConfiguredProvider[] {
  const providers: ConfiguredProvider[] = []

  if (process.env.OPENROUTER_API_KEY) {
    providers.push({
      provider: "openrouter",
      apiKey: process.env.OPENROUTER_API_KEY,
      env: "OPENROUTER_API_KEY",
      model: process.env.OPENROUTER_MODEL || DEFAULT_OPENROUTER_MODEL,
    })
  }

  if (process.env.GROQ_API_KEY) {
    providers.push({
      provider: "groq",
      apiKey: process.env.GROQ_API_KEY,
      env: "GROQ_API_KEY",
      model: process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL,
    })
  }

  const geminiApiKey = getGeminiApiKey()
  if (geminiApiKey) {
    providers.push({
      provider: "gemini",
      apiKey: geminiApiKey,
      env: process.env.GEMINI_API_KEY ? "GEMINI_API_KEY" : process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "GOOGLE_GENERATIVE_AI_API_KEY" : "GOOGLE_API_KEY",
      model: process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL,
    })
  }

  return providers
}

function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value))
}
