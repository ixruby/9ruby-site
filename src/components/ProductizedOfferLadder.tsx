import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const offers = [
  {
    name: "Free Landing Page Preview",
    price: "$0",
    speed: "preview first",
    promise: "For businesses with no website or an outdated website: see a first landing-page concept before paying.",
    items: ["concept first", "keep if you like it", "launch path"],
    href: "/landing-page-preview",
    cta: "Request preview",
  },
  {
    name: "AI + Website Audit",
    price: "$49",
    speed: "24-48h",
    promise: "Find the website, SEO, conversion, and AI follow-up fixes most likely to create revenue.",
    items: ["3+ quick wins", "automation idea", "implementation path"],
    href: "/audit",
    cta: "Start audit",
  },
  {
    name: "Homepage Fix Pack",
    price: "$149",
    speed: "24-48h",
    promise: "Rewrite the hero, CTA, section order, trust copy, and FAQ so visitors know what to do next.",
    items: ["copy rewrite", "CTA cleanup", "proof placement"],
    href: "/contact?offer=homepage-fix-pack",
    cta: "Request fix pack",
  },
  {
    name: "1-Day Landing Page",
    price: "$499+",
    speed: "1-3 days",
    promise: "Launch one focused page for one offer with copy, layout, CTA, form/payment link, and basic SEO.",
    items: ["offer page", "lead capture", "deploy-ready"],
    href: "/contact?offer=one-day-landing-page",
    cta: "Build a page",
  },
  {
    name: "Website Revenue Monitor",
    price: "$99/mo",
    speed: "weekly",
    promise: "Keep checking the website after launch with weekly health scans and a monthly revenue-leak report.",
    items: ["weekly scan", "monthly report", "fix queue"],
    href: "/services/website-revenue-monitor",
    cta: "Monitor site",
  },
  {
    name: "Lead Capture Automation",
    price: "$750+",
    speed: "3-5 days",
    promise: "Install a simple system that captures, qualifies, stores, and follows up with every inquiry.",
    items: ["intake form", "lead logging", "auto-reply"],
    href: "/contact?offer=lead-capture-automation",
    cta: "Automate leads",
  },
  {
    name: "AI Automation Sprint",
    price: "$1,500+",
    speed: "5 days",
    promise: "Automate one painful workflow: quote requests, booking, support triage, reviews, or follow-ups.",
    items: ["workflow map", "automation build", "handoff doc"],
    href: "/contact?offer=ai-automation-sprint",
    cta: "Scope sprint",
  },
]

export default function ProductizedOfferLadder({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-12 md:py-16" : "py-16 md:py-24"} style={{ background: "#000", borderBottom: BORDER }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.44)", marginBottom: 14 }}>
              Productized revenue systems
            </p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.9, fontSize: "clamp(38px,7vw,78px)", color: "#fff", margin: 0 }}>
              BUY THE NEXT<br />OBVIOUS STEP
            </h2>
          </div>
          <Link href="/revenue-score" className="inline-flex h-12 items-center justify-center gap-2 bg-white px-5 text-xs font-black uppercase text-black">
            Free revenue score <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ border: BORDER }}>
          {offers.map((offer, index) => (
            <div key={offer.name} className="flex min-h-[360px] flex-col p-6" style={{ borderRight: index < offers.length - 1 ? BORDER : undefined, borderBottom: index < offers.length - 1 ? BORDER : undefined, background: index === 0 ? "rgba(255,255,255,0.06)" : "transparent" }}>
              <p style={{ fontFamily: NV, fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.36)", marginBottom: 16 }}>{offer.speed}</p>
              <h3 style={{ fontFamily: NV, color: "#fff", fontSize: 22, lineHeight: 1, fontWeight: 950, letterSpacing: "-0.045em", textTransform: "uppercase", marginBottom: 14 }}>{offer.name}</h3>
              <div style={{ fontFamily: NV, fontWeight: 950, fontSize: 34, color: "#fff", letterSpacing: "-0.06em", marginBottom: 16 }}>{offer.price}</div>
              <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.58)", marginBottom: 18 }}>{offer.promise}</p>
              <ul className="mb-6 grid gap-2" style={{ listStyle: "none", padding: 0 }}>
                {offer.items.map((item) => (
                  <li key={item} className="flex gap-2 text-xs uppercase tracking-[0.08em] text-white/50">
                    <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-white" /> {item}
                  </li>
                ))}
              </ul>
              <Link href={offer.href} className="mt-auto inline-flex h-11 items-center justify-center gap-2 border border-white/15 px-4 text-[11px] font-black uppercase tracking-[0.12em] text-white hover:bg-white hover:text-black">
                {offer.cta} <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
