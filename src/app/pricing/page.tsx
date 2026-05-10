"use client"

import { useState } from "react"
import { CheckCircle2, X, ArrowRight, Zap, Shield, ChevronDown, Users, Sparkles, Orbit, Crown } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const monthlyPrices = { starter: 49, core: 99.99, prime: 999.99, black: 9999.99 }
const annualPrices  = { starter: 39, core: 79.99, prime: 799.99, black: 7999.99 }

const tiers = [
  {
    key: "starter" as const,
    name: "Starter",
    desc: "Start with 9Ruby AI",
    icon: Sparkles,
    eyebrow: "Launch access",
    cta: "Start with AI",
    ctaHref: "https://ai.9ruby.com",
    featured: false,
    features: [
      "9Ruby AI workspace",
      "Ruby 9 Sonnet + starter tools",
      "Design Studio generations",
      "Templates and prompt kits",
      "Best for solo builders",
      "Self-serve onboarding",
    ],
  },
  {
    key: "core" as const,
    name: "Core",
    desc: "For focused operators",
    icon: Orbit,
    eyebrow: "Orbital ring one",
    cta: "Choose Core",
    ctaHref: "/contact",
    featured: false,
    features: [
      "Everything in Starter",
      "Website refresh or landing page",
      "Automation setup for one workflow",
      "Monthly SEO or content sprint",
      "Priority async support",
      "Best for founders validating offers",
    ],
  },
  {
    key: "prime" as const,
    name: "Prime",
    desc: "For growth-stage brands",
    icon: Zap,
    eyebrow: "Orbital ring two",
    badge: "Most Popular",
    cta: "Book Prime",
    ctaHref: "/contact",
    featured: true,
    features: [
      "AI agents + website + marketing stack",
      "Voice agent or chatbot deployment",
      "Growth analytics and reporting",
      "Parallel execution across content & dev",
      "Dedicated strategy cadence",
      "Best for brands scaling offers fast",
    ],
  },
  {
    key: "black" as const,
    name: "Black",
    desc: "For flagship systems",
    icon: Crown,
    eyebrow: "Orbital ring three",
    cta: "Apply for Black",
    ctaHref: "/contact",
    featured: false,
    features: [
      "Everything in Prime",
      "Full product system or platform build",
      "Custom voice and AI infrastructure",
      "Executive advisory and launch ops",
      "Dedicated build capacity",
      "Best for category-defining brands",
    ],
  },
]

const comparisonData = [
  {
    category: "AI & Models",
    features: [
      { name: "AI workspace access", starter: "Starter", core: "Full", prime: "Full", black: "Full" },
      { name: "Model depth", starter: "Sonnet", core: "Sonnet + tools", prime: "Advanced routing", black: "Custom routing" },
      { name: "Agent involvement", starter: "Self-serve", core: "Guided", prime: "Managed", black: "Dedicated" },
      { name: "Voice AI", starter: false, core: false, prime: true, black: true },
    ],
  },
  {
    category: "Build & Delivery",
    features: [
      { name: "Website work", starter: "DIY", core: "Refreshes", prime: "Growth builds", black: "Full systems" },
      { name: "Automation buildout", starter: false, core: "1 workflow", prime: "Multi-workflow", black: "Full stack" },
      { name: "Custom software scope", starter: false, core: false, prime: "Selective", black: "Extensive" },
    ],
  },
  {
    category: "Growth & Ops",
    features: [
      { name: "SEO / content ops", starter: false, core: "Light", prime: "Managed", black: "Full engine" },
      { name: "Analytics", starter: "Basic", core: "Monthly", prime: "Real-time", black: "Executive" },
      { name: "Integrations", starter: "Core", core: "Business stack", prime: "Growth stack", black: "Custom stack" },
    ],
  },
  {
    category: "Access & Support",
    features: [
      { name: "Strategy support", starter: "Community", core: "Async", prime: "Dedicated cadence", black: "Executive line" },
      { name: "Turnaround speed", starter: "Self-paced", core: "Standard", prime: "Priority", black: "Fastest lane" },
      { name: "White-label / private ops", starter: false, core: false, prime: false, black: true },
    ],
  },
]

