import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Domains | 9Ruby",
  description:
    "Find and register your perfect domain through 9Ruby. Transparent pricing, instant availability, all major TLDs.",
  openGraph: {
    title: "Domains | 9Ruby",
    description:
      "Find and register your perfect domain through 9Ruby. Transparent pricing, instant availability.",
  },
}

export default function DomainsLayout({ children }: { children: React.ReactNode }) {
  return children
}
