import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoMarquee from "@/components/LogoMarquee";
import HomeWhy from "@/components/HomeWhy";
import HomeFAQ from "@/components/HomeFAQ";
import {
  LivingFinalCta,
  LivingHeroBar,
  LivingHomeProvider,
  LivingProjectsSection,
  LivingServiceTagline,
  LivingServicesSection,
} from "@/components/home/LivingHome";
import { processSteps, stats, testimonials } from "@/lib/home-content";

export const metadata = {
  title: "9Ruby — AI agents, websites, and voice systems",
  description: "AI agents, websites, voice systems, and automation built by IX Ruby. Start with AI or explore services.",
};

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const BORDER = "0.8px solid rgba(255,255,255,0.12)";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col" style={{ background: "#000" }}>
      <LivingHomeProvider>
        <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#8C000E" }}>
        {/* Backdrop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img aria-hidden alt="" src="/images/hero-banner.gif" className="absolute inset-0 w-full h-full object-cover object-center" />
        {/* Vignette */}
        <div aria-hidden className="absolute inset-0" style={{ background: ["linear-gradient(rgba(20,0,2,0.24), rgba(80,0,7,0.02) 46%, rgba(40,0,4,0.36))", "radial-gradient(circle at 8% 50%, rgba(12,0,2,0.72), rgba(52,0,5,0.3) 32%, rgba(149,0,12,0) 58%)", "radial-gradient(circle at 92% 50%, rgba(12,0,2,0.5), transparent 45%)"].join(", ") }} />
        {/* Redwash */}
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(28,0,4,0.66), rgba(148,0,14,0.08) 50%, rgba(240,0,12,0.46))" }} />

        <LivingHeroBar />

        <div className="flex-1" />

        {/* Bottom row */}
        <div className="relative z-10 flex items-end justify-between px-4 md:px-8 pb-8 md:pb-12 gap-4">
          <h1 className="select-none uppercase m-0" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(5rem, 18vw, 15rem)", letterSpacing: "-0.086em", lineHeight: 0.74, color: "#fff" }}>
            RUBY
            <sup style={{ fontSize: "0.22em", verticalAlign: "super", color: "rgba(255,255,255,0.35)", fontStyle: "normal", letterSpacing: 0 }}>®</sup>
          </h1>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="relative z-10 px-6 md:px-12 py-20 md:py-28" style={{ background: "#000" }}>
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
          <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>* About</p>
          <div>
            <p className="uppercase" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(1.1rem, 2.4vw, 1.56rem)", letterSpacing: "-0.063em", lineHeight: 1.22, color: "#F2F2F2" }}>
              WE&apos;RE AN AI-FIRST STUDIO BUILDING{" "}
              <span style={{ color: "rgba(255,255,255,0.44)" }}>
                VOICE AGENTS, WEBSITES, AND AUTOMATION FOR THE MODERN OPERATOR.
                FROM SOLO FOUNDERS TO SCALING BRANDS, WE TURN IDEAS INTO SYSTEMS THAT WORK.
              </span>
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/services" className="inline-flex items-center gap-2 transition-all hover:opacity-90" style={{ background: "#C8102E", color: "#fff", fontFamily: NV, fontWeight: 800, fontSize: 11, padding: "9px 22px", letterSpacing: "-0.01em", textTransform: "uppercase", textDecoration: "none" }}>
                Explore services <ArrowRight size={11} />
              </Link>
              <Link href="/about" className="inline-flex items-center transition-all hover:opacity-80" style={{ border: "0.8px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)", fontFamily: NV, fontWeight: 700, fontSize: 11, padding: "9px 22px", letterSpacing: "-0.01em", textTransform: "uppercase", textDecoration: "none" }}>
                About us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGO MARQUEE ── */}
      <LogoMarquee />

      {/* ── WHY 9RUBY ── */}
      <HomeWhy />

      <LivingServicesSection />

      <LivingProjectsSection />

      {/* ── WORK PROCESS ── */}
      <section className="relative z-10 px-6 md:px-12 py-20 md:py-28" style={{ background: "#000", borderTop: BORDER }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16">
            <h2 className="uppercase" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(3rem, 8vw, 5.5rem)", letterSpacing: "-0.075em", lineHeight: 0.93, color: "#fff" }}>
              WORK<br />PROCESS
            </h2>
            <p className="max-w-[300px] text-[14px] leading-relaxed md:pt-4" style={{ color: "rgba(255,255,255,0.44)", fontFamily: NV }}>
              See how our proven process transforms your brand with custom-built systems that deliver measurable impact from day one.
            </p>
          </div>
          <div className="grid md:grid-cols-3">
            {processSteps.map((step, i) => (
              <article key={step.num} className="p-7 flex flex-col gap-8" style={{ border: BORDER, borderRight: i < 2 ? BORDER : undefined, marginTop: i === 1 ? 80 : undefined }}>
                <div className="flex items-center justify-center" style={{ width: 40, height: 40, background: "#fff", color: "#090909", fontFamily: NV, fontWeight: 950, fontSize: 14 }}>
                  {step.num}
                </div>
                <div>
                  <h3 className="uppercase mb-3" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(0.9rem,1.5vw,1.3rem)", letterSpacing: "-0.075em", color: "#fff", lineHeight: 1.1 }}>{step.title}</h3>
                  <p style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.44)", lineHeight: 1.65 }}>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative z-10 px-6 md:px-12 py-20 md:py-28" style={{ background: "#000", borderTop: BORDER }}>
        <div className="max-w-[1200px] mx-auto">
          <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 48 }}>* What clients say</p>
          <div className="grid md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="p-7 flex flex-col justify-between gap-10" style={{ border: BORDER, borderRight: i < 2 ? BORDER : undefined }}>
                <p className="uppercase" style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(0.9rem,1.6vw,1.1rem)", letterSpacing: "-0.063em", color: "#F2F2F2", lineHeight: 1.3 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p style={{ fontFamily: NV, fontWeight: 700, fontSize: 13, color: "#fff" }}>{t.name}</p>
                  <p style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LivingServiceTagline />

      {/* ── FAQ ── */}
      <HomeFAQ />

      {/* ── STATS ── */}
      <div style={{ borderTop: BORDER }}>
        <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center py-4" style={{ borderRight: i < 3 ? BORDER : undefined }}>
              <div style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.06em", lineHeight: 1, color: i === 0 ? "#C8102E" : "#fff", marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <LivingFinalCta />

      <Footer />
      </LivingHomeProvider>
    </main>
  );
}
