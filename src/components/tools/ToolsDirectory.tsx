"use client"

import { useMemo, useState, type ComponentType } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Braces,
  Calculator,
  CheckCircle2,
  Clock,
  Code,
  Crop,
  Database,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Globe,
  Hash,
  Image as ImageIcon,
  Layers,
  Link2,
  Lock,
  Mail,
  Music,
  Palette,
  PenLine,
  QrCode,
  ScanLine,
  Search,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Type,
  Upload,
  Video,
  Wrench,
  X,
} from "lucide-react"
import {
  toolHref,
  toolContactHref,
  type PublicTool,
  type ToolCategory,
  type ToolDelivery,
  type ToolIcon,
  type ToolStatus,
  type ToolWorkflow,
} from "@/lib/tools"

type ToolSort = "Recommended" | "Live first" | "A-Z"
type StatusFilter = "All" | ToolStatus
type DeliveryFilter = "All" | ToolDelivery

interface ToolsDirectoryProps {
  tools: PublicTool[]
  categories: ToolCategory[]
  workflows: ToolWorkflow[]
  quickSearches: string[]
}

const iconMap: Record<ToolIcon, ComponentType<{ size?: number; className?: string }>> = {
  braces: Braces,
  calculator: Calculator,
  chart: BarChart3,
  clock: Clock,
  code: Code,
  crop: Crop,
  database: Database,
  download: Download,
  "file-spreadsheet": FileSpreadsheet,
  "file-text": FileText,
  globe: Globe,
  hash: Hash,
  image: ImageIcon,
  link: Link2,
  lock: Lock,
  mail: Mail,
  music: Music,
  palette: Palette,
  pen: PenLine,
  qr: QrCode,
  scan: ScanLine,
  search: Search,
  shield: Shield,
  sparkles: Sparkles,
  type: Type,
  upload: Upload,
  video: Video,
  wrench: Wrench,
}

const statusRank: Record<ToolStatus, number> = {
  Live: 0,
  Beta: 1,
  Queued: 2,
}

function normalize(value: string): string {
  return value.toLowerCase().trim()
}

function matchesQuery(tool: PublicTool, query: string): boolean {
  if (!query) return true
  const haystack = [
    tool.title,
    tool.shortTitle,
    tool.description,
    tool.category,
    tool.workflow,
    tool.status,
    tool.delivery,
    ...tool.keywords,
  ]
    .join(" ")
    .toLowerCase()

  return haystack.includes(query)
}

function countBy<T extends string>(tools: PublicTool[], value: T, picker: (tool: PublicTool) => T): number {
  return tools.filter((tool) => picker(tool) === value).length
}

function sortTools(tools: PublicTool[], sort: ToolSort): PublicTool[] {
  return [...tools].sort((a, b) => {
    if (sort === "A-Z") return a.title.localeCompare(b.title)
    if (sort === "Live first") {
      const statusDelta = statusRank[a.status] - statusRank[b.status]
      if (statusDelta !== 0) return statusDelta
      return a.title.localeCompare(b.title)
    }

    const popularDelta = Number(Boolean(b.popular)) - Number(Boolean(a.popular))
    if (popularDelta !== 0) return popularDelta
    const statusDelta = statusRank[a.status] - statusRank[b.status]
    if (statusDelta !== 0) return statusDelta
    return a.title.localeCompare(b.title)
  })
}

function statusLabel(status: ToolStatus): string {
  if (status === "Queued") return "Build queue"
  return status
}

