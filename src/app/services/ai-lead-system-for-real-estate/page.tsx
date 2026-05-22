import type { Metadata } from "next"
import NicheRevenuePage from "@/components/NicheRevenuePage"

export const metadata: Metadata = {
  title: "AI Lead System for Real Estate | 9Ruby",
  description: "Capture buyer, seller, and rental leads with a focused real-estate landing page and AI-assisted follow-up system.",
}

export default function RealEstateLeadSystemPage() {
  return (
    <NicheRevenuePage
      eyebrow="Agents, brokers, teams, property marketers"
      title="AI LEAD SYSTEM FOR REAL ESTATE"
      audience="Real Estate"
      slug="ai-lead-system-for-real-estate"
      subtitle="Convert property visitors and social traffic into qualified buyer, seller, rental, or valuation conversations instead of losing them to slow follow-up."
      offer="$49 audit → $499 landing page → $750 follow-up automation"
      pains={[
        "Listings get attention but visitors are not pushed into a clear next step.",
        "Buyer/seller intent is not qualified before the first conversation.",
        "Social traffic often lands on generic pages instead of focused property or valuation pages.",
        "Follow-up depends on manual memory instead of a repeatable pipeline.",
      ]}
      system={[
        "Landing page for one property, area, buyer segment, or seller valuation offer.",
        "Lead form that captures budget, timeline, property type, and urgency.",
        "AI follow-up scripts for buyers, sellers, and rental inquiries.",
        "Simple CRM-style sheet with status, next action, and lead source.",
      ]}
      automation="CAPTURE INTENT BEFORE THE LEAD GOES COLD."
    />
  )
}
