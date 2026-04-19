"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import {
  BookOpen, Bot, Terminal, Plug, LayoutTemplate, Webhook,
  ArrowRight,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const docSections = [
  {
    icon: <BookOpen size={20} />,
    title: "Getting Started",
    description:
      "Quick start guide, first project setup, and core concepts. Go from zero to deployed in under five minutes.",
    link: "#getting-started",
  },
  {
    icon: <Bot size={20} />,
    title: "AI Agents",
    description:
      "Creating, deploying, and managing autonomous agents. Learn how to configure behaviors, set goals, and monitor performance.",
    link: "#ai-agents",
  },
  {
    icon: <Terminal size={20} />,
    title: "CLI Reference",
    description:
      "All commands, flags, and configuration options for the Rubix CLI. Install, authenticate, and manage projects from your terminal.",
    link: "#cli-reference",
  },
  {
    icon: <Plug size={20} />,
    title: "API Reference",
    description:
      "REST endpoints, authentication, rate limits, and response schemas. Everything you need to integrate programmatically.",
    link: "#api-reference",
  },
  {
    icon: <LayoutTemplate size={20} />,
    title: "Templates",
    description:
      "Using, customizing, and creating production-ready templates. Browse the library, fork a starter, or publish your own.",
    link: "#templates",
  },
  {
    icon: <Webhook size={20} />,
    title: "Integrations",
    description:
      "Connecting external services, webhooks, and MCP servers. Extend 9Ruby with Slack, GitHub, Stripe, Supabase, and more.",
    link: "#integrations",
  },
]

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll("[data-reveal]")
    children.forEach((child) => {
      const el = child as HTMLElement
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      const delay = Number(child.getAttribute("data-reveal-delay") || 0)
      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, delay)
    })
  }, [])

  return ref
}

export default function DocsPage() {
  const revealRef = useScrollReveal()

  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Documentation" }]} />

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div ref={revealRef} className="relative max-w-[1200px] mx-auto px-6">
          {/* Hero */}
          <div className="mb-20 lg:mb-24" data-reveal>
            <div className="inline-flex items-center gap-2 mb-8">
              <span
                className="text-[11px] font-semibold tracking-[0.12em] uppercase"
                style={{ color: "#8B6B3D" }}
              >
                Docs
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-[80px] font-serif italic tracking-tighter leading-[0.9] mb-8"
              style={{ color: "var(--ink-strong)" }}
            >
              Documentation
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: "var(--ink-muted)" }}
            >
              Everything you need to build with 9Ruby. From quick starts to deep API
              references — find the guide that fits your workflow.
            </p>
          </div>

          {/* Doc sections grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
            {docSections.map((section) => (
              <Link
                key={section.title}
                href={section.link}
                className="p-8 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all group block"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                data-reveal
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(0,0,0,0.02)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span
                    className="group-hover:text-[#8B6B3D] transition-colors"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {section.icon}
                  </span>
                </div>
                <h3
                  className="text-lg font-semibold tracking-tight mb-2"
                  style={{ color: "var(--ink-strong)" }}
                >
                  {section.title}
                </h3>
                <p className="leading-relaxed text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
                  {section.description}
                </p>
                <span
                  className="text-[13px] font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  style={{ color: "#8B6B3D" }}
                >
                  Read docs <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center py-8" data-reveal>
            <h2
              className="text-4xl md:text-5xl font-serif italic tracking-tighter mb-4"
              style={{ color: "var(--ink-strong)" }}
            >
              Can&apos;t find what you need?
            </h2>
            <p
              className="text-lg mb-10 max-w-md mx-auto"
              style={{ color: "var(--ink-soft)" }}
            >
              Our team is here to help. Reach out and we&apos;ll point you in the right direction.
            </p>
            <Link
              href="/contact"
              className="bg-[#1A1A1A] rounded-full px-7 h-10 text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all inline-flex items-center gap-2"
              style={{ color: "#F8F7F4" }}
            >
              Contact support <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
