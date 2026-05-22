import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, FileText, ShieldCheck, Sparkles, Zap } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AuditIntakeForm from "@/components/AuditIntakeForm"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"
const PAYPAL = "https://paypal.me/PayVishnuMadhav?locale.x=en_US&country.x=AE"

export const metadata = {
  title: "$49 AI + Website Audit | 9Ruby",
  description: "Get a practical 24-48 hour website, SEO, conversion, and AI automation audit from 9Ruby.",
}

const included = [
  "Website clarity review: what visitors understand in the first 5 seconds",
  "SEO and speed opportunities ranked by business impact",
  "Conversion fixes for CTA, pricing, proof, forms, and trust",
  "One AI agent or automation opportunity mapped to your workflow",
  "3 quick wins you can apply yourself immediately",
  "Recommended implementation sprint if you want 9Ruby to build it",
]

const steps = [
  { icon: ShieldCheck, title: "Pay $49", text: "Use the audit checkout link. No long contract, no retainer required." },
  { icon: FileText, title: "Send your URL", text: "Submit the intake form with your website, business type, and current problem." },
  { icon: Clock, title: "Get audit in 24-48h", text: "Receive practical fixes, not vague theory. We prioritize what can create revenue fastest." },
  { icon: Zap, title: "Fix or upgrade", text: "Apply it yourself or ask 9Ruby to implement it as a $499-$999 sprint." },
]

const sampleFindings = [
  {
    area: "Hero clarity",
    issue: "The homepage explains the brand but not the buyer outcome quickly enough.",
    fix: "Add a first-screen promise, proof strip, and one dominant audit CTA.",
  },
  {
    area: "Lead capture",
    issue: "Visitors can browse services but may not know the easiest first step.",
    fix: "Route every high-intent page into a short website URL intake form.",
  },
  {
    area: "Automation opportunity",
    issue: "New leads are not automatically qualified, tagged, and followed up.",
    fix: "Add an AI/CRM workflow that scores leads and creates a reply draft within minutes.",
  },
]

const faqs = [
  ["What do I receive?", "A practical audit summary with ranked fixes, SEO/conversion notes, and one AI automation opportunity. We keep it focused on action, not filler."],
  ["Do I need a call first?", "No. Pay, send the URL/intake, and we can start. If the project needs more context, we will ask one short follow-up."],
  ["Can you implement the fixes?", "Yes. If the audit reveals clear upside, we can quote a $499-$999 implementation sprint or a monthly managed system."],
  ["What if it is not useful?", "Tell us what missed the mark. We will either revise the audit or refund it."],
]

