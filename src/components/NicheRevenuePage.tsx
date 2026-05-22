import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import ProductizedOfferLadder from "@/components/ProductizedOfferLadder"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

type Props = {
  eyebrow: string
  title: string
  subtitle: string
  audience: string
  pains: string[]
  system: string[]
  automation: string
  offer: string
  slug: string
}

export default function NicheRevenuePage(props: Props) {
  return (
    <main style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: props.audience }]} />
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_400px] lg:items-end">
          <div>
            <p style={eyebrow}>{props.eyebrow}</p>
            <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.085em", lineHeight: 0.88, fontSize: "clamp(50px,9vw,108px)", color: "#fff", marginBottom: 24 }}>
              {props.title}
            </h1>
            <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", maxWidth: 720, marginBottom: 30 }}>
              {props.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/audit" className="inline-flex items-center gap-2 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-black">
                Get the $49 audit <ArrowRight size={13} />
              </Link>
              <Link href="/revenue-score" className="inline-flex items-center gap-2 border border-white/15 px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                Free revenue score <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          <div className="p-6 md:p-8" style={{ border: BORDER, background: "rgba(255,255,255,0.04)" }}>
            <p style={eyebrow}>Best first paid step</p>
            <h2 className="mb-4 text-3xl font-black uppercase leading-none text-white">{props.offer}</h2>
            <p className="text-sm leading-7 text-white/60">Start small, prove the leaks, then implement only what can create business value.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2">
          <div>
            <p style={eyebrow}>Revenue leaks</p>
            <h2 style={sectionTitle}>WHAT USUALLY BREAKS</h2>
            <div className="mt-8 grid gap-3">
              {props.pains.map((pain) => (
                <p key={pain} className="flex gap-3 text-sm leading-7 text-white/65"><CheckCircle2 size={16} className="mt-1 shrink-0 text-white" />{pain}</p>
              ))}
            </div>
          </div>
          <div>
            <p style={eyebrow}>9Ruby system</p>
            <h2 style={sectionTitle}>WHAT WE INSTALL</h2>
            <div className="mt-8 grid gap-3">
              {props.system.map((item) => (
                <p key={item} className="flex gap-3 text-sm leading-7 text-white/65"><CheckCircle2 size={16} className="mt-1 shrink-0 text-white" />{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <p style={eyebrow}>First 48 hours</p>
            <h2 style={sectionTitle}>WHAT THE $49 AUDIT CHECKS FIRST</h2>
            <p className="mt-6 text-sm leading-7 text-white/55">
              Before a bigger build, we look for the few conversion leaks most likely to cost {props.audience.toLowerCase()} real inquiries.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["Booking path", "Can a high-intent visitor find the right next step without thinking?"],
              ["Intake quality", "Does the form or call path capture enough context for staff to act fast?"],
              ["Follow-up gap", "What should happen automatically when someone asks but does not book?"],
            ].map(([title, text]) => (
              <div key={title} className="p-5" style={{ border: BORDER, background: "rgba(255,255,255,0.03)" }}>
                <h3 className="mb-3 text-sm font-black uppercase tracking-[0.08em] text-white">{title}</h3>
                <p className="text-sm leading-7 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto max-w-[900px] text-center">
          <p style={{ ...eyebrow, textAlign: "center" }}>AI automation angle</p>
          <h2 style={{ ...sectionTitle, textAlign: "center" }}>{props.automation}</h2>
          <p className="mx-auto mt-6 max-w-[650px] text-base leading-8 text-white/60">
            We start with a score or audit, then build the smallest system that captures, qualifies, follows up, and reports on leads.
          </p>
        </div>
      </section>

      <ProductizedOfferLadder compact />
      <Footer />
    </main>
  )
}

const eyebrow = { fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.44)", marginBottom: 16 }
const sectionTitle = { fontFamily: NV, fontWeight: 950, textTransform: "uppercase" as const, letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(34px,5vw,64px)", color: "#fff", margin: 0 }
