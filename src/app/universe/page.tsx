"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import GlobeProjects from "@/components/GlobeProjects"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

export default function UniversePage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />

      <div className="pt-24" />
      <GlobeProjects />

      <section style={{ borderTop: BORDER }} className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
            * Universe
          </p>
          <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2.5rem,6vw,5rem)", color: "#fff", marginBottom: 20 }}>
            THE 9RUBY<br />ECOSYSTEM
          </h2>
          <p style={{ fontFamily: NV, fontSize: 16, lineHeight: 1.65, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 40px" }}>
            Every project, product, and tool built by IX Ruby — in one place.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ fontFamily: NV, fontWeight: 800, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "11px 26px", textDecoration: "none" }}
            >
              Explore Services <ArrowRight size={11} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              style={{ fontFamily: NV, fontWeight: 800, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", border: BORDER, color: "rgba(255,255,255,0.7)", padding: "11px 26px", textDecoration: "none" }}
            >
              Work With Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
