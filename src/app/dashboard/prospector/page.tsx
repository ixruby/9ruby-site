"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
  Search, Plus, Filter, Building2, Mail, Globe,
  ArrowRight, CheckCircle2, Clock, Send, MessageSquare,
  TrendingUp, Users, Target, Zap, MoreHorizontal, ChevronDown,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Types & Data                                                        */
/* ------------------------------------------------------------------ */

type PitchStatus = "new" | "drafted" | "sent" | "replied" | "converted"

interface Prospect {
  id: number
  business: string
  category: string
  location: string
  email: string
  website: string
  status: PitchStatus
  score: number
}

const MOCK_PROSPECTS: Prospect[] = [
  { id: 1, business: "Horizon Dental Group", category: "Healthcare", location: "Austin, TX", email: "info@horizondental.com", website: "horizondental.com", status: "replied", score: 92 },
  { id: 2, business: "Vega Real Estate", category: "Real Estate", location: "Miami, FL", email: "hello@vegare.com", website: "vegare.com", status: "sent", score: 78 },
  { id: 3, business: "Apex Fitness Studio", category: "Fitness", location: "New York, NY", email: "contact@apexfit.com", website: "apexfit.com", status: "converted", score: 95 },
  { id: 4, business: "Bluebird Legal", category: "Legal", location: "Chicago, IL", email: "team@bluebird.law", website: "bluebird.law", status: "drafted", score: 65 },
  { id: 5, business: "Nomad Coffee Roasters", category: "F&B", location: "Portland, OR", email: "hi@nomadcoffee.com", website: "nomadcoffee.com", status: "new", score: 55 },
  { id: 6, business: "Stellar Tech Partners", category: "SaaS", location: "San Francisco, CA", email: "growth@stellartech.io", website: "stellartech.io", status: "new", score: 82 },
  { id: 7, business: "Prism Architecture", category: "Architecture", location: "Seattle, WA", email: "studio@prismarch.com", website: "prismarch.com", status: "sent", score: 71 },
  { id: 8, business: "GreenPath Landscaping", category: "Home Services", location: "Denver, CO", email: "info@greenpath.co", website: "greenpath.co", status: "new", score: 48 },
]

const STATS = [
  { label: "Total Prospects", value: "8", icon: Users, color: "#C41A3B" },
  { label: "Pitches Sent", value: "3", icon: Send, color: "#3B82F6" },
  { label: "Replies", value: "1", icon: MessageSquare, color: "#8B5CF6" },
  { label: "Converted", value: "1", icon: Target, color: "#10B981" },
]

