"use client"

import { useMemo, useState, type ChangeEvent } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  Check,
  Copy,
  Download,
  FileText,
  Globe,
  Hash,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Sparkles,
  Type,
  Upload,
} from "lucide-react"
import type { PublicTool } from "@/lib/tools"
import ToolServiceCta from "@/components/tools/ToolServiceCta"

const panelClass = "bg-white border border-black/[0.04] rounded-2xl p-5 md:p-6"
const inputClass = "w-full h-11 px-4 bg-white border border-black/[0.08] rounded-xl placeholder:text-[#B8B8B0] focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 focus:outline-none text-sm transition-all"
const textareaClass = "w-full px-4 py-3 bg-white border border-black/[0.08] rounded-xl placeholder:text-[#B8B8B0] focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 focus:outline-none text-sm resize-none transition-all"
const primaryButtonClass = "h-11 px-5 bg-[#1A1A1A] text-[#F8F7F4] text-sm font-medium rounded-full hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2"
const secondaryButtonClass = "h-11 px-5 bg-white border border-black/[0.08] rounded-xl text-sm hover:border-black/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2"

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function downloadText(text: string, filename: string, type = "text/plain") {
  downloadBlob(new Blob([text], { type }), filename)
}

async function copyText(text: string, onCopied: () => void) {
  await navigator.clipboard.writeText(text)
  onCopied()
  window.setTimeout(onCopied, 1500)
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(2)} MB`
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) throw new Error("Enter a URL first.")
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  return new URL(withProtocol).toString()
}

function slugWords(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean)
}

function uniqueItems(items: string[]): string[] {
  return Array.from(new Set(items.filter(Boolean)))
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Could not read the image."))
    image.src = src
  })
}

function blobFromCanvas(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) reject(new Error("Could not generate the file."))
      else resolve(blob)
    }, type, quality)
  })
}

function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null)
  const [sourceUrl, setSourceUrl] = useState("")
  const [outputUrl, setOutputUrl] = useState("")
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [quality, setQuality] = useState(0.78)
  const [format, setFormat] = useState("image/webp")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const reduction = file && outputBlob ? Math.round((1 - outputBlob.size / file.size) * 100) : null

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0]
    setError("")
    setOutputBlob(null)
    setOutputUrl("")

    if (!nextFile) return
    if (!nextFile.type.startsWith("image/")) {
      setError("Upload a PNG, JPG, WebP, AVIF, or SVG image.")
      return
    }

    setFile(nextFile)
    setSourceUrl(URL.createObjectURL(nextFile))
  }

  async function compress() {
    if (!file || !sourceUrl) {
      setError("Upload an image before compressing.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const image = await loadImage(sourceUrl)
      const maxSide = 2400
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height))
      const canvas = document.createElement("canvas")
      canvas.width = Math.max(1, Math.round(image.width * scale))
      canvas.height = Math.max(1, Math.round(image.height * scale))
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Canvas is unavailable.")

      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      const blob = await blobFromCanvas(canvas, format, quality)
      setOutputBlob(blob)
      setOutputUrl(URL.createObjectURL(blob))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not compress this image.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-5">
        <div className={`${panelClass} space-y-5`}>
          <label className="block">
            <span className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Image</span>
            <div className="border border-dashed border-black/[0.14] rounded-2xl p-6 text-center bg-black/[0.015]">
              <Upload size={24} className="mx-auto mb-3" style={{ color: "var(--accent)" }} />
              <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm" style={{ color: "var(--ink-muted)" }} />
            </div>
          </label>

          <div>
            <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Output format</label>
            <select value={format} onChange={(event) => setFormat(event.target.value)} className={inputClass} style={{ color: "var(--ink-strong)" }}>
              <option value="image/webp">WebP</option>
              <option value="image/jpeg">JPEG</option>
              <option value="image/png">PNG</option>
            </select>
          </div>

          <div>
            <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>
              Quality: <span className="font-mono">{Math.round(quality * 100)}%</span>
            </label>
            <input type="range" min="0.35" max="0.95" step="0.01" value={quality} onChange={(event) => setQuality(Number(event.target.value))} className="w-full accent-[var(--accent)]" />
          </div>

          {error && (
            <div className="flex gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.04] p-3 text-sm text-red-500">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={compress} disabled={loading || !file} className={primaryButtonClass}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              Compress
            </button>
            <button onClick={() => outputBlob && downloadBlob(outputBlob, `9ruby-compressed.${format.split("/")[1]}`)} disabled={!outputBlob} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
              <Download size={16} /> Download
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <PreviewImage title="Original" src={sourceUrl} empty="Upload image" size={file?.size} />
          <PreviewImage title="Compressed" src={outputUrl} empty="Compress to preview" size={outputBlob?.size} detail={reduction !== null ? `${reduction}% smaller` : undefined} />
        </div>
      </div>
    </div>
  )
}

function PreviewImage({ title, src, empty, size, detail }: { title: string; src: string; empty: string; size?: number; detail?: string }) {
  return (
    <div className={panelClass}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: "var(--ink-strong)" }}>{title}</h3>
        {size !== undefined && <span className="text-xs font-mono" style={{ color: "var(--ink-soft)" }}>{formatBytes(size)}</span>}
      </div>
      <div className="aspect-square rounded-xl border border-black/[0.04] bg-black/[0.02] overflow-hidden flex items-center justify-center">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={`${title} preview`} className="w-full h-full object-contain" />
        ) : (
          <div className="text-sm flex flex-col items-center gap-2" style={{ color: "var(--ink-soft)" }}>
            <ImageIcon size={22} />
            {empty}
          </div>
        )}
      </div>
      {detail && <p className="text-xs mt-3 text-emerald-600 font-mono">{detail}</p>}
    </div>
  )
}

const fontPairs = [
  {
    id: "modern-saas",
    name: "Modern SaaS",
    heading: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    use: "Dashboards, AI tools, software products",
    css: "font-family: Inter, system-ui, sans-serif;",
  },
  {
    id: "editorial-premium",
    name: "Editorial Premium",
    heading: "Playfair Display",
    body: "Source Sans 3",
    mono: "IBM Plex Mono",
    use: "Studios, luxury brands, portfolio sites",
    css: "font-family: 'Playfair Display', Georgia, serif;\n--body-font: 'Source Sans 3', Arial, sans-serif;",
  },
  {
    id: "corporate-clean",
    name: "Corporate Clean",
    heading: "Aptos Display",
    body: "Aptos",
    mono: "Cascadia Mono",
    use: "Agencies, consulting, B2B services",
    css: "font-family: Aptos, Segoe UI, Arial, sans-serif;",
  },
  {
    id: "developer-docs",
    name: "Developer Docs",
    heading: "IBM Plex Sans",
    body: "IBM Plex Sans",
    mono: "IBM Plex Mono",
    use: "Docs, APIs, developer tools",
    css: "font-family: 'IBM Plex Sans', system-ui, sans-serif;\n--mono-font: 'IBM Plex Mono', monospace;",
  },
  {
    id: "bold-commerce",
    name: "Bold Commerce",
    heading: "Archivo Black",
    body: "Archivo",
    mono: "Roboto Mono",
    use: "Product launches, ecommerce, offers",
    css: "font-family: Archivo, Arial, sans-serif;\n--heading-font: 'Archivo Black', Arial Black, sans-serif;",
  },
]

function FontPairingTool() {
  const [selectedId, setSelectedId] = useState(fontPairs[0].id)
  const [copied, setCopied] = useState(false)
  const selected = fontPairs.find((pair) => pair.id === selectedId) ?? fontPairs[0]
  const css = `:root {\n  --font-heading: ${selected.heading}, system-ui, sans-serif;\n  --font-body: ${selected.body}, system-ui, sans-serif;\n  --font-mono: ${selected.mono}, monospace;\n}\n\n.heading {\n  font-family: var(--font-heading);\n  letter-spacing: 0;\n}\n\n.body {\n  font-family: var(--font-body);\n}`

  return (
    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-5">
      <div className={`${panelClass} space-y-3`}>
        {fontPairs.map((pair) => (
          <button
            key={pair.id}
            onClick={() => setSelectedId(pair.id)}
            className={`w-full text-left rounded-xl border p-4 transition-colors ${selectedId === pair.id ? "border-[var(--accent)] bg-[var(--accent)]/5" : "border-black/[0.06] hover:border-black/[0.14]"}`}
          >
            <div className="text-sm font-semibold" style={{ color: "var(--ink-strong)" }}>{pair.name}</div>
            <div className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>{pair.heading} + {pair.body}</div>
            <div className="text-xs mt-2" style={{ color: "var(--ink-soft)" }}>{pair.use}</div>
          </button>
        ))}
      </div>

      <div className="space-y-5">
        <div className={panelClass}>
          <div className="text-xs font-semibold uppercase tracking-[0.12em] mb-4" style={{ color: "var(--accent)" }}>{selected.name}</div>
          <h2 className="text-4xl md:text-5xl tracking-normal leading-none mb-5" style={{ color: "var(--ink-strong)", fontFamily: `${selected.heading}, system-ui, sans-serif` }}>
            Build a cleaner brand system.
          </h2>
          <p className="text-lg leading-8 mb-5" style={{ color: "var(--ink-muted)", fontFamily: `${selected.body}, system-ui, sans-serif` }}>
            This pairing keeps the headline confident and the body text easy to scan across landing pages, tools, dashboards, and client-facing pages.
          </p>
          <code className="block rounded-xl bg-black p-4 text-sm text-white overflow-auto" style={{ fontFamily: `${selected.mono}, monospace` }}>
            {selected.css}
          </code>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => copyText(css, () => setCopied((value) => !value))}
            className={primaryButtonClass}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy CSS"}
          </button>
          <Link href="/templates" className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
            Browse templates
          </Link>
        </div>
      </div>
    </div>
  )
}

interface SpeedResult {
  url: string
  elapsed: number
  size: number
  title: string
  description: string
  scripts: number
  stylesheets: number
  images: number
  links: number
  score: number
  risks: string[]
}

function WebsiteSpeedTool() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<SpeedResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const reportText = useMemo(() => {
    if (!result) return ""
    return [
      `9Ruby Website Speed Snapshot`,
      `URL: ${result.url}`,
      `Proxy response time: ${Math.round(result.elapsed)} ms`,
      `HTML size: ${formatBytes(result.size)}`,
      `Snapshot score: ${result.score}/100`,
      `Title: ${result.title || "Missing"}`,
      `Meta description: ${result.description || "Missing"}`,
      `Scripts: ${result.scripts}`,
      `Stylesheets: ${result.stylesheets}`,
      `Images: ${result.images}`,
      `Links: ${result.links}`,
      ``,
      `Notes:`,
      ...result.risks.map((risk) => `- ${risk}`),
    ].join("\n")
  }, [result])

  async function runTest() {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const fullUrl = normalizeUrl(url)
      const started = performance.now()
      const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(fullUrl)}`)
      if (!response.ok) throw new Error(`Could not fetch this URL (${response.status}).`)
      const html = await response.text()
      const elapsed = performance.now() - started
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")
      const size = new Blob([html]).size
      const scripts = doc.querySelectorAll("script").length
      const stylesheets = doc.querySelectorAll('link[rel="stylesheet"], style').length
      const images = doc.querySelectorAll("img").length
      const links = doc.querySelectorAll("a[href]").length
      const title = doc.querySelector("title")?.textContent?.trim() || ""
      const description = doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() || ""
      const risks: string[] = []

      if (elapsed > 2500) risks.push("The proxied HTML request was slow. Check hosting, cache, and server response time.")
      if (size > 250_000) risks.push("The HTML payload is heavy. Audit inline scripts, styles, and page markup.")
      if (scripts > 20) risks.push("Many script tags were detected. Review third-party scripts and bundle splitting.")
      if (stylesheets > 8) risks.push("Many stylesheets or style blocks were detected. Consolidate critical styles.")
      if (images > 25) risks.push("Many image tags were detected. Confirm lazy loading and responsive sizes.")
      if (!title) risks.push("Missing page title.")
      if (!description) risks.push("Missing meta description.")
      if (risks.length === 0) risks.push("No obvious HTML-level risk was found in this snapshot.")

      const score = Math.max(0, Math.min(100, Math.round(100 - elapsed / 55 - size / 14000 - scripts * 1.4 - stylesheets * 1.1 - images * 0.45)))
      setResult({ url: fullUrl, elapsed, size, title, description, scripts, stylesheets, images, links, score, risks })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not test this URL.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className={`${panelClass} space-y-4`}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-soft)" }} />
            <input value={url} onChange={(event) => setUrl(event.target.value)} onKeyDown={(event) => event.key === "Enter" && runTest()} placeholder="https://example.com" className={`${inputClass} pl-12`} style={{ color: "var(--ink-strong)" }} />
          </div>
          <button onClick={runTest} disabled={loading} className={primaryButtonClass}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
            Run snapshot
          </button>
        </div>
        <p className="text-xs leading-5" style={{ color: "var(--ink-soft)" }}>
          This is a browser proxy snapshot of HTML response time and page structure. It is not a Lighthouse or Core Web Vitals report.
        </p>
        {error && <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-3 text-sm text-red-500">{error}</div>}
      </div>

      {result && (
        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-5">
          <div className={panelClass}>
            <div className="text-center">
              <div className="text-5xl font-mono font-bold" style={{ color: result.score >= 75 ? "#10b981" : result.score >= 50 ? "#eab308" : "#ef4444" }}>{result.score}</div>
              <div className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>Snapshot score</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Metric label="Response" value={`${Math.round(result.elapsed)} ms`} />
              <Metric label="HTML size" value={formatBytes(result.size)} />
              <Metric label="Scripts" value={String(result.scripts)} />
              <Metric label="Images" value={String(result.images)} />
            </div>
          </div>

          <div className={`${panelClass} space-y-4`}>
            <h3 className="text-sm font-semibold" style={{ color: "var(--ink-strong)" }}>Snapshot notes</h3>
            <div className="space-y-2">
              {result.risks.map((risk) => (
                <div key={risk} className="flex gap-2 text-sm leading-6" style={{ color: "var(--ink-muted)" }}>
                  <AlertTriangle size={15} className="shrink-0 mt-1 text-yellow-500" />
                  {risk}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => copyText(reportText, () => setCopied((value) => !value))} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy report"}
              </button>
              <button onClick={() => downloadText(reportText, "9ruby-speed-snapshot.txt")} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
                <Download size={16} /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/[0.05] p-3 text-center">
      <div className="text-base font-mono font-semibold" style={{ color: "var(--ink-strong)" }}>{value}</div>
      <div className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>{label}</div>
    </div>
  )
}

const platformHashtags: Record<string, string[]> = {
  instagram: ["reels", "creator", "smallbusiness", "brand", "content"],
  tiktok: ["fyp", "learnontiktok", "tiktoktips", "creator", "trend"],
  x: ["buildinpublic", "marketing", "startup", "business", "strategy"],
  linkedin: ["leadership", "b2b", "growth", "founders", "business"],
}

function HashtagGeneratorTool() {
  const [topic, setTopic] = useState("")
  const [audience, setAudience] = useState("")
  const [platform, setPlatform] = useState("instagram")
  const [tags, setTags] = useState<string[]>([])
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  function generate() {
    const topicParts = slugWords(topic)
    const audienceParts = slugWords(audience)
    if (topicParts.length === 0) {
      setError("Enter a topic first.")
      setTags([])
      return
    }

    const phrase = topicParts.join("")
    const audiencePhrase = audienceParts.join("")
    const generated = uniqueItems([
      phrase,
      `${phrase}tips`,
      `${phrase}ideas`,
      `${phrase}strategy`,
      `${phrase}tools`,
      `${phrase}marketing`,
      `${phrase}growth`,
      ...topicParts,
      ...topicParts.map((word) => `${word}tips`),
      ...(audiencePhrase ? [audiencePhrase, `${audiencePhrase}tips`, `${audiencePhrase}business`] : []),
      ...platformHashtags[platform],
    ]).slice(0, 24)

    setError("")
    setTags(generated.map((tag) => `#${tag}`))
  }

  const output = tags.join(" ")

  return (
    <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-5">
      <div className={`${panelClass} space-y-4`}>
        <div>
          <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Topic</label>
          <input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="AI website templates" className={inputClass} style={{ color: "var(--ink-strong)" }} />
        </div>
        <div>
          <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Audience</label>
          <input value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="small business owners" className={inputClass} style={{ color: "var(--ink-strong)" }} />
        </div>
        <div>
          <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Platform</label>
          <select value={platform} onChange={(event) => setPlatform(event.target.value)} className={inputClass} style={{ color: "var(--ink-strong)" }}>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="x">X / Twitter</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </div>
        {error && <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-3 text-sm text-red-500">{error}</div>}
        <button onClick={generate} className={primaryButtonClass}>
          <Hash size={16} /> Generate hashtags
        </button>
      </div>

      <div className={`${panelClass} space-y-4`}>
        <h3 className="text-sm font-semibold" style={{ color: "var(--ink-strong)" }}>Generated set</h3>
        {tags.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-black/[0.06] px-3 py-1.5 text-sm" style={{ color: "var(--ink-muted)" }}>{tag}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => copyText(output, () => setCopied((value) => !value))} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={() => downloadText(output, "9ruby-hashtags.txt")} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
                <Download size={16} /> Download
              </button>
            </div>
          </>
        ) : (
          <div className="h-48 rounded-xl border border-black/[0.04] bg-black/[0.02] flex items-center justify-center text-sm" style={{ color: "var(--ink-soft)" }}>
            Hashtags appear here
          </div>
        )}
      </div>
    </div>
  )
}

const dataOptions = ["Names", "Email addresses", "Phone numbers", "Payment data", "Analytics data", "Cookies", "Support messages", "Account data"]

function PrivacyPolicyGeneratorTool() {
  const [business, setBusiness] = useState("")
  const [website, setWebsite] = useState("")
  const [contact, setContact] = useState("")
  const [region, setRegion] = useState("Global")
  const [dataTypes, setDataTypes] = useState<string[]>(["Email addresses", "Analytics data", "Cookies"])
  const [policy, setPolicy] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  function toggleDataType(value: string) {
    setDataTypes((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  }

  function generate() {
    if (!business.trim() || !website.trim() || !contact.trim()) {
      setError("Business name, website, and contact email are required.")
      setPolicy("")
      return
    }

    const dataList = dataTypes.length ? dataTypes.join(", ") : "only the information users choose to provide"
    const text = `Privacy Policy for ${business}

Effective date: ${new Date().toLocaleDateString()}

${business} operates ${website}. This policy explains what information we collect, how we use it, and how people can contact us.

Information we collect
We may collect ${dataList}. We collect this information when visitors use our website, contact us, purchase from us, subscribe to updates, or interact with our services.

How we use information
We use information to provide services, respond to requests, improve our website, process business operations, measure performance, prevent abuse, and comply with legal obligations.

Cookies and analytics
We may use cookies, analytics tools, and similar technologies to understand website performance and improve user experience. Visitors can control cookies through their browser settings.

Sharing information
We do not sell personal information. We may share information with trusted service providers who help us operate the website, process payments, deliver services, or comply with law.

Data retention
We keep information only as long as needed for the purposes described in this policy, unless a longer retention period is required by law or legitimate business needs.

Your rights
Depending on your location (${region}), you may have rights to access, correct, delete, export, or restrict use of your personal information.

Contact
For privacy requests, contact ${business} at ${contact}.

Important note
This generated policy is a starter template and not legal advice. Have a qualified legal professional review it before publishing.`

    setError("")
    setPolicy(text)
  }

  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
      <div className={`${panelClass} space-y-4`}>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.07] p-3 text-sm leading-6 text-yellow-700">
          Not legal advice. Use this as a draft and get legal review before publishing.
        </div>
        <div>
          <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Business name</label>
          <input value={business} onChange={(event) => setBusiness(event.target.value)} placeholder="Nine Ruby Management FZ-LLC" className={inputClass} style={{ color: "var(--ink-strong)" }} />
        </div>
        <div>
          <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Website</label>
          <input value={website} onChange={(event) => setWebsite(event.target.value)} placeholder="https://www.9ruby.com" className={inputClass} style={{ color: "var(--ink-strong)" }} />
        </div>
        <div>
          <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Contact email</label>
          <input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="privacy@example.com" className={inputClass} style={{ color: "var(--ink-strong)" }} />
        </div>
        <div>
          <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Primary region</label>
          <select value={region} onChange={(event) => setRegion(event.target.value)} className={inputClass} style={{ color: "var(--ink-strong)" }}>
            <option>Global</option>
            <option>United States</option>
            <option>European Union</option>
            <option>United Kingdom</option>
            <option>United Arab Emirates</option>
            <option>India</option>
          </select>
        </div>
        <div>
          <div className="text-xs mb-2" style={{ color: "var(--ink-muted)" }}>Data collected</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {dataOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 rounded-xl border border-black/[0.06] p-3 text-sm" style={{ color: "var(--ink-muted)" }}>
                <input type="checkbox" checked={dataTypes.includes(option)} onChange={() => toggleDataType(option)} className="accent-[var(--accent)]" />
                {option}
              </label>
            ))}
          </div>
        </div>
        {error && <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-3 text-sm text-red-500">{error}</div>}
        <button onClick={generate} className={primaryButtonClass}>
          <FileText size={16} /> Generate policy
        </button>
      </div>

      <div className={`${panelClass} space-y-4`}>
        <h3 className="text-sm font-semibold" style={{ color: "var(--ink-strong)" }}>Policy draft</h3>
        <textarea value={policy} readOnly placeholder="Generated policy appears here..." className={`${textareaClass} min-h-[520px] font-mono`} style={{ color: "var(--ink-strong)" }} />
        <div className="flex flex-wrap gap-3">
          <button onClick={() => copyText(policy, () => setCopied((value) => !value))} disabled={!policy} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={() => downloadText(policy, "privacy-policy.txt")} disabled={!policy} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
            <Download size={16} /> Download
          </button>
        </div>
      </div>
    </div>
  )
}

function CopywriterTool() {
  const [product, setProduct] = useState("")
  const [audience, setAudience] = useState("")
  const [offer, setOffer] = useState("")
  const [tone, setTone] = useState("direct")
  const [format, setFormat] = useState("landing")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  function generate() {
    if (!product.trim() || !audience.trim()) {
      setError("Product and audience are required.")
      setOutput("")
      return
    }

    const cleanOffer = offer.trim() || "a faster path to the result they want"
    const toneLabel = tone.charAt(0).toUpperCase() + tone.slice(1)
    const linesByFormat: Record<string, string[]> = {
      landing: [
        `${product} for ${audience}`,
        `Turn ${audience} into customers with ${cleanOffer}.`,
        `Built for teams that need clear execution, measurable outcomes, and a partner who can fix the hard parts.`,
        `CTA: Start with ${product}`,
      ],
      ad: [
        `Hook: Still trying to make ${product} work manually?`,
        `Body: 9Ruby helps ${audience} get ${cleanOffer} without adding another messy workflow.`,
        `CTA: Fix this with 9Ruby`,
      ],
      email: [
        `Subject: A cleaner way to ship ${product}`,
        `Hi there,`,
        `If ${audience} need ${cleanOffer}, 9Ruby can help turn the idea into a working system.`,
        `We can audit what exists, remove the confusion, and ship the front-facing experience.`,
        `CTA: Reply with the page or workflow you want fixed.`,
      ],
      product: [
        `${product} is built for ${audience} who need ${cleanOffer}.`,
        `It keeps the workflow focused, practical, and ready to use without overcomplicating the stack.`,
      ],
      social: [
        `${audience}: your ${product} should not feel scattered.`,
        `Use a clear offer, a working tool, and a simple next step.`,
        `9Ruby can help turn it into a production page.`,
      ],
    }

    setError("")
    setOutput([`Tone: ${toneLabel}`, ``, ...(linesByFormat[format] ?? linesByFormat.landing)].join("\n"))
  }

  return (
    <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-5">
      <div className={`${panelClass} space-y-4`}>
        <div>
          <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Product or service</label>
          <input value={product} onChange={(event) => setProduct(event.target.value)} placeholder="AI website audit" className={inputClass} style={{ color: "var(--ink-strong)" }} />
        </div>
        <div>
          <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Audience</label>
          <input value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="founders and small teams" className={inputClass} style={{ color: "var(--ink-strong)" }} />
        </div>
        <div>
          <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Offer or outcome</label>
          <input value={offer} onChange={(event) => setOffer(event.target.value)} placeholder="a cleaned-up website funnel" className={inputClass} style={{ color: "var(--ink-strong)" }} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Format</label>
            <select value={format} onChange={(event) => setFormat(event.target.value)} className={inputClass} style={{ color: "var(--ink-strong)" }}>
              <option value="landing">Landing section</option>
              <option value="ad">Ad copy</option>
              <option value="email">Email</option>
              <option value="product">Product blurb</option>
              <option value="social">Social post</option>
            </select>
          </div>
          <div>
            <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Tone</label>
            <select value={tone} onChange={(event) => setTone(event.target.value)} className={inputClass} style={{ color: "var(--ink-strong)" }}>
              <option value="direct">Direct</option>
              <option value="premium">Premium</option>
              <option value="technical">Technical</option>
              <option value="friendly">Friendly</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
        {error && <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-3 text-sm text-red-500">{error}</div>}
        <button onClick={generate} className={primaryButtonClass}>
          <Sparkles size={16} /> Generate copy
        </button>
      </div>

      <div className={`${panelClass} space-y-4`}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold" style={{ color: "var(--ink-strong)" }}>Generated copy</h3>
          <Link href="https://ai.9ruby.com" className="text-xs font-semibold text-[var(--accent)]">
            Try 9Ruby AI
          </Link>
        </div>
        <textarea value={output} readOnly placeholder="Copy appears here..." className={`${textareaClass} min-h-[360px]`} style={{ color: "var(--ink-strong)" }} />
        <div className="flex flex-wrap gap-3">
          <button onClick={() => copyText(output, () => setCopied((value) => !value))} disabled={!output} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={() => downloadText(output, "9ruby-copy.txt")} disabled={!output} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
            <Download size={16} /> Download
          </button>
        </div>
      </div>
    </div>
  )
}

function svgForIcon(src: string, bgColor: string, shape: string): string {
  const escapedSrc = src.replace(/&/g, "&amp;")
  const clip =
    shape === "circle"
      ? `<clipPath id="clip"><circle cx="256" cy="256" r="214" /></clipPath>`
      : `<clipPath id="clip"><rect x="64" y="64" width="384" height="384" rx="${shape === "rounded" ? 88 : 0}" /></clipPath>`
  const background = bgColor === "transparent" ? "" : `<rect width="512" height="512" fill="${bgColor}" />`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  ${background}
  <defs>${clip}</defs>
  <image href="${escapedSrc}" x="64" y="64" width="384" height="384" preserveAspectRatio="xMidYMid slice" clip-path="url(#clip)" />
</svg>`
}

async function renderIconPng(src: string, size: number, bgColor: string, shape: string): Promise<Blob> {
  const image = await loadImage(src)
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas is unavailable.")

  if (bgColor !== "transparent") {
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, size, size)
  }

  const padding = Math.round(size * 0.125)
  const drawSize = size - padding * 2
  ctx.save()
  if (shape === "circle") {
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, drawSize / 2, 0, Math.PI * 2)
    ctx.clip()
  } else if (shape === "rounded") {
    const radius = Math.round(size * 0.17)
    ctx.beginPath()
    ctx.roundRect(padding, padding, drawSize, drawSize, radius)
    ctx.clip()
  }

  const scale = Math.max(drawSize / image.width, drawSize / image.height)
  const width = image.width * scale
  const height = image.height * scale
  ctx.drawImage(image, padding + (drawSize - width) / 2, padding + (drawSize - height) / 2, width, height)
  ctx.restore()

  return blobFromCanvas(canvas, "image/png")
}

async function pngToIcoBlob(pngBlob: Blob): Promise<Blob> {
  const bytes = new Uint8Array(await pngBlob.arrayBuffer())
  const header = new ArrayBuffer(22)
  const view = new DataView(header)
  view.setUint16(0, 0, true)
  view.setUint16(2, 1, true)
  view.setUint16(4, 1, true)
  view.setUint8(6, 32)
  view.setUint8(7, 32)
  view.setUint8(8, 0)
  view.setUint8(9, 0)
  view.setUint16(10, 1, true)
  view.setUint16(12, 32, true)
  view.setUint32(14, bytes.length, true)
  view.setUint32(18, 22, true)
  return new Blob([header, bytes], { type: "image/x-icon" })
}

function FaviconGeneratorTool() {
  const [imageSrc, setImageSrc] = useState("")
  const [bgColor, setBgColor] = useState("#000000")
  const [shape, setShape] = useState("rounded")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const htmlSnippet = `<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta name="theme-color" content="${bgColor === "transparent" ? "#000000" : bgColor}" />`

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    setError("")
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Upload an image file.")
      return
    }
    const reader = new FileReader()
    reader.onload = () => setImageSrc(String(reader.result || ""))
    reader.onerror = () => setError("Could not read this image.")
    reader.readAsDataURL(file)
  }

  function requireImage() {
    if (!imageSrc) {
      setError("Upload an image first.")
      return false
    }
    setError("")
    return true
  }

  async function downloadPng(size: number, filename: string) {
    if (!requireImage()) return
    try {
      const blob = await renderIconPng(imageSrc, size, bgColor, shape)
      downloadBlob(blob, filename)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not export PNG.")
    }
  }

  async function downloadIco() {
    if (!requireImage()) return
    try {
      const png = await renderIconPng(imageSrc, 32, bgColor, shape)
      const ico = await pngToIcoBlob(png)
      downloadBlob(ico, "favicon.ico")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not export ICO.")
    }
  }

  function downloadSvg() {
    if (!requireImage()) return
    downloadText(svgForIcon(imageSrc, bgColor, shape), "favicon.svg", "image/svg+xml")
  }

  return (
    <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-5">
      <div className={`${panelClass} space-y-5`}>
        <label className="block">
          <span className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Source image</span>
          <div className="border border-dashed border-black/[0.14] rounded-2xl p-6 text-center bg-black/[0.015]">
            <Upload size={24} className="mx-auto mb-3" style={{ color: "var(--accent)" }} />
            <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm" style={{ color: "var(--ink-muted)" }} />
          </div>
        </label>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Background</label>
            <input value={bgColor} onChange={(event) => setBgColor(event.target.value)} className={inputClass} style={{ color: "var(--ink-strong)" }} />
          </div>
          <div>
            <label className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>Shape</label>
            <select value={shape} onChange={(event) => setShape(event.target.value)} className={inputClass} style={{ color: "var(--ink-strong)" }}>
              <option value="rounded">Rounded</option>
              <option value="circle">Circle</option>
              <option value="square">Square</option>
            </select>
          </div>
        </div>

        {error && <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-3 text-sm text-red-500">{error}</div>}

        <div className="grid sm:grid-cols-2 gap-3">
          <button onClick={downloadSvg} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}><Download size={16} /> SVG</button>
          <button onClick={downloadIco} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}><Download size={16} /> ICO</button>
          <button onClick={() => downloadPng(32, "favicon-32x32.png")} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}><Download size={16} /> PNG 32</button>
          <button onClick={() => downloadPng(180, "apple-touch-icon.png")} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}><Download size={16} /> Apple 180</button>
          <button onClick={() => downloadPng(192, "icon-192.png")} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}><Download size={16} /> PNG 192</button>
          <button onClick={() => downloadPng(512, "icon-512.png")} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}><Download size={16} /> PNG 512</button>
        </div>
      </div>

      <div className={`${panelClass} space-y-5`}>
        <div className="aspect-square rounded-2xl border border-black/[0.04] bg-black/[0.02] flex items-center justify-center overflow-hidden">
          {imageSrc ? (
            <div className={`w-40 h-40 overflow-hidden ${shape === "circle" ? "rounded-full" : shape === "rounded" ? "rounded-[28px]" : ""}`} style={{ background: bgColor === "transparent" ? "transparent" : bgColor }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc} alt="Favicon preview" className="w-full h-full object-cover p-5" />
            </div>
          ) : (
            <div className="text-sm flex flex-col items-center gap-2" style={{ color: "var(--ink-soft)" }}>
              <ImageIcon size={24} />
              Upload image
            </div>
          )}
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: "var(--accent)" }}>HTML snippet</div>
          <pre className="rounded-xl bg-black p-4 text-xs text-white overflow-auto whitespace-pre-wrap">{htmlSnippet}</pre>
        </div>
        <button onClick={() => copyText(htmlSnippet, () => setCopied((value) => !value))} className={primaryButtonClass}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy snippet"}
        </button>
      </div>
    </div>
  )
}

export default function DynamicToolRunner({ tool }: { tool: PublicTool }) {
  let content

  switch (tool.slug) {
    case "image-compressor":
      content = <ImageCompressorTool />
      break
    case "font-pairing":
      content = <FontPairingTool />
      break
    case "website-speed-test":
      content = <WebsiteSpeedTool />
      break
    case "hashtag-generator":
      content = <HashtagGeneratorTool />
      break
    case "privacy-policy-generator":
      content = <PrivacyPolicyGeneratorTool />
      break
    case "ai-copywriter":
      content = <CopywriterTool />
      break
    case "favicon-generator":
      content = <FaviconGeneratorTool />
      break
    default:
      content = (
        <div className={panelClass}>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--ink-muted)" }}>
            <Type size={16} /> This tool uses its own route.
          </div>
        </div>
      )
  }

  return (
    <>
      {content}
      <ToolServiceCta slug={tool.slug} />
    </>
  )
}
