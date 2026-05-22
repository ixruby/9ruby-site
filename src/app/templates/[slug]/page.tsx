import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import { approvedTemplates, getApprovedTemplate, templateContactHref } from "@/lib/template-catalog"

type TemplatePageProps = {
  params: Promise<{ slug: string }>
}

function previewImage(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1400`
}

export function generateStaticParams() {
  return approvedTemplates.map((template) => ({ slug: template.slug }))
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params
  const template = getApprovedTemplate(slug)

  if (!template) {
    return {
      title: "Template not found | 9Ruby",
    }
  }

  return {
    title: `${template.name} Template | 9Ruby`,
    description: template.description,
    openGraph: {
      title: `${template.name} Template | 9Ruby`,
      description: template.description,
      images: [{ url: previewImage(template.previewUrl) }],
    },
  }
}

export default async function TemplateDetailPage({ params }: TemplatePageProps) {
  const { slug } = await params
  const template = getApprovedTemplate(slug)

  if (!template) notFound()

  return (
    <main className="templates-market-page template-detail-page">
      <Navbar />
      <Breadcrumb items={[{ label: "Templates", href: "/templates" }, { label: template.name }]} />

      <section className="template-detail-hero">
        <div className="template-detail-hero__copy">
          <Link href="/templates" className="template-detail-back">
            <ArrowLeft size={14} />
            Templates
          </Link>
          <p className="templates-kicker">* {template.category} template</p>
          <h1>{template.name}</h1>
          <p>{template.description}</p>
          <div className="template-detail-actions">
            <a href={template.previewUrl} target="_blank" rel="noopener noreferrer">
              Live preview
              <ExternalLink size={14} />
            </a>
            <Link href={templateContactHref(template.slug)}>
              Use this direction
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <a
          href={template.previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="template-detail-preview"
          aria-label={`Open ${template.name} live preview`}
        >
          <span
            className="template-detail-preview__image"
            style={{ backgroundImage: `url(${previewImage(template.previewUrl)})` }}
            aria-hidden="true"
          />
        </a>
      </section>

      <section className="template-detail-body">
        <div className="template-detail-panel">
          <p className="templates-kicker">* Best for</p>
          <h2>{template.bestFor}</h2>
        </div>

        <div className="template-detail-panel template-detail-panel--meta">
          <span>
            <strong>Category</strong>
            {template.category}
          </span>
          <span>
            <strong>Style</strong>
            {template.style}
          </span>
          <span>
            <strong>Status</strong>
            Approved
          </span>
        </div>

        <div className="template-detail-panel">
          <p className="templates-kicker">* Included direction</p>
          <div className="template-detail-tags">
            {template.tags.map((tag) => (
              <span key={tag}>
                <Check size={13} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="templates-bottom-cta">
        <div>
          <span>Build from {template.name}</span>
        </div>
        <p>Keep the template direction, remove anything unnecessary, and rebuild it as a clean 9Ruby client-ready site.</p>
        <Link href={templateContactHref(template.slug)}>
          Request this template
          <ArrowUpRight size={14} />
        </Link>
      </section>

      <Footer />
    </main>
  )
}
