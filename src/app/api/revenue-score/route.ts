import { NextRequest, NextResponse } from "next/server"
import { appendFile, mkdir } from "node:fs/promises"
import * as path from "node:path"
import { recordLead } from "@/lib/lead-notifications"

export const runtime = "nodejs"

type Payload = {
  name?: string
  email?: string
  website?: string
  industry?: string
  goal?: string
  problem?: string
  score?: number
  grade?: string
}

function clean(value: unknown, max = 500) {
  return String(value ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max)
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Payload
    const email = clean(body.email, 180)
    const website = clean(body.website, 220)
    if (!email || !website || !email.includes("@") || !website.startsWith("http")) {
      return NextResponse.json({ ok: false, error: "Valid email and website are required." }, { status: 400 })
    }
    const record = {
      createdAt: new Date().toISOString(),
      source: "9ruby.com/revenue-score",
      name: clean(body.name, 120),
      email,
      website,
      industry: clean(body.industry, 120),
      goal: clean(body.goal, 120),
      problem: clean(body.problem, 1000),
      score: body.score ?? null,
      grade: clean(body.grade, 120),
      status: "new",
    }
    const dir = path.join(process.cwd(), "data", "revenue-score")
    await mkdir(dir, { recursive: true })
    await appendFile(path.join(dir, "leads.jsonl"), `${JSON.stringify(record)}\n`, "utf8")
    await recordLead({ ...record, offer: "Free Website Revenue Score" })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("revenue-score error", error)
    return NextResponse.json({ ok: false, error: "Unable to save score." }, { status: 500 })
  }
}
