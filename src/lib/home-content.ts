export const HOME_INTENTS = [
  "ai-agents",
  "voice",
  "websites",
  "templates",
  "automation",
  "seo",
  "tools",
] as const

export type HomeIntent = (typeof HOME_INTENTS)[number]
export type IntentScoreMap = Record<HomeIntent, number>

export type HomeCta = {
  label: string
  href: string
  external?: boolean
}

export type IntentProfile = {
  label: string
  signal: string
  heroLine: string
  taglineLead: string
  taglineRest: string
  primaryCta: HomeCta
  secondaryCta: HomeCta
}

export type HomeRankable = {
  id: string
  primaryIntent: HomeIntent
  intents: readonly HomeIntent[]
}

export type HeroService = HomeRankable & {
  label: string
  href: string
  external?: boolean
}

export type HomeServiceCard = HomeRankable & {
  num: string
  title: string
  desc: string
  href: string
}

export type HomeProject = HomeRankable & {
  tag: string
  title: string
  client: string
  result: string
  color: string
  href: string
}

export const buildLivingContactHref = (intent: HomeIntent) =>
  `/contact?source=living-home&intent=${intent}`

export const intentProfiles: Record<HomeIntent, IntentProfile> = {
  "ai-agents": {
    label: "AI agents",
    signal: "Prioritizing AI systems",
    heroLine: "AI agents, voice, and automation are moving forward.",
    taglineLead: "AI AGENTS THAT QUALIFY, ANSWER, AND SELL",
    taglineRest: "while your team focuses on direction, taste, and growth.",
    primaryCta: { label: "Build my AI agent", href: buildLivingContactHref("ai-agents") },
    secondaryCta: { label: "Try 9Ruby AI", href: "https://ai.9ruby.com", external: true },
  },
  voice: {
    label: "voice systems",
    signal: "Prioritizing voice systems",
    heroLine: "Voice agents and call flows are moving forward.",
    taglineLead: "VOICE SYSTEMS THAT ANSWER, QUALIFY, AND BOOK",
    taglineRest: "with fast response loops and human handoff when needed.",
    primaryCta: { label: "Build my voice agent", href: buildLivingContactHref("voice") },
    secondaryCta: { label: "View voice systems", href: "/services/voice-agents" },
  },
  websites: {
    label: "websites",
    signal: "Prioritizing website builds",
    heroLine: "Web design, conversion, and polish are moving forward.",
    taglineLead: "WEBSITES THAT LOOK SHARP AND CONVERT",
    taglineRest: "from landing pages to full-stack public systems.",
    primaryCta: { label: "Fix my website", href: buildLivingContactHref("websites") },
    secondaryCta: { label: "Browse templates", href: "/templates" },
  },
  templates: {
    label: "templates",
    signal: "Prioritizing templates",
    heroLine: "Templates and faster launches are moving forward.",
    taglineLead: "TEMPLATES THAT START FAST AND SCALE CLEANLY",
    taglineRest: "with production-ready structure and 9Ruby polish.",
    primaryCta: { label: "Customize a template", href: buildLivingContactHref("templates") },
    secondaryCta: { label: "Browse templates", href: "/templates" },
  },
  automation: {
    label: "automation",
    signal: "Prioritizing automation",
    heroLine: "Workflows, CRMs, and operations are moving forward.",
    taglineLead: "AUTOMATION THAT CONNECTS YOUR OPERATIONS",
    taglineRest: "from lead capture to reporting and follow-up.",
    primaryCta: { label: "Automate my workflow", href: buildLivingContactHref("automation") },
    secondaryCta: { label: "Explore services", href: "/services#automation" },
  },
  seo: {
    label: "SEO growth",
    signal: "Prioritizing SEO growth",
    heroLine: "Search, content, and conversion are moving forward.",
    taglineLead: "SEO SYSTEMS THAT COMPOUND ORGANIC DEMAND",
    taglineRest: "with technical fixes, content engines, and measurable lifts.",
    primaryCta: { label: "Fix my SEO", href: buildLivingContactHref("seo") },
    secondaryCta: { label: "Run SEO checker", href: "/tools/seo-checker" },
  },
  tools: {
    label: "free tools",
    signal: "Prioritizing tools",
    heroLine: "Tools, checks, and fast fixes are moving forward.",
    taglineLead: "FREE TOOLS THAT REVEAL WHAT TO FIX NEXT",
    taglineRest: "then 9Ruby can handle the implementation when you want help.",
    primaryCta: { label: "Request a tool", href: buildLivingContactHref("tools") },
    secondaryCta: { label: "Open toolbox", href: "/tools" },
  },
}

