"use client"

import { useMemo, useState } from "react"
import { Plus, Trash2, Send, Copy, Check } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { computeTotals, formatINR, type QuoteItem } from "@/lib/quote"

const DEFAULT_ITEM: QuoteItem = { type: "domain", name: "", y1: 0, y2: undefined, y3: undefined, qty: 1 }

const PRESETS: Record<string, Omit<QuoteItem, "name">> = {
  "Domain (.com)":      { type: "domain",  y1: 1299, y2: 2598, y3: 3897 },
  "Domain (.in)":       { type: "domain",  y1: 899,  y2: 1798, y3: 2697 },
  "Hosting — Starter":  { type: "hosting", y1: 2628, y2: 4200, y3: 5900 },
  "Hosting — Business": { type: "hosting", y1: 5400, y2: 9600, y3: 13200 },
  "Email (5 mailboxes)":{ type: "email",   y1: 2340, y2: 4200, y3: 5900 },
  "SSL Certificate":    { type: "ssl",     y1: 1200, y2: 2200, y3: 3000 },
  "Setup & Migration":  { type: "setup",   y1: 2500 },
  "Server maintenance (yr)": { type: "server", y1: 6000, y2: 11000, y3: 15000 },
}

export default function QuoteBuilder() {
  const [clientName, setClientName] = useState("")
  const [clientCompany, setClientCompany] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [markup, setMarkup] = useState(1.5)
  const [items, setItems] = useState<QuoteItem[]>([{ ...DEFAULT_ITEM, name: "yourbrand.com", y1: 1299, y2: 2598, y3: 3897 }])
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<{ url: string; slug: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const totals = useMemo(() => computeTotals(items, markup), [items, markup])
  const retailTotals = useMemo(() => computeTotals(items, 1), [items])
  const savings3y = totals.y3 - Math.round((totals.y1 * 3))

  function updateItem(i: number, patch: Partial<QuoteItem>) {
    setItems(items.map((it, idx) => idx === i ? { ...it, ...patch } : it))
  }
  function addItem() { setItems([...items, { ...DEFAULT_ITEM, name: "" }]) }
  function removeItem(i: number) { setItems(items.filter((_, idx) => idx !== i)) }

  function applyPreset(i: number, name: string) {
    const p = PRESETS[name]
    if (!p) return
    updateItem(i, { ...p, name: items[i].name || name, qty: items[i].qty || 1 })
  }

  async function save(status: "draft" | "sent" = "draft") {
    if (!clientName.trim() || items.length === 0) {
      alert("Client name + at least one item required"); return
    }
    setSaving(true)
    try {
      const r = await fetch("/api/quotes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          client_name: clientName, client_company: clientCompany,
          client_email: clientEmail, client_phone: clientPhone,
          notes, items, markup_multiplier: markup,
        }),
      })
      const j = await r.json()
      if (!r.ok) { alert(j.error || "Save failed"); return }
      const url = typeof window !== "undefined" ? window.location.origin + j.url : j.url
      setResult({ url, slug: j.quote.slug })
      if (status === "sent" && clientPhone) {
        const msg = `Hi ${clientName}, your 9Ruby quote: ${url}`
        window.open(`https://wa.me/${clientPhone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`, "_blank")
      }
    } finally { setSaving(false) }
  }

  async function copyLink() {
    if (!result) return
    await navigator.clipboard.writeText(result.url)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="font-serif italic text-4xl md:text-5xl mb-2" style={{ color: "var(--ink)" }}>Quote builder</h1>
        <p className="mb-8" style={{ color: "var(--ink-muted)" }}>Internal tool. Build client quotes with 1/2/3-year pricing, send via WhatsApp.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-2 space-y-6">
            <section className="p-6 rounded-2xl border" style={{ background: "var(--surface-elevated)", borderColor: "rgba(0,0,0,0.08)" }}>
              <h2 className="text-sm uppercase tracking-wider mb-4" style={{ color: "var(--ink-soft)" }}>Client</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client name *" className="px-4 py-3 rounded-lg border bg-transparent" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
                <input value={clientCompany} onChange={e => setClientCompany(e.target.value)} placeholder="Company" className="px-4 py-3 rounded-lg border bg-transparent" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
                <input value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="Email" type="email" className="px-4 py-3 rounded-lg border bg-transparent" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
                <input value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="WhatsApp (e.g. 971542416803)" className="px-4 py-3 rounded-lg border bg-transparent" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
              </div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes for the client (shown on the quote page)" rows={3} className="mt-3 w-full px-4 py-3 rounded-lg border bg-transparent" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
            </section>

            <section className="p-6 rounded-2xl border" style={{ background: "var(--surface-elevated)", borderColor: "rgba(0,0,0,0.08)" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>Line items</h2>
                <label className="text-xs flex items-center gap-2" style={{ color: "var(--ink-muted)" }}>
                  Markup
                  <input type="number" step="0.05" min="1" value={markup} onChange={e => setMarkup(Number(e.target.value) || 1)} className="w-16 px-2 py-1 rounded border text-right bg-transparent" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
                  ×
                </label>
              </div>

              <div className="space-y-3">
                {items.map((it, i) => (
                  <div key={i} className="p-4 rounded-lg border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <select value={it.type} onChange={e => updateItem(i, { type: e.target.value as QuoteItem["type"] })} className="px-3 py-2 rounded border bg-transparent text-sm" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}>
                        <option value="domain">Domain</option><option value="hosting">Hosting</option><option value="email">Email</option><option value="ssl">SSL</option><option value="setup">Setup</option><option value="server">Server</option><option value="addon">Add-on</option>
                      </select>
                      <input value={it.name} onChange={e => updateItem(i, { name: e.target.value })} placeholder="Name / description" className="flex-1 min-w-[180px] px-3 py-2 rounded border bg-transparent text-sm" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
                      <select onChange={e => { if (e.target.value) { applyPreset(i, e.target.value); e.target.value = "" } }} className="px-3 py-2 rounded border bg-transparent text-sm" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink-muted)" }}>
                        <option value="">Preset…</option>
                        {Object.keys(PRESETS).map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <button onClick={() => removeItem(i)} className="px-2 py-2 rounded hover:bg-black/5"><Trash2 size={14} style={{ color: "var(--ink-soft)" }}/></button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <label className="text-xs" style={{ color: "var(--ink-soft)" }}>Y1 price
                        <input type="number" value={it.y1} onChange={e => updateItem(i, { y1: Number(e.target.value) || 0 })} className="w-full mt-1 px-2 py-1.5 rounded border bg-transparent text-sm" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
                      </label>
                      <label className="text-xs" style={{ color: "var(--ink-soft)" }}>Y2 total
                        <input type="number" value={it.y2 ?? ""} onChange={e => updateItem(i, { y2: e.target.value ? Number(e.target.value) : undefined })} placeholder={String(it.y1 * 2)} className="w-full mt-1 px-2 py-1.5 rounded border bg-transparent text-sm" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
                      </label>
                      <label className="text-xs" style={{ color: "var(--ink-soft)" }}>Y3 total
                        <input type="number" value={it.y3 ?? ""} onChange={e => updateItem(i, { y3: e.target.value ? Number(e.target.value) : undefined })} placeholder={String(it.y1 * 3)} className="w-full mt-1 px-2 py-1.5 rounded border bg-transparent text-sm" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
                      </label>
                      <label className="text-xs" style={{ color: "var(--ink-soft)" }}>Qty
                        <input type="number" min="1" value={it.qty || 1} onChange={e => updateItem(i, { qty: Number(e.target.value) || 1 })} className="w-full mt-1 px-2 py-1.5 rounded border bg-transparent text-sm" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={addItem} className="mt-3 inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-black/5" style={{ color: "#8B6B3D" }}>
                <Plus size={14}/> Add line item
              </button>
            </section>
          </div>

          {/* Right: totals + actions */}
          <aside className="space-y-4 lg:sticky lg:top-24 h-max">
            <div className="p-6 rounded-2xl border" style={{ background: "var(--surface-elevated)", borderColor: "rgba(0,0,0,0.08)" }}>
              <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: "var(--ink-soft)" }}>Client pays</h3>
              <div className="space-y-3">
                <Row label="1 year" value={formatINR(totals.y1)} />
                <Row label="2 years" value={formatINR(totals.y2)} sub={`${formatINR(Math.round(totals.y2 / 2))}/yr`} />
                <Row label="3 years" value={formatINR(totals.y3)} sub={`${formatINR(Math.round(totals.y3 / 3))}/yr`} highlight />
              </div>
              <div className="mt-4 pt-4 border-t text-xs" style={{ borderColor: "rgba(0,0,0,0.08)", color: "var(--ink-soft)" }}>
                Retail cost: {formatINR(retailTotals.y1)} / {formatINR(retailTotals.y2)} / {formatINR(retailTotals.y3)}
                <br/>Your margin (3y): {formatINR(totals.y3 - retailTotals.y3)}
                {savings3y < 0 && <><br/>Client saves vs 3× Y1: {formatINR(-savings3y)}</>}
              </div>
            </div>

            {!result ? (
              <div className="space-y-2">
                <button onClick={() => save("draft")} disabled={saving} className="w-full px-4 py-3 rounded-lg font-medium border disabled:opacity-50" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}>
                  {saving ? "Saving…" : "Save draft"}
                </button>
                <button onClick={() => save("sent")} disabled={saving} className="w-full px-4 py-3 rounded-lg font-medium text-white disabled:opacity-50 inline-flex items-center justify-center gap-2" style={{ background: "#8B6B3D" }}>
                  <Send size={14}/> {saving ? "…" : "Save + send on WhatsApp"}
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl border" style={{ background: "var(--surface-elevated)", borderColor: "rgba(0,0,0,0.08)" }}>
                <div className="text-sm mb-2" style={{ color: "var(--ink-muted)" }}>Shareable link:</div>
                <div className="flex items-center gap-2">
                  <input readOnly value={result.url} className="flex-1 px-3 py-2 rounded border bg-transparent text-xs" style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink)" }}/>
                  <button onClick={copyLink} className="px-3 py-2 rounded border hover:bg-black/5" style={{ borderColor: "rgba(0,0,0,0.1)" }}>{copied ? <Check size={14}/> : <Copy size={14}/>}</button>
                </div>
                <a href={result.url} target="_blank" className="block mt-3 text-sm text-center px-4 py-2 rounded-lg text-white" style={{ background: "#8B6B3D" }}>Open quote</a>
              </div>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function Row({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`flex items-end justify-between ${highlight ? "p-3 -mx-3 rounded-lg" : ""}`} style={highlight ? { background: "rgba(139,107,61,0.06)" } : {}}>
      <div>
        <div className="text-sm" style={{ color: "var(--ink-muted)" }}>{label}{highlight && <span className="ml-2 text-[10px] uppercase tracking-wider" style={{ color: "#8B6B3D" }}>Best value</span>}</div>
        {sub && <div className="text-xs" style={{ color: "var(--ink-soft)" }}>{sub}</div>}
      </div>
      <div className="text-xl font-semibold" style={{ color: highlight ? "#8B6B3D" : "var(--ink)" }}>{value}</div>
    </div>
  )
}