const STATUS_CONFIG: Record<PitchStatus, { label: string; color: string; bg: string }> = {
  new:       { label: "Not Contacted", color: "#6B7280", bg: "rgba(107,114,128,0.08)" },
  drafted:   { label: "Draft Ready",   color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
  sent:      { label: "Sent",          color: "#3B82F6", bg: "rgba(59,130,246,0.08)" },
  replied:   { label: "Replied",       color: "#8B5CF6", bg: "rgba(139,92,246,0.08)" },
  converted: { label: "Converted",     color: "#10B981", bg: "rgba(16,185,129,0.08)" },
}

const FILTERS: { key: PitchStatus | "all"; label: string }[] = [
  { key: "all",       label: "All" },
  { key: "new",       label: "Not Contacted" },
  { key: "drafted",   label: "Drafted" },
  { key: "sent",      label: "Sent" },
  { key: "replied",   label: "Replied" },
  { key: "converted", label: "Converted" },
]

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#6B7280"
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
        <div className="h-full rounded-full" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-xs font-mono font-semibold" style={{ color }}>{score}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function ProspectorPage() {
  const [filter, setFilter] = useState<PitchStatus | "all">("all")
  const [search, setSearch] = useState("")

  const filtered = MOCK_PROSPECTS.filter(p => {
    const matchFilter = filter === "all" || p.status === filter
    const matchSearch = !search || p.business.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <main className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="pt-28 pb-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: "#C41A3B" }}>
                Dashboard / Prospector
              </div>
              <h1 className="text-3xl font-serif italic tracking-tighter" style={{ color: "var(--ink-strong)" }}>
                Lead Prospector
              </h1>
              <p className="text-sm mt-1" style={{ color: "var(--ink-muted)" }}>
                Find businesses, generate AI pitches, and close deals.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="h-9 px-5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200"
                style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--ink-muted)", background: "#fff" }}
              >
                <Filter size={13} /> Filter
              </button>
              <button
                className="h-9 px-5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200"
                style={{ background: "#1A1A1A", color: "#fff" }}
              >
                <Plus size={13} /> Add Prospect
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        <div className="max-w-[1280px] mx-auto space-y-6">

          {/* ── STATS ──────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div
                key={s.label}
                className="bg-white rounded-2xl p-6"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: "var(--ink-soft)" }}>{s.label}</span>
                  <s.icon size={14} style={{ color: s.color }} />
                </div>
                <div className="text-3xl font-serif italic tracking-tighter" style={{ color: "var(--ink-strong)" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* ── TABLE CARD ─────────────────────────────────────── */}
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>

            {/* toolbar */}
            <div className="flex items-center justify-between gap-4 px-6 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-1">
                {FILTERS.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                    style={filter === f.key
                      ? { background: "#1A1A1A", color: "#fff" }
                      : { color: "var(--ink-muted)", background: "transparent" }
                    }
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-soft)" }} />
                <input
                  type="text"
                  placeholder="Search prospects..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="h-8 pl-8 pr-4 rounded-lg text-xs outline-none"
                  style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)", color: "var(--ink-strong)", width: 220 }}
                />
              </div>
            </div>

            {/* table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    {["Business", "Category", "Location", "Email", "Website", "Score", "Status", ""].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-[10px] font-semibold tracking-[0.08em] uppercase" style={{ color: "var(--ink-soft)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => {
                    const st = STATUS_CONFIG[p.status]
                    return (
                      <tr
                        key={p.id}
                        className="group transition-colors duration-150"
                        style={{
                          borderBottom: i < filtered.length - 1 ? "1px solid rgba(0,0,0,0.03)" : "none",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.01)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(196,26,59,0.06)" }}>
                              <Building2 size={14} style={{ color: "#C41A3B" }} />
                            </div>
                            <span className="text-sm font-medium" style={{ color: "var(--ink-strong)" }}>{p.business}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.03)", color: "var(--ink-muted)" }}>
                            {p.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: "var(--ink-muted)" }}>{p.location}</td>
                        <td className="px-6 py-4">
                          <a href={`mailto:${p.email}`} className="text-xs hover:underline" style={{ color: "#3B82F6" }}>{p.email}</a>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`https://${p.website}`} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 hover:underline" style={{ color: "var(--ink-muted)" }}>
                            <Globe size={10} />{p.website}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <ScoreBadge score={p.score} />
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: st.bg, color: st.color }}>
                            {st.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="h-7 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all" style={{ background: "rgba(196,26,59,0.06)", color: "#C41A3B" }}>
                              <Zap size={11} /> Pitch
                            </button>
                            <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all" style={{ background: "rgba(0,0,0,0.03)", color: "var(--ink-muted)" }}>
                              <MoreHorizontal size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <Target size={28} className="mx-auto mb-3" style={{ color: "var(--ink-soft)" }} />
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>No prospects match your filter.</p>
                </div>
              )}
            </div>
          </div>

          {/* ── AI PITCH CTA ────────────────────────────────────── */}
          <div
            className="rounded-2xl p-8 flex items-center justify-between gap-6 flex-wrap"
            style={{ background: "#1A1A1A" }}
          >
            <div>
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: "rgba(196,26,59,0.7)" }}>
                AI Powered
              </div>
              <h3 className="text-xl font-serif italic tracking-tight text-white mb-1">
                Generate pitches in one click.
              </h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                Select any prospect and let AI write a personalized outreach email based on their business, location, and category.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 h-10 px-7 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300"
              style={{ background: "#C41A3B", color: "#fff" }}
            >
              Enable AI Pitching <ArrowRight size={13} />
            </Link>
          </div>

          {/* ── BACK TO DASHBOARD ───────────────────────────────── */}
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--ink-soft)" }}>
              ← Back to Dashboard
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
