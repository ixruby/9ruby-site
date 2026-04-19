"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import GlobeProjects from "@/components/GlobeProjects"

export default function UniversePage() {
  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />

      <div className="pt-24" />
      <GlobeProjects />

      <section className="py-16 text-center px-6">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 h-10 px-7 rounded-full text-sm font-medium transition-colors"
            style={{ background: "var(--button-bg)", color: "var(--button-fg)" }}
          >
            Explore services <ArrowRight size={14} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-10 px-7 rounded-full text-sm font-medium"
            style={{ border: "1px solid var(--border-subtle)", color: "var(--ink-muted)" }}
          >
            Work with us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
