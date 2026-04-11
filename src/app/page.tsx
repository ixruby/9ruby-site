"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Blocks, Globe, Sparkles, BarChart3, Code2, Layers, ArrowUpRight, CheckCircle2, Lock, Shield, Zap, ChevronDown } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const targets = el.querySelectorAll("[data-reveal]");
    targets.forEach((t) => {
      const h = t as HTMLElement;
      const d = h.dataset.reveal;
      h.style.animationDelay = `${parseInt(d || "0") * 100}ms`;
      h.classList.add("reveal-up");
    });
  }, []);
  return ref;
}

function useCounter(target: number, suffix = "") {
  const [val, setVal] = useState("0" + suffix);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) { done.current = true; const start = performance.now(); const step = (now: number) => { const p = Math.min((now - start) / 1600, 1); setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString() + suffix); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix]);
  return { ref, val };
}

/* Pure CSS lava — no JS, renders on first paint, zero jump */
function SectionGradient({ opacity = 0.55, variant = 0 }: { c1?: string; c2?: string; c3?: string; opacity?: number; speed?: number; variant?: number }) {
  const configs = [
    { a: "lava-a", b: "lava-b", c: "lava-c" },
    { a: "lava-b", b: "lava-c", c: "lava-a" },
    { a: "lava-c", b: "lava-a", c: "lava-b" },
    { a: "lava-a", b: "lava-c", c: "lava-b" },
  ];
  const cfg = configs[variant % configs.length];
  return (
    <div className="absolute z-0 pointer-events-none" style={{ inset: "-30%", opacity }}>
      <div className={`lava-blob blob-1 ${cfg.a}`} />
      <div className={`lava-blob blob-2 ${cfg.b}`} />
      <div className={`lava-blob blob-3 ${cfg.c}`} />
      <div className={`lava-blob blob-4 ${cfg.a}`} />
    </div>
  );
}

/* Grid overlay */
function GridOverlay() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-[14px] font-medium pr-8 group-hover:text-[#1A1A1A] transition-colors" style={{ color: "#3A3A35" }}>{question}</span>
        <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} style={{ color: open ? "#C41A3B" : "rgba(0,0,0,0.25)" }} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-40 opacity-100 pb-5" : "max-h-0 opacity-0"}`}>
        <p className="text-[13px] leading-relaxed pr-10" style={{ color: "#7A7A72" }}>{answer}</p>
      </div>
    </div>
  );
}

const features = [
  { icon: Sparkles, title: "AI Agents", desc: "Autonomous agents that plan, create, and execute. Content, campaigns, support — running 24/7.", accent: "#C41A3B" },
  { icon: Globe, title: "Website Builder", desc: "Full-stack websites from concept to production. Pixel-perfect, optimized, deployed globally.", accent: "#3b82f6" },
  { icon: Blocks, title: "13,000+ Integrations", desc: "Every tool you use, connected. Stripe, Slack, Supabase, Vercel — in one click.", accent: "#a855f7" },
  { icon: Layers, title: "Template Market", desc: "Production-ready templates for SaaS, portfolios, e-commerce. Ship in minutes.", accent: "#10b981" },
  { icon: BarChart3, title: "Analytics & Insights", desc: "Real-time dashboards, revenue tracking, user behavior. Data that drives decisions.", accent: "#f59e0b" },
  { icon: Code2, title: "Developer CLI", desc: "Ship from your terminal. Full API access and agent orchestration.", accent: "#6366f1" },
];

