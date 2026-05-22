import type { Metadata } from "next"
import NicheRevenuePage from "@/components/NicheRevenuePage"

export const metadata: Metadata = {
  title: "Website Conversion System for Local Services | 9Ruby",
  description: "Help roofers, HVAC, repair, cleaning, and local service businesses turn website visitors into calls and quote requests.",
}

export default function LocalServicesConversionPage() {
  return (
    <NicheRevenuePage
      eyebrow="Roofing, HVAC, repair, cleaning, contractors"
      title="WEBSITE CONVERSION FOR LOCAL SERVICES"
      audience="Local Services"
      slug="website-conversion-system-for-local-services"
      subtitle="Make the website explain the service, build trust fast, and turn mobile visitors into calls, quote requests, and booked jobs."
      offer="$49 audit → $149 homepage fix → $499-$999 implementation sprint"
      pains={[
        "Phone number, quote CTA, and service area proof are not obvious on mobile.",
        "The homepage describes the company but does not sell the outcome quickly.",
        "Reviews, emergency availability, guarantees, and service pages are buried.",
        "Quote requests are not automatically confirmed, tagged, and followed up.",
      ]}
      system={[
        "Homepage and service-page copy focused on calls and quote requests.",
        "Mobile-first CTA structure with call, quote, and service-area proof.",
        "Lead form and auto-reply that confirms the request immediately.",
        "Local SEO quick wins for service/location pages and trust signals.",
      ]}
      automation="TURN MORE LOCAL VISITORS INTO QUOTE REQUESTS."
    />
  )
}
