"use client"

import type { CSSProperties } from "react"
import { useState } from "react"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const inputStyle: CSSProperties = {
  width: "100%",
  height: 48,
  padding: "0 16px",
  background: "rgba(255,255,255,0.04)",
  border: BORDER,
  borderRadius: 0,
  color: "#fff",
  fontFamily: NV,
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
}

const textareaStyle: CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.04)",
  border: BORDER,
  borderRadius: 0,
  color: "#fff",
  fontFamily: NV,
  fontSize: 14,
  outline: "none",
  resize: "vertical",
  boxSizing: "border-box",
}

const labelStyle: CSSProperties = {
  fontFamily: NV,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.42)",
  display: "block",
  marginBottom: 8,
}

export default function LandingPagePreviewForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    businessType: "",
    websiteOrSocial: "",
    mainAction: "calls",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setMessage("")

    const problem = [
      `Business name: ${form.businessName}`,
      form.websiteOrSocial ? `Website/social/current link: ${form.websiteOrSocial}` : "Website/social/current link: none yet",
      `Main visitor action: ${form.mainAction}`,
      form.message ? `Notes: ${form.message}` : "",
    ].filter(Boolean).join("\n")

    try {
      const res = await fetch("/api/audit-intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          website: form.websiteOrSocial || "No website yet",
          businessType: form.businessType || form.businessName,
          goal: "free-landing-page-preview",
          problem,
          budget: "free-preview-first",
          whatsapp: "",
          source: "9ruby.com/landing-page-preview",
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Could not request preview")
      setStatus("success")
      setMessage("Preview request saved. We will reply with the best next step or a concept direction.")
      setForm({ name: "", email: "", businessName: "", businessType: "", websiteOrSocial: "", mainAction: "calls", message: "" })
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Could not request preview")
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label style={labelStyle}>Your name</label>
          <input required type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input required type="email" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label style={labelStyle}>Business name</label>
          <input required type="text" placeholder="Example: Austin Med Spa" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Business type</label>
          <input type="text" placeholder="Med spa, restaurant, real estate..." value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Current website or social link optional</label>
        <input type="text" placeholder="Website, Instagram, Google profile, or leave blank" value={form.websiteOrSocial} onChange={(e) => setForm({ ...form, websiteOrSocial: e.target.value })} style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Main action you want from visitors</label>
        <select value={form.mainAction} onChange={(e) => setForm({ ...form, mainAction: e.target.value })} style={{ ...inputStyle, color: "rgba(255,255,255,0.78)", appearance: "none", cursor: "pointer" }}>
          <option value="calls">More calls</option>
          <option value="whatsapp">WhatsApp messages</option>
          <option value="booking">Bookings or appointments</option>
          <option value="forms">Form leads</option>
          <option value="orders">Orders or payments</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Notes optional</label>
        <textarea rows={4} placeholder="Tell us the service, location, offer, or problem the page should focus on." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={textareaStyle} />
      </div>

      <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "13px 24px", border: "none", cursor: "pointer" }}
        >
          {status === "submitting" ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
          Request free preview <ArrowRight size={12} />
        </button>
        {message && <p role="status" style={{ margin: 0, fontFamily: NV, fontSize: 13, lineHeight: 1.5, color: status === "error" ? "#ff9b9b" : "rgba(255,255,255,0.68)" }}>{message}</p>}
      </div>
    </form>
  )
}
