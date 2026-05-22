export type TemplateCategory =
  | "AI"
  | "Agency"
  | "SaaS"
  | "Local Business"
  | "Portfolio"
  | "Commerce"
  | "Healthcare"
  | "Event"
  | "Auth"

export type TemplateStyle =
  | "Dark"
  | "Minimal"
  | "Editorial"
  | "Dashboard"
  | "Premium"
  | "Warm"
  | "Utility"

export type ApprovedTemplate = {
  slug: string
  name: string
  title: string
  category: TemplateCategory
  style: TemplateStyle
  previewUrl: string
  description: string
  bestFor: string
  tags: readonly string[]
  featured?: boolean
}

export const templateCategories = [
  "All",
  "AI",
  "Agency",
  "SaaS",
  "Local Business",
  "Portfolio",
  "Commerce",
  "Healthcare",
  "Event",
  "Auth",
] as const

export const templateStyles = ["All", "Dark", "Minimal", "Editorial", "Dashboard", "Premium", "Warm", "Utility"] as const

export const approvedTemplates: readonly ApprovedTemplate[] = [
  {
    slug: "remote",
    name: "Remote",
    title: "Remote - 100% editable SaaS template",
    category: "SaaS",
    style: "Premium",
    previewUrl: "https://remote.9ruby.com",
    description: "A polished remote-work SaaS page for platforms, hiring products, and async service teams.",
    bestFor: "Remote work tools, hiring platforms, productivity products, and distributed service brands.",
    tags: ["SaaS", "Remote work", "Landing page", "B2B"],
    featured: true,
  },
  {
    slug: "launchgrid",
    name: "LaunchGrid",
    title: "AI platform launch page",
    category: "AI",
    style: "Dashboard",
    previewUrl: "https://launchgrid.9ruby.com",
    description: "A structured AI product landing page with platform messaging, feature blocks, and conversion CTAs.",
    bestFor: "AI platforms, automation products, internal tools, and technical SaaS launches.",
    tags: ["AI", "Platform", "Launch", "Dashboard"],
    featured: true,
  },
  {
    slug: "nightops",
    name: "NightOps",
    title: "Dark operations template",
    category: "AI",
    style: "Dark",
    previewUrl: "https://nightops.9ruby.com",
    description: "A dark, technical operations template with strong contrast and command-center energy.",
    bestFor: "Security tools, agent systems, monitoring dashboards, and technical services.",
    tags: ["AI", "Operations", "Dark UI", "Monitoring"],
    featured: true,
  },
  {
    slug: "monocore",
    name: "MonoCore",
    title: "Monochrome ASCII product system",
    category: "SaaS",
    style: "Minimal",
    previewUrl: "https://monocore.9ruby.com",
    description: "A monochrome technical template with ASCII-inspired styling and dense product sections.",
    bestFor: "Developer tools, infrastructure products, command-line software, and technical agencies.",
    tags: ["Developer", "Monochrome", "Technical", "SaaS"],
    featured: true,
  },
  {
    slug: "gridum",
    name: "Gridum",
    title: "Minimal designer and agency template",
    category: "Agency",
    style: "Minimal",
    previewUrl: "https://gridum.9ruby.com",
    description: "A clean design-studio layout with sharp hierarchy, portfolio energy, and restrained motion.",
    bestFor: "Designers, creative studios, personal agencies, and small service firms.",
    tags: ["Agency", "Portfolio", "Design", "Minimal"],
    featured: true,
  },
  {
    slug: "producthub",
    name: "ProductHub",
    title: "Digital goods storefront",
    category: "Commerce",
    style: "Dashboard",
    previewUrl: "https://producthub.9ruby.com",
    description: "A productized storefront for selling access, downloads, bundles, and digital resources.",
    bestFor: "Template shops, digital product businesses, creator stores, and gated resource hubs.",
    tags: ["Commerce", "Digital goods", "Productized", "Store"],
  },
  {
    slug: "forgestack",
    name: "ForgeStack",
    title: "Brutalist AI SaaS landing page",
    category: "AI",
    style: "Dark",
    previewUrl: "https://forgestack.9ruby.com",
    description: "A brutalist dark UI kit for engineering-grade AI products and serious technical offers.",
    bestFor: "AI infrastructure, devtools, cybersecurity products, and technical consultants.",
    tags: ["AI", "Brutalist", "Dark UI", "Engineering"],
    featured: true,
  },
  {
    slug: "queuespark",
    name: "QueueSpark",
    title: "Waitlist launch page",
    category: "SaaS",
    style: "Minimal",
    previewUrl: "https://queuespark.9ruby.com",
    description: "A focused waitlist page for early access launches and lightweight product validation.",
    bestFor: "MVP launches, early-access products, waitlists, and pre-sell campaigns.",
    tags: ["Waitlist", "Launch", "SaaS", "MVP"],
  },
  {
    slug: "accessnine",
    name: "AccessNine",
    title: "Sign-in and auth template",
    category: "Auth",
    style: "Utility",
    previewUrl: "https://accessnine.9ruby.com",
    description: "A compact auth-flow template for login, signup, and protected product entry points.",
    bestFor: "SaaS onboarding, internal tools, member portals, and account-based products.",
    tags: ["Auth", "Sign in", "SaaS", "Portal"],
  },
  {
    slug: "limitless",
    name: "Limitless",
    title: "Agency template",
    category: "Agency",
    style: "Premium",
    previewUrl: "https://limitless.9ruby.com",
    description: "A premium agency direction with strong services, proof, and brand-led storytelling.",
    bestFor: "Creative agencies, AI agencies, strategy studios, and high-ticket service brands.",
    tags: ["Agency", "Premium", "Services", "Creative"],
  },
  {
    slug: "portfolite",
    name: "Portfolite",
    title: "Sleek portfolio and agency portfolio",
    category: "Portfolio",
    style: "Minimal",
    previewUrl: "https://portfolite.9ruby.com",
    description: "A polished portfolio structure for showing selected work without heavy decoration.",
    bestFor: "Freelancers, founders, studios, designers, and personal brands.",
    tags: ["Portfolio", "Agency", "Case studies", "Minimal"],
  },
  {
    slug: "hypersonic",
    name: "Hypersonic",
    title: "AI agency template",
    category: "Agency",
    style: "Dark",
    previewUrl: "https://hypersonic.9ruby.com",
    description: "A high-energy AI agency template with strong landing-page composition and sharp positioning.",
    bestFor: "AI agencies, automation consultants, growth studios, and productized service teams.",
    tags: ["AI agency", "Dark", "Services", "Conversion"],
  },
  {
    slug: "handyman",
    name: "Handyman",
    title: "Roofer and renovation template",
    category: "Local Business",
    style: "Warm",
    previewUrl: "https://handyman.9ruby.com",
    description: "A practical local-service website structure built for trust, quotes, reviews, and service areas.",
    bestFor: "Roofers, renovation businesses, contractors, repair teams, and local trades.",
    tags: ["Local business", "Contractor", "Services", "Lead gen"],
  },
  {
    slug: "consulting",
    name: "Consulting",
    title: "Consulting business template",
    category: "Agency",
    style: "Editorial",
    previewUrl: "https://consulting.9ruby.com",
    description: "A sober consulting layout for positioning expertise, process, proof, and booking flow.",
    bestFor: "Consultants, advisors, fractional operators, and strategy firms.",
    tags: ["Consulting", "B2B", "Services", "Trust"],
  },
  {
    slug: "claritycare",
    name: "Clarity Care",
    title: "Mental health and wellness template",
    category: "Healthcare",
    style: "Warm",
    previewUrl: "https://claritycare.9ruby.com",
    description: "A calm healthcare template with trust-first sections, service descriptions, and booking intent.",
    bestFor: "Therapists, clinics, wellness practices, coaches, and care providers.",
    tags: ["Healthcare", "Wellness", "Booking", "Trust"],
  },
  {
    slug: "groomify",
    name: "Groomify",
    title: "Pet grooming template",
    category: "Local Business",
    style: "Warm",
    previewUrl: "https://groomify.9ruby.com",
    description: "A friendly local-service template with packages, service detail, and booking flow.",
    bestFor: "Pet groomers, salons, mobile services, and local appointment businesses.",
    tags: ["Local business", "Pet care", "Booking", "Services"],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    title: "Plumber business template",
    category: "Local Business",
    style: "Utility",
    previewUrl: "https://plumbing.9ruby.com",
    description: "A conversion-ready local service page for urgent calls, service areas, reviews, and quote requests.",
    bestFor: "Plumbers, repair companies, emergency services, and home-service brands.",
    tags: ["Local business", "Emergency", "Lead gen", "Services"],
  },
  {
    slug: "message",
    name: "Message",
    title: "AI model landing page template",
    category: "AI",
    style: "Dark",
    previewUrl: "https://message.9ruby.com",
    description: "A modern AI-model landing page with strong product narrative and technical feature blocks.",
    bestFor: "AI apps, chat products, model wrappers, and automation products.",
    tags: ["AI", "Model", "Landing page", "Product"],
  },
  {
    slug: "dreelio",
    name: "Dreelio",
    title: "SaaS landing page template",
    category: "SaaS",
    style: "Premium",
    previewUrl: "https://dreelio.9ruby.com",
    description: "A polished SaaS page with clean feature sections and strong conversion hierarchy.",
    bestFor: "SaaS products, startup launches, software tools, and B2B offers.",
    tags: ["SaaS", "Startup", "Landing page", "Conversion"],
  },
  {
    slug: "gardener",
    name: "Gardener",
    title: "Landscaper website template",
    category: "Local Business",
    style: "Warm",
    previewUrl: "https://gardener.9ruby.com",
    description: "A grounded local business template for outdoor services, packages, and lead capture.",
    bestFor: "Landscapers, gardeners, lawn care, property maintenance, and local services.",
    tags: ["Local business", "Landscaping", "Services", "Quote"],
  },
  {
    slug: "pearl",
    name: "Pearl",
    title: "Creative portfolio template",
    category: "Portfolio",
    style: "Editorial",
    previewUrl: "https://pearl.9ruby.com",
    description: "An elegant creative portfolio direction with editorial rhythm and simple project presentation.",
    bestFor: "Designers, creators, boutique studios, and visual portfolios.",
    tags: ["Portfolio", "Creative", "Editorial", "Personal brand"],
  },
  {
    slug: "cryptix",
    name: "Cryptix",
    title: "Crypto SaaS template",
    category: "SaaS",
    style: "Dark",
    previewUrl: "https://cryptix.9ruby.com",
    description: "A dark fintech-style template for crypto, analytics, trading, and financial dashboards.",
    bestFor: "Fintech products, crypto apps, analytics tools, and trading platforms.",
    tags: ["Fintech", "Crypto", "SaaS", "Dashboard"],
  },
  {
    slug: "perform",
    name: "Perform",
    title: "Sports coach template",
    category: "Local Business",
    style: "Premium",
    previewUrl: "https://perform.9ruby.com",
    description: "A confident coaching template for programs, results, service packages, and client action.",
    bestFor: "Coaches, trainers, sports programs, gyms, and performance consultants.",
    tags: ["Coaching", "Fitness", "Programs", "Services"],
  },
  {
    slug: "draftr",
    name: "Draftr",
    title: "SaaS and software template",
    category: "SaaS",
    style: "Dashboard",
    previewUrl: "https://draftr.9ruby.com",
    description: "A software landing page for tools that need product clarity and conversion-ready sections.",
    bestFor: "Software products, productivity tools, collaboration apps, and B2B SaaS.",
    tags: ["SaaS", "Software", "Productivity", "Dashboard"],
  },
  {
    slug: "alytics",
    name: "Alytics",
    title: "SaaS analytics landing page",
    category: "SaaS",
    style: "Dashboard",
    previewUrl: "https://alytics.9ruby.com",
    description: "A clean analytics SaaS template with data-product positioning and dashboard-first visuals.",
    bestFor: "Analytics platforms, reporting tools, BI products, and data services.",
    tags: ["Analytics", "Dashboard", "SaaS", "Data"],
  },
  {
    slug: "kavi",
    name: "Kavi",
    title: "Tech, AI, SaaS, business and app template",
    category: "AI",
    style: "Premium",
    previewUrl: "https://kavi.9ruby.com",
    description: "A flexible technology template for AI, app, and SaaS offers with polished product sections.",
    bestFor: "AI products, apps, tech startups, and productized service launches.",
    tags: ["AI", "App", "SaaS", "Startup"],
  },
  {
    slug: "meridian",
    name: "Meridian",
    title: "SaaS Framer template",
    category: "SaaS",
    style: "Minimal",
    previewUrl: "https://meridian.9ruby.com",
    description: "A clean SaaS direction with simple visual language and practical conversion sections.",
    bestFor: "B2B SaaS, lightweight products, software launches, and internal platforms.",
    tags: ["SaaS", "Minimal", "Product", "Software"],
  },
  {
    slug: "xtract",
    name: "Xtract",
    title: "AI automation agency template",
    category: "Agency",
    style: "Dark",
    previewUrl: "https://xtract.9ruby.com",
    description: "A high-impact automation-agency template built around AI services, proof, and lead capture.",
    bestFor: "Automation agencies, AI consultants, CRM builders, and operations teams.",
    tags: ["AI agency", "Automation", "Services", "Lead gen"],
  },
  {
    slug: "clearpath-therapy",
    name: "ClearPath Therapy",
    title: "Therapy and coaching web template",
    category: "Healthcare",
    style: "Warm",
    previewUrl: "https://clearpath-therapy.9ruby.com",
    description: "A gentle therapy and coaching template with service clarity, reassurance, and inquiry flow.",
    bestFor: "Therapists, counselors, coaches, wellness brands, and private practices.",
    tags: ["Healthcare", "Therapy", "Coaching", "Warm"],
  },
  {
    slug: "chaiwala",
    name: "Chaiwala",
    title: "Premium cafe platform",
    category: "Local Business",
    style: "Warm",
    previewUrl: "https://chaiwala.9ruby.com",
    description: "A warm hospitality template for cafes, food brands, menus, and local ordering interest.",
    bestFor: "Cafes, restaurants, tea brands, bakeries, and hospitality launches.",
    tags: ["Cafe", "Hospitality", "Menu", "Local business"],
  },
  {
    slug: "forward-2026",
    name: "Forward 2026",
    title: "AI and design conference template",
    category: "Event",
    style: "Editorial",
    previewUrl: "https://forward-2026.9ruby.com",
    description: "A large-format event page with conference positioning, schedule potential, and registration intent.",
    bestFor: "Conferences, summits, workshops, meetups, and launch events.",
    tags: ["Event", "Conference", "AI", "Registration"],
  },
] as const

export const featuredTemplateCatalog = approvedTemplates.filter((template) => template.featured)

export function getApprovedTemplate(slug: string) {
  return approvedTemplates.find((template) => template.slug === slug)
}

export function templateContactHref(slug: string) {
  return `/contact?source=template&template=${slug}`
}
