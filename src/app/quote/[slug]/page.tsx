import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase"
import { formatINR, type Quote, type QuoteItem } from "@/lib/quote"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return { title: `Quote · 9Ruby`, robots: { index: false }, alternates: { canonical: `/quote/${slug}` } }
}

async function loadQuote(slug: string): Promise<Quote | null> {
  try {
    const sb = supabaseAdmin()
    const { data, error } = await sb.from("quotes").select("*").eq("slug", slug).single()
    if (error || !data) return null
    sb.from("quotes").update({ views: (data.views || 0) + 1 }).eq("slug", slug).then(() => {})
    return data as Quote
  } catch { return null }
}

export default async function QuotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const quote = await loadQuote(slug)
  if (!quote) notFound()

  const m = quote.markup_multiplier || 1
  const date = new Date(quote.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
  const waNumber = "971542416803"
  const waMsg = encodeURIComponent(`Hi 9Ruby, I'd like to proceed with quote ${slug}.`)
  const plans = [
    { years: 1, total: quote.totals.y1, perYr: quote.totals.y1 },
    { years: 2, total: quote.totals.y2, perYr: Math.round(quote.totals.y2 / 2) },
    { years: 3, total: quote.totals.y3, perYr: Math.round(quote.totals.y3 / 3), best: true },
  ]

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh", color: "#1A1A1A" }}>
      <div className="max-w-4xl mx-auto px-8 py-12 print:py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 pb-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-serif italic text-lg" style={{ background: "var(--accent)" }}>9</div>
              <div className="font-serif italic text-xl">9Ruby</div>
            </div>
            <div className="text-xs" style={{ color: "#666" }}>Nine Ruby Management FZ-LLC · domains.9ruby.com</div>
          </div>
          <div className="text-right text-xs" style={{ color: "#666" }}>
            <div>Quote #{slug.toUpperCase()}</div>
            <div>{date}</div>
          </div>
        </div>

        {/* Client */}
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "#999" }}>Prepared for</div>
          <div className="text-2xl font-medium">{quote.client_name}</div>
          {quote.client_company && <div className="text-base" style={{ color: "#666" }}>{quote.client_company}</div>}
        </div>

        {/* Items */}
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-wider mb-3" style={{ color: "#999" }}>What&apos;s included</div>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.08)", background: "white" }}>
            {quote.items.map((it, i) => <ItemRow key={i} item={it} markup={m} first={i === 0} />)}
          </div>
        </div>

        {/* Plans */}
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-wider mb-3" style={{ color: "#999" }}>Choose your term</div>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map(p => (
              <div key={p.years} className={`p-6 rounded-2xl border ${p.best ? "md:scale-105" : ""}`}
                   style={{ background: p.best ? "#1A1A1A" : "white", borderColor: p.best ? "#1A1A1A" : "rgba(0,0,0,0.08)", color: p.best ? "white" : "inherit" }}>
                {p.best && <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>Best value · Recommended</div>}
                <div className="text-3xl font-semibold mb-1">{p.years} {p.years === 1 ? "year" : "years"}</div>
                <div className="text-sm mb-4" style={{ color: p.best ? "#aaa" : "#666" }}>{formatINR(p.perYr)}/year</div>
                <div className="text-4xl font-semibold mb-1">{formatINR(p.total)}</div>
                <div className="text-xs" style={{ color: p.best ? "#aaa" : "#666" }}>All-inclusive · taxes extra</div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {quote.notes && (
          <div className="mb-10 p-6 rounded-xl" style={{ background: "rgba(139,107,61,0.04)" }}>
            <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>Notes</div>
            <div className="text-sm whitespace-pre-wrap" style={{ color: "#333" }}>{quote.notes}</div>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-wrap gap-3 mb-10 print:hidden">
          <a href={`https://wa.me/${waNumber}?text=${waMsg}`} target="_blank" className="px-6 py-3 rounded-lg font-medium text-white" style={{ background: "#25D366" }}>Confirm via WhatsApp</a>
          <a href={`mailto:hello@9ruby.com?subject=Quote ${slug}`} className="px-6 py-3 rounded-lg font-medium border" style={{ borderColor: "rgba(0,0,0,0.1)" }}>Reply by email</a>
          <button onClick={() => typeof window !== "undefined" && window.print()} className="px-6 py-3 rounded-lg font-medium border" style={{ borderColor: "rgba(0,0,0,0.1)" }} suppressHydrationWarning>Save as PDF</button>
        </div>

        <div className="text-xs leading-relaxed pt-6 print:pt-3" style={{ color: "#999", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          Prices valid for 14 days from quote date. Includes domain registration, renewal at quoted rate, WHOIS privacy, DNS management, and 9Ruby support. Government taxes (GST/VAT) applied at checkout. Registration completed within 24 hours of payment.
        </div>
      </div>
    </div>
  )
}

function ItemRow({ item, markup, first }: { item: QuoteItem; markup: number; first: boolean }) {
  const qty = item.qty || 1
  const y1 = Math.round((item.y1 || 0) * markup) * qty
  return (
    <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: first ? "none" : "1px solid rgba(0,0,0,0.06)" }}>
      <div>
        <div className="text-[10px] uppercase tracking-wider" style={{ color: "#999" }}>{item.type}</div>
        <div className="font-medium">{item.name}{qty > 1 && <span className="ml-2 text-xs" style={{ color: "#666" }}>× {qty}</span>}</div>
        {item.description && <div className="text-xs mt-0.5" style={{ color: "#666" }}>{item.description}</div>}
      </div>
      <div className="text-right">
        <div className="font-medium">{formatINR(y1)}</div>
        <div className="text-[10px]" style={{ color: "#999" }}>year 1</div>
      </div>
    </div>
  )
}
