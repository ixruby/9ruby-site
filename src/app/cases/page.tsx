"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

/* -- case study data ---------------------------------------------- */

const caseStudies = [
  {
    client: "TechScale",
    title: "SaaS Growth Engine",
    industry: "SaaS",
    tags: ["AI Agents", "SEO", "Content"],
    challenge:
      "Stagnant growth across all channels with declining organic traffic and no scalable acquisition strategy.",
    solution:
      "Deployed AI-powered content agents paired with technical SEO automation to build a compounding growth loop.",
    result: "3.2x",
    resultLabel: "revenue in 90 days",
    visual: {
      bg: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0d1117 100%)",
      accent: "#7c3aed",
      pattern: "saas",
    },
  },
  {
    client: "Kayupinus",
    title: "E-commerce Revenue Machine",
    industry: "E-commerce",
    tags: ["Email", "Automation"],
    challenge:
      "Low conversion rates and underperforming email channel leaving significant revenue on the table.",
    solution:
      "Built automated email flows with dynamic pricing triggers and behavior-based segmentation.",
    result: "287%",
    resultLabel: "increase in email revenue",
    visual: {
      bg: "linear-gradient(135deg, #0a1628 0%, #0f2744 50%, #061020 100%)",
      accent: "#3b82f6",
      pattern: "ecom",
    },
  },
  {
    client: "QAN LLC",
    title: "B2B Email Revival",
    industry: "B2B",
    tags: ["Email", "AI"],
    challenge:
      "Email open rates stuck at 2%, rendering the entire outbound pipeline ineffective.",
    solution:
      "AI-optimized subject lines, smart send-time delivery, and deep audience segmentation.",
    result: "340%",
    resultLabel: "increase in open rates",
    visual: {
      bg: "linear-gradient(135deg, #0a1a0a 0%, #0d2818 50%, #061010 100%)",
      accent: "#22c55e",
      pattern: "b2b",
    },
  },
  {
    client: "Novavox",
    title: "Multi-Channel Launch",
    industry: "Tech",
    tags: ["Marketing", "Launch"],
    challenge:
      "New product with zero existing audience and no brand awareness in a competitive market.",
    solution:
      "Coordinated social, email, and paid ads campaign orchestrated by AI agents for maximum reach.",
    result: "10K",
    resultLabel: "leads in 30 days",
    visual: {
      bg: "linear-gradient(135deg, #1a0a0a 0%, #2d0f1a 50%, #110608 100%)",
      accent: "#8B6B3D",
      pattern: "tech",
    },
  },
  {
    client: "Chaiwala Taste House",
    title: "Cafe AI Platform",
    industry: "F&B Tech",
    tags: ["Web App", "AI Integration"],
    challenge:
      "Needed a modern ordering platform with an embedded AI assistant to handle customer queries and menu discovery.",
    solution:
      "Built a full-stack cafe platform with embedded AI assistant, full docs site, and autonomous menu management.",
    result: "450+",
    resultLabel: "qualified leads/month",
    visual: {
      bg: "linear-gradient(135deg, #1a0f00 0%, #2d1a06 50%, #110a00 100%)",
      accent: "#f59e0b",
      pattern: "fnb",
    },
  },
  {
    client: "Saumya Properties",
    title: "Real Estate Automation",
    industry: "Real Estate",
    tags: ["Automation", "Content"],
    challenge:
      "Manual listing management consuming hours daily with inconsistent property descriptions.",
    solution:
      "AI-generated property descriptions, automated photo scheduling, and a self-updating listings portal.",
    result: "80%",
    resultLabel: "time saved, 25 listings managed",
    visual: {
      bg: "linear-gradient(135deg, #0a0f1a 0%, #121c30 50%, #060a12 100%)",
      accent: "#64748b",
      pattern: "realestate",
    },
  },
  {
    client: "AZKA ADS",
    title: "Samurai Brand Identity",
    industry: "Creative",
    tags: ["Brand Identity", "Landing Page"],
    challenge:
      "A Dubai marketing agency needed a brand identity that commanded attention in a saturated market.",
    solution:
      "Developed a samurai-meets-agency identity: eagle iconography, sword SFX on interaction, and a dark cinematic palette.",
    result: "100%",
    resultLabel: "brand recognition uplift",
    visual: {
      bg: "linear-gradient(135deg, #120808 0%, #1e0e0e 50%, #0a0404 100%)",
      accent: "#ef4444",
      pattern: "creative",
    },
  },
  {
    client: "PRISM Internal",
    title: "Five-Agent AI System",
    industry: "AI / Ops",
    tags: ["AI System", "Automation"],
    challenge:
      "IX Ruby needed an internal AI infrastructure to handle research, execution, frontend, and ops at scale.",
    solution:
      "Built PRISM - a five-agent orchestration system (PRISM, FORGE, SCOUT, PIXEL, JUNO) running on private infrastructure.",
    result: "5x",
    resultLabel: "throughput vs. single-agent setup",
    visual: {
      bg: "linear-gradient(135deg, #080810 0%, #0d0d1e 50%, #050508 100%)",
      accent: "#818cf8",
      pattern: "ai",
    },
  },
]

