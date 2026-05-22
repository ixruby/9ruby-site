import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Directory | 9Ruby",
  description:
    "Discover 211 open-source tools curated by 9Ruby. Developer utilities, AI frameworks, design systems, infrastructure, and more — all free and community-driven.",
  openGraph: {
    title: "Directory | 9Ruby",
    description:
      "Discover 211 open-source tools curated by 9Ruby. Developer utilities, AI frameworks, design systems, infrastructure, and more — all free and community-driven.",
  },
}

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