export default function ToolsDirectory({ tools, categories, workflows, quickSearches }: ToolsDirectoryProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<ToolCategory | "All">("All")
  const [workflow, setWorkflow] = useState<ToolWorkflow | "All">("All")
  const [status, setStatus] = useState<StatusFilter>("All")
  const [delivery, setDelivery] = useState<DeliveryFilter>("All")
  const [sort, setSort] = useState<ToolSort>("Recommended")

  const normalizedQuery = normalize(query)
  const liveCount = tools.filter((tool) => tool.status !== "Queued").length
  const queuedCount = tools.length - liveCount
  const popularTools = tools.filter((tool) => tool.popular || tool.status === "Live").slice(0, 8)
  const deliveries = Array.from(new Set(tools.map((tool) => tool.delivery))).sort()

  const filteredTools = useMemo(() => {
    const visible = tools.filter((tool) => {
      if (!matchesQuery(tool, normalizedQuery)) return false
      if (category !== "All" && tool.category !== category) return false
      if (workflow !== "All" && tool.workflow !== workflow) return false
      if (status !== "All" && tool.status !== status) return false
      if (delivery !== "All" && tool.delivery !== delivery) return false
      return true
    })

    return sortTools(visible, sort)
  }, [tools, normalizedQuery, category, workflow, status, delivery, sort])

  const resetFilters = () => {
    setQuery("")
    setCategory("All")
    setWorkflow("All")
    setStatus("All")
    setDelivery("All")
    setSort("Recommended")
  }

  return (
    <div className="relative" style={{ background: "#080808" }}>
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-banner.gif" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.96),rgba(8,8,8,0.76),rgba(8,8,8,0.94))]" />
        <div className="relative mx-auto grid max-w-[1240px] gap-10 px-6 pb-14 pt-28 md:grid-cols-[1fr_420px] md:px-8 md:pb-20 md:pt-36">
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase text-white/48">* 9Ruby tools</p>
            <h1 className="m-0 max-w-[920px] text-[clamp(4.4rem,15vw,11.5rem)] font-black uppercase leading-[0.82] text-white">
              TOOL<br />SYSTEM
            </h1>
            <p className="mt-7 max-w-[620px] text-[15px] leading-7 text-white/68 md:text-[17px]">
              Search one branded toolbox for launch checks, file utilities, image helpers, developer tools,
              marketing generators, calculators, and business templates.
            </p>
          </div>

          <div className="self-end border border-white/12 bg-[#101010]/85 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <div className="grid grid-cols-3 border border-white/10">
              {[
                ["Catalog", tools.length],
                ["Live", liveCount],
                ["Queued", queuedCount],
              ].map(([label, value]) => (
                <div key={label} className="border-r border-white/10 p-4 last:border-r-0">
                  <div className="text-[2rem] font-black leading-none text-white">{value}</div>
                  <div className="mt-2 text-[11px] uppercase text-white/42">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-start gap-3 text-sm leading-6 text-white/60">
              <CheckCircle2 size={17} className="mt-1 shrink-0 text-white" />
              <span>Live tools open now. Queued tools are ready to white-label and build into 9Ruby next.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10" style={{ background: "#080808" }}>
        <div className="mx-auto max-w-[1240px] px-6 py-6 md:px-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
            <label className="relative block">
              <span className="sr-only">Search 9Ruby tools</span>
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search PDF, image, SEO, JSON, AI, DNS, invoice..."
                className="h-[52px] w-full border border-white/16 bg-[#151515] pl-12 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/42 focus:border-white/50"
              />
            </label>

            <label className="flex h-[52px] items-center gap-3 border border-white/16 bg-[#151515] px-4 text-white/78">
              <SlidersHorizontal size={16} className="shrink-0 text-white/40" />
              <span className="sr-only">Sort tools</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as ToolSort)}
                className="bg-transparent text-sm outline-none"
              >
                <option value="Recommended">Recommended</option>
                <option value="Live first">Live first</option>
                <option value="A-Z">A-Z</option>
              </select>
            </label>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-[52px] items-center justify-center gap-2 border border-white/16 bg-[#151515] px-5 text-xs font-bold uppercase text-white/78 transition-colors hover:border-white/35 hover:bg-[#1D1D1D] hover:text-white"
            >
              <X size={14} /> Clear
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="border border-white/12 bg-[#151515] px-3 py-2 text-[11px] font-bold uppercase text-white/60 transition-colors hover:border-white/32 hover:bg-[#1D1D1D] hover:text-white"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" style={{ background: "#080808" }}>
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-8 md:px-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase text-white/46">
                <Filter size={13} /> Categories
              </div>
              <div className="grid gap-2">
                <FilterButton active={category === "All"} label="All" count={tools.length} onClick={() => setCategory("All")} />
                {categories.map((item) => (
                  <FilterButton
                    key={item}
                    active={category === item}
                    label={item}
                    count={countBy(tools, item, (tool) => tool.category)}
                    onClick={() => setCategory(item)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase text-white/46">
                <Layers size={13} /> Workflow
              </div>
              <div className="grid gap-2">
                <FilterButton active={workflow === "All"} label="All" count={tools.length} onClick={() => setWorkflow("All")} />
                {workflows.map((item) => (
                  <FilterButton
                    key={item}
                    active={workflow === item}
                    label={item}
                    count={countBy(tools, item, (tool) => tool.workflow)}
                    onClick={() => setWorkflow(item)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[11px] font-bold uppercase text-white/46">Availability</div>
              <div className="grid grid-cols-2 gap-2">
                {(["All", "Live", "Beta", "Queued"] as StatusFilter[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStatus(item)}
                    className={`border px-3 py-2 text-left text-[11px] font-bold uppercase transition-colors ${status === item ? "border-white bg-white text-black" : "border-white/12 bg-[#141414] text-white/62 hover:border-white/32 hover:bg-[#1C1C1C] hover:text-white"}`}
                  >
                    {item === "Queued" ? "Queue" : item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[11px] font-bold uppercase text-white/46">Format</div>
              <div className="flex flex-wrap gap-2">
                {(["All", ...deliveries] as DeliveryFilter[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDelivery(item)}
                    className={`border px-3 py-2 text-[11px] font-bold uppercase transition-colors ${delivery === item ? "border-white bg-white text-black" : "border-white/12 bg-[#141414] text-white/62 hover:border-white/32 hover:bg-[#1C1C1C] hover:text-white"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-[11px] font-bold uppercase text-white/46">Popular now</h2>
                <span className="text-[11px] uppercase text-white/30">{filteredTools.length} matches</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {popularTools.map((tool) => {
                  const Icon = iconMap[tool.icon]
                  return (
                    <Link
                      key={tool.slug}
                      href={toolHref(tool)}
                      className="tools-directory-mini-card group min-h-[188px] border border-white/12 bg-[#141414] p-4 shadow-[0_14px_42px_rgba(0,0,0,0.24)] transition-colors hover:border-white/24"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center border border-white/12 text-white">
                          <Icon size={17} />
                        </span>
                        <span className="text-[10px] font-bold uppercase text-white/48">{statusLabel(tool.status)}</span>
                      </div>
                      <h3 className="text-sm font-black uppercase leading-tight text-white">{tool.shortTitle}</h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/58">{tool.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="tools-directory-card border border-white/12 bg-[#141414] p-10 text-center shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
                <Search size={28} className="mx-auto mb-4 text-white/36" />
                <h3 className="text-xl font-black uppercase text-white">No tools found</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/54">
                  Try another category, workflow, or search term. The catalog is built to keep expanding.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 inline-flex h-11 items-center justify-center bg-white px-5 text-xs font-bold uppercase text-black"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function FilterButton({ active, label, count, onClick }: { active: boolean; label: string; count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between border px-3 py-2 text-left transition-colors ${active ? "border-white bg-white text-black" : "border-white/12 bg-[#141414] text-white/66 hover:border-white/32 hover:bg-[#1C1C1C] hover:text-white"}`}
    >
      <span className="text-[11px] font-bold uppercase">{label}</span>
      <span className={`text-[11px] ${active ? "text-black/55" : "text-white/38"}`}>{count}</span>
    </button>
  )
}

function ToolCard({ tool }: { tool: PublicTool }) {
  const Icon = iconMap[tool.icon]
  const isOpen = tool.status !== "Queued"
  const href = isOpen ? toolHref(tool) : toolContactHref(tool.slug)

  return (
    <article className="tools-directory-card group flex min-h-[278px] flex-col border border-white/12 bg-[#141414] p-5 shadow-[0_16px_46px_rgba(0,0,0,0.24)] transition-colors hover:border-white/24">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="inline-flex h-11 w-11 items-center justify-center border border-white/12 text-white transition-colors group-hover:border-white/28">
          <Icon size={20} />
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <span className="border border-white/12 bg-white/[0.035] px-2 py-1 text-[10px] font-bold uppercase text-white/48">{tool.category}</span>
          <span className="border border-white/12 bg-white/[0.035] px-2 py-1 text-[10px] font-bold uppercase text-white/48">{tool.workflow}</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${tool.status === "Live" ? "bg-emerald-400" : tool.status === "Beta" ? "bg-yellow-300" : "bg-white/28"}`} />
          <span className="text-[10px] font-bold uppercase text-white/52">{statusLabel(tool.status)}</span>
          <span className="text-[10px] uppercase text-white/34">/ {tool.delivery}</span>
        </div>
        <h3 className="text-[17px] font-black uppercase leading-tight text-white">{tool.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/64">{tool.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {tool.keywords.slice(0, 3).map((keyword) => (
          <span key={keyword} className="bg-[#202020] px-2 py-1 text-[10px] uppercase text-white/48">
            {keyword}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className={`mt-5 inline-flex h-11 items-center justify-center gap-2 text-xs font-bold uppercase transition-colors ${isOpen ? "tools-directory-primary-action bg-white text-black hover:bg-white/90" : "tools-directory-secondary-action border border-white/16 bg-[#202020] text-white hover:border-white/36 hover:bg-[#2A2A2A]"}`}
      >
        {isOpen ? "Open tool" : "Request build"}
        <ArrowRight size={13} />
      </Link>
    </article>
  )
}
