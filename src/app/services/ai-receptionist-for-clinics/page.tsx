import type { Metadata } from "next"
import NicheRevenuePage from "@/components/NicheRevenuePage"

export const metadata: Metadata = {
  title: "AI Receptionist for Clinics | 9Ruby",
  description: "Capture clinic leads, qualify patient inquiries, and speed up appointment follow-up with a 9Ruby AI receptionist system.",
}

export default function ClinicAiReceptionistPage() {
  return (
    <NicheRevenuePage
      eyebrow="Clinics, med spas, dentists, wellness practices"
      title="AI RECEPTIONIST FOR CLINICS"
      audience="Clinics"
      slug="ai-receptionist-for-clinics"
      subtitle="Turn missed calls, slow replies, and confusing booking flows into a simple AI-assisted intake and follow-up system for patient inquiries."
      offer="$49 audit → $750 lead capture → $1,500 receptionist sprint"
      pains={[
        "Patients visit the site but do not find the right booking path fast enough.",
        "Calls, WhatsApp messages, and forms are not captured in one clean pipeline.",
        "Staff answer repeated questions manually while high-intent leads wait.",
        "No automated follow-up exists for people who ask but do not book.",
      ]}
      system={[
        "Clear treatment/service landing page with one booking CTA.",
        "AI-assisted intake questions that qualify the inquiry before staff time is used.",
        "Lead logging with source, treatment interest, urgency, and next action.",
        "Auto-reply scripts for email/WhatsApp and handoff notes for staff.",
      ]}
      automation="REPLY FASTER. BOOK MORE CONSULTS. REDUCE FRONT-DESK LOAD."
    />
  )
}
