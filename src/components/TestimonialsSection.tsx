"use client";

import { ScrollReveal } from "./ScrollReveal";

export function TestimonialsSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#f5f2ed] text-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <span className="inline-flex items-center gap-3 text-sm font-[family-name:var(--font-jetbrains-mono)] text-black/30 mb-8">
            <span className="w-12 h-px bg-black/20" />
            Testimonials
            <span lang="ar" dir="rtl" className="text-black/20 text-xs">ثقة العملاء</span>
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-instrument-serif)] tracking-tight leading-[0.9] mb-16">
            Trusted by teams{" "}
            <span className="text-black/30">worldwide.</span>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
          <ScrollReveal>
            <blockquote className="text-3xl md:text-4xl lg:text-[42px] font-[family-name:var(--font-instrument-serif)] leading-[1.2] text-black/80 mb-10">
              Our agents handle 80% of our customer support tickets
              autonomously. The ROI was immediate.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                <span className="text-sm font-medium text-black/40">SC</span>
              </div>
              <div>
                <span className="text-sm font-medium block">Sarah Chen</span>
                <span className="text-xs text-black/40">CTO, Meridian Labs</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="p-10 border border-black/10 bg-white min-w-[200px] text-center">
              <span className="text-6xl lg:text-7xl font-[family-name:var(--font-instrument-serif)] block">
                80%
              </span>
              <span className="text-sm text-black/40 font-[family-name:var(--font-jetbrains-mono)] mt-2 block">
                Ticket resolution
              </span>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-16 flex flex-wrap items-center gap-3">
            {["Meridian Labs", "Flux Systems", "Beacon AI", "Prism Analytics"].map(
              (company) => (
                <span
                  key={company}
                  className="px-4 py-2 text-xs font-[family-name:var(--font-jetbrains-mono)] border border-black/10 text-black/40"
                >
                  {company}
                </span>
              )
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
