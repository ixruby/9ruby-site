"use client"

import { useState } from "react"
import { CheckCircle2, X, ArrowRight, Zap, Shield, ChevronDown, Users, Building2, Sparkles } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

/* --- Data --- */

const monthlyPrices = { free: 0, starter: 49, pro: 149, enterprise: null }
const annualPrices  = { free: 0, starter: 39, pro: 119, enterprise: null }

const tiers = [
  {
    key: "free" as const,
    name: "Free",
    desc: "Get started with 9Ruby AI",
    icon: Sparkles,
    cta: "Get Started",
    ctaHref: "https://ai.9ruby.com",
    style: "glass" as const,
    features: [
      "9Ruby AI Chat (50 msgs/day)",
      "Ruby 9 Sonnet model",
      "3 Design Studio generations",
      "Basic templates",
      "Community support",
      "1 project",
    ],
  },
  {
    key: "starter" as const,
    name: "Starter",
    desc: "For individuals",
    icon: Zap,
    cta: "Start Free Trial",
    ctaHref: "https://ai.9ruby.com",
    style: "glass" as const,
    features: [
      "Everything in Free",
      "500 messages/day",
      "Ruby 9 Opus model",
      "20 Design generations/mo",
      "5 AI tool uses/day",
      "Priority email support",
      "5 projects",
      "Basic integrations",
    ],
  },
  {
    key: "pro" as const,
    name: "Pro",
    desc: "For growing businesses",
    icon: Zap,
    badge: "Most Popular",
    cta: "Start Free Trial",
    ctaHref: "https://ai.9ruby.com",
    style: "highlighted" as const,
    features: [
      "Everything in Starter",
      "Unlimited messages",
      "Unlimited Design Studio",
      "Dispatch mode (parallel agents)",
      "25 concurrent agents",
      "All integrations",
      "Unlimited projects",
      "All premium templates",
      "Priority support",
      "Custom agent workflows",
    ],
  },
  {
    key: "enterprise" as const,
    name: "Enterprise",
    desc: "For teams",
    icon: Building2,
    cta: "Contact Sales",
    ctaHref: "/contact",
    style: "dark" as const,
    features: [
      "Everything in Pro",
      "Rubix Terminal access",
      "Custom model routing",
      "On-premise deployment",
      "SSO & SAML",
      "Dedicated infrastructure",
      "SLA guarantee (99.99%)",
      "24/7 phone support",
      "Custom training",
      "White-label option",
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
      { name: "AI Chat messages", free: "50/day", starter: "500/day", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "AI Models", free: "Sonnet", starter: "Sonnet + Opus", pro: "All models", enterprise: "Custom routing" },
      { name: "Concurrent agents", free: "1", starter: "3", pro: "25", enterprise: "Unlimited" },
      { name: "AI Tools access", free: "Basic", starter: "5/day", pro: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Design & Creation",
    features: [
      { name: "Design Studio", free: "3/mo", starter: "20/mo", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Premium templates", free: false, starter: false, pro: true, enterprise: true },
      { name: "Projects", free: "1", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Collaboration & Integrations",
    features: [
      { name: "Dispatch (parallel agents)", free: false, starter: false, pro: true, enterprise: true },
      { name: "Integrations", free: "None", starter: "Basic", pro: "All", enterprise: "All + Custom" },
      { name: "Rubix Terminal", free: false, starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Security & Compliance",
    features: [
      { name: "SSO / SAML", free: false, starter: false, pro: false, enterprise: true },
      { name: "SLA guarantee", free: false, starter: false, pro: false, enterprise: true },
      { name: "White-label", free: false, starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Support level", free: "Community", starter: "Email", pro: "Priority", enterprise: "24/7 phone" },
    ],
  },
]

const faqItems = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. Upgrade or downgrade anytime from your dashboard. When upgrading, you'll be charged the prorated difference. When downgrading, unused credit rolls into your next billing cycle.",
  },
  {
    q: "What happens when my free tier limits are reached?",
    a: "You'll receive a notification when you're at 80% usage. Once the limit is reached, you can upgrade instantly or wait for the daily/monthly reset depending on the feature.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Absolutely. Both Starter and Pro plans come with a 14-day free trial with full access. No credit card required to start.",
  },
  {
    q: "How does the annual billing discount work?",
    a: "Annual billing saves you 20% compared to monthly. You pay once per year and get the full 12 months at the discounted rate. Cancel anytime for a prorated refund.",
  },
  {
    q: "What AI models are included?",
    a: "Free includes Ruby 9 Sonnet. Starter adds Ruby 9 Opus. Pro unlocks all models including latest releases. Enterprise gets custom model routing tailored to your workflows.",
  },
  {
    q: "Can I get a custom Enterprise quote?",
    a: "Yes. Enterprise pricing is tailored to your team size, usage patterns, and specific requirements. Contact our sales team for a custom proposal within 24 hours.",
  },
  {
    q: "Is my data secure?",
    a: "All plans include encryption at rest and in transit. Enterprise adds SSO/SAML, SOC 2 compliance, dedicated infrastructure, and custom data retention policies.",
  },
  {
    q: "What is Dispatch mode?",
    a: "Dispatch mode lets you run multiple AI agents in parallel on different tasks simultaneously. Available on Pro (25 concurrent) and Enterprise (unlimited) plans.",
  },
]

/* --- Components --- */

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value
      ? <CheckCircle2 size={16} className="text-[#C41A3B] mx-auto" />
      : <X size={16} className="mx-auto" style={{ color: "#B8B8B0" }} />
  }
  return <span className="text-sm" style={{ color: "#7A7A72" }}>{value}</span>
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-base font-medium group-hover:text-[#1A1A1A] transition-colors pr-8" style={{ color: "#7A7A72" }}>
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
        <p className="text-sm leading-relaxed pr-12" style={{ color: "#7A7A72" }}>{answer}</p>
      </div>
    </div>
  )
}

/* --- Page --- */

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  const getPrice = (key: "free" | "starter" | "pro" | "enterprise") => {
    const prices = annual ? annualPrices : monthlyPrices
    return prices[key]
  }

  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "#F8F7F4" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Pricing" }]} />

      {/* HERO */}
      <section className="relative pt-36 lg:pt-44 pb-16 lg:pb-20">
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-6" style={{ color: "#C41A3B" }}>
            Pricing
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6" style={{ color: "#1A1A1A" }}>
            Invest in Growth
          </h1>

          <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: "#7A7A72" }}>
            Start free. Scale when you&apos;re ready. Simple pricing, no hidden fees.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 bg-white rounded-full p-1" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !annual
                  ? "bg-[#1A1A1A] text-[#F8F7F4]"
                  : "hover:text-[#1A1A1A]"
              }`}
              style={annual ? { color: "#7A7A72" } : {}}
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
              style={!annual ? { color: "#7A7A72" } : {}}
            >
              Annual
              <span className="absolute -top-2.5 -right-4 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C41A3B] text-white whitespace-nowrap">
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
                          style={!isHighlighted ? { color: "#7A7A72" } : {}}
                        />
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight" style={{ color: isHighlighted ? "#F8F7F4" : "#1A1A1A" }}>{t.name}</h3>
                    </div>
                    <p className="text-sm mb-6 ml-11" style={{ color: isHighlighted ? "rgba(248,247,244,0.5)" : "#7A7A72" }}>{t.desc}</p>

                    {/* Price */}
                    <div className="mb-8">
                      {price !== null ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-serif italic tracking-tighter" style={{ color: isHighlighted ? "#F8F7F4" : "#1A1A1A" }}>${price}</span>
                          <span className="text-sm" style={{ color: isHighlighted ? "rgba(248,247,244,0.3)" : "#B8B8B0" }}>/mo</span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-serif italic tracking-tighter" style={{ color: isHighlighted ? "#F8F7F4" : "#1A1A1A" }}>Custom</span>
                        </div>
                      )}
                      {annual && price !== null && price > 0 && (
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
                              isHighlighted ? "text-[#C41A3B]" : ""
                            }`}
                            style={!isHighlighted ? { color: "#B8B8B0" } : {}}
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
                      style={!isHighlighted ? { border: "1px solid rgba(0,0,0,0.08)", color: "#7A7A72" } : {}}
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
          <h2 className="text-3xl lg:text-4xl font-serif italic tracking-tighter mb-2" style={{ color: "#1A1A1A" }}>Compare plans</h2>
          <p className="text-base mb-12" style={{ color: "#7A7A72" }}>Every feature, side by side.</p>

          <div className="overflow-x-auto rounded-2xl bg-white" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
            <table className="w-full min-w-[750px]">
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.01)" }}>
                  <th className="text-left text-sm font-normal py-4 px-6 w-[30%]" style={{ color: "#7A7A72" }}>
                    Feature
                  </th>
                  <th className="text-center text-sm font-normal py-4 px-4" style={{ color: "#7A7A72" }}>
                    Free
                  </th>
                  <th className="text-center text-sm font-normal py-4 px-4" style={{ color: "#7A7A72" }}>
                    Starter
                  </th>
                  <th className="text-center text-sm font-medium py-4 px-4" style={{ color: "#1A1A1A" }}>
                    Pro
                  </th>
                  <th className="text-center text-sm font-normal py-4 px-4" style={{ color: "#7A7A72" }}>
                    Enterprise
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
                        style={{ color: "#B8B8B0", borderBottom: "1px solid rgba(0,0,0,0.04)" }}
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
                        <td className="text-sm py-4 px-6" style={{ color: "#7A7A72" }}>{f.name}</td>
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
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-6" style={{ color: "#C41A3B" }}>
              FAQ
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif italic tracking-tighter mb-2" style={{ color: "#1A1A1A" }}>Common questions</h2>
            <p className="text-base" style={{ color: "#7A7A72" }}>Everything you need to know about our plans.</p>
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
                <Shield size={24} style={{ color: "#7A7A72" }} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-serif italic tracking-tighter" style={{ color: "#1A1A1A" }}>
                30-Day Money Back Guarantee
              </h3>
              <p className="max-w-lg leading-relaxed text-sm" style={{ color: "#7A7A72" }}>
                Try any paid plan risk-free. If you&apos;re not completely satisfied within the first
                30 days, we&apos;ll refund every penny. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tighter mb-4" style={{ color: "#1A1A1A" }}>
              Start Building Today
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "#7A7A72" }}>
              Join thousands of builders using 9Ruby to ship faster with AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://ai.9ruby.com"
                className="h-10 px-7 rounded-full bg-[#1A1A1A] text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all duration-300 inline-flex items-center gap-2"
                style={{ color: "#F8F7F4" }}
              >
                Start Free <ArrowRight size={14} />
              </a>
              <Link
                href="/contact"
                className="h-10 px-7 rounded-full text-sm font-medium hover:bg-black/[0.02] transition-all duration-300 inline-flex items-center gap-2"
                style={{ border: "1px solid rgba(0,0,0,0.08)", color: "#7A7A72" }}
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
