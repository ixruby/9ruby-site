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
    "The story behind Nine Ruby. An AI-powered agency building the future of autonomous marketing and technology.",
  openGraph: {
    title: "About | 9Ruby",
    description:
      "The story behind Nine Ruby. An AI-powered agency building the future of autonomous marketing and technology.",
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
    desc: "Deploy in hours, not weeks. Our autonomous agents work 24/7. While others plan, we ship.",
  },
  {
    icon: <Globe size={18} />,
    title: "Global by Default",
    desc: "Built for the world from day one. Multi-language, multi-timezone, multi-platform. No borders.",
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
  { value: "10+", label: "Products shipped" },
  { value: "24/7", label: "Agent uptime" },
]

const milestones = [
  { year: "2024 Q1", event: "IX Ruby Agency founded. First client projects delivered." },
  { year: "2024 Q2", event: "Launched 9Ruby AI platform with Claude integration." },
  { year: "2024 Q3", event: "Design Studio and Dispatch mode shipped. 10+ templates live." },
  { year: "2024 Q4", event: "OpenClaw open-sourced. 50+ brands onboarded." },
  { year: "2025 Q1", event: "Rubix Terminal beta. Ruby OS architecture started." },
  { year: "2025 Q2", event: "Enterprise tier launched. Global infrastructure expanded to 29 regions." },
]

export default function AboutPage() {
  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "#F8F7F4" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "About" }]} />

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6">
          <PageHeader
            tag="About"
            title="Nine is final."
            highlight="We build what's next."
            description="IX Ruby is an AI-powered agency that deploys autonomous agents to plan, create, and scale brands. No handoffs. No delays. Just results."
          />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-28">
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-8 rounded-2xl bg-white text-center hover:shadow-lg hover:shadow-black/[0.03] transition-all"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <span className="text-4xl md:text-5xl font-serif italic tracking-tighter block mb-2" style={{ color: "#1A1A1A" }}>
                  {s.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "#B8B8B0" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Story + Timeline */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-28">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#C41A3B" }}>Our story</span>
              <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-8" style={{ color: "#1A1A1A" }}>
                The story
              </h2>
              <div className="space-y-5 leading-relaxed text-[15px]" style={{ color: "#7A7A72" }}>
                <p>
                  Nine Ruby started with a simple observation: most agencies are slow, expensive, and disconnected from the AI revolution. Brands deserve better.
                </p>
                <p>
                  We built an agency where AI agents do the heavy lifting — research, strategy, content creation, design, analytics — while humans provide creative direction and quality control.
                </p>
                <p>
                  The result is faster delivery, lower costs, and campaigns that learn and improve autonomously. Our agents work around the clock, across every channel, optimizing for the metrics that matter.
                </p>
                <p>
                  Today, the 9Ruby ecosystem spans a full AI platform, a template library, developer tools, and an open-source agent framework. We&apos;re building the operating system for the AI-native agency.
                </p>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#C41A3B" }}>Milestones</span>
              <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-8" style={{ color: "#1A1A1A" }}>
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
                      <div className="w-2 h-2 rounded-full bg-[#C41A3B] mt-2 shrink-0 group-hover:ring-4 group-hover:ring-[#C41A3B]/10 transition-all" />
                      {i < milestones.length - 1 && (
                        <div className="w-px flex-1" style={{ background: "rgba(0,0,0,0.06)" }} />
                      )}
                    </div>
                    <div className="pb-8">
                      <span className="font-mono text-xs text-[#C41A3B] block mb-1.5">{m.year}</span>
                      <p className="text-sm leading-relaxed" style={{ color: "#7A7A72" }}>{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="mb-28 relative overflow-hidden rounded-2xl bg-white p-12 lg:p-20 text-center" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
            <div className="relative">
              <Bot size={28} className="mx-auto mb-6" style={{ color: "#B8B8B0" }} />
              <h2 className="text-4xl lg:text-5xl font-serif italic tracking-tighter mb-6" style={{ color: "#1A1A1A" }}>
                Our mission
              </h2>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#7A7A72" }}>
                To make world-class marketing and technology accessible to every brand on earth — through autonomous AI agents that never sleep, never burn out, and never stop improving.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-28">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#C41A3B" }}>Principles</span>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-12" style={{ color: "#1A1A1A" }}>
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
                    <span className="group-hover:text-[#C41A3B] transition-colors" style={{ color: "#7A7A72" }}>{v.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-2" style={{ color: "#1A1A1A" }}>{v.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: "#B8B8B0" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-28">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#C41A3B" }}>People</span>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-3" style={{ color: "#1A1A1A" }}>
              The team
            </h2>
            <p className="mb-12 max-w-lg text-[15px] leading-relaxed" style={{ color: "#B8B8B0" }}>
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
                      ? <Users size={20} style={{ color: "#B8B8B0" }} />
                      : <Bot size={20} className="text-[#C41A3B]/50" />
                    }
                  </div>
                  <h4 className="text-[15px] font-semibold mb-0.5" style={{ color: "#1A1A1A" }}>{t.name}</h4>
                  <p className="text-xs mb-3" style={{ color: "#B8B8B0" }}>{t.role}</p>
                  <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    t.tag === "Human"
                      ? "text-[#7A7A72]"
                      : "text-[#C41A3B]/70"
                  }`} style={{
                    background: t.tag === "Human" ? "rgba(0,0,0,0.02)" : "rgba(196,26,59,0.06)",
                    border: t.tag === "Human" ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(196,26,59,0.08)",
                  }}>
                    {t.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PRISM */}
          <div className="mb-28">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block" style={{ color: "#C41A3B" }}>Infrastructure</span>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-3" style={{ color: "#1A1A1A" }}>
              Meet PRISM.
            </h2>
            <p className="mb-12 max-w-lg text-[15px] leading-relaxed" style={{ color: "#B8B8B0" }}>
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
                    style={{ color: "#C41A3B" }}
                  >
                    {agent.name}
                  </div>
                  <div className="text-sm font-semibold mb-3" style={{ color: "#1A1A1A" }}>{agent.role}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "#B8B8B0" }}>{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <h2 className="text-4xl md:text-5xl font-serif italic tracking-tighter mb-4" style={{ color: "#1A1A1A" }}>
              Want to join the mission?
            </h2>
            <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: "#B8B8B0" }}>
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
                style={{ border: "1px solid rgba(0,0,0,0.08)", color: "#7A7A72" }}
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
