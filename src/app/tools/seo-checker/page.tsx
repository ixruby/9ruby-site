"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft, Search, CheckCircle2, XCircle, AlertTriangle,
  Globe, FileText, Image as ImageIcon, Link2, Loader2,
  Copy, Download, Check,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Breadcrumb from "@/components/Breadcrumb"
import ToolServiceCta from "@/components/tools/ToolServiceCta"

interface SeoResult {
  score: number
  title: { value: string; length: number; status: "good" | "warn" | "bad" }
  description: { value: string; length: number; status: "good" | "warn" | "bad" }
  headings: { h1: number; h2: number; h3: number; h4: number }
  images: { total: number; withAlt: number; withoutAlt: number }
  links: { internal: number; external: number; total: number }
  issues: { type: "good" | "warn" | "bad"; message: string }[]
  ogTags: { property: string; content: string }[]
  keywords: string[]
}

function StatusIcon({ status }: { status: "good" | "warn" | "bad" }) {
  if (status === "good") return <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
  if (status === "warn") return <AlertTriangle size={16} className="text-yellow-500 shrink-0" />
  return <XCircle size={16} className="text-red-500 shrink-0" />
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54
  const circ = 2 * Math.PI * radius
  const offset = circ - (score / 100) * circ
  const color = score >= 80 ? "#10b981" : score >= 50 ? "#eab308" : "#ef4444"

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-mono" style={{ color }}>{score}</span>
        <span className="text-xs font-mono" style={{ color: "var(--ink-soft)" }}>/ 100</span>
      </div>
    </div>
  )
}

function analyzeHtml(html: string, url: string): SeoResult {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const issues: SeoResult["issues"] = []

  // Title
  const titleEl = doc.querySelector("title")
  const titleText = titleEl?.textContent?.trim() || ""
  const titleLen = titleText.length
  let titleStatus: "good" | "warn" | "bad" = "good"
  if (!titleText) { titleStatus = "bad"; issues.push({ type: "bad", message: "Missing page title" }) }
  else if (titleLen < 30) { titleStatus = "warn"; issues.push({ type: "warn", message: `Title is short (${titleLen} chars). Aim for 50-60 characters.` }) }
  else if (titleLen > 60) { titleStatus = "warn"; issues.push({ type: "warn", message: `Title is long (${titleLen} chars). Keep under 60 characters.` }) }
  else { issues.push({ type: "good", message: `Title length is optimal (${titleLen} chars)` }) }

  // Meta description
  const descEl = doc.querySelector('meta[name="description"]')
  const descText = descEl?.getAttribute("content")?.trim() || ""
  const descLen = descText.length
  let descStatus: "good" | "warn" | "bad" = "good"
  if (!descText) { descStatus = "bad"; issues.push({ type: "bad", message: "Missing meta description" }) }
  else if (descLen < 120) { descStatus = "warn"; issues.push({ type: "warn", message: `Meta description is short (${descLen} chars). Aim for 150-160.` }) }
  else if (descLen > 160) { descStatus = "warn"; issues.push({ type: "warn", message: `Meta description is long (${descLen} chars). Keep under 160.` }) }
  else { issues.push({ type: "good", message: `Meta description length is optimal (${descLen} chars)` }) }

  // Headings
  const h1s = doc.querySelectorAll("h1")
  const h2s = doc.querySelectorAll("h2")
  const h3s = doc.querySelectorAll("h3")
  const h4s = doc.querySelectorAll("h4")
  if (h1s.length === 0) issues.push({ type: "bad", message: "No H1 tag found. Every page should have exactly one H1." })
  else if (h1s.length > 1) issues.push({ type: "warn", message: `Multiple H1 tags found (${h1s.length}). Use only one H1 per page.` })
  else issues.push({ type: "good", message: "Single H1 tag found" })
  if (h2s.length === 0) issues.push({ type: "warn", message: "No H2 headings found. Add subheadings for better structure." })
  else issues.push({ type: "good", message: `${h2s.length} H2 heading(s) found` })

  // Images
  const images = doc.querySelectorAll("img")
  let withAlt = 0, withoutAlt = 0
  images.forEach(img => {
    if (img.getAttribute("alt")?.trim()) withAlt++
    else withoutAlt++
  })
  if (withoutAlt > 0) issues.push({ type: "warn", message: `${withoutAlt} image(s) missing alt text` })
  else if (images.length > 0) issues.push({ type: "good", message: "All images have alt text" })

  // Links
  const allLinks = doc.querySelectorAll("a[href]")
  let internal = 0, external = 0
  try {
    const baseHost = new URL(url).hostname
    allLinks.forEach(a => {
      const href = a.getAttribute("href") || ""
      try {
        const linkUrl = new URL(href, url)
        if (linkUrl.hostname === baseHost) internal++
        else external++
      } catch { internal++ }
    })
  } catch {
    allLinks.forEach(() => internal++)
  }

  // OG tags
  const ogTags: SeoResult["ogTags"] = []
  doc.querySelectorAll('meta[property^="og:"]').forEach(el => {
    ogTags.push({ property: el.getAttribute("property") || "", content: el.getAttribute("content") || "" })
  })
  if (ogTags.length === 0) issues.push({ type: "warn", message: "No Open Graph tags found. Add og:title, og:description, og:image." })
  else issues.push({ type: "good", message: `${ogTags.length} Open Graph tag(s) found` })

  // Viewport
  const viewport = doc.querySelector('meta[name="viewport"]')
  if (!viewport) issues.push({ type: "bad", message: "Missing viewport meta tag. Page may not be mobile-friendly." })
  else issues.push({ type: "good", message: "Viewport meta tag present" })

  // Canonical
  const canonical = doc.querySelector('link[rel="canonical"]')
  if (!canonical) issues.push({ type: "warn", message: "No canonical URL set. Add a canonical link to avoid duplicate content." })
  else issues.push({ type: "good", message: "Canonical URL is set" })

  // Keywords from meta
  const keywordsMeta = doc.querySelector('meta[name="keywords"]')
  const keywords = keywordsMeta?.getAttribute("content")?.split(",").map(k => k.trim()).filter(Boolean) || []

  // Score
  const goodCount = issues.filter(i => i.type === "good").length
  const warnCount = issues.filter(i => i.type === "warn").length
  const badCount = issues.filter(i => i.type === "bad").length
  const total = goodCount + warnCount + badCount
  const score = Math.round(((goodCount * 1 + warnCount * 0.4) / total) * 100)

  return {
    score,
    title: { value: titleText, length: titleLen, status: titleStatus },
    description: { value: descText, length: descLen, status: descStatus },
    headings: { h1: h1s.length, h2: h2s.length, h3: h3s.length, h4: h4s.length },
    images: { total: images.length, withAlt, withoutAlt },
    links: { internal, external, total: allLinks.length },
    issues,
    ogTags,
    keywords,
  }
}

