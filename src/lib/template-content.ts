export type TemplateCategory =
  | "Agency"
  | "SaaS"
  | "Real Estate"
  | "AI"
  | "Healthcare"
  | "Local Business"
  | "Portfolio"
  | "Directory"

export type TemplateTier = "Free" | "Premium"

export type WebsiteTemplate = {
  slug: string
  name: string
  eyebrow: string
  category: TemplateCategory
  tier: TemplateTier
  price: string
  status: "Ready" | "Coming soon" | "Customizable"
  description: string
  bestFor: string
  stack: readonly string[]
  pages: readonly string[]
  features: readonly string[]
  accent: string
  accentSoft: string
  layout: "editorial" | "dashboard" | "commerce" | "directory"
  featured?: boolean
  homeFeatured?: boolean
}

export const templateCategories = [
  "All",
  "Agency",
  "SaaS",
  "Real Estate",
  "AI",
  "Healthcare",
  "Local Business",
  "Portfolio",
  "Directory",
] as const

export const templateTiers = ["All", "Free", "Premium"] as const

export const websiteTemplates: readonly WebsiteTemplate[] = [
  {
    slug: "novasite-agency",
    name: "Novasite Agency",
    eyebrow: "Premium agency system",
    category: "Agency",
    tier: "Premium",
    price: "$99",
    status: "Ready",
    description: "Minimal red-black agency template for studios, creative operators, and AI-first service brands.",
    bestFor: "Agencies that need a cinematic homepage, service rows, process, proof, FAQ, and conversion CTA.",
    stack: ["Next.js", "Tailwind", "shadcn/ui"],
    pages: ["Home", "Services", "Work", "Contact"],
    features: ["Editorial hero", "Case-study rows", "Process grid", "Contact CTA"],
    accent: "#fff",
    accentSoft: "rgba(255,255,255,0.18)",
    layout: "editorial",
    featured: true,
    homeFeatured: true,
  },
  {
    slug: "brandkit-launch",
    name: "Brandkit Launch",
    eyebrow: "Minimal brand page",
    category: "Portfolio",
    tier: "Free",
    price: "Free",
    status: "Ready",
    description: "Compact brand identity landing page with logo, assets, colors, usage rules, and clean downloads.",
    bestFor: "Founders and studios that need a public brand kit without a heavy website.",
    stack: ["Next.js", "Tailwind"],
    pages: ["Home", "Assets", "Guidelines"],
    features: ["Asset rows", "Color tokens", "Usage notes", "Download CTA"],
    accent: "#F5F5F5",
    accentSoft: "rgba(255,255,255,0.13)",
    layout: "editorial",
    featured: true,
    homeFeatured: true,
  },
  {
    slug: "ai-agent-studio",
    name: "AI Agent Studio",
    eyebrow: "AI service template",
    category: "AI",
    tier: "Premium",
    price: "$129",
    status: "Customizable",
    description: "A conversion-focused AI agent service site with demos, agent types, integrations, and booking path.",
    bestFor: "AI agencies, automation consultants, and voice-agent operators.",
    stack: ["Next.js", "Tailwind", "API routes"],
    pages: ["Home", "Agents", "Pricing", "Contact"],
    features: ["Agent catalog", "Integration grid", "Use-case cards", "Demo CTA"],
    accent: "#6EE7F9",
    accentSoft: "rgba(110,231,249,0.16)",
    layout: "dashboard",
    featured: true,
    homeFeatured: true,
  },
  {
    slug: "property-prime",
    name: "Property Prime",
    eyebrow: "Real estate template",
    category: "Real Estate",
    tier: "Premium",
    price: "$149",
    status: "Ready",
    description: "Property showcase template with listing cards, location panels, lead forms, and agent profile sections.",
    bestFor: "Realtors, property developers, rental brands, and local listing businesses.",
    stack: ["Next.js", "Tailwind", "Supabase"],
    pages: ["Home", "Listings", "Property", "Contact"],
    features: ["Listing grid", "Lead capture", "Location block", "Gallery layout"],
    accent: "#F6C65B",
    accentSoft: "rgba(246,198,91,0.16)",
    layout: "commerce",
    featured: true,
    homeFeatured: true,
  },
  {
    slug: "clinic-flow",
    name: "Clinic Flow",
    eyebrow: "Healthcare website",
    category: "Healthcare",
    tier: "Premium",
    price: "$119",
    status: "Coming soon",
    description: "Trust-focused healthcare site with services, provider cards, appointment CTA, and patient resources.",
    bestFor: "Clinics, dentists, wellness practices, and specialist healthcare teams.",
    stack: ["Next.js", "Tailwind", "Forms"],
    pages: ["Home", "Services", "Doctors", "Booking"],
    features: ["Service cards", "Provider profiles", "FAQ rows", "Appointment CTA"],
    accent: "#7DD3A8",
    accentSoft: "rgba(125,211,168,0.16)",
    layout: "editorial",
  },
  {
    slug: "saas-console",
    name: "SaaS Console",
    eyebrow: "Startup launch kit",
    category: "SaaS",
    tier: "Premium",
    price: "$149",
    status: "Customizable",
    description: "SaaS marketing template with dashboard previews, pricing, changelog, integrations, and feature pages.",
    bestFor: "B2B SaaS products, AI tools, internal platforms, and productized services.",
    stack: ["Next.js", "Tailwind", "shadcn/ui"],
    pages: ["Home", "Features", "Pricing", "Docs"],
    features: ["Dashboard hero", "Pricing table", "Integrations", "Docs layout"],
    accent: "#A78BFA",
    accentSoft: "rgba(167,139,250,0.18)",
    layout: "dashboard",
    featured: true,
  },
  {
    slug: "local-service-pro",
    name: "Local Service Pro",
    eyebrow: "Lead-gen template",
    category: "Local Business",
    tier: "Free",
    price: "Free",
    status: "Ready",
    description: "Clean local-business template with services, reviews, maps, hours, and a direct quote request CTA.",
    bestFor: "Contractors, salons, repair services, consultants, and local operators.",
    stack: ["Next.js", "Tailwind"],
    pages: ["Home", "Services", "Reviews", "Contact"],
    features: ["Service menu", "Review rows", "Map section", "Quote form"],
    accent: "#F97316",
    accentSoft: "rgba(249,115,22,0.16)",
    layout: "editorial",
  },
  {
    slug: "creator-index",
    name: "Creator Index",
    eyebrow: "Portfolio directory",
    category: "Portfolio",
    tier: "Free",
    price: "Free",
    status: "Ready",
    description: "Personal brand template with projects, writing, services, featured links, and a lightweight newsletter CTA.",
    bestFor: "Designers, developers, writers, creators, and consultants.",
    stack: ["Next.js", "MDX", "Tailwind"],
    pages: ["Home", "Work", "Writing", "Contact"],
    features: ["Project list", "Writing feed", "Link blocks", "Newsletter CTA"],
    accent: "#E5E7EB",
    accentSoft: "rgba(229,231,235,0.14)",
    layout: "directory",
  },
  {
    slug: "market-grid",
    name: "Market Grid",
    eyebrow: "Directory template",
    category: "Directory",
    tier: "Premium",
    price: "$129",
    status: "Coming soon",
    description: "Searchable directory template with filters, featured listings, submission CTA, and sponsor placements.",
    bestFor: "Resource directories, app directories, local guides, and curated marketplaces.",
    stack: ["Next.js", "Tailwind", "Supabase"],
    pages: ["Home", "Directory", "Listing", "Submit"],
    features: ["Search filters", "Listing cards", "Submit form", "Sponsor slots"],
    accent: "#60A5FA",
    accentSoft: "rgba(96,165,250,0.16)",
    layout: "directory",
  },
  {
    slug: "restaurant-booking",
    name: "Restaurant Booking",
    eyebrow: "Hospitality template",
    category: "Local Business",
    tier: "Premium",
    price: "$89",
    status: "Ready",
    description: "Hospitality template with menu sections, reservation CTA, event blocks, and gallery-first storytelling.",
    bestFor: "Restaurants, cafes, private chefs, bars, and food brands.",
    stack: ["Next.js", "Tailwind", "Forms"],
    pages: ["Home", "Menu", "Events", "Reserve"],
    features: ["Menu layout", "Gallery rows", "Reservation CTA", "Event cards"],
    accent: "#FB7185",
    accentSoft: "rgba(251,113,133,0.16)",
    layout: "commerce",
  },
  {
    slug: "automation-ops",
    name: "Automation Ops",
    eyebrow: "Operations landing page",
    category: "AI",
    tier: "Premium",
    price: "$99",
    status: "Ready",
    description: "Automation service template built around workflows, systems diagrams, CRM handoff, and ROI proof.",
    bestFor: "Automation consultants, CRM builders, and operations teams.",
    stack: ["Next.js", "Tailwind", "API routes"],
    pages: ["Home", "Workflows", "Proof", "Contact"],
    features: ["Workflow map", "Proof rows", "Tool stack", "Audit CTA"],
    accent: "#34D399",
    accentSoft: "rgba(52,211,153,0.16)",
    layout: "dashboard",
  },
  {
    slug: "launch-page-lite",
    name: "Launch Page Lite",
    eyebrow: "Free landing page",
    category: "SaaS",
    tier: "Free",
    price: "Free",
    status: "Ready",
    description: "Small launch page with hero, waitlist CTA, feature list, social proof, FAQ, and final conversion block.",
    bestFor: "New products, waitlists, MVP launches, and early validation pages.",
    stack: ["Next.js", "Tailwind"],
    pages: ["Home", "Waitlist"],
    features: ["Waitlist hero", "Feature rows", "FAQ", "CTA block"],
    accent: "#FDE047",
    accentSoft: "rgba(253,224,71,0.14)",
    layout: "editorial",
  },
] as const

export const featuredTemplates = websiteTemplates.filter((template) => template.featured)
export const homeFeaturedTemplates = websiteTemplates.filter((template) => template.homeFeatured)

export const templateContactHref = (slug: string) => `/contact?source=template&template=${slug}`
