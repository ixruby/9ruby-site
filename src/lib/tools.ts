export type ToolCategory = "SEO" | "Design" | "Developer" | "Marketing" | "Business"

export type ToolIcon =
  | "search"
  | "palette"
  | "code"
  | "image"
  | "braces"
  | "qr"
  | "type"
  | "globe"
  | "hash"
  | "file-text"
  | "sparkles"

export type ToolSlug =
  | "seo-checker"
  | "color-palette"
  | "meta-generator"
  | "image-compressor"
  | "json-formatter"
  | "qr-generator"
  | "font-pairing"
  | "website-speed-test"
  | "hashtag-generator"
  | "privacy-policy-generator"
  | "ai-copywriter"
  | "favicon-generator"

export interface PublicTool {
  slug: ToolSlug
  title: string
  shortTitle: string
  description: string
  category: ToolCategory
  badge: "Popular" | "Free" | "New"
  status: "Live" | "Beta"
  icon: ToolIcon
  secondaryCta?: {
    label: string
    href: string
  }
}

export const publicTools: PublicTool[] = [
  {
    slug: "seo-checker",
    title: "SEO Checker",
    shortTitle: "SEO Checker",
    description: "Analyze a public URL for titles, descriptions, headings, images, links, Open Graph tags, and quick SEO fixes.",
    category: "SEO",
    badge: "Popular",
    status: "Live",
    icon: "search",
  },
  {
    slug: "color-palette",
    title: "Color Palette Generator",
    shortTitle: "Color Palette",
    description: "Generate color systems, lock swatches, preview UI colors, and export CSS variables for brand work.",
    category: "Design",
    badge: "Free",
    status: "Live",
    icon: "palette",
    secondaryCta: { label: "Browse templates", href: "/templates" },
  },
  {
    slug: "meta-generator",
    title: "Meta Tag Generator",
    shortTitle: "Meta Generator",
    description: "Create SEO, Open Graph, Twitter Card, canonical, robots, and theme meta tags with live previews.",
    category: "SEO",
    badge: "Free",
    status: "Live",
    icon: "code",
  },
  {
    slug: "image-compressor",
    title: "Image Compressor",
    shortTitle: "Image Compressor",
    description: "Compress images in the browser with a quality slider, before/after preview, and downloadable output.",
    category: "Design",
    badge: "Free",
    status: "Live",
    icon: "image",
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    shortTitle: "JSON Formatter",
    description: "Validate, beautify, minify, copy, and download JSON without sending the data to a server.",
    category: "Developer",
    badge: "Free",
    status: "Live",
    icon: "braces",
  },
  {
    slug: "qr-generator",
    title: "QR Code Generator",
    shortTitle: "QR Generator",
    description: "Create branded QR codes for text or URLs, customize colors, and export PNG or SVG assets.",
    category: "Marketing",
    badge: "Free",
    status: "Live",
    icon: "qr",
  },
  {
    slug: "font-pairing",
    title: "Font Pairing Tool",
    shortTitle: "Font Pairing",
    description: "Pick from curated brand-ready font pairings, preview typography, and copy production CSS.",
    category: "Design",
    badge: "New",
    status: "Beta",
    icon: "type",
    secondaryCta: { label: "Browse templates", href: "/templates" },
  },
  {
    slug: "website-speed-test",
    title: "Website Speed Snapshot",
    shortTitle: "Speed Snapshot",
    description: "Fetch a public page through the browser proxy and estimate page weight, response time, and front-end risks.",
    category: "Developer",
    badge: "New",
    status: "Beta",
    icon: "globe",
  },
  {
    slug: "hashtag-generator",
    title: "Hashtag Generator",
    shortTitle: "Hashtags",
    description: "Generate deterministic hashtag sets from your topic, audience, and platform without using a model API.",
    category: "Marketing",
    badge: "Free",
    status: "Live",
    icon: "hash",
  },
  {
    slug: "privacy-policy-generator",
    title: "Privacy Policy Generator",
    shortTitle: "Privacy Policy",
    description: "Build a starter privacy policy from business details, data use, and contact information.",
    category: "Business",
    badge: "Free",
    status: "Live",
    icon: "file-text",
  },
  {
    slug: "ai-copywriter",
    title: "Copywriting Formula Generator",
    shortTitle: "Copywriter",
    description: "Generate local copy formulas for headlines, ads, emails, product blurbs, and social posts.",
    category: "Marketing",
    badge: "Popular",
    status: "Live",
    icon: "sparkles",
    secondaryCta: { label: "Try 9Ruby AI", href: "https://ai.9ruby.com" },
  },
  {
    slug: "favicon-generator",
    title: "Favicon Generator",
    shortTitle: "Favicon",
    description: "Upload one image and export SVG, ICO, PNG favicon sizes, apple icon, and the HTML snippet.",
    category: "Design",
    badge: "Free",
    status: "Live",
    icon: "image",
  },
]

export const toolCategories: ToolCategory[] = ["SEO", "Design", "Developer", "Marketing", "Business"]

export const dynamicToolSlugs: ToolSlug[] = [
  "image-compressor",
  "font-pairing",
  "website-speed-test",
  "hashtag-generator",
  "privacy-policy-generator",
  "ai-copywriter",
  "favicon-generator",
]

export function getTool(slug: string): PublicTool | undefined {
  return publicTools.find((tool) => tool.slug === slug)
}

export function toolContactHref(slug: ToolSlug): string {
  return `/contact?source=tool&tool=${slug}`
}
