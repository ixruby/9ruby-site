import type { Metadata } from "next"
import Image from "next/image"
import {
  MessageSquare, Layout, Zap, Terminal, Globe, Bot,
  ArrowRight, ExternalLink, Sparkles, Package, Cpu,
  Music, Blocks, Brain, Timer, Presentation, Mic,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageHeader from "@/components/PageHeader"
import Breadcrumb from "@/components/Breadcrumb"
import { liveVercelProjects, vercelBrandProjects } from "@/data/vercel-projects"

export const metadata: Metadata = {
  title: "Ecosystem | 9Ruby",
  description:
    "The complete 9Ruby ecosystem: AI access, managed execution, flagship systems, templates, tools, and the live IX Ruby project registry.",
  openGraph: {
    title: "Ecosystem | 9Ruby",
    description:
      "The complete 9Ruby ecosystem: AI access, managed execution, flagship systems, templates, tools, and the live IX Ruby project registry.",
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
    tagline: "Managed execution layer",
    desc: "Websites, automation, SEO, analytics, voice agents, video production, and custom software delivered inside one managed lane.",
    icon: <Globe size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
    href: "https://home.9ruby.com/services",
    features: ["11+ service lines", "Voice AI Agents", "24/7 operation", "Global delivery"],
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
    desc: "Open-source AI agent with 100+ skills across 20+ messaging platforms. Extensible, community-driven, and part of the broader 9Ruby operator stack.",
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
    tagline: "Flagship system layer",
    desc: "A unified operating layer that connects all 9Ruby products. Agent orchestration, shared memory, cross-product workflows, and shared execution lanes.",
    icon: <Cpu size={20} strokeWidth={1.5} />,
    badge: "In Development",
    badgeStyle: "",
    href: "#",
    features: ["Agent orchestration", "Shared memory", "Cross-product workflows", "Single identity"],
  },
  {
    name: "Nine Builder",
    tagline: "Visual page builder",
    desc: "Drag-and-drop visual page builder powered by Puck editor. Works with any stack — React, Next.js, or plain HTML. Build pages visually, export clean code, deploy instantly.",
    icon: <Blocks size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
    href: "https://nine-builder.vercel.app",
    features: ["Drag-drop editor", "Puck-powered", "Supabase backend", "One-click deploy"],
  },
  {
    name: "Novavox",
    tagline: "AI music & audio platform",
    desc: "Creative platform for artists and music brands. Artist pages, catalog management, releases, shop, gallery, tours, and an embedded audio player — all in one.",
    icon: <Music size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
    href: "https://novavox.vercel.app",
    features: ["Artist pages", "Audio player", "Shop & releases", "Admin panel"],
  },
  {
    name: "Voice AI Agents",
    tagline: "Sub-500ms voice automation",
    desc: "Ultra-realistic AI voice agents for outbound sales, inbound support, and appointment booking. Powered by ElevenLabs, Twilio, Vapi.ai, and Claude AI.",
    icon: <Mic size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
    href: "/services/voice-agents",
    features: ["Sub-500ms latency", "Outbound & inbound", "CRM sync", "30+ languages"],
  },
  {
    name: "GitNexus",
    tagline: "Code intelligence engine",
    desc: "Knowledge graph for codebases. Indexes 700+ symbols, maps 1,400+ relationships, traces 50+ execution flows. Powers blast-radius analysis and safe AI-assisted refactoring.",
    icon: <Brain size={20} strokeWidth={1.5} />,
    badge: "In Development",
    badgeStyle: "",
    href: "#",
    features: ["Symbol graph", "Execution flows", "MCP server", "Blast-radius analysis"],
  },
  {
    name: "Gem Focus Timer",
    tagline: "AI-powered focus sessions",
    desc: "Pomodoro-style focus timer with task management, session tracking, and AI-generated focus music. Built with React, Vite, TypeScript, Tailwind, and shadcn/ui.",
    icon: <Timer size={20} strokeWidth={1.5} />,
    badge: "Beta",
    badgeStyle: "bg-amber-50 text-amber-600 border-amber-100",
    href: "#",
    features: ["Focus timer", "Task tracking", "Session history", "AI music"],
  },
  {
    name: "Pitch Deck Generator",
    tagline: "AI-powered pitch decks",
    desc: "Generate investor-ready pitch decks in minutes. AI writes the narrative, designs the slides, and exports to PPTX — with auth, admin panel, and database persistence built in.",
    icon: <Presentation size={20} strokeWidth={1.5} />,
    badge: "Beta",
    badgeStyle: "bg-amber-50 text-amber-600 border-amber-100",
    href: "#",
    features: ["AI generation", "PPTX export", "Auth system", "Admin panel"],
  },
]

export default function EcosystemPage() {
  return (
    <main className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Ecosystem" }]} />

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6">
          <PageHeader
            tag="Ecosystem"
            title="The 9Ruby"
            highlight="ecosystem."
            description="AI access, managed execution, flagship systems, templates, tools, and live projects now mapped in one place."
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:text-[#1A1A1A] transition-colors" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", color: "var(--ink-muted)" }}>
                    {p.icon}
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border ${p.badgeStyle || ""}`} style={!p.badgeStyle ? { background: "rgba(0,0,0,0.02)", color: "var(--ink-soft)", border: "1px solid rgba(0,0,0,0.06)" } : {}}>
                    {p.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <span className="font-mono text-xs block mb-2" style={{ color: "var(--ink-soft)" }}>{p.tagline}</span>
                  <h3 className="text-xl font-semibold tracking-tight mb-3" style={{ color: "var(--ink-strong)" }}>{p.name}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: "var(--ink-muted)" }}>{p.desc}</p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-2 mt-auto mb-6">
                  {p.features.map((f) => (
                    <span key={f} className="text-xs flex items-center gap-1.5" style={{ color: "var(--ink-soft)" }}>
                      <span className="w-1 h-1 rounded-full bg-[#C41A3B]/50 shrink-0" />
                      {f}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm group-hover:text-[#C41A3B] group-hover:gap-3 transition-all" style={{ color: "var(--ink-muted)" }}>
                  {p.badge === "Coming Soon" || p.badge === "In Development" ? "Learn more" : "Explore"}
                  <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>

          <div className="mb-28">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#C41A3B" }}>Vercel Registry</span>
                <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-3" style={{ color: "var(--ink-strong)" }}>
                  Brand projects, tracked
                </h2>
                <p className="text-[15px] max-w-[720px]" style={{ color: "var(--ink-muted)" }}>
                  Pulled from the IXR Vercel team. Every 9Ruby, IX Ruby, IXR, Nine, and Rubix-related deployment now lives in one official registry.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-2xl px-4 py-3 bg-white" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
                  <span className="block text-2xl font-semibold tracking-tight" style={{ color: "var(--ink-strong)" }}>{vercelBrandProjects.length}</span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>Tracked projects</span>
                </div>
                <div className="rounded-2xl px-4 py-3 bg-white" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
                  <span className="block text-2xl font-semibold tracking-tight" style={{ color: "var(--ink-strong)" }}>{liveVercelProjects.length}</span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>Public links</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {vercelBrandProjects.map((project) => {
                const statusStyles = {
                  live: "bg-emerald-50 text-emerald-600 border-emerald-100",
                  beta: "bg-amber-50 text-amber-600 border-amber-100",
                  experimental: "bg-zinc-100 text-zinc-600 border-zinc-200",
                  internal: "bg-zinc-100 text-zinc-600 border-zinc-200",
                }[project.status]

                const content = (
                  <>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
                          {project.category}
                        </span>
                        <h3 className="text-lg font-semibold tracking-tight mt-2" style={{ color: "var(--ink-strong)" }}>
                          {project.name}
                        </h3>
                      </div>
                      <span className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border ${statusStyles}`}>
                        {project.status}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--ink-muted)" }}>
                      {project.description}
                    </p>

                    <div className="space-y-2 mb-5">
                      <div className="text-[12px]" style={{ color: "var(--ink-muted)" }}>
                        <span className="font-medium" style={{ color: "var(--ink-strong)" }}>Project:</span> {project.projectName}
                      </div>
                      <div className="text-[12px] break-all" style={{ color: "var(--ink-muted)" }}>
                        <span className="font-medium" style={{ color: "var(--ink-strong)" }}>Domain:</span> {project.primaryDomain}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm group-hover:text-[#C41A3B] transition-colors" style={{ color: "var(--ink-muted)" }}>
                      {project.publicUrl ? "Open project" : "Tracked in registry"}
                      {project.publicUrl ? <ExternalLink size={14} /> : <Package size={14} />}
                    </div>
                  </>
                )

                if (project.publicUrl) {
                  return (
                    <a
                      key={project.id}
                      href={project.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    className="group rounded-2xl p-6 bg-white transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.03]"
                    style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                  >
                    <div className="relative overflow-hidden rounded-[18px] aspect-[16/10] mb-5" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(196,26,59,0.08))" }}>
                      {project.previewImage ? (
                        <Image
                          src={project.previewImage}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : null}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.3) 100%)" }} />
                      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                        <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-white/85 text-[#111]">
                          {project.name}
                        </span>
                        <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-black/55 text-white">
                          {project.primaryDomain}
                        </span>
                      </div>
                    </div>
                    {content}
                  </a>
                )
                }

                return (
                  <div
                    key={project.id}
                  className="group rounded-2xl p-6 bg-white transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.03]"
                  style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div className="relative overflow-hidden rounded-[18px] aspect-[16/10] mb-5" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.03), rgba(196,26,59,0.06))" }}>
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.08) 100%)" }} />
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                      <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-white/85 text-[#111]">
                        {project.name}
                      </span>
                      <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-black/10 text-[#111]">
                        Registry
                      </span>
                    </div>
                  </div>
                  {content}
                </div>
              )
              })}
            </div>
          </div>

          {/* Live subdomains */}
          <div className="mb-28">
            <div className="mb-12">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#C41A3B" }}>Infrastructure</span>
              <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-3" style={{ color: "var(--ink-strong)" }}>
                Live across the web
              </h2>
              <p className="text-[15px]" style={{ color: "var(--ink-muted)" }}>Verified public domains from the IXR Vercel inventory.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {liveVercelProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.publicUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 rounded-2xl bg-white transition-all group hover:shadow-lg hover:shadow-black/[0.03]"
                  style={{ border: project.primaryDomain.endsWith(".9ruby.com") ? "1px solid rgba(196,26,59,0.1)" : "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div>
                    <span className="text-sm font-medium group-hover:text-[#1A1A1A] transition-colors" style={{ color: project.primaryDomain.endsWith(".9ruby.com") ? "#1A1A1A" : "#7A7A72" }}>
                      {project.primaryDomain}
                    </span>
                    <span className="block text-xs mt-1 font-mono" style={{ color: "var(--ink-soft)" }}>{project.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    <ExternalLink size={14} className="group-hover:text-[#7A7A72] transition-colors" style={{ color: "var(--ink-soft)" }} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <h2 className="text-4xl md:text-5xl font-serif italic tracking-tighter mb-4" style={{ color: "var(--ink-strong)" }}>
              Build with 9Ruby
            </h2>
            <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: "var(--ink-soft)" }}>
              Join the ecosystem. Start building with our AI tools, templates, and agent platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://ai.9ruby.com"
                className="bg-[#1A1A1A] rounded-full px-7 h-10 text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all inline-flex items-center gap-2"
                style={{ color: "#F8F7F4" }}
              >
                Start with AI <ArrowRight size={14} />
              </a>
              <Link
                href="/contact"
                className="rounded-full px-7 h-10 text-sm font-medium hover:bg-black/[0.02] transition-all inline-flex items-center"
                style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-muted)" }}
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
