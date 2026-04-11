"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Check, Eye, Code, Globe } from "lucide-react"
import Navbar from "@/components/Navbar"
import Breadcrumb from "@/components/Breadcrumb"

interface MetaForm {
  title: string
  description: string
  keywords: string
  ogImage: string
  ogType: string
  url: string
  twitterHandle: string
  siteName: string
  locale: string
  author: string
  robots: string
  themeColor: string
}

const defaultForm: MetaForm = {
  title: "",
  description: "",
  keywords: "",
  ogImage: "",
  ogType: "website",
  url: "",
  twitterHandle: "",
  siteName: "",
  locale: "en_US",
  author: "",
  robots: "index, follow",
  themeColor: "#000000",
}

function generateMetaTags(form: MetaForm): string {
  const lines: string[] = []

  lines.push(`<!-- Primary Meta Tags -->`)
  if (form.title) lines.push(`<title>${form.title}</title>`)
  if (form.title) lines.push(`<meta name="title" content="${form.title}" />`)
  if (form.description) lines.push(`<meta name="description" content="${form.description}" />`)
  if (form.keywords) lines.push(`<meta name="keywords" content="${form.keywords}" />`)
  if (form.author) lines.push(`<meta name="author" content="${form.author}" />`)
  if (form.robots) lines.push(`<meta name="robots" content="${form.robots}" />`)
  if (form.themeColor) lines.push(`<meta name="theme-color" content="${form.themeColor}" />`)

  lines.push(``)
  lines.push(`<!-- Open Graph / Facebook -->`)
  lines.push(`<meta property="og:type" content="${form.ogType}" />`)
  if (form.url) lines.push(`<meta property="og:url" content="${form.url}" />`)
  if (form.title) lines.push(`<meta property="og:title" content="${form.title}" />`)
  if (form.description) lines.push(`<meta property="og:description" content="${form.description}" />`)
  if (form.ogImage) lines.push(`<meta property="og:image" content="${form.ogImage}" />`)
  if (form.siteName) lines.push(`<meta property="og:site_name" content="${form.siteName}" />`)
  if (form.locale) lines.push(`<meta property="og:locale" content="${form.locale}" />`)

  lines.push(``)
  lines.push(`<!-- Twitter -->`)
  lines.push(`<meta property="twitter:card" content="summary_large_image" />`)
  if (form.url) lines.push(`<meta property="twitter:url" content="${form.url}" />`)
  if (form.title) lines.push(`<meta property="twitter:title" content="${form.title}" />`)
  if (form.description) lines.push(`<meta property="twitter:description" content="${form.description}" />`)
  if (form.ogImage) lines.push(`<meta property="twitter:image" content="${form.ogImage}" />`)
  if (form.twitterHandle) lines.push(`<meta property="twitter:creator" content="${form.twitterHandle}" />`)

  if (form.url) {
    lines.push(``)
    lines.push(`<!-- Canonical -->`)
    lines.push(`<link rel="canonical" href="${form.url}" />`)
  }

  return lines.join("\n")
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

export default function MetaGeneratorPage() {
  const [form, setForm] = useState<MetaForm>(defaultForm)
  const [copied, setCopied] = useState(false)
  const [view, setView] = useState<"code" | "preview">("code")

  const update = (key: keyof MetaForm, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const output = generateMetaTags(form)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlightHtml = (code: string): string => {
    return code
      .replace(/(&lt;\/?[\w-]+)/g, '<span style="color:#C41A3B">$1</span>')
      .replace(/([\w-]+)=(&quot;)/g, '<span style="color:#3b82f6">$1</span>=<span style="color:#10b981">&quot;</span>')
      .replace(/(&quot;)/g, '<span style="color:#10b981">&quot;</span>')
      .replace(/(&lt;!--.*?--&gt;)/g, '<span style="color:rgba(0,0,0,0.25)">$1</span>')
  }

  const inputCls = "w-full h-11 px-4 bg-white border border-black/[0.08] rounded-xl placeholder:text-[#B8B8B0] focus:border-[#C41A3B]/50 focus:ring-1 focus:ring-[#C41A3B]/20 focus:outline-none text-sm transition-all"
  const selectCls = "w-full h-11 px-4 bg-white border border-black/[0.08] rounded-xl text-sm focus:border-[#C41A3B]/50 focus:ring-1 focus:ring-[#C41A3B]/20 focus:outline-none appearance-none transition-all"

  return (
    <main className="relative min-h-screen" style={{ background: "#F8F7F4" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Meta Generator" }]} />
      <div className="relative max-w-5xl mx-auto px-6 pt-8 pb-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm hover:text-[#1A1A1A] transition-colors mb-12" style={{ color: "#7A7A72" }}>
          <ArrowLeft size={14} /> Back to Tools
        </Link>

        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "#C41A3B" }}>
            Free Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic tracking-tighter leading-[1.1] mb-4 mt-3" style={{ color: "#1A1A1A" }}>
            Meta Tag Generator
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: "#7A7A72" }}>
            Generate perfect SEO, Open Graph, and Twitter Card meta tags. Preview how your page will look when shared.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Form */}
          <div className="space-y-4">
            <div className="p-6 bg-white border border-black/[0.04] rounded-2xl space-y-4">
              <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "#C41A3B" }}>Basic SEO</h3>

              <div>
                <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>Page Title *</label>
                <input
                  type="text" value={form.title} onChange={e => update("title", e.target.value)}
                  placeholder="My Awesome Website"
                  className={inputCls}
                  style={{ color: "#1A1A1A" }}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs" style={{ color: "#B8B8B0" }}>Recommended: 50-60 characters</span>
                  <span className={`text-xs font-mono ${form.title.length > 60 ? "text-yellow-500" : ""}`} style={form.title.length <= 60 ? { color: "#B8B8B0" } : undefined}>{form.title.length}/60</span>
                </div>
              </div>

              <div>
                <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>Meta Description *</label>
                <textarea
                  value={form.description} onChange={e => update("description", e.target.value)}
                  placeholder="A brief description of your page content..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-black/[0.08] rounded-xl placeholder:text-[#B8B8B0] focus:border-[#C41A3B]/50 focus:ring-1 focus:ring-[#C41A3B]/20 focus:outline-none text-sm resize-none transition-all"
                  style={{ color: "#1A1A1A" }}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs" style={{ color: "#B8B8B0" }}>Recommended: 150-160 characters</span>
                  <span className={`text-xs font-mono ${form.description.length > 160 ? "text-yellow-500" : ""}`} style={form.description.length <= 160 ? { color: "#B8B8B0" } : undefined}>{form.description.length}/160</span>
                </div>
              </div>

              <div>
                <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>Keywords</label>
                <input type="text" value={form.keywords} onChange={e => update("keywords", e.target.value)} placeholder="seo, tools, web development" className={inputCls} style={{ color: "#1A1A1A" }} />
              </div>

              <div>
                <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>Page URL</label>
                <input type="text" value={form.url} onChange={e => update("url", e.target.value)} placeholder="https://example.com/page" className={inputCls} style={{ color: "#1A1A1A" }} />
              </div>

              <div>
                <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>Author</label>
                <input type="text" value={form.author} onChange={e => update("author", e.target.value)} placeholder="John Doe" className={inputCls} style={{ color: "#1A1A1A" }} />
              </div>
            </div>

            <div className="p-6 bg-white border border-black/[0.04] rounded-2xl space-y-4">
              <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "#C41A3B" }}>Social / Open Graph</h3>

              <div>
                <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>OG Image URL</label>
                <input type="text" value={form.ogImage} onChange={e => update("ogImage", e.target.value)} placeholder="https://example.com/og-image.jpg" className={inputCls} style={{ color: "#1A1A1A" }} />
                <span className="text-xs mt-1 block" style={{ color: "#B8B8B0" }}>Recommended: 1200x630px</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>OG Type</label>
                  <select value={form.ogType} onChange={e => update("ogType", e.target.value)} className={selectCls} style={{ color: "#1A1A1A" }}>
                    <option value="website">website</option>
                    <option value="article">article</option>
                    <option value="product">product</option>
                    <option value="profile">profile</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>Locale</label>
                  <input type="text" value={form.locale} onChange={e => update("locale", e.target.value)} className={inputCls} style={{ color: "#1A1A1A" }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>Site Name</label>
                  <input type="text" value={form.siteName} onChange={e => update("siteName", e.target.value)} placeholder="My Website" className={inputCls} style={{ color: "#1A1A1A" }} />
                </div>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>Twitter Handle</label>
                  <input type="text" value={form.twitterHandle} onChange={e => update("twitterHandle", e.target.value)} placeholder="@username" className={inputCls} style={{ color: "#1A1A1A" }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>Robots</label>
                  <select value={form.robots} onChange={e => update("robots", e.target.value)} className={selectCls} style={{ color: "#1A1A1A" }}>
                    <option value="index, follow">index, follow</option>
                    <option value="noindex, follow">noindex, follow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "#7A7A72" }}>Theme Color</label>
                  <div className="flex gap-2">
                    <input type="color" value={form.themeColor} onChange={e => update("themeColor", e.target.value)} className="w-11 h-11 bg-transparent border border-black/[0.08] rounded-xl cursor-pointer" />
                    <input type="text" value={form.themeColor} onChange={e => update("themeColor", e.target.value)} className="flex-1 h-11 px-4 bg-white border border-black/[0.08] rounded-xl text-sm font-mono focus:border-[#C41A3B]/50 focus:ring-1 focus:ring-[#C41A3B]/20 focus:outline-none transition-all" style={{ color: "#1A1A1A" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-4">
            {/* Google preview */}
            <div className="p-5 bg-white border border-black/[0.04] rounded-2xl">
              <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 flex items-center gap-2" style={{ color: "#C41A3B" }}>
                <Globe size={14} /> Google Preview
              </h3>
              <div className="bg-[#F8F7F4] rounded-xl p-4 border border-black/[0.04]">
                <div className="text-sm text-green-700 font-mono truncate">{form.url || "https://example.com"}</div>
                <div className="text-xl text-blue-700 hover:underline cursor-pointer truncate mt-0.5">{form.title || "Page Title"}</div>
                <div className="text-sm text-gray-600 mt-1 line-clamp-2">{form.description || "Your meta description will appear here..."}</div>
              </div>
            </div>

            {/* Social preview */}
            <div className="p-5 bg-white border border-black/[0.04] rounded-2xl">
              <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 flex items-center gap-2" style={{ color: "#C41A3B" }}>
                <Eye size={14} /> Social Preview
              </h3>
              <div className="border border-black/[0.06] rounded-xl overflow-hidden bg-[#F8F7F4]">
                {form.ogImage ? (
                  <div className="w-full h-40 bg-cover bg-center" style={{ backgroundImage: `url(${form.ogImage})` }} />
                ) : (
                  <div className="w-full h-40 bg-black/[0.02] flex items-center justify-center text-sm" style={{ color: "#B8B8B0" }}>
                    No image set
                  </div>
                )}
                <div className="p-4">
                  <div className="text-xs uppercase font-mono" style={{ color: "#B8B8B0" }}>{form.siteName || (form.url ? new URL(form.url).hostname : "example.com")}</div>
                  <div className="font-semibold mt-1 truncate" style={{ color: "#1A1A1A" }}>{form.title || "Page Title"}</div>
                  <div className="text-sm mt-1 line-clamp-2" style={{ color: "#7A7A72" }}>{form.description || "Description..."}</div>
                </div>
              </div>
            </div>

            {/* Code output */}
            <div className="bg-white border border-black/[0.04] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/[0.04]">
                <div className="flex gap-4">
                  <button
                    onClick={() => setView("code")}
                    className={`text-sm flex items-center gap-1.5 transition-colors ${view === "code" ? "text-[#1A1A1A]" : "text-[#B8B8B0] hover:text-[#7A7A72]"}`}
                  >
                    <Code size={14} /> Code
                  </button>
                  <button
                    onClick={() => setView("preview")}
                    className={`text-sm flex items-center gap-1.5 transition-colors ${view === "preview" ? "text-[#1A1A1A]" : "text-[#B8B8B0] hover:text-[#7A7A72]"}`}
                  >
                    <Eye size={14} /> Raw
                  </button>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="text-sm flex items-center gap-1.5 transition-colors hover:text-[#1A1A1A]"
                  style={{ color: "#7A7A72" }}
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="p-5 overflow-x-auto max-h-[500px] overflow-y-auto" style={{ background: "#1A1A1A" }}>
                {view === "code" ? (
                  <pre
                    className="text-sm font-mono leading-relaxed text-[#F8F7F4]"
                    dangerouslySetInnerHTML={{ __html: highlightHtml(escapeHtml(output)) }}
                  />
                ) : (
                  <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap" style={{ color: "#F8F7F4" }}>{output}</pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
