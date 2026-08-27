"use client";

import { useEffect, useState } from "react";

const HERO_WORD = "automate";
const COLORS = [
  "#C41A3B", "#eca8d6", "#c597eb", "#9e98fa",
  "#79cdf9", "#91dcbc", "#C41A3B", "#eca8d6",
];

export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [lettersVisible, setLettersVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
    setTimeout(() => setLettersVisible(true), 800);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-black">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-80"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/10"
            style={{ top: `${((i + 1) * 12.5)}%`, left: 0, right: 0 }}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/10"
            style={{ left: `${((i + 1) * 8.33)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="lg:max-w-[55%]">
          <div
            className={`mb-8 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-[family-name:var(--font-jetbrains-mono)] text-white/25">
              <span className="w-8 h-px bg-white/30" />
              AI-powered marketing agency that never sleeps
              <span lang="ar" dir="rtl" className="text-white/20 font-[family-name:var(--font-noto-kufi)] text-xs">
                نقطة البداية
              </span>
            </span>
          </div>

          <div className="mb-12">
            <h1
              className={`text-left text-[clamp(2rem,6vw,7rem)] font-[family-name:var(--font-instrument-serif)] leading-[0.92] tracking-tight text-white transition-all duration-1000 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block whitespace-nowrap">Nine is final,</span>
              <span className="block whitespace-nowrap">
                agents that{" "}
                <span className="relative inline-block">
                  {HERO_WORD.split("").map((letter, i) => (
                    <span
                      key={i}
                      className="inline-block transition-all duration-500"
                      style={{
                        opacity: lettersVisible ? 1 : 0,
                        filter: lettersVisible ? "blur(0px)" : "blur(20px)",
                        color: COLORS[i % COLORS.length],
                        transitionDelay: `${i * 80}ms`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom metrics */}
      <div
        className={`absolute bottom-12 left-0 right-0 px-6 lg:px-12 transition-all duration-700 delay-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-start gap-10 lg:gap-20">
          <div className="flex flex-col gap-2">
            <span className="text-3xl lg:text-4xl font-[family-name:var(--font-instrument-serif)] text-white">
              352+
            </span>
            <span className="text-xs text-white/25 leading-tight">
              AI models deployed
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-3xl lg:text-4xl font-[family-name:var(--font-instrument-serif)] text-white">
              99.9%
            </span>
            <span className="text-xs text-white/25 leading-tight">
              campaign uptime
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-3xl lg:text-4xl font-[family-name:var(--font-instrument-serif)] text-white">
              &lt;2min
            </span>
            <span className="text-xs text-white/25 leading-tight">
              agent deployment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
