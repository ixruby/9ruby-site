"use client"

import { ArrowRight, Bot, Globe, Layers, Mic, Shield, Sparkles } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const layers = [
  {
    id: "01",
    title: "Access",
    subtitle: "Start with AI",
    icon: Sparkles,
    copy: "9Ruby AI is the first layer. It gives founders and teams direct access to chat, prompts, design support, and launch tools.",
    links: ["9Ruby AI", "Templates", "Tools", "Docs"],
  },
  {
    id: "02",
    title: "Execution",
    subtitle: "Move into services",
    icon: Globe,
    copy: "IX Ruby services turn the tooling into action: websites, automation, SEO, analytics, content systems, and growth operations.",
    links: ["Services", "Voice agents", "Case studies", "Pricing"],
  },
  {
    id: "03",
    title: "Systems",
    subtitle: "Build bigger products",
    icon: Layers,
    copy: "The highest layer is flagship execution: custom product systems, internal platforms, AI infrastructure, and launch operations for bigger brands.",
    links: ["Black tier", "Products", "Ecosystem", "Contact"],
  },
]

const surfaces = [
  { title: "AI", icon: Bot, desc: "Workspaces, prompts, agents, and operator tools." },
  { title: "Web", icon: Globe, desc: "Brand sites, funnels, systems, and shipping layers." },
  { title: "Voice", icon: Mic, desc: "Outbound calling, support flows, and booking systems." },
  { title: "Infrastructure", icon: Shield, desc: "Analytics, delivery lanes, and private execution capacity." },
]

export default function UniversePage() {
  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Universe" }]} />

      <section className="pt-36 lg:pt-48 pb-20 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-6" style={{ color: "#C41A3B" }}>
            Universe
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6" style={{ color: "var(--ink-strong)" }}>
            The 9Ruby universe,
            <br />
            explained clearly.
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--ink-muted)" }}>
            This page is the map of the brand. It shows how AI access, managed execution, and flagship systems connect without splitting into separate worlds.
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-4">
          {layers.map((layer) => (
            <div key={layer.id} className="rounded-2xl bg-white p-8" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
                  Layer {layer.id}
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <layer.icon size={16} style={{ color: "var(--ink-muted)" }} />
                </div>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight mb-1" style={{ color: "var(--ink-strong)" }}>
                {layer.title}
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: "#C41A3B" }}>
                {layer.subtitle}
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--ink-muted)" }}>
                {layer.copy}
              </p>
              <div className="flex flex-wrap gap-2">
                {layer.links.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-medium"
                    style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)", color: "var(--ink-muted)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: "#C41A3B" }}>
              Surfaces
            </div>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-3" style={{ color: "var(--ink-strong)" }}>
              What the universe actually contains
            </h2>
            <p className="text-[15px] max-w-[720px]" style={{ color: "var(--ink-muted)" }}>
              The universe is not mythology. It is the set of working surfaces across the brand and delivery stack.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {surfaces.map((surface) => (
              <div key={surface.title} className="rounded-2xl bg-white p-6" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <surface.icon size={16} style={{ color: "var(--ink-muted)" }} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2" style={{ color: "var(--ink-strong)" }}>
                  {surface.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {surface.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="rounded-2xl bg-white p-10 lg:p-14 text-center" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-4" style={{ color: "var(--ink-strong)" }}>
              Enter through the right layer
            </h2>
            <p className="text-sm leading-relaxed max-w-[640px] mx-auto mb-8" style={{ color: "var(--ink-muted)" }}>
              Start with AI if you need access. Book services if you need execution. Move into Black if you need a larger system built around your brand.
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
