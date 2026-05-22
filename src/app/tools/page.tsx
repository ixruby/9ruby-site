import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import ToolsDirectory from "@/components/tools/ToolsDirectory"
import { publicTools, toolCategories, toolQuickSearches, toolWorkflows } from "@/lib/tools"

export const metadata: Metadata = {
  title: "Free Online Tools | 9Ruby",
  description:
    "A searchable 9Ruby toolbox for SEO, design, PDF, image, developer, marketing, AI, business, security, and launch utilities.",
}

const BORDER = "0.8px solid rgba(255,255,255,0.12)"

export default function ToolsPage() {
  return (
    <main style={{ background: "#080808", minHeight: "100vh" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Tools" }]} />

      <ToolsDirectory
        tools={publicTools}
        categories={toolCategories}
        workflows={toolWorkflows}
        quickSearches={toolQuickSearches}
      />

      <section style={{ background: "#080808", borderBottom: BORDER }} className="px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase text-white/42">* Tool requests</p>
            <h2 className="max-w-[760px] text-[clamp(2.7rem,7vw,5.8rem)] font-black uppercase leading-[0.9] text-white">
              WANT A TOOL<br />BUILT NEXT?
            </h2>
            <p className="mt-6 max-w-[560px] text-[15px] leading-7 text-white/62">
              The catalog is the public roadmap. Pick a queued utility and 9Ruby can turn it into a live,
              branded, no-login tool for the site.
            </p>
          </div>
          <Link
            href="/contact?source=tools&tool=request"
            className="inline-flex h-12 items-center justify-center gap-2 bg-white px-6 text-xs font-bold uppercase text-[#080808] transition-opacity hover:opacity-90"
          >
            Request a tool <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
