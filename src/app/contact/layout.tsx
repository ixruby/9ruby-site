import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | 9Ruby",
  description: "Get in touch with 9Ruby — AI agents, websites, and automation.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
