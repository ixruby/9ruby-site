"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const inputStyle = {
  width: "100%",
  minHeight: 48,
  padding: "0 16px",
  background: "rgba(255,255,255,0.04)",
  border: BORDER,
  color: "#fff",
  fontFamily: NV,
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box" as const,
}

const initial = {
  name: "",
  email: "",
  website: "",
  businessType: "",
  goal: "",
  problem: "",
  budget: "$49 audit first",
  whatsapp: "",
}

export default function AuditIntakeForm() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setMessage("")

    try {
      const res = await fetch("/api/audit-intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Could not submit audit intake")
      setStatus("success")
      setMessage("Audit intake saved. Next: pay $49 if you have not paid yet, then we will prepare the audit brief.")
      setForm(initial)
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Could not submit audit intake")
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-5" style={{ fontFamily: NV }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name" value={form.name} onChange={(name) => setForm({ ...form, name })} required placeholder="Your name" />
        <Field label="Email" type="email" value={form.email} onChange={(email) => setForm({ ...form, email })} required placeholder="you@company.com" />
      </div>

      <Field label="Website URL" type="url" value={form.website} onChange={(website) => setForm({ ...form, website })} required placeholder="https://yourwebsite.com" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Business type" value={form.businessType} onChange={(businessType) => setForm({ ...form, businessType })} placeholder="Roofing, real estate, SaaS..." />
        <Field label="WhatsApp optional" value={form.whatsapp} onChange={(whatsapp) => setForm({ ...form, whatsapp })} placeholder="+971..." />
      </div>

      <div>
        <label style={labelStyle}>Current goal</label>
        <select
          required
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
          style={{ ...inputStyle, color: form.goal ? "#fff" : "rgba(255,255,255,0.38)", appearance: "none", cursor: "pointer" }}
        >
          <option value="">Select the main outcome</option>
          <option value="More website leads">More website leads</option>
          <option value="Better SEO traffic">Better SEO traffic</option>
          <option value="AI chatbot / agent">AI chatbot / agent</option>
          <option value="Fix low conversion">Fix low conversion</option>
          <option value="Launch new offer">Launch new offer</option>
          <option value="Automation system">Automation system</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>What is not working right now?</label>
        <textarea
          required
          rows={5}
          value={form.problem}
          onChange={(e) => setForm({ ...form, problem: e.target.value })}
          placeholder="Example: we get traffic but no leads, no follow-up system, unclear pricing, slow website, weak SEO..."
          style={{ ...inputStyle, padding: "14px 16px", resize: "vertical", lineHeight: 1.55 }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "14px 24px", border: "none", cursor: "pointer" }}
        >
          {status === "submitting" ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
          Send audit intake
        </button>
        <a
          href="https://paypal.me/PayVishnuMadhav?locale.x=en_US&country.x=AE"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 hover:bg-white/[0.05] transition-colors"
          style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", border: BORDER, color: "#fff", padding: "13px 20px", textDecoration: "none" }}
        >
          Pay $49 <ArrowRight size={12} />
        </a>
      </div>

      {message && (
        <p role="status" style={{ margin: 0, fontFamily: NV, fontSize: 13, lineHeight: 1.6, color: status === "error" ? "#ff9b9b" : "rgba(255,255,255,0.72)" }}>
          {message}
        </p>
      )}

      <p style={{ margin: 0, fontFamily: NV, fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.38)" }}>
        We only use this to prepare your audit and reply about the project. No spam, no resale, no long contract.
      </p>
    </form>
  )
}

function Field({ label, value, onChange, placeholder, required = false, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean; type?: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
    </div>
  )
}

const labelStyle = {
  fontFamily: NV,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.44)",
  display: "block",
  marginBottom: 8,
}
