"use client";

import { Check } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const TIERS = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    desc: "Try Ruby agents free",
    features: [
      "3 concurrent agents",
      "1,000 tasks/month",
      "Community support",
      "Basic analytics",
      "Public integrations",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$99",
    period: "/month",
    desc: "Scale your marketing",
    features: [
      "25 concurrent agents",
      "50,000 tasks/month",
      "Priority support",
      "Full audit trails",
      "Private integrations",
      "Team workspaces",
      "Custom agent roles",
    ],
    cta: "Start trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Full-scale operations",
    features: [
      "Unlimited agents",
      "Unlimited tasks",
      "24/7 dedicated support",
      "On-premise deployment",
      "SLA guarantee",
      "Custom model routing",
      "Advanced security",
      "Dedicated compute",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "oklch(0.09 0.01 260)" }}
    >
      {/* CTA creature/whale background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none opacity-50">
        <img
          src="/images/original/cta-creature.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain object-bottom-right"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[oklch(0.09_0.01_260)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[oklch(0.09_0.01_260)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-3 text-sm font-[family-name:var(--font-jetbrains-mono)] text-white/25 mb-8">
              <span className="w-12 h-px bg-white/20" />
              Pricing
              <span lang="ar" dir="rtl" className="text-white/20 text-xs">الأسعار</span>
              <span className="w-12 h-px bg-white/20" />
            </span>
            <h2 className="text-6xl md:text-7xl lg:text-[96px] font-[family-name:var(--font-instrument-serif)] tracking-tight leading-[0.9]">
              Pay for <span className="text-white/40">results.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-4">
          {TIERS.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 100}>
              <div
                className={`relative p-8 lg:p-10 border transition-all duration-500 h-full flex flex-col ${
                  tier.highlight
                    ? "border-[#C41A3B]/50 bg-[#C41A3B]/5"
                    : "border-white/10 bg-black"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-8 px-3 py-1 text-xs font-[family-name:var(--font-jetbrains-mono)] bg-[#C41A3B] text-white">
                    Most Popular
                  </span>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-[family-name:var(--font-instrument-serif)] mb-2">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-[family-name:var(--font-instrument-serif)]">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-white/25 text-sm">{tier.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/25">{tier.desc}</p>
                </div>

                <div className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-white/30 shrink-0" />
                      <span className="text-sm text-white/50">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                    tier.highlight
                      ? "bg-[#C41A3B] hover:bg-[#C41A3B]/80 text-white"
                      : "border border-white/20 hover:border-white/40 text-white"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Feature tags */}
        <ScrollReveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {["Encrypted execution", "Full audit logs", "Multi-model routing"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-xs font-[family-name:var(--font-jetbrains-mono)] border border-white/10 text-white/25"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
