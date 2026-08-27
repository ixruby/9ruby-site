"use client";

import { ScrollReveal } from "./ScrollReveal";

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="relative mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-sm font-[family-name:var(--font-jetbrains-mono)] text-white/25 mb-6">
                <span className="w-12 h-px bg-white/30" />
                Services
                <span lang="ar" dir="rtl" className="text-white/20 text-xs">خدمات</span>
              </span>
              <ScrollReveal>
                <h2 className="text-6xl md:text-7xl lg:text-[128px] font-[family-name:var(--font-instrument-serif)] tracking-tight leading-[0.9]">
                  Intelligent
                  <br />
                  <span className="text-white/40">agents.</span>
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <ScrollReveal delay={200}>
                <p className="text-xl text-white/50 leading-relaxed">
                  Deploy autonomous AI agents that plan, create, and scale your
                  marketing across every channel. No supervision required.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Feature card */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
            <div className="lg:col-span-12 relative bg-black border border-white/10 min-h-[500px] overflow-hidden group flex">
              <div className="relative flex-1 p-8 lg:p-12 bg-black">
                <div className="relative z-10">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-white/25">
                    01
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-[family-name:var(--font-instrument-serif)] mt-4 mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    Autonomous Execution
                  </h3>
                  <p className="text-lg text-white/50 leading-relaxed max-w-md mb-8">
                    Deploy AI agents that work independently. They analyze your
                    brand, decide strategy, and execute complex multi-channel
                    campaigns without human intervention.
                  </p>
                  <div>
                    <span className="text-5xl lg:text-6xl font-[family-name:var(--font-instrument-serif)]">
                      99.7%
                    </span>
                    <span className="block text-sm text-white/25 font-[family-name:var(--font-jetbrains-mono)] mt-2">
                      task completion
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  style={{ transform: "scaleX(-1)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {[
            {
              num: "02",
              title: "Content Creation",
              desc: "AI-generated copy, visuals, and video at scale. Every piece optimized for engagement and conversion.",
              metric: "10x",
              metricLabel: "content velocity",
            },
            {
              num: "03",
              title: "Campaign Intelligence",
              desc: "Real-time analytics and autonomous optimization. Your campaigns learn and improve every hour.",
              metric: "3.2x",
              metricLabel: "average ROAS",
            },
            {
              num: "04",
              title: "Brand Strategy",
              desc: "AI-driven market analysis, competitor tracking, and positioning. Strategy that evolves with the market.",
              metric: "24/7",
              metricLabel: "market monitoring",
            },
          ].map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 100}>
              <div className="relative p-8 lg:p-10 border border-white/10 bg-black hover:border-white/25 transition-all duration-500 group h-full">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-white/25 group-hover:text-[#C41A3B]/60 transition-colors">
                  {service.num}
                </span>
                <h3 className="text-2xl font-[family-name:var(--font-instrument-serif)] mt-4 mb-4 group-hover:translate-x-1 transition-transform duration-500">
                  {service.title}
                </h3>
                <p className="text-white/50 leading-relaxed mb-6">
                  {service.desc}
                </p>
                <div>
                  <span className="text-3xl font-[family-name:var(--font-instrument-serif)]">
                    {service.metric}
                  </span>
                  <span className="block text-xs text-white/25 font-[family-name:var(--font-jetbrains-mono)] mt-1">
                    {service.metricLabel}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
