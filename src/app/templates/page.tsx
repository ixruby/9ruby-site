"use client"

import { Download, Star, ArrowRight, SlidersHorizontal, Sparkles, Eye, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState, useMemo, useEffect, useRef } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

/* --- Data --- */

type Template = {
  name: string
  category: string
  price: "Free" | "$29" | "$49" | "$99"
  priceNum: number
  stars: number
  downloads: string
  downloadsNum: number
  description: string
  image: string
  techStack: string[]
  featured?: boolean
  badge?: string
  gradient: string
  stripeUrl: string
  previewUrl: string
}

const categories = ["All", "Landing Pages", "Portfolios", "E-commerce", "Dashboards", "Blogs", "SaaS", "Booking", "Health"]

const sortOptions = ["Popular", "Newest", "Price: Low-High", "Price: High-Low"] as const

const templates: Template[] = [
  // Free
  {
    name: "Starter Portfolio",
    category: "Portfolios",
    price: "Free",
    priceNum: 0,
    stars: 4.8,
    downloads: "6.3k",
    downloadsNum: 6300,
    description: "Clean developer portfolio with project showcase, about section, and contact form.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind"],
    badge: "Popular",
    gradient: "from-purple-500/10 to-purple-900/5",
    stripeUrl: "#",
    previewUrl: "#",
  },
  {
    name: "Simple Blog",
    category: "Blogs",
    price: "Free",
    priceNum: 0,
    stars: 4.6,
    downloads: "4.1k",
    downloadsNum: 4100,
    description: "Minimal Markdown blog with dark mode, syntax highlighting, and RSS feed.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    techStack: ["Next.js", "MDX", "Tailwind"],
    badge: "New",
    gradient: "from-zinc-500/10 to-zinc-900/5",
    stripeUrl: "#",
    previewUrl: "#",
  },
  {
    name: "Basic Landing",
    category: "Landing Pages",
    price: "Free",
    priceNum: 0,
    stars: 4.7,
    downloads: "5.2k",
    downloadsNum: 5200,
    description: "Conversion-optimized landing page with hero, features, testimonials, and CTA.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    techStack: ["React", "Tailwind"],
    badge: "Popular",
    gradient: "from-blue-500/10 to-blue-900/5",
    stripeUrl: "#",
    previewUrl: "#",
  },
  {
    name: "Developer Resume",
    category: "Portfolios",
    price: "Free",
    priceNum: 0,
    stars: 4.5,
    downloads: "3.8k",
    downloadsNum: 3800,
    description: "Interactive resume with timeline, skill bars, and downloadable PDF export.",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Framer Motion"],
    gradient: "from-teal-500/10 to-teal-900/5",
    stripeUrl: "#",
    previewUrl: "#",
  },
  {
    name: "Restaurant Menu",
    category: "Landing Pages",
    price: "Free",
    priceNum: 0,
    stars: 4.9,
    downloads: "3.1k",
    downloadsNum: 3100,
    description: "Elegant restaurant site with menu display, gallery, reservations, and Google Maps.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    techStack: ["React", "Tailwind", "TypeScript"],
    badge: "Live",
    gradient: "from-amber-500/10 to-amber-900/5",
    stripeUrl: "#",
    previewUrl: "#",
  },
  // Premium $29
  {
    name: "SaaS Dashboard",
    category: "Dashboards",
    price: "$29",
    priceNum: 29,
    stars: 4.9,
    downloads: "1.8k",
    downloadsNum: 1800,
    description: "Analytics dashboard with charts, data tables, user management, and dark/light themes.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Recharts", "shadcn/ui"],
    featured: true,
    badge: "Premium",
    gradient: "from-cyan-500/10 to-cyan-900/5",
    stripeUrl: "https://buy.stripe.com/placeholder-saas-dashboard",
    previewUrl: "#",
  },
  {
    name: "E-commerce Store",
    category: "E-commerce",
    price: "$29",
    priceNum: 29,
    stars: 4.8,
    downloads: "2.1k",
    downloadsNum: 2100,
    description: "Full storefront with product grid, cart, checkout flow, and Stripe integration.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Stripe", "Supabase"],
    featured: true,
    badge: "Premium",
    gradient: "from-emerald-500/10 to-emerald-900/5",
    stripeUrl: "https://buy.stripe.com/placeholder-ecommerce",
    previewUrl: "#",
  },
  {
    name: "Agency Portfolio",
    category: "Portfolios",
    price: "$29",
    priceNum: 29,
    stars: 4.7,
    downloads: "1.4k",
    downloadsNum: 1400,
    description: "Creative agency site with case studies, team section, services, and contact form.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Framer Motion"],
    badge: "Premium",
    gradient: "from-indigo-500/10 to-indigo-900/5",
    stripeUrl: "https://buy.stripe.com/placeholder-agency",
    previewUrl: "#",
  },
  // Premium $49
  {
    name: "Fitness Studio",
    category: "Booking",
    price: "$49",
    priceNum: 49,
    stars: 4.8,
    downloads: "920",
    downloadsNum: 920,
    description: "Gym and fitness site with class scheduler, trainer profiles, membership plans, and booking.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Supabase", "Cal.com"],
    badge: "Premium",
    gradient: "from-orange-500/10 to-orange-900/5",
    stripeUrl: "https://buy.stripe.com/placeholder-fitness",
    previewUrl: "#",
  },
  {
    name: "Real Estate",
    category: "Landing Pages",
    price: "$49",
    priceNum: 49,
    stars: 4.9,
    downloads: "1.1k",
    downloadsNum: 1100,
    description: "Property listings with filters, map view, virtual tours, and agent profiles.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Mapbox", "Supabase"],
    featured: true,
    badge: "Premium",
    gradient: "from-rose-500/10 to-rose-900/5",
    stripeUrl: "https://buy.stripe.com/placeholder-realestate",
    previewUrl: "#",
  },
  {
    name: "Photography",
    category: "Portfolios",
    price: "$49",
    priceNum: 49,
    stars: 4.7,
    downloads: "870",
    downloadsNum: 870,
    description: "Image-first portfolio with masonry grid, lightbox, client galleries, and print shop.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Cloudinary"],
    badge: "Premium",
    gradient: "from-pink-500/10 to-pink-900/5",
    stripeUrl: "https://buy.stripe.com/placeholder-photography",
    previewUrl: "#",
  },
  // Premium $99
  {
    name: "Full SaaS Platform",
    category: "SaaS",
    price: "$99",
    priceNum: 99,
    stars: 5.0,
    downloads: "640",
    downloadsNum: 640,
    description: "Complete SaaS boilerplate: auth, billing, teams, admin panel, API routes, and email templates.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Stripe", "Supabase", "shadcn/ui"],
    featured: true,
    badge: "Best Seller",
    gradient: "from-violet-500/10 to-violet-900/5",
    stripeUrl: "https://buy.stripe.com/placeholder-saas-platform",
    previewUrl: "#",
  },
  {
    name: "Multi-vendor Marketplace",
    category: "E-commerce",
    price: "$99",
    priceNum: 99,
    stars: 4.9,
    downloads: "510",
    downloadsNum: 510,
    description: "Multi-seller marketplace with vendor dashboards, product management, reviews, and payouts.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Stripe Connect", "Supabase"],
    badge: "Premium",
    gradient: "from-yellow-500/10 to-yellow-900/5",
    stripeUrl: "https://buy.stripe.com/placeholder-marketplace",
    previewUrl: "#",
  },
  {
    name: "Hotel Booking",
    category: "Booking",
    price: "$99",
    priceNum: 99,
    stars: 4.8,
    downloads: "430",
    downloadsNum: 430,
    description: "Hotel booking system with room gallery, availability calendar, payment, and admin panel.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Stripe", "Supabase", "Cal.com"],
    badge: "Premium",
    gradient: "from-sky-500/10 to-sky-900/5",
    stripeUrl: "https://buy.stripe.com/placeholder-hotel",
    previewUrl: "#",
  },
  {
    name: "Medical Clinic",
    category: "Health",
    price: "$99",
    priceNum: 99,
    stars: 4.8,
    downloads: "380",
    downloadsNum: 380,
    description: "Clinic website with appointment booking, doctor profiles, patient portal, and HIPAA-ready forms.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop",
    techStack: ["Next.js", "Tailwind", "Supabase", "Cal.com"],
    badge: "Premium",
    gradient: "from-green-500/10 to-green-900/5",
    stripeUrl: "https://buy.stripe.com/placeholder-medical",
    previewUrl: "#",
  },
]