export default function AuditPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-end">
          <div>
            <p style={eyebrow}>Revenue entry point</p>
            <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.085em", lineHeight: 0.88, fontSize: "clamp(52px,9vw,116px)", color: "#fff", marginBottom: 24 }}>
              $49 AI + WEBSITE AUDIT
            </h1>
            <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", maxWidth: 700, marginBottom: 30 }}>
              Get a practical teardown of your website, offer, SEO, and automation opportunities within 24-48 hours. Built for founders and local businesses that want more leads without starting with a big project.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={PAYPAL} target="_blank" rel="noopener noreferrer" style={primaryCta} className="inline-flex items-center gap-2">
                Buy audit for $49 <ArrowRight size={12} />
              </a>
              <Link href="#intake" style={secondaryCta} className="inline-flex items-center gap-2">
                Send website URL <ArrowRight size={12} />
              </Link>
              <Link href="/audit/sample-report" style={secondaryCta} className="inline-flex items-center gap-2">
                View sample report <ArrowRight size={12} />
              </Link>
            </div>
          </div>
          <div style={{ border: BORDER, background: "rgba(255,255,255,0.035)" }} className="p-6 md:p-8">
            <div className="grid gap-4">
              {[
                ["24-48h", "delivery target"],
                ["3+", "minimum quick wins"],
                ["$499-$999", "implementation sprint path"],
                ["Useful or refund", "simple guarantee"],
              ].map(([value, label]) => (
                <div key={label} className="flex items-baseline justify-between gap-5" style={{ borderBottom: BORDER, paddingBottom: 14 }}>
                  <strong style={{ fontFamily: NV, fontWeight: 950, fontSize: 24, letterSpacing: "-0.05em", color: "#fff" }}>{value}</strong>
                  <span style={{ fontFamily: NV, fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", textAlign: "right" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
          <div>
            <p style={eyebrow}>How it works</p>
            <h2 style={sectionTitle}>PAY. SEND URL. GET FIXES.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: BORDER }}>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="p-6" style={{ borderRight: index < steps.length - 1 ? BORDER : undefined, borderBottom: index < 2 ? BORDER : undefined }}>
                  <Icon size={17} style={{ color: "#fff", marginBottom: 18 }} />
                  <h3 style={{ fontFamily: NV, color: "#fff", fontSize: 16, fontWeight: 900, marginBottom: 10 }}>{step.title}</h3>
                  <p style={bodySmall}>{step.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
          <div>
            <p style={eyebrow}>Included</p>
            <h2 style={sectionTitle}>WHAT WE CHECK</h2>
            <ul className="mt-8 grid gap-3" style={{ listStyle: "none", padding: 0 }}>
              {included.map((item) => (
                <li key={item} className="flex gap-3" style={{ color: "rgba(255,255,255,0.68)", lineHeight: 1.55, fontSize: 14 }}>
                  <CheckCircle2 size={15} style={{ marginTop: 3, flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ border: BORDER }} className="p-6 md:p-8">
            <p style={eyebrow}>Sample audit output</p>
            <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.055em", color: "#fff", fontSize: "clamp(28px,4vw,44px)", lineHeight: 0.95, marginBottom: 24 }}>
              EXAMPLE FINDINGS
            </h3>
            <div className="grid gap-4">
              {sampleFindings.map((item) => (
                <div key={item.area} style={{ borderTop: BORDER, paddingTop: 16 }}>
                  <strong style={{ display: "block", color: "#fff", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{item.area}</strong>
                  <p style={bodySmall}><span style={{ color: "rgba(255,255,255,0.82)" }}>Issue:</span> {item.issue}</p>
                  <p style={bodySmall}><span style={{ color: "rgba(255,255,255,0.82)" }}>Fix:</span> {item.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="intake" className="py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10">
          <div>
            <p style={eyebrow}>Audit intake</p>
            <h2 style={sectionTitle}>SEND THE WEBSITE URL</h2>
            <p style={{ ...bodySmall, fontSize: 14, marginTop: 18 }}>
              Best flow: pay the $49 audit, then submit this form. If you want to ask before paying, submit the form and we will reply with the fastest next step.
            </p>
          </div>
          <div style={{ border: BORDER, background: "rgba(255,255,255,0.025)" }} className="p-6 md:p-8">
            <AuditIntakeForm />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="max-w-[900px] mx-auto px-6">
          <p style={{ ...eyebrow, textAlign: "center" }}>FAQ</p>
          <h2 style={{ ...sectionTitle, textAlign: "center", marginBottom: 34 }}>COMMON QUESTIONS</h2>
          <div style={{ border: BORDER }}>
            {faqs.map(([q, a], index) => (
              <div key={q} style={{ padding: "20px 24px", borderBottom: index < faqs.length - 1 ? BORDER : undefined }}>
                <h3 style={{ margin: "0 0 8px", color: "#fff", fontSize: 15, fontWeight: 900 }}>{q}</h3>
                <p style={bodySmall}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[960px] mx-auto px-6 text-center">
          <Sparkles size={22} style={{ color: "#fff", margin: "0 auto 18px" }} />
          <h2 style={{ ...sectionTitle, fontSize: "clamp(42px,7vw,82px)", textAlign: "center" }}>START WITH ONE SMALL PAID STEP.</h2>
          <p style={{ fontFamily: NV, fontSize: 16, lineHeight: 1.65, color: "rgba(255,255,255,0.62)", maxWidth: 620, margin: "18px auto 28px" }}>
            One useful audit can become a website fix, an automation sprint, or a managed monthly growth system.
          </p>
          <a href={PAYPAL} target="_blank" rel="noopener noreferrer" style={primaryCta} className="inline-flex items-center gap-2">
            Buy audit for $49 <ArrowRight size={12} />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}

const eyebrow = { fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.48)", marginBottom: 16 }
const sectionTitle = { fontFamily: NV, fontWeight: 950, textTransform: "uppercase" as const, letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(34px,5vw,64px)", color: "#fff", margin: 0 }
const bodySmall = { fontFamily: NV, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.52)", margin: 0 }
const primaryCta = { fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" as const, background: "#fff", color: "#080808", padding: "14px 24px", textDecoration: "none" }
const secondaryCta = { fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" as const, border: BORDER, color: "#fff", padding: "13px 24px", textDecoration: "none" }
