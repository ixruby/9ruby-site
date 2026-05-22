import { Metadata } from "next"

export const metadata: Metadata = {
  title: "App Store | 9Ruby",
  description:
    "Browse 13,000+ app integrations for 9Ruby AI. Connect your favorite tools — CRM, analytics, marketing, developer, design, and more.",
  openGraph: {
    title: "App Store | 9Ruby",
    description:
      "Browse 13,000+ app integrations for 9Ruby AI. Connect your favorite tools — CRM, analytics, marketing, developer, design, and more.",
  },
}

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
