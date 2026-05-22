"use client"

import Link from "next/link"
import { useMemo, useState, type CSSProperties } from "react"
import { ArrowUpRight, Search, Sparkles } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import ArabicAccent from "@/components/ArabicAccent"
import {
  approvedTemplates,
  featuredTemplateCatalog,
  templateCategories,
  templateContactHref,
  templateStyles,
  type ApprovedTemplate,
} from "@/lib/template-catalog"

function templatePreviewStyle(url: string): CSSProperties {
  return {
    "--project-preview-image": `url("https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1100")`,
  } as CSSProperties
}

function TemplatePreviewCard({ template }: { template: ApprovedTemplate }) {
  return (
    <article
      className={`template-market-card ${template.featured ? "template-market-card--featured" : ""}`}
      style={templatePreviewStyle(template.previewUrl)}
    >
      <Link
        href={`/templates/${template.slug}`}
        className="template-market-card__preview"
        aria-label={`View ${template.name} template details`}
      >
        <span className="template-market-card__preview-image" aria-hidden />
      </Link>
      <div className="template-market-card__body">
        <div className="template-market-card__meta">
          <span>{template.category}</span>
          <em>{template.style}</em>
        </div>
        <div>
          <h3>{template.name}</h3>
          <p>{template.description}</p>
        </div>
        <div className="template-market-card__chips">
          {template.tags.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="template-market-card__actions">
          <Link href={`/templates/${template.slug}`}>Details</Link>
          <a href={template.previewUrl} target="_blank" rel="noopener noreferrer">
            Preview
          </a>
        </div>
      </div>
    </article>
  )
}

export default function TemplatesPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<(typeof templateCategories)[number]>("All")
  const [style, setStyle] = useState<(typeof templateStyles)[number]>("All")

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return approvedTemplates.filter((template) => {
      const matchesQuery =
        !normalizedQuery ||
        [template.name, template.title, template.category, template.style, template.previewUrl, template.bestFor, ...template.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      const matchesCategory = category === "All" || template.category === category
      const matchesStyle = style === "All" || template.style === style

      return matchesQuery && matchesCategory && matchesStyle
    })
  }, [category, query, style])

  return (
    <main className="templates-market-page">
      <Navbar />
      <Breadcrumb items={[{ label: "Templates" }]} />

      <section className="templates-market-hero templates-market-hero--live">
        <div className="templates-market-hero__copy">
          <p className="templates-kicker arabic-row">* Template library <ArabicAccent>مكتبة القوالب</ArabicAccent></p>
          <h1>Choose a real website direction.</h1>
          <p>
            A curated 9Ruby template catalog built from live, working previews. Browse by business type, open the detail
            page, then use the preview as the starting point for a custom build.
          </p>
          <div className="templates-market-hero__actions">
            <a href="#template-library">Browse templates</a>
            <Link href="/contact?source=templates&page=hero">Request a custom version</Link>
          </div>
        </div>

        <div className="live-template-hero-stack" aria-label="Featured template previews">
          {featuredTemplateCatalog.slice(0, 5).map((template) => (
            <Link
              key={template.slug}
              href={`/templates/${template.slug}`}
              className="live-template-hero-stack__item"
              style={templatePreviewStyle(template.previewUrl)}
            >
              <span>{template.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="templates-feature-strip" aria-label="Template catalog highlights">
        <span>
          <strong>{approvedTemplates.length}</strong>
          approved templates
        </span>
        <span>
          <strong>{templateCategories.length - 1}</strong>
          business categories
        </span>
        <span>
          <strong>{templateStyles.length - 1}</strong>
          visual styles
        </span>
        <span>
          <strong>Live</strong>
          preview domains
        </span>
      </section>

      <section id="template-library" className="templates-library">
        <div className="templates-library__head">
          <div>
            <p className="templates-kicker arabic-row">* Catalog <ArabicAccent>اختيار نظيف</ArabicAccent></p>
            <h2>Clean blocks of working templates.</h2>
          </div>
          <p>
            The old preview subdomains are now treated as demos. This page is the main public template library for 9Ruby.
          </p>
        </div>

        <div className="templates-controls">
          <label className="templates-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search remote, SaaS, agency, local business..."
            />
          </label>

          <div className="templates-control-row">
            <div className="templates-control-group" aria-label="Template categories">
              {templateCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={item === category ? "is-active" : undefined}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="templates-sort">
              Style
              <select value={style} onChange={(event) => setStyle(event.target.value as (typeof templateStyles)[number])}>
                {templateStyles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="templates-result-count">
          Showing {filteredTemplates.length} approved template{filteredTemplates.length === 1 ? "" : "s"}
        </div>

        <div className="templates-grid templates-grid--catalog">
          {filteredTemplates.map((template) => (
            <TemplatePreviewCard key={template.slug} template={template} />
          ))}
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="templates-empty">
            <h3>No matching template.</h3>
            <p>Clear one filter or search another business type.</p>
            <Link href="/templates">Reset catalog</Link>
          </div>
        ) : null}
      </section>

      <section className="templates-bottom-cta">
        <div>
          <Sparkles size={16} />
          <span>Want one customized?</span>
        </div>
        <p>Pick a template page, keep the structure you like, and 9Ruby will rebuild it around your brand and systems.</p>
        <Link href={templateContactHref("custom")}>
          Start from a template
          <ArrowUpRight size={14} />
        </Link>
      </section>

      <Footer />
    </main>
  )
}
