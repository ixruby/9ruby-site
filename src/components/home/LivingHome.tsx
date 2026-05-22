"use client"

import Link from "next/link"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { Activity, ArrowRight, ArrowUpRight, RotateCcw, SlidersHorizontal } from "lucide-react"
import ArabicAccent from "@/components/ArabicAccent"
import { Button } from "@/components/ui/button"
import {
  HOME_LIVING_TEXT_SLOTS,
  HOME_INTENTS,
  getFallbackLivingCopy,
  getFallbackLivingSlotCopy,
  heroServices,
  homeLivingTextSlotById,
  intentProfiles,
  projects,
  serviceCards,
  type HomeCta,
  type HomeIntent,
  type IntentScoreMap,
  type LivingCopy,
  type LivingSlotCopyMap,
  type LivingTextSlotId,
} from "@/lib/home-content"
import {
  boostIntentScore,
  createEmptyIntentScores,
  parseIntentList,
  rankHomeItems,
  resolveTopIntent,
  sanitizeIntentScores,
} from "@/lib/living-home"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"
const SESSION_KEY = "9ruby:living-home:v1"
const AMBIENT_INTENTS: readonly HomeIntent[] = ["ai-agents", "websites", "automation", "tools"]
const ACTIONABLE_TOP_SCORE = 1.2
const ACTIONABLE_SCORE_GAP = 0.45
const SERVICE_UI_CELLS = [
  { label: "Signal", value: "Intent" },
  { label: "Path", value: "Service" },
  { label: "Output", value: "Scope" },
] as const
const WORK_UI_CELLS = [
  { label: "Proof", value: "Matched" },
  { label: "Order", value: "Adaptive" },
  { label: "Next", value: "Case" },
] as const
const TAGLINE_UI_CELLS = ["Landing", "Agent", "Automation", "Tools"] as const
const LIVING_RAIL_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "response", label: "Response" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "cta", label: "CTA" },
] as const
type LivingCopySource = "ai" | "fallback" | "loading"

type LivingHomeContextValue = {
  scores: IntentScoreMap
  activeIntent: HomeIntent
  isRankingActive: boolean
  reducedMotion: boolean
  copy: LivingCopy
  copySource: LivingCopySource
  slotCopy: LivingSlotCopyMap
  slotSources: Partial<Record<LivingTextSlotId, LivingCopySource>>
  commandPulse: number
  boostIntent: (intent: HomeIntent, amount?: number, userInitiated?: boolean) => void
  chooseIntent: (intent: HomeIntent) => void
  resetIntent: () => void
}

const LivingHomeContext = createContext<LivingHomeContextValue | null>(null)