/* -- pattern SVGs per industry ------------------------------------ */

function CaseVisual({ visual, title }: { visual: (typeof caseStudies)[0]["visual"]; title: string }) {
  const { bg, accent, pattern } = visual
  return (
    <svg
      viewBox="0 0 584 328"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`bg-${pattern}`} x1="0%" y1="0%" x2="100%" y2="100%">
          {bg.match(/#[0-9a-f]{6}/gi)?.map((c, i, a) => (
            <stop key={c} offset={`${(i / (a.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>
        <radialGradient id={`glow-${pattern}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* base */}
      <rect width="584" height="328" fill={`url(#bg-${pattern})`} />
      {/* ambient glow */}
      <ellipse cx="292" cy="164" rx="220" ry="140" fill={`url(#glow-${pattern})`} />

      {pattern === "saas" && (
        <>
          {[0,1,2,3,4,5].map(i => (
            <circle key={i} cx={80 + i * 90} cy={164} r={12 + i * 8} fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity={0.15 + i * 0.04} />
          ))}
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={i} x1={i * 73} y1="0" x2={i * 73} y2="328" stroke={accent} strokeWidth="0.4" strokeOpacity="0.07" />
          ))}
          <circle cx="292" cy="164" r="48" fill="none" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="6 4" />
          <circle cx="292" cy="164" r="18" fill={accent} fillOpacity="0.2" />
          <circle cx="292" cy="164" r="6" fill={accent} fillOpacity="0.9" />
        </>
      )}

      {pattern === "ecom" && (
        <>
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <rect key={i} x={30 + i * 60} y={260 - (40 + i * 20) * (i % 2 ? 1 : 0.7)} width="36" height={40 + i * 20} rx="3" fill={accent} fillOpacity={0.06 + i * 0.02} />
          ))}
          <polyline points="30,240 90,190 150,210 210,150 270,120 330,90 390,110 450,70 510,80" fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.6" />
          <circle cx="510" cy="80" r="5" fill={accent} fillOpacity="0.8" />
        </>
      )}

      {pattern === "b2b" && (
        <>
          {[0,1,2,3,4,5,6].map(i => (
            <line key={i} x1="0" y1={i * 55} x2="584" y2={i * 55} stroke={accent} strokeWidth="0.4" strokeOpacity="0.08" />
          ))}
          {[0,1,2].map(i => (
            <rect key={i} x={60 + i * 180} y={80 + i * 20} width="120" height="60" rx="8" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity={0.2 + i * 0.1} />
          ))}
          <path d="M120 110 L240 110 M300 130 L420 130" stroke={accent} strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4 3" />
        </>
      )}

      {pattern === "tech" && (
        <>
          {[0,1,2,3].map(i => (
            <circle key={i} cx={100 + i * 130} cy={164} r={20 + i * 10} fill="none" stroke={accent} strokeWidth="0.6" strokeOpacity={0.1 + i * 0.07} />
          ))}
          <path d="M60 164 Q180 80 292 164 Q404 248 524 164" fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.45" />
          <path d="M60 200 Q180 116 292 200 Q404 284 524 200" fill="none" stroke={accent} strokeWidth="0.7" strokeOpacity="0.2" />
        </>
      )}

      {pattern === "fnb" && (
        <>
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={i} x1="0" y1={i * 47} x2="584" y2={i * 47} stroke={accent} strokeWidth="0.3" strokeOpacity="0.06" />
          ))}
          <circle cx="292" cy="164" r="80" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.18" strokeDasharray="8 5" />
          <circle cx="292" cy="164" r="44" fill={accent} fillOpacity="0.07" />
          {[0,1,2,3,4,5].map(i => {
            const angle = (i / 6) * Math.PI * 2
            return <line key={i} x1="292" y1="164" x2={292 + Math.cos(angle) * 75} y2={164 + Math.sin(angle) * 75} stroke={accent} strokeWidth="0.8" strokeOpacity="0.25" />
          })}
        </>
      )}

      {pattern === "realestate" && (
        <>
          {[0,1,2,3].map(i => (
            <rect key={i} x={60 + i * 130} y={100 + i * 8} width="90" height="130" rx="4" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity={0.12 + i * 0.05} />
          ))}
          <path d="M60 230 L584 230" stroke={accent} strokeWidth="0.5" strokeOpacity="0.15" />
          <path d="M60 180 L110 130 L160 180" fill="none" stroke={accent} strokeWidth="1.2" strokeOpacity="0.35" />
          <rect x="82" y="180" width="56" height="50" rx="2" fill={accent} fillOpacity="0.07" />
        </>
      )}

      {pattern === "creative" && (
        <>
          <path d="M0 0 L292 164 L584 0" fill="none" stroke={accent} strokeWidth="0.6" strokeOpacity="0.12" />
          <path d="M0 328 L292 164 L584 328" fill="none" stroke={accent} strokeWidth="0.6" strokeOpacity="0.12" />
          <path d="M292 30 L292 298" stroke={accent} strokeWidth="0.5" strokeOpacity="0.1" />
          <circle cx="292" cy="164" r="55" fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.3" />
          <polygon points="292,110 326,178 258,178" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.45" />
          <circle cx="292" cy="164" r="8" fill={accent} fillOpacity="0.7" />
        </>
      )}

      {pattern === "ai" && (
        <>
          {[[140,100],[292,60],[444,100],[500,220],[380,290],[200,290],[80,220]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="6" fill={accent} fillOpacity={0.5 + i * 0.05} />
          ))}
          {[[140,100,292,60],[292,60,444,100],[444,100,500,220],[500,220,380,290],[380,290,200,290],[200,290,80,220],[80,220,140,100],[140,100,500,220],[292,60,380,290]].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="0.7" strokeOpacity="0.2" />
          ))}
          <circle cx="292" cy="164" r="10" fill={accent} fillOpacity="0.8" />
        </>
      )}

      {/* subtle noise overlay */}
      <rect width="584" height="328" fill="url(#noise)" opacity="0.03" />
    </svg>
  )
}

