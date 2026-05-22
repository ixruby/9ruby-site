"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Check, Minimize2, Maximize2, AlertTriangle, CheckCircle2, Trash2, Download } from "lucide-react"
import Navbar from "@/components/Navbar"
import Breadcrumb from "@/components/Breadcrumb"
import ToolServiceCta from "@/components/tools/ToolServiceCta"

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = "text-[#f8c555]" // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-[var(--accent)]" // key
            match = match.replace(/:$/, "") + ":"
          } else {
            cls = "text-[#6ee7b7]" // string
          }
        } else if (/true|false/.test(match)) {
          cls = "text-[#93c5fd]" // boolean
        } else if (/null/.test(match)) {
          cls = "text-[#f87171]" // null
        }
        return `<span class="${cls}">${match}</span>`
      }
    )
}

function getLineCount(text: string): number {
  return text.split("\n").length
}

function getStats(text: string): { keys: number; values: number; depth: number; size: string } {
  try {
    const parsed = JSON.parse(text)
    let keys = 0, values = 0, maxDepth = 0

    function walk(obj: unknown, depth: number) {
      if (depth > maxDepth) maxDepth = depth
      if (Array.isArray(obj)) {
        values += obj.length
        obj.forEach(item => walk(item, depth + 1))
      } else if (obj && typeof obj === "object") {
        const entries = Object.entries(obj as Record<string, unknown>)
        keys += entries.length
        entries.forEach(([, v]) => {
          if (typeof v === "object" && v !== null) walk(v, depth + 1)
          else values++
        })
      }
    }
    walk(parsed, 0)
    const bytes = new Blob([text]).size
    const size = bytes > 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${bytes} B`
    return { keys, values, depth: maxDepth, size }
  } catch {
    return { keys: 0, values: 0, depth: 0, size: "0 B" }
  }
}

export default function JsonFormatterPage() {
  const [input, setInput] = useState("")
  const [formatted, setFormatted] = useState("")
  const [error, setError] = useState("")
  const [indentSize, setIndentSize] = useState(2)
  const [copied, setCopied] = useState(false)

  const format = useCallback((raw?: string) => {
    const text = raw ?? input
    if (!text.trim()) {
      setFormatted("")
      setError("")
      return
    }
    try {
      const parsed = JSON.parse(text)
      setFormatted(JSON.stringify(parsed, null, indentSize))
      setError("")
    } catch (e) {
      setError((e as Error).message)
      setFormatted("")
    }
  }, [input, indentSize])

  const minify = () => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setFormatted(minified)
      setError("")
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const copyOutput = () => {
    const text = formatted || input
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const downloadJson = () => {
    const text = formatted || input
    const blob = new Blob([text], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    if (!value.trim()) {
      setFormatted("")
      setError("")
      return
    }
    try {
      const parsed = JSON.parse(value)
      setFormatted(JSON.stringify(parsed, null, indentSize))
      setError("")
    } catch (e) {
      setError((e as Error).message)
      setFormatted("")
    }
  }

  const loadSample = () => {
    const sample = JSON.stringify({
      name: "9Ruby AI",
      version: "2.0.0",
      description: "AI-powered agency platform",
      features: ["Autonomous agents", "Multi-channel marketing", "Real-time analytics"],
      config: {
        theme: "dark",
        primaryColor: "var(--accent)",
        fonts: { heading: "Georgia", body: "system-ui" }
      },
      active: true,
      clients: 150,
      rating: null
    }, null, 2)
    setInput(sample)
    handleInputChange(sample)
  }

  const stats = formatted ? getStats(formatted) : null

  return (
    <main className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "JSON Formatter" }]} />
      <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm hover:text-[#1A1A1A] transition-colors mb-12" style={{ color: "var(--ink-muted)" }}>
          <ArrowLeft size={14} /> Back to Tools
        </Link>

        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "var(--accent)" }}>
            Free Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic tracking-tighter leading-[1.1] mb-4 mt-3" style={{ color: "var(--ink-strong)" }}>
            JSON Formatter
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            Paste JSON to auto-format with syntax highlighting. Validate, beautify, minify, and download.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button onClick={() => format()} className="h-10 px-5 bg-[#1A1A1A] text-[#F8F7F4] text-sm font-medium rounded-full hover:bg-[#333] transition-all flex items-center gap-2">
            <Maximize2 size={14} /> Beautify
          </button>
          <button onClick={minify} className="h-10 px-5 bg-white border border-black/[0.08] rounded-xl text-sm hover:border-black/[0.12] transition-all flex items-center gap-2" style={{ color: "var(--ink-muted)" }}>
            <Minimize2 size={14} /> Minify
          </button>
          <button onClick={copyOutput} disabled={!formatted && !input} className="h-10 px-5 bg-white border border-black/[0.08] rounded-xl text-sm hover:border-black/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2" style={{ color: "var(--ink-muted)" }}>
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button onClick={downloadJson} disabled={!formatted} className="h-10 px-5 bg-white border border-black/[0.08] rounded-xl text-sm hover:border-black/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2" style={{ color: "var(--ink-muted)" }}>
            <Download size={14} /> Download
          </button>
          <button onClick={() => { setInput(""); setFormatted(""); setError("") }} className="h-10 px-5 bg-white border border-black/[0.08] rounded-xl text-sm hover:border-black/[0.12] transition-all flex items-center gap-2" style={{ color: "var(--ink-muted)" }}>
            <Trash2 size={14} /> Clear
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-mono" style={{ color: "var(--ink-soft)" }}>Indent:</span>
            {[2, 4].map(n => (
              <button
                key={n}
                onClick={() => { setIndentSize(n); if (formatted) format() }}
                className={`w-8 h-8 text-xs rounded-lg border transition-colors ${indentSize === n ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10" : "border-black/[0.08] text-[#7A7A72] hover:border-black/[0.12]"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Validation status */}
        {input.trim() && (
          <div className={`flex items-center gap-2 mb-4 text-sm ${error ? "text-white/60" : "text-emerald-500"}`}>
            {error ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
            {error ? `Invalid JSON: ${error}` : "Valid JSON"}
          </div>
        )}

        {/* Editor area */}
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl border border-black/[0.04] overflow-hidden">
          {/* Input */}
          <div className="relative border-b lg:border-b-0 lg:border-r border-black/[0.04]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-black/[0.04] bg-white">
              <span className="text-xs font-mono" style={{ color: "var(--ink-soft)" }}>INPUT</span>
              <button onClick={loadSample} className="text-xs text-[var(--accent)] hover:text-[#333] transition-colors font-medium">
                Load sample
              </button>
            </div>
            <textarea
              value={input}
              onChange={e => handleInputChange(e.target.value)}
              placeholder="Paste your JSON here..."
              spellCheck={false}
              className="w-full h-[500px] p-5 bg-white placeholder:text-[#B8B8B0] font-mono text-sm leading-relaxed resize-none focus:outline-none"
              style={{ color: "var(--ink-strong)" }}
            />
          </div>

          {/* Output */}
          <div className="relative">
            <div className="flex items-center justify-between px-5 py-3 border-b border-black/[0.04] bg-white">
              <span className="text-xs font-mono" style={{ color: "var(--ink-soft)" }}>OUTPUT</span>
              {formatted && <span className="text-xs font-mono" style={{ color: "var(--ink-soft)" }}>{getLineCount(formatted)} lines</span>}
            </div>
            <div className="h-[500px] overflow-auto p-5" style={{ background: "#1A1A1A" }}>
              {formatted ? (
                <pre
                  className="text-sm font-mono leading-relaxed text-[#F8F7F4]"
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(formatted) }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm" style={{ color: "var(--ink-soft)" }}>
                  {input.trim() ? "Fix JSON errors to see output" : "Formatted output appears here"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && formatted && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 bg-white border border-black/[0.04] rounded-2xl text-center">
              <div className="text-xl font-bold font-mono text-[var(--accent)]">{stats.keys}</div>
              <div className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>Keys</div>
            </div>
            <div className="p-4 bg-white border border-black/[0.04] rounded-2xl text-center">
              <div className="text-xl font-bold font-mono text-emerald-500">{stats.values}</div>
              <div className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>Values</div>
            </div>
            <div className="p-4 bg-white border border-black/[0.04] rounded-2xl text-center">
              <div className="text-xl font-bold font-mono text-blue-500">{stats.depth}</div>
              <div className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>Max Depth</div>
            </div>
            <div className="p-4 bg-white border border-black/[0.04] rounded-2xl text-center">
              <div className="text-xl font-bold font-mono text-yellow-500">{stats.size}</div>
              <div className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>Size</div>
            </div>
          </div>
        )}

        <ToolServiceCta slug="json-formatter" />
      </div>
    </main>
  )
}
