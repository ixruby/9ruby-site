"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import {
  Menu, X, ChevronDown, ArrowRight,
  Bot, Mic, Zap, Globe, Smartphone, Code, Palette, TrendingUp, Mail, Share2,
  Sparkles, Layout, Wrench, Box, Server, BookOpen,
  Users, Briefcase, MessageCircle, BarChart3, Star, FileText, Phone,
  Building2, Newspaper, DollarSign, Heart,
} from "lucide-react"

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

/* ── Mega-menu data ─────────────────────────────────────────────── */

type MenuItem = { label: string; href: string; sub: string; icon: React.ReactNode; external?: boolean }
type MenuGroup = { heading: string; items: MenuItem[] }

const servicesGroups: MenuGroup[] = [
  {
    heading: "AI & Automation",
    items: [
      { label: "AI Chatbots & Agents", href: "/services#ai-chatbots", sub: "Custom LLM-powered agents", icon: <Bot size={15} /> },
      { label: "Voice AI Agents", href: "/services/voice-agents", sub: "24/7 phone & voice AI", icon: <Mic size={15} /> },
      { label: "AI Workflows", href: "/services#automation", sub: "End-to-end automation", icon: <Zap size={15} /> },
    ],
  },
  {
    heading: "Web & Mobile",
    items: [
      { label: "Website Design & Dev", href: "/services#web-design", sub: "Conversion-first sites", icon: <Globe size={15} /> },
      { label: "Mobile Apps", href: "/services#mobile", sub: "iOS & Android, AI-native", icon: <Smartphone size={15} /> },
      { label: "Custom Software", href: "/services#software", sub: "Full-stack engineering", icon: <Code size={15} /> },
    ],
  },
  {
    heading: "Marketing",
    items: [
      { label: "SEO & Growth", href: "/services#seo", sub: "Organic acquisition engine", icon: <TrendingUp size={15} /> },
      { label: "Social Media", href: "/services#social", sub: "AI-assisted brand presence", icon: <Share2 size={15} /> },
      { label: "Email Marketing", href: "/services#email", sub: "Automated revenue flows", icon: <Mail size={15} /> },
    ],
  },
  {
    heading: "Brand & Design",
    items: [
      { label: "Brand Identity", href: "/services#brand", sub: "Logo, type & visual system", icon: <Palette size={15} /> },
      { label: "UI/UX Design", href: "/services#ux", sub: "Product & interface design", icon: <Layout size={15} /> },
      { label: "Content Strategy", href: "/services#content", sub: "Copy, blogs & media", icon: <FileText size={15} /> },
    ],
  },
]

const productsGroups: MenuGroup[] = [
  {
    heading: "AI Platform",
    items: [
      { label: "9Ruby AI", href: "https://ai.9ruby.com", sub: "Claude-powered workspace", icon: <Sparkles size={15} />, external: true },
      { label: "Voice Agents", href: "/services/voice-agents", sub: "Sub-500ms voice AI", icon: <Mic size={15} /> },
      { label: "AI Automation", href: "/services#automation", sub: "Workflow AI agents", icon: <Bot size={15} /> },
    ],
  },
  {
    heading: "Templates & Tools",
    items: [
      { label: "Templates", href: "/templates", sub: "Production-ready starters", icon: <Layout size={15} /> },
      { label: "Tools", href: "/tools", sub: "Free dev & marketing tools", icon: <Wrench size={15} /> },
      { label: "Apps", href: "/apps", sub: "13,000+ integrations", icon: <Box size={15} /> },
    ],
  },
  {
    heading: "Infrastructure",
    items: [
      { label: "Domains", href: "/domains", sub: "Register & manage domains", icon: <Server size={15} /> },
      { label: "Ecosystem", href: "/ecosystem", sub: "Full 9Ruby stack map", icon: <BarChart3 size={15} /> },
      { label: "Documentation", href: "/docs", sub: "API & CLI reference", icon: <BookOpen size={15} /> },
    ],
  },
]

