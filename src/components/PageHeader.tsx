export default function PageHeader({
  tag,
  title,
  highlight,
  description,
}: {
  tag: string
  title: string
  highlight?: string
  description?: string
}) {
  return (
    <div className="mb-20 lg:mb-24">
      {/* Section label */}
      <div className="inline-flex items-center gap-2 mb-8">
        <span className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "#C41A3B" }}>
          {tag}
        </span>
      </div>

      {/* Serif headline */}
      <h1 className="text-5xl md:text-6xl lg:text-[80px] font-serif italic tracking-tighter leading-[0.9] mb-8" style={{ color: "#1A1A1A" }}>
        {title}
        {highlight && (
          <>
            <br />
            <span style={{ color: "#7A7A72" }}>
              {highlight}
            </span>
          </>
        )}
      </h1>

      {description && (
        <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "#7A7A72" }}>
          {description}
        </p>
      )}
    </div>
  )
}
