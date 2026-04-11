import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.08]" style={{ background: "#F5F3EE" }}>
      <div className="max-w-[1100px] mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-0.5 mb-4">
              <span className="font-serif italic text-[1.4rem] font-bold tracking-tight text-[#C41A3B]">9</span>
              <span className="text-base font-bold tracking-tight text-[#111]">Ruby</span>
            </Link>
            <p className="text-[13px] text-black/50 leading-relaxed max-w-[260px]">
              AI-powered platform. Build, ship, and scale — from a single dashboard.
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
                { label: "Dashboard", href: "/dashboard" },
                { label: "Universe", href: "/universe" },
                { label: "Docs", href: "/docs" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/careers" },
                { label: "Privacy", href: "/privacy" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-black/40 mb-4">
                {col.title}
              </h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-[13px] text-black/55 hover:text-black transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-black/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-black/40">
            &copy; 2026 IX Ruby Agency
          </span>
          <div className="flex items-center gap-1.5 text-[11px] text-black/40">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
