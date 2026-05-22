"use client"

import React, { useState } from "react"
import { Mail, MessageSquare, MapPin, Clock, Phone, Globe, Plus, Minus, ExternalLink } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import RevenueAuditOffer from "@/components/RevenueAuditOffer"
import ContactForm from "@/components/ContactForm"
import ArabicAccent from "@/components/ArabicAccent"

const NV = "var(--font-sora), var(--font-geist-sans), system-ui, sans-serif"
const BORDER = "0.8px solid rgba(255,255,255,0.12)"

const contactFaqs = [
  {
    q: "What's the fastest way to get a quote?",
    a: "Fill out the form above with your service type and budget. We respond within 24 hours with a preliminary quote and project scope.",
  },
  {
    q: "Do you take on small projects or one-off requests?",
    a: "Yes — we have Starter tier options starting under $1,000 for landing pages, AI chatbot setups, and template deployments.",
  },
  {
    q: "Can I book a call before submitting a brief?",
    a: "Absolutely. Select 'Other / Custom' in the service field and mention in the message that you'd like a discovery call. We'll send a calendar link.",
  },
  {
    q: "What information should I include in my message?",
    a: "Include your goal, timeline, and rough budget. The more context you give us, the faster and more accurate our response will be.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. For enterprise inquiries or sensitive projects, we're happy to sign an NDA before we discuss scope. Just mention it in your message.",
  },
  {
    q: "Can I WhatsApp instead of using the form?",
    a: "Yes — click the WhatsApp link in the contact panel on this page. We reply within minutes during business hours.",
  },
]

const socials = [
  { label: "Twitter / X", href: "https://twitter.com/9ruby" },
  { label: "LinkedIn", href: "https://linkedin.com/company/9ruby" },
  { label: "Instagram", href: "https://instagram.com/9ruby" },
  { label: "YouTube", href: "https://youtube.com/@9ruby" },
]

const contactItems = [
  { icon: <MessageSquare size={16} />, label: "WhatsApp", value: "Chat directly. Reply in minutes.", href: "https://wa.me/1234567890", accent: "#25D366" },
  { icon: <Mail size={16} />, label: "Email", value: "hello@9ruby.com", sub: "Reply within 24 hours", href: "mailto:hello@9ruby.com" },
  { icon: <Globe size={16} />, label: "9Ruby AI", value: "Chat for instant answers.", href: "https://ai.9ruby.com" },
  { icon: <Phone size={16} />, label: "Phone", value: "Enterprise clients only", sub: "Schedule via form" },
  { icon: <Clock size={16} />, label: "Hours", value: "Humans: Mon-Fri, 9am-6pm GST", sub: "AI Agents: 24/7/365" },
  { icon: <MapPin size={16} />, label: "Location", value: "Remote-first. Global delivery.", sub: "Based in Dubai, UAE" },
]

function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-16 md:py-20" style={{ borderTop: BORDER }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
          <div>
            <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }} className="arabic-row">* Before you send <ArabicAccent>قبل الإرسال</ArabicAccent></p>
            <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(28px,4vw,44px)", color: "#fff", marginBottom: 16 }}>
              QUICK<br />ANSWERS
            </h2>
            <p style={{ fontFamily: NV, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.44)" }}>
              Most questions are answered here. Still unsure? Just message us.
            </p>
          </div>
          <div style={{ border: BORDER }}>
            {contactFaqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < contactFaqs.length - 1 ? BORDER : undefined }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left flex items-start justify-between gap-6 hover:bg-white/[0.02] transition-colors"
                  style={{ padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <span style={{ fontFamily: NV, fontWeight: 800, fontSize: 14, color: "#fff", lineHeight: 1.4, flex: 1 }}>{faq.q}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0, marginTop: 2 }}>
                    {open === i ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 24px 18px", fontFamily: NV, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <main id="main-content" style={{ background: "#000", minHeight: "100vh", fontFamily: NV }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Contact" }]} />

      {/* HERO */}
      <section style={{ background: "#000" }} className="pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }} className="arabic-row justify-center">Contact <ArabicAccent>تواصل</ArabicAccent></p>
          <h1 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.075em", lineHeight: 0.93, fontSize: "clamp(56px, 10vw, 120px)", color: "#fff", marginBottom: 28 }}>
            LET&apos;S BUILD
          </h1>
          <p style={{ fontFamily: NV, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 520, margin: "0 auto" }}>
            Whether you need a quote, have a question, or want to explore a partnership — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT BODY */}
      <RevenueAuditOffer compact />

      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]" style={{ border: BORDER }}>

            {/* LEFT — FORM */}
            <div className="p-8 md:p-12" style={{ borderRight: BORDER, borderBottom: BORDER }}>
              <p style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>
                Send a Message
              </p>
              <h2 style={{ fontFamily: NV, fontWeight: 950, textTransform: "uppercase", letterSpacing: "-0.06em", lineHeight: 0.93, fontSize: "clamp(28px,4vw,44px)", color: "#fff", marginBottom: 32 }}>
                START A PROJECT
              </h2>

              <ContactForm />
            </div>

            {/* RIGHT — CONTACT INFO */}
            <div className="flex flex-col">
              {contactItems.map((item) => {
                const inner = (
                  <>
                    <div style={{ width: 36, height: 36, border: BORDER, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: item.accent || "#fff" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontFamily: NV, fontSize: 13, color: "#fff", marginBottom: item.sub ? 2 : 0 }}>{item.value}</div>
                      {item.sub && <div style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{item.sub}</div>}
                    </div>
                  </>
                )
                const rowStyle: React.CSSProperties = { display: "flex", gap: 16, padding: "24px 28px", alignItems: "flex-start", borderBottom: BORDER, textDecoration: "none", transition: "background 0.2s" }
                return item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} style={rowStyle} className="contact-row hover:bg-white/[0.03]">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label} style={rowStyle}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FAQ */}
      <ContactFAQ />

      {/* SOCIAL LINKS */}
      <section style={{ borderTop: BORDER, borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <p style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>
              * Find us online
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:bg-white/[0.06] transition-colors"
                  style={{ fontFamily: NV, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: BORDER, color: "rgba(255,255,255,0.55)", padding: "9px 18px", textDecoration: "none" }}
                >
                  <ExternalLink size={11} /> {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* METRICS ROW */}
      <section style={{ borderBottom: BORDER }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {[
              { label: "Response Time", value: "< 24hrs", sub: "Human team" },
              { label: "AI Agents", value: "24/7/365", sub: "Always online" },
                { label: "Global Delivery", value: "Remote-First", sub: "Based in Dubai, UAE" },
            ].map((item, i) => (
              <div key={item.label} className="py-10 px-6 text-center" style={{ borderRight: i < 2 ? BORDER : "none", borderBottom: i < 1 ? BORDER : "none" }}>
                <div style={{ fontFamily: NV, fontWeight: 950, fontSize: "clamp(20px,3.5vw,32px)", color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 6 }}>{item.value}</div>
                <div style={{ fontFamily: NV, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontFamily: NV, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        select option { background: #111; color: #fff; }
      `}</style>
    </main>
  )
}
