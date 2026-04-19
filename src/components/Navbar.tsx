"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

interface DropdownItem {
  label: string
  href: string
  desc: string
}

interface NavGroup {
  label: string
  items: DropdownItem[]
}

const navGroups: NavGroup[] = [
  {
    label: "Products",
    items: [
      { label: "9Ruby AI", href: "https://ai.9ruby.com", desc: "Start with AI access" },
      { label: "Templates", href: "/templates", desc: "Production-ready starters" },
      { label: "Tools", href: "/tools", desc: "Free AI-powered utilities" },
      { label: "Apps", href: "/apps", desc: "13,000+ integrations" },
      { label: "Documentation", href: "/docs", desc: "Guides and API reference" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Services", href: "/services", desc: "Managed execution" },
      { label: "Voice AI Agents", href: "/services/voice-agents", desc: "Sub-500ms voice agents" },
      { label: "Pricing", href: "/pricing", desc: "Starter, Core, Prime, Black" },
      { label: "Domains", href: "/domains", desc: "Register domains through 9Ruby" },
      { label: "Ecosystem", href: "/ecosystem", desc: "All 9Ruby products" },
      { label: "Universe", href: "/universe", desc: "How the brand fits together" },
      { label: "Dashboard", href: "/dashboard", desc: "Internal workspace" },
      { label: "Prospector", href: "/dashboard/prospector", desc: "Find & pitch leads" },
      { label: "Case Studies", href: "/cases", desc: "Real client results" },
    ],
  },
]

const directLinks = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

function Dropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeout = useRef<ReturnType<typeof setTimeout>>(null)

  const enter = () => {
    if (timeout.current) clearTimeout(timeout.current)
    setOpen(true)
  }
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => {
    return () => { if (timeout.current) clearTimeout(timeout.current) }
  }, [])

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="flex items-center gap-1 text-[13px] font-medium transition-colors duration-200"
        style={{ color: "var(--ink-muted)" }}
        onClick={() => setOpen(!open)}
      >
        {group.label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
          style={{ animation: "fadeIn 0.15s ease" }}
        >
          <div className="rounded-2xl p-1.5 min-w-[240px]" style={{ background: "var(--surface-solid)", border: "1px solid var(--border-subtle)", boxShadow: "0 24px 60px var(--shadow-color), 0 4px 16px var(--shadow-color)" }}>
            {group.items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex flex-col gap-0.5 px-3.5 py-2.5 rounded-xl transition-colors duration-100 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                style={{ animationDelay: `${i * 25}ms` }}
              >
                <span className="text-[13px] font-semibold" style={{ color: "var(--ink-strong)", letterSpacing: "-0.01em" }}>{item.label}</span>
                <span className="text-[11px]" style={{ color: "var(--ink-soft)" }}>{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  return (
    <header className="fixed z-50 top-0 left-0 right-0 backdrop-blur-2xl" style={{ background: "var(--header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .nav-link-hover:hover { color: var(--ink-strong) !important; }
        .nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }
        .nav-cta { transition: all 0.2s ease; }
      `}</style>

      <nav aria-label="Main navigation" className="mx-auto max-w-[1280px] flex items-center justify-between px-6 h-14">
        <Link href="/" className="flex items-baseline gap-0 shrink-0 select-none">
          <span
            className="font-serif italic font-bold leading-none"
            style={{ fontSize: "1.85rem", letterSpacing: "-0.04em", color: "var(--accent)" }}
          >9</span>
          <span
            className="font-bold leading-none"
            style={{ fontSize: "1.15rem", letterSpacing: "-0.03em", color: "var(--ink-strong)" }}
          >Ruby</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navGroups.map((group) => (
            <Dropdown key={group.label} group={group} />
          ))}
          {directLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link-hover text-[13px] font-medium transition-colors duration-150"
              style={{ color: "var(--ink-muted)" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <a href="https://ai.9ruby.com" className="nav-link-hover text-[13px] font-medium transition-colors" style={{ color: "var(--ink-muted)" }}>
            Sign in
          </a>
          <a
            href="https://ai.9ruby.com"
            className="nav-cta text-[13px] font-semibold rounded-full px-5 h-8 inline-flex items-center"
            style={{ background: "var(--button-bg)", color: "var(--button-fg)", letterSpacing: "-0.01em" }}
          >
            Start with AI
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden transition-colors"
          style={{ color: "var(--ink-muted)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden px-6 py-5 max-h-[80vh] overflow-y-auto" style={{ background: "var(--surface)", borderTop: "1px solid var(--border-subtle)" }}>
          {navGroups.map((group) => (
            <div key={group.label} className="pb-2 mb-2" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
                className="flex items-center justify-between w-full py-2.5 text-[15px] font-semibold"
                style={{ color: "var(--ink-strong)" }}
              >
                {group.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${mobileExpanded === group.label ? "rotate-180" : ""}`}
                  style={{ color: "var(--ink-soft)" }}
                />
              </button>
              {mobileExpanded === group.label && (
                <div className="pl-3 pb-2 space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-[14px] transition-colors"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {item.label}
                      <span className="ml-2 text-[11px]" style={{ color: "var(--ink-soft)" }}>{item.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {directLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-[15px] font-medium transition-colors"
              style={{ color: "var(--ink-muted)" }}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-4 mt-2 space-y-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
            <div className="flex justify-center pb-2">
              <ThemeToggle />
            </div>
            <a href="https://ai.9ruby.com" className="block text-center text-[13px] py-2" style={{ color: "var(--ink-muted)" }}>Sign in</a>
            <a
              href="https://ai.9ruby.com"
              className="block text-center text-[13px] font-semibold rounded-full h-10 leading-10"
              style={{ background: "var(--button-bg)", color: "var(--button-fg)" }}
            >
              Start with AI
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
