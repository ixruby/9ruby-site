import Link from "next/link"

const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

export default function Footer() {
  return (
    <footer style={{ background: "#000", borderTop: BORDER }}>
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
              AI agents, websites, voice systems, and automation by IX Ruby.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a href="mailto:hello@9ruby.com" style={{ fontFamily: NV, fontWeight: 700, fontSize: 13, color: "#C8102E", textDecoration: "none" }}>
                hello@9ruby.com
              </a>
              <a href="https://ai.9ruby.com" style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.44)", textDecoration: "none" }}>
                ai.9ruby.com →
              </a>
            </div>
          </div>

          {[
            {
              title: "Product",
              links: [
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
              <p style={{ fontFamily: NV, fontWeight: 800, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>{col.title}</p>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="hover:text-white transition-colors"
                    style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.44)", textDecoration: "none" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: BORDER }}>
          <span style={{ fontFamily: NV, fontWeight: 700, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
            &copy; 2026 9Ruby / IX Ruby
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span style={{ fontFamily: NV, fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
              Official site live
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
