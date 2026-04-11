"use client"

import {
  FileCode, Package, Palette, Layers, Bot, Globe, TrendingUp,
  CalendarCheck, Search, QrCode, Braces, Tag, ArrowRight,
  Crown, Building2, Star, CheckCircle2, Sparkles, ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

/* -- DATA -- */

const digitalProducts = [
  {
    icon: <FileCode size={20} />,
    title: "Website Templates",
    desc: "Production-ready Next.js & React templates. Dark themes, dashboards, landing pages, SaaS — fully responsive, Tailwind CSS.",
    price: "$29 - $99",
    href: "/templates",
    cta: "Browse Templates",
  },
  {
    icon: <Package size={20} />,
    title: "Icon Pack",
    desc: "660+ hand-crafted SVG icons optimized for web & mobile. Consistent 24px grid, tree-shakeable, dark-mode ready.",
    price: "$19",
    href: "#",
    cta: "Buy Now",
  },
  {
    icon: <Palette size={20} />,
    title: "UI Kit",
    desc: "A comprehensive React component library built on Tailwind & Radix. Buttons, modals, tables, charts — copy-paste ready.",
    price: "$49",
    href: "#",
    cta: "Buy Now",
  },
  {
    icon: <Layers size={20} />,
    title: "Starter Kits",
    desc: "Next.js boilerplates with auth, database, payments, and email already wired up. Ship your SaaS in days, not weeks.",
    price: "$39",
    href: "#",
    cta: "Buy Now",
  },
]

const services = [
  {
    icon: <Bot size={20} />,
    title: "AI Chatbot Setup",
    desc: "Custom-trained conversational agent deployed on your site, WhatsApp, or Slack. Includes knowledge base, lead capture, and analytics.",
    price: "$499",
  },
  {
    icon: <Globe size={20} />,
    title: "Full Website Build",
    desc: "End-to-end design & development — from wireframes to production. Next.js, React, CMS, e-commerce, or custom platforms.",
    price: "$1,499 - $4,999",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "SEO Audit & Fix",
    desc: "Deep technical audit, on-page optimization, structured data, speed improvements, and a 30-day action plan.",
    price: "$299",
  },
  {
    icon: <CalendarCheck size={20} />,
    title: "Monthly Retainer",
    desc: "Dedicated AI-assisted team handling your website, marketing, content, and growth — every single month.",
    price: "$1,500/mo",
  },
]

const freeTools = [
  { icon: <Search size={14} />, name: "SEO Checker" },
  { icon: <Palette size={14} />, name: "Color Palette" },
  { icon: <QrCode size={14} />, name: "QR Generator" },
  { icon: <Braces size={14} />, name: "JSON Formatter" },
  { icon: <Tag size={14} />, name: "Meta Generator" },
]

const subscriptions = [
  {
    tier: "Nine Ruby Pro",
    price: "$49",
    period: "/mo",
    icon: <Crown size={20} />,
    desc: "For freelancers & small teams who want the full template library and white-glove support.",
    features: [
      "Access to every template",
      "Priority email & chat support",
      "Monthly 1-on-1 strategy call",
      "Early access to new products",
      "Member-only resources",
    ],
    highlight: false,
  },
  {
    tier: "Nine Ruby Enterprise",
    price: "$149",
    period: "/mo",
    icon: <Building2 size={20} />,
    desc: "For agencies & businesses that need custom work, a dedicated AI agent, and unlimited builds.",
    features: [
      "Everything in Pro",
      "Custom template builds",
      "Dedicated AI agent for your brand",
      "Unlimited revision rounds",
      "Quarterly roadmap planning",
      "SLA-backed response times",
    ],
    highlight: true,
  },
]

/* -- scroll reveal hook -- */

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

/* -- PAGE -- */

export default function ProductsPage() {
  const revealRef = useScrollReveal()

  return (
    <main id="main-content" className="relative min-h-screen" ref={revealRef} style={{ background: "#F8F7F4" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Products" }]} />

      {/* HERO */}
      <section className="relative pt-36 lg:pt-48 pb-24 px-6">
        <div className="relative max-w-[1200px] mx-auto text-center">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-6"
            style={{ color: "#C41A3B" }}
          >
            Products
          </div>
          <h1
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6"
          >
            <span style={{ color: "#1A1A1A" }}>
              Everything we sell.
            </span>
            <br />
            <span style={{ color: "#B8B8B0" }}>One ecosystem.</span>
          </h1>
          <p
            data-reveal
            data-reveal-delay={200}
            className="reveal-item text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#7A7A72" }}
          >
            Templates, tools, services, and subscriptions — everything you need to build, launch, and grow. Powered by Nine Ruby AI.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 pb-24">

        {/* DIGITAL PRODUCTS */}
        <section className="mb-24">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: "#C41A3B" }}
          >
            01 -- Digital Products
          </div>
          <div className="h-px mb-8" style={{ background: "rgba(0,0,0,0.04)" }} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {digitalProducts.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                data-reveal-delay={i * 80}
                className="reveal-item group relative rounded-2xl bg-white p-6 hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-500"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", color: "#7A7A72" }}>
                    {p.icon}
                  </div>
                  <span className="font-mono text-xs" style={{ color: "#B8B8B0" }}>{p.price}</span>
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-2" style={{ color: "#1A1A1A" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#7A7A72" }}>{p.desc}</p>
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#1A1A1A] transition-colors"
                  style={{ color: "#7A7A72" }}
                >
                  {p.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="mb-24">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: "#C41A3B" }}
          >
            02 -- Services
          </div>
          <div className="h-px mb-8" style={{ background: "rgba(0,0,0,0.04)" }} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <div
                key={s.title}
                data-reveal
                data-reveal-delay={i * 80}
                className="reveal-item group relative rounded-2xl bg-white p-6 hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-500"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", color: "#7A7A72" }}>
                    {s.icon}
                  </div>
                  <span className="font-mono text-xs" style={{ color: "#B8B8B0" }}>{s.price}</span>
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-2" style={{ color: "#1A1A1A" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#7A7A72" }}>{s.desc}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#1A1A1A] transition-colors"
                  style={{ color: "#7A7A72" }}
                >
                  Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FREE TOOLS */}
        <section className="mb-24">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: "#C41A3B" }}
          >
            03 -- Free Tools
          </div>
          <div className="h-px mb-8" style={{ background: "rgba(0,0,0,0.04)" }} />
          <div
            data-reveal
            data-reveal-delay={100}
            className="reveal-item rounded-2xl bg-white p-8"
            style={{ border: "1px solid rgba(0,0,0,0.04)" }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold tracking-tight mb-2" style={{ color: "#1A1A1A" }}>
                  Free developer &amp; marketing tools
                </h3>
                <p className="text-sm max-w-lg" style={{ color: "#7A7A72" }}>
                  No sign-up required. Use them right now to speed up your workflow.
                </p>
              </div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-sm font-medium rounded-full px-6 h-10 hover:bg-black/[0.02] transition-all"
                style={{ border: "1px solid rgba(0,0,0,0.08)", color: "#7A7A72" }}
              >
                Open Tools <ExternalLink size={14} />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {freeTools.map((t) => (
                <Link
                  key={t.name}
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-black/[0.02] transition-all"
                  style={{ border: "1px solid rgba(0,0,0,0.06)", color: "#7A7A72" }}
                >
                  {t.icon}
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SUBSCRIPTIONS */}
        <section className="mb-24">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: "#C41A3B" }}
          >
            04 -- Subscriptions
          </div>
          <div className="h-px mb-8" style={{ background: "rgba(0,0,0,0.04)" }} />
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {subscriptions.map((plan, i) => (
              <div
                key={plan.tier}
                data-reveal
                data-reveal-delay={i * 100}
                className={`reveal-item relative rounded-2xl p-8 transition-all duration-500 ${
                  plan.highlight
                    ? "bg-[#1A1A1A]"
                    : "bg-white hover:shadow-lg hover:shadow-black/[0.03]"
                }`}
                style={!plan.highlight ? { border: "1px solid rgba(0,0,0,0.04)" } : {}}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-[#C41A3B] px-3 py-1 font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                    <Star size={10} /> Most Popular
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={plan.highlight ? { background: "rgba(255,255,255,0.1)", color: "#F8F7F4" } : { background: "rgba(0,0,0,0.02)", color: "#7A7A72" }}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-base font-semibold tracking-tight" style={{ color: plan.highlight ? "#F8F7F4" : "#1A1A1A" }}>{plan.tier}</h3>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-serif italic tracking-tighter" style={{ color: plan.highlight ? "#F8F7F4" : "#1A1A1A" }}>{plan.price}</span>
                  <span className="text-sm" style={{ color: plan.highlight ? "rgba(248,247,244,0.3)" : "#B8B8B0" }}>{plan.period}</span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: plan.highlight ? "rgba(248,247,244,0.5)" : "#7A7A72" }}>{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: plan.highlight ? "rgba(248,247,244,0.7)" : "#7A7A72" }}>
                      <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${plan.highlight ? "text-[#C41A3B]" : ""}`} style={!plan.highlight ? { color: "#B8B8B0" } : {}} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 w-full text-sm font-medium rounded-full h-10 transition-all duration-300 ${
                    plan.highlight
                      ? "bg-[#F8F7F4] text-[#1A1A1A] hover:bg-white"
                      : "hover:bg-black/[0.02]"
                  }`}
                  style={!plan.highlight ? { border: "1px solid rgba(0,0,0,0.08)", color: "#7A7A72" } : {}}
                >
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* AFFILIATE / RESELLER CTA */}
        <section
          data-reveal
          data-reveal-delay={0}
          className="reveal-item"
        >
          <div className="rounded-2xl bg-white p-10 md:p-14 text-center" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
            <Sparkles size={24} className="mx-auto mb-4" style={{ color: "#B8B8B0" }} />
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-4" style={{ color: "#1A1A1A" }}>
              Start earning with Nine Ruby
            </h2>
            <p className="max-w-xl mx-auto mb-8 leading-relaxed text-sm" style={{ color: "#7A7A72" }}>
              Join our affiliate &amp; reseller program. Recommend Nine Ruby products,
              white-label our templates, or resell our services under your brand — and
              earn up to 40% recurring commission.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium rounded-full bg-[#1A1A1A] px-7 h-10 hover:bg-[#1A1A1A]/90 transition-all duration-300"
                style={{ color: "#F8F7F4" }}
              >
                Become an Affiliate <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium rounded-full px-7 h-10 hover:bg-black/[0.02] transition-all duration-300"
                style={{ border: "1px solid rgba(0,0,0,0.08)", color: "#7A7A72" }}
              >
                Reseller Program
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
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
