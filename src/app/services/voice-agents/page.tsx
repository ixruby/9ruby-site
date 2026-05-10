"use client"

import {
  Mic, PhoneCall, Headphones, Bot, Calendar, Globe,
  CreditCard, ArrowRight, CheckCircle2, Zap, Clock,
  TrendingUp, Users, Mail,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import ElevenLabsSupportWidget from "@/components/ElevenLabsSupportWidget"
import GoogleTTSWidget from "@/components/GoogleTTSWidget"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const useCases = [
  {
    icon: <PhoneCall size={20} strokeWidth={1.5} />,
    title: "AI Sales Agents",
    desc: "Proactive outbound voice agents that qualify leads, handle objections in real time, and book meetings directly into your calendar — at 10× the volume of a human SDR.",
    metric: "10×", metricLabel: "more dials",
  },
  {
    icon: <Headphones size={20} strokeWidth={1.5} />,
    title: "Customer Support",
    desc: "Resolve tier-1 and tier-2 tickets instantly. Emotionally intelligent voice models handle complex troubleshooting, refunds, and escalation to human agents only when needed.",
    metric: "60%", metricLabel: "cost reduction",
  },
  {
    icon: <Bot size={20} strokeWidth={1.5} />,
    title: "Virtual Assistants",
    desc: "Custom-persona voice companions with memory across sessions, knowledge base access, and full tool use. Built for enterprise co-pilots and consumer apps alike.",
    metric: "30+", metricLabel: "languages",
  },
  {
    icon: <Calendar size={20} strokeWidth={1.5} />,
    title: "Appointment Booking",
    desc: "Inbound voice agents that schedule, confirm, reschedule, and cancel appointments — integrated with Google Calendar, Calendly, or any booking platform.",
    metric: "24/7", metricLabel: "availability",
  },
  {
    icon: <CreditCard size={20} strokeWidth={1.5} />,
    title: "Payment & Collections",
    desc: "Intelligent agents that handle payment reminders, collect outstanding invoices, offer payment plans, and update your billing system without human involvement.",
    metric: "38%", metricLabel: "recovery rate",
  },
  {
    icon: <Globe size={20} strokeWidth={1.5} />,
    title: "Multilingual Outreach",
    desc: "Reach global audiences with native-quality voice in 30+ languages. One agent configuration, deployed across all markets simultaneously with zero extra headcount.",
    metric: "30+", metricLabel: "languages",
  },
]

const stats = [
  { icon: <Zap size={18} />, value: "<500ms", label: "Response latency" },
  { icon: <Clock size={18} />, value: "24/7", label: "Always-on operation" },
  { icon: <TrendingUp size={18} />, value: "3×", label: "More qualified calls" },
  { icon: <Users size={18} />, value: "40%", label: "More booked meetings" },
]

const processSteps = [
  {
    num: "01",
    title: "Voice Strategy",
    desc: "We map your ideal call flows, objection handling scripts, and escalation paths — designing an agent persona that sounds and reasons like your best rep.",
  },
  {
    num: "02",
    title: "Model Selection & Cloning",
    desc: "We select the best voice model for your use case — or clone an existing voice using ElevenLabs or custom training — and integrate it with your telephony stack.",
  },
  {
    num: "03",
    title: "CRM & Tool Integration",
    desc: "Every call outcome is automatically logged. Meeting bookings, lead updates, payment records — all synced to your CRM in real time without any manual entry.",
  },
  {
    num: "04",
    title: "Launch & Optimize",
    desc: "We monitor recordings, transcripts, and conversion rates weekly — continuously refining prompts, escalation logic, and voice parameters to improve results.",
  },
]

const getStartedCards = [
  {
    icon: <Mic size={20} strokeWidth={1.5} />,
    title: "Pilot Campaign",
    desc: "Run a 2-week live trial on a real lead list. See results before committing to full deployment. Includes setup, scripting, and a performance report.",
    cta: "Book Pilot Call",
    href: "/contact",
    featured: false,
  },
  {
    icon: <PhoneCall size={20} strokeWidth={1.5} />,
    title: "Full Agent Deployment",
    desc: "Fully managed voice agent with CRM integration, telephony setup, voice cloning, weekly optimization, and a dedicated account manager.",
    cta: "View Plans",
    href: "/pricing",
    featured: true,
  },
  {
    icon: <Mail size={20} strokeWidth={1.5} />,
    title: "Enterprise Custom",
    desc: "On-premise deployment, custom voice cloning, compliance frameworks (HIPAA, GDPR), multi-region infrastructure, and a dedicated solutions engineer.",
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
  },
]

const voiceStack = [
  "ElevenLabs", "Google Cloud TTS", "OpenAI Voice",
  "Deepgram STT", "Twilio", "Vapi.ai", "LiveKit",
  "Claude AI", "GPT-4o", "HubSpot", "Salesforce", "Calendly",
]

/* ------------------------------------------------------------------ */
/*  Waveform visual                                                     */
/* ------------------------------------------------------------------ */

const HEIGHTS = [14, 24, 40, 56, 72, 86, 100, 86, 72, 56, 40, 24, 14]

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[5px]">
      {HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="rounded-full transition-all"
          style={{
            width: 4,
            height: active ? h : 4,
            background: "var(--accent)",
            opacity: active ? 1 : 0.35,
            animation: active ? `waveBar 1.3s ease-in-out ${i * 0.09}s infinite alternate` : "none",
          }}
        />
      ))}
      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.35); opacity: 0.4; }
          to   { transform: scaleY(1);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Scroll reveal hook                                                  */
/* ------------------------------------------------------------------ */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll("[data-reveal]")
    items.forEach((item) => {
      const delay = Number(item.getAttribute("data-reveal-delay") ?? 0)
      setTimeout(() => item.classList.add("revealed"), delay)
    })
  }, [])
  return ref
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function VoiceAgentsPage() {
  const revealRef = useScrollReveal()
  const [activeTab, setActiveTab] = useState<"elevenlabs" | "google">("google")

  return (
    <main
      id="main-content"
      className="relative min-h-screen"
      ref={revealRef}
      style={{ background: "var(--page-bg)" }}
    >
      <Navbar />
      <Breadcrumb
        items={[
          { label: "Services", href: "/services" },
          { label: "Voice AI Agents" },
        ]}
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-36 lg:pt-48 pb-24 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <div>
              <div
                data-reveal
                data-reveal-delay={0}
                className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-6"
                style={{ color: "var(--accent)" }}
              >
                New Service
              </div>
              <h1
                data-reveal
                data-reveal-delay={80}
                className="reveal-item text-5xl lg:text-[68px] font-serif italic leading-[0.95] tracking-tighter mb-6"
                style={{ color: "var(--ink-strong)" }}
              >
                Give your<br />business a<br />
                <em style={{ color: "var(--accent)" }}>voice.</em>
              </h1>
              <p
                data-reveal
                data-reveal-delay={160}
                className="reveal-item text-base leading-relaxed mb-8 max-w-lg"
                style={{ color: "var(--ink-muted)" }}
              >
                Deploy ultra-realistic AI voice agents that cold call, qualify leads, handle
                support, and book meetings — 24/7, under 500ms response time. Switch voice
                models with a single configuration change.
              </p>
              <div
                data-reveal
                data-reveal-delay={240}
                className="reveal-item flex flex-wrap gap-3"
              >
                <Link
                  href="/contact"
                  className="h-10 px-7 rounded-full bg-[#1A1A1A] text-sm font-medium hover:bg-[var(--accent)] transition-all duration-300 inline-flex items-center gap-2"
                  style={{ color: "#F8F7F4" }}
                >
                  Deploy Your Agent <ArrowRight size={14} />
                </Link>
                <Link
                  href="/pricing"
                  className="h-10 px-7 rounded-full text-sm font-medium hover:bg-black/[0.02] transition-all duration-300 inline-flex items-center"
                  style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--ink-muted)" }}
                >
                  View Pricing
                </Link>
              </div>
            </div>

            <div data-reveal data-reveal-delay={200} className="reveal-item">
              {/* Tab switcher */}
              <div
                className="flex gap-1 mb-4 p-1 rounded-2xl w-fit"
                style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <button
                  onClick={() => setActiveTab("google")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200"
                  style={activeTab === "google"
                    ? { background: "#fff", color: "var(--ink-strong)", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }
                    : { color: "var(--ink-muted)" }
                  }
                >
                  Google TTS
                </button>
                <button
                  onClick={() => setActiveTab("elevenlabs")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200"
                  style={activeTab === "elevenlabs"
                    ? { background: "#fff", color: "var(--ink-strong)", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }
                    : { color: "var(--ink-muted)" }
                  }
                >
                  ElevenLabs Live
                </button>
              </div>
              {activeTab === "google" ? <GoogleTTSWidget /> : <ElevenLabsSupportWidget />}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                data-reveal-delay={i * 80}
                className="reveal-item text-center"
              >
                <div className="flex justify-center mb-3" style={{ color: "var(--accent)" }}>
                  {s.icon}
                </div>
                <div
                  className="text-4xl lg:text-5xl font-serif italic tracking-tighter mb-2"
                  style={{ color: "var(--ink-strong)" }}
                >
                  {s.value}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div
              data-reveal
              data-reveal-delay={0}
              className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Use Cases
            </div>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="reveal-item text-4xl lg:text-5xl font-serif italic tracking-tighter"
            >
              <span style={{ color: "var(--ink-strong)" }}>Built for </span>
              <span style={{ color: "var(--ink-soft)" }}>next-gen interactions.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((uc, i) => (
              <div
                key={uc.title}
                data-reveal
                data-reveal-delay={i * 60}
                className="reveal-item bg-white rounded-2xl p-8 transition-all duration-400 hover:shadow-lg hover:shadow-black/[0.04]"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(139,107,61,0.06)", color: "var(--accent)" }}
                  >
                    {uc.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-serif italic font-semibold" style={{ color: "var(--ink-strong)" }}>
                      {uc.metric}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>
                      {uc.metricLabel}
                    </div>
                  </div>
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-2" style={{ color: "var(--ink-strong)" }}>
                  {uc.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div
                data-reveal
                data-reveal-delay={0}
                className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
                style={{ color: "var(--accent)" }}
              >
                Our Approach
              </div>
              <h2
                data-reveal
                data-reveal-delay={80}
                className="reveal-item text-4xl lg:text-5xl font-serif italic tracking-tighter leading-tight"
              >
                <span style={{ color: "var(--ink-strong)" }}>How we deploy </span>
                <span style={{ color: "var(--ink-soft)" }}>your agent.</span>
              </h2>
            </div>

            <div className="space-y-0">
              {processSteps.map((step, i) => (
                <div
                  key={step.num}
                  data-reveal
                  data-reveal-delay={i * 100}
                  className="reveal-item flex gap-6 py-8"
                  style={{ borderBottom: i < processSteps.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
                >
                  <div
                    className="font-mono text-[11px] font-bold pt-0.5 shrink-0 w-6"
                    style={{ color: "var(--accent)" }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight mb-2" style={{ color: "var(--ink-strong)" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUTBOUND vs INBOUND ──────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 space-y-6">
          {/* Outbound */}
          <div
            className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white"
            style={{ border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div
                className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
                style={{ color: "var(--accent)" }}
              >
                Outbound
              </div>
              <h3 className="text-3xl font-serif italic tracking-tighter mb-4" style={{ color: "var(--ink-strong)" }}>
                Cold calling at scale.
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--ink-muted)" }}>
                Upload a lead list and let your voice agent run a full cold-calling campaign.
                Handles timezone optimization, voicemail drops, follow-up sequencing, and
                live transfer to human closers when intent is detected.
              </p>
              <ul className="space-y-2.5 mb-8">
                {["Bulk dial campaigns", "Voicemail drops", "Smart retry logic", "Live transfer", "Intent scoring"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--ink-muted)" }}>
                    <CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ink-soft)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium group/btn"
                style={{ color: "var(--ink-muted)" }}
              >
                Launch outbound campaign
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            <div
              className="min-h-[280px] lg:min-h-0"
              style={{
                background: "linear-gradient(135deg, #0a0a0e 0%, #1a050e 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="text-center">
                <Waveform active={true} />
                <p
                  className="mt-6 font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "rgba(139,107,61,0.5)" }}
                >
                  Outbound · Live
                </p>
              </div>
            </div>
          </div>

          {/* Inbound */}
          <div
            className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white"
            style={{ border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div
              className="min-h-[280px] lg:min-h-0 order-last lg:order-first"
              style={{
                background: "linear-gradient(135deg, #050a14 0%, #05100a 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="text-center">
                <div className="flex items-center gap-[5px] justify-center">
                  {[14, 26, 42, 58, 70, 58, 42, 26, 14].map((h, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: 4, height: h,
                        background: "#22C55E",
                        animation: `waveBar 1.3s ease-in-out ${i * 0.1}s infinite alternate`,
                        opacity: 0.8,
                      }}
                    />
                  ))}
                </div>
                <p
                  className="mt-6 font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "rgba(34,197,94,0.5)" }}
                >
                  Inbound · Support
                </p>
              </div>
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div
                className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
                style={{ color: "#22C55E" }}
              >
                Inbound
              </div>
              <h3 className="text-3xl font-serif italic tracking-tighter mb-4" style={{ color: "var(--ink-strong)" }}>
                Zero hold time. Ever.
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--ink-muted)" }}>
                Replace hold music with an intelligent voice agent that understands context,
                pulls up customer records, resolves common issues, and only escalates when
                truly necessary — reducing support costs by up to 60%.
              </p>
              <ul className="space-y-2.5 mb-8">
                {["Zero hold time", "Knowledge base access", "Account lookup", "Smart escalation", "Post-call survey"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--ink-muted)" }}>
                    <CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ink-soft)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium group/btn"
                style={{ color: "var(--ink-muted)" }}
              >
                Set up inbound support
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── GET STARTED ──────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div
              data-reveal
              data-reveal-delay={0}
              className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Ready to Build?
            </div>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="reveal-item text-4xl lg:text-5xl font-serif italic tracking-tighter"
            >
              <span style={{ color: "var(--ink-strong)" }}>Choose how you want to </span>
              <span style={{ color: "var(--ink-soft)" }}>get started.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {getStartedCards.map((card, i) => (
              <div
                key={card.title}
                data-reveal
                data-reveal-delay={i * 80}
                className="reveal-item relative bg-white rounded-2xl p-8 flex flex-col transition-all duration-400 hover:shadow-lg hover:shadow-black/[0.04]"
                style={{
                  border: card.featured ? "1px solid var(--accent)" : "1px solid rgba(0,0,0,0.04)",
                  boxShadow: card.featured ? "0 0 0 1px var(--accent), 0 16px 48px rgba(139,107,61,0.08)" : undefined,
                }}
              >
                {card.featured && (
                  <div
                    className="absolute -top-px right-8 text-[10px] font-bold tracking-[0.08em] px-3 py-1 rounded-b-lg"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    POPULAR
                  </div>
                )}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: card.featured ? "rgba(139,107,61,0.08)" : "rgba(0,0,0,0.03)",
                    color: card.featured ? "var(--accent)" : "#7A7A72",
                  }}
                >
                  {card.icon}
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-2" style={{ color: "var(--ink-strong)" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed flex-grow mb-8" style={{ color: "var(--ink-muted)" }}>
                  {card.desc}
                </p>
                <Link
                  href={card.href}
                  className="h-10 rounded-full text-sm font-medium transition-all duration-300 inline-flex items-center justify-center gap-2"
                  style={
                    card.featured
                      ? { background: "var(--accent)", color: "#fff" }
                      : { border: "1px solid rgba(0,0,0,0.1)", color: "var(--ink-muted)" }
                  }
                >
                  {card.cta} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOICE STACK ──────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-28 text-center"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Powered By
          </div>
          <h2
            data-reveal
            data-reveal-delay={80}
            className="reveal-item text-3xl lg:text-4xl font-serif italic tracking-tighter mb-12"
          >
            <span style={{ color: "var(--ink-strong)" }}>Industry-leading </span>
            <span style={{ color: "var(--ink-soft)" }}>voice infrastructure.</span>
          </h2>
          <div
            data-reveal
            data-reveal-delay={160}
            className="reveal-item flex flex-wrap justify-center gap-2.5"
          >
            {voiceStack.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full text-sm transition-all duration-300 hover:bg-black/[0.04]"
                style={{
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  color: "var(--ink-muted)",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32 text-center"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-[900px] mx-auto px-6">
          <h2
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-5xl lg:text-7xl font-serif italic tracking-tighter leading-tight mb-6"
          >
            <span style={{ color: "var(--ink-strong)" }}>Your best rep </span>
            <span style={{ color: "var(--ink-soft)" }}>never sleeps.</span>
          </h2>
          <p
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-base leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: "var(--ink-muted)" }}
          >
            Book a free strategy call and we&apos;ll design your voice agent system from scratch —
            call flows, CRM integration, and a go-live plan included.
          </p>
          <div
            data-reveal
            data-reveal-delay={200}
            className="reveal-item flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="h-11 px-8 rounded-full bg-[#1A1A1A] text-sm font-medium hover:bg-[var(--accent)] transition-all duration-300 inline-flex items-center gap-2"
              style={{ color: "#F8F7F4" }}
            >
              Book a Free Call <ArrowRight size={14} />
            </Link>
            <Link
              href="/pricing"
              className="h-11 px-8 rounded-full text-sm font-medium hover:bg-black/[0.02] transition-all duration-300 inline-flex items-center"
              style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-muted)" }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(28px);
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
