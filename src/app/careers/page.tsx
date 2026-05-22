"use client"

import Link from "next/link"
import { Rocket, Brain, Compass, Shield, ArrowRight, MapPin, Clock, Briefcase } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import ArabicAccent from "@/components/ArabicAccent"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const values = [
  { icon: <Rocket size={16} />, title: "Ship Fast", desc: "We bias toward action. Ship early, iterate often, learn from real users. Perfect is the enemy of done." },
  { icon: <Brain size={16} />, title: "Think Deep", desc: "Move fast but don't be careless. Every decision is intentional. We think in systems, not features." },
  { icon: <Compass size={16} />, title: "Stay Curious", desc: "The landscape changes daily. We read, experiment, and stay ahead. Curiosity is our competitive edge." },
  { icon: <Shield size={16} />, title: "Own Your Work", desc: "No hand-holding. You own your projects end to end — from idea to production. Autonomy is earned and expected." },
]

const positions = [
  { title: "Senior Frontend Engineer", type: "Full-time", location: "Remote", description: "Build and ship production interfaces across the 9Ruby platform. You'll work with React, Next.js, and TypeScript to create fast, accessible, and beautiful products used by thousands of brands." },
  { title: "AI Agent Developer", type: "Full-time", location: "Remote", description: "Design, train, and deploy autonomous AI agents that power our platform. Deep experience with Python, large language models, and agent frameworks like LangChain or custom orchestration." },
  { title: "Product Designer", type: "Full-time", location: "Remote", description: "Shape the look and feel of every 9Ruby product. You'll own design systems, prototype in Figma, and collaborate closely with engineering to ship pixel-perfect interfaces." },
  { title: "Growth Marketing Lead", type: "Full-time", location: "Remote", description: "Own the full growth funnel from acquisition to retention. You'll run SEO, paid campaigns, and analytics to drive measurable revenue growth across all 9Ruby products." },
  { title: "DevOps Engineer", type: "Full-time", location: "Remote", description: "Keep our infrastructure fast, reliable, and scalable. You'll manage deployments on Vercel and AWS, build CI/CD pipelines, and containerize services with Docker." },
  { title: "Community Manager", type: "Part-time", location: "Remote", description: "Grow and nurture the 9Ruby developer community. You'll manage Discord, engage on GitHub, create content, and turn users into advocates." },
]

export default function CareersPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Careers" }]} />

      {/* HERO */}
      <section style={{ background: "#000" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }} className="arabic-row justify-center">Careers <ArabicAccent>وظائف</ArabicAccent></p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(56px,10vw,120px)", color: "#fff", marginBottom: 28 }}>
            JOIN THE<br />TEAM
          </h1>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 520, margin: "0 auto" }}>
            IX Ruby is a small, fast-moving team building AI-powered products that serve thousands of brands worldwide.
          </p>
        </div>
      </section>

      {/* CULTURE BLOCK */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ border: BORDER }}>
            <div className="p-10 md:p-14" style={{ borderRight: BORDER }}>
              <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>Culture</p>
              <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(28px,4vw,44px)", color: "#fff", marginBottom: 20 }}>
                HOW WE WORK
              </h2>
              <p style={{ fontFamily: NV, fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.5)" }}>
                We&apos;re a small team building big things. Remote-first, async, AI-augmented. We don&apos;t do standups or status meetings. We ship code, designs, and campaigns — then we measure what worked. Every person on the team has direct impact on the product and the business.
              </p>
            </div>
            <div className="p-10 md:p-14 flex flex-col gap-6">
              {[
                { label: "Team Size", value: "Small & focused" },
                { label: "Location", value: "Remote-first, Dubai-based" },
                { label: "Pace", value: "Ship weekly, measure daily" },
                { label: "AI augmented", value: "Yes — from day one" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between" style={{ paddingBottom: 16, borderBottom: BORDER }}>
                  <span style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{item.label}</span>
                  <span style={{ fontFamily: NV, fontSize: 13, color: "#fff" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12">
            <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }} className="arabic-row">* Values <ArabicAccent>قيمنا</ArabicAccent></p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#fff" }}>
              WHAT WE<br />STAND FOR
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: BORDER }}>
            {values.map((v, i) => (
              <div
                key={v.title}
                className="p-8 flex flex-col gap-5 hover:bg-white/[0.02] transition-colors"
                style={{ borderRight: i < 3 ? BORDER : undefined, borderBottom: BORDER }}
              >
                <div style={{ width: 36, height: 36, border: BORDER, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  {v.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.04em", fontSize: 16, color: "#fff", marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.44)" }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="py-16 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12">
            <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }} className="arabic-row">* Open Positions <ArabicAccent>فرص العمل</ArabicAccent></p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#fff" }}>
              CURRENT<br />OPENINGS
            </h2>
          </div>
          <div style={{ border: BORDER }}>
            {positions.map((pos, i) => (
              <div
                key={pos.title}
                className="p-8 md:p-10 hover:bg-white/[0.02] transition-colors"
                style={{ borderBottom: i < positions.length - 1 ? BORDER : undefined }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-4">
                  <div>
                    <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.04em", fontSize: "clamp(16px,2.5vw,22px)", color: "#fff", marginBottom: 10 }}>
                      {pos.title}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center gap-1.5" style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                        <MapPin size={11} /> {pos.location}
                      </span>
                      <span className="flex items-center gap-1.5" style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                        <Clock size={11} /> {pos.type}
                      </span>
                      <span className="flex items-center gap-1.5" style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                        <Briefcase size={11} /> IX Ruby Agency
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
                    style={{ fontFamily: NV, fontWeight: 800, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "9px 20px", textDecoration: "none" }}
                  >
                    Apply <ArrowRight size={10} />
                  </Link>
                </div>
                <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.44)", maxWidth: 700 }}>{pos.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#000" }} className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2rem,5vw,4rem)", color: "#fff", marginBottom: 16 }}>
              DON&apos;T SEE<br />YOUR ROLE?
            </h2>
            <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: 400 }}>
              We&apos;re always looking for exceptional people. Reach out and tell us what you&apos;d bring.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ fontFamily: NV, fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "12px 28px", textDecoration: "none" }}
            >
              Get In Touch <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
