import type { Metadata } from "next"
import {
  MessageSquare, Layout, Zap, Terminal, Globe, Bot,
  ArrowRight, ExternalLink, Sparkles, Package, Cpu,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageHeader from "@/components/PageHeader"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "Ecosystem | 9Ruby",
  description:
    "The complete Nine Ruby ecosystem: Agency, AI Platform, Templates, Icons, OpenClaw, Ruby OS, and more. All interconnected, all autonomous.",
  openGraph: {
    title: "Ecosystem | 9Ruby",
    description:
      "The complete Nine Ruby ecosystem: Agency, AI Platform, Templates, Icons, OpenClaw, Ruby OS, and more.",
  },
}

const products = [
  {
    name: "9Ruby AI",
    tagline: "The intelligence layer",
    desc: "Full AI chat assistant powered by Claude. Chat, analyze, code, create, and automate — all from one interface. Design Studio, Dispatch mode, and 100+ integrations built in.",
    icon: <MessageSquare size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
    href: "https://ai.9ruby.com",
    features: ["AI Chat (Sonnet + Opus)", "Design Studio", "Dispatch mode", "100+ integrations"],
  },
  {
    name: "IX Ruby Agency",
    tagline: "Full-service AI agency",
    desc: "End-to-end marketing and technology services. AI chatbots, website design, SEO, social media, video production, custom software — all powered by autonomous agents.",
    icon: <Globe size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
    href: "https://home.9ruby.com/services",
    features: ["10+ service lines", "Autonomous agents", "24/7 operation", "Global delivery"],
  },
  {
    name: "9Ruby Templates",
    tagline: "Ship faster with templates",
    desc: "A growing library of free and premium website templates. Landing pages, portfolios, e-commerce, dashboards — built with Next.js, React, and Tailwind CSS.",
    icon: <Layout size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
    href: "/templates",
    features: ["15+ templates", "Next.js + Tailwind", "Free & premium", "One-click deploy"],
  },
  {
    name: "OpenClaw",
    tagline: "Open-source AI agent",
    desc: "Autonomous AI agent with 100+ skills across 20+ messaging platforms. Open-source, extensible, and community-driven. The foundation of the 9Ruby agent ecosystem.",
    icon: <Bot size={20} strokeWidth={1.5} />,
    badge: "Open Source",
    badgeStyle: "bg-blue-50 text-blue-600 border-blue-100",
    href: "https://github.com/nicepkg/openclaw",
    features: ["100+ skills", "20+ platforms", "Open-source", "Community-driven"],
  },
  {
    name: "Rubix Terminal",
    tagline: "AI in your terminal",
    desc: "Terminal-powered AI coding assistant. Run commands, edit files, build and deploy projects — all with AI guidance. Like Claude Code, built for the 9Ruby ecosystem.",
    icon: <Terminal size={20} strokeWidth={1.5} />,
    badge: "Coming Soon",
    badgeStyle: "",
    href: "#",
    features: ["Terminal AI", "Code generation", "Deploy pipelines", "Full CLI control"],
  },
  {
    name: "Ruby OS",
    tagline: "The operating system for AI",
    desc: "A unified operating layer that connects all 9Ruby products. Agent orchestration, shared memory, cross-product workflows, and a single identity layer.",
    icon: <Cpu size={20} strokeWidth={1.5} />,
    badge: "In Development",
    badgeStyle: "",
    href: "#",
    features: ["Agent orchestration", "Shared memory", "Cross-product workflows", "Single identity"],
  },
]

const subdomains = [
  { domain: "home.9ruby.com", label: "Main Hub", primary: true },
  { domain: "ai.9ruby.com", label: "AI Platform", primary: true },
  { domain: "cafe.9ruby.com", label: "Cafe Template" },
  { domain: "dinecraft.9ruby.com", label: "Restaurant" },
  { domain: "chaiwala.9ruby.com", label: "Tea House" },
  { domain: "serenity.9ruby.com", label: "Spa & Wellness" },
  { domain: "bakehouse.9ruby.com", label: "Bakery" },
  { domain: "chefskitchen.9ruby.com", label: "Fine Dining" },
  { domain: "foodies.9ruby.com", label: "Food Hub" },
  { domain: "coffeeshop.9ruby.com", label: "Coffee Shop" },
]

