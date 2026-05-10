"use client"

import {
  Bot, Globe, TrendingUp, Mail, BarChart3, Code, Smartphone,
  Palette, Video, Share2, ArrowRight, CheckCircle2,
  Search, Lightbulb, Rocket, Mic, Layers, Orbit,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const services = [
  {
    icon: <Bot size={22} />,
    num: "01",
    title: "AI Chatbots & Agents",
    desc: "Autonomous agents that qualify leads, answer support, book appointments, and close deals — 24/7.",
    features: ["Custom training on your data", "Multi-language support", "CRM sync & analytics"],
    metric: "96%", metricLabel: "resolution rate",
    cta: "Automate Support",
  },
  {
    icon: <Globe size={22} />,
    num: "02",
    title: "Website Design & Dev",
    desc: "Full-stack websites from landing pages to business systems. AI-assisted design, hand-polished code.",
    features: ["Mobile-first responsive", "SEO optimized", "CMS & e-commerce ready"],
    metric: "48hr", metricLabel: "avg turnaround",
    cta: "Build My Site",
  },
  {
    icon: <TrendingUp size={22} />,
    num: "03",
    title: "SEO & Growth",
    desc: "Data-driven SEO that gets you ranking. Technical audits, content strategy, and AI analytics.",
    features: ["Technical SEO audit", "Keyword research", "Monthly reporting"],
    metric: "3.2x", metricLabel: "traffic increase",
    cta: "Boost Rankings",
  },
  {
    icon: <Share2 size={22} />,
    num: "04",
    title: "Social Media",
    desc: "AI-generated content calendars, automated posting, and growth strategy across all platforms.",
    features: ["Content calendar", "Auto-scheduling", "Engagement analytics"],
    metric: "40%", metricLabel: "more leads",
    cta: "Grow Audience",
  },
  {
    icon: <Mail size={22} />,
    num: "05",
    title: "Email Marketing",
    desc: "High-converting email sequences designed by AI, A/B tested automatically. Revenue on autopilot.",
    features: ["Automated sequences", "A/B testing", "Deliverability optimization"],
    metric: "42%", metricLabel: "avg open rate",
    cta: "Launch Campaigns",
  },
  {
    icon: <BarChart3 size={22} />,
    num: "06",
    title: "Analytics & Insights",
    desc: "Real-time dashboards, custom reports, and practical AI insights. Know exactly what works.",
    features: ["Custom dashboards", "Predictive analytics", "Automated reports"],
    metric: "Real-time", metricLabel: "data processing",
    cta: "Get Insights",
  },
  {
    icon: <Code size={22} />,
    num: "07",
    title: "Custom Software",
    desc: "Bespoke APIs, automation pipelines, internal tools, and SaaS products with modern stacks.",
    features: ["Full-stack development", "API integrations", "Cloud deployment"],
    metric: "100+", metricLabel: "projects delivered",
    cta: "Start Building",
  },
  {
    icon: <Smartphone size={22} />,
    num: "08",
    title: "Mobile Apps",
    desc: "Cross-platform apps with React Native. Beautiful UIs, native performance, full backend.",
    features: ["iOS & Android", "Push notifications", "App Store deployment"],
    metric: "4.8", metricLabel: "avg app rating",
    cta: "Build My App",
  },
  {
    icon: <Palette size={22} />,
    num: "09",
    title: "Brand Design",
    desc: "Complete brand identity with AI-assisted exploration and human creative direction.",
    features: ["Logo design", "Brand guidelines", "Social media kit"],
    metric: "200+", metricLabel: "brands designed",
    cta: "Design Brand",
  },
  {
    icon: <Video size={22} />,
    num: "10",
    title: "Video Production",
    desc: "AI-generated video content, motion graphics, and product demos at scale.",
    features: ["AI video generation", "Motion graphics", "Social media clips"],
    metric: "1000+", metricLabel: "videos per month",
    cta: "Create Videos",
  },
  {
    icon: <Layers size={22} />,
    num: "11",
    title: "Launch Systems",
    desc: "Offer architecture, landing pages, automations, CRM flows, and content ops built as one launch-ready operating system.",
    features: ["Offer funnel design", "CRM and booking flows", "Launch dashboards"],
    metric: "1 stack", metricLabel: "single system",
    cta: "Unify My Launch",
  },
  {
    icon: <Orbit size={22} />,
    num: "12",
    title: "Ecosystem Strategy",
    desc: "We connect AI tools, services, templates, and internal tools into one brand system with clear execution lanes.",
    features: ["Brand architecture", "Toolchain mapping", "Cross-product roadmap"],
    metric: "13K+", metricLabel: "integrations ready",
    cta: "Map My Stack",
  },
  {
    icon: <Mic size={22} />,
    num: "13",
    title: "Voice AI Agents",
    desc: "Ultra-realistic voice agents for outbound sales, inbound support, and appointment booking. Sub-500ms latency, 24/7.",
    features: ["Sub-500ms latency", "Outbound cold calling", "CRM integration"],
    metric: "<500ms", metricLabel: "response latency",
    cta: "Deploy Voice Agent",
    href: "/services/voice-agents",
  },
]

const serviceFor: Record<string, string[]> = {
  "AI Chatbots & Agents": ["E-commerce", "SaaS", "Agencies"],
  "Website Design & Dev": ["Startups", "Founders", "Local Biz"],
  "SEO & Growth": ["Bloggers", "SaaS", "E-commerce"],
  "Social Media": ["Brands", "Creators", "Agencies"],
  "Email Marketing": ["Coaches", "E-commerce", "SaaS"],
  "Analytics & Insights": ["Founders", "Marketing Teams", "Enterprise"],
  "Custom Software": ["Tech Teams", "Enterprise", "SaaS"],
  "Mobile Apps": ["Startups", "Founders", "Enterprises"],
  "Brand Design": ["New Brands", "Rebrands", "Agencies"],
  "Video Production": ["Content Creators", "Brands", "SaaS"],
  "Launch Systems": ["Solopreneurs", "Founders", "Agencies"],
  "Ecosystem Strategy": ["Scaling Brands", "Enterprise", "Operators"],
  "Voice AI Agents": ["Sales Teams", "Support Ops", "SMBs"],
}

const processSteps = [
  {
    num: "01",
    icon: <Search size={18} />,
    title: "Discovery",
    desc: "We deep-dive into your business, audience, competitors, and goals to map the full opportunity landscape.",
  },
  {
    num: "02",
    icon: <Lightbulb size={18} />,
    title: "System Design",
    desc: "We shape the offer into one stack across AI, website, automation, voice, and analytics so execution does not fragment.",
  },
  {
    num: "03",
    icon: <Code size={18} />,
    title: "Build",
    desc: "Autonomous agents and expert humans execute in parallel. You get daily progress, zero bottlenecks.",
  },
  {
    num: "04",
    icon: <Rocket size={18} />,
    title: "Launch",
    desc: "We deploy, monitor, and optimize. Post-launch support keeps the stack compounding instead of stalling.",
  },
]

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "$2M+", label: "Revenue Generated" },
  { value: "24/7", label: "Agent Support" },
]

