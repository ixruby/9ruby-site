import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | 9Ruby",
  description:
    "Simple, transparent pricing for 9Ruby AI. Free, Starter, Pro, and Enterprise plans. Start free and scale when you're ready.",
  openGraph: {
    title: "Pricing | 9Ruby",
    description:
      "Simple, transparent pricing for 9Ruby AI. Free, Starter, Pro, and Enterprise plans. Start free and scale when you're ready.",
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
