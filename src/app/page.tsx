import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeFAQ from "@/components/HomeFAQ";
import RevenueAuditOffer from "@/components/RevenueAuditOffer";
import Link from "next/link";
import ArabicAccent from "@/components/ArabicAccent";
import HomeCardSwap from "@/components/home/HomeCardSwap";
import {
  LivingFinalCta,
  LivingHomeProvider,
  LivingProjectsSection,
  LivingServiceTagline,
  LivingServicesSection,
  LivingTextSlot,
} from "@/components/home/LivingHome";
import { agencySystemLanes, processSteps, testimonials } from "@/lib/home-content";

export const metadata = {
  title: "9Ruby — AI agents, websites, and voice systems",
  description: "AI agents, websites, voice systems, and automation built by IX Ruby. Start with AI or explore services.",
};

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif";
const BORDER = "0.8px solid rgba(255,255,255,0.12)";
const KICKER = {
  fontFamily: NV,
  fontSize: 11,
  letterSpacing: 0,
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.42)",
};

const ecosystemLabels = [
  "9Ruby",
  "Dubai studio",
  "AI agents",
  "Voice systems",
  "Websites",
  "Automation",
  "SEO",
  "Tools",
  "Templates",
] as const;

const systemCells = [
  { num: "01", label: "Website", value: "Front door" },
  { num: "02", label: "Tools", value: "Free entry" },
  { num: "03", label: "AI", value: "Smart help" },
  { num: "04", label: "CTA", value: "Client path" },
] as const;

const proofCells = [
  { label: "Mode", value: "Small systems" },
  { label: "Build", value: "Fast loops" },
  { label: "Output", value: "Public polish" },
] as const;