const companyGroups: MenuGroup[] = [
  {
    heading: "Learn",
    items: [
      { label: "About Us", href: "/about", sub: "Story, team & mission", icon: <Building2 size={15} /> },
      { label: "Case Studies", href: "/cases", sub: "47+ client results", icon: <Star size={15} /> },
      { label: "Blog", href: "/blog", sub: "AI, engineering & growth", icon: <Newspaper size={15} /> },
    ],
  },
  {
    heading: "Work With Us",
    items: [
      { label: "Pricing", href: "/pricing", sub: "Transparent plans", icon: <DollarSign size={15} /> },
      { label: "Careers", href: "/careers", sub: "Join the team", icon: <Heart size={15} /> },
      { label: "Contact", href: "/contact", sub: "Start a project", icon: <MessageCircle size={15} /> },
    ],
  },
]

type DropdownKey = "services" | "company" | "products" | null

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState<DropdownKey>(null)
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openDropdown = (key: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDropdown(key)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDropdown(null), 120)
  }

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  const toggleMobile = (key: DropdownKey) =>
    setMobileExpanded(prev => prev === key ? null : key)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ height: 74 }}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-[1400px] flex items-center justify-between px-8"
        style={{ height: 74 }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 select-none"
          style={{ fontFamily: NV, fontWeight: 900, fontSize: 23.2, letterSpacing: "-0.055em", color: "#fff", textDecoration: "none", textTransform: "uppercase" }}
        >
          9RUBY<sup style={{ fontSize: "0.45em", letterSpacing: 0, color: "rgba(255,255,255,0.5)" }}>°</sup>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          <Link href="/" style={{ fontFamily: NV, fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.65)", letterSpacing: "-0.01em", textDecoration: "none", padding: "8px 14px" }} className="hover:text-white transition-colors">
            Home
          </Link>

          {(["services", "products", "company"] as DropdownKey[]).map((key) => {
            const label = key === "services" ? "Services" : key === "products" ? "Products" : "Company"
            const groups = key === "services" ? servicesGroups : key === "products" ? productsGroups : companyGroups
            const browseHref = key === "services" ? "/services" : key === "products" ? "/products" : "/about"
            const browseLabel = key === "services" ? "Browse all services" : key === "products" ? "Browse all products" : "About 9Ruby"
            return (
              <div key={key} style={{ position: "relative" }} onMouseEnter={() => openDropdown(key)} onMouseLeave={scheduleClose}>
                <button
                  style={{ fontFamily: NV, fontWeight: 600, fontSize: 13, color: dropdown === key ? "#fff" : "rgba(255,255,255,0.65)", letterSpacing: "-0.01em", background: "none", border: "none", cursor: "pointer", padding: "8px 14px", display: "flex", alignItems: "center", gap: 4 }}
                  className="transition-colors"
                >
                  {label}
                  <ChevronDown size={12} style={{ transition: "transform 0.2s", transform: dropdown === key ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {dropdown === key && (
                  <MegaMenu
                    groups={groups}
                    browseHref={browseHref}
                    browseLabel={browseLabel}
                    onMouseEnter={() => openDropdown(key)}
                    onMouseLeave={scheduleClose}
                  />
                )}
              </div>
            )
          })}

          <Link href="/cases" style={{ fontFamily: NV, fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.65)", letterSpacing: "-0.01em", textDecoration: "none", padding: "8px 14px" }} className="hover:text-white transition-colors">
            Work
          </Link>
        </div>


        {/* Mobile toggle */}
        <button className="lg:hidden" style={{ color: "#fff", background: "none", border: "none", cursor: "pointer" }} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden overflow-y-auto" style={{ background: "#080808", borderTop: BORDER, maxHeight: "calc(100vh - 74px)" }}>
          <MobileSection label="Services" expanded={mobileExpanded === "services"} onToggle={() => toggleMobile("services")} groups={servicesGroups} onClose={() => setMobileOpen(false)} />
          <MobileSection label="Products" expanded={mobileExpanded === "products"} onToggle={() => toggleMobile("products")} groups={productsGroups} onClose={() => setMobileOpen(false)} />
          <MobileSection label="Company" expanded={mobileExpanded === "company"} onToggle={() => toggleMobile("company")} groups={companyGroups} onClose={() => setMobileOpen(false)} />
          <Link href="/cases" onClick={() => setMobileOpen(false)} className="flex items-center justify-between" style={{ fontFamily: NV, fontWeight: 700, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", padding: "18px 24px", borderBottom: BORDER, textDecoration: "none" }}>
            Work
          </Link>
          <div className="flex flex-col gap-3 p-6">
            <a href="https://ai.9ruby.com" style={{ fontFamily: NV, fontWeight: 800, fontSize: 12, background: "#C8102E", color: "#fff", padding: "13px 24px", textAlign: "center", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Start with AI
            </a>
            <Link href="/contact" onClick={() => setMobileOpen(false)} style={{ fontFamily: NV, fontWeight: 800, fontSize: 12, background: "#fff", color: "#080808", padding: "13px 24px", textAlign: "center", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

/* ── Desktop Mega-Menu ──────────────────────────────────────────── */

function MegaMenu({
  groups, browseHref, browseLabel, onMouseEnter, onMouseLeave,
}: {
  groups: MenuGroup[]
  browseHref: string
  browseLabel: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const cols = groups.length
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "fixed",
        top: 74,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#0a0a0a",
        border: "0.8px solid rgba(255,255,255,0.13)",
        borderTop: "none",
        zIndex: 100,
        boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
        minWidth: cols <= 2 ? 480 : cols === 3 ? 680 : 860,
        maxWidth: 920,
      }}
    >
      {/* Column headers + items */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {groups.map((group, gi) => (
          <div
            key={group.heading}
            style={{ borderRight: gi < cols - 1 ? "0.8px solid rgba(255,255,255,0.07)" : undefined }}
          >
            {/* Column heading */}
            <div style={{ padding: "16px 20px 10px", borderBottom: "0.8px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                {group.heading}
              </span>
            </div>
            {/* Items */}
            <div>
              {group.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 hover:bg-white/[0.04] transition-colors group/item"
                  style={{
                    padding: "11px 20px",
                    textDecoration: "none",
                    borderBottom: "0.8px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.28)", flexShrink: 0, transition: "color 0.15s" }} className="group-hover/item:text-white/60">
                    {item.icon}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <span style={{ fontFamily: NV, fontWeight: 600, fontSize: 12.5, color: "rgba(255,255,255,0.82)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.3 }}>
                      {item.sub}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Browse all footer */}
      <div style={{ padding: "12px 20px", borderTop: "0.8px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a
          href={browseHref}
          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
          style={{ fontFamily: NV, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}
        >
          {browseLabel} <ArrowRight size={11} />
        </a>
        <span style={{ fontFamily: NV, fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
          9RUBY°
        </span>
      </div>
    </div>
  )
}

/* ── Mobile accordion section ───────────────────────────────────── */

function MobileSection({
  label, expanded, onToggle, groups, onClose,
}: {
  label: string
  expanded: boolean
  onToggle: () => void
  groups: MenuGroup[]
  onClose: () => void
}) {
  return (
    <div style={{ borderBottom: "0.8px solid rgba(255,255,255,0.1)" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between"
        style={{ fontFamily: NV, fontWeight: 700, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", color: expanded ? "#fff" : "rgba(255,255,255,0.7)", padding: "18px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        {label}
        <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.4)" }} />
      </button>
      {expanded && (
        <div style={{ background: "rgba(255,255,255,0.02)", borderTop: "0.8px solid rgba(255,255,255,0.06)" }}>
          {groups.map((group) => (
            <div key={group.heading}>
              <div style={{ padding: "10px 24px 6px 32px" }}>
                <span style={{ fontFamily: NV, fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
                  {group.heading}
                </span>
              </div>
              {group.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={item.external ? undefined : onClose}
                  className="flex items-center gap-3 hover:bg-white/[0.03]"
                  style={{ padding: "10px 24px 10px 32px", borderBottom: "0.8px solid rgba(255,255,255,0.04)", textDecoration: "none" }}
                >
                  <span style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <span style={{ fontFamily: NV, fontWeight: 600, fontSize: 13, color: "#fff" }}>{item.label}</span>
                    <span style={{ fontFamily: NV, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{item.sub}</span>
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
