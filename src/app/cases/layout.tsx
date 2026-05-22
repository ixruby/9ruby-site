import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Studies | 9Ruby",
  description:
    "See how teams use 9Ruby to ship faster, automate more, and scale their business.",
  openGraph: {
    title: "Case Studies | 9Ruby",
    description: "Real results from real clients.",
  },
}

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
