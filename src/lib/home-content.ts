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

export type LivingCopy = {
  heroSignal: string
  priorityLine: string
  taglineLead: string
  taglineRest: string
  finalSignal: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
}

export type LivingPageId = "home"

export type LivingSectionId =
  | "about"
  | "response"
  | "why"
  | "services"
  | "work"
  | "process"
  | "service-tagline"
  | "final-cta"

export type LivingTextSlotId =
  | "about-body"
  | "response-headline"
  | "response-rest"
  | "why-intro"
  | "services-priority"
  | "work-intro"
  | "process-intro"
  | "service-tagline-headline"
  | "service-tagline-rest"
  | "final-signal"
  | "primary-cta"
  | "secondary-cta"

export type LivingTextSlot = {
  pageId: LivingPageId
  slotId: LivingTextSlotId
  sectionId: LivingSectionId
  fallbackText: string
  tone: "agency" | "proof" | "direction" | "cta"
  maxLength: number
  locked?: boolean
}

export type LivingSlotCopyMap = Partial<Record<LivingTextSlotId, string>>

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

export type AgencySystemLane = {
  title: string
  label: string
  href: string
  items: readonly string[]
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

export const getFallbackLivingCopy = (intent: HomeIntent): LivingCopy => {
  const profile = intentProfiles[intent]

  return {
    heroSignal: profile.signal,
    priorityLine: profile.heroLine,
    taglineLead: profile.taglineLead,
    taglineRest: profile.taglineRest,
    finalSignal: profile.signal,
    primaryCtaLabel: profile.primaryCta.label,
    secondaryCtaLabel: profile.secondaryCta.label,
  }
}

export const HOME_LIVING_TEXT_SLOTS: readonly LivingTextSlot[] = [
  {
    pageId: "home",
    slotId: "about-body",
    sectionId: "about",
    fallbackText: "VOICE AGENTS, WEBSITES, AND AUTOMATION FOR THE MODERN OPERATOR. FROM SOLO FOUNDERS TO SCALING BRANDS, WE TURN IDEAS INTO SYSTEMS THAT WORK.",
    tone: "agency",
    maxLength: 150,
  },
  {
    pageId: "home",
    slotId: "response-headline",
    sectionId: "response",
    fallbackText: intentProfiles["ai-agents"].taglineLead,
    tone: "direction",
    maxLength: 72,
  },
  {
    pageId: "home",
    slotId: "response-rest",
    sectionId: "response",
    fallbackText: intentProfiles["ai-agents"].taglineRest,
    tone: "direction",
    maxLength: 120,
  },
  {
    pageId: "home",
    slotId: "why-intro",
    sectionId: "why",
    fallbackText: "We're not another agency. We're an AI-native studio that builds systems and then makes them measurable.",
    tone: "proof",
    maxLength: 132,
  },
  {
    pageId: "home",
    slotId: "services-priority",
    sectionId: "services",
    fallbackText: intentProfiles["ai-agents"].heroLine,
    tone: "direction",
    maxLength: 96,
  },
  {
    pageId: "home",
    slotId: "work-intro",
    sectionId: "work",
    fallbackText: "Project proof shifts toward the service signals this visitor is showing.",
    tone: "proof",
    maxLength: 112,
  },
  {
    pageId: "home",
    slotId: "process-intro",
    sectionId: "process",
    fallbackText: "See how our proven process transforms your brand with custom-built systems that deliver measurable impact from day one.",
    tone: "proof",
    maxLength: 130,
  },
  {
    pageId: "home",
    slotId: "service-tagline-headline",
    sectionId: "service-tagline",
    fallbackText: intentProfiles["ai-agents"].taglineLead,
    tone: "agency",
    maxLength: 72,
  },
  {
    pageId: "home",
    slotId: "service-tagline-rest",
    sectionId: "service-tagline",
    fallbackText: intentProfiles["ai-agents"].taglineRest,
    tone: "agency",
    maxLength: 120,
  },
  {
    pageId: "home",
    slotId: "final-signal",
    sectionId: "final-cta",
    fallbackText: intentProfiles["ai-agents"].signal,
    tone: "cta",
    maxLength: 72,
  },
  {
    pageId: "home",
    slotId: "primary-cta",
    sectionId: "final-cta",
    fallbackText: intentProfiles["ai-agents"].primaryCta.label,
    tone: "cta",
    maxLength: 32,
  },
  {
    pageId: "home",
    slotId: "secondary-cta",
    sectionId: "final-cta",
    fallbackText: intentProfiles["ai-agents"].secondaryCta.label,
    tone: "cta",
    maxLength: 32,
  },
]

export const HOME_LIVING_TEXT_SLOT_IDS = HOME_LIVING_TEXT_SLOTS.map((slot) => slot.slotId)

export const homeLivingTextSlotById = HOME_LIVING_TEXT_SLOTS.reduce(
  (slots, slot) => {
    slots[slot.slotId] = slot
    return slots
  },
  {} as Record<LivingTextSlotId, LivingTextSlot>,
)

export const getFallbackLivingSlotCopy = (slotId: LivingTextSlotId, intent: HomeIntent, fallbackText?: string) => {
  const profile = intentProfiles[intent]
  const slot = homeLivingTextSlotById[slotId]
  const contextualCopy = intentSlotCopy[intent]?.[slotId]

  if (contextualCopy) return contextualCopy

  const profileCopy: LivingSlotCopyMap = {
    "response-headline": profile.taglineLead,
    "response-rest": profile.taglineRest,
    "services-priority": profile.heroLine,
    "service-tagline-headline": profile.taglineLead,
    "service-tagline-rest": profile.taglineRest,
    "final-signal": profile.signal,
    "primary-cta": profile.primaryCta.label,
    "secondary-cta": profile.secondaryCta.label,
  }

  return profileCopy[slotId] ?? slot?.fallbackText ?? fallbackText ?? ""
}

const intentSlotCopy: Record<HomeIntent, LivingSlotCopyMap> = {
  "ai-agents": {
    "about-body": "VOICE AGENTS, AI WORKSPACES, AND AUTOMATION FOR OPERATORS WHO WANT THE SITE TO THINK WITH THE BUSINESS.",
    "why-intro": "9Ruby builds AI-native systems that answer, qualify, route, and improve without turning the site into a chatbot.",
    "work-intro": "Proof moves toward agents, voice flows, and automated systems that reduce manual work.",
    "process-intro": "We map the workflow, build the agent layer, test the handoffs, and tune the system against real conversations.",
  },
  voice: {
    "about-body": "VOICE AGENTS, CALL FLOWS, WEBSITES, AND AUTOMATION FOR BRANDS THAT CANNOT AFFORD SLOW RESPONSE.",
    "why-intro": "We connect voice, web, and operations so calls can be answered, qualified, and routed with less manual pressure.",
    "work-intro": "Proof moves toward voice systems, booking flows, and follow-up automation.",
    "process-intro": "We script the call path, connect the tools, test handoffs, and tune the experience before launch.",
  },
  websites: {
    "about-body": "WEBSITES, LANDING PAGES, AND WEB SYSTEMS BUILT TO LOOK SHARP, LOAD FAST, AND TURN ATTENTION INTO ACTION.",
    "why-intro": "We combine design, engineering, and AI-assisted delivery so the website becomes a working system, not a brochure.",
    "work-intro": "Proof moves toward website builds, conversion work, and public systems with clear business paths.",
    "process-intro": "We clarify the offer, design the user path, build the site, and improve the details that affect conversion.",
  },
  templates: {
    "about-body": "TEMPLATES, STARTER SYSTEMS, AND CUSTOM BUILDS FOR FOUNDERS WHO WANT TO LAUNCH FAST WITHOUT LOOKING GENERIC.",
    "why-intro": "We use template speed with agency polish, then customize the structure around the actual offer.",
    "work-intro": "Proof moves toward template launches, fast websites, and design systems that can grow.",
    "process-intro": "We pick the strongest starting point, adapt the content, tune the brand, and prepare the build for real use.",
  },
  automation: {
    "about-body": "AUTOMATION, CRM FLOWS, AI AGENTS, AND WEBSITES THAT CONNECT LEADS, FOLLOW-UP, REPORTING, AND DELIVERY.",
    "why-intro": "We build the operational layer behind the website so leads, tasks, and reports move without constant manual work.",
    "work-intro": "Proof moves toward workflows, CRM paths, lead routing, and reporting systems.",
    "process-intro": "We map the repeated work, connect the stack, remove weak handoffs, and monitor the workflow after launch.",
  },
  seo: {
    "about-body": "SEO, CONTENT SYSTEMS, WEBSITE FIXES, AND CONVERSION WORK FOR BRANDS THAT WANT SEARCH TO COMPOUND.",
    "why-intro": "We pair technical SEO with content systems and conversion fixes so traffic has a better path to revenue.",
    "work-intro": "Proof moves toward SEO fixes, content engines, and websites that convert organic demand.",
    "process-intro": "We audit the site, prioritize the highest-impact fixes, build the content path, and measure the movement.",
  },
  tools: {
    "about-body": "FREE TOOLS, TEMPLATES, AND FIX-IT SERVICES THAT HELP VISITORS FIND WHAT TO IMPROVE NEXT.",
    "why-intro": "The site gives useful tools first, then shows where 9Ruby can handle the implementation when help is needed.",
    "work-intro": "Proof moves toward practical tools, quick audits, and services that turn findings into fixes.",
    "process-intro": "We let the tool reveal the issue, turn the finding into a clear scope, then fix the system behind it.",
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

export const agencySystemLanes: readonly AgencySystemLane[] = [
  {
    title: "Services",
    label: "Client work",
    href: "/services",
    items: ["AI chatbots", "Website design", "Voice AI", "SEO & analytics"],
  },
  {
    title: "Products",
    label: "Owned systems",
    href: "/products",
    items: ["Ruby OS", "OpenClaw", "9Ruby AI", "Visual Builder"],
  },
  {
    title: "Tools",
    label: "Free entry",
    href: "/tools",
    items: ["Ruby Core assets", "Marketing tools", "Analytics suite", "Lead scraper"],
  },
  {
    title: "Marketplace",
    label: "Digital assets",
    href: "/templates",
    items: ["Icons", "Templates", "Themes", "Plugins"],
  },
  {
    title: "Operations",
    label: "Business control",
    href: "/dashboard",
    items: ["Clients", "Campaigns", "Leads", "Automations"],
  },
  {
    title: "Resources",
    label: "Proof & docs",
    href: "/docs",
    items: ["Blog", "Case studies", "Documentation", "Company"],
  },
] as const

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
    color: "#fff",
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
    color: "#fff",
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
    color: "#fff",
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
  { num: "01", title: "RESEARCH & DEFINE", body: "We study the offer, audience, search path, and conversion blockers before design begins." },
  { num: "02", title: "IDEATE & DESIGN", body: "We shape the website, tools, and AI flows into a clean public system people can understand." },
  { num: "03", title: "TEST & IMPLEMENT", body: "We build, connect, test, and tune the experience so it is ready for real clients." },
] as const

export const testimonials = [
  { quote: "9Ruby built an AI voice agent that books 40 calls a week while we sleep. Best investment we've made.", name: "Alex R.", role: "Founder, TechScale" },
  { quote: "The website they built looks better than anything I've seen from agencies charging 5x more.", name: "Priya M.", role: "CEO, Saumya Properties" },
  { quote: "From idea to live in 2 weeks. Their system is dialed.", name: "James K.", role: "Director, ClearPath" },
] as const
