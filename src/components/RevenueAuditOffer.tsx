import Link from "next/link"
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Zap } from "lucide-react"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const PAYPAL_AUDIT_LINK = "https://paypal.me/PayVishnuMadhav?locale.x=en_US&country.x=AE"

const deliverables = [
  "Website and offer clarity audit",
  "SEO + conversion fixes ranked by impact",
  "AI agent / automation opportunity map",
  "3 fast changes you can apply immediately",
  "Upgrade path into a build sprint if you want us to implement",
]

export default function RevenueAuditOffer({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-12" : "py-16 md:py-20"} style={{ background: "#000", borderTop: BORDER, borderBottom: BORDER }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]" style={{ border: BORDER, background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.015))" }}>
          <div className="p-8 md:p-10" style={{ borderRight: BORDER }}>
            <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 18 }}>
              Revenue entry point
            </p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.9, fontSize: "clamp(38px,6vw,72px)", color: "#fff", marginBottom: 20 }}>
              $49 AI + WEBSITE AUDIT
            </h2>
            <p style={{ fontFamily: NV, fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.68)", maxWidth: 560 }}>
              A fast, practical audit for founders and local businesses that want more leads, better pages, and useful automation without starting with a large project.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/audit" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "13px 24px", textDecoration: "none" }}>
                Start audit page <ArrowRight size={12} />
              </Link>
              <Link href="/audit/sample-report" className="inline-flex items-center gap-2 hover:bg-white/[0.05] transition-colors" style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", border: BORDER, color: "#fff", padding: "13px 24px", textDecoration: "none" }}>
                See sample report <ArrowRight size={12} />
              </Link>
              <a href={PAYPAL_AUDIT_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:bg-white/[0.05] transition-colors" style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", border: BORDER, color: "#fff", padding: "13px 24px", textDecoration: "none" }}>
                Pay $49 now
              </a>
            </div>
          </div>

          <div className="p-8 md:p-10 grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3" style={{ border: BORDER }}>
              {[
                { icon: Sparkles, value: "24-48h", label: "Delivery target" },
                { icon: Zap, value: "3 fixes", label: "Minimum quick wins" },
                { icon: ShieldCheck, value: "Useful or refund", label: "Simple guarantee" },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="p-5" style={{ borderRight: index < 2 ? BORDER : undefined }}>
                    <Icon size={15} style={{ color: "#fff", marginBottom: 14 }} />
                    <div style={{ fontFamily: NV, fontWeight: 950, fontSize: 24, letterSpacing: "-0.05em", color: "#fff", marginBottom: 4 }}>{item.value}</div>
                    <div style={{ fontFamily: NV, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>{item.label}</div>
                  </div>
                )
              })}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3 items-start" style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.62)", lineHeight: 1.55 }}>
                  <CheckCircle2 size={14} style={{ color: "#fff", marginTop: 3, flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: NV, fontSize: 12, lineHeight: 1.65, color: "rgba(255,255,255,0.38)", margin: 0 }}>
              After payment, send your website URL and goal through the contact page. If the audit shows a clear build opportunity, we can turn it into a $499-$999 implementation sprint or a managed monthly system.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
