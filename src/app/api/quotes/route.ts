import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { supabaseAdmin } from "@/lib/supabase"
import { computeTotals, type QuoteItem } from "@/lib/quote"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as {
    client_name?: string
    client_company?: string
    client_email?: string
    client_phone?: string
    notes?: string
    items?: QuoteItem[]
    markup_multiplier?: number
    expires_at?: string
  } | null
  if (!body?.client_name || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "client_name and items required" }, { status: 400 })
  }
  const markup = Number(body.markup_multiplier) || 1
  const totals = computeTotals(body.items, markup)
  const slug = nanoid(10)
  const sb = supabaseAdmin()
  const { data, error } = await sb.from("quotes").insert({
    slug,
    client_name: body.client_name,
    client_company: body.client_company || null,
    client_email: body.client_email || null,
    client_phone: body.client_phone || null,
    notes: body.notes || null,
    items: body.items,
    markup_multiplier: markup,
    totals,
    status: "draft",
    expires_at: body.expires_at || null,
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ quote: data, url: `/quote/${slug}` })
}

export async function GET() {
  const sb = supabaseAdmin()
  const { data, error } = await sb.from("quotes").select("id, slug, client_name, client_company, totals, status, views, created_at").order("created_at", { ascending: false }).limit(50)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ quotes: data })
}
