"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import {
  Rocket, Brain, Compass, Shield,
  ArrowRight, MapPin, Clock, Briefcase,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const values = [
  {
    icon: <Rocket size={18} />,
    title: "Ship Fast",
    desc: "We bias toward action. Ship early, iterate often, learn from real users. Perfect is the enemy of done.",
  },
  {
    icon: <Brain size={18} />,
    title: "Think Deep",
    desc: "Move fast but don't be careless. Every decision is intentional. We think in systems, not features.",
  },
  {
    icon: <Compass size={18} />,
    title: "Stay Curious",
    desc: "The landscape changes daily. We read, experiment, and stay ahead. Curiosity is our competitive edge.",
  },
  {
    icon: <Shield size={18} />,
    title: "Own Your Work",
    desc: "No hand-holding. You own your projects end to end — from idea to production. Autonomy is earned and expected.",
  },
]

const positions = [
  {
    title: "Senior Frontend Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "Build and ship production interfaces across the 9Ruby platform. You'll work with React, Next.js, and TypeScript to create fast, accessible, and beautiful products used by thousands of brands.",
  },
  {
    title: "AI Agent Developer",
    type: "Full-time",
    location: "Remote",
    description:
      "Design, train, and deploy autonomous AI agents that power our platform. Deep experience with Python, large language models, and agent frameworks like LangChain or custom orchestration.",
  },
  {
    title: "Product Designer",
    type: "Full-time",
    location: "Remote",
    description:
      "Shape the look and feel of every 9Ruby product. You'll own design systems, prototype in Figma, and collaborate closely with engineering to ship pixel-perfect interfaces.",
  },
  {
    title: "Growth Marketing Lead",
    type: "Full-time",
    location: "Remote",
    description:
      "Own the full growth funnel from acquisition to retention. You'll run SEO, paid campaigns, and analytics to drive measurable revenue growth across all 9Ruby products.",
  },
  {
    title: "DevOps Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "Keep our infrastructure fast, reliable, and scalable. You'll manage deployments on Vercel and AWS, build CI/CD pipelines, and containerize services with Docker.",
  },
  {
    title: "Community Manager",
    type: "Part-time",
    location: "Remote",
    description:
      "Grow and nurture the 9Ruby developer community. You'll manage Discord, engage on GitHub, create content, and turn users into advocates.",
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

export default function CareersPage() {
  const revealRef = useScrollReveal()

  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Careers" }]} />

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div ref={revealRef} className="relative max-w-[1200px] mx-auto px-6">
          {/* Hero */}
          <div className="mb-20 lg:mb-24" data-reveal>
            <div className="inline-flex items-center gap-2 mb-8">
              <span
                className="text-[11px] font-semibold tracking-[0.12em] uppercase"
                style={{ color: "#8B6B3D" }}
              >
                Careers
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-[80px] font-serif italic tracking-tighter leading-[0.9] mb-8"
              style={{ color: "var(--ink-strong)" }}
            >
              Join the team building
              <br />
              <span style={{ color: "var(--ink-muted)" }}>the future.</span>
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: "var(--ink-muted)" }}
            >
              IX Ruby is a small, fast-moving team building AI-powered products that serve
              thousands of brands. If you want ownership, speed, and meaningful work — we
              want to hear from you.
            </p>
          </div>

          {/* Culture */}
          <div
            className="mb-28 relative overflow-hidden rounded-2xl bg-white p-12 lg:p-20"
            style={{ border: "1px solid rgba(0,0,0,0.04)" }}
            data-reveal
          >
            <span
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block"
              style={{ color: "#8B6B3D" }}
            >
              Culture
            </span>
            <h2
              className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-6"
              style={{ color: "var(--ink-strong)" }}
            >
              How we work
            </h2>
            <p
              className="text-[15px] leading-relaxed max-w-2xl"
              style={{ color: "var(--ink-muted)" }}
            >
              We&apos;re a small team building big things. Remote-first, async, AI-augmented.
              We don&apos;t do standups or status meetings. We ship code, designs, and
              campaigns — then we measure what worked. Every person on the team has direct
              impact on the product and the business.
            </p>
          </div>

          {/* Values */}
          <div className="mb-28" data-reveal>
            <span
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block"
              style={{ color: "#8B6B3D" }}
            >
              Values
            </span>
            <h2
              className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-12"
              style={{ color: "var(--ink-strong)" }}
            >
              What we stand for
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="p-8 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all group"
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
                      {v.icon}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-semibold tracking-tight mb-2"
                    style={{ color: "var(--ink-strong)" }}
                  >
                    {v.title}
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: "var(--ink-soft)" }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Open positions */}
          <div className="mb-28" data-reveal>
            <span
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 block"
              style={{ color: "#8B6B3D" }}
            >
              Open Positions
            </span>
            <h2
              className="text-3xl md:text-4xl font-serif italic tracking-tighter mb-12"
              style={{ color: "var(--ink-strong)" }}
            >
              Current openings
            </h2>
            <div className="space-y-4">
              {positions.map((pos) => (
                <div
                  key={pos.title}
                  className="p-8 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all group"
                  style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                  data-reveal
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3
                        className="text-xl font-semibold tracking-tight mb-2"
                        style={{ color: "var(--ink-strong)" }}
                      >
                        {pos.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-muted)" }}>
                          <MapPin size={12} />
                          {pos.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-muted)" }}>
                          <Clock size={12} />
                          {pos.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-muted)" }}>
                          <Briefcase size={12} />
                          IX Ruby Agency
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="bg-[#1A1A1A] rounded-full px-6 h-9 text-[13px] font-medium hover:bg-[#1A1A1A]/90 transition-all inline-flex items-center gap-2 shrink-0"
                      style={{ color: "#F8F7F4" }}
                    >
                      Apply <ArrowRight size={13} />
                    </Link>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                    {pos.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8" data-reveal>
            <h2
              className="text-4xl md:text-5xl font-serif italic tracking-tighter mb-4"
              style={{ color: "var(--ink-strong)" }}
            >
              Don&apos;t see your role?
            </h2>
            <p
              className="text-lg mb-10 max-w-md mx-auto"
              style={{ color: "var(--ink-soft)" }}
            >
              We&apos;re always looking for exceptional people. Reach out and tell us what you&apos;d bring to the team.
            </p>
            <Link
              href="/contact"
              className="bg-[#1A1A1A] rounded-full px-7 h-10 text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all inline-flex items-center gap-2"
              style={{ color: "#F8F7F4" }}
            >
              Get in touch <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
