import Link from "next/link";
import { Search, Mic, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "9Ruby — AI agents, websites, and voice systems",
  description:
    "AI agents, websites, voice systems, and automation built by IX Ruby. Start with AI or explore services.",
};

const quickLinks = [
  { label: "AI", href: "https://ai.9ruby.com" },
  { label: "Services", href: "/services" },
  { label: "Voice", href: "/services/voice-agents" },
  { label: "Templates", href: "/templates" },
  { label: "Domains", href: "/domains" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Cases", href: "/cases" },
];

const stats = [
  { value: "47+", label: "Projects" },
  { value: "3.8×", label: "Avg revenue" },
  { value: "92%", label: "Retention" },
  { value: "<500ms", label: "Voice latency" },
];

export default function Home() {
  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col"
      style={{ background: "var(--page-bg)" }}
    >
      {/* Ambient glow */}
      <div aria-hidden className="home-bg-ambient" />

      {/* Floating gradient lines */}
      <div aria-hidden className="floating-lines">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`fl fl-${i + 1}`} />
        ))}
      </div>

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20 min-h-screen">

        {/* Eyebrow */}
        <div className="hero-reveal-0 mb-8 flex items-center gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--accent)" }}
          />
          <span
            className="text-[11px] font-semibold tracking-[0.16em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Now in public beta
          </span>
        </div>

        {/* Wordmark */}
        <div className="hero-reveal-1 flex items-baseline select-none mb-8 gap-0">
          <span
            className="font-serif italic font-bold leading-none"
            style={{
              fontSize: "clamp(5.5rem, 18vw, 13rem)",
              letterSpacing: "-0.05em",
              color: "var(--accent)",
              textShadow: "0 0 120px rgba(139,107,61,0.18)",
            }}
          >
            9
          </span>
          <span
            className="font-bold leading-none"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 8rem)",
              letterSpacing: "-0.04em",
              color: "var(--ink-strong)",
            }}
          >
            Ruby
          </span>
        </div>

        {/* Tagline */}
        <p
          className="hero-reveal-2 font-serif italic text-center max-w-[560px] mb-12 leading-snug"
          style={{
            fontSize: "clamp(1.15rem, 2.4vw, 1.55rem)",
            color: "var(--ink-muted)",
            letterSpacing: "-0.01em",
          }}
        >
          AI agents, websites, and voice systems built for the modern operator.
        </p>

        {/* Search */}
        <form
          action="https://ai.9ruby.com"
          method="get"
          className="hero-reveal-3 w-full max-w-[620px] mb-8"
          role="search"
        >
          <label
            className="flex items-center gap-3 h-14 rounded-2xl px-5 transition-all duration-200"
            style={{
              background: "var(--surface-solid)",
              border: "1.5px solid var(--border-strong)",
              boxShadow: "0 2px 16px var(--shadow-color), 0 0 0 0 rgba(139,107,61,0)",
            }}
          >
            <Search size={17} style={{ color: "var(--ink-soft)", flexShrink: 0 }} />
            <input
              name="q"
              type="text"
              placeholder="Ask 9Ruby AI anything"
              aria-label="Ask 9Ruby AI"
              autoComplete="off"
              className="flex-1 bg-transparent outline-none"
              style={{
                color: "var(--ink-strong)",
                fontSize: "15px",
                letterSpacing: "-0.01em",
              }}
            />
            <Mic size={16} style={{ color: "var(--ink-soft)", flexShrink: 0 }} aria-hidden />
          </label>

          {/* CTAs */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-6 h-10 transition-all duration-200 hover:-translate-y-px"
              style={{
                background: "var(--button-bg)",
                color: "var(--button-fg)",
                boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
              }}
            >
              Start with AI
              <ArrowRight size={13} />
            </button>
            <Link
              href="/services"
              className="inline-flex items-center text-[13px] font-medium rounded-full px-6 h-10 transition-all duration-200 hover:-translate-y-px"
              style={{
                border: "1.5px solid var(--border-strong)",
                color: "var(--ink-muted)",
              }}
            >
              Explore services
            </Link>
          </div>
        </form>

        {/* Quick links */}
        <nav
          aria-label="Quick links"
          className="hero-reveal-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 max-w-[600px]"
        >
          {quickLinks.map((q) => {
            const external = q.href.startsWith("http");
            const cls = "text-[12px] tracking-wide transition-colors duration-150 hover:opacity-80";
            const style = { color: "var(--ink-soft)", letterSpacing: "0.01em" };
            return external ? (
              <a key={q.href} href={q.href} className={cls} style={style}>{q.label}</a>
            ) : (
              <Link key={q.href} href={q.href} className={cls} style={style}>{q.label}</Link>
            );
          })}
        </nav>
      </section>

      {/* ── STATS BAR ── */}
      <div
        className="hero-reveal-5 relative z-10 border-t"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center md:border-r last:border-r-0"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div
                className="font-serif italic font-bold leading-none mb-1"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  color: i === 0 ? "var(--accent)" : "var(--ink-strong)",
                  letterSpacing: "-0.04em",
                }}
              >
                {s.value}
              </div>
              <div
                className="text-[11px] font-mono uppercase tracking-widest"
                style={{ color: "var(--ink-soft)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
