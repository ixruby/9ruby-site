"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Breadcrumb from "@/components/Breadcrumb"
import {
  AvatarTree, Jellyfish as JellyfishSVG, FloatingMountain, BioButterfly,
  CoralReef, GlowMushroom, WaterDragon, SpiritSprite,
} from "@/components/avatar"
import {
  Layout, Palette, Smartphone, PenTool,
  TrendingUp, Search, BarChart3, Share2,
  Users, Store, Briefcase,
  Bot, LineChart, Database, FlaskConical,
  Server, Cloud, Shield,
  ArrowRight, Sparkles, ChevronDown, Gem,
} from "lucide-react"

/* ────────────────────────────────────────────────────────────
   DATA -- each layer's products / links
   ──────────────────────────────────────────────────────────── */

const skyLinks = [
  { label: "Templates", href: "/templates", icon: Layout },
  { label: "Icon Packs", href: "/tools", icon: Palette },
  { label: "Academy", href: "#", icon: Sparkles },
]

const createTools = [
  { title: "Website Builder", desc: "Drag-and-drop sites with AI assistance", icon: Layout, href: "/tools" },
  { title: "App Builder", desc: "Ship native & web apps in minutes", icon: Smartphone, href: "/tools" },
  { title: "Design Tools", desc: "AI-powered design studio", icon: PenTool, href: "/products" },
]

const growTools = [
  { title: "Marketing", desc: "Campaigns, email, funnels", icon: TrendingUp, href: "/services" },
  { title: "SEO", desc: "Rank higher with AI audits", icon: Search, href: "/services" },
  { title: "Analytics", desc: "Real-time performance data", icon: BarChart3, href: "/dashboard" },
  { title: "Social Media", desc: "Schedule, post, engage", icon: Share2, href: "/services" },
]

const connectTools = [
  { title: "Community", desc: "Join the Nine Ruby network", icon: Users, href: "#" },
  { title: "Marketplace", desc: "Buy & sell templates, plugins", icon: Store, href: "/templates" },
  { title: "Agency Services", desc: "Full-service done-for-you", icon: Briefcase, href: "/services" },
]

const intelligenceTools = [
  { title: "AI Tools", desc: "Chat, write, code, create", icon: Bot, href: "https://ai.9ruby.com" },
  { title: "Trading Bot", desc: "Algorithmic trading assistant", icon: LineChart, href: "#" },
  { title: "Data Scraping", desc: "Extract & analyze web data", icon: Database, href: "/tools" },
  { title: "Research", desc: "Deep research with citations", icon: FlaskConical, href: "#" },
]

const foundationTools = [
  { title: "Infrastructure", desc: "Edge-deployed, global CDN", icon: Server, href: "#" },
  { title: "DevOps", desc: "CI/CD, monitoring, logs", icon: Cloud, href: "#" },
  { title: "Cloud", desc: "Serverless compute & storage", icon: Cloud, href: "#" },
  { title: "Security", desc: "Zero-trust, encrypted, audited", icon: Shield, href: "#" },
]

/* ────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
   ──────────────────────────────────────────────────────────── */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return { ref, visible }
}

/* ────────────────────────────────────────────────────────────
   PARTICLE FIELD -- refined muted particles
   ──────────────────────────────────────────────────────────── */

function Particles({ count, color }: { count: number; color: string }) {
  const dots = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1.5 + Math.random() * 2,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
    })),
  ).current

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full animate-drift"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${d.size * 2}px ${color}`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   AURORA SHIMMER -- subtle atmospheric glow
   ──────────────────────────────────────────────────────────── */

function AuroraShimmer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div
        className="absolute top-0 left-0 w-full h-[60%]"
        style={{
          background:
            "linear-gradient(135deg, transparent 20%, rgba(100,200,255,0.04) 35%, rgba(120,80,220,0.05) 50%, rgba(196,26,59,0.04) 65%, transparent 80%)",
          backgroundSize: "400% 400%",
          animation: "hero-gradient-shift 12s ease infinite",
        }}
      />
      <div
        className="absolute top-[10%] left-[20%] w-[60%] h-[40%] rounded-full blur-[120px]"
        style={{ background: "rgba(100,180,255,0.03)" }}
      />
      <div
        className="absolute top-[5%] right-[10%] w-[40%] h-[30%] rounded-full blur-[100px]"
        style={{ background: "rgba(160,80,220,0.02)" }}
      />
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   FLOATING ISLANDS (sky layer silhouettes)
   ──────────────────────────────────────────────────────────── */

