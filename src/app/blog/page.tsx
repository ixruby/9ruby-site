"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Search, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Article data                                                       */
/* ------------------------------------------------------------------ */
interface Article {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  gradient: string
}

const articles: Article[] = [
  {
    id: 1,
    title: "The End of Manual Marketing",
    excerpt:
      "How AI agents are replacing repetitive marketing tasks and freeing teams to focus on strategy and creativity.",
    date: "Dec 2025",
    readTime: "8 min read",
    category: "Marketing",
    gradient: "linear-gradient(135deg, #E8D5C4 0%, #F0E6D8 50%, #D4C4B0 100%)",
  },
  {
    id: 2,
    title: "Building Self-Optimizing Funnels",
    excerpt:
      "Why static funnels are dead and what replaces them. A new framework for conversion that adapts in real time.",
    date: "Jan 2026",
    readTime: "6 min read",
    category: "Marketing",
    gradient: "linear-gradient(135deg, #D5C4B0 0%, #E8DDD0 50%, #C4B8A8 100%)",
  },
  {
    id: 3,
    title: "AI Email Subject Lines That Convert",
    excerpt:
      "We tested 10,000 subject lines with AI-generated variations. Here's what actually works and why.",
    date: "Jan 2026",
    readTime: "5 min read",
    category: "Marketing",
    gradient: "linear-gradient(135deg, #E0D8CC 0%, #F2EDE6 50%, #D8CFC2 100%)",
  },
  {
    id: 4,
    title: "How We 3.8x'd Client Revenue",
    excerpt:
      "A deep dive into our AI-powered growth strategy that transformed a mid-market brand's entire pipeline.",
    date: "Feb 2026",
    readTime: "10 min read",
    category: "Case Studies",
    gradient: "linear-gradient(135deg, #C8BEB0 0%, #DDD5C8 50%, #B8AE9E 100%)",
  },
  {
    id: 5,
    title: "The Solo CEO Playbook",
    excerpt:
      "Running a company with AI agents as your team. How to orchestrate, delegate, and scale alone.",
    date: "Feb 2026",
    readTime: "7 min read",
    category: "Product",
    gradient: "linear-gradient(135deg, #D8D0C4 0%, #EAE4DA 50%, #CCC4B6 100%)",
  },
  {
    id: 6,
    title: "Open Source vs Closed AI",
    excerpt:
      "Why we open-sourced our tools and what it means for you. The case for transparent AI infrastructure.",
    date: "Mar 2026",
    readTime: "6 min read",
    category: "Product",
    gradient: "linear-gradient(135deg, #E4DCD0 0%, #F0EAE0 50%, #D4CCC0 100%)",
  },
  {
    id: 7,
    title: "Building 9Ruby: The Technical Stack",
    excerpt:
      "Next.js, Supabase, Vercel, Claude — a complete walkthrough of our architecture and why each piece matters.",
    date: "Mar 2026",
    readTime: "12 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #CCC6B8 0%, #E0DAD0 50%, #BEB8AA 100%)",
  },
  {
    id: 8,
    title: "Template-First Development",
    excerpt:
      "Why we build templates before custom code. The economics and speed advantage of starting with proven patterns.",
    date: "Mar 2026",
    readTime: "5 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #DAD4C8 0%, #ECE8E0 50%, #D0CAC0 100%)",
  },
  {
    id: 9,
    title: "The 211 Tools Directory",
    excerpt:
      "How we curated the best open-source developer tools into a single searchable, categorized directory.",
    date: "Apr 2026",
    readTime: "4 min read",
    category: "Product",
    gradient: "linear-gradient(135deg, #E2DACE 0%, #F0ECE4 50%, #D6CEC2 100%)",
  },
  {
    id: 10,
    title: "AI Agents for Real Estate",
    excerpt:
      "How Saumya Properties automated 80% of their workflow with custom AI agents and template-first design.",
    date: "Apr 2026",
    readTime: "8 min read",
    category: "Case Studies",
    gradient: "linear-gradient(135deg, #D0C8BA 0%, #E4DED4 50%, #C4BEB0 100%)",
  },
  {
    id: 11,
    title: "From Zero to 13K Integrations",
    excerpt:
      "Building the 9Ruby App Store. The technical challenges, partnerships, and lessons from scaling an ecosystem.",
    date: "Apr 2026",
    readTime: "9 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #D6D0C6 0%, #E8E4DC 50%, #CAC4B8 100%)",
  },
  {
    id: 12,
    title: "Deploying at Scale with Vercel",
    excerpt:
      "Edge functions, ISR, and our deployment pipeline. How we serve millions of requests with zero downtime.",
    date: "Apr 2026",
    readTime: "7 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #DED8CC 0%, #EEE8E0 50%, #D0CAC0 100%)",
  },
]

