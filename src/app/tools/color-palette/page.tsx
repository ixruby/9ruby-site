"use client"

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Copy, Check, Lock, Unlock, Palette } from "lucide-react"
import Navbar from "@/components/Navbar"
import Breadcrumb from "@/components/Breadcrumb"

interface PaletteColor {
  hex: string
  locked: boolean
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 100)]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? "#000000" : "#ffffff"
}

type Harmony = "analogous" | "complementary" | "triadic" | "split-complementary" | "random"

function generatePalette(harmony: Harmony, lockedColors: PaletteColor[]): PaletteColor[] {
  const baseHue = Math.random() * 360

  const hues: number[] = []
  switch (harmony) {
    case "analogous":
      for (let i = 0; i < 5; i++) hues.push((baseHue + i * 30) % 360)
      break
    case "complementary":
      hues.push(baseHue, (baseHue + 180) % 360, (baseHue + 15) % 360, (baseHue + 195) % 360, (baseHue + 345) % 360)
      break
    case "triadic":
      hues.push(baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360, (baseHue + 30) % 360, (baseHue + 150) % 360)
      break
    case "split-complementary":
      hues.push(baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360, (baseHue + 30) % 360, (baseHue + 330) % 360)
      break
    default:
      for (let i = 0; i < 5; i++) hues.push(Math.random() * 360)
  }

  return hues.map((h, i) => {
    if (lockedColors[i]?.locked) return lockedColors[i]
    const s = 55 + Math.random() * 35
    const l = 35 + Math.random() * 35
    return { hex: hslToHex(h, s, l), locked: false }
  })
}

