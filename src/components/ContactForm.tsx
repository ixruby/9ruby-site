"use client"

import React, { useState } from "react"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const inputStyle: React.CSSProperties = {
  width: "100%", height: 48, padding: "0 16px",
  background: "rgba(255,255,255,0.04)",
  border: BORDER, borderRadius: 0,
  color: "#fff", fontFamily: NV, fontSize: 14,
  outline: "none", boxSizing: "border-box",
}

const textareaStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.04)",
  border: BORDER, borderRadius: 0, color: "#fff", fontFamily: NV, fontSize: 14,
  outline: "none", resize: "vertical", boxSizing: "border-box",
}

const labelStyle: React.CSSProperties = {
  fontFamily: NV,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
  display: "block",
  marginBottom: 8,
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "audit", budget: "audit", website: "", message: "" })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setMessage("")

    const problem = [form.message, form.company ? `Company: ${form.company}` : "", form.budget ? `Budget: ${form.budget}` : ""].filter(Boolean).join("\n")

    try {
      const res = await fetch("/api/audit-intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          website: form.website,
          businessType: form.company,
          goal: form.service,
          problem,
          budget: form.budget,
          whatsapp: "",
          source: "9ruby.com/contact",
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Could not send message")
      setStatus("success")
      setMessage("Message saved. We will use this to prepare the audit/project reply.")
      setForm({ name: "", email: "", company: "", service: "audit", budget: "audit", website: "", message: "" })
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Could not send message")
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Name</label>
          <input required type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input required type="email" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Website URL</label>
        <input required type="url" placeholder="https://yourwebsite.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Company</label>
        <input type="text" placeholder="Your company (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Service</label>
        <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} style={{ ...inputStyle, color: "rgba(255,255,255,0.75)", appearance: "none", cursor: "pointer" }}>
          <option value="landing-page-preview">Free Landing Page Preview</option>
          <option value="audit">$49 AI + Website Conversion Audit</option>
          <option value="chatbots">AI Chatbots & Agents</option>
          <option value="website">Website Design & Development</option>
          <option value="seo">SEO & Growth</option>
          <option value="email">Email Marketing</option>
          <option value="software">Custom Software</option>
          <option value="voice">Voice AI Agents</option>
          <option value="other">Other / Custom</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Budget Range</label>
        <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} style={{ ...inputStyle, color: "rgba(255,255,255,0.75)", appearance: "none", cursor: "pointer" }}>
          <option value="audit">$49 audit first</option>
          <option value="1k">Under $1,000</option>
          <option value="5k">$1,000 – $5,000</option>
          <option value="10k">$5,000 – $10,000</option>
          <option value="25k">$10,000 – $25,000</option>
          <option value="50k+">$50,000+</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Message</label>
        <textarea required rows={5} placeholder="Tell us about your project, goals, and timeline..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={textareaStyle} />
      </div>

      <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "12px 28px", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          {status === "submitting" ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
          Send Message <ArrowRight size={12} />
        </button>
        {message && <p role="status" style={{ margin: 0, fontFamily: NV, fontSize: 13, color: status === "error" ? "#ff9b9b" : "rgba(255,255,255,0.68)" }}>{message}</p>}
      </div>
    </form>
  )
}