const stats = [
  { value: "47+", label: "Projects" },
  { value: "3.8x", label: "Avg Revenue" },
  { value: "92%", label: "Retention" },
  { value: "$2M+", label: "Generated" },
]

/* -- scroll reveal hook ------------------------------------------- */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const children = el.querySelectorAll("[data-reveal]")
    children.forEach((child) => {
      const delay = Number(child.getAttribute("data-reveal-delay") || 0)
      setTimeout(() => {
        child.classList.add("revealed")
      }, delay)
    })
  }, [])

  return ref
}

/* -- page --------------------------------------------------------- */

export default function CaseStudiesPage() {
  const revealRef = useScrollReveal()

  return (
    <main
      id="main-content"
      className="relative min-h-screen"
      ref={revealRef}
      style={{ background: "var(--page-bg)" }}
    >
      <Navbar />
      <Breadcrumb items={[{ label: "Case Studies" }]} />

      {/* -- HERO -------------------------------------------------- */}
      <section className="relative pt-36 lg:pt-48 pb-24 lg:pb-32 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-8"
            style={{ color: "#8B6B3D" }}
          >
            Case Studies
          </div>

          <h1
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6"
          >
            <span style={{ color: "var(--ink-strong)" }}>Real results,</span>
            <br />
            <span style={{ color: "var(--ink-strong)" }}>real clients</span>
          </h1>

          <p
            data-reveal
            data-reveal-delay={200}
            className="reveal-item text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4"
            style={{ color: "var(--ink-muted)" }}
          >
            See how teams use 9Ruby to ship faster and scale smarter.
          </p>
          <p
            data-reveal
            data-reveal-delay={300}
            className="reveal-item font-mono text-xs"
            style={{ color: "var(--ink-soft)" }}
          >
            47+ projects delivered across 6 industries
          </p>
        </div>
      </section>

      {/* -- STATS ROW --------------------------------------------- */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "rgba(0,0,0,0.04)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "rgba(0,0,0,0.04)" }} />

        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-reveal
                data-reveal-delay={i * 120}
                className="reveal-item text-center"
              >
                <div
                  className="text-5xl md:text-6xl lg:text-7xl font-serif italic tracking-tighter mb-3"
                  style={{ color: "var(--ink-strong)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- CASE STUDIES GRID ------------------------------------- */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16 lg:mb-20">
            <div
              data-reveal
              data-reveal-delay={0}
              className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-6"
              style={{ color: "#8B6B3D" }}
            >
              Client Work
            </div>
            <h2
              data-reveal
              data-reveal-delay={100}
              className="reveal-item text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tighter"
            >
              <span style={{ color: "var(--ink-strong)" }}>Proven </span>
              <span style={{ color: "var(--ink-soft)" }}>Impact</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {caseStudies.map((cs, i) => (
              <div
                key={cs.client}
                data-reveal
                data-reveal-delay={i * 80}
                className="reveal-item group relative rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-black/[0.03]"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <CaseVisual visual={cs.visual} title={cs.title} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.45) 100%)" }} />
                  <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-3">
                    <span
                      className="text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded-full"
                      style={{
                        color: "#111",
                        background: "rgba(255,255,255,0.82)",
                      }}
                    >
                      {cs.client}
                    </span>
                    <span
                      className="text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded-full"
                      style={{
                        color: "#fff",
                        background: "rgba(0,0,0,0.45)",
                      }}
                    >
                      {cs.industry}
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded-full"
                      style={{
                        color: "#8B6B3D",
                        background: "rgba(139,107,61,0.04)",
                        border: "1px solid rgba(139,107,61,0.08)",
                      }}
                    >
                      {cs.industry}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {cs.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            color: "var(--ink-soft)",
                            background: "rgba(0,0,0,0.02)",
                            border: "1px solid rgba(0,0,0,0.04)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3
                    className="text-xl font-semibold tracking-tight mb-1"
                    style={{ color: "var(--ink-strong)" }}
                  >
                    {cs.title}
                  </h3>
                  <p
                    className="text-sm font-medium mb-6"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    Client: {cs.client}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div>
                      <div
                        className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-1.5"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        Challenge
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {cs.challenge}
                      </p>
                    </div>

                    <div>
                      <div
                        className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-1.5"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        Solution
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {cs.solution}
                      </p>
                    </div>

                    <div>
                      <div
                        className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-1.5"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        Result
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-3xl lg:text-4xl font-serif italic tracking-tighter"
                          style={{ color: "var(--ink-strong)" }}
                        >
                          {cs.result}
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: "var(--ink-muted)" }}
                        >
                          {cs.resultLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#1A1A1A] transition-colors duration-300 group/btn"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    Read Full Story
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- CTA --------------------------------------------------- */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <h2
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-4xl md:text-5xl lg:text-7xl font-serif italic tracking-tighter leading-tight mb-6"
          >
            <span style={{ color: "var(--ink-strong)" }}>Ready to be our</span>
            <br />
            <span style={{ color: "var(--ink-soft)" }}>next success story?</span>
          </h2>
          <p
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-lg leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: "var(--ink-muted)" }}
          >
            Tell us about your challenge. We&apos;ll show you how AI agents can
            transform your business - just like they did for these clients.
          </p>
          <div
            data-reveal
            data-reveal-delay={200}
            className="reveal-item flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="h-10 px-7 rounded-full bg-[#1A1A1A] text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all duration-300 inline-flex items-center gap-2"
              style={{ color: "#F8F7F4" }}
            >
              Start Your Project <ArrowRight size={14} />
            </Link>
            <Link
              href="/services"
              className="h-10 px-7 rounded-full text-sm font-medium hover:bg-black/[0.02] transition-all duration-300 inline-flex items-center"
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                color: "var(--ink-muted)",
              }}
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </main>
  )
}