export function LivingHomeProvider({ children }: { children: ReactNode }) {
  const [scores, setScores] = useState<IntentScoreMap>(() => createEmptyIntentScores())
  const [ambientIndex, setAmbientIndex] = useState(0)
  const [interactionCount, setInteractionCount] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [copy, setCopy] = useState<LivingCopy>(() => getFallbackLivingCopy("ai-agents"))
  const [copySource, setCopySource] = useState<LivingCopySource>("fallback")
  const [visibleSectionIds, setVisibleSectionIds] = useState<Partial<Record<string, true>>>({})
  const [slotCopy, setSlotCopy] = useState<LivingSlotCopyMap>({})
  const [slotSources, setSlotSources] = useState<Partial<Record<LivingTextSlotId, LivingCopySource>>>({})
  const [commandPulse, setCommandPulse] = useState(0)
  const loadedStorageRef = useRef(false)
  const ambientStepsRef = useRef(0)
  const copyRequestRef = useRef(0)
  const slotRequestRef = useRef(0)
  const scoresRef = useRef(scores)

  const userDirected = interactionCount > 0 || hasActionableIntent(scores)
  const isRankingActive = userDirected || ambientIndex > 0
  const activeIntent = userDirected
    ? resolveTopIntent(scores)
    : AMBIENT_INTENTS[ambientIndex] ?? "ai-agents"
  const slotIntent = userDirected ? activeIntent : "ai-agents"

  const boostIntent = useCallback((intent: HomeIntent, amount = 1, userInitiated = true) => {
    if (amount <= 0) return

    if (userInitiated) {
      setInteractionCount((count) => count + 1)
      setCommandPulse((pulse) => pulse + 1)
    }

    setScores((current) => boostIntentScore(current, intent, amount))
  }, [])

  const chooseIntent = useCallback((intent: HomeIntent) => {
    setInteractionCount((count) => count + 1)
    setCommandPulse((pulse) => pulse + 1)
    setScores((current) => {
      const strongestScore = Math.max(...HOME_INTENTS.map((candidate) => current[candidate]))

      return HOME_INTENTS.reduce((next, candidate) => {
        next[candidate] =
          candidate === intent
            ? Math.min(36, Math.max(current[candidate] + 7, strongestScore + 3))
            : Math.max(0, current[candidate] * 0.28)
        return next
      }, {} as IntentScoreMap)
    })
  }, [])

  const resetIntent = useCallback(() => {
    ambientStepsRef.current = 0
    setAmbientIndex(0)
    setInteractionCount(0)
    setSlotCopy({})
    setSlotSources({})
    setCommandPulse((pulse) => pulse + 1)
    setScores(createEmptyIntentScores())

    try {
      window.sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // Reset still works in memory if session storage is unavailable.
    }
  }, [])

  useEffect(() => {
    scoresRef.current = scores
  }, [scores])

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(SESSION_KEY)
      if (!raw) {
        loadedStorageRef.current = true
        return
      }

      const parsed = JSON.parse(raw) as { scores?: unknown } | unknown
      const storedScores = sanitizeIntentScores(
        parsed && typeof parsed === "object" && "scores" in parsed ? parsed.scores : parsed,
      )

      setScores(storedScores)
      if (hasActionableIntent(storedScores)) {
        setInteractionCount(1)
      }
    } catch {
      setScores(createEmptyIntentScores())
    } finally {
      loadedStorageRef.current = true
    }
  }, [])

  useEffect(() => {
    if (!loadedStorageRef.current) return

    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ scores, updatedAt: Date.now() }))
    } catch {
      // Session storage can fail in private modes; the living layer remains in-memory.
    }
  }, [scores])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => setReducedMotion(media.matches)

    syncMotion()
    media.addEventListener("change", syncMotion)

    return () => media.removeEventListener("change", syncMotion)
  }, [])

  useEffect(() => {
    if (reducedMotion || userDirected || ambientStepsRef.current >= 3) return

    const timer = window.setInterval(() => {
      ambientStepsRef.current += 1
      if (ambientStepsRef.current > 3) {
        window.clearInterval(timer)
        return
      }

      setAmbientIndex((index) => (index + 1) % AMBIENT_INTENTS.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [reducedMotion, userDirected])

  useEffect(() => {
    if (reducedMotion) return

    let frame = 0
    const root = document.documentElement

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        const x = Math.round((event.clientX / window.innerWidth) * 100)
        const y = Math.round((event.clientY / window.innerHeight) * 100)

        root.style.setProperty("--living-pointer-x", `${x}%`)
        root.style.setProperty("--living-pointer-y", `${y}%`)
        frame = 0
      })
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      root.style.removeProperty("--living-pointer-x")
      root.style.removeProperty("--living-pointer-y")
    }
  }, [reducedMotion])

  useEffect(() => {
    const fallbackCopy = getFallbackLivingCopy(activeIntent)
    const requestId = copyRequestRef.current + 1
    const controller = new AbortController()
    const delay = userDirected ? 420 : 900

    copyRequestRef.current = requestId
    setCopy(fallbackCopy)
    setCopySource("fallback")

    const timer = window.setTimeout(async () => {
      setCopySource("loading")

      try {
        const response = await fetch("/api/living-copy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ intent: activeIntent, scores: scoresRef.current }),
          cache: "no-store",
          signal: controller.signal,
        })

        if (!response.ok) {
          setCopySource("fallback")
          return
        }

        const data = (await response.json()) as { copy?: unknown; source?: LivingCopySource }
        if (copyRequestRef.current !== requestId) return

        if (isLivingCopy(data.copy)) {
          setCopy(data.copy)
          setCopySource(data.source === "ai" ? "ai" : "fallback")
          return
        }

        setCopySource("fallback")
      } catch {
        if (!controller.signal.aborted && copyRequestRef.current === requestId) {
          setCopySource("fallback")
        }
      }
    }, delay)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [activeIntent, userDirected])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-living-section-id]"))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSectionIds((current) => {
          let changed = false
          const next = { ...current }

          for (const entry of entries) {
            const sectionId = (entry.target as HTMLElement).dataset.livingSectionId
            if (!sectionId || !entry.isIntersecting || entry.intersectionRatio < 0.28 || next[sectionId]) continue

            next[sectionId] = true
            changed = true
          }

          return changed ? next : current
        })
      },
      { threshold: [0, 0.28, 0.5, 0.72] },
    )

    for (const element of elements) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const visibleSlots = HOME_LIVING_TEXT_SLOTS.filter((slot) => visibleSectionIds[slot.sectionId] && !slot.locked)
    if (!visibleSlots.length) return

    const fallbackSlots = visibleSlots.reduce((copyMap, slot) => {
      copyMap[slot.slotId] = getFallbackLivingSlotCopy(slot.slotId, slotIntent, slot.fallbackText)
      return copyMap
    }, {} as LivingSlotCopyMap)
    const visibleSlotIds = visibleSlots.map((slot) => slot.slotId)
    const requestId = slotRequestRef.current + 1
    const controller = new AbortController()
    const activeSection = [...HOME_LIVING_TEXT_SLOTS]
      .reverse()
      .find((slot) => visibleSectionIds[slot.sectionId])?.sectionId
    const delay = userDirected ? 460 : 980

    slotRequestRef.current = requestId
    setSlotCopy((current) => ({ ...current, ...fallbackSlots }))
    setSlotSources((current) => ({
      ...current,
      ...visibleSlotIds.reduce((sources, slotId) => {
        sources[slotId] = "fallback"
        return sources
      }, {} as Partial<Record<LivingTextSlotId, LivingCopySource>>),
    }))

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/living-copy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pageId: "home",
            activeSection,
            intent: slotIntent,
            scores: scoresRef.current,
            allowedSlotIds: visibleSlotIds,
            fallbackTextBySlot: fallbackSlots,
          }),
          cache: "no-store",
          signal: controller.signal,
        })

        if (!response.ok) return

        const data = (await response.json()) as { slots?: unknown; source?: LivingCopySource }
        if (slotRequestRef.current !== requestId) return

        const incomingSlots = pickLivingSlotCopy(data.slots, visibleSlotIds)
        if (!Object.keys(incomingSlots).length) return

        setSlotCopy((current) => ({ ...current, ...incomingSlots }))
        setSlotSources((current) => ({
          ...current,
          ...Object.keys(incomingSlots).reduce((sources, slotId) => {
            sources[slotId as LivingTextSlotId] = data.source === "ai" ? "ai" : "fallback"
            return sources
          }, {} as Partial<Record<LivingTextSlotId, LivingCopySource>>),
        }))
      } catch {
        if (!controller.signal.aborted && slotRequestRef.current === requestId) {
          setSlotSources((current) => ({
            ...current,
            ...visibleSlotIds.reduce((sources, slotId) => {
              sources[slotId] = "fallback"
              return sources
            }, {} as Partial<Record<LivingTextSlotId, LivingCopySource>>),
          }))
        }
      }
    }, delay)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [slotIntent, userDirected, visibleSectionIds])

  useEffect(() => {
    const hoverMarks = new Map<string, number>()

    const findIntentNode = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null

      const node = target.closest<HTMLElement>("[data-living-intent]")
      if (!node) return null

      const [intent] = parseIntentList(node.dataset.livingIntent)
      if (!intent) return null

      return { node, intent }
    }

    const handlePointerOver = (event: PointerEvent) => {
      const match = findIntentNode(event.target)
      if (!match) return

      const id = match.node.dataset.livingId ?? match.node.textContent ?? "node"
      const key = `${match.intent}:${id}`
      const now = Date.now()
      const last = hoverMarks.get(key) ?? 0

      if (now - last < 1600) return
      hoverMarks.set(key, now)
      boostIntent(match.intent, 0.65, true)
    }

    const handleClick = (event: MouseEvent) => {
      const match = findIntentNode(event.target)
      if (!match) return

      boostIntent(match.intent, 2.4, true)
    }

    document.addEventListener("pointerover", handlePointerOver, { passive: true })
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("pointerover", handlePointerOver)
      document.removeEventListener("click", handleClick)
    }
  }, [boostIntent])

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-living-section-intent], [data-living-section-intents]"),
    )
    if (!elements.length) return

    const visible = new Map<Element, HomeIntent[]>()
    const readSectionIntents = (element: HTMLElement) => {
      const single = parseIntentList(element.dataset.livingSectionIntent)
      const multiple = parseIntentList(element.dataset.livingSectionIntents)
      return Array.from(new Set([...single, ...multiple]))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement
          const intents = readSectionIntents(element)

          if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && intents.length > 0) {
            visible.set(element, intents)
          } else {
            visible.delete(element)
          }
        }
      },
      { threshold: [0, 0.3, 0.55, 0.8] },
    )

    for (const element of elements) {
      observer.observe(element)
    }

    const timer = window.setInterval(() => {
      const visibleIntents = new Set<HomeIntent>()
      visible.forEach((intents) => intents.forEach((intent) => visibleIntents.add(intent)))
      visibleIntents.forEach((intent) => boostIntent(intent, 0.18, false))
    }, 3400)

    return () => {
      window.clearInterval(timer)
      observer.disconnect()
    }
  }, [boostIntent])

  useEffect(() => {
    const reached = new Set<number>()

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return

      const progress = window.scrollY / maxScroll
      const checkpoints: Array<[number, HomeIntent]> = [
        [0.25, "websites"],
        [0.5, "automation"],
        [0.75, "tools"],
      ]

      for (const [checkpoint, intent] of checkpoints) {
        if (progress >= checkpoint && !reached.has(checkpoint)) {
          reached.add(checkpoint)
          boostIntent(intent, 0.32, false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [boostIntent])

  const value = useMemo(
    () => ({
      scores,
      activeIntent,
      isRankingActive,
      reducedMotion,
      copy,
      copySource,
      slotCopy,
      slotSources,
      commandPulse,
      boostIntent,
      chooseIntent,
      resetIntent,
    }),
    [
      activeIntent,
      boostIntent,
      chooseIntent,
      commandPulse,
      copy,
      copySource,
      isRankingActive,
      reducedMotion,
      resetIntent,
      scores,
      slotCopy,
      slotSources,
    ],
  )

  return <LivingHomeContext.Provider value={value}>{children}</LivingHomeContext.Provider>
}

export function LivingHeroBar() {
  const { activeIntent, isRankingActive, scores, copy, copySource } = useLivingHome()
  const rankedServices = useMemo(
    () => (isRankingActive ? rankHomeItems(heroServices, scores, activeIntent, 3) : [...heroServices]).slice(0, 4),
    [activeIntent, isRankingActive, scores],
  )
  const topScores = useMemo(
    () =>
      HOME_INTENTS.map((intent) => ({ intent, score: scores[intent] }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    [scores],
  )

  return (
    <div
      className="living-hero-bar relative z-10 flex justify-between items-start px-6 md:px-12 pt-28 md:pt-32 gap-6"
      data-living-section-intents="ai-agents,voice,websites,templates,automation,seo,tools"
    >
      <div className="flex flex-col gap-4">
        <p className="max-w-[210px] text-[13px] leading-relaxed hidden md:block" style={{ color: "rgba(255,255,255,0.55)", fontFamily: NV }}>
          We partner with brands to build digital systems that drive revenue and command attention.
        </p>

        <div
          role="status"
          aria-live="polite"
          className="living-signal"
          data-living-intent={activeIntent}
          data-living-id="hero-live-signal"
        >
          <span className="living-signal__scan" aria-hidden />
          <span className="living-signal__dot" aria-hidden />
          <span className="living-signal__copy">
            <span className="living-signal__label">{copySource === "ai" ? "AI live site" : "Live site"}</span>
            <TypedText text={copy.heroSignal} className="living-signal__text" speed={16} />
          </span>
          <span className="living-signal__bars" aria-hidden>
            {topScores.map(({ intent, score }) => (
              <span key={intent} style={{ height: `${Math.max(18, Math.min(100, score * 18 + 18))}%` }} />
            ))}
          </span>
        </div>
      </div>

      <ul className="text-right flex flex-col gap-1.5">
        {rankedServices.map((service, index) => (
          <li key={service.id} className="living-hero-service" data-living-intent={service.primaryIntent} data-living-id={service.id}>
            <SmartHref href={service.href} external={service.external} className="living-hero-service__link">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {service.label}
            </SmartHref>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LivingIntentConsole() {
  const { activeIntent, scores, copy, copySource, commandPulse, boostIntent, chooseIntent, resetIntent } = useLivingHome()
  const profile = intentProfiles[activeIntent]
  const intentSignals = useMemo(
    () =>
      HOME_INTENTS.map((intent) => ({ intent, score: scores[intent] }))
        .sort((a, b) => b.score - a.score),
    [scores],
  )
  const topScore = intentSignals[0]?.score ?? 0
  const maxScore = Math.max(1, topScore)
  const responsePath = [
    { id: "hero", label: "Hero", detail: copy.heroSignal },
    { id: "services", label: "Services", detail: `Sorting ${profile.label}` },
    { id: "work", label: "Work", detail: "Matching proof" },
    { id: "cta", label: "CTA", detail: copy.primaryCtaLabel },
  ]

  return (
    <aside className="living-intent-console living-command-center" aria-label="9Ruby command center" data-command-pulse={commandPulse}>
      <span className="living-console__scan" aria-hidden />
      <span className="living-command-center__beam" aria-hidden />
      <div className="living-console__head">
        <span className="living-console__eyebrow">
          <Activity size={12} />
          {copySource === "ai" ? "Personalized view" : copySource === "loading" ? "Updating view" : "Default view"}
        </span>
        <button type="button" className="living-console__reset" onClick={resetIntent} aria-label="Reset living site intent">
          <RotateCcw size={12} />
        </button>
      </div>

      <div className="living-console__body">
        <p className="living-console__mode">
          <span>{profile.label}</span>
          <TypedText text={copy.heroSignal} speed={12} />
        </p>
        <p className="living-console__copy">{copy.priorityLine}</p>
      </div>

      <div className="living-command-path" key={`path-${commandPulse}`} aria-label="Current site response path">
        {responsePath.map((item, index) => (
          <span key={item.id} className="living-command-path__node">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.label}</strong>
            <em>{item.detail}</em>
          </span>
        ))}
      </div>

      <div className="living-command-meters" aria-label="Intent confidence">
        {intentSignals.map(({ intent, score }) => {
          const intentProfile = intentProfiles[intent]
          const width = Math.max(intent === activeIntent ? 34 : 8, Math.min(100, (score / maxScore) * 100))

          return (
            <button
              key={intent}
              type="button"
              aria-pressed={activeIntent === intent}
              className={`living-command-meter ${activeIntent === intent ? "is-active" : ""}`}
              style={{ "--intent-score": `${width}%` } as CSSProperties}
              onClick={() => chooseIntent(intent)}
              onFocus={() => boostIntent(intent, 0.45, true)}
              onPointerEnter={() => boostIntent(intent, 0.35, true)}
            >
              <span>{intentProfile.label}</span>
              <i aria-hidden />
            </button>
          )
        })}
      </div>

    </aside>
  )
}

export function LivingResponsePanel() {
  const { activeIntent, scores, copy, copySource, chooseIntent } = useLivingHome()
  const profile = intentProfiles[activeIntent]
  const rankedIntents = useMemo(
    () =>
      HOME_INTENTS.map((intent) => ({
        intent,
        label: intentProfiles[intent].label,
        score: scores[intent],
      })).sort((a, b) => b.score - a.score),
    [scores],
  )
  const topScore = Math.max(1, rankedIntents[0]?.score ?? 0)
  const responseLabel = copySource === "ai" ? "Personalized view" : copySource === "loading" ? "Updating" : "Default view"

  return (
    <section
      className="living-response-section relative z-10 px-6 md:px-12 py-12 md:py-16"
      style={{ background: "#080808", borderTop: BORDER }}
      data-living-section-intent={activeIntent}
      data-living-section-id="response"
      data-living-rail-section="response"
    >
      <div className="max-w-[1200px] mx-auto living-response-panel">
        <div className="living-response-panel__main">
          <p className="living-response-panel__eyebrow">
            <SlidersHorizontal size={13} />
            Site response
          </p>
          <h2 className="living-response-title">
            <LivingTextSlot
              slotId="response-headline"
              fallback={copy.taglineLead}
              className="living-response-title__lead"
              speed={10}
            />
            <span className="living-response-title__rest">
              <LivingTextSlot slotId="response-rest" fallback={copy.taglineRest} speed={13} />
            </span>
          </h2>
        </div>

        <div className="living-response-panel__status" aria-label="Current site response">
          <div className="living-response-panel__status-head">
            <span>{responseLabel}</span>
            <span>{profile.label}</span>
          </div>
          <div className="living-response-panel__meters">
            {rankedIntents.slice(0, 4).map(({ intent, label, score }) => (
              <button
                key={intent}
                type="button"
                className={`living-response-meter ${intent === activeIntent ? "is-active" : ""}`}
                onClick={() => chooseIntent(intent)}
              >
                <span>{label}</span>
                <i style={{ width: `${Math.max(8, Math.min(100, (score / topScore) * 100))}%` }} aria-hidden />
              </button>
            ))}
          </div>
          <div className="living-response-panel__actions">
            <button type="button" onClick={() => chooseIntent("websites")}>
              <ArrowRight size={12} />
              Show website help
            </button>
            <button type="button" onClick={() => chooseIntent("tools")}>
              <ArrowRight size={12} />
              Show free tools
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LivingIntelligenceRail() {
  const { activeIntent, copy, reducedMotion, commandPulse } = useLivingHome()
  const [activeSection, setActiveSection] = useState<(typeof LIVING_RAIL_SECTIONS)[number]["id"]>("hero")
  const profile = intentProfiles[activeIntent]
  const activeSectionLabel = LIVING_RAIL_SECTIONS.find((section) => section.id === activeSection)?.label ?? "Hero"

  useEffect(() => {
    const elements = LIVING_RAIL_SECTIONS.map(({ id }) => ({
      id,
      element: document.querySelector<HTMLElement>(`[data-living-rail-section="${id}"]`),
    })).filter((item): item is { id: (typeof LIVING_RAIL_SECTIONS)[number]["id"]; element: HTMLElement } => Boolean(item.element))

    if (!elements.length) return

    const syncActiveSection = () => {
      const viewportCenter = window.innerHeight * 0.48
      let bestSection = elements[0]?.id ?? "hero"
      let bestDistance = Number.POSITIVE_INFINITY

      for (const { id, element } of elements) {
        const rect = element.getBoundingClientRect()
        const isNearViewport = rect.bottom >= 0 && rect.top <= window.innerHeight
        if (!isNearViewport) continue

        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(elementCenter - viewportCenter)
        if (distance < bestDistance) {
          bestSection = id
          bestDistance = distance
        }
      }

      setActiveSection(bestSection)
    }

    const observer = new IntersectionObserver(
      () => syncActiveSection(),
      { rootMargin: "-20% 0px -45% 0px", threshold: [0, 0.12, 0.28, 0.45, 0.7] },
    )

    for (const { element } of elements) {
      observer.observe(element)
    }
    window.addEventListener("scroll", syncActiveSection, { passive: true })
    syncActiveSection()

    return () => {
      window.removeEventListener("scroll", syncActiveSection)
      observer.disconnect()
    }
  }, [])

  const jumpToSection = (sectionId: (typeof LIVING_RAIL_SECTIONS)[number]["id"]) => {
    const element = document.querySelector<HTMLElement>(`[data-living-rail-section="${sectionId}"]`)
    element?.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" })
  }

  return (
    <aside className="living-intelligence-rail" aria-label="Site intelligence rail" data-command-pulse={commandPulse}>
      <div className="living-rail__desktop">
        <span className="living-rail__signal" aria-hidden />
        <p className="living-rail__eyebrow">Live index</p>
        <strong>{profile.label}</strong>
        <div className="living-rail__sections" role="list" aria-label="Homepage sections">
          {LIVING_RAIL_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className={section.id === activeSection ? "is-active" : ""}
              onClick={() => jumpToSection(section.id)}
            >
              <span aria-hidden />
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`living-rail__mobile ${activeSection === "hero" ? "is-hero" : ""}`}
        onClick={() => jumpToSection(activeSection)}
      >
        <span aria-hidden />
        <strong>{activeSectionLabel}</strong>
        <em>{copy.heroSignal}</em>
      </button>
    </aside>
  )
}

export function LivingServicesSection() {
  const { activeIntent, isRankingActive, scores, reducedMotion, copy } = useLivingHome()
  const profile = intentProfiles[activeIntent]
  const rankedServices = useMemo(
    () => (isRankingActive ? rankHomeItems(serviceCards, scores, activeIntent) : [...serviceCards]).slice(0, 4),
    [activeIntent, isRankingActive, scores],
  )
  const orderKey = rankedServices.map((service) => service.id).join("|")
  const gridRef = useFlipReorder(orderKey, reducedMotion)

  return (
    <section
      className="relative z-10 px-6 md:px-12 py-10 md:py-12"
      style={{ background: "#080808", borderTop: BORDER }}
      data-living-section-intents="ai-agents,voice,websites,templates,automation,seo,tools"
      data-living-section-id="services"
      data-living-rail-section="services"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-[0.34fr_1fr] gap-6 lg:gap-10 mb-7 md:mb-8">
          <div>
            <p style={eyebrowStyle} className="arabic-row">* Services <ArabicAccent>خدمات</ArabicAccent></p>
            <h2 className="uppercase" style={sectionHeadingStyle}>
              WHAT<br />WE DO
            </h2>
          </div>
          <div className="living-services-status flex flex-col items-start gap-5 lg:items-end">
            <p className="living-priority-line" data-living-intent={activeIntent} data-living-id="services-priority-line">
              <span aria-hidden />
              <LivingTextSlot slotId="services-priority" fallback={copy.priorityLine} speed={14} />
            </p>
            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <span className="living-section-priority">Priority now: {profile.label}</span>
              <Link href="/services" className="inline-flex items-center gap-2" style={mutedLinkStyle}>
                All services <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="home-section-mini-ui" aria-label="Service routing status">
              {SERVICE_UI_CELLS.map((cell) => (
                <span key={cell.label}>
                  <em>{cell.label}</em>
                  <strong>{cell.value}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div ref={gridRef} className="living-lane-list">
          {rankedServices.map((service, index) => {
            const isPriority = index === 0

            return (
              <Link
                href={service.href}
                key={service.id}
                data-flip-id={service.id}
                data-living-intent={service.primaryIntent}
                data-living-id={`service-${service.id}`}
                className={`living-lane-row group ${isPriority ? "is-priority" : ""}`}
                style={{ textDecoration: "none" }}
              >
                <span className="living-card__trail" aria-hidden />
                <span className="living-lane-row__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="living-lane-row__body">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
                <span className="living-lane-row__status">{isPriority ? "Priority" : service.num}</span>
                <span className="living-row__arrow" aria-hidden>
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function LivingProjectsSection() {
  const { activeIntent, isRankingActive, scores, reducedMotion } = useLivingHome()
  const profile = intentProfiles[activeIntent]
  const rankedProjects = useMemo(
    () => (isRankingActive ? rankHomeItems(projects, scores, activeIntent, 3.2) : [...projects]),
    [activeIntent, isRankingActive, scores],
  )
  const orderKey = rankedProjects.map((project) => project.id).join("|")
  const gridRef = useFlipReorder(orderKey, reducedMotion)

  return (
    <section
      className="relative z-10 px-6 md:px-12 py-10 md:py-12"
      style={{ background: "#080808", borderTop: BORDER }}
      data-living-section-intents="voice,ai-agents,automation,websites,templates,seo,tools"
      data-living-section-id="work"
      data-living-rail-section="work"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-[0.34fr_1fr] gap-6 lg:gap-10 mb-7 md:mb-8">
          <div>
            <p style={eyebrowStyle} className="arabic-row">* Work <ArabicAccent>أعمال مختارة</ArabicAccent></p>
            <h2 className="uppercase" style={sectionHeadingStyle}>
              PROOF<br />IN MOTION
            </h2>
          </div>
          <div className="living-services-status flex flex-col items-start gap-5 lg:items-end">
            <p className="living-work-intro" data-living-intent={activeIntent} data-living-id="work-intro">
              <LivingTextSlot slotId="work-intro" fallback="Project proof shifts toward the service signals this visitor is showing." speed={14} />
            </p>
            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <span className="living-section-priority">Matching: {profile.label}</span>
              <Link href="/cases" className="inline-flex items-center gap-2" style={mutedLinkStyle}>
                All projects <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="home-section-mini-ui" aria-label="Work matching status">
              {WORK_UI_CELLS.map((cell) => (
                <span key={cell.label}>
                  <em>{cell.label}</em>
                  <strong>{cell.value}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div ref={gridRef} className="living-proof-list">
          {rankedProjects.map((project, index) => {
            const isPriority = index === 0

            return (
              <Link
                href={project.href}
                key={project.id}
                data-flip-id={project.id}
                data-living-intent={project.primaryIntent}
                data-living-id={`project-${project.id}`}
                className={`living-proof-row group ${isPriority ? "is-priority" : ""}`}
                style={{ textDecoration: "none" }}
              >
                <span className="living-card__trail" aria-hidden />
                <span className="living-proof-row__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="living-proof-row__main">
                  <span>{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.client}</p>
                </div>
                <strong>{project.result}</strong>
                <span className="living-row__arrow" aria-hidden>
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function LivingServiceTagline() {
  const { activeIntent, copy } = useLivingHome()
  const profile = intentProfiles[activeIntent]

  return (
    <section
      className="relative z-10 px-6 md:px-12 py-10 md:py-12 text-center"
      style={{ background: "#080808", borderTop: BORDER }}
      data-living-section-intent={activeIntent}
      data-living-section-id="service-tagline"
    >
      <div className="max-w-[960px] mx-auto">
        <p style={{ ...eyebrowStyle, marginBottom: 24 }} className="arabic-row justify-center">* Service <ArabicAccent>حلول رقمية</ArabicAccent></p>
        <h2 className="uppercase" style={taglineHeadingStyle}>
          <LivingTextSlot slotId="service-tagline-headline" fallback={copy.taglineLead} speed={12} />{" "}
          <span style={{ color: "rgba(255,255,255,0.44)" }}>
            <LivingTextSlot slotId="service-tagline-rest" fallback={copy.taglineRest} speed={12} />
          </span>
        </h2>
        <div className="home-tagline-mini-ui" aria-label="9Ruby system layers">
          {TAGLINE_UI_CELLS.map((cell) => (
            <span key={cell}>{cell}</span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <LivingCta cta={profile.primaryCta} intent={activeIntent} variant="red" label={copy.primaryCtaLabel} slotId="primary-cta" trailingIcon={<ArrowRight size={11} />} />
          <LivingCta cta={profile.secondaryCta} intent={activeIntent} variant="outline" label={copy.secondaryCtaLabel} slotId="secondary-cta" />
        </div>
      </div>
    </section>
  )
}

export function LivingFinalCta() {
  const { activeIntent, copy } = useLivingHome()
  const profile = intentProfiles[activeIntent]

  return (
    <section
      style={{ background: "#080808", borderTop: BORDER }}
      data-living-section-intent={activeIntent}
      data-living-section-id="final-cta"
      data-living-rail-section="cta"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="living-final-signal" data-living-intent={activeIntent} data-living-id="final-signal">
            <span aria-hidden />
            <LivingTextSlot slotId="final-signal" fallback={copy.finalSignal} speed={14} />
          </p>
          <h2 className="uppercase" style={finalHeadingStyle}>
            BRING IT<br />INTO ONE SYSTEM.
          </h2>
          <div className="home-final-mini-flow" aria-label="Conversion path">
            <span>Website</span>
            <span>Tool</span>
            <span>AI</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <LivingCta cta={profile.primaryCta} intent={activeIntent} variant="white" label={copy.primaryCtaLabel} slotId="primary-cta" trailingIcon={<ArrowRight size={11} />} />
          <LivingCta cta={profile.secondaryCta} intent={activeIntent} variant="redOutline" label={copy.secondaryCtaLabel} slotId="secondary-cta" />
        </div>
      </div>
    </section>
  )
}

function useLivingHome() {
  const context = useContext(LivingHomeContext)
  if (!context) {
    throw new Error("Living home components must be rendered inside LivingHomeProvider.")
  }

  return context
}

function TypedText({ text, className, speed = 18 }: { text: string; className?: string; speed?: number }) {
  const { reducedMotion } = useLivingHome()
  const [displayText, setDisplayText] = useState(text)
  const initialRenderRef = useRef(true)

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    if (initialRenderRef.current) {
      initialRenderRef.current = false
      return
    }

    let index = 0
    const step = Math.max(1, Math.ceil(text.length / 42))
    let typingTimer: number | undefined

    const startTimer = window.setTimeout(() => {
      setDisplayText("")

      typingTimer = window.setInterval(() => {
        index += step
        setDisplayText(text.slice(0, index))

        if (index >= text.length && typingTimer) {
          window.clearInterval(typingTimer)
        }
      }, speed)
    }, 0)

    return () => {
      window.clearTimeout(startTimer)
      if (typingTimer) {
        window.clearInterval(typingTimer)
      }
    }
  }, [reducedMotion, speed, text])

  const visibleText = reducedMotion ? text : displayText
  const isTyping = !reducedMotion && visibleText.length < text.length

  return (
    <span className={className ? `living-type-text ${className}` : "living-type-text"} aria-label={text}>
      {visibleText}
      {isTyping ? <span className="living-type-cursor" aria-hidden /> : null}
    </span>
  )
}

export function LivingTextSlot({
  slotId,
  fallback,
  className,
  speed = 16,
}: {
  slotId: LivingTextSlotId
  fallback?: string
  className?: string
  speed?: number
}) {
  const { activeIntent, slotCopy, slotSources } = useLivingHome()
  const slot = homeLivingTextSlotById[slotId]
  const fallbackText = fallback ?? getFallbackLivingSlotCopy(slotId, activeIntent, slot?.fallbackText)
  const text = slotCopy[slotId] ?? fallbackText
  const source = slotSources[slotId] ?? "fallback"
  const classes = ["living-text-slot", className].filter(Boolean).join(" ")

  return (
    <span className={classes} data-living-text-slot={slotId} data-living-copy-source={source}>
      <TypedText text={text} speed={speed} />
    </span>
  )
}

const LIVING_COPY_KEYS = [
  "heroSignal",
  "priorityLine",
  "taglineLead",
  "taglineRest",
  "finalSignal",
  "primaryCtaLabel",
  "secondaryCtaLabel",
] as const

function isLivingCopy(value: unknown): value is LivingCopy {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false

  return LIVING_COPY_KEYS.every((key) => typeof (value as Partial<Record<keyof LivingCopy, unknown>>)[key] === "string")
}

function pickLivingSlotCopy(value: unknown, slotIds: LivingTextSlotId[]): LivingSlotCopyMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}

  return slotIds.reduce((copyMap, slotId) => {
    const slotValue = (value as Partial<Record<LivingTextSlotId, unknown>>)[slotId]

    if (typeof slotValue === "string" && slotValue.trim()) {
      copyMap[slotId] = slotValue.trim()
    }

    return copyMap
  }, {} as LivingSlotCopyMap)
}

function hasActionableIntent(scores: IntentScoreMap) {
  const orderedScores = HOME_INTENTS.map((intent) => scores[intent]).sort((a, b) => b - a)
  const topScore = orderedScores[0] ?? 0
  const nextScore = orderedScores[1] ?? 0

  return topScore >= ACTIONABLE_TOP_SCORE && topScore - nextScore >= ACTIONABLE_SCORE_GAP
}

function useFlipReorder(orderKey: string, disabled: boolean) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const previousRectsRef = useRef<Record<string, DOMRect>>({})
  const cleanupRef = useRef<number[]>([])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    cleanupRef.current.forEach((timer) => window.clearTimeout(timer))
    cleanupRef.current = []

    const nodes = Array.from(container.querySelectorAll<HTMLElement>("[data-flip-id]"))
    const nextRects: Record<string, DOMRect> = {}

    for (const node of nodes) {
      const id = node.dataset.flipId
      if (!id) continue
      nextRects[id] = node.getBoundingClientRect()
    }

    if (!disabled) {
      for (const node of nodes) {
        const id = node.dataset.flipId
        if (!id) continue

        const previous = previousRectsRef.current[id]
        const next = nextRects[id]
        if (!previous || !next) continue

        const deltaX = previous.left - next.left
        const deltaY = previous.top - next.top
        if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) continue

        node.style.transition = "none"
        node.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`
        node.style.zIndex = "2"
        node.getBoundingClientRect()

        window.requestAnimationFrame(() => {
          node.style.transition = "transform 640ms cubic-bezier(0.16, 1, 0.3, 1), border-color 320ms ease, background 320ms ease"
          node.style.transform = ""

          const timer = window.setTimeout(() => {
            node.style.transition = ""
            node.style.zIndex = ""
          }, 700)

          cleanupRef.current.push(timer)
        })
      }
    }

    previousRectsRef.current = nextRects
  }, [disabled, orderKey])

  return containerRef
}

function LivingCta({
  cta,
  intent,
  variant,
  label,
  slotId,
  trailingIcon,
}: {
  cta: HomeCta
  intent: HomeIntent
  variant: "red" | "outline" | "white" | "redOutline"
  label: string
  slotId?: LivingTextSlotId
  trailingIcon?: ReactNode
}) {
  const variantClass =
    variant === "white"
      ? "border-white/24 bg-white text-black hover:bg-white/90"
      : variant === "redOutline"
        ? "border-white/18 bg-transparent text-white/80 hover:bg-white/8 hover:text-white"
        : ""

  return (
    <Button
      asChild
      variant={variant === "red" ? "default" : variant === "white" ? "secondary" : "outline"}
      size="lg"
      className={`living-cta rounded-none px-6 text-[11px] font-extrabold uppercase tracking-normal ${variantClass}`}
    >
      <SmartHref href={cta.href} external={cta.external} dataLivingIntent={intent} dataLivingId={`cta-${variant}-${intent}`}>
        {slotId ? <LivingTextSlot slotId={slotId} fallback={label} speed={13} /> : <TypedText text={label} speed={13} />}
        {trailingIcon}
      </SmartHref>
    </Button>
  )
}

function SmartHref({
  href,
  external,
  className,
  style,
  children,
  dataLivingIntent,
  dataLivingId,
}: {
  href: string
  external?: boolean
  className?: string
  style?: CSSProperties
  children: ReactNode
  dataLivingIntent?: HomeIntent
  dataLivingId?: string
}) {
  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:")
  const commonProps = {
    className,
    style,
    "data-living-intent": dataLivingIntent,
    "data-living-id": dataLivingId,
  }

  if (isExternal) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} {...commonProps}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} {...commonProps}>
      {children}
    </Link>
  )
}

const eyebrowStyle: CSSProperties = {
  fontFamily: NV,
  fontSize: 11,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
  marginBottom: 16,
}

const sectionHeadingStyle: CSSProperties = {
  fontFamily: NV,
  fontWeight: 950,
  fontSize: "clamp(1.25rem, 2.3vw, 2.05rem)",
  letterSpacing: 0,
  lineHeight: 1,
  color: "#fff",
}

const taglineHeadingStyle: CSSProperties = {
  fontFamily: NV,
  fontWeight: 900,
  fontSize: "clamp(1rem, 1.8vw, 1.55rem)",
  letterSpacing: 0,
  lineHeight: 1.18,
  color: "#fff",
}

const finalHeadingStyle: CSSProperties = {
  fontFamily: NV,
  fontWeight: 950,
  fontSize: "clamp(1.35rem, 2.7vw, 2.55rem)",
  letterSpacing: 0,
  lineHeight: 1,
  color: "#fff",
}

const mutedLinkStyle: CSSProperties = {
  fontFamily: NV,
  fontWeight: 700,
  fontSize: 12,
  color: "rgba(255,255,255,0.55)",
  letterSpacing: 0,
  textDecoration: "none",
  textTransform: "uppercase",
}