/* --- Helpers --- */

function renderStars(rating: number) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          className={
            i < full
              ? "fill-amber-400 text-amber-400"
              : i === full && hasHalf
              ? "fill-amber-300 text-amber-300"
              : ""
          }
          style={i >= full && !(i === full && hasHalf) ? { color: "#B8B8B0" } : {}}
        />
      ))}
      <span className="text-[11px] ml-1" style={{ color: "#B8B8B0" }}>{rating}</span>
    </div>
  )
}

/* --- scroll reveal hook --- */

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

/* --- Component --- */

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState<(typeof sortOptions)[number]>("Popular")
  const revealRef = useScrollReveal()

  const filtered = useMemo(() => {
    let result = activeCategory === "All"
      ? [...templates]
      : templates.filter((t) => t.category === activeCategory)

    switch (sortBy) {
      case "Popular":
        result.sort((a, b) => b.downloadsNum - a.downloadsNum)
        break
      case "Newest":
        result.sort((a, b) => (a.badge === "New" ? -1 : b.badge === "New" ? 1 : 0))
        break
      case "Price: Low-High":
        result.sort((a, b) => a.priceNum - b.priceNum)
        break
      case "Price: High-Low":
        result.sort((a, b) => b.priceNum - a.priceNum)
        break
    }
    return result
  }, [activeCategory, sortBy])

  const featuredTemplates = templates.filter((t) => t.featured).slice(0, 3)

  return (
    <main className="relative min-h-screen" ref={revealRef} style={{ background: "#F8F7F4" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Templates" }]} />

      {/* HERO */}
      <section className="relative pt-36 lg:pt-48 pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-6"
            style={{ color: "#C41A3B" }}
          >
            Template Marketplace
          </div>
          <h1
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6"
          >
            <span style={{ color: "#1A1A1A" }}>
              Production-ready templates,
            </span>
            <br />
            <span style={{ color: "#B8B8B0" }}>launch in minutes.</span>
          </h1>
          <p
            data-reveal
            data-reveal-delay={200}
            className="reveal-item text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#7A7A72" }}
          >
            Free and premium templates built with Next.js, React, and Tailwind CSS. Clone, customize, and ship your next project today.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 pb-24">

        {/* --- Featured Templates --- */}
        <div className="mb-20" data-reveal data-reveal-delay={0}>
          <div className="reveal-item flex items-center gap-3 mb-8">
            <Sparkles size={16} style={{ color: "#B8B8B0" }} />
            <h2 className="text-xl font-semibold tracking-tight" style={{ color: "#1A1A1A" }}>Featured Templates</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredTemplates.map((t, i) => (
              <div
                key={t.name}
                data-reveal
                data-reveal-delay={i * 100}
                className="reveal-item group relative flex flex-col rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-500 overflow-hidden"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                {/* Featured badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider bg-[#1A1A1A] text-[#F8F7F4] rounded-full">
                    Featured
                  </span>
                </div>

                {/* Preview area */}
                <div className="relative h-48 overflow-hidden bg-[#F0EFEC]">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "#B8B8B0" }}>{t.category}</span>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-[#1A1A1A] transition-colors" style={{ color: "#1A1A1A" }}>{t.name}</h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "#7A7A72" }}>{t.description}</p>

                  <div className="flex items-center gap-4 mb-4">
                    {renderStars(t.stars)}
                    <div className="flex items-center gap-1">
                      <Download size={11} style={{ color: "#B8B8B0" }} />
                      <span className="text-[11px]" style={{ color: "#B8B8B0" }}>{t.downloads}</span>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {t.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 font-mono text-[10px] rounded" style={{ color: "#B8B8B0", border: "1px solid rgba(0,0,0,0.06)" }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                    <span className="text-xl font-serif italic tracking-tight" style={{ color: "#1A1A1A" }}>{t.price}</span>
                    <a
                      href={t.stripeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-sm font-medium rounded-full transition-colors"
                      style={{ color: "#F8F7F4" }}
                    >
                      <ShoppingCart size={14} /> Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Filters & Sort --- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all ${
                  cat === activeCategory
                    ? "bg-[#1A1A1A] text-[#F8F7F4]"
                    : "hover:bg-black/[0.02]"
                }`}
                style={cat !== activeCategory ? { border: "1px solid rgba(0,0,0,0.06)", color: "#B8B8B0" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} style={{ color: "#B8B8B0" }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-white text-sm px-3 py-2 rounded-lg appearance-none cursor-pointer transition-colors focus:outline-none pr-8"
              style={{ border: "1px solid rgba(0,0,0,0.06)", color: "#7A7A72", backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23999' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em" }}
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Template count */}
        <p className="font-mono text-xs mb-6" style={{ color: "#B8B8B0" }}>
          Showing {filtered.length} template{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </p>

        {/* --- Template Grid --- */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t, i) => (
            <div
              key={t.name}
              data-reveal
              data-reveal-delay={i * 50}
              className="reveal-item group flex flex-col rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-500 overflow-hidden"
              style={{ border: "1px solid rgba(0,0,0,0.04)" }}
            >
              {/* Preview area */}
              <div className="relative h-40 overflow-hidden bg-[#F0EFEC]">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <a
                    href={t.previewUrl}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-xs font-medium rounded-full hover:bg-white transition-colors"
                  >
                    <Eye size={12} /> Preview
                  </a>
                  <a
                    href={t.price === "Free" ? "#" : t.stripeUrl}
                    target={t.price !== "Free" ? "_blank" : undefined}
                    rel={t.price !== "Free" ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1A1A] text-[#F8F7F4] text-xs font-medium rounded-full hover:bg-[#1A1A1A]/90 transition-colors"
                  >
                    {t.price === "Free" ? (
                      <><Download size={12} /> Download</>
                    ) : (
                      <><ShoppingCart size={12} /> Buy Now</>
                    )}
                  </a>
                </div>

                {/* Category label */}
                <span className="absolute top-3 left-3 font-mono text-[10px] bg-white/90 backdrop-blur-sm px-2 py-1 rounded" style={{ color: "#7A7A72" }}>
                  {t.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold tracking-tight group-hover:text-[#1A1A1A] transition-colors" style={{ color: "#1A1A1A" }}>{t.name}</h3>
                  {t.badge && (
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full" style={{ border: "1px solid rgba(0,0,0,0.06)", color: "#B8B8B0" }}>
                      {t.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs mb-3 leading-relaxed line-clamp-2" style={{ color: "#7A7A72" }}>{t.description}</p>

                <div className="flex items-center gap-4 mb-3">
                  {renderStars(t.stars)}
                  <div className="flex items-center gap-1">
                    <Download size={11} style={{ color: "#B8B8B0" }} />
                    <span className="text-[11px]" style={{ color: "#B8B8B0" }}>{t.downloads}</span>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 font-mono text-[10px] rounded" style={{ color: "#B8B8B0", border: "1px solid rgba(0,0,0,0.04)" }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Price + buttons */}
                <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                  <span className={`text-lg font-serif italic tracking-tight ${t.price === "Free" ? "" : ""}`} style={{ color: t.price === "Free" ? "#7A7A72" : "#1A1A1A" }}>
                    {t.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={t.previewUrl}
                      className="flex items-center gap-1 text-xs transition-colors hover:text-[#1A1A1A]"
                      style={{ color: "#B8B8B0" }}
                    >
                      <Eye size={12} /> Preview
                    </a>
                    <a
                      href={t.price === "Free" ? "#" : t.stripeUrl}
                      target={t.price !== "Free" ? "_blank" : undefined}
                      rel={t.price !== "Free" ? "noopener noreferrer" : undefined}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors ${
                        t.price === "Free"
                          ? "hover:bg-black/[0.02]"
                          : "bg-[#1A1A1A] hover:bg-[#1A1A1A]/90"
                      }`}
                      style={t.price === "Free" ? { border: "1px solid rgba(0,0,0,0.06)", color: "#7A7A72" } : { color: "#F8F7F4" }}
                    >
                      {t.price === "Free" ? (
                        <><Download size={11} /> Download</>
                      ) : (
                        <><ShoppingCart size={11} /> Buy</>
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-base mb-4" style={{ color: "#B8B8B0" }}>No templates found in this category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="text-sm transition-colors hover:text-[#1A1A1A]"
              style={{ color: "#7A7A72" }}
            >
              View all templates
            </button>
          </div>
        )}

        {/* --- Bottom CTA --- */}
        <div className="mt-24">
          <div className="rounded-2xl bg-white p-12 lg:p-16 text-center" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-6 block" style={{ color: "#C41A3B" }}>
              Custom Work
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif italic tracking-tighter mb-4" style={{ color: "#1A1A1A" }}>Want a custom template?</h2>
            <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "#7A7A72" }}>
              We design and build bespoke templates tailored to your brand, industry, and workflow. From concept to deployment.
            </p>
            <Link
              href="/contact"
              className="h-10 px-7 rounded-full bg-[#1A1A1A] text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all inline-flex items-center gap-2"
              style={{ color: "#F8F7F4" }}
            >
              Get in touch <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />

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