const categories = ["All", "Engineering", "Marketing", "Product", "Case Studies"]

/* ================================================================== */
/*  Blog Page                                                          */
/* ================================================================== */
export default function BlogPage() {
  const revealRef = useScrollReveal()
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = articles.filter((a) => {
    const matchesCategory =
      activeCategory === "All" || a.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featured = filtered.length > 0 ? filtered[0] : null
  const grid = filtered.length > 1 ? filtered.slice(1) : []

  return (
    <main
      id="main-content"
      ref={revealRef}
      className="relative min-h-screen"
      style={{ background: "#F8F7F4" }}
    >
      <Navbar />
      <Breadcrumb items={[{ label: "Blog" }]} />

      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="pt-36 lg:pt-48 pb-16 lg:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-8"
            style={{ color: "#C41A3B" }}
          >
            Blog
          </div>

          <h1
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6"
            style={{ color: "#1A1A1A" }}
          >
            Insights &amp; Updates
          </h1>

          <p
            data-reveal
            data-reveal-delay={200}
            className="reveal-item text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#7A7A72" }}
          >
            Deep dives on AI agents, engineering decisions, marketing
            automation, and lessons from building 9Ruby.
          </p>
        </div>
      </section>

      {/* ============================================================
          FILTERS & SEARCH
      ============================================================ */}
      <section className="pb-12 lg:pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            data-reveal
            data-reveal-delay={250}
            className="reveal-item flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-[13px] font-medium rounded-full px-4 py-2 transition-all duration-200"
                  style={
                    activeCategory === cat
                      ? {
                          background: "#1A1A1A",
                          color: "#F8F7F4",
                        }
                      : {
                          background: "rgba(0,0,0,0.03)",
                          color: "#7A7A72",
                          border: "1px solid rgba(0,0,0,0.04)",
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div
              className="relative w-full sm:w-auto"
              style={{ minWidth: 240 }}
            >
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#B8B8B0" }}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-[13px] rounded-full pl-10 pr-4 h-10 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#1A1A1A]/10"
                style={{
                  background: "#FFFFFF",
                  color: "#1A1A1A",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED ARTICLE
      ============================================================ */}
      {featured && (
        <section className="pb-12 lg:pb-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div
              data-reveal
              data-reveal-delay={100}
              className="reveal-item group rounded-2xl overflow-hidden bg-white transition-all duration-500 hover:shadow-lg hover:shadow-black/[0.04]"
              style={{ border: "1px solid rgba(0,0,0,0.04)" }}
            >
              <div className="grid lg:grid-cols-2">
                {/* Image placeholder */}
                <div
                  className="aspect-[16/10] lg:aspect-auto lg:min-h-[400px] relative overflow-hidden"
                  style={{ background: featured.gradient }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        color: "#7A7A72",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span
                    className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4 inline-block"
                    style={{ color: "#C41A3B" }}
                  >
                    {featured.category}
                  </span>

                  <h2
                    className="text-2xl md:text-3xl lg:text-[2.25rem] font-serif italic tracking-tight leading-[1.15] mb-4"
                    style={{ color: "#1A1A1A" }}
                  >
                    {featured.title}
                  </h2>

                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{ color: "#7A7A72" }}
                  >
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-4 mb-8">
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: "#B8B8B0" }}
                    >
                      <Calendar size={12} />
                      {featured.date}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: "#B8B8B0" }}
                    >
                      <Clock size={12} />
                      {featured.readTime}
                    </span>
                  </div>

                  <div>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-6 h-10 transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.06] group/btn"
                      style={{ background: "#1A1A1A", color: "#F8F7F4" }}
                    >
                      Read Article
                      <ArrowRight
                        size={14}
                        className="group-hover/btn:translate-x-0.5 transition-transform duration-200"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          ARTICLE GRID
      ============================================================ */}
      {grid.length > 0 && (
        <section className="pb-24 lg:pb-32">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {grid.map((article, i) => (
                <article
                  key={article.id}
                  data-reveal
                  data-reveal-delay={i * 60}
                  className="reveal-item group rounded-2xl overflow-hidden bg-white transition-all duration-500 hover:shadow-lg hover:shadow-black/[0.04]"
                  style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  {/* Image placeholder */}
                  <div
                    className="aspect-[16/10] relative overflow-hidden"
                    style={{ background: article.gradient }}
                  >
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.7)",
                          color: "#7A7A72",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className="text-[16px] font-semibold tracking-tight leading-snug mb-2 line-clamp-2"
                      style={{ color: "#1A1A1A" }}
                    >
                      {article.title}
                    </h3>

                    <p
                      className="text-[13px] leading-relaxed mb-4 line-clamp-2"
                      style={{ color: "#7A7A72" }}
                    >
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex items-center gap-1 text-[11px]"
                          style={{ color: "#B8B8B0" }}
                        >
                          <Calendar size={11} />
                          {article.date}
                        </span>
                        <span
                          className="flex items-center gap-1 text-[11px]"
                          style={{ color: "#B8B8B0" }}
                        >
                          <Clock size={11} />
                          {article.readTime}
                        </span>
                      </div>

                      <Link
                        href="#"
                        className="text-[12px] font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200"
                        style={{ color: "#1A1A1A" }}
                      >
                        Read
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <section className="pb-24 lg:pb-32">
          <div className="max-w-[1200px] mx-auto px-6 text-center py-20">
            <p
              className="text-lg font-serif italic"
              style={{ color: "#B8B8B0" }}
            >
              No articles found.
            </p>
            <p className="text-sm mt-2" style={{ color: "#B8B8B0" }}>
              Try adjusting your search or category filter.
            </p>
          </div>
        </section>
      )}

      {/* ============================================================
          CTA
      ============================================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[680px] mx-auto px-6 text-center">
          <div
            data-reveal
            data-reveal-delay={0}
            className="reveal-item text-[11px] font-semibold tracking-[0.12em] uppercase mb-6"
            style={{ color: "#C41A3B" }}
          >
            Stay Updated
          </div>
          <h2
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-3xl md:text-[2.75rem] font-serif italic tracking-tight leading-[1.15] mb-5"
            style={{ color: "#1A1A1A" }}
          >
            Never miss an insight
          </h2>
          <p
            data-reveal
            data-reveal-delay={200}
            className="reveal-item text-base leading-relaxed mb-10"
            style={{ color: "#7A7A72" }}
          >
            Get our latest articles on AI, engineering, and growth
            delivered straight to your inbox. No spam, ever.
          </p>
          <div
            data-reveal
            data-reveal-delay={300}
            className="reveal-item flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-7 h-12 transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.06]"
              style={{ background: "#1A1A1A", color: "#F8F7F4" }}
            >
              Subscribe to Updates
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* -- inline styles for animations --------------------------- */}
      <style jsx>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
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
