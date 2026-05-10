"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const faqs = [
  {
    q: "How long does it take to build a website or AI agent?",
    a: "Most websites ship in 2–4 weeks. AI agents and voice systems typically take 1–2 weeks for setup and testing. Black Tier custom builds vary by scope — we give you a timeline before you commit.",
  },
  {
    q: "Do I need to know anything about AI to work with 9Ruby?",
    a: "Not at all. We handle the full technical layer — agents, prompts, integrations, deployments. You just tell us what outcome you need, and we wire it up.",
  },
  {
    q: "What's included in the monthly retainer plans?",
    a: "Retainers include ongoing maintenance, content updates, SEO reports, AI agent monitoring, and priority support. The exact scope depends on your tier — see our Pricing page for a full breakdown.",
  },
  {
    q: "Can I start with one service and add more later?",
    a: "Yes. Most clients start with a website or AI agent, then layer in SEO, automation, or voice systems as the business grows. Everything we build is designed to connect.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We're a remote-first studio based in India with clients across the US, UK, UAE, and Southeast Asia. All projects are delivered in English.",
  },
  {
    q: "What makes 9Ruby different from a regular agency?",
    a: "We're AI-native — not just AI-assisted. Every project uses agents for research, generation, and quality checks, which means faster delivery, lower costs, and systems that keep improving. We're also a single studio, not a vendor network.",
  },
  {
    q: "Is there a free trial or way to test before committing?",
    a: "Yes — 9Ruby AI (ai.9ruby.com) gives you a free workspace to explore our AI tools, templates, and capabilities with no commitment required.",
  },
  {
    q: "How does billing and payment work?",
    a: "Project builds are billed 50% upfront, 50% on delivery. Monthly retainers are billed monthly. We accept all major cards and bank transfers. No hidden fees.",
  },
]

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative z-10 px-6 md:px-12 py-20 md:py-28" style={{ background: "#000", borderTop: BORDER }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[320px_1fr] gap-16 items-start">
          <div>
            <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
              * FAQ
            </p>
            <h2 className="uppercase" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.075em", lineHeight: 0.93, color: "#fff", marginBottom: 20 }}>
              COMMON<br />QUESTIONS
            </h2>
            <p style={{ fontFamily: NV, fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.44)" }}>
              Everything you need to know before working with us. Can&apos;t find your answer?{" "}
              <a href="/contact" style={{ color: "#C8102E", textDecoration: "none" }}>Talk to us.</a>
            </p>
          </div>

          <div style={{ border: BORDER }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? BORDER : undefined }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left flex items-start justify-between gap-6 transition-colors hover:bg-white/[0.02]"
                  style={{ padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <span style={{ fontFamily: NV, fontWeight: 800, fontSize: 14, color: "#fff", lineHeight: 1.4, flex: 1 }}>
                    {faq.q}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0, marginTop: 2 }}>
                    {open === i ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 24px 20px", fontFamily: NV, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
