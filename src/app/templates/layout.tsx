import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Templates | 9Ruby",
  description:
    "Production-ready website templates built with Next.js, React, and Tailwind CSS. Free and premium landing pages, portfolios, e-commerce, dashboards, and SaaS boilerplates.",
  openGraph: {
    title: "Templates | 9Ruby",
    description:
      "Production-ready website templates built with Next.js, React, and Tailwind CSS. Free and premium landing pages, portfolios, e-commerce, dashboards, and SaaS boilerplates.",
  },
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
