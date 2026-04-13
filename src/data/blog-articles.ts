export type BlogCategory = "Engineering" | "Marketing" | "Product" | "Case Studies"

export interface BlogArticle {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: BlogCategory
  gradient: string
  insights: [string, string, string]
}

export const blogCategories = ["All", "Engineering", "Marketing", "Product", "Case Studies"] as const

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    slug: "the-end-of-manual-marketing",
    title: "The End of Manual Marketing",
    excerpt:
      "How AI agents are replacing repetitive marketing tasks and freeing teams to focus on strategy and creativity.",
    date: "Dec 2025",
    readTime: "8 min read",
    category: "Marketing",
    gradient: "linear-gradient(135deg, #E8D5C4 0%, #F0E6D8 50%, #D4C4B0 100%)",
    insights: [
      "Campaign operations now move faster when repetitive execution is delegated to AI systems.",
      "Creative teams produce better work when agents handle reporting, scheduling, and first-draft generation.",
      "Manual marketing is becoming a review-and-direction role instead of a copy-and-paste workflow.",
    ],
  },
  {
    id: 2,
    slug: "building-self-optimizing-funnels",
    title: "Building Self-Optimizing Funnels",
    excerpt:
      "Why static funnels are dead and what replaces them. A new framework for conversion that adapts in real time.",
    date: "Jan 2026",
    readTime: "6 min read",
    category: "Marketing",
    gradient: "linear-gradient(135deg, #D5C4B0 0%, #E8DDD0 50%, #C4B8A8 100%)",
    insights: [
      "Funnels should react to behavior, traffic source, and intent instead of forcing every visitor through one path.",
      "AI lets landing pages, offers, and follow-up sequences adapt without waiting for a manual rebuild.",
      "Optimization becomes continuous when every step reports signal back into the system.",
    ],
  },
  {
    id: 3,
    slug: "ai-email-subject-lines-that-convert",
    title: "AI Email Subject Lines That Convert",
    excerpt:
      "We tested 10,000 subject lines with AI-generated variations. Here's what actually works and why.",
    date: "Jan 2026",
    readTime: "5 min read",
    category: "Marketing",
    gradient: "linear-gradient(135deg, #E0D8CC 0%, #F2EDE6 50%, #D8CFC2 100%)",
    insights: [
      "Specificity beat cleverness in most winning subject lines.",
      "AI variation testing works best when brand voice constraints are defined before generation starts.",
      "Open-rate lifts came from fast iteration loops, not from a single magic prompt.",
    ],
  },
  {
    id: 4,
    slug: "how-we-3-8xd-client-revenue",
    title: "How We 3.8x'd Client Revenue",
    excerpt:
      "A deep dive into our AI-powered growth strategy that transformed a mid-market brand's entire pipeline.",
    date: "Feb 2026",
    readTime: "10 min read",
    category: "Case Studies",
    gradient: "linear-gradient(135deg, #C8BEB0 0%, #DDD5C8 50%, #B8AE9E 100%)",
    insights: [
      "Revenue growth came from fixing the full funnel, not a single acquisition channel.",
      "Automation reduced lead response time and improved conversion quality at the same time.",
      "The strongest gains appeared after aligning content, capture, nurture, and follow-up into one system.",
    ],
  },
  {
    id: 5,
    slug: "the-solo-ceo-playbook",
    title: "The Solo CEO Playbook",
    excerpt:
      "Running a company with AI agents as your team. How to orchestrate, delegate, and scale alone.",
    date: "Feb 2026",
    readTime: "7 min read",
    category: "Product",
    gradient: "linear-gradient(135deg, #D8D0C4 0%, #EAE4DA 50%, #CCC4B6 100%)",
    insights: [
      "A solo founder scales by designing systems, not by stacking more personal effort.",
      "Agent workflows need clear ownership, escalation points, and quality gates.",
      "The real advantage is coordination speed across product, marketing, and operations.",
    ],
  },
  {
    id: 6,
    slug: "open-source-vs-closed-ai",
    title: "Open Source vs Closed AI",
    excerpt:
      "Why we open-sourced our tools and what it means for you. The case for transparent AI infrastructure.",
    date: "Mar 2026",
    readTime: "6 min read",
    category: "Product",
    gradient: "linear-gradient(135deg, #E4DCD0 0%, #F0EAE0 50%, #D4CCC0 100%)",
    insights: [
      "Open systems make experimentation easier and reduce long-term platform lock-in.",
      "Transparency improves trust when AI becomes part of business-critical workflows.",
      "Closed tools can move fast, but open infrastructure compounds learning for the whole ecosystem.",
    ],
  },
  {
    id: 7,
    slug: "building-9ruby-the-technical-stack",
    title: "Building 9Ruby: The Technical Stack",
    excerpt:
      "Next.js, Supabase, Vercel, Claude - a complete walkthrough of our architecture and why each piece matters.",
    date: "Mar 2026",
    readTime: "12 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #CCC6B8 0%, #E0DAD0 50%, #BEB8AA 100%)",
    insights: [
      "The stack is optimized for speed of iteration, deployment reliability, and AI-native workflows.",
      "Shared infrastructure matters more when products, services, and content systems all talk to each other.",
      "Architecture choices should reduce decision friction for every new launch.",
    ],
  },
  {
    id: 8,
    slug: "template-first-development",
    title: "Template-First Development",
    excerpt:
      "Why we build templates before custom code. The economics and speed advantage of starting with proven patterns.",
    date: "Mar 2026",
    readTime: "5 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #DAD4C8 0%, #ECE8E0 50%, #D0CAC0 100%)",
    insights: [
      "Templates compress delivery time because structure and UX decisions are already pressure-tested.",
      "Custom work performs better when it starts from repeatable foundations instead of blank files.",
      "A template-first process creates reusable assets for future launches and clients.",
    ],
  },
  {
    id: 9,
    slug: "the-211-tools-directory",
    title: "The 211 Tools Directory",
    excerpt:
      "How we curated the best open-source developer tools into a single searchable, categorized directory.",
    date: "Apr 2026",
    readTime: "4 min read",
    category: "Product",
    gradient: "linear-gradient(135deg, #E2DACE 0%, #F0ECE4 50%, #D6CEC2 100%)",
    insights: [
      "Curation is a product decision when users are overwhelmed by fragmented tool discovery.",
      "Searchable directories become more valuable when they include categories, context, and fast entry points.",
      "A living index is better than a static resource page because the ecosystem keeps moving.",
    ],
  },
  {
    id: 10,
    slug: "ai-agents-for-real-estate",
    title: "AI Agents for Real Estate",
    excerpt:
      "How Saumya Properties automated 80% of their workflow with custom AI agents and template-first design.",
    date: "Apr 2026",
    readTime: "8 min read",
    category: "Case Studies",
    gradient: "linear-gradient(135deg, #D0C8BA 0%, #E4DED4 50%, #C4BEB0 100%)",
    insights: [
      "Lead qualification, follow-up, and content workflows were the first high-leverage wins.",
      "Template-first design shortened the time between strategy and launch.",
      "Agent automation worked because it was connected to the exact business process instead of added as a gimmick.",
    ],
  },
  {
    id: 11,
    slug: "from-zero-to-13k-integrations",
    title: "From Zero to 13K Integrations",
    excerpt:
      "Building the 9Ruby App Store. The technical challenges, partnerships, and lessons from scaling an ecosystem.",
    date: "Apr 2026",
    readTime: "9 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #D6D0C6 0%, #E8E4DC 50%, #CAC4B8 100%)",
    insights: [
      "Integration scale depends on navigation, metadata, and clear product framing as much as backend plumbing.",
      "Partnership surfaces matter when an ecosystem grows beyond a single product.",
      "The hardest part is making a large catalog feel coherent to first-time visitors.",
    ],
  },
  {
    id: 12,
    slug: "deploying-at-scale-with-vercel",
    title: "Deploying at Scale with Vercel",
    excerpt:
      "Edge functions, ISR, and our deployment pipeline. How we serve millions of requests with zero downtime.",
    date: "Apr 2026",
    readTime: "7 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #DED8CC 0%, #EEE8E0 50%, #D0CAC0 100%)",
    insights: [
      "Reliable deployment is a growth feature because it protects every campaign and product launch.",
      "Preview environments help teams ship faster without turning production into a test bed.",
      "Platform discipline becomes critical as more branded properties share the same operational layer.",
    ],
  },
]
