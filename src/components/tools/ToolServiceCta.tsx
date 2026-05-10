import Link from "next/link"
import { ArrowRight, Wrench } from "lucide-react"
import type { ToolSlug } from "@/lib/tools"
import { getTool, toolContactHref } from "@/lib/tools"

interface ToolServiceCtaProps {
  slug: ToolSlug
  className?: string
}

export default function ToolServiceCta({ slug, className = "" }: ToolServiceCtaProps) {
  const tool = getTool(slug)
  const secondary = tool?.secondaryCta

  return (
    <section className={`mt-10 bg-[#111] border border-black/[0.08] rounded-2xl p-6 md:p-7 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#C8102E] mb-3">
            <Wrench size={14} />
            Service CTA
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-[-0.04em] uppercase text-white">
            Want 9Ruby to fix this?
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/60 max-w-xl">
            Use the free report or generated output yourself, or ask us to turn it into production-ready website, SEO, design, or marketing work.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          {secondary && (
            secondary.href.startsWith("http") ? (
              <a
                href={secondary.href}
                className="inline-flex h-11 items-center justify-center gap-2 border border-white/15 px-5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-white/10 transition-colors"
              >
                {secondary.label}
              </a>
            ) : (
              <Link
                href={secondary.href}
                className="inline-flex h-11 items-center justify-center gap-2 border border-white/15 px-5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-white/10 transition-colors"
              >
                {secondary.label}
              </Link>
            )
          )}
          <Link
            href={toolContactHref(slug)}
            className="inline-flex h-11 items-center justify-center gap-2 bg-white px-5 text-xs font-bold uppercase tracking-[0.1em] text-[#080808] hover:opacity-90 transition-opacity"
          >
            Fix this for me <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}
