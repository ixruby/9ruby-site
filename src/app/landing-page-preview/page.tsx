import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Eye, Globe2, Handshake, MousePointerClick, Sparkles, WalletCards } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import LandingPagePreviewForm from "@/components/LandingPagePreviewForm"
import ProductizedOfferLadder from "@/components/ProductizedOfferLadder"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

export const metadata: Metadata = {
  title: "Free Landing Page Preview | 9Ruby",
  description: "9Ruby creates a first landing-page concept for businesses with no website or outdated websites. Keep it only if you like it.",
}

const bestFor = [
  "No website yet",
  "Old or unclear website",
  "Weak mobile first impression",
  "No direct call, WhatsApp, booking, or form path",
  "Service business that needs more local leads",
]

const steps = [
  [Eye, "We review the business", "Send the business name plus any website, social profile, or Google listing you already have."],
  [Sparkles, "We create a first concept", "9Ruby drafts the landing-page direction: headline, sections, CTA, proof, and lead path."],
  [MousePointerClick, "You decide", "If you like it, we launch and manage it. If not, no pressure and no big commitment."],
  [Handshake, "We keep improving it", "Future changes, SEO pages, forms, automation, and lead systems can run through 9Ruby."],
]

const launchOptions = [
  ["Free preview", "$0", "First landing-page concept before you commit."],
  ["Simple launch", "$499", "One clean page with copy, CTA, basic SEO, and deployment."],
  ["Launch + form", "$749", "Landing page plus contact/booking form and owner notification."],
  ["Lead system", "$999", "Page, form, lead capture, CRM/payment path, and follow-up structure."],
]

const recurring = [
  ["Website Care", "$99/mo", "Small edits, website checks, and basic support."],
  ["Growth Care", "$299/mo", "Monthly page/CTA improvements, SEO ideas, and reports."],
  ["Managed Growth", "$750+/mo", "Website improvements, lead capture, automation, and growth execution."],
]

export default function LandingPagePreviewPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Free Landing Page Preview" }]} />

      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p style={eyebrow}>Preview first. Pay only if it makes sense.</p>
            <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.085em", lineHeight: 0.88, fontSize: "clamp(50px,9vw,112px)", color: "#fff", marginBottom: 24 }}>
              FREE LANDING PAGE PREVIEW
            </h1>
            <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", maxWidth: 760, marginBottom: 30 }}>
              If your business has no website, an outdated website, or a page that does not bring leads, 9Ruby can create a first landing-page concept before you commit. Keep it only if you like the direction.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#preview-form" className="inline-flex items-center gap-2 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-black">
                Request free preview <ArrowRight size={13} />
              </Link>
              <Link href="/audit/sample-report" className="inline-flex items-center gap-2 border border-white/15 px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                View sample report <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          <div className="p-6 md:p-8" style={{ border: BORDER, background: "rgba(255,255,255,0.04)" }}>
            <p style={eyebrow}>Best for</p>
            <div className="grid gap-3">
              {bestFor.map((item) => (
                <p key={item} className="flex gap-3 text-sm leading-7 text-white/65"><CheckCircle2 size={16} className="mt-1 shrink-0 text-white" />{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[340px_1fr]">
          <div>
            <p style={eyebrow}>How it works</p>
            <h2 style={sectionTitle}>SEE THE PAGE BEFORE YOU PAY.</h2>
          </div>
          <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4" style={{ border: BORDER }}>
            {steps.map(([Icon, title, text], index) => {
              const IconComponent = Icon as typeof Eye
              return (
                <div key={title as string} className="p-6" style={{ borderRight: index < steps.length - 1 ? BORDER : undefined, borderBottom: index < 2 ? BORDER : undefined }}>
                  <IconComponent size={18} className="mb-5 text-white" />
                  <h3 className="mb-3 text-base font-black uppercase tracking-[-0.02em] text-white">{title as string}</h3>
                  <p className="text-sm leading-7 text-white/55">{text as string}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2">
          <div>
            <p style={eyebrow}>Launch path</p>
            <h2 style={sectionTitle}>IF YOU LIKE IT, WE TURN IT INTO A REAL SITE.</h2>
            <p className="mt-6 text-sm leading-7 text-white/55">
              The preview is the trust step. The paid launch is where we make it real, connect the lead path, and start managing future improvements.
            </p>
          </div>
          <div className="grid gap-3">
            {launchOptions.map(([name, price, text]) => (
              <div key={name} className="p-5" style={{ border: BORDER, background: name === "Free preview" ? "rgba(255,255,255,0.06)" : "transparent" }}>
                <div className="mb-2 flex items-baseline justify-between gap-5">
                  <h3 className="text-xl font-black uppercase tracking-[-0.04em] text-white">{name}</h3>
                  <strong className="text-2xl font-black tracking-[-0.05em] text-white">{price}</strong>
                </div>
                <p className="text-sm leading-7 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="p-6 md:p-8" style={{ border: BORDER, background: "rgba(255,255,255,0.035)" }}>
            <Globe2 size={21} className="mb-5 text-white" />
            <p style={eyebrow}>Final fallback</p>
            <h2 className="mb-5 text-4xl font-black uppercase leading-none tracking-[-0.07em] text-white">NO-UPFRONT WEBSITE OPTION</h2>
            <p className="text-sm leading-7 text-white/58">
              If you like the page but budget is the blocker, we can discuss a managed/free-start option as the final fallback. 9Ruby keeps the first scope simple, manages the website, and future website changes, SEO pages, forms, automation, and growth work go through us.
            </p>
          </div>
          <div className="p-6 md:p-8" style={{ border: BORDER }}>
            <WalletCards size={21} className="mb-5 text-white" />
            <p style={eyebrow}>Recurring path</p>
            <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-[-0.07em] text-white">WEBSITE CARE PLANS</h2>
            <div className="grid gap-3">
              {recurring.map(([name, price, text]) => (
                <div key={name} className="border-t border-white/10 pt-4">
                  <div className="mb-1 flex items-baseline justify-between gap-5">
                    <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white">{name}</h3>
                    <strong className="text-lg font-black text-white">{price}</strong>
                  </div>
                  <p className="text-sm leading-6 text-white/50">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="preview-form" className="px-6 py-14 md:py-20" style={{ borderBottom: BORDER }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <p style={eyebrow}>Request preview</p>
            <h2 style={sectionTitle}>SEND THE BUSINESS NAME.</h2>
            <p className="mt-6 text-sm leading-7 text-white/55">
              You do not need a website yet. Send the business name, service type, and the action you want customers to take. We will reply with the best preview direction.
            </p>
          </div>
          <div className="p-6 md:p-8" style={{ border: BORDER, background: "rgba(255,255,255,0.025)" }}>
            <LandingPagePreviewForm />
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
