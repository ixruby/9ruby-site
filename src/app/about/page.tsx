import type { Metadata } from "next"
import {
  Sparkles, Target, Heart, Zap, Globe, Bot, ArrowRight,
  Users, Code,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageHeader from "@/components/PageHeader"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "About | 9Ruby",
  description:
    "The story behind 9Ruby and IX Ruby. AI agents, websites, voice systems, and automation for modern brands.",
  openGraph: {
    title: "About | 9Ruby",
    description:
      "The story behind 9Ruby and IX Ruby. AI agents, websites, voice systems, and automation for modern brands.",
  },
}

const values = [
  {
    icon: <Sparkles size={18} />,
    title: "AI-First, Always",
    desc: "Every decision starts with: how can AI make this better, faster, smarter? We don't bolt AI onto old processes — we rebuild from scratch.",
  },
  {
    icon: <Target size={18} />,
    title: "Results Over Promises",
    desc: "We measure everything. If it doesn't move the needle, we kill it. Our agents optimize for outcomes, not activities.",
  },
  {
    icon: <Heart size={18} />,
    title: "Radical Simplicity",
    desc: "Complex problems deserve simple solutions. We strip away the unnecessary until only the essential remains. Nine is final.",
  },
  {
    icon: <Zap size={18} />,
    title: "Speed as a Feature",
    desc: "Deploy in hours, not weeks. Our AI agents work 24/7. While others plan, we ship.",
  },
  {
    icon: <Globe size={18} />,
    title: "Global by Default",
    desc: "Built for the world from day one. Multi-language, multi-timezone, and cross-channel by default.",
  },
  {
    icon: <Code size={18} />,
    title: "Open Where It Matters",
    desc: "We open-source our tools and contribute to the community. OpenClaw, templates, and more — free for everyone.",
  },
]

const stats = [
  { value: "2024", label: "Founded" },
  { value: "50+", label: "Brands served" },
  { value: "14+", label: "Service lanes" },
  { value: "24/7", label: "Agent uptime" },
]

const milestones = [
  { year: "2024 Q1", event: "IX Ruby Agency founded. First client projects delivered." },
  { year: "2024 Q2", event: "Launched 9Ruby AI platform with Claude integration." },
  { year: "2024 Q3", event: "Design Studio and dispatch workflows shipped. Templates and utility tools expanded." },
  { year: "2024 Q4", event: "OpenClaw open-sourced. Service delivery matured into a tighter AI-native agency model." },
  { year: "2025 Q1", event: "Ruby OS pricing language and IX Ruby service architecture converged into one operating ladder." },
  { year: "2025 Q2", event: "9Ruby became the public front door for AI access, managed execution, and flagship system builds." },
]

