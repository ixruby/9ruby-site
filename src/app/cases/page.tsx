"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const caseStudies = [
  {
    client: "TechScale",
    title: "SaaS Growth Engine",
    industry: "SaaS",
    tags: ["AI Agents", "SEO", "Content"],
    challenge: "Stagnant growth across all channels with declining organic traffic and no scalable acquisition strategy.",
    solution: "Deployed AI-powered content agents paired with technical SEO automation to build a compounding growth loop.",
    result: "3.2x",
    resultLabel: "revenue in 90 days",
  },
  {
    client: "Kayupinus",
    title: "E-commerce Revenue Machine",
    industry: "E-commerce",
    tags: ["Email", "Automation"],
    challenge: "Low conversion rates and underperforming email channel leaving significant revenue on the table.",
    solution: "Built automated email flows with dynamic pricing triggers and behavior-based segmentation.",
    result: "287%",
    resultLabel: "increase in email revenue",
  },
  {
    client: "QAN LLC",
    title: "B2B Email Revival",
    industry: "B2B",
    tags: ["Email", "AI"],
    challenge: "Email open rates stuck at 2%, rendering the entire outbound pipeline ineffective.",
    solution: "AI-optimized subject lines, smart send-time delivery, and deep audience segmentation.",
    result: "340%",
    resultLabel: "increase in open rates",
  },
  {
    client: "Novavox",
    title: "Multi-Channel Launch",
    industry: "Tech",
    tags: ["Marketing", "Launch"],
    challenge: "New product with zero existing audience and no brand awareness in a competitive market.",
    solution: "Coordinated social, email, and paid ads campaign orchestrated by AI agents for maximum reach.",
    result: "10K",
    resultLabel: "leads in 30 days",
  },
  {
    client: "Chaiwala Taste House",
    title: "Cafe AI Platform",
    industry: "F&B Tech",
    tags: ["Web App", "AI Integration"],
    challenge: "Needed a modern ordering platform with an embedded AI assistant for customer queries and menu discovery.",
    solution: "Built a full-stack cafe platform with embedded AI assistant, full docs site, and autonomous menu management.",
    result: "450+",
    resultLabel: "qualified leads/month",
  },
  {
    client: "Saumya Properties",
    title: "Real Estate Automation",
    industry: "Real Estate",
    tags: ["Automation", "Content"],
    challenge: "Manual listing management consuming hours daily with inconsistent property descriptions.",
    solution: "AI-generated property descriptions, automated photo scheduling, and a self-updating listings portal.",
    result: "80%",
    resultLabel: "time saved, 25 listings managed",
  },
  {
    client: "AZKA ADS",
    title: "Samurai Brand Identity",
    industry: "Creative",
    tags: ["Brand Identity", "Landing Page"],
    challenge: "A Dubai marketing agency needed a brand identity that commanded attention in a saturated market.",
    solution: "Developed a samurai-meets-agency identity: eagle iconography, sword SFX on interaction, and a dark cinematic palette.",
    result: "100%",
    resultLabel: "brand recognition uplift",
  },
  {
    client: "PRISM Internal",
    title: "Five-Agent AI System",
    industry: "AI / Ops",
    tags: ["AI System", "Automation"],
    challenge: "IX Ruby needed internal AI infrastructure to handle research, execution, frontend, and ops at scale.",
    solution: "Built PRISM — a five-agent orchestration system (PRISM, FORGE, SCOUT, PIXEL, JUNO) on private infrastructure.",
    result: "5x",
    resultLabel: "throughput vs. single-agent setup",
  },
]

const stats = [
  { value: "47+", label: "Projects" },
  { value: "3.8x", label: "Avg Revenue" },
  { value: "92%", label: "Retention" },
  { value: "$2M+", label: "Generated" },
]

export default function CaseStudiesPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Case Studies" }]} />

      {/* HERO */}
      <section style={{ background: "#8C000E" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
            Case Studies
          </p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(56px, 10vw, 120px)", color: "#fff", marginBottom: 28 }}>
            PROJECTS
          </h1>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 520, margin: "0 auto 12px" }}>
            Real results, real clients. See how teams use 9Ruby to ship faster and scale smarter.
          </p>
          <p style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.44)", letterSpacing: "0.06em" }}>
            47+ projects delivered across 6 industries
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="py-10 px-6 text-center" style={{ borderRight: i % 2 === 0 || i < 3 ? BORDER : "none", borderBottom: i < 2 ? BORDER : "none" }}>
                <div style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(28px,5vw,40px)", color: "#C8102E", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 6 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>* Work</p>
              <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(40px,7vw,72px)", color: "#fff" }}>
                ALL<br />CASES
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: BORDER }}>
            {caseStudies.map((cs, i) => (
              <div
                key={cs.client}
                className="p-8 md:p-10 flex flex-col gap-5 group hover:bg-white/[0.02] transition-colors"
                style={{
                  borderRight: i % 2 === 0 ? BORDER : undefined,
                  borderBottom: BORDER,
                }}
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8102E", border: "0.8px solid rgba(200,16,46,0.4)", padding: "3px 10px" }}>
                    {cs.industry}
                  </span>
                  {cs.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: NV, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", border: BORDER, padding: "3px 10px" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                    {cs.client}
                  </p>
                  <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.055em", lineHeight: 0.93, fontSize: "clamp(24px,3.5vw,36px)", color: "#fff" }}>
                    {cs.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <p style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Challenge</p>
                    <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.44)" }}>{cs.challenge}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Solution</p>
                    <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.44)" }}>{cs.solution}</p>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-5 mt-auto" style={{ borderTop: BORDER }}>
                  <div>
                    <p style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Result</p>
                    <div className="flex items-baseline gap-2">
                      <span style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(28px,4vw,40px)", color: "#C8102E", letterSpacing: "-0.05em", lineHeight: 1 }}>{cs.result}</span>
                      <span style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.44)" }}>{cs.resultLabel}</span>
                    </div>
                  </div>
                  <Link href="/contact" className="inline-flex items-center gap-1 hover:text-white transition-colors" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
                    Read Story <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#8C000E" }} className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2rem,5vw,4rem)", color: "#fff", marginBottom: 16 }}>
              READY TO BE OUR<br />NEXT SUCCESS STORY?
            </h2>
            <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: 420 }}>
              Tell us about your challenge. We&apos;ll show you how AI agents can transform your business.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "12px 28px", textDecoration: "none" }}>
              Start Your Project <ArrowRight size={12} />
            </Link>
            <Link href="/services" className="inline-flex items-center hover:opacity-80 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "0.8px solid rgba(255,255,255,0.4)", color: "#fff", padding: "12px 28px", textDecoration: "none" }}>
              View Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
