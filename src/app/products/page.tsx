"use client"

import { ArrowRight, Bot, Globe, Layers, Mic, Sparkles, Wrench, BarChart3, Blocks, Shield } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const pillars = [
  {
    title: "Starter Access",
    label: "9Ruby AI",
    icon: Sparkles,
    desc: "Self-serve AI workspace for chat, prompts, design support, and launch tools.",
    items: ["AI workspace", "Templates and prompt kits", "Design Studio", "Fast onboarding"],
    cta: "Start with AI",
    href: "https://ai.9ruby.com",
    external: true,
  },
  {
    title: "Managed Execution",
    label: "IX Ruby Services",
    icon: Globe,
    desc: "Websites, automation, SEO, analytics, content systems, and voice deployments under one delivery lane.",
    items: ["Website builds", "SEO and growth ops", "Automation systems", "Voice and chatbot deployments"],
    cta: "See Services",
    href: "/services",
    external: false,
  },
  {
    title: "Flagship Systems",
    label: "Black Tier",
    icon: Shield,
    desc: "Custom operating systems, product builds, and dedicated launch capacity for brands building bigger systems.",
    items: ["Custom product systems", "Deep AI infrastructure", "Executive delivery lane", "Launch operations"],
    cta: "Book a Call",
    href: "/contact",
    external: false,
  },
]

const inventory = [
  { title: "Templates", icon: Layers, desc: "Production-ready starters for launches, products, and brand sites.", href: "/templates" },
  { title: "Visual Builder", icon: Blocks, desc: "Drag-and-drop website builder direction for React, Next.js, WordPress, Shopify, and plain HTML.", href: "/contact?source=products&product=nine-builder" },
  { title: "Tools", icon: Wrench, desc: "Free utilities for SEO, formatting, QR generation, and creative workflows.", href: "/tools" },
  { title: "Apps", icon: Blocks, desc: "Connected software stack with 13,000+ integrations across business workflows.", href: "/apps" },
  { title: "Voice Agents", icon: Mic, desc: "Outbound calling, inbound support, and appointment booking with fast response times.", href: "/services/voice-agents" },
  { title: "Analytics", icon: BarChart3, desc: "Dashboards and decision systems that make the rest of the stack measurable.", href: "/dashboard" },
  { title: "Ecosystem Map", icon: Bot, desc: "The full IX Ruby footprint, including public Vercel projects and product surfaces.", href: "/ecosystem" },
]

export default function ProductsPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Products" }]} />

      {/* HERO */}
      <section style={{ background: "#000" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Products</p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(56px,10vw,120px)", color: "#fff", marginBottom: 28 }}>
            ONE SYSTEM.<br />EVERY PRODUCT.
          </h1>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 520, margin: "0 auto" }}>
            AI access, managed execution, and flagship builds — all inside one structured operating layer.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ border: BORDER }}>
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="flex flex-col p-8 md:p-10"
                style={{ borderRight: i < 2 ? BORDER : undefined, borderBottom: BORDER }}
              >
                <div style={{ width: 36, height: 36, border: BORDER, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: 20 }}>
                  <pillar.icon size={16} />
                </div>
                <p style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
                  {pillar.label}
                </p>
                <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.055em", lineHeight: 0.93, fontSize: "clamp(20px,2.5vw,28px)", color: "#fff", marginBottom: 12 }}>
                  {pillar.title}
                </h2>
                <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.44)", marginBottom: 24 }}>
                  {pillar.desc}
                </p>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5" style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.44)" }}>
                      <span style={{ width: 4, height: 4, background: "#fff", borderRadius: "50%", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={pillar.href}
                  target={pillar.external ? "_blank" : undefined}
                  rel={pillar.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ fontFamily: NV, fontWeight: 800, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "11px 24px", textDecoration: "none" }}
                >
                  {pillar.cta} <ArrowRight size={11} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVENTORY */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12">
            <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>* Inventory</p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#fff" }}>
              THE REST<br />OF THE STACK
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ border: BORDER }}>
            {inventory.map((item, i) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex flex-col gap-4 p-8 hover:bg-white/[0.02] transition-colors group"
                style={{ borderRight: (i + 1) % 3 !== 0 ? BORDER : undefined, borderBottom: BORDER, textDecoration: "none" }}
              >
                <div style={{ width: 36, height: 36, border: BORDER, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <item.icon size={16} />
                </div>
                <div>
                  <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.04em", fontSize: 16, color: "#fff", marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.44)" }}>{item.desc}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 group-hover:gap-3 transition-all" style={{ fontFamily: NV, fontWeight: 800, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                  Explore <ArrowRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#000" }} className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2rem,5vw,4rem)", color: "#fff", marginBottom: 16 }}>
              NEED THE<br />RIGHT LANE?
            </h2>
            <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: 400 }}>
              Start with AI if you want access. Move into services if you need execution. Choose Black for a flagship build.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="https://ai.9ruby.com"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ fontFamily: NV, fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "12px 28px", textDecoration: "none" }}
            >
              Start with AI <ArrowRight size={11} />
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center hover:opacity-80 transition-opacity"
              style={{ fontFamily: NV, fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", border: "0.8px solid rgba(255,255,255,0.4)", color: "#fff", padding: "12px 28px", textDecoration: "none" }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
