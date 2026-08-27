"use client";

import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "Brief",
    subtitle: "your vision",
    desc: "Tell us what you need. Set goals, define your audience, and describe your brand voice in natural language — or let Ruby analyze it for you.",
  },
  {
    num: "02",
    title: "Deploy",
    subtitle: "agents",
    desc: "Ruby assembles a team of specialized AI agents — strategist, copywriter, designer, analyst — each handling their domain autonomously.",
  },
  {
    num: "03",
    title: "Scale",
    subtitle: "& optimize",
    desc: "Watch results in real-time. Ruby's agents continuously optimize, A/B test, and scale what works. You only pay for results.",
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "oklch(0.09 0.01 260)" }}
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative mb-0 lg:mb-0 grid lg:grid-cols-2 gap-4 lg:gap-12 items-end">
          <div className="overflow-hidden pb-0 lg:pb-32">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-sm font-[family-name:var(--font-jetbrains-mono)] text-white/25 mb-8">
                <span className="w-12 h-px bg-white/20" />
                Process
                <span lang="ar" dir="rtl" className="text-white/20 text-xs">منهج العمل</span>
              </span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-6xl md:text-7xl lg:text-[128px] font-[family-name:var(--font-instrument-serif)] tracking-tight leading-[0.85]">
                <span className="block">Brief.</span>
                <span className="block text-white/30">Deploy.</span>
                <span className="block text-white/10">Scale.</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <div className="relative h-[320px] lg:h-[640px] overflow-hidden">
              <img
                src="/images/original/bonsai-tree.png"
                alt=""
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-full h-full object-contain object-bottom"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.09 0.01 260), transparent, transparent)",
                }}
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <button
              key={step.num}
              type="button"
              onClick={() => setActiveStep(i)}
              className={`relative text-left p-8 lg:p-12 border transition-all duration-500 bg-black ${
                activeStep === i
                  ? "border-white/60"
                  : "border-white/20 hover:border-white/50"
              }`}
            >
              <div className="flex items-center gap-4 mb-8">
                <span
                  className={`text-4xl font-[family-name:var(--font-instrument-serif)] transition-colors duration-300 ${
                    activeStep === i ? "text-[#C41A3B]" : "text-white/25"
                  }`}
                >
                  {step.num}
                </span>
                <div className="flex-1 h-px bg-white/10 overflow-hidden">
                  {activeStep === i && (
                    <div className="h-full bg-[#C41A3B]/50 animate-progress" />
                  )}
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-[family-name:var(--font-instrument-serif)] mb-2">
                {step.title}
              </h3>
              <span className="text-xl text-white/25 font-[family-name:var(--font-instrument-serif)] block mb-6">
                {step.subtitle}
              </span>
              <p
                className={`text-white/50 leading-relaxed transition-opacity duration-300 ${
                  activeStep === i ? "opacity-100" : "opacity-60"
                }`}
              >
                {step.desc}
              </p>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-[#C41A3B] transition-transform duration-500 origin-left ${
                  activeStep === i ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