export const heroServices: readonly HeroService[] = [
  { id: "hero-voice", label: "Voice Agents", primaryIntent: "voice", intents: ["voice", "ai-agents"], href: "/services/voice-agents" },
  { id: "hero-ai", label: "AI Workspace", primaryIntent: "ai-agents", intents: ["ai-agents", "automation"], href: "https://ai.9ruby.com", external: true },
  { id: "hero-templates", label: "Web Templates", primaryIntent: "templates", intents: ["templates", "websites"], href: "/templates" },
  { id: "hero-automation", label: "Automation", primaryIntent: "automation", intents: ["automation", "tools"], href: "/services#automation" },
  { id: "hero-websites", label: "Websites", primaryIntent: "websites", intents: ["websites", "templates"], href: "/services#web-design" },
  { id: "hero-seo", label: "SEO Growth", primaryIntent: "seo", intents: ["seo", "tools"], href: "/services#seo" },
  { id: "hero-tools", label: "Free Tools", primaryIntent: "tools", intents: ["tools", "seo", "templates"], href: "/tools" },
]

export const serviceCards: readonly HomeServiceCard[] = [
  {
    id: "ai-agents",
    num: "01",
    title: "AI Agents",
    desc: "Autonomous agents that qualify leads, answer support, book appointments, and close deals - 24/7.",
    href: "/services#ai-chatbots",
    primaryIntent: "ai-agents",
    intents: ["ai-agents", "automation", "tools"],
  },
  {
    id: "voice-systems",
    num: "02",
    title: "Voice Systems",
    desc: "Outbound sales callers, inbound support agents, and voice automation powered by ElevenLabs.",
    href: "/services/voice-agents",
    primaryIntent: "voice",
    intents: ["voice", "ai-agents", "automation"],
  },
  {
    id: "website-design",
    num: "03",
    title: "Website Design",
    desc: "Full-stack websites from landing pages to complex web apps. AI-assisted, hand-polished.",
    href: "/services#web-design",
    primaryIntent: "websites",
    intents: ["websites", "templates", "seo"],
  },
  {
    id: "web-templates",
    num: "04",
    title: "Web Templates",
    desc: "Production-ready Next.js templates for SaaS, agencies, portfolios, and e-commerce.",
    href: "/templates",
    primaryIntent: "templates",
    intents: ["templates", "websites", "tools"],
  },
  {
    id: "seo-content",
    num: "05",
    title: "SEO & Content",
    desc: "AI-powered content pipelines that compound organic traffic and drive qualified conversions.",
    href: "/services#seo",
    primaryIntent: "seo",
    intents: ["seo", "tools", "websites"],
  },
  {
    id: "automation",
    num: "06",
    title: "Automation",
    desc: "End-to-end workflow automation connecting your CRM, outreach, analytics, and ops stack.",
    href: "/services#automation",
    primaryIntent: "automation",
    intents: ["automation", "ai-agents", "tools"],
  },
]

export const projects: readonly HomeProject[] = [
  {
    id: "outbound-sales-agent",
    tag: "AI + VOICE",
    title: "Outbound Sales Agent",
    client: "TechScale",
    result: "3.2x revenue in 90 days",
    color: "#C8102E",
    href: "/cases",
    primaryIntent: "voice",
    intents: ["voice", "ai-agents", "automation"],
  },
  {
    id: "ecommerce-redesign",
    tag: "WEB DESIGN",
    title: "E-commerce Redesign",
    client: "Saumya Properties",
    result: "+68% conversion rate",
    color: "#C8102E",
    href: "/cases",
    primaryIntent: "websites",
    intents: ["websites", "templates", "seo"],
  },
  {
    id: "lead-pipeline-system",
    tag: "AUTOMATION",
    title: "Lead Pipeline System",
    client: "ClearPath Therapy",
    result: "12x more qualified leads",
    color: "#C8102E",
    href: "/cases",
    primaryIntent: "automation",
    intents: ["automation", "ai-agents", "tools"],
  },
]

export const stats = [
  { value: "47+", label: "Projects delivered" },
  { value: "3.8x", label: "Avg revenue lift" },
  { value: "92%", label: "Client retention" },
  { value: "<500ms", label: "Voice latency" },
] as const

export const processSteps = [
  { num: "01", title: "DISCOVER & DEFINE", body: "We begin by understanding your business, your users, and your goals - from day one to launch." },
  { num: "02", title: "BUILD & INTEGRATE", body: "We wire up AI agents, voice systems, and websites using battle-tested stacks and real integrations." },
  { num: "03", title: "DEPLOY & SCALE", body: "We ship fast, monitor closely, and iterate until the numbers move in the right direction." },
] as const

export const testimonials = [
  { quote: "9Ruby built an AI voice agent that books 40 calls a week while we sleep. Best investment we've made.", name: "Alex R.", role: "Founder, TechScale" },
  { quote: "The website they built looks better than anything I've seen from agencies charging 5x more.", name: "Priya M.", role: "CEO, Saumya Properties" },
  { quote: "From idea to live in 2 weeks. Their system is dialed.", name: "James K.", role: "Director, ClearPath" },
] as const
