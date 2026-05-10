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
import { ArrowRight, ArrowUpRight } from "lucide-react"
import {
  HOME_INTENTS,
  heroServices,
  intentProfiles,
  projects,
  serviceCards,
  type HomeCta,
  type HomeIntent,
  type IntentScoreMap,
} from "@/lib/home-content"
import {
  boostIntentScore,
  createEmptyIntentScores,
  getIntentScoreTotal,
  parseIntentList,
  rankHomeItems,
  resolveTopIntent,
  sanitizeIntentScores,
} from "@/lib/living-home"

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"
const SESSION_KEY = "9ruby:living-home:v1"
const AMBIENT_INTENTS: readonly HomeIntent[] = ["ai-agents", "websites", "automation", "tools"]

type LivingHomeContextValue = {
  scores: IntentScoreMap
  activeIntent: HomeIntent
  isRankingActive: boolean
  reducedMotion: boolean
  boostIntent: (intent: HomeIntent, amount?: number, userInitiated?: boolean) => void
}

const LivingHomeContext = createContext<LivingHomeContextValue | null>(null)

export function LivingHomeProvider({ children }: { children: ReactNode }) {
  const [scores, setScores] = useState<IntentScoreMap>(() => createEmptyIntentScores())
  const [ambientIndex, setAmbientIndex] = useState(0)
  const [interactionCount, setInteractionCount] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const loadedStorageRef = useRef(false)
  const ambientStepsRef = useRef(0)

  const scoreTotal = useMemo(() => getIntentScoreTotal(scores), [scores])
  const userDirected = interactionCount > 0 || scoreTotal > 1.4
  const isRankingActive = userDirected || ambientIndex > 0
  const activeIntent = userDirected
    ? resolveTopIntent(scores)
    : AMBIENT_INTENTS[ambientIndex] ?? "ai-agents"

  const boostIntent = useCallback((intent: HomeIntent, amount = 1, userInitiated = true) => {
    if (amount <= 0) return

    if (userInitiated) {
      setInteractionCount((count) => count + 1)
    }

    setScores((current) => boostIntentScore(current, intent, amount))
  }, [])

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
      if (getIntentScoreTotal(storedScores) > 1.4) {
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
    () => ({ scores, activeIntent, isRankingActive, reducedMotion, boostIntent }),
    [activeIntent, boostIntent, isRankingActive, reducedMotion, scores],
  )

  return <LivingHomeContext.Provider value={value}>{children}</LivingHomeContext.Provider>
}