export default function AboutPage() {
  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "About" }]} />

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6">
          <PageHeader
            tag="About"
            title="One brand."
            highlight="Three delivery lanes."
            description="9Ruby is the public operating layer for IX Ruby. AI access, managed execution, and flagship systems now live inside one structure."
          />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-28">
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-8 rounded-2xl bg-white text-center hover:shadow-lg hover:shadow-black/[0.03] transition-all"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <span className="text-4xl md:text-5xl font-serif italic tracking-tighter block mb-2" style={{ color: "var(--ink-strong)" }}>
                  {s.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Story + Timeline */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-28">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#8B6B3D" }}>Our story</span>
              <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-8" style={{ color: "var(--ink-strong)" }}>
                The story
              </h2>
              <div className="space-y-5 leading-relaxed text-[15px]" style={{ color: "var(--ink-muted)" }}>
                <p>
                  9Ruby started with a simple observation: most agencies are slow, fragmented, and disconnected from modern AI workflows. Brands end up managing too many vendors and too many tools.
                </p>
                <p>
                  We built IX Ruby so AI agents could handle research, strategy, content creation, design support, and analytics while humans provide direction, taste, and quality control.
                </p>
                <p>
                  That model worked, but the offer was spread across separate names, pages, and pricing stories. So we collapsed it into one clearer ladder: 9Ruby AI for access, IX Ruby for execution, and Black-tier builds for full systems.
                </p>
                <p>
                  Today, the 9Ruby ecosystem spans AI tools, agency services, websites, voice systems, templates, utilities, and internal infrastructure. The goal is simple: one brand, one structure, faster outcomes.
                </p>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#8B6B3D" }}>Milestones</span>
              <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-8" style={{ color: "var(--ink-strong)" }}>
                Timeline
              </h2>
              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className="flex gap-6 group relative"
                  >
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-[#8B6B3D] mt-2 shrink-0 group-hover:ring-4 group-hover:ring-[#8B6B3D]/10 transition-all" />
                      {i < milestones.length - 1 && (
                        <div className="w-px flex-1" style={{ background: "rgba(0,0,0,0.06)" }} />
                      )}
                    </div>
                    <div className="pb-8">
                      <span className="font-mono text-xs text-[#8B6B3D] block mb-1.5">{m.year}</span>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="mb-28 relative overflow-hidden rounded-2xl bg-white p-12 lg:p-20 text-center" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
            <div className="relative">
              <Bot size={28} className="mx-auto mb-6" style={{ color: "var(--ink-soft)" }} />
              <h2 className="text-4xl lg:text-5xl font-serif italic tracking-tighter mb-6" style={{ color: "var(--ink-strong)" }}>
                Our mission
              </h2>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--ink-muted)" }}>
                To give brands one operating layer for AI, execution, and launch systems instead of a patchwork of freelancers, tools, and disconnected retainers.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-28">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#8B6B3D" }}>Principles</span>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-12" style={{ color: "var(--ink-strong)" }}>
              What we believe
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="p-8 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all group"
                  style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <span className="group-hover:text-[#8B6B3D] transition-colors" style={{ color: "var(--ink-muted)" }}>{v.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-2" style={{ color: "var(--ink-strong)" }}>{v.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: "var(--ink-soft)" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-28">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#8B6B3D" }}>People</span>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-3" style={{ color: "var(--ink-strong)" }}>
              The team
            </h2>
            <p className="mb-12 max-w-lg text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              A lean crew of humans + an army of AI agents. We believe the best teams are small, fast, and AI-augmented.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Vishnu Madhavan", role: "Founder & CEO", tag: "Human" },
                { name: "Ruby Strategist", role: "Campaign Strategy", tag: "AI Agent" },
                { name: "Ruby Designer", role: "Creative Direction", tag: "AI Agent" },
                { name: "Ruby Engineer", role: "Full-Stack Dev", tag: "AI Agent" },
              ].map((t) => (
                <div
                  key={t.name}
                  className="p-6 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all group"
                  style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                    {t.tag === "Human"
                      ? <Users size={20} style={{ color: "var(--ink-soft)" }} />
                      : <Bot size={20} className="text-[#8B6B3D]/50" />
                    }
                  </div>
                  <h4 className="text-[15px] font-semibold mb-0.5" style={{ color: "var(--ink-strong)" }}>{t.name}</h4>
                  <p className="text-xs mb-3" style={{ color: "var(--ink-soft)" }}>{t.role}</p>
                  <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    t.tag === "Human"
                      ? "text-[#7A7A72]"
                      : "text-[#8B6B3D]/70"
                  }`} style={{
                    background: t.tag === "Human" ? "rgba(0,0,0,0.02)" : "rgba(139,107,61,0.06)",
                    border: t.tag === "Human" ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(139,107,61,0.08)",
                  }}>
                    {t.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PRISM */}
          <div className="mb-28">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#8B6B3D" }}>Infrastructure</span>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-3" style={{ color: "var(--ink-strong)" }}>
              Meet PRISM.
            </h2>
            <p className="mb-12 max-w-lg text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Five specialized agents running on our private infrastructure. Each owns a domain. Together they operate like a full studio.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: "PRISM", role: "Orchestrator", desc: "Routes tasks, manages priorities, and coordinates the other four agents." },
                { name: "FORGE", role: "Builder", desc: "Writes and deploys code. Front-end to back-end, scripts to full applications." },
                { name: "SCOUT", role: "Researcher", desc: "Market research, competitor analysis, trend monitoring, data synthesis." },
                { name: "PIXEL", role: "Frontend & Design", desc: "UI systems, design tokens, and production-ready frontend components." },
                { name: "JUNO", role: "Operations", desc: "Scheduling, inbox management, reporting, and workflow automation." },
              ].map((agent) => (
                <div
                  key={agent.name}
                  className="p-6 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all"
                  style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div
                    className="font-mono text-xs font-semibold tracking-wider mb-1"
                    style={{ color: "#8B6B3D" }}
                  >
                    {agent.name}
                  </div>
                  <div className="text-sm font-semibold mb-3" style={{ color: "var(--ink-strong)" }}>{agent.role}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How 9Ruby is structured */}
          <div className="mb-28">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#8B6B3D" }}>Structure</span>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-3" style={{ color: "var(--ink-strong)" }}>
              Three layers, one system
            </h2>
            <p className="text-[15px] mb-10 max-w-2xl" style={{ color: "var(--ink-muted)" }}>
              AI access, managed execution, and flagship systems — structured so you can enter at any layer and scale without switching providers.
            </p>
            <div className="grid lg:grid-cols-3 gap-4">
              {[
                { id: "01", title: "Access", sub: "Start with AI", copy: "9Ruby AI gives founders and teams direct access to chat, prompts, design support, and launch tools.", links: ["9Ruby AI", "Templates", "Tools", "Docs"] },
                { id: "02", title: "Execution", sub: "Move into services", copy: "IX Ruby services turn the tooling into action: websites, automation, SEO, analytics, content systems, and growth operations.", links: ["Services", "Voice agents", "Case studies", "Pricing"] },
                { id: "03", title: "Systems", sub: "Build bigger products", copy: "The highest layer is flagship execution: custom product systems, internal platforms, AI infrastructure, and launch operations.", links: ["Black tier", "Products", "Ecosystem", "Contact"] },
              ].map((layer) => (
                <div key={layer.id} className="rounded-2xl bg-white p-8" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ink-soft)" }}>Layer {layer.id}</div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-1" style={{ color: "var(--ink-strong)" }}>{layer.title}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: "#8B6B3D" }}>{layer.sub}</p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--ink-muted)" }}>{layer.copy}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.links.map((item) => (
                      <span key={item} className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-medium" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)", color: "var(--ink-muted)" }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <h2 className="text-4xl md:text-5xl font-serif italic tracking-tighter mb-4" style={{ color: "var(--ink-strong)" }}>
              Want to join the mission?
            </h2>
            <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: "var(--ink-soft)" }}>
              We&apos;re always looking for talented humans (and training new agents).
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#1A1A1A] rounded-full px-7 h-10 text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all inline-flex items-center gap-2"
                style={{ color: "#F8F7F4" }}
              >
                Get in touch <ArrowRight size={14} />
              </Link>
              <Link
                href="/ecosystem"
                className="rounded-full px-7 h-10 text-sm font-medium hover:bg-black/[0.02] transition-all inline-flex items-center"
                style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-muted)" }}
              >
                Explore ecosystem
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
