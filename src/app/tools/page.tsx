import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  Braces,
  Code,
  FileImage,
  FileText,
  Globe,
  Hash,
  Palette,
  QrCode,
  Search,
  Sparkles,
  Type,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import { publicTools, toolCategories, toolContactHref, type ToolIcon } from "@/lib/tools"

export const metadata: Metadata = {
  title: "Free Website Tools | 9Ruby",
  description:
    "Free no-login tools from 9Ruby for SEO, design, development, marketing, and business. Generate exports locally, then ask 9Ruby to fix it for you.",
}

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const iconMap: Record<ToolIcon, LucideIcon> = {
  search: Search,
  palette: Palette,
  code: Code,
  image: FileImage,
  braces: Braces,
  qr: QrCode,
  type: Type,
  globe: Globe,
  hash: Hash,
  "file-text": FileText,
  sparkles: Sparkles,
}

export default function ToolsPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Tools" }]} />

      <section style={{ background: "#8C000E" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Free Tools</p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(50px,10vw,118px)", color: "#fff", marginBottom: 28 }}>
            PUBLIC<br />TOOLBOX
          </h1>
          <p style={{ fontFamily: NV, fontSize: "clamp(15px,4vw,18px)", lineHeight: 1.6, color: "rgba(255,255,255,0.72)", maxWidth: 650, margin: "0 auto", overflowWrap: "anywhere" }}>
            <span className="block">Free tools for SEO, design, dev, marketing, and business.</span>
            <span className="block">Use output yourself.</span>
            <span className="block">Ask 9Ruby to fix it.</span>
          </p>
        </div>
      </section>

      <section className="py-8" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {toolCategories.map((category) => {
              const count = publicTools.filter((tool) => tool.category === category).length
              return (
                <div
                  key={category}
                  className="inline-flex items-center gap-2 px-3 py-2"
                  style={{ border: BORDER, color: "rgba(255,255,255,0.62)", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {category}
                  <span style={{ color: "rgba(255,255,255,0.34)" }}>{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ border: BORDER }}>
            {publicTools.map((tool, i) => {
              const Icon = iconMap[tool.icon]
              return (
                <article
                  key={tool.slug}
                  className="flex flex-col gap-4 hover:bg-white/[0.03] transition-colors"
                  style={{ padding: "28px 24px", borderRight: (i + 1) % 3 !== 0 ? BORDER : undefined, borderBottom: BORDER }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div style={{ width: 36, height: 36, border: BORDER, display: "flex", alignItems: "center", justifyContent: "center", color: "#C8102E", flexShrink: 0 }}>
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      <span style={{ fontFamily: NV, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: BORDER, color: "rgba(255,255,255,0.45)", padding: "3px 8px" }}>
                        {tool.badge}
                      </span>
                      <span style={{ fontFamily: NV, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: BORDER, color: "rgba(255,255,255,0.45)", padding: "3px 8px" }}>
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.04em", fontSize: 15, color: "#fff", marginBottom: 6 }}>{tool.title}</h2>
                    <p style={{ fontFamily: NV, fontSize: 12, lineHeight: 1.65, color: "rgba(255,255,255,0.5)" }}>{tool.description}</p>
                  </div>

                  <div className="flex items-center justify-between" style={{ paddingTop: 12, borderTop: BORDER }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 6, height: 6, background: tool.status === "Live" ? "#22c55e" : "#eab308", borderRadius: "50%" }} />
                      <span style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.34)" }}>{tool.status}</span>
                    </div>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-1 hover:gap-2 transition-all"
                      style={{ fontFamily: NV, fontWeight: 800, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", textDecoration: "none" }}
                    >
                      Open <ArrowRight size={10} />
                    </Link>
                  </div>

                  <Link
                    href={toolContactHref(tool.slug)}
                    className="inline-flex h-10 items-center justify-center gap-2"
                    style={{ fontFamily: NV, fontWeight: 800, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", background: "#fff", color: "#080808", textDecoration: "none" }}
                  >
                    Fix this for me <ArrowRight size={10} />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#8C000E" }} className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2rem,5vw,4rem)", color: "#fff", marginBottom: 16 }}>
              NEED A<br />CUSTOM TOOL?
            </h2>
            <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.68)", maxWidth: 430 }}>
              Request a free utility, a client-facing calculator, or an internal workflow tool for your business.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/contact?source=tools&tool=request"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ fontFamily: NV, fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "12px 28px", textDecoration: "none" }}
            >
              Request a Tool <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
