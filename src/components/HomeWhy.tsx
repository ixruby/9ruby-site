import { Zap, Brain, Shield, Layers } from "lucide-react"

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

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
    <section className="relative z-10 px-6 md:px-12 py-20 md:py-28" style={{ background: "#000", borderTop: BORDER }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
              * Why 9Ruby
            </p>
            <h2 className="uppercase" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.075em", lineHeight: 0.93, color: "#fff" }}>
              WHY TEAMS<br />CHOOSE US
            </h2>
          </div>
          <p style={{ fontFamily: NV, fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.44)", maxWidth: 340 }}>
            We&apos;re not another agency. We&apos;re an AI-native studio that builds systems — and then makes them measurable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: BORDER }}>
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="p-7 flex flex-col gap-5 group hover:bg-white/[0.02] transition-colors"
              style={{ borderRight: i < 3 ? BORDER : undefined, borderBottom: BORDER }}
            >
              <div style={{ width: 36, height: 36, border: BORDER, display: "flex", alignItems: "center", justifyContent: "center", color: "#C8102E" }}>
                <r.icon size={16} />
              </div>
              <h3 className="uppercase whitespace-pre-line" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(0.85rem,1.3vw,1.05rem)", letterSpacing: "-0.055em", lineHeight: 1.05, color: "#fff" }}>
                {r.title}
              </h3>
              <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.44)", flex: 1 }}>
                {r.body}
              </p>
              <div style={{ borderTop: BORDER, paddingTop: 16, marginTop: "auto" }}>
                <div style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "#C8102E", letterSpacing: "-0.05em", lineHeight: 1 }}>
                  {r.stat}
                </div>
                <div style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 4 }}>
                  {r.statLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
