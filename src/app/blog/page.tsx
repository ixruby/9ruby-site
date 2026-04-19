"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Search, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import { blogArticles, blogCategories } from "@/data/blog-articles"

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

const categories = [...blogCategories]

/* ================================================================== */
/*  Blog Page                                                          */
/* ================================================================== */
export default function BlogPage() {
  const revealRef = useScrollReveal()
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = blogArticles.filter((a) => {
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
      style={{ background: "var(--page-bg)" }}
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
            style={{ color: "#8B6B3D" }}
          >
            Blog
          </div>

          <h1
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-5xl md:text-6xl lg:text-[80px] font-serif italic leading-[0.95] tracking-tighter mb-6"
            style={{ color: "var(--ink-strong)" }}
          >
            Insights &amp; Updates
          </h1>

          <p
            data-reveal
            data-reveal-delay={200}
            className="reveal-item text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--ink-muted)" }}
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
                          color: "var(--ink-muted)",
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
                style={{ color: "var(--ink-soft)" }}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-[13px] rounded-full pl-10 pr-4 h-10 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#1A1A1A]/10"
                style={{
                  background: "#FFFFFF",
                  color: "var(--ink-strong)",
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
                        color: "var(--ink-muted)",
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
                    style={{ color: "#8B6B3D" }}
                  >
                    {featured.category}
                  </span>

                  <h2
                    className="text-2xl md:text-3xl lg:text-[2.25rem] font-serif italic tracking-tight leading-[1.15] mb-4"
                    style={{ color: "var(--ink-strong)" }}
                  >
                    {featured.title}
                  </h2>

                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-4 mb-8">
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      <Calendar size={12} />
                      {featured.date}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      <Clock size={12} />
                      {featured.readTime}
                    </span>
                  </div>

                  <div>
                      <Link
                        href={`/blog/${featured.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-6 h-10 transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.06] group/btn"
                        style={{ background: "var(--button-bg)", color: "var(--button-fg)" }}
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
                          color: "var(--ink-muted)",
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
                      style={{ color: "var(--ink-strong)" }}
                    >
                      {article.title}
                    </h3>

                    <p
                      className="text-[13px] leading-relaxed mb-4 line-clamp-2"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex items-center gap-1 text-[11px]"
                          style={{ color: "var(--ink-soft)" }}
                        >
                          <Calendar size={11} />
                          {article.date}
                        </span>
                        <span
                          className="flex items-center gap-1 text-[11px]"
                          style={{ color: "var(--ink-soft)" }}
                        >
                          <Clock size={11} />
                          {article.readTime}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${article.slug}`}
                        className="text-[12px] font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200"
                        style={{ color: "var(--ink-strong)" }}
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
              style={{ color: "var(--ink-soft)" }}
            >
              No articles found.
            </p>
            <p className="text-sm mt-2" style={{ color: "var(--ink-soft)" }}>
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
            style={{ color: "#8B6B3D" }}
          >
            Stay Updated
          </div>
          <h2
            data-reveal
            data-reveal-delay={100}
            className="reveal-item text-3xl md:text-[2.75rem] font-serif italic tracking-tight leading-[1.15] mb-5"
            style={{ color: "var(--ink-strong)" }}
          >
            Never miss an insight
          </h2>
          <p
            data-reveal
            data-reveal-delay={200}
            className="reveal-item text-base leading-relaxed mb-10"
            style={{ color: "var(--ink-muted)" }}
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
              style={{ background: "var(--button-bg)", color: "var(--button-fg)" }}
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
