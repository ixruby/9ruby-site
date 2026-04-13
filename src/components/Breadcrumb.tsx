"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-[1200px] mx-auto px-6 pt-28 pb-4">
      <ol className="flex items-center gap-1.5 text-xs font-mono">
        <li>
          <Link href="/" className="transition-colors" style={{ color: "var(--ink-soft)" }}>
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight size={12} style={{ color: "var(--ink-soft)" }} />
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="transition-colors" style={{ color: "var(--ink-soft)" }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: "var(--ink-muted)" }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
