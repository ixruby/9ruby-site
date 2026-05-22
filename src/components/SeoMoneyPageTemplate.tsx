import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import ProductizedOfferLadder from "@/components/ProductizedOfferLadder"
import type { SeoMoneyPage } from "@/data/seo-money-pages"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

type Props = {
  page: SeoMoneyPage
}

export default function SeoMoneyPageTemplate({ page }: Props) {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "SEO landing pages" }, { label: page.eyebrow }]} />

      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p style={eyebrow}>{page.eyebrow}</p>
            <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.085em", lineHeight: 0.88, fontSize: "clamp(50px,9vw,112px)", color: "#fff", marginBottom: 24 }}>
              {page.title}
            </h1>
            <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", maxWidth: 760, marginBottom: 30 }}>
              {page.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={page.primaryCta.href} className="inline-flex items-center gap-2 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-black">
                {page.primaryCta.label} <ArrowRight size={13} />
              </Link>
              <Link href={page.secondaryCta.href} className="inline-flex items-center gap-2 border border-white/15 px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                {page.secondaryCta.label} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          <div className="grid gap-0" style={{ border: BORDER, background: "rgba(255,255,255,0.035)" }}>
            {page.quickStats.map(([value, label], index) => (
              <div key={label} className="flex items-baseline justify-between gap-5 p-5" style={{ borderBottom: index < page.quickStats.length - 1 ? BORDER : undefined }}>
                <strong style={{ fontFamily: NV, fontWeight: 950, fontSize: 26, letterSpacing: "-0.055em", color: "#fff" }}>{value}</strong>
                <span style={{ fontFamily: NV, fontSize: 10, fontWeight: 850, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textAlign: "right" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[340px_1fr]">
          <div>
            <p style={eyebrow}>Best fit</p>
            <h2 style={sectionTitle}>WHO THIS PAGE IS FOR</h2>
            <p className="mt-6 text-sm leading-7 text-white/55">
              This is the buyer-intent route for visitors who already know they need a website, lead path, or automation help.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {page.bestFor.map((item) => (
              <div key={item} className="p-5" style={{ border: BORDER, background: "rgba(255,255,255,0.025)" }}>
                <CheckCircle2 size={16} className="mb-4 text-white" />
                <p className="text-sm leading-7 text-white/62">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2">
          <div>
            <p style={eyebrow}>Revenue leaks</p>
            <h2 style={sectionTitle}>WHAT USUALLY BLOCKS LEADS</h2>
            <div className="mt-8 grid gap-3">
              {page.buyerProblems.map((problem) => (
                <p key={problem} className="flex gap-3 text-sm leading-7 text-white/65"><CheckCircle2 size={16} className="mt-1 shrink-0 text-white" />{problem}</p>
              ))}
            </div>
          </div>
          <div>
            <p style={eyebrow}>9Ruby system</p>
            <h2 style={sectionTitle}>WHAT WE BUILD OR FIX</h2>
            <div className="mt-8 grid gap-3">
              {page.system.map((item) => (
                <p key={item} className="flex gap-3 text-sm leading-7 text-white/65"><CheckCircle2 size={16} className="mt-1 shrink-0 text-white" />{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="p-6 md:p-8" style={{ border: BORDER, background: "rgba(255,255,255,0.04)" }}>
            <ShieldCheck size={20} className="mb-5 text-white" />
            <p style={eyebrow}>Proof-first process</p>
            <h2 className="mb-5 text-4xl font-black uppercase leading-none tracking-[-0.07em] text-white">START SMALL BEFORE THE BIG BUILD</h2>
            <p className="text-sm leading-7 text-white/58">{page.proofNote}</p>
          </div>
          <div>
            <p style={eyebrow}>Common questions</p>
            <div className="mt-4" style={{ border: BORDER }}>
              {page.faq.map(([question, answer], index) => (
                <div key={question} className="p-5" style={{ borderBottom: index < page.faq.length - 1 ? BORDER : undefined }}>
                  <h3 className="mb-2 text-sm font-black uppercase tracking-[0.08em] text-white">{question}</h3>
                  <p className="text-sm leading-7 text-white/55">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p style={eyebrow}>Related next steps</p>
              <h2 style={sectionTitle}>CHOOSE THE RIGHT ENTRY POINT</h2>
            </div>
            <Sparkles size={22} className="text-white" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {page.related.map((item) => (
              <Link key={item.href} href={item.href} className="group p-5 no-underline" style={{ border: BORDER, background: "rgba(255,255,255,0.025)" }}>
                <h3 className="mb-3 text-lg font-black uppercase tracking-[-0.04em] text-white group-hover:opacity-80">{item.label}</h3>
                <p className="mb-5 text-sm leading-7 text-white/55">{item.text}</p>
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-white">Open <ArrowRight size={12} /></span>
              </Link>
            ))}
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
