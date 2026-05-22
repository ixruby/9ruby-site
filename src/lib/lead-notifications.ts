import { appendFile, mkdir } from "node:fs/promises"
import * as path from "node:path"

type LeadRecord = Record<string, unknown> & {
  source: string
  createdAt?: string
  email?: string
  name?: string
  website?: string
}

async function appendJsonl(filePath: string, record: LeadRecord) {
  await mkdir(path.dirname(filePath), { recursive: true })
  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8")
}

async function sendWebhook(record: LeadRecord) {
  const webhook = process.env.LEAD_NOTIFICATION_WEBHOOK || process.env.NEXT_PUBLIC_LEAD_NOTIFICATION_WEBHOOK
  if (!webhook) return

  const message = [
    `New 9Ruby lead: ${record.source}`,
    record.name ? `Name: ${record.name}` : null,
    record.email ? `Email: ${record.email}` : null,
    record.website ? `Website: ${record.website}` : null,
    record.goal ? `Goal: ${record.goal}` : null,
    record.score ? `Score: ${record.score}` : null,
  ].filter(Boolean).join("\n")

  await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: message, lead: record }),
  })
}

export async function recordLead(record: LeadRecord) {
  const normalized = {
    ...record,
    createdAt: record.createdAt || new Date().toISOString(),
  }

  const centralDir = process.env.INCOME_LEADS_DIR || path.join(process.cwd(), "data", "income-leads")
  await appendJsonl(path.join(centralDir, "leads.jsonl"), normalized)

  try {
    await sendWebhook(normalized)
  } catch (error) {
    console.error("lead webhook failed", error)
  }

  return normalized
}
