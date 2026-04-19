"use client"

import { useState } from "react"
import { CheckCircle2, X, ArrowRight, Zap, Shield, ChevronDown, Users, Building2, Sparkles, Orbit, Crown } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

/* --- Data --- */

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
    style: "glass" as const,
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
    style: "glass" as const,
    features: [
      "Everything in Starter",
      "Website refresh or landing page support",
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
    style: "highlighted" as const,
    features: [
      "AI agents + website + marketing stack",
      "Voice agent or chatbot deployment",
      "Growth analytics and reporting",
      "Parallel execution across content, SEO, and dev",
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
    style: "dark" as const,
    features: [
      "Everything in Prime",
      "Full product system or platform build",
      "Custom voice and AI infrastructure",
      "Executive advisory and launch operations",
      "Dedicated build capacity",
      "Best for category-defining brands",
    ],
  },
]

type FeatureCategory = {
  category: string
  features: {
    name: string
    free: string | boolean
    starter: string | boolean
    pro: string | boolean
    enterprise: string | boolean
  }[]
}

const comparisonData: FeatureCategory[] = [
  {
    category: "AI & Models",
      features: [
        { name: "AI workspace access", free: "Starter", starter: "Full", pro: "Full", enterprise: "Full" },
        { name: "Model depth", free: "Sonnet", starter: "Sonnet + tools", pro: "Advanced routing", enterprise: "Custom routing" },
        { name: "Agent involvement", free: "Self-serve", starter: "Guided", pro: "Managed", enterprise: "Dedicated" },
        { name: "Voice AI", free: false, starter: false, pro: true, enterprise: true },
      ],
  },
  {
    category: "Build & Delivery",
    features: [
      { name: "Website work", free: "DIY", starter: "Refreshes", pro: "Growth builds", enterprise: "Full systems" },
      { name: "Automation buildout", free: false, starter: "1 workflow", pro: "Multi-workflow", enterprise: "Full stack" },
      { name: "Custom software scope", free: false, starter: false, pro: "Selective", enterprise: "Extensive" },
    ],
  },
  {
    category: "Growth & Ops",
    features: [
      { name: "SEO / content ops", free: false, starter: "Light", pro: "Managed", enterprise: "Full engine" },
      { name: "Analytics", free: "Basic", starter: "Monthly", pro: "Real-time", enterprise: "Executive" },
      { name: "Integrations", free: "Core", starter: "Business stack", pro: "Growth stack", enterprise: "Custom stack" },
    ],
  },
  {
    category: "Access & Support",
    features: [
      { name: "Strategy support", free: "Community", starter: "Async", pro: "Dedicated cadence", enterprise: "Executive line" },
      { name: "Turnaround speed", free: "Self-paced", starter: "Standard", pro: "Priority", enterprise: "Fastest lane" },
      { name: "White-label / private ops", free: false, starter: false, pro: false, enterprise: true },
    ],
  },
]

const faqItems = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. Start with Starter, then move into Core, Prime, or Black as your needs expand. We scope the upgrade path around your workflows and delivery volume.",
  },
  {
    q: "Is this just SaaS pricing?",
    a: "No. Starter is self-serve AI access. Core, Prime, and Black combine software, automation, websites, voice systems, and agency execution into one offer.",
  },
  {
    q: "What is the difference between Core and Prime?",
    a: "Core is for a focused execution lane like a landing page, one automation, or a monthly growth sprint. Prime is for brands that need multiple channels moving together with dedicated strategy.",
  },
  {
    q: "When should I choose Black?",
    a: "Choose Black when you need a flagship product system, deep AI infrastructure, voice agents, launch operations, and consistent executive-level delivery capacity.",
  },
  {
    q: "Can voice AI be included?",
    a: "Yes. Voice AI sits inside Prime and Black, or it can be scoped as a focused engagement if you need outbound calling, inbound support, or appointment booking.",
  },
  {
    q: "Can I get a custom quote?",
    a: "Yes. Prime and Black engagements are scoped around your stack, timelines, and deliverables. Contact us and we will shape the right build lane.",
  },
  {
    q: "Is my data secure?",
    a: "All plans include secure delivery practices. Higher tiers can add private infrastructure, tighter access controls, and custom deployment requirements.",
  },
  {
    q: "Can 9Ruby replace separate vendors?",
    a: "That is the point. The combined offer pulls AI tooling, websites, growth systems, and agency execution into one operating layer instead of four separate vendors.",
  },
]

/* --- Components --- */

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value
      ? <CheckCircle2 size={16} className="text-[#8B6B3D] mx-auto" />
      : <X size={16} className="mx-auto" style={{ color: "var(--ink-soft)" }} />
  }
  return <span className="text-sm" style={{ color: "var(--ink-muted)" }}>{value}</span>
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-base font-medium group-hover:text-[#1A1A1A] transition-colors pr-8" style={{ color: "var(--ink-muted)" }}>
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: open ? "#7A7A72" : "#B8B8B0" }}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm leading-relaxed pr-12" style={{ color: "var(--ink-muted)" }}>{answer}</p>
      </div>
    </div>
  )
}

