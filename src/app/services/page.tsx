"use client"

import {
  Bot, Globe, TrendingUp, Mail, BarChart3, Code, Smartphone,
  Palette, Video, Share2, ArrowRight, CheckCircle2,
  Search, Lightbulb, Rocket, Mic, Layers, Orbit,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

/* -- service data ------------------------------------------------ */

const services = [
  {
    icon: <Bot size={24} />,
    num: "01",
    title: "AI Chatbots & Agents",
    desc: "Deploy intelligent conversational agents for support, lead qualification, and sales around the clock.",
    features: ["Custom training on your data", "Multi-language support", "CRM sync & analytics"],
    metric: "96%", metricLabel: "resolution rate",
    cta: "Automate Support",
  },
  {
    icon: <Globe size={24} />,
    num: "02",
    title: "Website Design & Dev",
    desc: "Full-stack websites from landing pages to business systems. AI-assisted design, hand-polished code.",
    features: ["Mobile-first responsive", "SEO optimized", "CMS & e-commerce ready"],
    metric: "48hr", metricLabel: "avg turnaround",
    cta: "Build My Site",
  },
  {
    icon: <TrendingUp size={24} />,
    num: "03",
    title: "SEO & Growth",
    desc: "Data-driven SEO that gets you ranking. Technical audits, content strategy, and AI analytics.",
    features: ["Technical SEO audit", "Keyword research", "Monthly reporting"],
    metric: "3.2x", metricLabel: "traffic increase",
    cta: "Boost Rankings",
  },
  {
    icon: <Share2 size={24} />,
    num: "04",
    title: "Social Media",
    desc: "AI-generated content calendars, automated posting, and growth strategy across all platforms.",
    features: ["Content calendar", "Auto-scheduling", "Engagement analytics"],
    metric: "40%", metricLabel: "more leads",
    cta: "Grow Audience",
  },
  {
    icon: <Mail size={24} />,
    num: "05",
    title: "Email Marketing",
    desc: "High-converting email sequences designed by AI, A/B tested automatically. Revenue on autopilot.",
    features: ["Automated sequences", "A/B testing", "Deliverability optimization"],
    metric: "42%", metricLabel: "avg open rate",
    cta: "Launch Campaigns",
  },
  {
    icon: <BarChart3 size={24} />,
    num: "06",
    title: "Analytics & Insights",
    desc: "Real-time dashboards, custom reports, and practical AI insights. Know exactly what works.",
    features: ["Custom dashboards", "Predictive analytics", "Automated reports"],
    metric: "Real-time", metricLabel: "data processing",
    cta: "Get Insights",
  },
  {
    icon: <Code size={24} />,
    num: "07",
    title: "Custom Software",
    desc: "Bespoke APIs, automation pipelines, internal tools, and SaaS products with modern stacks.",
    features: ["Full-stack development", "API integrations", "Cloud deployment"],
    metric: "100+", metricLabel: "projects delivered",
    cta: "Start Building",
  },
  {
    icon: <Smartphone size={24} />,
    num: "08",
    title: "Mobile Apps",
    desc: "Cross-platform apps with React Native. Beautiful UIs, native performance, full backend.",
    features: ["iOS & Android", "Push notifications", "App Store deployment"],
    metric: "4.8", metricLabel: "avg app rating",
    cta: "Build My App",
  },
  {
    icon: <Palette size={24} />,
    num: "09",
    title: "Brand Design",
    desc: "Complete brand identity with AI-assisted exploration and human creative direction.",
    features: ["Logo design", "Brand guidelines", "Social media kit"],
    metric: "200+", metricLabel: "brands designed",
    cta: "Design Brand",
  },
  {
    icon: <Video size={24} />,
    num: "10",
    title: "Video Production",
    desc: "AI-generated video content, motion graphics, and product demos at scale.",
    features: ["AI video generation", "Motion graphics", "Social media clips"],
    metric: "1000+", metricLabel: "videos per month",
    cta: "Create Videos",
  },
  {
    icon: <Layers size={24} />,
    num: "12",
    title: "Launch Systems",
    desc: "Offer architecture, landing pages, automations, CRM flows, and content ops built as one launch-ready operating system.",
    features: ["Offer funnel design", "CRM and booking flows", "Launch dashboards"],
    metric: "1 stack", metricLabel: "single system",
    cta: "Unify My Launch",
  },
  {
    icon: <Orbit size={24} />,
    num: "13",
    title: "Ecosystem Strategy",
    desc: "We connect 9Ruby AI, IX Ruby services, templates, and internal tools into one brand system with clear execution lanes.",
    features: ["Brand architecture", "Toolchain mapping", "Cross-product roadmap"],
    metric: "13K+", metricLabel: "integrations ready",
    cta: "Map My Stack",
  },
  {
    icon: <Mic size={24} />,
    num: "14",
    title: "Voice AI Agents",
    desc: "Ultra-realistic voice agents for outbound sales, inbound support, and appointment booking. Sub-500ms latency, 24/7 operation, full CRM sync.",
    features: ["Sub-500ms latency", "Outbound cold calling", "CRM integration"],
    metric: "<500ms", metricLabel: "response latency",
    cta: "Deploy Voice Agent",
    href: "/services/voice-agents",
  },
]

const processSteps = [
  {
    num: "01",
    icon: <Search size={20} />,
    title: "Discovery",
    desc: "We deep-dive into your business, audience, competitors, and goals to map the full opportunity landscape.",
  },
  {
    num: "02",
    icon: <Lightbulb size={20} />,
    title: "System Design",
    desc: "We shape the offer into one stack across AI, website, automation, voice, and analytics so execution does not fragment.",
  },
  {
    num: "03",
    icon: <Code size={20} />,
    title: "Build",
    desc: "Autonomous agents and expert humans execute in parallel. You get daily progress, zero bottlenecks.",
  },
  {
    num: "04",
    icon: <Rocket size={20} />,
    title: "Launch",
    desc: "We deploy, monitor, and optimize. Post-launch support keeps the stack compounding instead of stalling after launch week.",
  },
]

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "$2M+", label: "Revenue Generated" },
  { value: "24/7", label: "Agent Support" },
]

