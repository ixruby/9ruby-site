import type { Metadata } from "next"
import { Sparkles, Target, Heart, Zap, Globe, Code, Bot, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "About | 9Ruby",
  description: "The story behind 9Ruby and IX Ruby. AI agents, websites, voice systems, and automation for modern brands.",
}

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const values = [
  { icon: <Sparkles size={18} />, title: "AI-First, Always", desc: "Every decision starts with: how can AI make this better, faster, smarter? We don't bolt AI onto old processes — we rebuild from scratch." },
  { icon: <Target size={18} />, title: "Results Over Promises", desc: "We measure everything. If it doesn't move the needle, we kill it. Our agents optimize for outcomes, not activities." },
  { icon: <Heart size={18} />, title: "Radical Simplicity", desc: "Complex problems deserve simple solutions. We strip away the unnecessary until only the essential remains." },
  { icon: <Zap size={18} />, title: "Speed as a Feature", desc: "Deploy in hours, not weeks. Our AI agents work 24/7. While others plan, we ship." },
  { icon: <Globe size={18} />, title: "Global by Default", desc: "Built for the world from day one. Multi-language, multi-timezone, and cross-channel by default." },
  { icon: <Code size={18} />, title: "Open Where It Matters", desc: "We open-source our tools and contribute to the community. Templates, utilities, and more — free for everyone." },
]

const stats = [
  { value: "2024", label: "Founded" },
  { value: "50+", label: "Brands Served" },
  { value: "13+", label: "Service Lanes" },
  { value: "24/7", label: "Agent Uptime" },
]

const milestones = [
  { year: "2024 Q1", event: "IX Ruby Agency founded. First client projects delivered." },
  { year: "2024 Q2", event: "Launched 9Ruby AI platform with Claude integration." },
  { year: "2024 Q3", event: "Design Studio and dispatch workflows shipped. Templates and utility tools expanded." },
  { year: "2024 Q4", event: "OpenClaw open-sourced. Service delivery matured into a tighter AI-native agency model." },
  { year: "2025 Q1", event: "Ruby OS pricing language and IX Ruby service architecture converged into one operating ladder." },
  { year: "2025 Q2", event: "9Ruby became the public front door for AI access, managed execution, and flagship system builds." },
]

const prismAgents = [
  { name: "PRISM", role: "Orchestrator", desc: "Routes tasks, manages priorities, and coordinates the other four agents." },
  { name: "FORGE", role: "Builder", desc: "Writes and deploys code. Front-end to back-end, scripts to full applications." },
  { name: "SCOUT", role: "Researcher", desc: "Market research, competitor analysis, trend monitoring, data synthesis." },
  { name: "PIXEL", role: "Frontend & Design", desc: "UI systems, design tokens, and production-ready frontend components." },
  { name: "JUNO", role: "Operations", desc: "Scheduling, inbox management, reporting, and workflow automation." },
]

const team = [
  { name: "Vishnu Madhavan", role: "Founder & CEO", tag: "Human" },
  { name: "Ruby Strategist", role: "Campaign Strategy", tag: "AI Agent" },
  { name: "Ruby Designer", role: "Creative Direction", tag: "AI Agent" },
  { name: "Ruby Engineer", role: "Full-Stack Dev", tag: "AI Agent" },
]

