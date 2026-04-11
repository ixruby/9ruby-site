import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | 9Ruby",
  description:
    "Insights on AI agents, web development, marketing automation, and building with 9Ruby.",
  openGraph: {
    title: "Blog | 9Ruby",
    description:
      "Insights on AI, development, and automation.",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
