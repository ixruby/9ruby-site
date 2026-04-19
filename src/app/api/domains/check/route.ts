import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

const RDAP_BASE: Record<string, string> = {
  com: "https://rdap.verisign.com/com/v1/domain/",
  net: "https://rdap.verisign.com/net/v1/domain/",
  org: "https://rdap.publicinterestregistry.org/rdap/org/domain/",
  in: "https://rdap.registry.in/rdap/domain/",
  io: "https://rdap.identitydigital.services/rdap/domain/",
  co: "https://rdap.nic.co/domain/",
  app: "https://rdap.nominet.uk/app/domain/",
  dev: "https://rdap.nominet.uk/dev/domain/",
  ai: "https://rdap.identitydigital.services/rdap/domain/",
  online: "https://rdap.centralnic.com/online/domain/",
  shop: "https://rdap.centralnic.com/shop/domain/",
  xyz: "https://rdap.centralnic.com/xyz/domain/",
  tech: "https://rdap.centralnic.com/tech/domain/",
  store: "https://rdap.centralnic.com/store/domain/",
  site: "https://rdap.centralnic.com/site/domain/",
}

function isValidDomain(d: string) {
  return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z]{2,})+$/i.test(d)
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("domain")?.trim().toLowerCase() || ""
  if (!raw || !isValidDomain(raw)) {
    return NextResponse.json({ error: "invalid domain" }, { status: 400 })
  }
  const parts = raw.split(".")
  const tld = parts[parts.length - 1]
  const base = RDAP_BASE[tld]
  if (!base) {
    return NextResponse.json({
      domain: raw,
      tld,
      available: null,
      message: "TLD not supported for live check — we'll verify manually.",
    })
  }
  try {
    const r = await fetch(base + raw, { headers: { accept: "application/rdap+json" } })
    if (r.status === 404) return NextResponse.json({ domain: raw, tld, available: true })
    if (r.ok) return NextResponse.json({ domain: raw, tld, available: false })
    return NextResponse.json({ domain: raw, tld, available: null, message: "Check failed, retry." })
  } catch {
    return NextResponse.json({ domain: raw, tld, available: null, message: "Network error." })
  }
}
