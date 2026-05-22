"use client"

import { useMemo, useState } from "react"

const KNOWN_DOMAINS: Record<string, string> = {
  shopify: "shopify.com",
  facebook: "facebook.com",
  instagram: "instagram.com",
  tiktok: "tiktok.com",
  amazon: "amazon.com",
  ebay: "ebay.com",
  google: "google.com",
  pinterest: "pinterest.com",
  etsy: "etsy.com",
  walmart: "walmart.com",
  faire: "faire.com",
  wish: "wish.com",
  taobao: "taobao.com",
  dsers: "dsers.com",
  spocket: "spocket.co",
  cjdropshipping: "cjdropshipping.com",
  printful: "printful.com",
  printify: "printify.com",
  modalyst: "modalyst.co",
  syncee: "syncee.co",
  zendrop: "zendrop.com",
  autods: "autods.com",
  salehoo: "salehoo.com",
  doba: "doba.com",
  gelato: "gelato.com",
  reconvert: "reconvert.io",
  loox: "loox.io",
  yotpo: "yotpo.com",
  shipstation: "shipstation.com",
  aftership: "aftership.com",
  route: "route.com",
  shipbob: "shipbob.com",
  shippo: "goshippo.com",
  easyship: "easyship.com",
  packlink: "packlink.com",
  shiphero: "shiphero.com",
  easypost: "easypost.com",
  shipway: "shipway.com",
  parcelpanel: "parcelpanel.com",
  trackingmore: "trackingmore.com",
  pagefly: "pagefly.io",
  shogun: "getshogun.com",
  gempages: "gempages.net",
  zipify: "zipify.com",
  tapcart: "tapcart.com",
  ecomposer: "ecomposer.io",
  layouthub: "layouthub.com",
  debutify: "debutify.com",
  mixpanel: "mixpanel.com",
  amplitude: "amplitude.com",
  posthog: "posthog.com",
  plausible: "plausible.io",
  umami: "umami.is",
  fathom: "usefathom.com",
  datadog: "datadoghq.com",
  grafana: "grafana.com",
  segment: "segment.com",
  heap: "heap.io",
  fullstory: "fullstory.com",
  logrocket: "logrocket.com",
  tableau: "tableau.com",
  metabase: "metabase.com",
  github: "github.com",
  gitlab: "gitlab.com",
  vscode: "code.visualstudio.com",
  docker: "docker.com",
  vercel: "vercel.com",
  netlify: "netlify.com",
  railway: "railway.app",
  supabase: "supabase.com",
  firebase: "firebase.google.com",
  planetscale: "planetscale.com",
  neon: "neon.tech",
  prisma: "prisma.io",
  trpc: "trpc.io",
  hono: "hono.dev",
  bun: "bun.sh",
  auth0: "auth0.com",
  clerk: "clerk.com",
  cloudflare: "cloudflare.com",
  snyk: "snyk.io",
  sonarqube: "sonarsource.com",
  hashicorp: "hashicorp.com",
  trivy: "aquasec.com",
  stripe: "stripe.com",
  paypal: "paypal.com",
  square: "squareup.com",
  quickbooks: "quickbooks.intuit.com",
  xero: "xero.com",
  freshbooks: "freshbooks.com",
  chargebee: "chargebee.com",
  paddle: "paddle.com",
  mercury: "mercury.com",
  wise: "wise.com",
  baremetrics: "baremetrics.com",
  notion: "notion.so",
  linear: "linear.app",
  slack: "slack.com",
  asana: "asana.com",
  trello: "trello.com",
  clickup: "clickup.com",
  todoist: "todoist.com",
  obsidian: "obsidian.md",
  airtable: "airtable.com",
  calendly: "calendly.com",
  loom: "loom.com",
  miro: "miro.com",
  figma: "figma.com",
  excalidraw: "excalidraw.com",
  zapier: "zapier.com",
  n8n: "n8n.io",
  make: "make.com",
  pipedream: "pipedream.com",
  temporal: "temporal.io",
  inngest: "inngest.com",
  circleci: "circleci.com",
  bullmq: "bullmq.io",
  prefect: "prefect.io",
  windmill: "windmill.dev",
  activepieces: "activepieces.com",
  aws: "aws.amazon.com",
  azure: "azure.microsoft.com",
  digitalocean: "digitalocean.com",
  hetzner: "hetzner.com",
  redis: "redis.io",
  postgresql: "postgresql.org",
  mongodb: "mongodb.com",
  elasticsearch: "elastic.co",
  rabbitmq: "rabbitmq.com",
  minio: "min.io",
  upstash: "upstash.com",
  openai: "openai.com",
  claude: "anthropic.com",
  gemini: "gemini.google.com",
  perplexity: "perplexity.ai",
  ollama: "ollama.com",
  huggingface: "huggingface.co",
  midjourney: "midjourney.com",
  stability: "stability.ai",
  elevenlabs: "elevenlabs.io",
  runway: "runwayml.com",
  pika: "pika.art",
  suno: "suno.com",
  cursor: "cursor.com",
  lovable: "lovable.dev",
  tabnine: "tabnine.com",
  codeium: "codeium.com",
  jasper: "jasper.ai",
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function initials(value: string) {
  return value
    .split(/[\s.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function guessDomain(name: string) {
  const compact = normalizeKey(name)
  const knownKey = Object.keys(KNOWN_DOMAINS).find((key) => compact.includes(key))
  if (knownKey) return KNOWN_DOMAINS[knownKey]

  const slug = name
    .toLowerCase()
    .replace(/\b(ai|app|apps|business|shop|channel|product|products|reviews|chat|cloud|workers|actions|studio|new|dev|com)\b/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim()

  return slug ? `${slug}.com` : null
}

export default function BrandIcon({
  name,
  domain,
  size = "md",
}: {
  name: string
  domain?: string | null
  size?: "sm" | "md" | "lg"
}) {
  const [failed, setFailed] = useState(false)
  const resolvedDomain = useMemo(() => domain ?? guessDomain(name), [domain, name])
  const imageUrl = resolvedDomain ? `https://www.google.com/s2/favicons?domain=${resolvedDomain}&sz=128` : null
  const sizeClass = size === "lg" ? "h-8 w-8" : size === "sm" ? "h-5 w-5" : "h-7 w-7"

  if (imageUrl && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`${sizeClass} object-contain`}
        onError={() => setFailed(true)}
      />
    )
  }

  return <span className="text-[11px] font-bold text-white/55">{initials(name)}</span>
}
