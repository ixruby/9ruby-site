"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll("[data-reveal]")
    children.forEach((child) => {
      const el = child as HTMLElement
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      const delay = Number(child.getAttribute("data-reveal-delay") || 0)
      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, delay)
    })
  }, [])

  return ref
}

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
  const revealRef = useScrollReveal()

  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div ref={revealRef} className="relative max-w-[700px] mx-auto px-6">
          {/* Hero */}
          <div className="mb-16" data-reveal>
            <div className="inline-flex items-center gap-2 mb-8">
              <span
                className="text-[11px] font-semibold tracking-[0.12em] uppercase"
                style={{ color: "#8B6B3D" }}
              >
                Legal
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-[0.9] mb-6"
              style={{ color: "var(--ink-strong)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
              Last updated: April 2026
            </p>
          </div>

          {/* Intro */}
          <div className="mb-12" data-reveal>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
              IX Ruby Agency (&quot;9Ruby&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the
              9Ruby platform, including the website at home.9ruby.com, the AI platform at
              ai.9ruby.com, and all related services. This policy describes how we collect,
              use, store, and protect your personal information.
            </p>
          </div>

          {/* Table of contents */}
          <div
            className="mb-14 p-6 rounded-2xl bg-white"
            style={{ border: "1px solid rgba(0,0,0,0.04)" }}
            data-reveal
          >
            <h2
              className="text-sm font-semibold mb-4"
              style={{ color: "var(--ink-strong)" }}
            >
              Contents
            </h2>
            <ol className="space-y-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[13px] hover:underline transition-colors"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Policy sections */}
          <div className="space-y-14">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} data-reveal>
                <h2
                  className="text-2xl font-serif italic tracking-tight mb-6"
                  style={{ color: "var(--ink-strong)" }}
                >
                  {i + 1}. {s.title}
                </h2>
                <div className="space-y-4">
                  {s.content.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-[15px] leading-relaxed"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center" data-reveal>
            <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
              Questions about your data? We&apos;re happy to help.
            </p>
            <Link
              href="/contact"
              className="bg-[#1A1A1A] rounded-full px-7 h-10 text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all inline-flex items-center gap-2"
              style={{ color: "#F8F7F4" }}
            >
              Contact us <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