export default function EcosystemPage() {
  return (
    <main className="relative min-h-screen" style={{ background: "#F8F7F4" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Ecosystem" }]} />

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6">
          <PageHeader
            tag="Ecosystem"
            title="The Nine Ruby"
            highlight="universe."
            description="A complete ecosystem of AI-powered products, tools, and services — all interconnected, all autonomous."
          />

          {/* Product cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-28">
            {products.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative flex flex-col p-8 lg:p-10 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                {/* Header: icon + badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:text-[#1A1A1A] transition-colors" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", color: "#7A7A72" }}>
                    {p.icon}
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border ${p.badgeStyle || ""}`} style={!p.badgeStyle ? { background: "rgba(0,0,0,0.02)", color: "#B8B8B0", border: "1px solid rgba(0,0,0,0.06)" } : {}}>
                    {p.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <span className="font-mono text-xs block mb-2" style={{ color: "#B8B8B0" }}>{p.tagline}</span>
                  <h3 className="text-xl font-semibold tracking-tight mb-3" style={{ color: "#1A1A1A" }}>{p.name}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: "#7A7A72" }}>{p.desc}</p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-2 mt-auto mb-6">
                  {p.features.map((f) => (
                    <span key={f} className="text-xs flex items-center gap-1.5" style={{ color: "#B8B8B0" }}>
                      <span className="w-1 h-1 rounded-full bg-[#C41A3B]/50 shrink-0" />
                      {f}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm group-hover:text-[#C41A3B] group-hover:gap-3 transition-all" style={{ color: "#7A7A72" }}>
                  {p.badge === "Coming Soon" || p.badge === "In Development" ? "Learn more" : "Explore"}
                  <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>

          {/* Live subdomains */}
          <div className="mb-28">
            <div className="mb-12">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#C41A3B" }}>Infrastructure</span>
              <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-3" style={{ color: "#1A1A1A" }}>
                Live across the web
              </h2>
              <p className="text-[15px]" style={{ color: "#7A7A72" }}>Every subdomain is a live, deployed product in the 9Ruby ecosystem.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {subdomains.map((s) => (
                <a
                  key={s.domain}
                  href={`https://${s.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 rounded-2xl bg-white transition-all group hover:shadow-lg hover:shadow-black/[0.03]"
                  style={{ border: s.primary ? "1px solid rgba(196,26,59,0.1)" : "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div>
                    <span className="text-sm font-medium group-hover:text-[#1A1A1A] transition-colors" style={{ color: s.primary ? "#1A1A1A" : "#7A7A72" }}>
                      {s.domain}
                    </span>
                    <span className="block text-xs mt-1 font-mono" style={{ color: "#B8B8B0" }}>{s.label}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    <ExternalLink size={14} className="group-hover:text-[#7A7A72] transition-colors" style={{ color: "#B8B8B0" }} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <h2 className="text-4xl md:text-5xl font-serif italic tracking-tighter mb-4" style={{ color: "#1A1A1A" }}>
              Build with 9Ruby
            </h2>
            <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: "#B8B8B0" }}>
              Join the ecosystem. Start building with our AI tools, templates, and agent platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://ai.9ruby.com"
                className="bg-[#1A1A1A] rounded-full px-7 h-10 text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all inline-flex items-center gap-2"
                style={{ color: "#F8F7F4" }}
              >
                Get started free <ArrowRight size={14} />
              </a>
              <Link
                href="/contact"
                className="rounded-full px-7 h-10 text-sm font-medium hover:bg-black/[0.02] transition-all inline-flex items-center"
                style={{ border: "1px solid rgba(0,0,0,0.08)", color: "#7A7A72" }}
              >
                Partner with us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
