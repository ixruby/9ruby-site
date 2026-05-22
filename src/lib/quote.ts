export type QuoteItem = {
  type: "domain" | "hosting" | "email" | "ssl" | "setup" | "server" | "addon"
  name: string
  description?: string
  // per-year price (base, pre-markup). For one-off (setup), put amount in y1 only.
  y1: number
  y2?: number
  y3?: number
  qty?: number
}

export type Quote = {
  id: string
  slug: string
  client_name: string
  client_company?: string | null
  client_email?: string | null
  client_phone?: string | null
  notes?: string | null
  items: QuoteItem[]
  markup_multiplier: number
  totals: { y1: number; y2: number; y3: number }
  status: "draft" | "sent" | "accepted" | "expired"
  views: number
  created_at: string
  updated_at: string
  expires_at?: string | null
}

export function computeTotals(items: QuoteItem[], markup: number): { y1: number; y2: number; y3: number } {
  const m = markup || 1
  let y1 = 0, y2 = 0, y3 = 0
  for (const it of items) {
    const qty = it.qty || 1
    y1 += (it.y1 || 0) * qty
    y2 += (it.y2 ?? it.y1 * 2) * qty
    y3 += (it.y3 ?? it.y1 * 3) * qty
  }
  return {
    y1: Math.round(y1 * m),
    y2: Math.round(y2 * m),
    y3: Math.round(y3 * m),
  }
}

export function formatINR(n: number) {
  return "₹" + (n || 0).toLocaleString("en-IN")
}