/* -- scroll reveal hook ------------------------------------------ */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll("[data-reveal]")
    children.forEach((child) => {
      const delay = Number(child.getAttribute("data-reveal-delay") || 0)
      setTimeout(() => {
        child.classList.add("revealed")
      }, delay)
    })
  }, [])

  return ref
}

/* -- page -------------------------------------------------------- */

export default function ServicesPage() {
  const revealRef = useScrollReveal()

  return (
    <main id="main-content" className="relative min-h-screen" ref={revealRef} style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Services" }]} />

      {/* -- HERO ------------------------------------------------ */}
      <section className="relative pt-36 lg:pt-48 pb-24 lg:pb-32 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-8"
            style={{ color: "#C41A3B" }}
          >
            14 Premium Services
          </div>

          <h1
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6"
          >
            <span style={{ color: "var(--ink-strong)" }}>
            Services That
          </span>
            <br />
            <span style={{ color: "var(--ink-strong)" }}>
              Drive Growth
            </span>
          </h1>

          <p
            data-reveal
            data-reveal-delay={200}
            className="reveal-item text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4"
            style={{ color: "var(--ink-muted)" }}
          >
            From AI agents to websites, voice systems, and content production,
            expert humans deliver end-to-end services that scale your brand.
          </p>
          <p
            data-reveal
            data-reveal-delay={300}
            className="reveal-item font-mono text-xs"
            style={{ color: "var(--ink-soft)" }}
          >
            Avg 3.2x revenue increase within 6 months
          </p>

          <div
            data-reveal
            data-reveal-delay={360}
            className="reveal-item grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12 text-left"
          >
            {[
              {
                title: "AI + agency",
                copy: "One team handles self-serve AI, managed execution, and custom systems.",
              },
              {
                title: "Web + voice + ops",
                copy: "Sites, agents, analytics, automations, and voice all move inside one stack.",
              },
              {
                title: "Built for launch",
                copy: "Designed to replace disconnected freelancers, tools, and retainers.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-5" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: "var(--ink-soft)" }}>
                  {item.title}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- SERVICES GRID --------------------------------------- */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <div
                key={s.title}
                data-reveal
                data-reveal-delay={i * 60}
                className="reveal-item group relative rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-black/[0.03]"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="p-8 lg:p-10">
                  {/* header row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs" style={{ color: "var(--ink-soft)" }}>{s.num}</span>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", color: "var(--ink-muted)" }}>
                        {s.icon}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.04)" }}>
                      <span className="text-base font-serif italic font-semibold" style={{ color: "var(--ink-strong)" }}>{s.metric}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>{s.metricLabel}</span>
                    </div>
                  </div>

                  {/* title + desc */}
                  <h3 className="text-xl font-semibold tracking-tight mb-2" style={{ color: "var(--ink-strong)" }}>
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--ink-muted)" }}>
                    {s.desc}
                  </p>

                  {/* feature bullets */}
                  <ul className="space-y-2.5 mb-8">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--ink-muted)" }}>
                        <CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ink-soft)" }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={(s as { href?: string }).href ?? "/contact"}
                    className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#1A1A1A] transition-colors duration-300 group/btn"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {s.cta}
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- PROCESS SECTION ------------------------------------- */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* section header */}
          <div className="text-center mb-16 lg:mb-20">
            <div
              data-reveal
              data-reveal-delay={0}
              className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-6"
              style={{ color: "#C41A3B" }}
            >
              Process
            </div>
            <h2
              data-reveal
              data-reveal-delay={100}
              className="reveal-item text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tighter"
            >
              <span style={{ color: "var(--ink-strong)" }}>How We </span>
              <span style={{ color: "var(--ink-soft)" }}>Work</span>
            </h2>
          </div>

          {/* steps */}
          <div className="relative grid md:grid-cols-4 gap-8 lg:gap-6">
            {/* connecting line (desktop) */}
            <div className="hidden md:block absolute top-[56px] left-[12.5%] right-[12.5%] h-px" style={{ background: "rgba(0,0,0,0.06)" }} />

            {processSteps.map((step, i) => (
              <div
                key={step.num}
                data-reveal
                data-reveal-delay={i * 150}
                className="reveal-item relative text-center"
              >
                {/* step circle */}
                <div className="relative inline-flex items-center justify-center w-[72px] h-[72px] rounded-full bg-white mb-6 mx-auto" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div className="relative" style={{ color: "var(--ink-muted)" }}>{step.icon}</div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#C41A3B] flex items-center justify-center text-[10px] font-mono font-bold text-white">
                    {step.num}
                  </div>
                </div>

                <h3 className="text-lg font-semibold tracking-tight mb-2" style={{ color: "var(--ink-strong)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed max-w-[240px] mx-auto" style={{ color: "var(--ink-muted)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- RESULTS BANNER -------------------------------------- */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "rgba(0,0,0,0.04)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "rgba(0,0,0,0.04)" }} />

        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-reveal
                data-reveal-delay={i * 120}
                className="reveal-item text-center"
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-serif italic tracking-tighter mb-3" style={{ color: "var(--ink-strong)" }}>
                  {stat.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- CTA ------------------------------------------------- */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <h2
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-4xl md:text-5xl lg:text-7xl font-serif italic tracking-tighter leading-tight mb-6"
          >
            <span style={{ color: "var(--ink-strong)" }}>
              Let&apos;s Build
            </span>
            <br />
            <span style={{ color: "var(--ink-soft)" }}>Together</span>
          </h2>
          <p
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-lg leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: "var(--ink-muted)" }}
          >
            Tell us what you need and we&apos;ll assemble the perfect agent team
            for your project. No fluff, just results.
          </p>
          <div
            data-reveal
            data-reveal-delay={200}
            className="reveal-item flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="h-10 px-7 rounded-full bg-[#1A1A1A] text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all duration-300 inline-flex items-center gap-2"
              style={{ color: "#F8F7F4" }}
            >
              Get a Free Quote <ArrowRight size={14} />
            </Link>
            <Link
              href="/pricing"
              className="h-10 px-7 rounded-full text-sm font-medium hover:bg-black/[0.02] transition-all duration-300 inline-flex items-center"
              style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-muted)" }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* -- inline styles for animations ------------------------ */}
      <style jsx>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </main>
  )
}
