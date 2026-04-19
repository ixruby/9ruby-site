import type { Metadata } from "next"
import { Mail, MessageSquare, MapPin, Clock, ArrowRight, Phone, Globe } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageHeader from "@/components/PageHeader"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "Contact | 9Ruby",
  description:
    "Get in touch with the 9Ruby team. Request a quote, ask questions, or schedule a demo.",
  openGraph: {
    title: "Contact | 9Ruby",
    description:
      "Get in touch with the 9Ruby team. Request a quote, ask questions, or schedule a demo.",
  },
}

export default function ContactPage() {
  return (
    <main id="main-content" className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Contact" }]} />

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="relative max-w-[1200px] mx-auto px-6">
          <PageHeader
            tag="Contact"
            title="Let's build"
            highlight="something great."
            description="Whether you need a quote, have a question, or want to explore a partnership — we'd love to hear from you."
          />

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Contact form */}
            <div className="lg:col-span-3 p-8 lg:p-10 rounded-2xl bg-white" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
              <h2 className="text-2xl font-semibold tracking-tight mb-2" style={{ color: "var(--ink-strong)" }}>
                Send us a message
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--ink-soft)" }}>
                Fill out the form and we will get back to you within 24 hours.
              </p>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm mb-2 font-medium" style={{ color: "var(--ink-muted)" }}>Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full h-11 px-4 rounded-xl bg-white text-sm focus:outline-none transition-all"
                      style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-strong)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 font-medium" style={{ color: "var(--ink-muted)" }}>Email</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full h-11 px-4 rounded-xl bg-white text-sm focus:outline-none transition-all"
                      style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-strong)" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: "var(--ink-muted)" }}>Company</label>
                  <input
                    type="text"
                    placeholder="Your company (optional)"
                    className="w-full h-11 px-4 rounded-xl bg-white text-sm focus:outline-none transition-all"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-strong)" }}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: "var(--ink-muted)" }}>What do you need?</label>
                  <select
                    className="w-full h-11 px-4 rounded-xl bg-white text-sm focus:outline-none transition-all appearance-none cursor-pointer"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-muted)" }}
                  >
                    <option value="">Select a service</option>
                    <option value="chatbots">AI Chatbots & Agents</option>
                    <option value="website">Website Design & Development</option>
                    <option value="seo">SEO & Growth</option>
                    <option value="social">Social Media Management</option>
                    <option value="email">Email Marketing</option>
                    <option value="software">Custom Software</option>
                    <option value="mobile">Mobile Apps</option>
                    <option value="brand">Brand Design</option>
                    <option value="video">Video Production</option>
                    <option value="other">Other / Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: "var(--ink-muted)" }}>Budget range</label>
                  <select
                    className="w-full h-11 px-4 rounded-xl bg-white text-sm focus:outline-none transition-all appearance-none cursor-pointer"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-muted)" }}
                  >
                    <option value="">Select budget range</option>
                    <option value="1k">Under $1,000</option>
                    <option value="5k">$1,000 - $5,000</option>
                    <option value="10k">$5,000 - $10,000</option>
                    <option value="25k">$10,000 - $25,000</option>
                    <option value="50k">$25,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: "var(--ink-muted)" }}>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-white text-sm focus:outline-none transition-all resize-none"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--ink-strong)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#1A1A1A] rounded-full px-7 h-10 text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all inline-flex items-center gap-2"
                  style={{ color: "#F8F7F4" }}
                >
                  Send message <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all group"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: "var(--ink-strong)" }}>WhatsApp</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--ink-muted)" }}>Chat with us directly. Usually reply within minutes.</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@9ruby.com"
                className="flex items-start gap-4 p-5 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all group"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <Mail size={16} className="group-hover:text-[#8B6B3D] transition-colors" style={{ color: "var(--ink-muted)" }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: "var(--ink-strong)" }}>Email</h3>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>hello@9ruby.com</p>
                  <p className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>Reply within 24 hours</p>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <Phone size={16} style={{ color: "var(--ink-muted)" }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: "var(--ink-strong)" }}>Phone</h3>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>Enterprise clients only</p>
                  <p className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>Schedule via form</p>
                </div>
              </div>

              {/* 9Ruby AI */}
              <a
                href="https://ai.9ruby.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all group"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <Globe size={16} className="group-hover:text-[#8B6B3D] transition-colors" style={{ color: "var(--ink-muted)" }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: "var(--ink-strong)" }}>9Ruby AI</h3>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>Chat with our AI assistant for instant answers.</p>
                </div>
              </a>

              {/* Hours */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <Clock size={16} style={{ color: "var(--ink-muted)" }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: "var(--ink-strong)" }}>Hours</h3>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>Humans: Mon-Fri, 9am-6pm IST</p>
                  <p className="text-xs text-[#8B6B3D]/60 mt-0.5">AI Agents: 24/7/365</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <MapPin size={16} style={{ color: "var(--ink-muted)" }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: "var(--ink-strong)" }}>Location</h3>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>Remote-first. Global delivery.</p>
                  <p className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>Based in India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
