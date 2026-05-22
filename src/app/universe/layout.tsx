import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Universe | 9Ruby",
  description:
    "Explore the 9Ruby Universe — a visual journey through the entire Nine Ruby ecosystem of AI-powered products, services, and tools.",
  openGraph: {
    title: "Universe | 9Ruby",
    description:
      "Explore the 9Ruby Universe — a visual journey through the entire Nine Ruby ecosystem of AI-powered products, services, and tools.",
  },
}

export default function UniverseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
