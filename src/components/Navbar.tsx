"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

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
      { label: "App Store", href: "/apps", desc: "13,000+ integrations" },
      { label: "Templates", href: "/templates", desc: "Production-ready starters" },
      { label: "Tools", href: "/tools", desc: "Free AI-powered utilities" },
      { label: "Directory", href: "/directory", desc: "211 open-source tools" },
      { label: "Documentation", href: "/docs", desc: "Guides & API reference" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Services", href: "/services", desc: "AI-powered agency work" },
      { label: "Ecosystem", href: "/ecosystem", desc: "All 9Ruby products" },
      { label: "Universe", href: "/universe", desc: "Explore the platform" },
      { label: "Dashboard", href: "/dashboard", desc: "Command center" },
      { label: "Case Studies", href: "/cases", desc: "Real client results" },
    ],
  },
]

const directLinks = [
  { label: "Pricing", href: "/pricing" },
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
        className="flex items-center gap-1 text-[13px] font-medium text-black/60 hover:text-black transition-colors duration-200"
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
          <div className="bg-white rounded-xl border border-black/[0.06] shadow-xl shadow-black/[0.06] p-2 min-w-[240px]">
            {group.items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-black/[0.03] transition-colors duration-150"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span className="text-[13px] font-semibold text-black/80">{item.label}</span>
                <span className="text-[11px] text-black/35">{item.desc}</span>
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
    <header className="fixed z-50 top-0 left-0 right-0 backdrop-blur-xl border-b border-black/[0.08]" style={{ background: "rgba(245,243,238,0.9)" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <nav aria-label="Main navigation" className="mx-auto max-w-[1200px] flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-0.5 shrink-0 group">
          <span className="font-serif italic text-[1.75rem] font-bold tracking-tight text-[#C41A3B]">9</span>
          <span className="text-lg font-bold tracking-tight text-[#111]">Ruby</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-7">
          {navGroups.map((group) => (
            <Dropdown key={group.label} group={group} />
          ))}
          {directLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-black/60 hover:text-black transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <a href="https://ai.9ruby.com" className="text-[13px] font-medium text-black/60 hover:text-black transition-colors">
            Sign in
          </a>
          <a
            href="https://ai.9ruby.com"
            className="text-[13px] font-semibold bg-black text-white rounded-full px-5 h-9 inline-flex items-center hover:bg-black/85 transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-black/40 hover:text-black transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/[0.04] px-6 py-5 max-h-[80vh] overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label} className="border-b border-black/[0.04] pb-2 mb-2">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
                className="flex items-center justify-between w-full py-2.5 text-[15px] font-semibold text-black/70"
              >
                {group.label}
                <ChevronDown
                  size={14}
                  className={`text-black/30 transition-transform duration-200 ${mobileExpanded === group.label ? "rotate-180" : ""}`}
                />
              </button>
              {mobileExpanded === group.label && (
                <div className="pl-3 pb-2 space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-[14px] text-black/60 hover:text-black transition-colors"
                    >
                      {item.label}
                      <span className="ml-2 text-[11px] text-black/25">{item.desc}</span>
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
              className="block py-2.5 text-[15px] font-medium text-black/55 hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-black/[0.04] mt-2 space-y-2">
            <a href="https://ai.9ruby.com" className="block text-center text-[13px] text-black/60 py-2">Sign in</a>
            <a
              href="https://ai.9ruby.com"
              className="block text-center text-[13px] font-semibold bg-black text-white rounded-full h-10 leading-10"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
