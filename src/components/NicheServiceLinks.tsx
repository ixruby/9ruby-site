import Link from "next/link"
import { ArrowRight } from "lucide-react"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const pages = [
  ["AI Receptionist for Clinics", "/services/ai-receptionist-for-clinics", "Capture patient inquiries, qualify them, and reduce front-desk load."],
  ["AI Lead System for Real Estate", "/services/ai-lead-system-for-real-estate", "Turn property/social traffic into buyer, seller, and valuation leads."],
  ["Conversion System for Local Services", "/services/website-conversion-system-for-local-services", "Turn mobile visitors into calls, quote requests, and booked jobs."],
  ["Website Revenue Monitor", "/services/website-revenue-monitor", "Weekly checks and monthly reports that keep website revenue leaks visible."],
]

export default function NicheServiceLinks() {
  return (
    <section className="py-14 md:py-20" style={{ background: "#000", borderBottom: BORDER }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-8">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.44)", marginBottom: 14 }}>Niche systems</p>
          <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.92, fontSize: "clamp(36px,6vw,68px)", color: "#fff", margin: 0 }}>SELL OUTCOMES BY INDUSTRY</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ border: BORDER }}>
          {pages.map(([title, href, desc], index) => (
            <Link key={href} href={href} className="group p-6 md:p-8" style={{ borderRight: index < pages.length - 1 ? BORDER : undefined }}>
              <h3 className="mb-4 text-2xl font-black uppercase leading-none tracking-[-0.05em] text-white">{title}</h3>
              <p className="mb-8 text-sm leading-7 text-white/60">{desc}</p>
              <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-white/50 group-hover:text-white">View system <ArrowRight size={13} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