const seoEntryPoints = [
  {
    label: "Have an existing website?",
    title: "$49 Website Audit",
    text: "Find the SEO, conversion, CTA, and automation leaks before spending on a rebuild.",
    href: "/audit",
    action: "Start audit",
  },
  {
    label: "No website or outdated site?",
    title: "Free Landing-Page Preview",
    text: "Let 9Ruby create the first concept first; launch it only if the direction makes sense.",
    href: "/landing-page-preview",
    action: "Request preview",
  },
  {
    label: "Need a new lead system?",
    title: "AI Lead Capture System",
    text: "Improve forms, qualification, routing, and safe AI-assisted follow-up opportunities.",
    href: "/ai-lead-capture-system",
    action: "See system",
  },
  {
    label: "Searching for a Dubai web partner?",
    title: "Dubai Business Website Design",
    text: "Local-facing websites, landing pages, SEO routes, and care plans for Dubai businesses.",
    href: "/dubai-business-website-design",
    action: "Open page",
  },
] as const;

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col" style={{ background: "#080808" }}>
      <LivingHomeProvider>
        <Navbar />

      {/* ── HERO ── */}
      <section className="living-hero-stage relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#080808" }} data-living-rail-section="hero">
        {/* Backdrop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img aria-hidden alt="" src="/images/hero-banner.gif" className="absolute inset-0 w-full h-full object-cover object-center" />
        {/* Vignette */}
        <div aria-hidden className="absolute inset-0" style={{ background: ["linear-gradient(rgba(0,0,0,0.22), rgba(0,0,0,0.02) 46%, rgba(0,0,0,0.58))", "radial-gradient(circle at 8% 50%, rgba(0,0,0,0.78), rgba(0,0,0,0.34) 34%, rgba(0,0,0,0) 62%)", "radial-gradient(circle at 92% 50%, rgba(0,0,0,0.5), transparent 45%)"].join(", ") }} />
        {/* Neutral wash */}
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.70), rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.22))" }} />

        <div className="flex-1" />

        {/* Bottom row */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_520px] items-end gap-8 px-4 md:px-8 pb-8 md:pb-12">
          <div>
            <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.66)", marginBottom: 16 }}>
              AI websites, agents, and automation
            </p>
            <h1 className="select-none uppercase m-0" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(4rem, 15vw, 13rem)", letterSpacing: "-0.086em", lineHeight: 0.74, color: "#fff" }}>
              RUBY
              <sup style={{ fontSize: "0.22em", verticalAlign: "super", color: "rgba(255,255,255,0.35)", fontStyle: "normal", letterSpacing: 0 }}>®</sup>
            </h1>
          </div>
          <div style={{ border: BORDER, background: "rgba(0,0,0,0.48)", backdropFilter: "blur(14px)" }} className="p-6 md:p-7">
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.94, fontSize: "clamp(30px,4.6vw,54px)", color: "#fff", marginBottom: 16 }}>
              Turn visitors into booked clients.
            </h2>
            <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", marginBottom: 22 }}>
              Start with a $49 AI + Website Audit. Get practical conversion fixes, SEO opportunities, and one automation roadmap in 24-48 hours.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/audit" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "13px 22px", textDecoration: "none" }}>
                Start $49 audit
              </Link>
              <Link href="/cases" className="inline-flex items-center gap-2 hover:bg-white/[0.05] transition-colors" style={{ fontFamily: NV, fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", border: BORDER, color: "#fff", padding: "12px 22px", textDecoration: "none" }}>
                See work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14" style={{ background: "#000", borderTop: BORDER, borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4" style={{ border: BORDER }}>
          {[
            ["24-48h", "audit delivery"],
            ["3 fixes", "minimum quick wins"],
            ["$49", "low-risk first step"],
            ["$499-$999", "implementation sprint path"],
          ].map(([value, label], index) => (
            <div key={label} className="p-6 text-center" style={{ borderRight: index < 3 ? BORDER : undefined }}>
              <div style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(24px,4vw,38px)", letterSpacing: "-0.06em", color: "#fff", marginBottom: 6 }}>{value}</div>
              <div style={{ fontFamily: NV, fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        className="home-canonical-about relative z-10 px-6 md:px-12"
        style={{ background: "#0A0A0A", borderTop: BORDER }}
        data-living-section-id="about"
        data-living-rail-section="about"
      >
        <div className="home-canonical-wrap">
          <div className="home-canonical-about__grid">
            <div>
              <p style={KICKER} className="arabic-row">* About <ArabicAccent>عن ٩ روبي</ArabicAccent></p>
              <div className="mt-8 hidden h-px w-full bg-white/15 lg:block" />
              <p className="home-canonical-sidecopy">
                One Dubai-based public front door for client work, AI systems, tools, templates, and the 9Ruby ecosystem.
              </p>
            </div>

            <div>
              <h2 className="home-canonical-statement">
                AI-FIRST WEBSITES, AGENTS, AND AUTOMATION.{" "}
                <span>BUILT TO TURN ATTENTION INTO CLIENTS.</span>
              </h2>
              <p className="home-canonical-copy">
                <LivingTextSlot
                  slotId="about-body"
                  fallback="We design and build the public website, the AI workflows, and the tools behind it so visitors understand the offer and know exactly how to start."
                  speed={12}
                />
              </p>
              <div className="home-system-grid" aria-label="9Ruby public system map">
                {systemCells.map((cell) => (
                  <div key={cell.num} className="home-system-cell">
                    <span>{cell.num}</span>
                    <strong>{cell.label}</strong>
                    <em>{cell.value}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="home-capability-strip" aria-label="9Ruby public ecosystem">
            <div className="home-capability-strip__track">
              {[...ecosystemLabels, ...ecosystemLabels].map((label, index) => (
                <span key={`${label}-${index}`}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RevenueAuditOffer />

      <section
        className="relative z-10 px-6 md:px-12 py-14 md:py-20"
        style={{ background: "#080808", borderTop: BORDER, borderBottom: BORDER }}
        data-living-rail-section="seo-routes"
      >
        <div className="home-canonical-wrap">
          <div className="mb-9 grid gap-6 lg:grid-cols-[0.38fr_1fr] lg:items-end">
            <div>
              <p style={KICKER} className="arabic-row">* Search routes <ArabicAccent>مسارات البحث</ArabicAccent></p>
              <h2 className="mt-5" style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.92, fontSize: "clamp(38px,6vw,74px)", color: "#fff" }}>
                FIND THE RIGHT FIRST STEP.
              </h2>
            </div>
            <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.58)", maxWidth: 680 }}>
              9Ruby now routes high-intent visitors by the problem they searched for: audit an existing website, preview a new landing page, build a lead-capture system, or launch a Dubai business website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4" style={{ border: BORDER }}>
            {seoEntryPoints.map((entry, index) => (
              <Link key={entry.href} href={entry.href} className="group p-6 no-underline" style={{ borderRight: index < seoEntryPoints.length - 1 ? BORDER : undefined, background: "rgba(255,255,255,0.025)" }}>
                <span style={{ fontFamily: NV, fontSize: 10, fontWeight: 850, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>{entry.label}</span>
                <h3 className="mt-5 mb-4" style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.96, fontSize: "clamp(26px,3vw,38px)", color: "#fff" }}>{entry.title}</h3>
                <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.55)", minHeight: 86 }}>{entry.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-white group-hover:opacity-75">
                  {entry.action} +
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENCY SYSTEM ── */}
      <section
        className="home-agency-system relative z-10 px-6 md:px-12"
        style={{ background: "#080808", borderTop: BORDER }}
        data-living-rail-section="system"
      >
        <div className="home-canonical-wrap">
          <div className="home-agency-system__head">
            <div>
              <p style={KICKER} className="arabic-row">* 9Ruby system <ArabicAccent>نظام ٩ روبي</ArabicAccent></p>
              <h2>ONE BRAND.<br />CLEAR ENTRY POINTS.</h2>
            </div>
            <p>
              Services, products, tools, templates, operations, and resources now live as one official 9Ruby system.
              The fastest path is simple: start with the $49 audit, then upgrade only if the fixes are worth building.
            </p>
          </div>

          <div className="home-agency-system__grid">
            {agencySystemLanes.map((lane, index) => (
              <Link key={lane.title} href={lane.href} className="home-agency-lane">
                <span className="home-agency-lane__index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <em>{lane.label}</em>
                  <h3>{lane.title}</h3>
                </div>
                <ul>
                  {lane.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="home-agency-lane__action">Open</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LivingServicesSection />

      <LivingProjectsSection />

      {/* ── WORK PROCESS ── */}
      <section
        className="home-process-section relative z-10 px-6 md:px-12"
        style={{ background: "#080808", borderTop: BORDER }}
        data-living-section-id="process"
        data-living-rail-section="process"
      >
        <div className="home-canonical-wrap">
          <div className="home-process-head">
            <div>
              <p style={KICKER} className="arabic-row">* Process <ArabicAccent>منهج العمل</ArabicAccent></p>
              <h2 className="home-process-title">WORK<br />PROCESS</h2>
            </div>
            <p className="home-process-intro">
              <LivingTextSlot
                slotId="process-intro"
                fallback="See how our process turns your offer into a sharper website, connected tools, and client-ready automation."
                speed={14}
              />
            </p>
          </div>

          <div className="home-process-board">
            {processSteps.map((step, i) => (
              <article key={step.num} className={`home-process-card home-process-card--${i + 1}`}>
                <span className="home-process-card__num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
                <span className="home-process-card__line" aria-hidden />
              </article>
            ))}
          </div>
        </div>
      </section>

      <LivingServiceTagline />

      {/* ── FEATURED TEMPLATES ── */}
      <section
        className="home-template-showcase relative z-10 px-6 md:px-12"
        style={{ background: "#080808", borderTop: BORDER }}
        data-living-section-id="templates"
        data-living-rail-section="templates"
      >
        <div className="home-canonical-wrap home-template-showcase__grid">
          <div>
            <p style={KICKER} className="arabic-row">* Templates <ArabicAccent>قوالب رقمية</ArabicAccent></p>
            <h2 className="home-template-showcase__title">FAST STARTS<br />FOR REAL SITES</h2>
            <p className="home-template-showcase__copy">
              Browse live 9Ruby website previews, pick a direction, and ask us to customize the structure, visuals,
              copy, and integrations around your business.
            </p>
            <Link href="/templates" className="home-template-showcase__cta">
              Browse templates
              <span aria-hidden>+</span>
            </Link>
          </div>

          <HomeCardSwap />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative z-10 px-6 md:px-12 py-12 md:py-16" style={{ background: "#080808", borderTop: BORDER }}>
        <div className="home-canonical-wrap grid lg:grid-cols-[0.34fr_1fr] gap-8 lg:gap-14">
          <div>
            <p style={KICKER} className="arabic-row">* Client proof <ArabicAccent>ثقة العملاء</ArabicAccent></p>
            <p className="mt-8 max-w-[250px] text-[13px] leading-relaxed" style={{ fontFamily: NV, color: "rgba(255,255,255,0.44)" }}>
              Practical systems, launched fast, with the polish expected from a serious front-facing brand.
            </p>
            <div className="home-side-mini-panel" aria-label="Delivery summary">
              {proofCells.map((cell) => (
                <span key={cell.label}>
                  <em>{cell.label}</em>
                  <strong>{cell.value}</strong>
                </span>
              ))}
            </div>
          </div>
          <div className="home-testimonial-stack">
            <blockquote>
              &ldquo;{testimonials[0].quote}&rdquo;
            </blockquote>
            <div className="home-testimonial-author">
              <strong>{testimonials[0].name}</strong>
              <span>{testimonials[0].role}</span>
            </div>
            <div className="home-mini-proof-grid">
              {testimonials.slice(1).map((t) => (
                <div key={t.name} className="home-mini-proof">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <span>{t.name} · {t.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <HomeFAQ />

      <LivingFinalCta />

      <Footer />
      </LivingHomeProvider>
    </main>
  );
}
