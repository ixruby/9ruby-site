import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ArabicAccent from "@/components/ArabicAccent"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const ARABIC_TAGS: Record<string, string> = {
  Ecosystem: "منظومة",
  Services: "خدمات",
  Products: "منتجات",
  Company: "شركة",
  Tools: "أدوات",
  Templates: "قوالب",
  Work: "أعمال",
}

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
      <Badge variant="outline" className="arabic-row mb-6 w-full max-w-[540px] rounded-none border-border text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        * {tag} {ARABIC_TAGS[tag] ? <ArabicAccent>{ARABIC_TAGS[tag]}</ArabicAccent> : null}
      </Badge>
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
      <Separator className="mt-8 bg-border" />
    </div>
  )
}