function FloatingIslands() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-[30%] left-[5%] w-32 h-12 animate-float opacity-10"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.06), transparent 70%)",
          borderRadius: "50% 50% 30% 30%",
          animationDuration: "7s",
        }}
      />
      <div
        className="absolute top-[20%] right-[15%] w-48 h-16 animate-float-slow opacity-[0.07]"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.04), transparent 70%)",
          borderRadius: "40% 60% 30% 40%",
          animationDuration: "9s",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute top-[45%] left-[45%] w-20 h-8 animate-float opacity-[0.05]"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.04), transparent 70%)",
          borderRadius: "50%",
          animationDuration: "11s",
          animationDelay: "4s",
        }}
      />
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   BIOLUMINESCENT MUSHROOMS (forest layer) -- muted
   ──────────────────────────────────────────────────────────── */

function GlowingMushrooms() {
  const shrooms = [
    { left: "8%", bottom: "5%", size: 40, hue: "0,255,120" },
    { left: "22%", bottom: "2%", size: 28, hue: "80,220,180" },
    { left: "75%", bottom: "8%", size: 36, hue: "120,255,200" },
    { left: "90%", bottom: "3%", size: 22, hue: "60,200,140" },
    { left: "55%", bottom: "0%", size: 32, hue: "100,240,160" },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shrooms.map((s, i) => (
        <div
          key={i}
          className="absolute animate-bio-pulse"
          style={{
            left: s.left,
            bottom: s.bottom,
            width: s.size,
            height: s.size * 1.2,
            animationDelay: `${i * 1.2}s`,
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-t-full"
            style={{
              width: s.size,
              height: s.size * 0.6,
              background: `radial-gradient(ellipse at center, rgba(${s.hue},0.15) 0%, rgba(${s.hue},0.03) 70%, transparent 100%)`,
              boxShadow: `0 0 ${s.size}px rgba(${s.hue},0.1), 0 -${s.size / 3}px ${s.size}px rgba(${s.hue},0.05)`,
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: s.size * 0.2,
              height: s.size * 0.6,
              background: `linear-gradient(to top, rgba(${s.hue},0.06), rgba(${s.hue},0.02))`,
              borderRadius: "0 0 2px 2px",
            }}
          />
        </div>
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`spore-${i}`}
          className="absolute rounded-full animate-drift"
          style={{
            left: `${5 + Math.random() * 90}%`,
            bottom: `${Math.random() * 40}%`,
            width: 2 + Math.random() * 2,
            height: 2 + Math.random() * 2,
            background: `radial-gradient(circle, rgba(100,255,180,${0.15 + Math.random() * 0.2}) 0%, transparent 70%)`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   JELLYFISH (deep ocean layer)
   ──────────────────────────────────────────────────────────── */

function JellyfishDecor() {
  const jellies = [
    { left: "12%", top: "20%", size: 60, color: "80,180,255" },
    { left: "70%", top: "35%", size: 45, color: "180,100,255" },
    { left: "40%", top: "55%", size: 55, color: "100,220,255" },
    { left: "85%", top: "15%", size: 35, color: "200,120,255" },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {jellies.map((j, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: j.left,
            top: j.top,
            width: j.size,
            height: j.size * 1.6,
            animationDuration: `${6 + i * 2}s`,
            animationDelay: `${i * 1.5}s`,
          }}
        >
          <div
            className="rounded-t-full"
            style={{
              width: j.size,
              height: j.size * 0.7,
              background: `radial-gradient(ellipse at 40% 30%, rgba(${j.color},0.1) 0%, rgba(${j.color},0.02) 70%, transparent 100%)`,
              boxShadow: `0 0 ${j.size / 2}px rgba(${j.color},0.08)`,
            }}
          />
          {[0.2, 0.4, 0.6, 0.8].map((x) => (
            <div
              key={x}
              className="absolute animate-sway"
              style={{
                left: `${x * 100}%`,
                top: j.size * 0.65,
                width: 1,
                height: j.size * 0.8,
                background: `linear-gradient(to bottom, rgba(${j.color},0.08), transparent)`,
                animationDuration: `${3 + x * 2}s`,
                animationDelay: `${x}s`,
                transformOrigin: "top center",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   CORAL DECORATIONS (deep ocean)
   ──────────────────────────────────────────────────────────── */

function CoralDecor() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
      {[10, 25, 60, 80].map((l, i) => (
        <div
          key={i}
          className="absolute bottom-0 animate-sway"
          style={{
            left: `${l}%`,
            width: 8 + i * 4,
            height: 40 + i * 15,
            background: `linear-gradient(to top, rgba(${i % 2 === 0 ? "255,100,150" : "255,140,80"},0.05), transparent)`,
            borderRadius: "40% 40% 0 0",
            animationDuration: `${5 + i}s`,
            transformOrigin: "bottom center",
          }}
        />
      ))}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   RUBY CRYSTALS (core layer)
   ──────────────────────────────────────────────────────────── */

function RubyCrystals() {
  const crystals = [
    { left: "5%", bottom: "0%", h: 100, w: 20, rot: 8 },
    { left: "15%", bottom: "0%", h: 70, w: 14, rot: -5 },
    { left: "75%", bottom: "0%", h: 90, w: 18, rot: 12 },
    { left: "88%", bottom: "0%", h: 60, w: 12, rot: -8 },
    { left: "40%", bottom: "0%", h: 80, w: 16, rot: 3 },
    { left: "55%", bottom: "0%", h: 65, w: 13, rot: -10 },
    { left: "30%", bottom: "0%", h: 55, w: 11, rot: 6 },
    { left: "95%", bottom: "0%", h: 50, w: 10, rot: -4 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {crystals.map((c, i) => (
        <div
          key={i}
          className="absolute animate-bio-pulse"
          style={{
            left: c.left,
            bottom: c.bottom,
            width: c.w,
            height: c.h,
            transform: `rotate(${c.rot}deg)`,
            animationDelay: `${i * 0.8}s`,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(to top, rgba(196,26,59,0.${10 + i * 2}), rgba(196,26,59,0.02))`,
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              boxShadow: `0 0 20px rgba(196,26,59,0.06)`,
            }}
          />
          <div
            className="absolute top-[20%] left-[30%] w-[40%] h-[50%]"
            style={{
              background: "linear-gradient(to bottom right, rgba(255,255,255,0.04), transparent)",
              clipPath: "polygon(50% 0%, 100% 100%, 0% 80%)",
            }}
          />
        </div>
      ))}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-[#C41A3B]/[0.03] blur-[80px] rounded-full" />
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   VERCEL-STYLE CARD -- clean with subtle themed accents
   ──────────────────────────────────────────────────────────── */

function LayerCard({
  title,
  desc,
  icon: Icon,
  href,
  accentColor = "white",
}: {
  title: string
  desc: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  href: string
  accentColor?: string
}) {
  return (
    <Link
      href={href}
      className="group relative block p-7 border border-white/[0.12] bg-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.08]"
    >
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl border border-white/[0.15] bg-white/[0.08] flex items-center justify-center mb-5 group-hover:border-white/[0.15] transition-colors">
          <Icon size={18} className="text-white/40 group-hover:text-white/70 transition-colors" />
        </div>
        <h3 className="text-[15px] font-semibold tracking-tight text-white mb-1.5">{title}</h3>
        <p className="text-[13px] text-white/40 leading-relaxed">{desc}</p>
      </div>
      <div className="mt-5 flex items-center gap-2 text-[13px] text-white/30 group-hover:text-white/60 group-hover:gap-3 transition-all">
        Explore <ArrowRight size={13} />
      </div>
    </Link>
  )
}

/* ────────────────────────────────────────────────────────────
   RIPPLE CARD -- ocean layer interactive card
   ──────────────────────────────────────────────────────────── */

function RippleCard({
  title,
  desc,
  icon: Icon,
  href,
  delay,
}: {
  title: string
  desc: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  href: string
  delay: number
}) {
  const [ripple, setRipple] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setRipple(true)
    setTimeout(() => setRipple(false), 800)
  }, [])

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      className="group relative block p-7 border border-white/[0.12] bg-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.08]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {ripple && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-white/[0.04]"
          style={{
            animation: "ripple-expand 0.8s ease-out forwards",
          }}
        />
      )}
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl border border-white/[0.15] bg-white/[0.08] flex items-center justify-center mb-5 group-hover:border-white/[0.15] transition-colors">
          <Icon size={18} className="text-white/40 group-hover:text-white/70 transition-colors" />
        </div>
        <h3 className="text-[15px] font-semibold tracking-tight text-white mb-1.5">{title}</h3>
        <p className="text-[13px] text-white/40 leading-relaxed">{desc}</p>
      </div>
    </Link>
  )
}

/* ────────────────────────────────────────────────────────────
   LAYER TRANSITION DIVIDER
   ──────────────────────────────────────────────────────────── */

function LayerTransition({
  fromColor,
  toColor,
}: {
  fromColor: string
  toColor: string
}) {
  return (
    <div className="relative h-32 -mt-16 z-10">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        }}
      />
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   LAYER HEADER -- consistent Vercel typography
   ──────────────────────────────────────────────────────────── */

function LayerHeader({
  layerNum,
  title,
  subtitle,
}: {
  layerNum: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-16">
      <div className="inline-flex items-center gap-3 mb-5">
        <span className="font-mono text-xs text-white/20 tracking-widest uppercase">
          Layer {layerNum}
        </span>
        <span className="w-8 h-px bg-white/[0.08]" />
      </div>
      <h2 className="text-5xl lg:text-6xl font-semibold tracking-tighter mb-4">
        <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">{title}</span>
      </h2>
      <p className="text-white/35 max-w-md text-[15px] leading-relaxed">{subtitle}</p>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */

export default function UniversePage() {
  const sky = useReveal()
  const forest = useReveal()
  const surface = useReveal()
  const ocean = useReveal()
  const deep = useReveal()
  const core = useReveal()

  return (
    <main className="relative overflow-x-hidden" style={{ background: "#F8F7F4" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Universe" }]} />

      {/* Scoped keyframes */}
      <style jsx global>{`
        @keyframes ripple-expand {
          to {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }
        @keyframes scroll-hint {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50%      { transform: translateY(10px); opacity: 0.7; }
        }
        @keyframes water-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes crystal-pulse {
          0%, 100% { opacity: 0.2; }
          50%      { opacity: 0.5; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════
          LAYER 1 -- SKY WORLD
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={sky.ref}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #050510 30%, #080418 60%, #040310 100%)",
        }}
      >
        <AuroraShimmer />
        <FloatingIslands />
        <Particles count={25} color="rgba(140,160,255,0.25)" />

        {/* Avatar creatures -- Sky layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[5%] opacity-20">
            <FloatingMountain width={280} />
          </div>
          <div className="absolute top-[25%] right-[3%] opacity-15">
            <FloatingMountain width={200} />
          </div>
          <div className="absolute top-[20%] left-[30%] opacity-25">
            <BioButterfly size={50} color="gold" />
          </div>
          <div className="absolute top-[35%] right-[25%] opacity-20">
            <BioButterfly size={40} color="purple" />
          </div>
          <div className="absolute top-[12%] left-[60%] opacity-20">
            <BioButterfly size={35} color="cyan" />
          </div>
          <SpiritSprite count={8} size={600} />
        </div>

        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                width: 1 + Math.random() * 1,
                height: 1 + Math.random() * 1,
                background: "white",
                opacity: 0.05 + Math.random() * 0.2,
                animation: `crystal-pulse ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div
          className={`relative z-10 text-center px-6 max-w-4xl transition-all duration-1000 ${
            sky.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="font-mono text-sm text-white/25 mb-8 tracking-wide">
            The Nine Ruby Universe
          </p>

          <h1 className="text-[clamp(2.5rem,7vw,7rem)] font-semibold leading-[0.9] tracking-tighter mb-8">
            <span className="block text-white">Welcome to the</span>
            <span
              className="block bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent"
            >
              Nine Ruby Universe
            </span>
          </h1>

          <p className="text-lg text-white/35 max-w-xl mx-auto mb-12 leading-relaxed">
            An infinite ecosystem of tools, intelligence, and creation.
            Scroll to journey from the sky to the core.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {skyLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.15] bg-white/[0.06] rounded-full text-sm text-white/50 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-200"
              >
                <l.icon size={14} />
                {l.label}
              </Link>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 text-white/20">
            <span className="text-xs font-mono tracking-wide">Scroll to explore</span>
            <ChevronDown size={18} style={{ animation: "scroll-hint 2s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      <LayerTransition fromColor="#040310" toColor="#020804" />

      {/* ═══════════════════════════════════════════════════════
          LAYER 2 -- FOREST WORLD
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={forest.ref}
        className="relative min-h-screen flex items-center overflow-hidden py-24"
        style={{
          background: "linear-gradient(180deg, #020804 0%, #030d06 30%, #041208 60%, #020804 100%)",
        }}
      >
        <GlowingMushrooms />
        <Particles count={18} color="rgba(100,255,180,0.15)" />

        {/* Avatar creatures -- Forest layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-15">
            <AvatarTree height={350} />
          </div>
          <div className="absolute bottom-2 left-[8%] opacity-20">
            <GlowMushroom size={80} />
          </div>
          <div className="absolute bottom-4 left-[30%] opacity-15">
            <GlowMushroom size={55} />
          </div>
          <div className="absolute bottom-0 right-[12%] opacity-25">
            <GlowMushroom size={65} />
          </div>
          <div className="absolute top-[18%] left-[22%] opacity-25">
            <BioButterfly size={45} color="ruby" />
          </div>
          <div className="absolute top-[28%] right-[18%] opacity-20">
            <BioButterfly size={38} color="cyan" />
          </div>
          <SpiritSprite count={12} size={700} />
        </div>

        {/* Canopy light rays */}
        <div className="absolute top-0 left-1/4 w-px h-[60%] opacity-[0.02]" style={{ background: "linear-gradient(to bottom, rgba(100,255,180,0.2), transparent)" }} />
        <div className="absolute top-0 left-[55%] w-px h-[45%] opacity-[0.015]" style={{ background: "linear-gradient(to bottom, rgba(100,255,180,0.15), transparent)" }} />
        <div className="absolute top-0 right-[30%] w-px h-[50%] opacity-[0.02]" style={{ background: "linear-gradient(to bottom, rgba(100,255,180,0.18), transparent)" }} />

        <div
          className={`relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 transition-all duration-1000 ${
            forest.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <LayerHeader layerNum="02" title="Create" subtitle="Build anything. Websites, apps, and designs powered by intelligent tools." />

          <div className="grid md:grid-cols-3 gap-4">
            {createTools.map((t) => (
              <LayerCard key={t.title} {...t} />
            ))}
          </div>
        </div>
      </section>

      <LayerTransition fromColor="#020804" toColor="#050505" />

      {/* ═══════════════════════════════════════════════════════
          LAYER 3 -- SURFACE WORLD
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={surface.ref}
        className="relative min-h-screen flex items-center overflow-hidden py-24"
        style={{
          background: "linear-gradient(180deg, #050505 0%, #0a0908 30%, #0d0b08 50%, #050505 100%)",
        }}
      >
        {/* Mist layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-0 right-0 h-32 bg-white/[0.01] blur-[60px]" />
          <div className="absolute top-[50%] left-0 right-0 h-24 bg-white/[0.008] blur-[80px]" />
          <div className="absolute bottom-[20%] left-0 right-0 h-40 bg-white/[0.012] blur-[100px]" />
        </div>
        <Particles count={12} color="rgba(200,180,140,0.1)" />

        {/* Avatar creatures -- Surface layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[10%] opacity-10">
            <FloatingMountain width={350} />
          </div>
          <div className="absolute top-[15%] left-[25%] opacity-20">
            <BioButterfly size={42} color="ruby" />
          </div>
          <div className="absolute top-[30%] right-[20%] opacity-18">
            <BioButterfly size={36} color="gold" />
          </div>
          <div className="absolute top-[50%] left-[55%] opacity-15">
            <BioButterfly size={30} color="purple" />
          </div>
          <div className="absolute top-[10%] right-[10%] opacity-18">
            <BioButterfly size={38} color="cyan" />
          </div>
        </div>

        <div
          className={`relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 transition-all duration-1000 ${
            surface.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <LayerHeader layerNum="03" title="Grow" subtitle="Marketing, SEO, analytics, and social media tools to scale your reach." />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {growTools.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="group relative block p-6 rounded-2xl border border-white/[0.12] bg-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.08]"
              >
                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-lg border border-white/[0.15] bg-white/[0.08] flex items-center justify-center mb-4 group-hover:border-white/[0.15] transition-colors">
                    <t.icon size={16} className="text-white/35 group-hover:text-white/60 transition-colors" />
                  </div>
                  <h3 className="text-[14px] font-semibold tracking-tight text-white mb-1">{t.title}</h3>
                  <p className="text-[12px] text-white/35 leading-relaxed">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LayerTransition fromColor="#050505" toColor="#020408" />

      {/* ═══════════════════════════════════════════════════════
          LAYER 4 -- OCEAN SURFACE
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={ocean.ref}
        className="relative min-h-screen flex items-center overflow-hidden py-24"
        style={{
          background: "linear-gradient(180deg, #020408 0%, #030810 30%, #040c18 60%, #020408 100%)",
        }}
      >
        {/* Water surface light rays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[15, 35, 55, 75].map((l, i) => (
            <div
              key={i}
              className="absolute top-0 opacity-[0.025]"
              style={{
                left: `${l}%`,
                width: 2,
                height: "70%",
                background: "linear-gradient(to bottom, rgba(100,200,255,0.25), transparent)",
                filter: "blur(3px)",
                transform: `rotate(${-3 + i * 2}deg)`,
                transformOrigin: "top center",
              }}
            />
          ))}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(100,200,255,0.08), transparent, rgba(100,200,255,0.06), transparent)",
              backgroundSize: "200% 100%",
              animation: "water-shimmer 4s linear infinite",
            }}
          />
        </div>
        <Particles count={15} color="rgba(80,180,255,0.15)" />

        {/* Avatar creatures -- Ocean Surface layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[8%] opacity-15">
            <JellyfishSVG size={120} color="cyan" />
          </div>
          <div className="absolute top-[25%] right-[5%] opacity-10">
            <JellyfishSVG size={90} color="purple" />
          </div>
          <SpiritSprite count={6} size={500} />
        </div>

        <div
          className={`relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 transition-all duration-1000 ${
            ocean.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <LayerHeader layerNum="04" title="Connect" subtitle="Community, marketplace, and agency services to bring it all together." />

          <div className="grid md:grid-cols-3 gap-4">
            {connectTools.map((t, i) => (
              <RippleCard key={t.title} {...t} delay={i * 150} />
            ))}
          </div>
        </div>
      </section>

      <LayerTransition fromColor="#020408" toColor="#01020a" />

      {/* ═══════════════════════════════════════════════════════
          LAYER 5 -- DEEP OCEAN
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={deep.ref}
        className="relative min-h-screen flex items-center overflow-hidden py-24"
        style={{
          background: "linear-gradient(180deg, #01020a 0%, #020510 30%, #010408 60%, #010208 100%)",
        }}
      >
        <JellyfishDecor />
        <CoralDecor />
        <Particles count={20} color="rgba(120,80,255,0.15)" />

        {/* Avatar creatures -- Deep Ocean layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-15">
            <CoralReef width={450} />
          </div>
          <div className="absolute top-[10%] right-[12%] opacity-18">
            <JellyfishSVG size={110} color="cyan" />
          </div>
          <div className="absolute top-[25%] left-[10%] opacity-12">
            <JellyfishSVG size={85} color="ruby" />
          </div>
          <div className="absolute top-[40%] right-[30%] opacity-12">
            <JellyfishSVG size={70} color="purple" />
          </div>
          <div className="absolute top-[30%] left-[5%] opacity-12">
            <WaterDragon width={350} />
          </div>
          <SpiritSprite count={10} size={700} />
        </div>

        <div
          className={`relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 transition-all duration-1000 ${
            deep.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <LayerHeader layerNum="05" title="Intelligence" subtitle="AI tools, trading bots, data scraping, and deep research capabilities." />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {intelligenceTools.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="group relative block p-6 rounded-2xl border border-white/[0.12] bg-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.08]"
              >
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl border border-white/[0.15] bg-white/[0.08] flex items-center justify-center mb-5 group-hover:border-white/[0.15] transition-colors">
                    <t.icon size={18} className="text-white/35 group-hover:text-white/60 transition-colors" />
                  </div>
                  <h3 className="text-[14px] font-semibold tracking-tight text-white mb-1.5">{t.title}</h3>
                  <p className="text-[12px] text-white/30 leading-relaxed">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LayerTransition fromColor="#010208" toColor="#050004" />

      {/* ═══════════════════════════════════════════════════════
          LAYER 6 -- CORE
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={core.ref}
        className="relative min-h-screen flex items-center overflow-hidden py-24"
        style={{
          background: "linear-gradient(180deg, #050004 0%, #080006 30%, #0a0008 50%, #050003 100%)",
        }}
      >
        <RubyCrystals />
        <Particles count={15} color="rgba(196,26,59,0.15)" />

        {/* Avatar creatures -- Core layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-[15%] left-[5%] opacity-15">
            <GlowMushroom size={140} />
          </div>
          <div className="absolute bottom-[15%] right-[5%] opacity-15">
            <GlowMushroom size={130} />
          </div>
          <SpiritSprite count={15} size={800} />
        </div>

        {/* Crystalline ambient light */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#C41A3B]/[0.02] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#C41A3B]/[0.015] blur-[100px]" />
        </div>

        <div
          className={`relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 transition-all duration-1000 ${
            core.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <LayerHeader layerNum="06" title="Foundation" subtitle="Infrastructure, DevOps, cloud, and security. The bedrock of everything." />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
            {foundationTools.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="group relative block p-6 rounded-2xl border border-white/[0.12] bg-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.08]"
              >
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl border border-white/[0.15] bg-white/[0.08] flex items-center justify-center mb-5 group-hover:border-white/[0.15] transition-colors">
                    <t.icon size={18} className="text-white/35 group-hover:text-white/60 transition-colors" />
                  </div>
                  <h3 className="text-[14px] font-semibold tracking-tight text-white mb-1.5">{t.title}</h3>
                  <p className="text-[12px] text-white/30 leading-relaxed">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* ── FINAL CTA ── */}
          <div className="relative text-center py-24">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-[#C41A3B]/[0.03] blur-[80px]" />
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-8 rounded-2xl bg-white/[0.04] border border-white/[0.15] flex items-center justify-center">
                <span className="text-xl font-semibold text-white/70">9</span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-semibold tracking-tighter mb-4">
                <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                  You&apos;ve reached the core.
                </span>
              </h3>
              <p className="text-white/35 max-w-md mx-auto mb-10 leading-relaxed text-[15px]">
                The Nine Ruby Universe awaits. Every layer, every tool, every intelligence -- built for you.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="https://ai.9ruby.com"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#C41A3B] text-white font-medium rounded-full text-sm transition-colors duration-200 hover:bg-[#d42145]"
                >
                  Start Building <ArrowRight size={15} />
                </Link>
                <Link
                  href="/ecosystem"
                  className="inline-flex items-center gap-2 px-7 py-3 border border-white/[0.15] bg-white/[0.06] text-white/60 font-medium rounded-full text-sm hover:border-white/[0.15] hover:text-white transition-all duration-200"
                >
                  View Ecosystem
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom fade to pure black */}
      <div className="h-32 bg-gradient-to-b from-[#050003] to-black" />
    </main>
  )
}
