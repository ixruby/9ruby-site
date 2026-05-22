import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import RevenueScoreForm from "@/components/RevenueScoreForm"

export const metadata: Metadata = {
  title: "Free Website Revenue Score | 9Ruby",
  description: "Score your website's ability to turn visitors into leads, then get quick fixes and an AI automation opportunity from 9Ruby.",
}

const BORDER = "0.8px solid rgba(255,255,255,0.14)"

export default function RevenueScorePage() {
  return (
    <main style={{ background: "#080808", minHeight: "100vh" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Website Revenue Score" }]} />
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ borderBottom: BORDER }}>
        <div className="mx-auto max-w-[1240px]">
          <p className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-white/45">Free website revenue score</p>
          <h1 className="max-w-[980px] text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.86] text-white">
            IS YOUR WEBSITE LOSING CLIENTS?
          </h1>
          <p className="mt-7 max-w-[720px] text-lg leading-8 text-white/65">
            Get a fast score for your website&apos;s lead-generation power. The result gives likely leaks, quick wins, and one AI automation opportunity — then routes serious fixes into the $49 audit.
          </p>
        </div>
      </section>
      <section className="px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1240px]">
          <RevenueScoreForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
