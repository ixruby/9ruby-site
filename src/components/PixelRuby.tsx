"use client"
import { useEffect, useRef, useState } from "react"

const FAM = "'Helvetica Neue',Helvetica,Arial,sans-serif"
const PX = 5 // 1 canvas px → 5 display px (block size)

type CanvasTextContext = CanvasRenderingContext2D & {
  letterSpacing?: string
}

export default function PixelRuby() {
  const ref = useRef<HTMLDivElement>(null)
  const [src, setSrc] = useState("")

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function draw() {
      const W = el!.offsetWidth
      if (!W) return

      const cw = Math.ceil(W / PX)
      const ch = Math.ceil(cw * 0.32)

      const canvas = document.createElement("canvas")
      canvas.width = cw
      canvas.height = ch
      const ctx = canvas.getContext("2d")!
      const textCtx: CanvasTextContext = ctx

      const fs = Math.floor(ch * 0.88)
      if ("letterSpacing" in textCtx) textCtx.letterSpacing = `${(-0.086 * fs).toFixed(1)}px`
      ctx.font = `900 ${fs}px ${FAM}`
      ctx.fillStyle = "#fff"
      ctx.textBaseline = "top"
      ctx.fillText("RUBY", 0, Math.floor(ch * 0.08))

      // ® superscript
      const rubyW = ctx.measureText("RUBY").width
      const supFs = Math.floor(fs * 0.22)
      if ("letterSpacing" in textCtx) textCtx.letterSpacing = "0px"
      ctx.font = `900 ${supFs}px ${FAM}`
      ctx.fillStyle = "rgba(255,255,255,0.38)"
      ctx.fillText("®", rubyW + 1, Math.floor(ch * 0.08))

      setSrc(canvas.toDataURL())
    }

    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ width: "clamp(18rem, 57vw, 52rem)", lineHeight: 0 }}>
      {src && (
        <img
          src={src}
          alt="RUBY"
          draggable={false}
          style={{ display: "block", width: "100%", height: "auto", imageRendering: "pixelated", userSelect: "none" }}
        />
      )}
    </div>
  )
}