function formatSeoReport(result: SeoResult, url: string): string {
  return [
    "9Ruby SEO Checker Report",
    `URL: ${url}`,
    `Score: ${result.score}/100`,
    "",
    "Title",
    `Value: ${result.title.value || "Missing"}`,
    `Length: ${result.title.length}`,
    `Status: ${result.title.status}`,
    "",
    "Meta Description",
    `Value: ${result.description.value || "Missing"}`,
    `Length: ${result.description.length}`,
    `Status: ${result.description.status}`,
    "",
    "Structure",
    `H1: ${result.headings.h1}`,
    `H2: ${result.headings.h2}`,
    `H3: ${result.headings.h3}`,
    `H4: ${result.headings.h4}`,
    `Images: ${result.images.total} (${result.images.withAlt} with alt, ${result.images.withoutAlt} missing alt)`,
    `Links: ${result.links.total} (${result.links.internal} internal, ${result.links.external} external)`,
    "",
    "Recommendations",
    ...result.issues.map((issue) => `- [${issue.type.toUpperCase()}] ${issue.message}`),
  ].join("\n")
}

export default function SeoCheckerPage() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SeoResult | null>(null)
  const [error, setError] = useState("")
  const [analyzedUrl, setAnalyzedUrl] = useState("")
  const [copied, setCopied] = useState(false)

  async function handleAnalyze() {
    if (!url.trim()) return
    let fullUrl = url.trim()
    if (!/^https?:\/\//i.test(fullUrl)) fullUrl = "https://" + fullUrl

    setLoading(true)
    setError("")
    setResult(null)
    setAnalyzedUrl("")

    try {
      // Use a CORS proxy for fetching external URLs
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(fullUrl)}`
      const res = await fetch(proxyUrl)
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`)
      const html = await res.text()
      const analysis = analyzeHtml(html, fullUrl)
      setResult(analysis)
      setAnalyzedUrl(fullUrl)
    } catch {
      setError("Could not fetch the URL. The site may block external requests, or the URL may be invalid. Try a different URL.")
    } finally {
      setLoading(false)
    }
  }

  const reportText = result ? formatSeoReport(result, analyzedUrl) : ""

  const copyReport = async () => {
    if (!reportText) return
    await navigator.clipboard.writeText(reportText)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const downloadReport = () => {
    if (!reportText) return
    const blob = new Blob([reportText], { type: "text/plain" })
    const downloadUrl = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = downloadUrl
    a.download = "9ruby-seo-report.txt"
    a.click()
    URL.revokeObjectURL(downloadUrl)
  }

  return (
    <main className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "SEO Checker" }]} />
      <div className="relative max-w-4xl mx-auto px-6 pt-8 pb-24">
        {/* Back link */}
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm hover:text-[#1A1A1A] transition-colors mb-12" style={{ color: "var(--ink-muted)" }}>
          <ArrowLeft size={14} /> Back to Tools
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "var(--accent)" }}>
            Free Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic tracking-tighter leading-[1.1] mb-4 mt-3" style={{ color: "var(--ink-strong)" }}>
            SEO Checker
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            Analyze any URL for SEO performance. Get actionable recommendations for titles, meta descriptions, headings, images, and more.
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-3 mb-10">
          <div className="flex-1 relative">
            <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-soft)" }} />
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAnalyze()}
              placeholder="Enter a URL to analyze..."
              className="w-full h-12 pl-12 pr-4 bg-white border border-black/[0.08] rounded-xl placeholder:text-[#B8B8B0] focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 focus:outline-none transition-all font-mono text-sm"
              style={{ color: "var(--ink-strong)" }}
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading || !url.trim()}
            className="h-12 px-6 bg-[#1A1A1A] text-[#F8F7F4] text-sm font-medium rounded-full hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {error && (
          <div className="p-4 border border-red-500/20 bg-red-500/[0.04] rounded-xl text-red-500 text-sm mb-8">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4 animate-slide-up">
            {/* Score */}
            <div className="p-8 bg-white border border-black/[0.04] rounded-2xl">
              <h2 className="text-sm font-semibold tracking-tight mb-6 text-center" style={{ color: "var(--ink-muted)" }}>SEO Score</h2>
              <ScoreRing score={result.score} />
              <p className="text-center text-sm mt-4" style={{ color: "var(--ink-muted)" }}>
                {result.score >= 80 ? "Great! Your page is well-optimized." : result.score >= 50 ? "Decent, but there is room for improvement." : "Needs work. Check the recommendations below."}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button onClick={copyReport} className="h-10 px-4 bg-white border border-black/[0.08] rounded-xl text-sm hover:border-black/[0.12] transition-all flex items-center gap-2" style={{ color: "var(--ink-muted)" }}>
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy report"}
                </button>
                <button onClick={downloadReport} className="h-10 px-4 bg-white border border-black/[0.08] rounded-xl text-sm hover:border-black/[0.12] transition-all flex items-center gap-2" style={{ color: "var(--ink-muted)" }}>
                  <Download size={14} /> Download
                </button>
              </div>
            </div>

            {/* Title & Description */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-black/[0.04] rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <StatusIcon status={result.title.status} />
                  <h3 className="text-sm font-semibold tracking-tight" style={{ color: "var(--ink-strong)" }}>Page Title</h3>
                  <span className="text-xs font-mono ml-auto" style={{ color: "var(--ink-soft)" }}>{result.title.length} chars</span>
                </div>
                <p className="text-sm font-mono break-all leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {result.title.value || <span className="text-red-500 italic">Missing</span>}
                </p>
              </div>
              <div className="p-5 bg-white border border-black/[0.04] rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <StatusIcon status={result.description.status} />
                  <h3 className="text-sm font-semibold tracking-tight" style={{ color: "var(--ink-strong)" }}>Meta Description</h3>
                  <span className="text-xs font-mono ml-auto" style={{ color: "var(--ink-soft)" }}>{result.description.length} chars</span>
                </div>
                <p className="text-sm font-mono break-all line-clamp-3 leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {result.description.value || <span className="text-red-500 italic">Missing</span>}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-white border border-black/[0.04] rounded-2xl text-center">
                <FileText size={18} className="text-[var(--accent)] mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono" style={{ color: "var(--ink-strong)" }}>{result.headings.h1}</div>
                <div className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>H1 Tags</div>
              </div>
              <div className="p-5 bg-white border border-black/[0.04] rounded-2xl text-center">
                <FileText size={18} className="text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono" style={{ color: "var(--ink-strong)" }}>{result.headings.h2 + result.headings.h3 + result.headings.h4}</div>
                <div className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>Subheadings</div>
              </div>
              <div className="p-5 bg-white border border-black/[0.04] rounded-2xl text-center">
                <ImageIcon size={18} className="text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono" style={{ color: "var(--ink-strong)" }}>{result.images.total}</div>
                <div className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>Images</div>
              </div>
              <div className="p-5 bg-white border border-black/[0.04] rounded-2xl text-center">
                <Link2 size={18} className="text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono" style={{ color: "var(--ink-strong)" }}>{result.links.total}</div>
                <div className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>Links</div>
              </div>
            </div>

            {/* OG Tags */}
            {result.ogTags.length > 0 && (
              <div className="p-5 bg-white border border-black/[0.04] rounded-2xl">
                <h3 className="text-sm font-semibold tracking-tight mb-4" style={{ color: "var(--ink-strong)" }}>Open Graph Tags</h3>
                <div className="space-y-2">
                  {result.ogTags.map((og, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-[var(--accent)] font-mono whitespace-nowrap text-xs">{og.property}</span>
                      <span className="truncate text-xs" style={{ color: "var(--ink-muted)" }}>{og.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Issues / Recommendations */}
            <div className="p-5 bg-white border border-black/[0.04] rounded-2xl">
              <h3 className="text-sm font-semibold tracking-tight mb-4" style={{ color: "var(--ink-strong)" }}>Recommendations</h3>
              <div className="space-y-3">
                {result.issues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <StatusIcon status={issue.type} />
                    <span className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>{issue.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <ToolServiceCta slug="seo-checker" />
      </div>
    </main>
  )
}
