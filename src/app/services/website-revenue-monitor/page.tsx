import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, Radar, ShieldCheck, TrendingUp } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import ProductizedOfferLadder from "@/components/ProductizedOfferLadder"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

export const metadata: Metadata = {
  title: "Website Revenue Monitor | 9Ruby",
  description: "Weekly website checks and monthly revenue-leak reports for local businesses that want more leads without guessing what broke.",
}

const checks = [
  ["Lead path", "CTA visibility, contact/booking path, offer clarity, and form friction."],
  ["Technical health", "Uptime, broken links, obvious page errors, mobile clarity, and speed red flags."],
  ["Search basics", "Titles, descriptions, service page gaps, local SEO opportunities, and content ideas."],
  ["Trust signals", "Proof, reviews, before/after assets, pricing clarity, and FAQ coverage."],
  ["AI opportunity", "One practical automation or follow-up improvement to consider each month."],
]

const deliverables = [
  "Weekly automated website health check",
  "Monthly revenue-leak report with ranked fixes",
  "One implementation recommendation per report",
  "Follow-up reminders for unresolved issues",
  "Optional quote when you want 9Ruby to fix the leak",
]

const plans = [
  ["Monitor", "$99/mo", "Weekly checks + monthly report for one website."],
  ["Monitor + Fix Queue", "$199/mo", "Monthly report plus one small copy/CTA fix request."],
  ["Managed Growth", "$499+/mo", "Monitoring, fixes, landing pages, and lead-system improvements."],
]

export default function WebsiteRevenueMonitorPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: "Website Revenue Monitor" }]} />

      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p style={eyebrow}>Recurring website revenue checks</p>
            <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.085em", lineHeight: 0.88, fontSize: "clamp(50px,9vw,108px)", color: "#fff", marginBottom: 24 }}>
              WEBSITE REVENUE MONITOR
            </h1>
            <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", maxWidth: 720, marginBottom: 30 }}>
              Weekly website checks and monthly revenue-leak reports for local businesses that cannot afford broken CTAs, slow pages, missing proof, or stale follow-up paths.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact?offer=website-revenue-monitor" className="inline-flex items-center gap-2 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-black">
                Start $99/mo monitor <ArrowRight size={13} />
              </Link>
              <Link href="/audit" className="inline-flex items-center gap-2 border border-white/15 px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                Start with $49 audit <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          <div className="p-6 md:p-8" style={{ border: BORDER, background: "rgba(255,255,255,0.04)" }}>
            <p style={eyebrow}>Best for</p>
            <h2 className="mb-5 text-3xl font-black uppercase leading-none tracking-[-0.06em] text-white">Local sites that need steady leads</h2>
            <div className="grid gap-4">
              {[
                [Radar, "Weekly checks"],
                [Clock, "Monthly report"],
                [TrendingUp, "Fix queue upsells"],
                [ShieldCheck, "No long contract"],
              ].map(([Icon, label]) => {
                const IconComponent = Icon as typeof Radar
                return (
                  <div key={label as string} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <span className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.08em] text-white"><IconComponent size={15} />{label as string}</span>
                    <span className="text-xs text-white/40">included</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <p style={eyebrow}>What we watch</p>
            <h2 style={sectionTitle}>THE LEAKS THAT QUIETLY COST LEADS</h2>
            <p className="mt-6 text-sm leading-7 text-white/55">
              A site can look fine and still lose money because small things break, get stale, or never get checked after launch.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {checks.map(([title, text]) => (
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
            <p style={eyebrow}>Deliverables</p>
            <h2 style={sectionTitle}>WHAT ARRIVES EACH MONTH</h2>
            <div className="mt-8 grid gap-3">
              {deliverables.map((item) => (
                <p key={item} className="flex gap-3 text-sm leading-7 text-white/65"><CheckCircle2 size={16} className="mt-1 shrink-0 text-white" />{item}</p>
              ))}
            </div>
          </div>
          <div>
            <p style={eyebrow}>Starting plans</p>
            <h2 style={sectionTitle}>RECURRING REVENUE LADDER</h2>
            <div className="mt-8 grid gap-3">
              {plans.map(([name, price, text]) => (
                <div key={name} className="p-5" style={{ border: BORDER }}>
                  <div className="mb-2 flex items-baseline justify-between gap-5">
                    <h3 className="text-xl font-black uppercase tracking-[-0.04em] text-white">{name}</h3>
                    <strong className="text-2xl font-black tracking-[-0.05em] text-white">{price}</strong>
                  </div>
                  <p className="text-sm leading-7 text-white/55">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24" style={{ borderBottom: BORDER }}>
        <div className="mx-auto max-w-[920px] text-center">
          <p style={{ ...eyebrow, textAlign: "center" }}>Low-risk path</p>
          <h2 style={{ ...sectionTitle, textAlign: "center" }}>START WITH THE $49 AUDIT, THEN MONITOR WHAT MATTERS.</h2>
          <p className="mx-auto mt-6 max-w-[660px] text-base leading-8 text-white/60">
            The audit finds the first leaks. The monitor keeps checking the site so fixes, SEO gaps, and follow-up opportunities do not disappear after launch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/audit" className="inline-flex items-center gap-2 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-black">
              Buy the $49 audit <ArrowRight size={13} />
            </Link>
            <Link href="/contact?offer=website-revenue-monitor" className="inline-flex items-center gap-2 border border-white/15 px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white">
              Ask about monitor <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <ProductizedOfferLadder compact />
      <Footer />
    </main>
  )
}

const eyebrow = { fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.44)", marginBottom: 16 }
const sectionTitle = { fontFamily: NV, fontWeight: 950, textTransform: "uppercase" as const, letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(34px,5vw,64px)", color: "#fff", margin: 0 }
