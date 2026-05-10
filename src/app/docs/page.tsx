"use client"

import Link from "next/link"
import { BookOpen, Bot, Terminal, Plug, LayoutTemplate, Webhook, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const docSections = [
  { icon: <BookOpen size={18} />, title: "Getting Started", description: "Quick start guide, first project setup, and core concepts. Go from zero to deployed in under five minutes.", link: "#getting-started" },
  { icon: <Bot size={18} />, title: "AI Agents", description: "Creating, deploying, and managing autonomous agents. Learn how to configure behaviors, set goals, and monitor performance.", link: "#ai-agents" },
  { icon: <Terminal size={18} />, title: "CLI Reference", description: "All commands, flags, and configuration options for the Rubix CLI. Install, authenticate, and manage projects from your terminal.", link: "#cli-reference" },
  { icon: <Plug size={18} />, title: "API Reference", description: "REST endpoints, authentication, rate limits, and response schemas. Everything you need to integrate programmatically.", link: "#api-reference" },
  { icon: <LayoutTemplate size={18} />, title: "Templates", description: "Using, customizing, and creating production-ready templates. Browse the library, fork a starter, or publish your own.", link: "#templates" },
  { icon: <Webhook size={18} />, title: "Integrations", description: "Connecting external services, webhooks, and MCP servers. Extend 9Ruby with Slack, GitHub, Stripe, Supabase, and more.", link: "#integrations" },
]

export default function DocsPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Documentation" }]} />

      {/* HERO */}
      <section style={{ background: "#8C000E" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Docs</p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(56px,10vw,120px)", color: "#fff", marginBottom: 28 }}>
            DOCUMENTATION
          </h1>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 520, margin: "0 auto" }}>
            Everything you need to build with 9Ruby — from quick starts to deep API references.
          </p>
        </div>
      </section>

      {/* DOCS GRID */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ border: BORDER }}>
            {docSections.map((section, i) => (
              <Link
                key={section.title}
                href={section.link}
                className="flex flex-col gap-5 group hover:bg-white/[0.03] transition-colors"
                style={{ padding: "32px 28px", borderRight: (i + 1) % 3 !== 0 ? BORDER : undefined, borderBottom: BORDER, textDecoration: "none" }}
              >
                <div style={{ width: 36, height: 36, border: BORDER, display: "flex", alignItems: "center", justifyContent: "center", color: "#C8102E" }}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.04em", fontSize: 16, color: "#fff", marginBottom: 8 }}>{section.title}</h3>
                  <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.44)" }}>{section.description}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 group-hover:gap-3 transition-all" style={{ fontFamily: NV, fontWeight: 800, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#C8102E" }}>
                  Read Docs <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#8C000E" }} className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2rem,5vw,4rem)", color: "#fff", marginBottom: 16 }}>
              CAN&apos;T FIND<br />WHAT YOU NEED?
            </h2>
            <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: 400 }}>
              Our team is here to help. Reach out and we&apos;ll point you in the right direction.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ fontFamily: NV, fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "12px 28px", textDecoration: "none" }}
            >
              Contact Support <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
