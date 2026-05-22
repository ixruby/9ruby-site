import { NextRequest, NextResponse } from "next/server"
import { appendFile, mkdir } from "node:fs/promises"
import * as path from "node:path"
import { recordLead } from "@/lib/lead-notifications"

export const runtime = "nodejs"

type AuditPayload = {
  name?: string
  email?: string
  website?: string
  businessType?: string
  goal?: string
  problem?: string
  budget?: string
  whatsapp?: string
  source?: string
}

function clean(value: unknown, max = 1000) {
  return String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max)
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  let body: AuditPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const record = {
    createdAt: new Date().toISOString(),
    name: clean(body.name, 160),
    email: clean(body.email, 220).toLowerCase(),
    website: clean(body.website, 500),
    businessType: clean(body.businessType, 220),
    goal: clean(body.goal, 220),
    problem: clean(body.problem, 2000),
    budget: clean(body.budget, 120),
    whatsapp: clean(body.whatsapp, 80),
    source: clean((body as AuditPayload & { source?: string }).source, 120) || "9ruby.com/audit",
  }

  const isLandingPagePreview = record.goal === "free-landing-page-preview" || record.source === "9ruby.com/landing-page-preview"

  if (!record.name || !record.email || !record.goal || !record.problem || (!record.website && !isLandingPagePreview)) {
    return NextResponse.json({ error: "Name, email, website, goal, and problem are required" }, { status: 400 })
  }
  if (!isEmail(record.email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 })
  }
  if (!isLandingPagePreview && record.website && !isUrl(record.website)) {
    return NextResponse.json({ error: "Website URL must start with http:// or https://" }, { status: 400 })
  }

  const dir = process.env.AUDIT_INTAKE_DIR || path.join(process.cwd(), "data", "audit-intake")
  await mkdir(dir, { recursive: true })
  await appendFile(path.join(dir, "leads.jsonl"), `${JSON.stringify(record)}\n`, "utf8")
  await recordLead({ ...record, source: record.source || "9ruby.com/audit", offer: isLandingPagePreview ? "Free Landing Page Preview" : "$49 AI + Website Audit" })

  return NextResponse.json({ ok: true })
}
