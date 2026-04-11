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
  },
  {
    client: "Chaiwala Taste House",
    title: "Café AI Platform",
    industry: "F&B Tech",
    tags: ["Web App", "AI Integration"],
    challenge:
      "Needed a modern ordering platform with an embedded AI assistant to handle customer queries and menu discovery.",
    solution:
      "Built a full-stack café platform with embedded AI assistant, full docs site, and autonomous menu management.",
    result: "450+",
    resultLabel: "qualified leads/month",
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
  },
  {
    client: "PRISM Internal",
    title: "Five-Agent AI System",
    industry: "AI / Ops",
    tags: ["AI System", "Automation"],
    challenge:
      "IX Ruby needed an internal AI infrastructure to handle research, execution, frontend, and ops at scale.",
    solution:
      "Built PRISM — a five-agent orchestration system (PRISM, FORGE, SCOUT, PIXEL, JUNO) running on private infrastructure.",
    result: "5×",
    resultLabel: "throughput vs. single-agent setup",
  },
]

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
      style={{ background: "#F8F7F4" }}
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
            style={{ color: "#C41A3B" }}
          >
            Case Studies
          </div>

          <h1
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6"
          >
            <span style={{ color: "#1A1A1A" }}>Real results,</span>
            <br />
            <span style={{ color: "#1A1A1A" }}>real clients</span>
          </h1>

          <p
            data-reveal
            data-reveal-delay={200}
            className="reveal-item text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4"
            style={{ color: "#7A7A72" }}
          >
            See how teams use 9Ruby to ship faster and scale smarter.
          </p>
          <p
            data-reveal
            data-reveal-delay={300}
            className="reveal-item font-mono text-xs"
            style={{ color: "#B8B8B0" }}
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
                  style={{ color: "#1A1A1A" }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: "#B8B8B0" }}
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
          {/* section header */}
          <div className="text-center mb-16 lg:mb-20">
            <div
              data-reveal
              data-reveal-delay={0}
              className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-6"
              style={{ color: "#C41A3B" }}
            >
              Client Work
            </div>
            <h2
              data-reveal
              data-reveal-delay={100}
              className="reveal-item text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tighter"
            >
              <span style={{ color: "#1A1A1A" }}>Proven </span>
              <span style={{ color: "#B8B8B0" }}>Impact</span>
            </h2>
          </div>

          {/* grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {caseStudies.map((cs, i) => (
              <div
                key={cs.client}
                data-reveal
                data-reveal-delay={i * 80}
                className="reveal-item group relative rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-black/[0.03]"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="p-8 lg:p-10">
                  {/* industry tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded-full"
                      style={{
                        color: "#C41A3B",
                        background: "rgba(196,26,59,0.04)",
                        border: "1px solid rgba(196,26,59,0.08)",
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
                            color: "#B8B8B0",
                            background: "rgba(0,0,0,0.02)",
                            border: "1px solid rgba(0,0,0,0.04)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* client + title */}
                  <h3
                    className="text-xl font-semibold tracking-tight mb-1"
                    style={{ color: "#1A1A1A" }}
                  >
                    {cs.title}
                  </h3>
                  <p
                    className="text-sm font-medium mb-6"
                    style={{ color: "#7A7A72" }}
                  >
                    Client: {cs.client}
                  </p>

                  {/* challenge / solution / result */}
                  <div className="space-y-4 mb-8">
                    <div>
                      <div
                        className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-1.5"
                        style={{ color: "#B8B8B0" }}
                      >
                        Challenge
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#7A7A72" }}
                      >
                        {cs.challenge}
                      </p>
                    </div>

                    <div>
                      <div
                        className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-1.5"
                        style={{ color: "#B8B8B0" }}
                      >
                        Solution
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#7A7A72" }}
                      >
                        {cs.solution}
                      </p>
                    </div>

                    <div>
                      <div
                        className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-1.5"
                        style={{ color: "#B8B8B0" }}
                      >
                        Result
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-3xl lg:text-4xl font-serif italic tracking-tighter"
                          style={{ color: "#1A1A1A" }}
                        >
                          {cs.result}
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: "#7A7A72" }}
                        >
                          {cs.resultLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* read full story link */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#1A1A1A] transition-colors duration-300 group/btn"
                    style={{ color: "#7A7A72" }}
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
            <span style={{ color: "#1A1A1A" }}>Ready to be our</span>
            <br />
            <span style={{ color: "#B8B8B0" }}>next success story?</span>
          </h2>
          <p
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-lg leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: "#7A7A72" }}
          >
            Tell us about your challenge. We&apos;ll show you how AI agents can
            transform your business — just like they did for these clients.
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
                color: "#7A7A72",
              }}
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* -- inline styles for animations -------------------------- */}
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
