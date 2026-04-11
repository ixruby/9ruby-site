import type { Metadata } from "next"
import {
  Search, Palette, Code, FileImage, Braces, QrCode,
  ArrowRight, Sparkles, Globe, Type, Hash, FileText,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "AI Tools | 9Ruby",
  description:
    "Free AI-powered developer and marketing tools: SEO Checker, Color Palette Generator, Meta Tag Generator, JSON Formatter, QR Code Generator, and more. No sign-up required.",
  openGraph: {
    title: "AI Tools | 9Ruby",
    description:
      "Free AI-powered developer and marketing tools: SEO Checker, Color Palette Generator, Meta Tag Generator, JSON Formatter, QR Code Generator, and more.",
  },
}

const tools = [
  {
    icon: <Search size={22} />,
    title: "SEO Checker",
    desc: "Analyze any URL for SEO performance. Get actionable recommendations for title tags, meta descriptions, headings, page speed, and mobile-friendliness.",
    badge: "Popular",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    status: "Live",
    href: "/tools/seo-checker",
  },
  {
    icon: <Palette size={22} />,
    title: "Color Palette Generator",
    desc: "Generate harmonious color palettes with AI. Input a base color or mood, get 5-color palettes with hex, RGB, and HSL values. Export to CSS variables.",
    badge: "Free",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    status: "Live",
    href: "/tools/color-palette",
  },
  {
    icon: <Code size={22} />,
    title: "Meta Tag Generator",
    desc: "Generate perfect Open Graph, Twitter Card, and SEO meta tags. Preview how your page will look on Google, Twitter, Facebook, and LinkedIn.",
    badge: "Free",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    status: "Live",
    href: "/tools/meta-generator",
  },
  {
    icon: <FileImage size={22} />,
    title: "Image Compressor",
    desc: "Compress images up to 90% without visible quality loss. Supports PNG, JPG, WebP, and AVIF. Batch processing for up to 20 images at once.",
    badge: "Free",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    status: "Live",
    href: "#",
  },
  {
    icon: <Braces size={22} />,
    title: "JSON Formatter",
    desc: "Beautify, minify, and validate JSON. Syntax highlighting, tree view, diff comparison, and JSONPath query support. Handles files up to 10MB.",
    badge: "Free",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    status: "Live",
    href: "/tools/json-formatter",
  },
  {
    icon: <QrCode size={22} />,
    title: "QR Code Generator",
    desc: "Generate custom QR codes with your brand colors and logo. Supports URLs, text, vCards, WiFi, and more. Download as SVG or PNG.",
    badge: "Free",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    status: "Live",
    href: "/tools/qr-generator",
  },
  {
    icon: <Type size={22} />,
    title: "Font Pairing Tool",
    desc: "AI-powered font pairing suggestions. Input your heading font and get matching body fonts with live preview and Google Fonts integration.",
    badge: "New",
    badgeColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    status: "Beta",
    href: "#",
  },
  {
    icon: <Globe size={22} />,
    title: "Website Speed Test",
    desc: "Test your website's loading speed from multiple global locations. Get Core Web Vitals scores and optimization tips.",
    badge: "New",
    badgeColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    status: "Beta",
    href: "#",
  },
  {
    icon: <Hash size={22} />,
    title: "Hashtag Generator",
    desc: "AI-generated hashtags for Instagram, TikTok, Twitter, and LinkedIn. Based on your content topic and target audience.",
    badge: "Free",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    status: "Live",
    href: "#",
  },
  {
    icon: <FileText size={22} />,
    title: "Privacy Policy Generator",
    desc: "Generate GDPR and CCPA-compliant privacy policies for your website or app. Customizable templates for different business types.",
    badge: "Free",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    status: "Live",
    href: "#",
  },
  {
    icon: <Sparkles size={22} />,
    title: "AI Copywriter",
    desc: "Generate marketing copy, product descriptions, taglines, and social media posts. Powered by 9Ruby AI with brand voice training.",
    badge: "Popular",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    status: "Live",
    href: "#",
  },
  {
    icon: <FileImage size={22} />,
    title: "Favicon Generator",
    desc: "Generate favicons in all required sizes from a single image. Outputs ICO, PNG, SVG, and a ready-to-paste HTML snippet.",
    badge: "Free",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    status: "Live",
    href: "#",
  },
]

export default function ToolsPage() {
  return (
    <main className="relative min-h-screen" style={{ background: "#F8F7F4" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Tools" }]} />

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "#C41A3B" }}>
              Free Tools
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif italic tracking-tighter leading-[1.05] mb-6 mt-4" style={{ color: "#1A1A1A" }}>
              AI-powered tools,
              <br />
              <span style={{ color: "#7A7A72" }}>zero cost.</span>
            </h1>
            <p className="text-lg max-w-lg mx-auto leading-relaxed" style={{ color: "#7A7A72" }}>
              A growing collection of free developer and marketing tools powered by 9Ruby AI. No sign-up required.
            </p>
          </div>

          {/* Tools grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((t) => (
              <Link
                href={t.href || "#"}
                key={t.title}
                className="group relative flex flex-col p-6 bg-white border border-black/[0.04] rounded-2xl hover:border-black/[0.12] hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F8F7F4] border border-black/[0.06] flex items-center justify-center text-[#7A7A72] group-hover:text-[#C41A3B] group-hover:bg-[#C41A3B]/10 group-hover:border-[#C41A3B]/20 transition-all duration-300">
                    {t.icon}
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${t.badgeColor}`}>{t.badge}</span>
                </div>

                <h3 className="text-[15px] font-semibold tracking-tight mb-2 group-hover:text-[#1A1A1A] transition-colors" style={{ color: "#1A1A1A" }}>{t.title}</h3>
                <p className="text-[13px] leading-relaxed mb-5 flex-1" style={{ color: "#7A7A72" }}>{t.desc}</p>

                <div className="flex items-center justify-between pt-4 border-t border-black/[0.04]">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${t.status === "Live" ? "bg-emerald-400" : "bg-yellow-400"}`} />
                    <span className="text-[11px] font-mono" style={{ color: "#B8B8B0" }}>{t.status}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#7A7A72] group-hover:text-[#C41A3B] group-hover:gap-2.5 transition-all duration-300">
                    Open <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming soon */}
          <div className="mt-16 p-10 bg-white border border-dashed border-black/[0.08] rounded-2xl text-center">
            <div className="w-10 h-10 rounded-xl bg-[#C41A3B]/10 border border-[#C41A3B]/20 flex items-center justify-center mx-auto mb-5">
              <Sparkles size={18} className="text-[#C41A3B]" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight mb-2" style={{ color: "#1A1A1A" }}>More tools coming soon</h3>
            <p className="text-sm max-w-md mx-auto mb-6 leading-relaxed" style={{ color: "#7A7A72" }}>We&apos;re building new AI-powered tools every week. Request a tool or suggest an idea.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-[#1A1A1A] text-[#F8F7F4] text-sm font-medium hover:bg-[#333] transition-all duration-300">
              Request a tool <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
