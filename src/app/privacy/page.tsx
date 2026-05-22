"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      "We collect information you provide directly when you create an account, subscribe to a plan, submit a contact form, or communicate with us. This includes your name, email address, company name, billing information, and any other details you choose to share.",
      "We also collect information automatically when you use our platform, including your IP address, browser type, operating system, referring URLs, pages visited, and timestamps. Our servers log standard access data to maintain security and improve performance.",
      "When you use our AI agents or API services, we may process the content you submit for analysis or generation. This content is used solely to deliver the requested service and is not used to train our models without your explicit consent.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    content: [
      "We use the information we collect to provide, maintain, and improve our services. This includes processing transactions, sending service-related communications, responding to support requests, and personalizing your experience on the platform.",
      "We analyze usage patterns in aggregate to understand how our products are used, identify areas for improvement, and make informed decisions about new features and services. This analysis is performed on anonymized data whenever possible.",
      "We may use your email address to send product updates, security alerts, and occasional marketing communications. You can opt out of marketing emails at any time using the unsubscribe link included in every message.",
    ],
  },
  {
    id: "data-storage",
    title: "Data Storage",
    content: [
      "Your data is stored on secure servers managed by our infrastructure providers, primarily in the United States and the European Union. We use industry-standard encryption for data in transit (TLS 1.3) and at rest (AES-256).",
      "We retain your personal data for as long as your account is active or as needed to provide you services. If you request account deletion, we will remove your personal data within 30 days, except where retention is required by law or for legitimate business purposes such as fraud prevention.",
      "We perform regular backups to prevent data loss and maintain business continuity. Backup data is encrypted and subject to the same access controls as primary data stores.",
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content: [
      "We use third-party services to operate our platform, including cloud infrastructure providers (Vercel, AWS), payment processors (Stripe), analytics tools, and communication platforms. These providers have access to your information only to the extent necessary to perform their services and are bound by contractual obligations to protect your data.",
      "We do not sell your personal information to third parties. We do not share your data with advertisers or data brokers. We may share anonymized, aggregated statistics with partners for industry research or benchmarking purposes.",
      "If you connect third-party services to your 9Ruby account (such as GitHub, Slack, or Supabase), those integrations are governed by the respective third party's privacy policy. We only access the data you explicitly authorize through the integration.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    content: [
      "We use essential cookies to maintain your session, remember your preferences, and ensure the platform functions correctly. These cookies are strictly necessary and cannot be disabled without impairing core functionality.",
      "We use analytics cookies to understand how visitors interact with our website. These cookies collect information in an aggregated, anonymous form. You can opt out of analytics cookies through the cookie consent banner displayed on your first visit.",
      "We do not use third-party advertising cookies or tracking pixels. We do not participate in cross-site tracking or retargeting networks.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: [
      "You have the right to access, correct, or delete your personal data at any time. You can manage most of your data directly through your account settings. For requests that require additional assistance, contact our support team.",
      "If you are located in the European Economic Area, you have additional rights under the GDPR, including the right to data portability, the right to restrict processing, and the right to object to processing based on legitimate interests.",
      "If you are a California resident, you have rights under the CCPA, including the right to know what personal information is collected, the right to request deletion, and the right to opt out of the sale of personal information. As noted above, we do not sell personal information.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    content: [
      "If you have any questions about this privacy policy, your personal data, or our data practices, please contact us at privacy@9ruby.com or through our contact page.",
      "We may update this privacy policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of any material changes by posting the updated policy on this page and updating the \"Last updated\" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />

      {/* HERO */}
      <section style={{ background: "#000" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Legal</p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(48px,9vw,100px)", color: "#fff", marginBottom: 24 }}>
            PRIVACY<br />POLICY
          </h1>
          <p style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>
            Last updated: April 2026
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr]" style={{ border: BORDER }}>

            {/* Sidebar TOC */}
            <div className="p-8" style={{ borderRight: BORDER, borderBottom: BORDER }}>
              <p style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Contents</p>
              <ol className="flex flex-col gap-3">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.44)", textDecoration: "none", display: "block", lineHeight: 1.4 }}
                      className="hover:text-white transition-colors"
                    >
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <p style={{ fontFamily: NV, fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", marginBottom: 48, maxWidth: 640 }}>
                IX Ruby Agency (&quot;9Ruby&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the 9Ruby platform, including the website at home.9ruby.com, the AI platform at ai.9ruby.com, and all related services. This policy describes how we collect, use, store, and protect your personal information.
              </p>

              <div className="flex flex-col gap-14">
                {sections.map((s, i) => (
                  <div key={s.id} id={s.id} style={{ paddingBottom: 56, borderBottom: BORDER }}>
                    <p style={{ fontFamily: NV, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.055em", lineHeight: 0.93, fontSize: "clamp(20px,2.5vw,28px)", color: "#fff", marginBottom: 20 }}>
                      {s.title}
                    </h2>
                    <div className="flex flex-col gap-4">
                      {s.content.map((paragraph, j) => (
                        <p key={j} style={{ fontFamily: NV, fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", maxWidth: 640 }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 text-center">
                <p style={{ fontFamily: NV, fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>
                  Questions about your data?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ fontFamily: NV, fontWeight: 800, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "#fff", color: "#080808", padding: "11px 26px", textDecoration: "none" }}
                >
                  Contact Us <ArrowRight size={11} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
