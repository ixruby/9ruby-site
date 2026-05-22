import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, ShieldCheck, Sparkles, Target } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

export const metadata: Metadata = {
  title: "Sample $49 AI + Website Audit Report | 9Ruby",
  description: "See the kind of practical website, SEO, conversion, and AI automation findings included in a 9Ruby $49 audit.",
}

const quickWins = [
  ["Clarify the first-screen promise", "Visitors should know who the site helps, what outcome they get, and the easiest next step within five seconds."],
  ["Move proof near the main CTA", "Reviews, before/after images, certifications, or real examples reduce hesitation before a visitor books or asks for a quote."],
  ["Add a follow-up path", "A simple intake form plus reply reminder can keep hot leads from going cold after they visit the site."],
]

const sections = [
  ["5-second clarity", "Does the hero explain the buyer, outcome, and next action before the visitor scrolls?"],
  ["Lead capture path", "Can a visitor easily book, call, request a quote, or send their website URL without hunting?"],
  ["SEO basics", "Are the title, description, service/location language, and content gaps visible enough to improve discovery?"],
  ["Trust signals", "Are proof assets close enough to the decision point to help a buyer believe the offer?"],
  ["AI opportunity", "What small automation could reduce missed leads, slow follow-up, or staff repetition?"],
]

const scoreRows = [
  ["Hero clarity", "Medium", "Promise is visible, but the next step can be sharper."],
  ["Primary CTA", "High", "One button should dominate above the fold."],
  ["Proof near CTA", "Medium", "Add one real result, review, or before/after asset close to the CTA."],
  ["Lead follow-up", "High", "Create a simple workflow so new inquiries are tagged and followed up quickly."],
]

export default function SampleAuditReportPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Audit", href: "/audit" }, { label: "Sample Report" }]} />

      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p style={eyebrow}>Sample deliverable</p>
            <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.085em", lineHeight: 0.88, fontSize: "clamp(50px,9vw,108px)", color: "#fff", marginBottom: 24 }}>
              SAMPLE $49 AUDIT REPORT
            </h1>
            <p className="max-w-[720px] text-lg leading-8 text-white/70">
              This is the style of practical report a buyer receives: a lead-readiness score, ranked fixes, one AI automation opportunity, and a clear implementation path.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/audit" className="inline-flex items-center gap-2 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-black">
                Buy the $49 audit <ArrowRight size={13} />
              </Link>
              <Link href="/services/website-revenue-monitor" className="inline-flex items-center gap-2 border border-white/15 px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                See monthly monitor <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          <div className="p-6 md:p-8" style={{ border: BORDER, background: "rgba(255,255,255,0.04)" }}>
            <p style={eyebrow}>Example score</p>
            <strong className="block text-7xl font-black tracking-[-0.08em] text-white">72/100</strong>
            <p className="mt-5 text-sm leading-7 text-white/55">
              Good foundation, but the fastest revenue lift is to make the next step clearer and put proof closer to the CTA.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                [FileText, "PDF/Markdown report"],
                [Target, "3 ranked quick wins"],
                [Sparkles, "1 AI opportunity"],
                [ShieldCheck, "Useful or refund"],
              ].map(([Icon, label]) => {
                const IconComponent = Icon as typeof FileText
                return <p key={label as string} className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.1em] text-white"><IconComponent size={14} />{label as string}</p>
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <p style={eyebrow}>What gets reviewed</p>
            <h2 style={sectionTitle}>REPORT SECTIONS</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {sections.map(([title, text]) => (
              <div key={title} className="p-5" style={{ border: BORDER, background: "rgba(255,255,255,0.03)" }}>
                <h3 className="mb-3 text-sm font-black uppercase tracking-[0.08em] text-white">{title}</h3>
                <p className="text-sm leading-7 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2">
          <div>
            <p style={eyebrow}>Example scorecard</p>
            <h2 style={sectionTitle}>WHAT THE REPORT LOOKS LIKE</h2>
            <div className="mt-8 overflow-hidden" style={{ border: BORDER }}>
              {scoreRows.map(([area, status, note], index) => (
                <div key={area} className="grid gap-3 p-4 md:grid-cols-[180px_100px_1fr]" style={{ borderBottom: index < scoreRows.length - 1 ? BORDER : undefined }}>
                  <strong className="text-sm text-white">{area}</strong>
                  <span className="text-xs font-black uppercase tracking-[0.1em] text-white/60">{status}</span>
                  <span className="text-sm leading-6 text-white/55">{note}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={eyebrow}>Three quick wins</p>
            <h2 style={sectionTitle}>THE CLIENT LEAVES WITH ACTIONS</h2>
            <div className="mt-8 grid gap-4">
              {quickWins.map(([title, text], index) => (
                <div key={title} className="p-5" style={{ border: BORDER }}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-black text-black">{index + 1}</span>
                    <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white">{title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-white/55">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[920px] text-center">
          <p style={{ ...eyebrow, textAlign: "center" }}>Next step after the report</p>
          <h2 style={{ ...sectionTitle, textAlign: "center" }}>AUDIT FIRST. THEN FIX THE HIGHEST-VALUE LEAK.</h2>
          <p className="mx-auto mt-6 max-w-[670px] text-base leading-8 text-white/60">
            The audit is designed to become a specific next move: a homepage fix pack, landing page sprint, lead capture automation, or the $99/month Website Revenue Monitor.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/audit" className="inline-flex items-center gap-2 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-black">
              Start the $49 audit <ArrowRight size={13} />
            </Link>
            <Link href="/contact?offer=sample-audit-report" className="inline-flex items-center gap-2 border border-white/15 px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white">
              Ask a question <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

const eyebrow = { fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.44)", marginBottom: 16 }
const sectionTitle = { fontFamily: NV, fontWeight: 950, textTransform: "uppercase" as const, letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(34px,5vw,64px)", color: "#fff", margin: 0 }
