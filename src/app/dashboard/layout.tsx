import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | 9Ruby",
  description: "9Ruby CEO Command Center. Monitor revenue, projects, agents, and system health in one place.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Dashboard | 9Ruby",
    description: "9Ruby CEO Command Center. Monitor revenue, projects, agents, and system health in one place.",
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