export default function ColorPalettePage() {
  const [colors, setColors] = useState<PaletteColor[]>(() =>
    generatePalette("random", [])
  )
  const [harmony, setHarmony] = useState<Harmony>("random")
  const [copied, setCopied] = useState<number | null>(null)
  const [history, setHistory] = useState<PaletteColor[][]>([])

  const regenerate = useCallback(() => {
    setHistory(prev => [...prev.slice(-19), colors])
    setColors(generatePalette(harmony, colors))
  }, [harmony, colors])

  const toggleLock = (index: number) => {
    setColors(prev => prev.map((c, i) => i === index ? { ...c, locked: !c.locked } : c))
  }

  const copyHex = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex)
    setCopied(index)
    setTimeout(() => setCopied(null), 1500)
  }

  const copyAllAsCSS = () => {
    const css = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join("\n")}\n}`
    navigator.clipboard.writeText(css)
    setCopied(-1)
    setTimeout(() => setCopied(null), 1500)
  }

  const undo = () => {
    if (history.length === 0) return
    setColors(history[history.length - 1])
    setHistory(prev => prev.slice(0, -1))
  }

  return (
    <main className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Color Palette" }]} />
      <div className="relative max-w-5xl mx-auto px-6 pt-8 pb-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm hover:text-[#1A1A1A] transition-colors mb-12" style={{ color: "var(--ink-muted)" }}>
          <ArrowLeft size={14} /> Back to Tools
        </Link>

        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "#8B6B3D" }}>
            Free Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic tracking-tighter leading-[1.1] mb-4 mt-3" style={{ color: "var(--ink-strong)" }}>
            Color Palette Generator
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            Generate harmonious color palettes instantly. Lock colors you like, pick a harmony type, and export as CSS variables.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <select
            value={harmony}
            onChange={e => setHarmony(e.target.value as Harmony)}
            className="h-10 px-4 bg-white border border-black/[0.08] rounded-xl text-sm focus:border-[#8B6B3D]/50 focus:ring-1 focus:ring-[#8B6B3D]/20 focus:outline-none appearance-none cursor-pointer"
            style={{ color: "var(--ink-strong)" }}
          >
            <option value="random">Random</option>
            <option value="analogous">Analogous</option>
            <option value="complementary">Complementary</option>
            <option value="triadic">Triadic</option>
            <option value="split-complementary">Split Complementary</option>
          </select>

          <button
            onClick={regenerate}
            className="h-10 px-5 bg-[#1A1A1A] text-[#F8F7F4] text-sm font-medium rounded-full hover:bg-[#333] transition-all flex items-center gap-2"
          >
            <RefreshCw size={14} /> Generate
          </button>

          <button
            onClick={undo}
            disabled={history.length === 0}
            className="h-10 px-4 bg-white border border-black/[0.08] rounded-xl text-sm hover:border-black/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            style={{ color: "var(--ink-muted)" }}
          >
            Undo
          </button>

          <button
            onClick={copyAllAsCSS}
            className="h-10 px-4 bg-white border border-black/[0.08] rounded-xl text-sm hover:border-black/[0.12] transition-all flex items-center gap-2"
            style={{ color: "var(--ink-muted)" }}
          >
            {copied === -1 ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {copied === -1 ? "Copied!" : "Copy CSS"}
          </button>

          <span className="text-xs ml-auto hidden sm:block font-mono" style={{ color: "var(--ink-soft)" }}>Press spacebar to regenerate</span>
        </div>

        {/* Palette display */}
        <div className="grid grid-cols-5 gap-0 h-72 md:h-96 mb-8 overflow-hidden rounded-2xl border border-black/[0.04]">
          {colors.map((color, i) => (
            <div
              key={i}
              className="relative group flex flex-col items-center justify-end pb-6 transition-all cursor-pointer"
              style={{ backgroundColor: color.hex }}
              onClick={() => copyHex(color.hex, i)}
            >
              {/* Lock toggle */}
              <button
                onClick={e => { e.stopPropagation(); toggleLock(i) }}
                className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                style={{ color: getTextColor(color.hex) }}
              >
                {color.locked ? <Lock size={18} /> : <Unlock size={18} />}
              </button>

              {/* Color info */}
              <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: getTextColor(color.hex) }}>
                <div className="text-lg font-bold font-mono mb-1">
                  {copied === i ? <Check size={20} className="mx-auto" /> : color.hex.toUpperCase()}
                </div>
                <div className="text-xs opacity-60 font-mono">RGB({hexToRgb(color.hex)})</div>
                <div className="text-xs opacity-60 font-mono">HSL({hexToHsl(color.hex).join(", ")})</div>
              </div>

              {/* Always visible hex */}
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono group-hover:opacity-0 transition-opacity"
                style={{ color: getTextColor(color.hex), opacity: 0.7 }}
              >
                {color.hex.toUpperCase()}
              </div>

              {/* Lock indicator */}
              {color.locked && (
                <div className="absolute top-3 right-3" style={{ color: getTextColor(color.hex) }}>
                  <Lock size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preview section */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Text preview */}
          <div className="p-6 bg-white border border-black/[0.04] rounded-2xl">
            <h3 className="text-sm font-semibold tracking-tight mb-4" style={{ color: "var(--ink-muted)" }}>Text Preview</h3>
            <div className="space-y-3">
              {colors.map((c, i) => (
                <p key={i} className="text-base" style={{ color: c.hex }}>
                  The quick brown fox jumps over the lazy dog
                </p>
              ))}
            </div>
          </div>

          {/* Button preview */}
          <div className="p-6 bg-white border border-black/[0.04] rounded-2xl">
            <h3 className="text-sm font-semibold tracking-tight mb-4" style={{ color: "var(--ink-muted)" }}>Button Preview</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((c, i) => (
                <button
                  key={i}
                  className="px-5 py-2.5 text-sm font-medium rounded-full transition-transform hover:scale-105"
                  style={{ backgroundColor: c.hex, color: getTextColor(c.hex) }}
                >
                  Button {i + 1}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {colors.map((c, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black/[0.06]" style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="mt-8 text-center">
          <kbd className="px-3 py-1.5 bg-white border border-black/[0.06] rounded-lg text-xs font-mono" style={{ color: "var(--ink-muted)" }}>Space</kbd>
          <span className="text-xs ml-2" style={{ color: "var(--ink-soft)" }}>to generate new palette</span>
        </div>
      </div>

      <SpacebarListener onSpace={regenerate} />
    </main>
  )
}

function SpacebarListener({ onSpace }: { onSpace: () => void }) {
  const callbackRef = useRef(onSpace)
  
  useLayoutEffect(() => {
    callbackRef.current = onSpace
  })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault()
        callbackRef.current()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return null
}
