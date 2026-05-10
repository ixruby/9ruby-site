const NV = "'Helvetica Neue', Helvetica, Arial, sans-serif"

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
    <div className="mb-16 lg:mb-20">
      <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
        * {tag}
      </p>
      <h1
        style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(2.5rem, 8vw, 6rem)", color: "#fff", marginBottom: 20 }}
      >
        {title}
        {highlight && (
          <>
            <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>{highlight}</span>
          </>
        )}
      </h1>
      {description && (
        <p style={{ fontFamily: NV, fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.5)", maxWidth: 540 }}>
          {description}
        </p>
      )}
    </div>
  )
}
