import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | 9Ruby",
  description:
    "How IX Ruby Agency collects, uses, and protects your personal information. Read our full privacy policy.",
  openGraph: {
    title: "Privacy Policy | 9Ruby",
    description:
      "How IX Ruby Agency collects, uses, and protects your personal information. Read our full privacy policy.",
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
