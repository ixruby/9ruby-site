import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation | 9Ruby",
  description:
    "Everything you need to build with 9Ruby. Guides, API reference, CLI docs, templates, and integration tutorials.",
  openGraph: {
    title: "Documentation | 9Ruby",
    description:
      "Everything you need to build with 9Ruby. Guides, API reference, CLI docs, templates, and integration tutorials.",
  },
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
