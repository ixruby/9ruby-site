import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers | 9Ruby",
  description:
    "Join IX Ruby Agency. We're hiring engineers, designers, and marketers to build the future of AI-powered agencies. Remote-first, async, AI-augmented.",
  openGraph: {
    title: "Careers | 9Ruby",
    description:
      "Join IX Ruby Agency. We're hiring engineers, designers, and marketers to build the future of AI-powered agencies. Remote-first, async, AI-augmented.",
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
