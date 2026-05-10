import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/Navbar"
import Breadcrumb from "@/components/Breadcrumb"
import DynamicToolRunner from "@/components/tools/DynamicToolRunner"
import { dynamicToolSlugs, getTool } from "@/lib/tools"

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return dynamicToolSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getTool(slug)

  if (!tool || !dynamicToolSlugs.includes(tool.slug)) {
    return {
      title: "Tool Not Found | 9Ruby",
    }
  }

  return {
    title: `${tool.title} | 9Ruby Tools`,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = getTool(slug)

  if (!tool || !dynamicToolSlugs.includes(tool.slug)) {
    notFound()
  }

  return (
    <main className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: tool.shortTitle }]} />
      <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm hover:text-[#1A1A1A] transition-colors mb-12" style={{ color: "var(--ink-muted)" }}>
          <ArrowLeft size={14} /> Back to Tools
        </Link>

        <div className="mb-10">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "var(--accent)" }}>
            {tool.category} Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic tracking-tighter leading-[1.1] mb-4 mt-3" style={{ color: "var(--ink-strong)" }}>
            {tool.title}
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            {tool.description}
          </p>
        </div>

        <DynamicToolRunner tool={tool} />
      </div>
    </main>
  )
}
