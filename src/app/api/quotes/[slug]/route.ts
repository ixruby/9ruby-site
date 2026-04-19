import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export const runtime = "nodejs"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sb = supabaseAdmin()
  const { data, error } = await sb.from("quotes").select("*").eq("slug", slug).single()
  if (error || !data) return NextResponse.json({ error: "not found" }, { status: 404 })
  sb.from("quotes").update({ views: (data.views || 0) + 1 }).eq("slug", slug).then(() => {})
  return NextResponse.json({ quote: data })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const body = await req.json().catch(() => ({})) as { status?: string }
  const sb = supabaseAdmin()
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (body.status && ["draft","sent","accepted","expired"].includes(body.status)) updates.status = body.status
  const { data, error } = await sb.from("quotes").update(updates).eq("slug", slug).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ quote: data })
}