const faqItems = [
  { q: "Can I switch plans at any time?", a: "Yes. Start with Starter, then move into Core, Prime, or Black as your needs expand. We scope the upgrade path around your workflows and delivery volume." },
  { q: "Is this just SaaS pricing?", a: "No. Starter is self-serve AI access. Core, Prime, and Black combine software, automation, websites, voice systems, and agency execution into one offer." },
  { q: "What is the difference between Core and Prime?", a: "Core is for a focused execution lane like a landing page, one automation, or a monthly growth sprint. Prime is for brands that need multiple channels moving together with dedicated strategy." },
  { q: "When should I choose Black?", a: "Choose Black when you need a flagship product system, deep AI infrastructure, voice agents, launch operations, and consistent executive-level delivery capacity." },
  { q: "Can voice AI be included?", a: "Yes. Voice AI sits inside Prime and Black, or it can be scoped as a focused engagement if you need outbound calling, inbound support, or appointment booking." },
  { q: "Can I get a custom quote?", a: "Yes. Prime and Black engagements are scoped around your stack, timelines, and deliverables. Contact us and we will shape the right build lane." },
  { q: "Is my data secure?", a: "All plans include secure delivery practices. Higher tiers can add private infrastructure, tighter access controls, and custom deployment requirements." },
  { q: "Can 9Ruby replace separate vendors?", a: "That is the point. The combined offer pulls AI tooling, websites, growth systems, and agency execution into one operating layer instead of four separate vendors." },
]

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value
      ? <CheckCircle2 size={14} style={{ color: "#C8102E", margin: "0 auto", display: "block" }} />
      : <X size={14} style={{ color: "rgba(255,255,255,0.2)", margin: "0 auto", display: "block" }} />
  }
  return <span style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.44)" }}>{value}</span>
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: BORDER }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
        <span style={{ fontFamily: NV, fontSize: 14, color: "rgba(255,255,255,0.7)", paddingRight: 32 }}>{question}</span>
        <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }} />
      </button>
      {open && (
        <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.44)", paddingBottom: 24, paddingRight: 32 }}>
          {answer}
        </p>
      )}
    </div>
  )
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const getPrice = (key: "starter" | "core" | "prime" | "black") => (annual ? annualPrices : monthlyPrices)[key]

  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Pricing" }]} />

      {/* HERO */}
      <section style={{ background: "#8C000E" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Pricing</p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(56px, 10vw, 120px)", color: "#fff", marginBottom: 28 }}>
            PRICING
          </h1>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto 40px" }}>
            One ladder for AI, agency, and systems. Start with 9Ruby AI. Scale into IX Ruby execution.
          </p>
          {/* Toggle */}
          <div style={{ display: "inline-flex", border: BORDER, overflow: "hidden", padding: 3, gap: 3 }}>
            <button onClick={() => setAnnual(false)} style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 20px", border: "none", cursor: "pointer", background: !annual ? "#fff" : "transparent", color: !annual ? "#080808" : "rgba(255,255,255,0.5)", transition: "all 0.2s" }}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)} style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 20px", border: "none", cursor: "pointer", background: annual ? "#fff" : "transparent", color: annual ? "#080808" : "rgba(255,255,255,0.5)", transition: "all 0.2s", position: "relative" }}>
              Annual
              <span style={{ position: "absolute", top: -8, right: -4, fontFamily: NV, fontSize: 9, fontWeight: 800, background: "#C8102E", color: "#fff", padding: "2px 6px", letterSpacing: "0.06em" }}>-20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: BORDER }}>
            {tiers.map((t, i) => {
              const price = getPrice(t.key)
              const Icon = t.icon
              const isFeatured = t.featured
              return (
                <div key={t.name} className="p-8 flex flex-col relative" style={{ borderRight: (i + 1) % 4 !== 0 ? BORDER : undefined, borderBottom: BORDER, background: isFeatured ? "rgba(200,16,46,0.06)" : "transparent" }}>
                  {t.badge && (
                    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", fontFamily: NV, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", background: "#C8102E", color: "#fff", padding: "4px 16px" }}>
                      {t.badge}
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-2" style={{ marginTop: t.badge ? 28 : 0 }}>
                    <div style={{ width: 32, height: 32, border: isFeatured ? "0.8px solid rgba(200,16,46,0.4)" : BORDER, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={14} style={{ color: isFeatured ? "#C8102E" : "rgba(255,255,255,0.4)" }} />
                    </div>
                    <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.04em", fontSize: 20, color: "#fff" }}>{t.name}</h3>
                  </div>
                  <p style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.44)", marginBottom: 4 }}>{t.desc}</p>
                  <p style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: isFeatured ? "#C8102E" : "rgba(255,255,255,0.25)", marginBottom: 24 }}>{t.eyebrow}</p>

                  <div className="mb-7">
                    <div className="flex items-baseline gap-1">
                      <span style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(36px,4vw,48px)", color: isFeatured ? "#C8102E" : "#fff", letterSpacing: "-0.05em", lineHeight: 1 }}>${price}</span>
                      <span style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>/mo</span>
                    </div>
                    {annual && <p style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Billed ${(price * 12).toFixed(0)}/year</p>}
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {t.features.map((f) => (
                      <li key={f} className="flex gap-2 items-start">
                        <CheckCircle2 size={12} style={{ color: isFeatured ? "#C8102E" : "rgba(255,255,255,0.25)", flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={t.ctaHref} className="inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: isFeatured ? "#C8102E" : "transparent", color: "#fff", border: isFeatured ? "none" : "0.8px solid rgba(255,255,255,0.25)", padding: "10px 22px", textDecoration: "none" }}>
                    {t.cta} <ArrowRight size={11} />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-10">
            <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8102E", marginBottom: 12 }}>Compare</p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(36px,5vw,52px)", color: "#fff" }}>ALL FEATURES</h2>
          </div>
          <div style={{ border: BORDER, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: BORDER }}>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Feature</th>
                  {["Starter", "Core", "Prime", "Black"].map((col) => (
                    <th key={col} style={{ textAlign: "center", padding: "16px 16px", fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: col === "Prime" ? "#C8102E" : "rgba(255,255,255,0.4)" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((group) => (
                  <>
                    <tr key={`cat-${group.category}`} style={{ borderBottom: BORDER }}>
                      <td colSpan={5} style={{ padding: "10px 20px", fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.02)" }}>
                        {group.category}
                      </td>
                    </tr>
                    {group.features.map((f) => (
                      <tr key={f.name} style={{ borderBottom: BORDER }}>
                        <td style={{ padding: "14px 20px", fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{f.name}</td>
                        <td style={{ textAlign: "center", padding: "14px 16px" }}><CellValue value={f.starter} /></td>
                        <td style={{ textAlign: "center", padding: "14px 16px" }}><CellValue value={f.core} /></td>
                        <td style={{ textAlign: "center", padding: "14px 16px", background: "rgba(200,16,46,0.04)" }}><CellValue value={f.prime} /></td>
                        <td style={{ textAlign: "center", padding: "14px 16px" }}><CellValue value={f.black} /></td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8102E", marginBottom: 16 }}>FAQ</p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(32px,5vw,52px)", color: "#fff" }}>COMMON QUESTIONS</h2>
          </div>
          <div style={{ borderTop: BORDER }}>
            {faqItems.map((item) => <FAQItem key={item.q} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* GUARANTEE + CTA */}
      <section style={{ background: "#8C000E" }} className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Shield size={32} style={{ color: "#fff", marginBottom: 20 }} />
            <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", marginBottom: 16 }}>
              30-DAY MONEY<br />BACK GUARANTEE
            </h3>
            <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: 420 }}>
              If the fit is wrong early, we reset scope fast instead of trapping you inside a vague retainer.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a href="https://ai.9ruby.com" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "12px 28px", textDecoration: "none" }}>
              Start with AI <ArrowRight size={11} />
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "0.8px solid rgba(255,255,255,0.4)", color: "#fff", padding: "12px 28px", textDecoration: "none" }}>
              <Users size={11} /> Book a Call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