/* --- Page --- */

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  const getPrice = (key: "starter" | "core" | "prime" | "black") => {
    const prices = annual ? annualPrices : monthlyPrices
    return prices[key]
  }

  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Pricing" }]} />

      {/* HERO */}
      <section className="relative pt-36 lg:pt-44 pb-16 lg:pb-20">
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-6" style={{ color: "#8B6B3D" }}>
            Pricing
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6" style={{ color: "var(--ink-strong)" }}>
            One ladder for AI,
            <br />
            agency, and systems
          </h1>

          <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: "var(--ink-muted)" }}>
            Start with 9Ruby AI. Scale into IX Ruby execution. The same brand now covers self-serve tools, growth retainers, and flagship product builds.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12 text-left">
            {[
              { label: "Starter", value: "AI workspace", copy: "Self-serve access to 9Ruby AI, templates, and launch tools." },
              { label: "Core / Prime", value: "Agency execution", copy: "Websites, automations, SEO, analytics, and voice systems." },
              { label: "Black", value: "Flagship builds", copy: "Full operating systems, custom products, and dedicated launch capacity." },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-5 bg-white" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: "var(--ink-soft)" }}>
                  {item.label}
                </div>
                <div className="text-base font-semibold mb-2" style={{ color: "var(--ink-strong)" }}>
                  {item.value}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {item.copy}
                </p>
              </div>
            ))}
          </div>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 bg-white rounded-full p-1" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !annual
                  ? "bg-[#1A1A1A] text-[#F8F7F4]"
                  : "hover:text-[#1A1A1A]"
              }`}
              style={annual ? { color: "var(--ink-muted)" } : {}}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                annual
                  ? "bg-[#1A1A1A] text-[#F8F7F4]"
                  : "hover:text-[#1A1A1A]"
              }`}
              style={!annual ? { color: "var(--ink-muted)" } : {}}
            >
              Annual
              <span className="absolute -top-2.5 -right-4 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B6B3D] text-white whitespace-nowrap">
                -20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="relative pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {tiers.map((t) => {
              const price = getPrice(t.key)
              const isHighlighted = t.style === "highlighted"
              const Icon = t.icon

              return (
                <div
                  key={t.name}
                  className={`relative flex flex-col rounded-2xl transition-all duration-500 ${
                    isHighlighted ? "lg:-mt-4 lg:mb-4" : ""
                  }`}
                >
                  {/* Accent border for highlighted */}
                  {isHighlighted && (
                    <div className="absolute -inset-px rounded-2xl bg-[#1A1A1A] pointer-events-none" />
                  )}

                  {/* Badge */}
                  {t.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-[#1A1A1A] text-[#F8F7F4] flex items-center gap-1.5">
                        {t.badge}
                      </span>
                    </div>
                  )}

                  <div
                    className={`relative flex flex-col p-8 rounded-2xl h-full transition-all duration-300 ${
                      isHighlighted
                        ? "bg-[#1A1A1A]"
                        : "bg-white hover:shadow-lg hover:shadow-black/[0.03]"
                    }`}
                    style={!isHighlighted ? { border: "1px solid rgba(0,0,0,0.04)" } : {}}
                  >
                    {/* Icon + Name */}
                    <div className="flex items-center gap-3 mb-1">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isHighlighted
                            ? "bg-white/10"
                            : ""
                        }`}
                        style={!isHighlighted ? { background: "rgba(0,0,0,0.02)" } : {}}
                      >
                        <Icon
                          size={14}
                          className={isHighlighted ? "text-white" : ""}
                          style={!isHighlighted ? { color: "var(--ink-muted)" } : {}}
                        />
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight" style={{ color: isHighlighted ? "#F8F7F4" : "#1A1A1A" }}>{t.name}</h3>
                    </div>
                    <p className="text-sm mb-6 ml-11" style={{ color: isHighlighted ? "rgba(248,247,244,0.5)" : "#7A7A72" }}>{t.desc}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-6 ml-11" style={{ color: isHighlighted ? "rgba(248,247,244,0.3)" : "#B8B8B0" }}>
                      {t.eyebrow}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-serif italic tracking-tighter" style={{ color: isHighlighted ? "#F8F7F4" : "#1A1A1A" }}>${price}</span>
                        <span className="text-sm" style={{ color: isHighlighted ? "rgba(248,247,244,0.3)" : "#B8B8B0" }}>/mo</span>
                      </div>
                      {annual && price > 0 && (
                        <p className="font-mono text-xs mt-1.5" style={{ color: isHighlighted ? "rgba(248,247,244,0.3)" : "#B8B8B0" }}>
                          Billed ${price * 12}/year
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-10 flex-1">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: isHighlighted ? "rgba(248,247,244,0.7)" : "#7A7A72" }}>
                          <CheckCircle2
                            size={14}
                            className={`shrink-0 mt-0.5 ${
                              isHighlighted ? "text-[#8B6B3D]" : ""
                            }`}
                            style={!isHighlighted ? { color: "var(--ink-soft)" } : {}}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={t.ctaHref}
                      className={`h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                        isHighlighted
                          ? "bg-[#F8F7F4] text-[#1A1A1A] hover:bg-white"
                          : "hover:bg-black/[0.02]"
                      }`}
                      style={!isHighlighted ? { border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-muted)" } : {}}
                    >
                      {t.cta}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="relative pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-serif italic tracking-tighter mb-2" style={{ color: "var(--ink-strong)" }}>Compare plans</h2>
          <p className="text-base mb-12" style={{ color: "var(--ink-muted)" }}>Every feature, side by side.</p>

          <div className="overflow-x-auto rounded-2xl bg-white" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
            <table className="w-full min-w-[750px]">
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.01)" }}>
                  <th className="text-left text-sm font-normal py-4 px-6 w-[30%]" style={{ color: "var(--ink-muted)" }}>
                    Feature
                  </th>
                  <th className="text-center text-sm font-normal py-4 px-4" style={{ color: "var(--ink-muted)" }}>
                    Starter
                  </th>
                  <th className="text-center text-sm font-normal py-4 px-4" style={{ color: "var(--ink-muted)" }}>
                    Core
                  </th>
                  <th className="text-center text-sm font-medium py-4 px-4" style={{ color: "var(--ink-strong)" }}>
                    Prime
                  </th>
                  <th className="text-center text-sm font-normal py-4 px-4" style={{ color: "var(--ink-muted)" }}>
                    Black
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((group) => (
                  <>
                    <tr key={`cat-${group.category}`}>
                      <td
                        colSpan={5}
                        className="font-mono text-[11px] font-medium uppercase tracking-widest pt-8 pb-3 px-6"
                        style={{ color: "var(--ink-soft)", borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                      >
                        {group.category}
                      </td>
                    </tr>
                    {group.features.map((f) => (
                      <tr
                        key={f.name}
                        className="transition-colors hover:bg-black/[0.01]"
                        style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                      >
                        <td className="text-sm py-4 px-6" style={{ color: "var(--ink-muted)" }}>{f.name}</td>
                        <td className="text-center py-4 px-4">
                          <CellValue value={f.free} />
                        </td>
                        <td className="text-center py-4 px-4">
                          <CellValue value={f.starter} />
                        </td>
                        <td className="text-center py-4 px-4" style={{ background: "rgba(0,0,0,0.01)" }}>
                          <CellValue value={f.pro} />
                        </td>
                        <td className="text-center py-4 px-4">
                          <CellValue value={f.enterprise} />
                        </td>
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
      <section className="relative pb-24 lg:pb-32">
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-6" style={{ color: "#8B6B3D" }}>
              FAQ
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif italic tracking-tighter mb-2" style={{ color: "var(--ink-strong)" }}>Common questions</h2>
            <p className="text-base" style={{ color: "var(--ink-muted)" }}>Everything you need to know about the merged 9Ruby and IX Ruby offer.</p>
          </div>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            {faqItems.map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE BANNER */}
      <section className="relative pb-24 lg:pb-28">
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="relative overflow-hidden rounded-2xl bg-white px-8 py-10 lg:px-16 lg:py-14 text-center" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
            <div className="relative flex flex-col items-center gap-5">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <Shield size={24} style={{ color: "var(--ink-muted)" }} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-serif italic tracking-tighter" style={{ color: "var(--ink-strong)" }}>
                30-Day Money Back Guarantee
              </h3>
              <p className="max-w-lg leading-relaxed text-sm" style={{ color: "var(--ink-muted)" }}>
                Start with AI or move into a managed engagement. If the fit is wrong early, we reset scope fast instead of trapping you inside a vague retainer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tighter mb-4" style={{ color: "var(--ink-strong)" }}>
              Start Building Today
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "var(--ink-muted)" }}>
              Use one system for AI access, websites, growth ops, voice agents, and flagship launches.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://ai.9ruby.com"
                className="h-10 px-7 rounded-full bg-[#1A1A1A] text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all duration-300 inline-flex items-center gap-2"
                style={{ color: "#F8F7F4" }}
              >
            Start with AI <ArrowRight size={14} />
              </a>
              <Link
                href="/contact"
                className="h-10 px-7 rounded-full text-sm font-medium hover:bg-black/[0.02] transition-all duration-300 inline-flex items-center gap-2"
                style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-muted)" }}
              >
                <Users size={14} /> Book a Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
