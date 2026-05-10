"use client"

import { useState } from "react"
import { ArrowRight, Search, Clock, Calendar, Mail } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import { blogArticles, blogCategories } from "@/data/blog-articles"

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const categories = [...blogCategories]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const filtered = blogArticles.filter((a) => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory
    const matchesSearch = searchQuery === "" || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featured = filtered.length > 0 ? filtered[0] : null
  const grid = filtered.length > 1 ? filtered.slice(1) : []

  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Blog" }]} />

      {/* HERO */}
      <section style={{ background: "#8C000E" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Blog</p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(56px, 10vw, 120px)", color: "#fff", marginBottom: 28 }}>
            BLOG
          </h1>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 520, margin: "0 auto" }}>
            Deep dives on AI agents, engineering decisions, marketing automation, and lessons from building 9Ruby.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section style={{ borderBottom: BORDER }} className="py-6">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "7px 16px", border: activeCategory === cat ? "none" : BORDER,
                    background: activeCategory === cat ? "#C8102E" : "transparent",
                    color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.44)",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search */}
            <div style={{ position: "relative", minWidth: 220 }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", height: 36, paddingLeft: 36, paddingRight: 16, background: "rgba(255,255,255,0.04)", border: BORDER, color: "#fff", fontFamily: NV, fontSize: 13, outline: "none", boxSizing: "border-box" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featured && (
        <section className="py-12 md:py-16" style={{ borderBottom: BORDER }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <div style={{ border: BORDER }} className="grid grid-cols-1 md:grid-cols-2">
              <div style={{ background: featured.gradient, minHeight: 280, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(0,0,0,0.6)", color: "#fff", padding: "5px 14px" }}>
                  Featured
                </span>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center gap-4">
                <span style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8102E", display: "block" }}>
                  {featured.category}
                </span>
                <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.055em", lineHeight: 0.93, fontSize: "clamp(24px,3.5vw,38px)", color: "#fff" }}>
                  {featured.title}
                </h2>
                <p style={{ fontFamily: NV, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.44)" }}>
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-5">
                  <span className="flex items-center gap-1" style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                    <Calendar size={11} /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1" style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                    <Clock size={11} /> {featured.readTime}
                  </span>
                </div>
                <div>
                  <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: "#C8102E", color: "#fff", padding: "10px 24px", textDecoration: "none" }}>
                    Read Article <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARTICLE GRID */}
      {grid.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ border: BORDER }}>
              {grid.map((article, i) => (
                <article
                  key={article.id}
                  className="flex flex-col group hover:bg-white/[0.02] transition-colors"
                  style={{ borderRight: (i + 1) % 3 !== 0 ? BORDER : undefined, borderBottom: BORDER }}
                >
                  <div style={{ background: article.gradient, height: 180, position: "relative" }}>
                    <span style={{ position: "absolute", top: 12, left: 12, fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(0,0,0,0.65)", color: "#fff", padding: "4px 10px" }}>
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.93, fontSize: 18, color: "#fff", marginBottom: 10 }}>
                      {article.title}
                    </h3>
                    <p style={{ fontFamily: NV, fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.44)", marginBottom: 16 }}>
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: BORDER }}>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1" style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                          <Calendar size={10} /> {article.date}
                        </span>
                        <span className="flex items-center gap-1" style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                          <Clock size={10} /> {article.readTime}
                        </span>
                      </div>
                      <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-1 hover:text-white transition-colors" style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
                        Read <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <section className="py-32 text-center px-6">
          <p style={{ fontFamily: NV, fontSize: 18, color: "rgba(255,255,255,0.3)" }}>No articles found.</p>
          <p style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.2)", marginTop: 8 }}>Try adjusting your search or category filter.</p>
        </section>
      )}

      {/* NEWSLETTER CTA */}
      <section style={{ background: "#8C000E" }} className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Stay Updated</p>
              <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2rem,5vw,4rem)", color: "#fff", marginBottom: 16 }}>
                NEVER MISS<br />AN INSIGHT
              </h2>
              <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: 400 }}>
                Get our latest articles on AI, engineering, and growth — straight to your inbox. No spam, ever.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto md:max-w-[380px]">
              {subscribed ? (
                <div style={{ border: "0.8px solid rgba(255,255,255,0.3)", padding: "20px 24px" }}>
                  <p style={{ fontFamily: NV, fontWeight: 800, fontSize: 14, color: "#fff", marginBottom: 4 }}>You&apos;re subscribed!</p>
                  <p style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>We&apos;ll send you the next article when it drops.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true) }}
                  className="flex flex-col gap-3"
                >
                  <div style={{ position: "relative" }}>
                    <Mail size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", pointerEvents: "none" }} />
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: "100%", height: 48, paddingLeft: 40, paddingRight: 16, background: "rgba(0,0,0,0.25)", border: "0.8px solid rgba(255,255,255,0.3)", color: "#fff", fontFamily: NV, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "13px 28px", border: "none", cursor: "pointer" }}
                  >
                    Subscribe Now <ArrowRight size={11} />
                  </button>
                  <p style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                    Unsubscribe anytime. No spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
    </main>
  )
}
