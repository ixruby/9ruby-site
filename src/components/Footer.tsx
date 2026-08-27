"use client";

const FOOTER_LINKS = {
  Product: [
    "Agent Services",
    "How it Works",
    "Pricing",
    "Integrations",
  ],
  Developers: [
    "Documentation",
    "Agent SDK",
    "API Reference",
    "Status",
  ],
  Company: [
    "About",
    "Blog",
    "Careers",
    "Contact",
  ],
  Legal: [
    "Privacy",
    "Terms",
    "Security",
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-16 lg:py-20 overflow-hidden">
      {/* Coral ocean background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <img
          src="/images/ocean/ocean-garden.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-[family-name:var(--font-instrument-serif)] text-2xl">
                9RUBY
              </span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs mt-1 text-white/25">
                IX
              </span>
            </div>
            <p className="text-sm text-white/25 leading-relaxed max-w-xs">
              AI-powered marketing agency. Autonomous agents that plan, create,
              and scale your brand — 24/7. Nine is final.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { name: "Twitter", href: "https://twitter.com/9ruby", label: "Follow on Twitter" },
                { name: "GitHub", href: "https://github.com/ixruby", label: "View on GitHub" },
                { name: "LinkedIn", href: "https://linkedin.com/company/9ruby", label: "Follow on LinkedIn" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.label}
                  className="text-xs text-white/25 hover:text-white/50 transition-colors font-[family-name:var(--font-jetbrains-mono)]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-medium mb-4 text-white/25">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/25 hover:text-white/50 transition-colors"
                    >
                      {link}
                      {link === "Careers" && (
                        <span className="ml-2 text-xs text-[#C41A3B]">
                          Hiring
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
          <span className="text-xs text-white/25">
            &copy; 2026 9Ruby. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-white/25">
              All agents operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
