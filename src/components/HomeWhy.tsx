import { Zap, Brain, Shield, Layers } from "lucide-react"
import { LivingTextSlot } from "@/components/home/LivingHome"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"
const KICKER = {
  fontFamily: NV,
  fontSize: 11,
  letterSpacing: 0,
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.42)",
}

const reasons = [
  {
    icon: Zap,
    title: "SHIP IN WEEKS,\nNOT MONTHS",
    body: "Our AI-assisted build process cuts production time by 60%. Most projects go from brief to live in under 4 weeks — without cutting corners.",
    stat: "4 weeks",
    statLabel: "avg delivery",
  },
  {
    icon: Brain,
    title: "AI-NATIVE,\nNOT AI-ASSISTED",
    body: "We don't just use AI tools — we build with AI at the core. Every system we create is designed to learn, automate, and compound over time.",
    stat: "100%",
    statLabel: "AI-integrated",
  },
  {
    icon: Layers,
    title: "ONE STUDIO,\nFULL STACK",
    body: "Design, engineering, SEO, automation, and voice — all under one roof. No vendor patchwork, no coordination gaps, no finger-pointing.",
    stat: "13+",
    statLabel: "service lanes",
  },
  {
    icon: Shield,
    title: "PROVEN ACROSS\n47+ PROJECTS",
    body: "We've built for SaaS founders, F&B brands, real estate agencies, and enterprise teams. Results are documented, not claimed.",
    stat: "$2M+",
    statLabel: "generated for clients",
  },
]

export default function HomeWhy() {
  return (
    <section
      className="relative z-10 px-6 md:px-12 py-20 md:py-28"
      style={{ background: "#000", borderTop: BORDER }}
      data-living-section-id="why"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-[0.38fr_1fr] gap-10 lg:gap-20 mb-14">
          <div>
            <p style={KICKER}>* Why 9Ruby</p>
            <p className="mt-8 max-w-[280px] text-[13px] leading-relaxed" style={{ fontFamily: NV, color: "rgba(255,255,255,0.44)" }}>
              <LivingTextSlot
                slotId="why-intro"
                fallback="We're not another agency. We're an AI-native studio that builds systems and then makes them measurable."
                speed={14}
              />
            </p>
          </div>
          <h2 className="uppercase" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(2.2rem, 6.4vw, 6rem)", letterSpacing: 0, lineHeight: 0.92, color: "#fff" }}>
            LESS AGENCY<br />MORE OPERATING SYSTEM
          </h2>
        </div>

        <div className="home-proof-list">
          {reasons.map((r, i) => (
            <article
              key={r.title}
              className="home-proof-row"
            >
              <span className="home-proof-row__index">{String(i + 1).padStart(2, "0")}</span>
              <div className="home-proof-row__icon" aria-hidden>
                <r.icon size={18} strokeWidth={2} />
              </div>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
              <div className="home-proof-row__stat">
                <strong>{r.stat}</strong>
                <span>{r.statLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