export default function AboutPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "About" }]} />

      {/* HERO */}
      <section style={{ background: "#000" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>About</p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(56px, 10vw, 120px)", color: "#fff", marginBottom: 28 }}>
            ABOUT 9RUBY
          </h1>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto" }}>
            One brand. Three delivery lanes. AI access, managed execution, and flagship systems — now inside one structure.
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="py-10 px-6 text-center" style={{ borderRight: i % 2 === 0 || i < 3 ? BORDER : "none", borderBottom: i < 2 ? BORDER : "none" }}>
                <div style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(28px,5vw,40px)", color: "#fff", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY + TIMELINE */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Story */}
            <div>
              <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>Our Story</p>
              <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(36px,5vw,52px)", color: "#fff", marginBottom: 28 }}>
                THE STORY
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  "9Ruby started with a simple observation: most agencies are slow, fragmented, and disconnected from modern AI workflows. Brands end up managing too many vendors and too many tools.",
                  "We built IX Ruby so AI agents could handle research, strategy, content creation, design support, and analytics while humans provide direction, taste, and quality control.",
                  "That model worked, but the offer was spread across separate names, pages, and pricing stories. So we collapsed it into one clearer ladder: 9Ruby AI for access, IX Ruby for execution, and Black-tier builds for full systems.",
                  "Today, the 9Ruby ecosystem spans AI tools, agency services, websites, voice systems, templates, utilities, and internal infrastructure. One brand, one structure, faster outcomes.",
                ].map((para, i) => (
                  <p key={i} style={{ fontFamily: NV, fontSize: 14, lineHeight: 1.75, color: i === 0 ? "#fff" : "rgba(255,255,255,0.44)" }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>Milestones</p>
              <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(36px,5vw,52px)", color: "#fff", marginBottom: 28 }}>
                TIMELINE
              </h2>
              <div className="flex flex-col">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", marginTop: 3, flexShrink: 0 }} />
                      {i < milestones.length - 1 && <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.12)", minHeight: 32 }} />}
                    </div>
                    <div className="pb-6">
                      <span style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", display: "block", marginBottom: 4 }}>{m.year}</span>
                      <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.44)" }}>{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section style={{ borderBottom: BORDER }} className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <Bot size={32} style={{ color: "#fff", margin: "0 auto 24px" }} />
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>Mission</p>
          <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(40px,6vw,80px)", color: "#fff", marginBottom: 24 }}>
            OUR MISSION
          </h2>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.44)", maxWidth: 680, margin: "0 auto" }}>
            To give brands one operating layer for AI, execution, and launch systems instead of a patchwork of freelancers, tools, and disconnected retainers.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>Principles</p>
              <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(40px,6vw,64px)", color: "#fff" }}>
                WHAT WE BELIEVE
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ border: BORDER }}>
            {values.map((v, i) => (
              <div key={v.title} className="p-8 flex flex-col gap-5" style={{ borderRight: (i + 1) % 3 !== 0 ? BORDER : undefined, borderBottom: BORDER }}>
                <div style={{ width: 36, height: 36, border: BORDER, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  {v.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.93, fontSize: 18, color: "#fff", marginBottom: 10 }}>
                    {v.title}
                  </h3>
                  <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.44)" }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12">
            <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>People</p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(40px,6vw,64px)", color: "#fff", marginBottom: 12 }}>
              THE TEAM
            </h2>
            <p style={{ fontFamily: NV, fontSize: 14, color: "rgba(255,255,255,0.44)", maxWidth: 480 }}>
              A lean crew of humans + an army of AI agents. We believe the best teams are small, fast, and AI-augmented.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ border: BORDER }}>
            {team.map((t, i) => (
              <div key={t.name} className="p-7 flex flex-col gap-4" style={{ borderRight: (i + 1) % 4 !== 0 ? BORDER : undefined, borderBottom: i < 2 ? BORDER : undefined }}>
                <div style={{ width: 48, height: 48, border: BORDER, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {t.tag === "Human"
                    ? <Users size={20} style={{ color: "rgba(255,255,255,0.4)" }} />
                    : <Bot size={20} style={{ color: "#fff" }} />
                  }
                </div>
                <div>
                  <h4 style={{ fontFamily: NV, fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 4 }}>{t.name}</h4>
                  <p style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>{t.role}</p>
                  <span style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: t.tag === "Human" ? "rgba(255,255,255,0.4)" : "#fff", border: t.tag === "Human" ? BORDER : "0.8px solid rgba(255,255,255,0.4)", padding: "3px 10px" }}>
                    {t.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRISM */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12">
            <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>Infrastructure</p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(40px,6vw,64px)", color: "#fff", marginBottom: 12 }}>
              MEET PRISM.
            </h2>
            <p style={{ fontFamily: NV, fontSize: 14, color: "rgba(255,255,255,0.44)", maxWidth: 480 }}>
              Five specialized agents running on our private infrastructure. Each owns a domain. Together they operate like a full studio.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ border: BORDER }}>
            {prismAgents.map((agent, i) => (
              <div key={agent.name} className="p-6 flex flex-col gap-3" style={{ borderRight: (i + 1) % 5 !== 0 ? BORDER : undefined, borderBottom: BORDER }}>
                <div style={{ fontFamily: NV, fontSize: 13, fontWeight: 950, letterSpacing: "0.08em", color: "#fff" }}>{agent.name}</div>
                <div style={{ fontFamily: NV, fontSize: 13, fontWeight: 700, color: "#fff" }}>{agent.role}</div>
                <p style={{ fontFamily: NV, fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.44)" }}>{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>Our Stack</p>
              <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(40px,6vw,64px)", color: "#fff" }}>
                TOOLS WE USE
              </h2>
            </div>
            <p style={{ fontFamily: NV, fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.44)", maxWidth: 380 }}>
              Every tool in our stack is chosen for speed, reliability, and AI compatibility. Nothing bloated, nothing legacy.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" style={{ border: BORDER }}>
            {[
              { cat: "AI", tools: ["Claude", "GPT-4", "ElevenLabs"] },
              { cat: "Frontend", tools: ["Next.js", "React", "Tailwind CSS"] },
              { cat: "Backend", tools: ["Node.js", "Supabase", "Vercel"] },
              { cat: "Automation", tools: ["n8n", "Make", "Zapier"] },
              { cat: "Analytics", tools: ["Plausible", "PostHog", "Looker"] },
              { cat: "Design", tools: ["Figma", "Adobe CC", "Framer"] },
            ].map((col, i) => (
              <div key={col.cat} className="p-6 flex flex-col gap-3" style={{ borderRight: (i + 1) % 6 !== 0 ? BORDER : undefined, borderBottom: BORDER }}>
                <span style={{ fontFamily: NV, fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>{col.cat}</span>
                {col.tools.map((t) => (
                  <span key={t} style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#000" }} className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2rem,5vw,4rem)", color: "#fff", marginBottom: 16 }}>
              WANT TO JOIN<br />THE MISSION?
            </h2>
            <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: 400 }}>
              We&apos;re always looking for talented humans (and training new agents).
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "12px 28px", textDecoration: "none" }}>
              Get in Touch <ArrowRight size={12} />
            </Link>
            <Link href="/services" className="inline-flex items-center hover:opacity-80 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "0.8px solid rgba(255,255,255,0.4)", color: "#fff", padding: "12px 28px", textDecoration: "none" }}>
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
