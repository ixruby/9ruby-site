const products = [
  "9Ruby AI",
  "Voice Agents",
  "Rubix",
  "Nine Builder",
  "9Ruby OS",
  "Terminal9",
  "GitNexus",
  "IXR Cloud",
  "Domains",
  "Templates",
]

export default function LogoMarquee() {
  const doubled = [...products, ...products]

  return (
    <div
      className="relative overflow-hidden py-5"
      style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}
    >
      <div className="marquee-track flex gap-12 whitespace-nowrap w-max">
        {doubled.map((name, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--ink-soft)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "var(--accent)" }}
            />
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
