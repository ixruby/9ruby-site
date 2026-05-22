"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { label: "Free Preview", href: "/landing-page-preview" },
  { label: "Free Score", href: "/revenue-score" },
  { label: "$49 Audit", href: "/audit" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/cases" },
  { label: "Templates", href: "/templates" },
  { label: "Tools", href: "/tools" },
  { label: "Company", href: "/about" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[72px]">
      <nav aria-label="Main navigation" className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 md:px-8">
        <LogoMark />

        <div className="hidden items-center gap-9 lg:flex">
          <Link href="/" className="nav-minimal-link">
            Home
          </Link>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-minimal-link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a href="https://ai.9ruby.com" target="_blank" rel="noopener noreferrer" className="nav-minimal-link">
            AI
          </a>
          <Button
            asChild
            size="sm"
            className="h-9 rounded-full px-6 text-[11px] font-extrabold uppercase tracking-normal"
            style={{ background: "#fff", color: "#050505" }}
          >
            <Link href="/landing-page-preview">Free Preview</Link>
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="rounded-full text-foreground lg:hidden" aria-label="Open menu">
              <Menu data-icon="inline-start" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(90vw,360px)] rounded-none border-border bg-popover p-0" showCloseButton>
            <SheetHeader className="gap-2 border-b border-border p-6">
              <SheetTitle className="text-2xl font-black tracking-[-0.055em]">9RUBY</SheetTitle>
              <SheetDescription>AI agents, websites, tools, and automation.</SheetDescription>
            </SheetHeader>

            <div className="flex min-h-0 flex-1 flex-col p-6">
              <div className="grid gap-1">
                <MobileLink href="/" label="Home" onClick={() => setMobileOpen(false)} />
                {navLinks.map((link) => (
                  <MobileLink key={link.href} href={link.href} label={link.label} onClick={() => setMobileOpen(false)} />
                ))}
                <a href="https://ai.9ruby.com" target="_blank" rel="noopener noreferrer" className="mobile-minimal-link">
                  AI
                </a>
              </div>

              <div className="mt-auto grid gap-4">
                <Separator />
                <Button asChild className="h-12 rounded-full text-xs font-extrabold uppercase tracking-normal" onClick={() => setMobileOpen(false)}>
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

function LogoMark() {
  return (
    <Link href="/" className="shrink-0 select-none text-[23px] font-black uppercase leading-none tracking-[-0.055em] text-foreground no-underline">
      9RUBY
      <sup className="text-[0.45em] tracking-normal text-muted-foreground">°</sup>
    </Link>
  )
}

function MobileLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="mobile-minimal-link">
      {label}
    </Link>
  )
}
