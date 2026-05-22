import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products | 9Ruby",
  description:
    "Digital products, services, free tools, and subscriptions from Nine Ruby. Templates, icon packs, UI kits, starter kits, and more — one ecosystem.",
  openGraph: {
    title: "Products | 9Ruby",
    description:
      "Digital products, services, free tools, and subscriptions from Nine Ruby. Templates, icon packs, UI kits, starter kits, and more — one ecosystem.",
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
