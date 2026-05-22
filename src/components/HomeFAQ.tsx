"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ArabicAccent from "@/components/ArabicAccent"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const faqs = [
  {
    q: "How long does it take to build a website or AI agent?",
    a: "Most websites ship in 2-4 weeks. AI agents and voice systems typically take 1-2 weeks for setup and testing. Black Tier custom builds vary by scope - we give you a timeline before you commit.",
    intent: "websites",
  },
  {
    q: "Do I need to know anything about AI to work with 9Ruby?",
    a: "Not at all. We handle the full technical layer - agents, prompts, integrations, deployments. You just tell us what outcome you need, and we wire it up.",
    intent: "ai-agents",
  },
  {
    q: "What's included in the monthly retainer plans?",
    a: "Retainers include ongoing maintenance, content updates, SEO reports, AI agent monitoring, and priority support. The exact scope depends on your tier - see our Pricing page for a full breakdown.",
    intent: "automation",
  },
  {
    q: "Can I start with one service and add more later?",
    a: "Yes. Most clients start with a website or AI agent, then layer in SEO, automation, or voice systems as the business grows. Everything we build is designed to connect.",
    intent: "automation",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We're a Dubai-based, remote-first studio serving clients across the UAE, US, UK, India, and Southeast Asia. All projects are delivered in English.",
    intent: "websites",
  },
  {
    q: "What makes 9Ruby different from a regular agency?",
    a: "We're AI-native - not just AI-assisted. Every project uses agents for research, generation, and quality checks, which means faster delivery, lower costs, and systems that keep improving. We're also a single studio, not a vendor network.",
    intent: "ai-agents",
  },
  {
    q: "Is there a free trial or way to test before committing?",
    a: "Yes - 9Ruby AI (ai.9ruby.com) gives you a free workspace to explore our AI tools, templates, and capabilities with no commitment required.",
    intent: "tools",
  },
  {
    q: "How does billing and payment work?",
    a: "Project builds are billed 50% upfront, 50% on delivery. Monthly retainers are billed monthly. We accept all major cards and bank transfers. No hidden fees.",
    intent: "templates",
  },
]

export default function HomeFAQ() {
  return (
    <section className="relative z-10 px-6 md:px-12 py-10 md:py-12" style={{ background: "#000", borderTop: BORDER }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
          <div>
            <Badge variant="outline" className="mb-4 rounded-none border-border text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              * FAQ <ArabicAccent>أسئلة</ArabicAccent>
            </Badge>
            <h2 className="uppercase" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(1.25rem, 2.3vw, 2.05rem)", letterSpacing: 0, lineHeight: 1, color: "#fff", marginBottom: 12 }}>
              COMMON<br />QUESTIONS
            </h2>
            <p style={{ fontFamily: NV, fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.44)" }}>
              Everything you need to know before working with us. Can&apos;t find your answer?{" "}
              <Button asChild variant="link" className="h-auto rounded-none px-0 text-primary">
                <a href="/contact">Talk to us.</a>
              </Button>
            </p>
            <div className="home-faq-mini-ui" aria-label="FAQ coverage">
              <span>Scope</span>
              <span>AI</span>
              <span>Billing</span>
            </div>
          </div>

          <div className="home-faq-list">
            <Accordion type="single" collapsible>
              {faqs.slice(0, 5).map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`} className="border-border px-0">
                  <AccordionTrigger
                    data-living-intent={faq.intent}
                    data-living-id={`faq-${i}`}
                    className="rounded-none py-3 text-left text-xs font-extrabold text-foreground hover:no-underline"
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-xs leading-5 text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
