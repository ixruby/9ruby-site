import type { Metadata } from "next"
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
    badgeStyle: "border border-white/[0.15] text-white/70",
    href: "https://ai.9ruby.com",
    features: ["AI Chat (Sonnet + Opus)", "Design Studio", "Dispatch mode", "100+ integrations"],
  },
  {
    name: "IX Ruby Agency",
    tagline: "Managed execution layer",
    desc: "Websites, automation, SEO, analytics, voice agents, video production, and custom software delivered inside one managed lane.",
    icon: <Globe size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "border border-white/[0.15] text-white/70",
    href: "https://home.9ruby.com/services",
    features: ["11+ service lines", "Voice AI Agents", "24/7 operation", "Global delivery"],
  },
  {
    name: "9Ruby Templates",
    tagline: "Ship faster with templates",
    desc: "A growing library of free and premium website templates. Landing pages, portfolios, e-commerce, dashboards — built with Next.js, React, and Tailwind CSS.",
    icon: <Layout size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "border border-white/[0.15] text-white/70",
    href: "/templates",
    features: ["15+ templates", "Next.js + Tailwind", "Free & premium", "One-click deploy"],
  },
  {
    name: "OpenClaw",
    tagline: "Open-source AI agent",
    desc: "Open-source AI agent with 100+ skills across 20+ messaging platforms. Extensible, community-driven, and part of the broader 9Ruby operator stack.",
    icon: <Bot size={20} strokeWidth={1.5} />,
    badge: "Open Source",
    badgeStyle: "border border-white/[0.15] text-white/70",
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
    badgeStyle: "border border-white/[0.15] text-white/70",
    href: "https://nine-builder.vercel.app",
    features: ["Drag-drop editor", "Puck-powered", "Supabase backend", "One-click deploy"],
  },
  {
    name: "Novavox",
    tagline: "AI music & audio platform",
    desc: "Creative platform for artists and music brands. Artist pages, catalog management, releases, shop, gallery, tours, and an embedded audio player — all in one.",
    icon: <Music size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "border border-white/[0.15] text-white/70",
    href: "https://novavox.vercel.app",
    features: ["Artist pages", "Audio player", "Shop & releases", "Admin panel"],
  },
  {
    name: "Voice AI Agents",
    tagline: "Sub-500ms voice automation",
    desc: "Ultra-realistic AI voice agents for outbound sales, inbound support, and appointment booking. Powered by ElevenLabs, Twilio, Vapi.ai, and Claude AI.",
    icon: <Mic size={20} strokeWidth={1.5} />,
    badge: "Live",
    badgeStyle: "border border-white/[0.15] text-white/70",
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
    badgeStyle: "border border-white/[0.15] text-amber-400",
    href: "#",
    features: ["Focus timer", "Task tracking", "Session history", "AI music"],
  },
  {
    name: "Pitch Deck Generator",
    tagline: "AI-powered pitch decks",
    desc: "Generate investor-ready pitch decks in minutes. AI writes the narrative, designs the slides, and exports to PPTX — with auth, admin panel, and database persistence built in.",
    icon: <Presentation size={20} strokeWidth={1.5} />,
    badge: "Beta",
    badgeStyle: "border border-white/[0.15] text-amber-400",
    href: "#",
    features: ["AI generation", "PPTX export", "Auth system", "Admin panel"],
  },
]

const CATEGORY_PALETTE: Record<string, { bg: string; accent: string }> = {
  Core:             { bg: "linear-gradient(135deg,#0d0d1a,#1a0a2e)", accent: "#C8102E" },
  Agency:           { bg: "linear-gradient(135deg,#0a0a14,#1a1030)", accent: "#7c3aed" },
  Brand:            { bg: "linear-gradient(135deg,#0f1520,#1a2840)", accent: "#3b82f6" },
  Products:         { bg: "linear-gradient(135deg,#0a1a0a,#0f2a18)", accent: "#22c55e" },
  "Developer Tools":{ bg: "linear-gradient(135deg,#1a1000,#2d1e00)", accent: "#f59e0b" },
  Infra:            { bg: "linear-gradient(135deg,#0a0f18,#121e30)", accent: "#64748b" },
  Experiments:      { bg: "linear-gradient(135deg,#100a1a,#1e1030)", accent: "#a855f7" },
  Showcases:        { bg: "linear-gradient(135deg,#120808,#200e0e)", accent: "#ef4444" },
}