export function LivingHeroBar() {
  const { activeIntent, isRankingActive, scores } = useLivingHome()
  const profile = intentProfiles[activeIntent]
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
            <span className="living-signal__label">Live site</span>
            <span className="living-signal__text">{profile.signal}</span>
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

export function LivingServicesSection() {
  const { activeIntent, isRankingActive, scores, reducedMotion } = useLivingHome()
  const profile = intentProfiles[activeIntent]
  const rankedServices = useMemo(
    () => (isRankingActive ? rankHomeItems(serviceCards, scores, activeIntent) : [...serviceCards]),
    [activeIntent, isRankingActive, scores],
  )
  const orderKey = rankedServices.map((service) => service.id).join("|")
  const gridRef = useFlipReorder(orderKey, reducedMotion)

  return (
    <section
      className="relative z-10 px-6 md:px-12 py-20 md:py-28"
      style={{ background: "#000", borderTop: BORDER }}
      data-living-section-intents="ai-agents,voice,websites,templates,automation,seo,tools"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p style={eyebrowStyle}>* Services</p>
            <h2 className="uppercase" style={sectionHeadingStyle}>
              WHAT<br />WE BUILD
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <Link href="/services" className="inline-flex items-center gap-2 self-start md:self-auto" style={mutedLinkStyle}>
              All services <ArrowUpRight size={13} />
            </Link>
            <p className="living-priority-line" data-living-intent={activeIntent} data-living-id="services-priority-line">
              <span aria-hidden />
              {profile.heroLine}
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-px living-rank-grid" style={{ border: BORDER }}>
          {rankedServices.map((service, index) => {
            const isPriority = index === 0

            return (
              <Link
                href={service.href}
                key={service.id}
                data-flip-id={service.id}
                data-living-intent={service.primaryIntent}
                data-living-id={`service-${service.id}`}
                className={`living-home-card group ${isPriority ? "is-priority" : ""}`}
                style={{ textDecoration: "none" }}
              >
                <span className="living-card__trail" aria-hidden />
                <div className="flex items-center justify-between">
                  <span style={cardNumberStyle}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="living-card__status">{isPriority ? "Live priority" : service.num}</span>
                </div>
                <div>
                  <h3 className="uppercase mb-2 living-card__title">{service.title}</h3>
                  <p className="living-card__copy">{service.desc}</p>
                </div>
                <span className="living-card__arrow" aria-hidden>
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
  const rankedProjects = useMemo(
    () => (isRankingActive ? rankHomeItems(projects, scores, activeIntent, 3.2) : [...projects]),
    [activeIntent, isRankingActive, scores],
  )
  const orderKey = rankedProjects.map((project) => project.id).join("|")
  const gridRef = useFlipReorder(orderKey, reducedMotion)

  return (
    <section
      className="relative z-10 px-6 md:px-12 py-20 md:py-28"
      style={{ background: "#000", borderTop: BORDER }}
      data-living-section-intents="voice,ai-agents,automation,websites,templates,seo,tools"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p style={eyebrowStyle}>* Work</p>
            <h2 className="uppercase" style={sectionHeadingStyle}>
              FEATURED<br />PROJECTS
            </h2>
          </div>
          <Link href="/cases" className="inline-flex items-center gap-2 self-start md:self-auto" style={mutedLinkStyle}>
            All projects <ArrowUpRight size={13} />
          </Link>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-px living-rank-grid" style={{ border: BORDER }}>
          {rankedProjects.map((project, index) => {
            const isPriority = index === 0

            return (
              <Link
                href={project.href}
                key={project.id}
                data-flip-id={project.id}
                data-living-intent={project.primaryIntent}
                data-living-id={`project-${project.id}`}
                className={`living-project-card group ${isPriority ? "is-priority" : ""}`}
                style={{ textDecoration: "none" }}
              >
                <span className="living-card__trail" aria-hidden />
                <div>
                  <span className="living-project-card__tag" style={{ color: project.color }}>{project.tag}</span>
                  <h3 className="uppercase mt-3 living-card__title">{project.title}</h3>
                  <p className="living-project-card__client">{project.client}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="living-project-card__result">{project.result}</span>
                  <span className="living-card__arrow" aria-hidden>
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function LivingServiceTagline() {
  const { activeIntent } = useLivingHome()
  const profile = intentProfiles[activeIntent]

  return (
    <section
      className="relative z-10 px-6 md:px-12 py-16 md:py-24 text-center"
      style={{ background: "#000", borderTop: BORDER }}
      data-living-section-intent={activeIntent}
    >
      <div className="max-w-[960px] mx-auto">
        <p style={{ ...eyebrowStyle, marginBottom: 24 }}>* Service</p>
        <h2 className="uppercase" style={taglineHeadingStyle}>
          {profile.taglineLead}{" "}
          <span style={{ color: "rgba(255,255,255,0.44)" }}>{profile.taglineRest}</span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <LivingCta cta={profile.primaryCta} intent={activeIntent} variant="red">
            {profile.primaryCta.label} <ArrowRight size={11} />
          </LivingCta>
          <LivingCta cta={profile.secondaryCta} intent={activeIntent} variant="outline">
            {profile.secondaryCta.label}
          </LivingCta>
        </div>
      </div>
    </section>
  )
}

export function LivingFinalCta() {
  const { activeIntent } = useLivingHome()
  const profile = intentProfiles[activeIntent]

  return (
    <section style={{ background: "#8C000E", borderTop: BORDER }} data-living-section-intent={activeIntent}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="living-final-signal" data-living-intent={activeIntent} data-living-id="final-signal">
            <span aria-hidden />
            {profile.signal}
          </p>
          <h2 className="uppercase" style={finalHeadingStyle}>
            READY TO<br />BUILD?
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <LivingCta cta={profile.primaryCta} intent={activeIntent} variant="white">
            {profile.primaryCta.label} <ArrowRight size={11} />
          </LivingCta>
          <LivingCta cta={profile.secondaryCta} intent={activeIntent} variant="redOutline">
            {profile.secondaryCta.label}
          </LivingCta>
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
  children,
}: {
  cta: HomeCta
  intent: HomeIntent
  variant: "red" | "outline" | "white" | "redOutline"
  children: ReactNode
}) {
  const style = ctaStyleMap[variant]
  const className = "living-cta inline-flex items-center gap-2 hover:opacity-90 transition-opacity"

  return (
    <SmartHref
      href={cta.href}
      external={cta.external}
      className={className}
      style={style}
      dataLivingIntent={intent}
      dataLivingId={`cta-${variant}-${intent}`}
    >
      {children}
    </SmartHref>
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
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
  marginBottom: 16,
}

const sectionHeadingStyle: CSSProperties = {
  fontFamily: NV,
  fontWeight: 950,
  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
  letterSpacing: 0,
  lineHeight: 0.93,
  color: "#fff",
}

const taglineHeadingStyle: CSSProperties = {
  fontFamily: NV,
  fontWeight: 900,
  fontSize: "clamp(1.2rem, 3.2vw, 2rem)",
  letterSpacing: 0,
  lineHeight: 1.25,
  color: "#fff",
}

const finalHeadingStyle: CSSProperties = {
  fontFamily: NV,
  fontWeight: 950,
  fontSize: "clamp(2rem, 5vw, 4rem)",
  letterSpacing: 0,
  lineHeight: 0.93,
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

const cardNumberStyle: CSSProperties = {
  fontFamily: NV,
  fontWeight: 950,
  fontSize: 11,
  color: "rgba(255,255,255,0.28)",
  letterSpacing: "0.06em",
}

const ctaBaseStyle: CSSProperties = {
  fontFamily: NV,
  fontWeight: 800,
  fontSize: 11,
  padding: "10px 24px",
  textTransform: "uppercase",
  textDecoration: "none",
  letterSpacing: "0.02em",
}

const ctaStyleMap: Record<"red" | "outline" | "white" | "redOutline", CSSProperties> = {
  red: {
    ...ctaBaseStyle,
    background: "#C8102E",
    color: "#fff",
  },
  outline: {
    ...ctaBaseStyle,
    border: "0.8px solid rgba(255,255,255,0.25)",
    color: "rgba(255,255,255,0.7)",
    fontWeight: 700,
  },
  white: {
    ...ctaBaseStyle,
    background: "#fff",
    color: "#080808",
    padding: "12px 28px",
  },
  redOutline: {
    ...ctaBaseStyle,
    border: "0.8px solid rgba(255,255,255,0.4)",
    color: "#fff",
    fontWeight: 700,
    padding: "12px 28px",
  },
}
