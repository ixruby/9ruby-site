import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import ArabicAccent from "@/components/ArabicAccent"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 pb-10">
        {/* Big wordmark */}
        <div
          className="select-none mb-12"
          style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(3rem, 10vw, 8rem)", color: "rgba(255,255,255,0.08)", lineHeight: 1, letterSpacing: "-0.075em", textTransform: "uppercase" }}
        >
          9RUBY
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <p style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.44)", lineHeight: 1.65, maxWidth: 240 }}>
              Dubai-based AI agents, websites, voice systems, and automation by IX Ruby.
            </p>
            <p className="mt-3 text-[11px] font-semibold uppercase text-muted-foreground">
              Global systems <ArabicAccent>دبي · عالمي</ArabicAccent>
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Button asChild variant="link" className="h-auto justify-start rounded-none px-0 text-[13px] font-bold text-primary">
                <a href="mailto:hello@9ruby.com">hello@9ruby.com</a>
              </Button>
              <Button asChild variant="link" className="h-auto justify-start rounded-none px-0 text-[13px] text-muted-foreground">
                <a href="https://ai.9ruby.com">ai.9ruby.com →</a>
              </Button>
            </div>
          </div>

          {[
            {
              title: "Product",
              links: [
                { label: "Free Score", href: "/revenue-score" },
                { label: "$49 Audit", href: "/audit" },
                { label: "Services", href: "/services" },
                { label: "Templates", href: "/templates" },
                { label: "Tools", href: "/tools" },
                { label: "App Store", href: "/apps" },
                { label: "Pricing", href: "/pricing" },
                { label: "Case Studies", href: "/cases" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "Directory", href: "/directory" },
                { label: "Ecosystem", href: "/ecosystem" },
                { label: "Docs", href: "/docs" },
                { label: "Contact", href: "/contact" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/careers" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <Badge variant="outline" className="mb-5 rounded-none border-border text-[10px] font-extrabold uppercase tracking-[0.1em] text-muted-foreground">
                {col.title}
              </Badge>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <Button key={l.label} asChild variant="link" className="h-auto justify-start rounded-none px-0 text-[13px] font-normal text-muted-foreground hover:text-foreground">
                    <Link href={l.href}>{l.label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator className="mb-6 bg-border" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span style={{ fontFamily: NV, fontWeight: 700, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
            &copy; 2026 9Ruby / IX Ruby
          </span>
        </div>
      </div>
    </footer>
  )
}
