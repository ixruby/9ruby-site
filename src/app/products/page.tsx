"use client"

import {
  ArrowRight,
  Bot,
  Globe,
  Layers,
  Mic,
  Sparkles,
  Wrench,
  BarChart3,
  Blocks,
  Shield,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const pillars = [
  {
    title: "Starter access",
    label: "9Ruby AI",
    icon: Sparkles,
    desc: "Self-serve AI workspace for chat, prompts, design support, and launch tools.",
    items: ["AI workspace", "Templates and prompt kits", "Design Studio", "Fast onboarding"],
    cta: "Start with AI",
    href: "https://ai.9ruby.com",
  },
  {
    title: "Managed execution",
    label: "IX Ruby services",
    icon: Globe,
    desc: "Websites, automation, SEO, analytics, content systems, and voice deployments under one delivery lane.",
    items: ["Website builds", "SEO and growth ops", "Automation systems", "Voice and chatbot deployments"],
    cta: "See services",
    href: "/services",
  },
  {
    title: "Flagship systems",
    label: "Black tier",
    icon: Shield,
    desc: "Custom operating systems, product builds, and dedicated launch capacity for brands building bigger systems.",
    items: ["Custom product systems", "Deep AI infrastructure", "Executive delivery lane", "Launch operations"],
    cta: "Book a call",
    href: "/contact",
  },
]

const inventory = [
  {
    title: "Templates",
    icon: Layers,
    desc: "Production-ready starters for launches, products, and brand sites.",
    href: "/templates",
  },
  {
    title: "Tools",
    icon: Wrench,
    desc: "Free utilities for SEO, formatting, QR generation, and creative workflows.",
    href: "/tools",
  },
  {
    title: "Apps",
    icon: Blocks,
    desc: "Connected software stack with 13,000+ integrations across business workflows.",
    href: "/apps",
  },
  {
    title: "Voice agents",
    icon: Mic,
    desc: "Outbound calling, inbound support, and appointment booking with fast response times.",
    href: "/services/voice-agents",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    desc: "Dashboards and decision systems that make the rest of the stack measurable.",
    href: "/dashboard",
  },
  {
    title: "Ecosystem map",
    icon: Bot,
    desc: "The full IX Ruby footprint, including public Vercel projects and product surfaces.",
    href: "/ecosystem",
  },
]

export default function ProductsPage() {
  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Products" }]} />

      <section className="relative pt-36 lg:pt-48 pb-20 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-6" style={{ color: "#8B6B3D" }}>
            Products
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6" style={{ color: "var(--ink-strong)" }}>
            One operating layer.
            <br />
            Every product inside it.
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--ink-muted)" }}>
            9Ruby is not a loose catalog anymore. It is one structured system covering AI access, managed execution, and flagship builds.
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl bg-white p-8 flex flex-col"
              style={{ border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <pillar.icon size={18} style={{ color: "var(--ink-muted)" }} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: "var(--ink-soft)" }}>
                {pillar.label}
              </div>
              <h2 className="text-2xl font-semibold tracking-tight mb-3" style={{ color: "var(--ink-strong)" }}>
                {pillar.title}
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--ink-muted)" }}>
                {pillar.desc}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--ink-muted)" }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#8B6B3D" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={pillar.href}
                className="inline-flex items-center justify-center gap-2 h-10 rounded-full text-sm font-medium transition-all duration-300"
                style={{ background: "var(--button-bg)", color: "var(--button-fg)" }}
              >
                {pillar.cta} <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: "#8B6B3D" }}>
              Inventory
            </div>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-3" style={{ color: "var(--ink-strong)" }}>
              The rest of the stack
            </h2>
            <p className="text-[15px] max-w-[720px]" style={{ color: "var(--ink-muted)" }}>
              Templates, utilities, integrations, analytics, and public ecosystem surfaces all support the same operating model.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {inventory.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.03]"
                style={{ border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <item.icon size={16} style={{ color: "var(--ink-muted)" }} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2" style={{ color: "var(--ink-strong)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="rounded-2xl bg-white p-10 lg:p-14 text-center" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            <Sparkles size={22} className="mx-auto mb-5" style={{ color: "var(--ink-soft)" }} />
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-4" style={{ color: "var(--ink-strong)" }}>
              Need the right lane?
            </h2>
            <p className="text-sm leading-relaxed max-w-[640px] mx-auto mb-8" style={{ color: "var(--ink-muted)" }}>
              Start with AI if you want access. Move into services if you need execution. Choose Black if you need a flagship build with dedicated capacity.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://ai.9ruby.com"
                className="inline-flex items-center gap-2 h-10 px-7 rounded-full text-sm font-medium"
                style={{ background: "var(--button-bg)", color: "var(--button-fg)" }}
              >
                Start with AI <ArrowRight size={14} />
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 h-10 px-7 rounded-full text-sm font-medium"
                style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-muted)" }}
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
