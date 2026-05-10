"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="breadcrumb-band" style={{ background: "#8C000E" }}>
      <nav aria-label="Breadcrumb" className="max-w-[1200px] mx-auto px-6 pt-[88px] pb-2">
        <ol className="flex items-center gap-1.5 text-xs font-mono">
          <li>
            <Link href="/" className="transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>
              Home
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.38)" }} />
              {item.href && i < items.length - 1 ? (
                <Link href={item.href} className="transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: "#fff" }}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
