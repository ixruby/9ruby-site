export default function ArabicAccent({ children }: { children: string }) {
  return (
    <span className="arabic-accent" lang="ar" dir="rtl">
      {children}
    </span>
  )
}