function ProjectVisual({ name, category, status }: { name: string; category: string; status: string }) {
  const pal = CATEGORY_PALETTE[category] ?? { bg: "linear-gradient(135deg,#0d0d0d,#1a1a1a)", accent: "#C8102E" }
  const seed = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const pts = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2 + seed
    const r = 55 + ((seed * (i + 3)) % 35)
    return [200 + Math.cos(angle) * r, 112 + Math.sin(angle) * r] as [number, number]
  })
  const hex = pal.bg.match(/#[0-9a-f]{6}/gi) ?? ["#0d0d0d", "#1a1a1a"]
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
      <defs>
        <linearGradient id={`ep-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
          {hex.map((c, i) => <stop key={i} offset={`${i * 100}%`} stopColor={c} />)}
        </linearGradient>
        <radialGradient id={`eg-${name}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={pal.accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={pal.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="225" fill={`url(#ep-${name})`} />
      <ellipse cx="200" cy="112" rx="180" ry="100" fill={`url(#eg-${name})`} />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill={pal.accent} fillOpacity={0.55 + i * 0.06} />
      ))}
      {pts.map(([x, y], i) => (
        <line key={i} x1="200" y1="112" x2={x} y2={y} stroke={pal.accent} strokeWidth="0.7" strokeOpacity="0.22" />
      ))}
      {pts.map(([x, y], i) => {
        const next = pts[(i + 1) % pts.length]
        return <line key={`e${i}`} x1={x} y1={y} x2={next[0]} y2={next[1]} stroke={pal.accent} strokeWidth="0.5" strokeOpacity="0.14" />
      })}
      <circle cx="200" cy="112" r="9" fill={pal.accent} fillOpacity="0.8" />
      <circle cx="200" cy="112" r="4" fill="#fff" fillOpacity="0.6" />
      <rect width="400" height="225" fill="rgba(0,0,0,0)" />
    </svg>
  )
}

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

