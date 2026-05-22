import type { Metadata } from "next"

export type SeoMoneyPage = {
  slug: string
  eyebrow: string
  title: string
  subtitle: string
  metadata: Metadata
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  quickStats: [string, string][]
  bestFor: string[]
  buyerProblems: string[]
  system: string[]
  proofNote: string
  faq: [string, string][]
  related: { label: string; href: string; text: string }[]
}

export const seoMoneyPages = {
  "ai-website-design": {
    slug: "ai-website-design",
    eyebrow: "AI website design",
    title: "AI websites that turn visitors into leads",
    subtitle:
      "9Ruby builds sharp business websites with AI-assisted research, conversion copy, lead capture, and practical automation paths. Start with a score or audit before committing to a full build.",
    metadata: {
      title: "AI Website Design for Lead Generation | 9Ruby",
      description:
        "AI-assisted website design for local businesses and founders. 9Ruby builds conversion-focused pages, lead capture, SEO structure, and automation-ready websites.",
    },
    primaryCta: { label: "Get the $49 website audit", href: "/audit" },
    secondaryCta: { label: "Request free preview", href: "/landing-page-preview" },
    quickStats: [
      ["24-48h", "audit first step"],
      ["$499+", "launch sprint path"],
      ["AI + human", "copy/design workflow"],
      ["Lead-ready", "forms and CTAs"],
    ],
    bestFor: [
      "Service businesses that need more calls, bookings, quote requests, or WhatsApp leads",
      "Founders who need a polished public website without a long agency process",
      "Teams with an old site that looks fine but does not explain the offer fast enough",
      "Businesses that want future AI agents, CRM, or follow-up automation connected to the site",
    ],
    buyerProblems: [
      "The homepage is attractive but visitors cannot tell what to do next.",
      "The website has no clear lead path for phone, WhatsApp, booking, quote, or form requests.",
      "Important proof, offers, pricing, and process details are buried or missing.",
      "SEO pages are generic, so the site does not capture high-intent searches.",
    ],
    system: [
      "A first-screen offer that names the buyer, outcome, and next action.",
      "Conversion sections for proof, service scope, process, pricing path, and FAQs.",
      "SEO structure for target services, locations, and buyer problems.",
      "A lead-capture path that can later connect to Ruby/Hermes follow-up automation.",
    ],
    proofNote:
      "We do not start with vague design moodboards. We start by finding the revenue path, then build the page around the action you want visitors to take.",
    faq: [
      ["Is this just AI-generated web design?", "No. AI helps with research, structure, copy drafts, and automation planning; 9Ruby still edits, designs, and ships the final website around your real offer."],
      ["Can you improve an existing website?", "Yes. The $49 audit is the best first step when you already have a website and want ranked fixes before a rebuild."],
      ["Can you build from zero?", "Yes. If you have no website or the current one is too outdated, start with the free landing-page preview."],
      ["What happens after launch?", "We can add forms, CRM paths, SEO pages, AI follow-up, care plans, and monthly growth improvements."],
    ],
    related: [
      { label: "Free landing-page preview", href: "/landing-page-preview", text: "Best if you have no website or an outdated website." },
      { label: "$49 AI + Website Audit", href: "/audit", text: "Best if your current site needs conversion and SEO fixes." },
      { label: "Dubai business website design", href: "/dubai-business-website-design", text: "Local SEO page for Dubai-based businesses." },
    ],
  },
  "ai-lead-capture-system": {
    slug: "ai-lead-capture-system",
    eyebrow: "AI lead capture system",
    title: "Capture, qualify, and follow up with more website leads",
    subtitle:
      "9Ruby helps local businesses turn website traffic into usable inquiries with sharper CTAs, better forms, lead routing, and AI-assisted follow-up opportunities.",
    metadata: {
      title: "AI Lead Capture System for Local Businesses | 9Ruby",
      description:
        "Improve website lead capture with better CTAs, forms, qualification, routing, and AI follow-up opportunities. Start with a 9Ruby audit or revenue score.",
    },
    primaryCta: { label: "Run the $49 lead audit", href: "/audit" },
    secondaryCta: { label: "Free revenue score", href: "/revenue-score" },
    quickStats: [
      ["3+", "quick wins"],
      ["24-48h", "audit delivery"],
      ["$750+", "automation sprint path"],
      ["Manual first", "safe rollout"],
    ],
    bestFor: [
      "Clinics, med spas, real estate, home services, consultants, and other appointment or quote-driven businesses",
      "Websites where visitors browse but do not contact the business",
      "Teams that lose leads because replies are slow, manual, or inconsistent",
      "Businesses that want AI help without handing over sensitive decisions to a bot",
    ],
    buyerProblems: [
      "The main CTA does not match the visitor's urgency: call, book, WhatsApp, quote, or consultation.",
      "Forms collect too little context, so follow-up takes extra back-and-forth.",
      "Leads land in email but are not tagged, scored, or followed up quickly.",
      "The business wants automation but has not mapped the safe first workflow yet.",
    ],
    system: [
      "High-intent CTAs above the fold and near every decision point.",
      "Short intake forms that ask only what the team needs to act fast.",
      "Lead routing notes for email, CRM, spreadsheet, or manual review queues.",
      "AI follow-up opportunities with approval gates for sensitive replies and customer communication.",
    ],
    proofNote:
      "The safest first version is not a black-box chatbot. It is a clean lead path, a useful intake, and a follow-up workflow humans can review before scaling.",
    faq: [
      ["Do you send automated messages for us immediately?", "No. We start with mapping and draft/review flows. Real customer messaging requires explicit approval and safe sender setup."],
      ["Can this work with my current website?", "Usually yes. We can often improve CTA placement, forms, and follow-up without a full rebuild."],
      ["What if I only need a form fixed?", "Start with the audit or score. If the fix is small, we can quote a focused implementation sprint."],
      ["Can it connect to CRM later?", "Yes. The system can later connect to tools like Airtable, Notion, Sheets, Supabase, or other CRMs depending on credentials and approval."],
    ],
    related: [
      { label: "$49 AI + Website Audit", href: "/audit", text: "Find the lead leaks before building automation." },
      { label: "Website conversion for local services", href: "/services/website-conversion-system-for-local-services", text: "Niche page for local-service lead paths." },
      { label: "Website Revenue Monitor", href: "/services/website-revenue-monitor", text: "Recurring public-site checks after the audit." },
    ],
  },
  "dubai-business-website-design": {
    slug: "dubai-business-website-design",
    eyebrow: "Dubai business website design",
    title: "Websites for Dubai businesses that need leads, not just pages",
    subtitle:
      "9Ruby is a Dubai-based studio for business websites, landing pages, AI lead systems, and practical automation. Start with a free preview or a $49 audit depending on your current site.",
    metadata: {
      title: "Dubai Business Website Design + AI Lead Systems | 9Ruby",
      description:
        "Dubai-based website design for local businesses, founders, clinics, services, and agencies. 9Ruby builds lead-focused websites, landing pages, and AI-ready systems.",
    },
    primaryCta: { label: "Request free preview", href: "/landing-page-preview" },
    secondaryCta: { label: "Audit current site", href: "/audit" },
    quickStats: [
      ["Dubai", "local studio"],
      ["$499+", "simple launch path"],
      ["$99/mo+", "care path"],
      ["AI-ready", "automation upgrades"],
    ],
    bestFor: [
      "New Dubai businesses that need a credible first website or landing page",
      "Existing businesses with an outdated website that does not create inquiries",
      "Service providers that need WhatsApp, booking, phone, quote, or consultation paths",
      "Founders who want one partner for website, SEO pages, AI agents, and future automations",
    ],
    buyerProblems: [
      "The website looks generic and does not make the Dubai business feel credible fast enough.",
      "The contact path is hidden, slow, or not mobile-friendly for local visitors.",
      "The page does not explain pricing, scope, services, or next steps clearly.",
      "There is no SEO structure for location, service, and buyer-intent searches.",
    ],
    system: [
      "A landing page or website structure built around one primary business action.",
      "Local trust sections for service area, proof, process, FAQs, and contact options.",
      "SEO-ready service/location pages that can grow over time.",
      "Optional forms, CRM capture, WhatsApp paths, and AI follow-up planning.",
    ],
    proofNote:
      "For no-website or outdated-site prospects, the easiest trust step is a free landing-page preview. You see the direction before deciding whether to launch it.",
    faq: [
      ["Do you only work with Dubai businesses?", "No. 9Ruby can work remotely, but this page is for Dubai and UAE businesses looking for a local-facing website partner."],
      ["What should I choose first?", "If you have no website or it is very outdated, request a free preview. If you already have a working site, start with the $49 audit."],
      ["Can you maintain the website monthly?", "Yes. Website care and growth plans can handle edits, checks, SEO ideas, and lead-system improvements."],
      ["Can you add AI later?", "Yes. We can add AI lead capture, receptionist-style workflows, draft replies, or internal automation after the main lead path is clear."],
    ],
    related: [
      { label: "AI website design", href: "/ai-website-design", text: "For AI-assisted sites and conversion-focused builds." },
      { label: "Free landing-page preview", href: "/landing-page-preview", text: "See a first concept before paying to launch." },
      { label: "AI lead capture system", href: "/ai-lead-capture-system", text: "Add forms, routing, and follow-up systems." },
    ],
  },
} as const satisfies Record<string, SeoMoneyPage>

export const seoMoneyPageList = Object.values(seoMoneyPages)
