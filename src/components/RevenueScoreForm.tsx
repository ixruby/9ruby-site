"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react"

const BORDER = "0.8px solid rgba(255,255,255,0.14)"
const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"

type Result = {
  score: number
  grade: string
  issues: string[]
  quickWins: string[]
  automation: string
}

function calculate(form: { website: string; industry: string; goal: string; problem: string }): Result {
  const text = `${form.website} ${form.industry} ${form.goal} ${form.problem}`.toLowerCase()
  let score = 58
  if (text.includes("no leads") || text.includes("not getting") || text.includes("low conversion")) score -= 12
  if (text.includes("slow") || text.includes("old") || text.includes("outdated")) score -= 8
  if (text.includes("booking") || text.includes("quote") || text.includes("call")) score += 4
  if (text.includes("clinic") || text.includes("real estate") || text.includes("roof") || text.includes("law") || text.includes("dental")) score += 6
  if (form.website.includes("http")) score += 5
  score = Math.max(18, Math.min(89, score))
  const grade = score >= 80 ? "Strong but improvable" : score >= 65 ? "Good base, leaking leads" : score >= 45 ? "Needs conversion fixes" : "High-priority revenue leak"
  return {
    score,
    grade,
    issues: [
      "The first screen probably needs a sharper buyer outcome and one dominant CTA.",
      "Lead capture should be easier: website URL, goal, phone/email, and one clear next step.",
      "Proof, reviews, case context, or guarantees should sit closer to the action button.",
    ],
    quickWins: [
      "Rewrite the hero around the business outcome, not company description.",
      "Add a direct quote/book/audit CTA above the fold and repeat it after proof sections.",
      "Create a follow-up workflow so every inquiry gets a reply, tag, and next action.",
    ],
    automation: form.goal.includes("booking")
      ? "Add an AI-assisted booking/intake agent that qualifies the visitor before a human call."
      : "Add an AI lead intake + follow-up system that scores new inquiries and drafts replies automatically.",
  }
}

export default function RevenueScoreForm() {
  const [form, setForm] = useState({ name: "", email: "", website: "", industry: "", goal: "", problem: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const result = useMemo(() => (submitted ? calculate(form) : null), [submitted, form])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const calculated = calculate(form)
    try {
      await fetch("/api/revenue-score", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, score: calculated.score, grade: calculated.grade }),
      })
    } finally {
      setSubmitted(true)
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={onSubmit} className="p-6 md:p-8" style={{ border: BORDER, background: "rgba(255,255,255,0.04)" }}>
        <div className="mb-6 flex items-center gap-3 text-white">
          <Sparkles size={18} />
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase" }}>Free lead magnet</p>
        </div>
        <div className="grid gap-4">
          <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 bg-black/40 px-4 text-sm text-white outline-none" style={{ border: BORDER }} />
          <input required type="email" placeholder="Email for the score" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 bg-black/40 px-4 text-sm text-white outline-none" style={{ border: BORDER }} />
          <input required type="url" placeholder="Website URL" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="h-12 bg-black/40 px-4 text-sm text-white outline-none" style={{ border: BORDER }} />
          <input placeholder="Industry e.g. clinic, real estate, roofing" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="h-12 bg-black/40 px-4 text-sm text-white outline-none" style={{ border: BORDER }} />
          <select required value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} className="h-12 bg-black/40 px-4 text-sm text-white outline-none" style={{ border: BORDER }}>
            <option value="">Main goal</option>
            <option value="more leads">More leads</option>
            <option value="more bookings">More bookings</option>
            <option value="better SEO">Better SEO</option>
            <option value="AI follow-up">AI follow-up</option>
            <option value="higher conversion">Higher conversion</option>
          </select>
          <textarea required rows={5} placeholder="What is the biggest website/sales problem right now?" value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} className="bg-black/40 p-4 text-sm text-white outline-none" style={{ border: BORDER }} />
          <button type="submit" disabled={loading} className="inline-flex h-12 items-center justify-center gap-2 bg-white px-5 text-xs font-black uppercase text-black disabled:opacity-60">
            {loading ? <Loader2 size={14} className="animate-spin" /> : null} Get Free Score <ArrowRight size={14} />
          </button>
        </div>
      </form>

      <div className="p-6 md:p-8" style={{ border: BORDER, background: "#050505" }}>
        {!result ? (
          <div className="flex h-full min-h-[420px] flex-col justify-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-white/45">What this gives</p>
            <h2 className="text-4xl font-black uppercase leading-none text-white md:text-6xl">Find the lead leaks first.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/62">This free score turns anonymous visitors into qualified leads, then routes serious businesses into the $49 audit and implementation sprint.</p>
          </div>
        ) : (
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Your Website Revenue Score</p>
            <div className="my-6 flex items-end gap-3">
              <span className="text-7xl font-black text-white">{result.score}</span>
              <span className="pb-3 text-xl font-bold text-white/45">/100</span>
            </div>
            <h2 className="text-3xl font-black uppercase text-white">{result.grade}</h2>
            <div className="mt-8 grid gap-6">
              <div>
                <h3 className="mb-3 text-sm font-black uppercase text-white">Likely leaks</h3>
                {result.issues.map((item) => <p key={item} className="mb-2 flex gap-2 text-sm leading-6 text-white/65"><CheckCircle2 size={15} className="mt-1 shrink-0 text-white" />{item}</p>)}
              </div>
              <div>
                <h3 className="mb-3 text-sm font-black uppercase text-white">Quick wins</h3>
                {result.quickWins.map((item) => <p key={item} className="mb-2 flex gap-2 text-sm leading-6 text-white/65"><CheckCircle2 size={15} className="mt-1 shrink-0 text-white" />{item}</p>)}
              </div>
              <div className="p-4" style={{ border: BORDER }}>
                <h3 className="mb-2 text-sm font-black uppercase text-white">AI opportunity</h3>
                <p className="text-sm leading-6 text-white/65">{result.automation}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/audit" className="inline-flex h-12 items-center justify-center gap-2 bg-white px-5 text-xs font-black uppercase text-black">Get $49 Full Audit <ArrowRight size={14} /></Link>
              <Link href="/contact" className="inline-flex h-12 items-center justify-center gap-2 px-5 text-xs font-black uppercase text-white" style={{ border: BORDER }}>Ask 9Ruby</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