export default function Home() {
  const pageRef = useScrollReveal();
  const c1 = useCounter(211, "+");
  const c2 = useCounter(13247, "");
  const c3 = useCounter(68, "");
  const c4 = useCounter(98, "%");

  return (
    <main id="main-content" ref={pageRef} className="min-h-screen">
      <Navbar />

      {/* ============================================================
          DARK — Hero: full gradient + grid + content
      ============================================================ */}
      <section className="relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 60%, #1a0810 0%, #0a0a0f 70%)" }}>
        <SectionGradient opacity={0.7} variant={0} />
        <GridOverlay />

        <div className="relative z-10 pt-36 pb-28 lg:pt-48 lg:pb-36">
          <div className="max-w-[860px] mx-auto px-6 text-center">
            <div data-reveal="0" className="mb-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] uppercase rounded-full px-4 py-2" style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" />
                Now in public beta
              </span>
            </div>
            <h1 data-reveal="1" className="font-serif italic leading-[1.08] tracking-tight" style={{ fontSize: "clamp(2.8rem, 7vw, 5.2rem)", letterSpacing: "-0.02em", color: "#fff" }}>
              One platform for<br />everything you{" "}
              <span className="relative inline-block">build<span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full draw-line" style={{ background: "#fff" }} /></span>
            </h1>
            <p data-reveal="2" className="mt-8 text-lg leading-relaxed max-w-[480px] mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              AI agents, websites, templates, and 13,000 integrations. Build, ship, and scale — from a single dashboard.
            </p>
            <div data-reveal="3" className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a href="https://ai.9ruby.com" className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-7 h-12 btn-motion" style={{ background: "#fff", color: "#111" }}>Start for free <ArrowRight size={14} /></a>
              <Link href="/pricing" className="inline-flex items-center text-sm font-medium rounded-full px-7 h-12 btn-motion" style={{ color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.15)" }}>View pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHITE — Ticker + Trust
      ============================================================ */}
      <section style={{ background: "#F5F3EE" }}>
        <div className="py-5 overflow-hidden" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="scroll-ticker whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (<span key={dup} className="inline">{["AI Agents", "Web Development", "Templates", "Open Source", "Deployment", "Analytics", "Design Systems", "Automation", "13K+ Apps", "CLI Tools"].map((w) => (<span key={`${dup}-${w}`} className="inline-flex items-center mx-8"><span className="text-[13px] font-medium tracking-wide" style={{ color: "rgba(0,0,0,0.18)" }}>{w}</span><span className="ml-8 w-1 h-1 rounded-full" style={{ background: "rgba(196,26,59,0.3)" }} /></span>))}</span>))}
          </div>
        </div>
        <div className="py-16 lg:py-20">
          <div className="max-w-[900px] mx-auto px-6">
            <p data-reveal="0" className="text-center text-[10px] font-semibold tracking-[0.18em] uppercase mb-8" style={{ color: "#8A8A82" }}>Trusted by teams building the future</p>
            <div data-reveal="1" className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 mb-14">
              {["Novavox", "Saumya Properties", "TechNova", "QAN LLC", "Kayupinus"].map((n) => (<span key={n} className="text-[13px] font-semibold tracking-wide select-none" style={{ color: "rgba(0,0,0,0.14)" }}>{n}</span>))}
            </div>
            <div data-reveal="2" className="text-center mb-6">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#8A8A82" }}>Connects with your stack</p>
            </div>
            <div data-reveal="3" className="flex flex-wrap items-center justify-center gap-2">
              {[
                { name: "Stripe", color: "#635BFF" },
                { name: "Supabase", color: "#3ECF8E" },
                { name: "Vercel", color: "#000" },
                { name: "GitHub", color: "#24292F" },
                { name: "Slack", color: "#4A154B" },
                { name: "Firebase", color: "#FF6D00" },
                { name: "Notion", color: "#000" },
                { name: "Figma", color: "#F24E1E" },
                { name: "Linear", color: "#5E6AD2" },
                { name: "Twilio", color: "#F22F46" },
                { name: "OpenAI", color: "#10A37F" },
                { name: "Anthropic", color: "#C41A3B" },
              ].map((t) => (
                <span key={t.name} className="inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-3 py-1.5 select-none" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.45)" }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.color }} />{t.name}
                </span>
              ))}
              <span className="text-[11px] font-semibold rounded-full px-3 py-1.5" style={{ color: "#C41A3B" }}>+12,988 more →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          DARK — Features: full gradient + grid
      ============================================================ */}
      <section id="features" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "#0a0a0f" }}>
        <SectionGradient opacity={0.5} variant={1} />
        <GridOverlay />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p data-reveal="0" className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: "#C41A3B" }}>Platform</p>
            <h2 data-reveal="1" className="font-serif italic text-3xl md:text-[2.75rem] tracking-tight leading-[1.15] text-white">Built for builders</h2>
            <p data-reveal="2" className="mt-4 text-base max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>Everything you need to go from idea to production.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={f.title} data-reveal={`${i}`} className="group rounded-2xl p-7 card-motion" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 icon-motion" style={{ background: `${f.accent}18`, color: f.accent }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = f.accent; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "scale(1.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${f.accent}18`; e.currentTarget.style.color = f.accent; e.currentTarget.style.transform = "scale(1)"; }}>
                  <f.icon size={18} strokeWidth={1.8} />
                </div>
                <h3 className="text-[15px] font-bold tracking-tight mb-2 text-white">{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{f.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: f.accent }}>Learn more <ArrowUpRight size={12} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHITE — Stats
      ============================================================ */}
      <section className="py-24 lg:py-28" style={{ background: "#F5F3EE" }}>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-14">
            <p data-reveal="0" className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: "#C41A3B" }}>Numbers</p>
            <h2 data-reveal="1" className="font-serif italic text-3xl md:text-[2.5rem] tracking-tight leading-[1.15]" style={{ color: "#111" }}>The platform in numbers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[{ r: c1, label: "Open-source tools" }, { r: c2, label: "App integrations" }, { r: c3, label: "AI skills" }, { r: c4, label: "Satisfaction" }].map((s) => (
              <div key={s.label} className="text-center stat-motion cursor-default">
                <span ref={s.r.ref} className="block font-serif italic text-4xl md:text-[3rem] tracking-tight tabular-nums" style={{ color: "#111" }}>{s.r.val}</span>
                <span className="block mt-2 text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: "#8A8A82" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          DARK — Deploy: full gradient + grid
      ============================================================ */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#0a0a0f" }}>
        <SectionGradient opacity={0.5} variant={2} />
        <GridOverlay />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div data-reveal="0">
              <div className="rounded-2xl overflow-hidden font-mono text-sm leading-loose" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444", opacity: 0.6 }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#eab308", opacity: 0.6 }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e", opacity: 0.6 }} />
                  <span className="ml-3 text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>Terminal</span>
                </div>
                <div className="p-6">
                  <p><span style={{ color: "rgba(255,255,255,0.25)" }}>$</span> <span style={{ color: "rgba(255,255,255,0.7)" }}>npx 9ruby deploy</span><span className="cursor-blink" /></p>
                  <p className="mt-3" style={{ color: "rgba(255,255,255,0.2)" }}>Deploying to production...</p>
                  <p className="mt-1" style={{ color: "rgba(110,200,130,0.7)" }}>&#10003; Built in 2.4s</p>
                  <p className="mt-1" style={{ color: "rgba(110,200,130,0.7)" }}>&#10003; Deployed 3 functions</p>
                  <p className="mt-1" style={{ color: "rgba(110,200,130,0.7)" }}>&#10003; <span style={{ color: "rgba(255,255,255,0.35)" }}>https://your-site.9ruby.com</span></p>
                </div>
              </div>
            </div>
            <div data-reveal="1">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: "#C41A3B" }}>Deploy</p>
              <h2 className="font-serif italic text-3xl md:text-[2.5rem] tracking-tight leading-[1.15] mb-5 text-white">Ship in seconds,<br />scale forever</h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Push your code and it goes live. Zero configuration. Automatic builds. Global edge network.</p>
              <ul className="space-y-3">
                {["Git push to deploy", "Edge-optimized CDN", "Preview environments for every branch", "Built-in agent orchestration"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[14px]" style={{ color: "rgba(255,255,255,0.45)" }}><span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#C41A3B" }} />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHITE — Testimonials (3 real clients)
      ============================================================ */}
      <section className="py-24 lg:py-32" style={{ background: "#F5F3EE" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <p data-reveal="0" className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: "#C41A3B" }}>From our clients</p>
            <h2 data-reveal="1" className="font-serif italic text-3xl md:text-[2.5rem] tracking-tight leading-[1.15]" style={{ color: "#111" }}>What builders say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                quote: "What used to take three weeks was done in two days. 9Ruby's agents changed how we ship products entirely.",
                name: "Vishnu M.",
                role: "Founder, Novavox",
                initial: "N",
                accent: "#C41A3B",
              },
              {
                quote: "The template + admin panel combo saved us months. We launched a fully branded real estate site in under a week.",
                name: "Saumya Team",
                role: "Saumya Properties",
                initial: "S",
                accent: "#3b82f6",
              },
              {
                quote: "The CLI alone is worth it. Push to deploy in seconds, agents handle the rest. Our team ships 3× faster now.",
                name: "Dev Lead",
                role: "QAN LLC",
                initial: "Q",
                accent: "#a855f7",
              },
            ].map((t, i) => (
              <div key={i} data-reveal={`${i}`} className="rounded-2xl p-7 flex flex-col gap-5" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
                <span className="font-serif text-5xl leading-none select-none" style={{ color: `${t.accent}18` }}>&ldquo;</span>
                <p className="font-serif italic text-[15px] leading-relaxed tracking-tight flex-1" style={{ color: "#3A3A35" }}>{t.quote}</p>
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: t.accent }}>{t.initial}</div>
                  <div>
                    <p className="text-[13px] font-bold" style={{ color: "#111" }}>{t.name}</p>
                    <p className="text-[11px]" style={{ color: "#8A8A82" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          DARK — Pricing preview
      ============================================================ */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#0a0a0f" }}>
        <SectionGradient opacity={0.4} variant={1} />
        <GridOverlay />
        <div className="relative z-10 max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <p data-reveal="0" className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: "#C41A3B" }}>Pricing</p>
            <h2 data-reveal="1" className="font-serif italic text-3xl md:text-[2.75rem] tracking-tight leading-[1.15] text-white">Simple, transparent pricing</h2>
            <p data-reveal="2" className="mt-4 text-base max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>Start free. No credit card required.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { name: "Free", price: "$0", desc: "For individuals starting out", features: ["50 AI messages/day", "3 Design generations", "1 project", "Community support"], cta: "Start Free", href: "https://ai.9ruby.com", highlight: false },
              { name: "Pro", price: "$149", desc: "For growing businesses", features: ["Unlimited messages", "25 concurrent agents", "All integrations", "Priority support"], cta: "Start Trial", href: "https://ai.9ruby.com", highlight: true, badge: "Most Popular" },
              { name: "Enterprise", price: "Custom", desc: "For teams at scale", features: ["Rubix Terminal access", "On-premise deploy", "SSO & SAML", "24/7 phone support"], cta: "Contact Sales", href: "/contact", highlight: false },
            ].map((tier, i) => (
              <div key={i} data-reveal={`${i}`} className="relative rounded-2xl p-7 flex flex-col gap-5" style={{ background: tier.highlight ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)", border: tier.highlight ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}>
                {tier.badge && <span className="absolute -top-3 left-6 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#C41A3B] text-white">{tier.badge}</span>}
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{tier.name}</p>
                  <p className="font-serif italic text-4xl tracking-tight text-white">{tier.price}<span className="text-sm font-sans not-italic ml-1" style={{ color: "rgba(255,255,255,0.3)" }}>{tier.price !== "Custom" ? "/mo" : ""}</span></p>
                  <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{tier.desc}</p>
                </div>
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <CheckCircle2 size={12} style={{ color: "#C41A3B", flexShrink: 0 }} />{f}
                    </li>
                  ))}
                </ul>
                <a href={tier.href} className="h-10 flex items-center justify-center rounded-full text-[13px] font-semibold transition-all duration-200 btn-motion" style={{ background: tier.highlight ? "#fff" : "rgba(255,255,255,0.08)", color: tier.highlight ? "#111" : "rgba(255,255,255,0.6)", border: tier.highlight ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{tier.cta} <ArrowRight size={12} className="ml-1.5" /></a>
              </div>
            ))}
          </div>
          <p data-reveal="3" className="text-center text-[13px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            <Link href="/pricing" className="hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>See full feature comparison →</Link>
          </p>
        </div>
      </section>

      {/* ============================================================
          WHITE — FAQ (top 4)
      ============================================================ */}
      <section className="py-24 lg:py-32" style={{ background: "#F5F3EE" }}>
        <div className="max-w-[720px] mx-auto px-6">
          <div className="text-center mb-14">
            <p data-reveal="0" className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: "#C41A3B" }}>FAQ</p>
            <h2 data-reveal="1" className="font-serif italic text-3xl md:text-[2.5rem] tracking-tight leading-[1.15]" style={{ color: "#111" }}>Common questions</h2>
          </div>
          <div data-reveal="2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            {[
              { q: "Is there a free trial for paid plans?", a: "Yes — both Starter and Pro come with a 14-day free trial with full access. No credit card required to start." },
              { q: "What AI models are included?", a: "Free includes Ruby 9 Sonnet. Pro unlocks all models including Ruby 9 Opus and the latest releases. Enterprise adds custom model routing." },
              { q: "How does deployment work?", a: "Push your code and it deploys automatically. Zero configuration, automatic builds, global edge CDN, and preview environments for every branch." },
              { q: "Is my data secure?", a: "All plans include encryption at rest and in transit. Enterprise adds SSO/SAML, dedicated infrastructure, and custom data retention policies." },
            ].map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
          <p data-reveal="3" className="mt-8 text-center text-[13px]">
            <Link href="/pricing#faq" className="font-semibold transition-colors" style={{ color: "#C41A3B" }}>See all FAQs →</Link>
          </p>
        </div>
      </section>

      {/* ============================================================
          DARK — CTA: full gradient + grid (strongest opacity)
      ============================================================ */}
      <section className="relative py-32 lg:py-40 overflow-hidden" style={{ background: "#0a0a0f" }}>
        <SectionGradient opacity={0.7} variant={3} />
        <GridOverlay />

        <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
          <h2 data-reveal="0" className="font-serif italic text-3xl md:text-5xl tracking-tight leading-[1.1] mb-6 text-white">Start building today</h2>
          <p data-reveal="1" className="text-base mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>Free to start. No credit card required.</p>
          <div data-reveal="2" className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://ai.9ruby.com" className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-8 h-12 btn-motion" style={{ background: "#fff", color: "#111" }}>Get Started <ArrowRight size={14} /></a>
            <Link href="/contact" className="inline-flex items-center text-sm font-medium rounded-full px-8 h-12 btn-motion" style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>Contact Sales</Link>
          </div>
          <div data-reveal="3" className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Lock, label: "Encrypted at rest" },
              { icon: Shield, label: "SOC 2 Type II" },
              { icon: Zap, label: "99.9% uptime SLA" },
              { icon: CheckCircle2, label: "30-day money back" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
                <Icon size={12} style={{ color: "rgba(255,255,255,0.3)" }} />{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