export default function EcosystemPage() {
  return (
    <main className="relative min-h-screen" style={{ background: "#000", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Ecosystem" }]} />

      {/* HERO */}
      <section style={{ background: "#8C000E" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Ecosystem</p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(56px,10vw,120px)", color: "#fff", marginBottom: 28 }}>
            THE 9RUBY<br />ECOSYSTEM
          </h1>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto" }}>
            AI access, managed execution, flagship systems, templates, tools, and live projects — all in one place.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div style={{ display: "none" }}>
            <PageHeader
              tag="Ecosystem"
              title="The 9Ruby"
              highlight="ecosystem."
              description=""
            />
          </div>

          {/* Product cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-28">
            {products.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative flex flex-col p-8 lg:p-10 p-8 transition-colors hover:bg-white/[0.03]"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                {/* Header: icon + badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:text-[#1A1A1A] transition-colors" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", color: "rgba(255,255,255,0.5)" }}>
                    {p.icon}
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border ${p.badgeStyle || ""}`} style={!p.badgeStyle ? { background: "rgba(0,0,0,0.02)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(0,0,0,0.06)" } : {}}>
                    {p.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <span className="font-mono text-xs block mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>{p.tagline}</span>
                  <h3 className="text-xl font-semibold tracking-tight mb-3" style={{ color: "#fff" }}>{p.name}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{p.desc}</p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-2 mt-auto mb-6">
                  {p.features.map((f) => (
                    <span key={f} className="text-xs flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                      <span className="w-1 h-1 rounded-full bg-[#C8102E]/50 shrink-0" />
                      {f}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm group-hover:text-[#C8102E] group-hover:gap-3 transition-all" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {p.badge === "Coming Soon" || p.badge === "In Development" ? "Learn more" : "Explore"}
                  <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>

          <div className="mb-28">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#C8102E" }}>Vercel Registry</span>
                <h2 className="text-3xl md:text-4xl font-sans tracking-tighter mb-3" style={{ color: "#fff" }}>
                  Brand projects, tracked
                </h2>
                <p className="text-[15px] max-w-[720px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Pulled from the IXR Vercel team. Every 9Ruby, IX Ruby, IXR, Nine, and Rubix-related deployment now lives in one official registry.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-3" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
                  <span className="block text-2xl font-semibold tracking-tight" style={{ color: "#fff" }}>{vercelBrandProjects.length}</span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.35)" }}>Tracked projects</span>
                </div>
                <div className="px-4 py-3" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
                  <span className="block text-2xl font-semibold tracking-tight" style={{ color: "#fff" }}>{liveVercelProjects.length}</span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.35)" }}>Public links</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {vercelBrandProjects.map((project) => {
                const statusStyles = {
                  live: "border border-white/[0.15] text-white/70",
                  beta: "border border-white/[0.15] text-amber-400",
                  experimental: "border border-white/[0.12] text-white/40",
                  internal: "border border-white/[0.12] text-white/40",
                }[project.status]

                const content = (
                  <>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {project.category}
                        </span>
                        <h3 className="text-lg font-semibold tracking-tight mt-2" style={{ color: "#fff" }}>
                          {project.name}
                        </h3>
                      </div>
                      <span className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border ${statusStyles}`}>
                        {project.status}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {project.description}
                    </p>

                    <div className="space-y-2 mb-5">
                      <div className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <span className="font-medium" style={{ color: "#fff" }}>Project:</span> {project.projectName}
                      </div>
                      <div className="text-[12px] break-all" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <span className="font-medium" style={{ color: "#fff" }}>Domain:</span> {project.primaryDomain}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm group-hover:text-[#C8102E] transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
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
                    className="group p-6 transition-colors hover:bg-white/[0.03]"
                    style={{ border: "0.8px solid rgba(255,255,255,0.12)" }}
                  >
                    <div className="relative overflow-hidden aspect-[16/10] mb-5">
                      <ProjectVisual name={project.name} category={project.category} status={project.status} />
                      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                        <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-white/85 text-[#111]">
                          {project.name}
                        </span>
                        <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-black/55 text-white">
                          LIVE
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
                  className="group p-6 transition-colors hover:bg-white/[0.03]"
                  style={{ border: "0.8px solid rgba(255,255,255,0.12)" }}
                >
                  <div className="relative overflow-hidden aspect-[16/10] mb-5">
                    <ProjectVisual name={project.name} category={project.category} status={project.status} />
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                      <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-white/85 text-[#111]">
                        {project.name}
                      </span>
                      <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] bg-black/55 text-white">
                        {project.status}
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
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#C8102E" }}>Infrastructure</span>
              <h2 className="text-3xl md:text-4xl font-sans tracking-tighter mb-3" style={{ color: "#fff" }}>
                Live across the web
              </h2>
              <p className="text-[15px]" style={{ color: "rgba(255,255,255,0.5)" }}>Verified public domains from the IXR Vercel inventory.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {liveVercelProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.publicUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 transition-colors group hover:bg-white/[0.03]"
                  style={{ border: project.primaryDomain.endsWith(".9ruby.com") ? "1px solid rgba(139,107,61,0.1)" : "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div>
                    <span className="text-sm font-medium group-hover:text-[#1A1A1A] transition-colors" style={{ color: project.primaryDomain.endsWith(".9ruby.com") ? "#1A1A1A" : "#7A7A72" }}>
                      {project.primaryDomain}
                    </span>
                    <span className="block text-xs mt-1 font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{project.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    <ExternalLink size={14} className="group-hover:text-[#7A7A72] transition-colors" style={{ color: "rgba(255,255,255,0.35)" }} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <h2 className="text-4xl md:text-5xl font-sans tracking-tighter mb-4" style={{ color: "#fff" }}>
              Build with 9Ruby
            </h2>
            <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.35)" }}>
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
                style={{ border: "1px solid rgba(0,0,0,0.08)", color: "rgba(255,255,255,0.5)" }}
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
