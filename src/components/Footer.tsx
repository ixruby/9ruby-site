import Link from "next/link"

export default function Footer() {
  return (
    <footer style={{ background: "var(--page-bg-alt)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="max-w-[1100px] mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-0.5 mb-4">
              <span className="font-serif italic text-[1.4rem] font-bold tracking-tight text-[#8B6B3D]">9</span>
              <span className="text-base font-bold tracking-tight" style={{ color: "var(--ink-strong)" }}>Ruby</span>
            </Link>
            <p className="text-[13px] leading-relaxed max-w-[260px]" style={{ color: "var(--ink-muted)" }}>
              AI agents, websites, voice systems, and automation by IX Ruby.
            </p>
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
              <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-4" style={{ color: "var(--ink-soft)" }}>
                {col.title}
              </h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-[13px] transition-colors"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <span className="text-[11px]" style={{ color: "var(--ink-soft)" }}>
            &copy; 2026 9Ruby / IX Ruby
          </span>
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--ink-soft)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Official site live
          </div>
        </div>
      </div>
    </footer>
  )
}
