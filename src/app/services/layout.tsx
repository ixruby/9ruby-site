import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | 9Ruby",
  description:
    "AI-powered services that drive growth: chatbots, website design, SEO, social media, email marketing, analytics, custom software, mobile apps, brand design, and video production.",
  openGraph: {
    title: "Services | 9Ruby",
    description:
      "AI-powered services that drive growth: chatbots, website design, SEO, social media, email marketing, analytics, custom software, mobile apps, brand design, and video production.",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
