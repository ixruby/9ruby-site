"use client"

import { useEffect, useRef } from "react"

const PROJECTS = [
  { name: "Rubix",         tag: "Coming soon", desc: "AI terminal agent for developers. Code, deploy, debug — all from your CLI.",        color: "#8B6B3D" },
  { name: "9Ruby OS",      tag: "In dev",       desc: "A next-gen operating layer for solo operators. AI-native from the ground up.",       color: "#ff5a78" },
  { name: "Nine Builder",  tag: "Beta",         desc: "Visual page builder that works with any stack. Elementor for the modern web.",       color: "#8B6B3D" },
  { name: "Voice Agents",  tag: "Live",         desc: "Sub-500ms AI voice systems for inbound support, outbound calls & booking.",          color: "#22c55e" },
  { name: "Terminal9",     tag: "In dev",       desc: "Browser-based terminal with AI co-pilot. Run commands, ask questions, ship faster.", color: "#8B6B3D" },
  { name: "9Ruby AI",      tag: "Live",         desc: "Your AI workspace. Claude-powered, built for operators and growth-stage brands.",     color: "#22c55e" },
  { name: "Domains",       tag: "New",          desc: "Buy domains through 9Ruby. Transparent pricing, instant availability.",             color: "#3b82f6" },
  { name: "GitNexus",      tag: "In dev",       desc: "Code intelligence graph. Impact analysis, smart rename, codebase navigation.",       color: "#8B6B3D" },
  { name: "IXR Cloud",     tag: "Coming soon",  desc: "Managed cloud infra for IX Ruby clients. One-click deploys, zero ops.",             color: "#8B6B3D" },
  { name: "PhoneAgent",    tag: "In dev",       desc: "Automate your phone. 60+ ADB commands, Termux bridge, voice triggers.",             color: "#ff5a78" },
]

const RADIUS = 300
const W = 188
const H = 120

function spherePos(i: number, total: number, r: number) {
  const phi = Math.acos(-1 + (2 * i) / total)
  const theta = Math.sqrt(total * Math.PI) * phi
  return { x: r * Math.cos(theta) * Math.sin(phi), y: r * Math.sin(theta) * Math.sin(phi), z: r * Math.cos(phi) }
}

const BASE_POSITIONS = PROJECTS.map((_, i) => spherePos(i, PROJECTS.length, RADIUS))

export default function GlobeProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const state = useRef({ rx: -15, ry: 0, vy: 0.18, vx: 0, drag: false, lx: 0, ly: 0 })

  useEffect(() => {
    let raf: number
    let last = performance.now()

    function frame(now: number) {
      const dt = Math.min((now - last) / 16, 3)
      last = now
      const s = state.current
      if (!s.drag) {
        s.ry += s.vy * dt
        s.rx += s.vx * dt
        s.vx *= 0.92
        s.rx = Math.max(-40, Math.min(40, s.rx))
      }

      const rx = s.rx * (Math.PI / 180)
      const ry = s.ry * (Math.PI / 180)
      const cosRy = Math.cos(ry), sinRy = Math.sin(ry)
      const cosRx = Math.cos(rx), sinRx = Math.sin(rx)

      type CardData = { el: HTMLDivElement | null; z: number; idx: number; x: number; y: number; depth: number }
      const mapped: CardData[] = BASE_POSITIONS.map((pos, i) => {
        const x1 = pos.x * cosRy + pos.z * sinRy
        const y1 = pos.y
        const z1 = -pos.x * sinRy + pos.z * cosRy
        const y2 = y1 * cosRx - z1 * sinRx
        const z2 = y1 * sinRx + z1 * cosRx
        const depth = (z2 + RADIUS) / (2 * RADIUS)
        return { el: cardRefs.current[i], z: z2, idx: i, x: x1, y: y2, depth }
      })

      mapped.sort((a, b) => a.z - b.z)
      mapped.forEach(({ el, x, y, depth }, layerIdx) => {
        if (!el) return
        const scale = 0.5 + depth * 0.6
        const opacity = 0.2 + depth * 0.8
        el.style.transform = `translate(${x - W / 2}px, ${y - H / 2}px) scale(${scale})`
        el.style.opacity = String(opacity)
        el.style.zIndex = String(layerIdx + 1)
      })

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  function onPointerDown(e: React.PointerEvent) {
    state.current.drag = true
    state.current.lx = e.clientX
    state.current.ly = e.clientY
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!state.current.drag) return
    const dx = e.clientX - state.current.lx
    const dy = e.clientY - state.current.ly
    state.current.ry += dx * 0.45
    state.current.rx += dy * 0.45
    state.current.vx = dy * 0.12
    state.current.lx = e.clientX
    state.current.ly = e.clientY
  }
  function onPointerUp() { state.current.drag = false }

  const liveCount = PROJECTS.filter(p => p.tag === "Live" || p.tag === "New").length
  const pipelineCount = PROJECTS.length - liveCount

  return (
    <section className="relative overflow-hidden py-20 px-4">
      <div className="globe-stars" aria-hidden />

      <div className="max-w-6xl mx-auto text-center mb-4">
        <span className="text-xs uppercase tracking-widest" style={{ color: "#8B6B3D" }}>9Ruby Universe</span>
        <h2 className="font-serif italic text-4xl md:text-5xl mt-2 mb-2" style={{ color: "var(--ink)" }}>What we&apos;re building.</h2>
        <p className="text-sm" style={{ color: "var(--ink-muted)" }}>Drag to explore · {liveCount} live · {pipelineCount} in the pipeline</p>
      </div>

      <div
        ref={containerRef}
        className="globe-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ cursor: "grab" }}
      >
        {PROJECTS.map((p, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el }}
            className="globe-card"
            style={{ borderColor: "rgba(139,107,61,0.15)", width: W, minHeight: H }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = p.color; ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${p.color}44`; state.current.vy = 0 }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,107,61,0.15)"; ;(e.currentTarget as HTMLElement).style.boxShadow = ""; state.current.vy = 0.18 }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-semibold text-sm leading-tight" style={{ color: "var(--ink)" }}>{p.name}</span>
              <span className="globe-tag" style={{ background: p.color + "22", color: p.color }}>{p.tag}</span>
            </div>
            <p className="text-xs leading-relaxed m-0" style={{ color: "var(--ink-muted)" }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