export default function ServicesPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Services" }]} />

      {/* HERO */}
      <section style={{ background: "#8C000E" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
            13 Premium Services
          </p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(56px, 10vw, 120px)", color: "#fff", marginBottom: 28 }}>
            SERVICES
          </h1>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto 12px" }}>
            From AI agents to websites, voice systems, and content production — end-to-end services that scale your brand.
          </p>
          <p style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.44)", letterSpacing: "0.06em" }}>
            Avg 3.2x revenue increase within 6 months
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="py-10 px-6 text-center" style={{ borderRight: i % 2 === 0 || i < 3 ? BORDER : "none", borderBottom: i < 2 ? BORDER : "none" }}>
                <div style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(28px,5vw,40px)", color: "#C8102E", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 6 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>* What we do</p>
              <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(40px,7vw,72px)", color: "#fff" }}>
                ALL<br />SERVICES
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ border: BORDER }}>
            {services.map((s, i) => (
              <div
                key={s.title}
                className="p-7 flex flex-col gap-5 group cursor-pointer hover:bg-white/[0.02] transition-colors"
                style={{
                  borderRight: (i + 1) % 3 !== 0 ? BORDER : undefined,
                  borderBottom: BORDER,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.28)" }}>{s.num}</span>
                  <div style={{ color: "#C8102E" }}>{s.icon}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.93, fontSize: 20, color: "#fff", marginBottom: 10 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.44)", marginBottom: 12 }}>
                    {s.desc}
                  </p>
                  {serviceFor[s.title] && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                      <span style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>For:</span>
                      {serviceFor[s.title].map((tag) => (
                        <span key={tag} style={{ fontFamily: NV, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", border: BORDER, color: "rgba(255,255,255,0.4)", padding: "2px 8px" }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {s.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <CheckCircle2 size={11} style={{ color: "#C8102E", flexShrink: 0 }} />
                        <span style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.44)" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: BORDER, paddingTop: 16, marginTop: "auto" }}>
                  <div>
                    <span style={{ fontFamily: NV, fontWeight: 950, fontSize: 18, color: "#C8102E", letterSpacing: "-0.04em" }}>{s.metric}</span>
                    <span style={{ fontFamily: NV, fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: 6 }}>{s.metricLabel}</span>
                  </div>
                  <Link
                    href={(s as { href?: string }).href ?? "/contact"}
                    style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                  >
                    {s.cta} <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-20" style={{ borderTop: BORDER, borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8102E", marginBottom: 16 }}>Process</p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(40px,6vw,72px)", color: "#fff" }}>
              HOW WE WORK
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: BORDER }}>
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className="p-8 flex flex-col gap-5"
                style={{ borderRight: (i + 1) % 4 !== 0 ? BORDER : undefined, borderBottom: i < 1 ? BORDER : undefined }}
              >
                <div style={{ width: 40, height: 40, border: BORDER, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ color: "#C8102E" }}>{step.icon}</div>
                  <span style={{ position: "absolute", top: -10, right: -10, fontFamily: NV, fontSize: 10, fontWeight: 800, color: "#C8102E", letterSpacing: "0.08em" }}>{step.num}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.93, fontSize: 18, color: "#fff", marginBottom: 10 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.44)" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#8C000E" }} className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#fff", marginBottom: 16 }}>
              LET&apos;S BUILD<br />TOGETHER
            </h2>
            <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: 420 }}>
              Tell us what you need and we&apos;ll assemble the right team for your project. No fluff, just results.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "12px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              Get a Free Quote <ArrowRight size={12} />
            </Link>
            <Link href="/pricing" className="inline-flex items-center hover:opacity-80 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "0.8px solid rgba(255,255,255,0.4)", color: "#fff", padding: "12px 28px", textDecoration: "none" }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
