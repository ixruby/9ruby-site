import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, Clock, Sparkles } from "lucide-react"
import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import { blogArticles, type BlogCategory } from "@/data/blog-articles"

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

const categoryContext: Record<
  BlogCategory,
  {
    label: string
    body: string
    bridge: string
  }
> = {
  Engineering: {
    label: "How we build",
    body:
      "Engineering at 9Ruby is driven by reuse, speed, and clean operational boundaries. We design systems so new launches, tools, and product surfaces can plug into an existing foundation instead of starting over every time.",
    bridge:
      "That is why our engineering writing focuses on stack decisions, deployment strategy, reusable patterns, and the internal architecture behind the public experience.",
  },
  Marketing: {
    label: "How we grow",
    body:
      "Our marketing work is built around systems that adapt in real time. We treat automation, content, funnels, and reporting as one connected operating layer instead of isolated channels.",
    bridge:
      "The goal is simple: make every campaign easier to launch, easier to measure, and easier to improve without adding manual drag.",
  },
  Product: {
    label: "How we design products",
    body:
      "Product strategy at 9Ruby starts with leverage. We look for patterns that can become platforms, libraries, shared infrastructure, or new user-facing surfaces across the ecosystem.",
    bridge:
      "These product notes explain how we think about discovery, packaging, ecosystem structure, and the operating model behind each release.",
  },
  "Case Studies": {
    label: "How it works in practice",
    body:
      "Case studies are where strategy meets actual operating constraints. We use them to show what changed, where automation had leverage, and how system design translated into business movement.",
    bridge:
      "Every case study is meant to turn an abstract AI promise into a concrete workflow that teams can learn from and adapt.",
  },
}

function findArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug)
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = findArticle(slug)

  if (!article) {
    return {
      title: "Article | 9Ruby",
    }
  }

  return {
    title: `${article.title} | 9Ruby Blog`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | 9Ruby Blog`,
      description: article.excerpt,
    },
  }
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = findArticle(slug)

  if (!article) {
    notFound()
  }

  const context = categoryContext[article.category]
  const relatedArticles = blogArticles
    .filter((item) => item.slug !== article.slug)
    .slice(-3)
    .reverse()

  return (
    <main className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: article.title }]} />

      <section className="pb-10">
        <div className="max-w-[1120px] mx-auto px-6">
          <div
            className="rounded-[32px] overflow-hidden"
            style={{
              background: article.gradient,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div className="px-8 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{
                    background: "rgba(255,255,255,0.72)",
                    color: "var(--ink-muted)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Sparkles size={12} />
                  {article.category}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-medium"
                  style={{ background: "rgba(255,255,255,0.54)", color: "var(--ink-muted)" }}
                >
                  <Calendar size={12} />
                  {article.date}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-medium"
                  style={{ background: "rgba(255,255,255,0.54)", color: "var(--ink-muted)" }}
                >
                  <Clock size={12} />
                  {article.readTime}
                </span>
              </div>

              <h1
                className="max-w-[760px] text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-[1.02] mb-6"
                style={{ color: "var(--ink-strong)" }}
              >
                {article.title}
              </h1>

              <p
                className="max-w-[760px] text-lg md:text-[1.25rem] leading-relaxed"
                style={{ color: "#5F5B55" }}
              >
                {article.excerpt}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="max-w-[1120px] mx-auto px-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_320px]">
          <article
            className="rounded-[28px] bg-white p-8 md:p-10"
            style={{ border: "1px solid rgba(0,0,0,0.05)" }}
          >
            <div className="mb-10">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-3"
                style={{ color: "#C41A3B" }}
              >
                Overview
              </p>
              <p className="text-[15px] leading-8" style={{ color: "#4F4B45" }}>
                {context.body}
              </p>
              <p className="mt-5 text-[15px] leading-8" style={{ color: "#4F4B45" }}>
                {context.bridge}
              </p>
            </div>

            <div className="mb-10">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-4"
                style={{ color: "#C41A3B" }}
              >
                Key ideas
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {article.insights.map((insight, index) => (
                  <div
                    key={insight}
                    className="rounded-2xl p-5"
                    style={{
                      background: "var(--page-bg)",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <span
                      className="inline-flex mb-3 text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      Idea 0{index + 1}
                    </span>
                    <p className="text-[14px] leading-7" style={{ color: "#4F4B45" }}>
                      {insight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-[24px] p-6 md:p-8"
              style={{
                background: "#111111",
                color: "#F8F7F4",
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C41A3B] mb-3">
                Why it matters
              </p>
              <h2 className="text-2xl md:text-[2rem] font-serif italic tracking-tight mb-4">
                {context.label}
              </h2>
              <p className="text-[15px] leading-8 text-white/70 max-w-[620px]">
                This article is part of the broader 9Ruby operating model: connect strategy,
                execution, and discoverability so each new product, service, and content release
                strengthens the whole system instead of living in isolation.
              </p>
            </div>
          </article>

          <aside className="space-y-4">
            <div
              className="rounded-[24px] bg-white p-6"
              style={{ border: "1px solid rgba(0,0,0,0.05)" }}
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-3"
                style={{ color: "#C41A3B" }}
              >
                Next step
              </p>
              <h3 className="text-xl font-semibold tracking-tight mb-3" style={{ color: "var(--ink-strong)" }}>
                Explore the full 9Ruby system
              </h3>
              <p className="text-[14px] leading-7 mb-5" style={{ color: "var(--ink-muted)" }}>
                Move from article to action. Browse services, tools, ecosystem projects, and the
                rest of the latest AI updates from one place.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-5 h-10"
                style={{ background: "var(--button-bg)", color: "var(--button-fg)" }}
              >
                Open the master hub <ArrowRight size={14} />
              </Link>
            </div>

            <div
              className="rounded-[24px] bg-white p-6"
              style={{ border: "1px solid rgba(0,0,0,0.05)" }}
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-4"
                style={{ color: "#C41A3B" }}
              >
                More reading
              </p>
              <div className="space-y-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="block rounded-2xl p-4 transition-colors hover:bg-[#F8F7F4]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: "var(--ink-soft)" }}>
                      {related.category}
                    </p>
                    <h4 className="text-[15px] font-semibold leading-6" style={{ color: "var(--ink-strong)" }}>
                      {related.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--ink-muted)" }}
            >
              <ArrowLeft size={14} />
              Back to all articles
            </Link>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}
