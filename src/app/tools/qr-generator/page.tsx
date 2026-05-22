"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Copy, Check, RefreshCw } from "lucide-react"
import Navbar from "@/components/Navbar"
import Breadcrumb from "@/components/Breadcrumb"
import ToolServiceCta from "@/components/tools/ToolServiceCta"

// ---- Minimal QR Code generator (client-side, no dependencies) ----

// QR code encoding using a compact implementation
// Supports alphanumeric and byte mode, error correction level M

// Galois field math for Reed-Solomon
const GF_EXP = new Uint8Array(512)
const GF_LOG = new Uint8Array(256)
;(() => {
  let x = 1
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x
    GF_LOG[x] = i
    x = (x << 1) ^ (x & 128 ? 0x11d : 0)
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255]
})()

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return GF_EXP[GF_LOG[a] + GF_LOG[b]]
}

function rsEncode(data: number[], ecLen: number): number[] {
  const gen: number[] = new Array(ecLen + 1).fill(0)
  gen[0] = 1
  for (let i = 0; i < ecLen; i++) {
    for (let j = i + 1; j >= 1; j--) {
      gen[j] = gen[j] ^ gfMul(gen[j - 1], GF_EXP[i])
    }
  }
  const msg = [...data, ...new Array(ecLen).fill(0)]
  for (let i = 0; i < data.length; i++) {
    const coef = msg[i]
    if (coef !== 0) {
      for (let j = 1; j <= ecLen; j++) {
        msg[i + j] ^= gfMul(gen[j], coef)
      }
    }
  }
  return msg.slice(data.length)
}

// QR version/capacity tables (version 1-10, EC level M)
const VERSION_INFO: { ver: number; size: number; totalCw: number; ecCw: number; ecBlocks: [number, number][] }[] = [
  { ver: 1, size: 21, totalCw: 26, ecCw: 10, ecBlocks: [[1, 16]] },
  { ver: 2, size: 25, totalCw: 44, ecCw: 16, ecBlocks: [[1, 28]] },
  { ver: 3, size: 29, totalCw: 70, ecCw: 26, ecBlocks: [[1, 44]] },
  { ver: 4, size: 33, totalCw: 100, ecCw: 18, ecBlocks: [[2, 32]] },
  { ver: 5, size: 37, totalCw: 134, ecCw: 24, ecBlocks: [[2, 43]] },
  { ver: 6, size: 41, totalCw: 172, ecCw: 16, ecBlocks: [[4, 27]] },
  { ver: 7, size: 45, totalCw: 196, ecCw: 18, ecBlocks: [[4, 31]] },
  { ver: 8, size: 49, totalCw: 242, ecCw: 22, ecBlocks: [[2, 38], [2, 39]] },
  { ver: 9, size: 53, totalCw: 292, ecCw: 22, ecBlocks: [[3, 36], [2, 37]] },
  { ver: 10, size: 57, totalCw: 346, ecCw: 26, ecBlocks: [[4, 43], [1, 44]] },
]

// Alignment pattern positions
const ALIGN_POS: number[][] = [
  [], [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
  [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50],
]

function getVersion(dataLen: number): typeof VERSION_INFO[0] {
  for (const v of VERSION_INFO) {
    const dataCw = v.ecBlocks.reduce((s, [c, k]) => s + c * k, 0)
    if (dataLen <= dataCw) return v
  }
  return VERSION_INFO[VERSION_INFO.length - 1]
}

function encodeData(text: string): number[] {
  // Byte mode encoding
  const bytes = new TextEncoder().encode(text)
  const bits: number[] = []

  // Mode indicator: byte = 0100
  bits.push(0, 1, 0, 0)

  // Character count (8 bits for version 1-9, 16 for 10+)
  const ver = getVersion(bytes.length + 3)
  const ccBits = ver.ver >= 10 ? 16 : 8
  for (let i = ccBits - 1; i >= 0; i--) bits.push((bytes.length >> i) & 1)

  // Data
  for (const b of bytes) {
    for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1)
  }

  // Terminator
  for (let i = 0; i < 4 && bits.length < ver.totalCw * 8; i++) bits.push(0)

  // Pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0)

  // Convert to bytes
  const codewords: number[] = []
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0
    for (let j = 0; j < 8; j++) byte = (byte << 1) | (bits[i + j] || 0)
    codewords.push(byte)
  }

  // Pad to fill
  const dataCw = ver.ecBlocks.reduce((s, [c, k]) => s + c * k, 0)
  let pad = 0xEC
  while (codewords.length < dataCw) {
    codewords.push(pad)
    pad = pad === 0xEC ? 0x11 : 0xEC
  }

  return codewords
}

function generateQR(text: string): boolean[][] {
  if (!text) return Array.from({ length: 21 }, () => Array(21).fill(false))

  const dataBytes = encodeData(text)
  const ver = getVersion(dataBytes.length + 3)
  const size = ver.size

  // Split into blocks and add EC
  const allData: number[] = []
  const allEc: number[] = []
  let offset = 0

  for (const [blockCount, blockDataCw] of ver.ecBlocks) {
    const ecPerBlock = ver.ecCw / ver.ecBlocks.reduce((s, [c]) => s + c, 0)
    for (let b = 0; b < blockCount; b++) {
      const blockData = dataBytes.slice(offset, offset + blockDataCw)
      offset += blockDataCw
      const ec = rsEncode(blockData, Math.round(ecPerBlock))
      allData.push(...blockData)
      allEc.push(...ec)
    }
  }

  const finalData = [...allData, ...allEc]

  // Create matrix
  const matrix: (boolean | null)[][] = Array.from({ length: size }, () => Array(size).fill(null))
  const reserved: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false))

  // Place finder patterns
  function placeFinder(row: number, col: number) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const mr = row + r, mc = col + c
        if (mr < 0 || mr >= size || mc < 0 || mc >= size) continue
        const isBorder = r === -1 || r === 7 || c === -1 || c === 7
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4
        matrix[mr][mc] = isOuter || isInner ? true : isBorder ? false : false
        reserved[mr][mc] = true
      }
    }
  }

  placeFinder(0, 0)
  placeFinder(0, size - 7)
  placeFinder(size - 7, 0)

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0
    matrix[i][6] = i % 2 === 0
    reserved[6][i] = true
    reserved[i][6] = true
  }

  // Alignment patterns
  if (ver.ver >= 2) {
    const positions = ALIGN_POS[ver.ver]
    for (const r of positions) {
      for (const c of positions) {
        if (reserved[r]?.[c]) continue
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const mr = r + dr, mc = c + dc
            if (mr >= 0 && mr < size && mc >= 0 && mc < size) {
              matrix[mr][mc] = Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0)
              reserved[mr][mc] = true
            }
          }
        }
      }
    }
  }

  // Reserve format info areas
  for (let i = 0; i < 8; i++) {
    reserved[8][i] = true
    reserved[8][size - 1 - i] = true
    reserved[i][8] = true
    reserved[size - 1 - i][8] = true
  }
  reserved[8][8] = true
  matrix[size - 8][8] = true // dark module
  reserved[size - 8][8] = true

  // Place data bits
  const bits: number[] = []
  for (const byte of finalData) {
    for (let i = 7; i >= 0; i--) bits.push((byte >> i) & 1)
  }

  let bitIdx = 0
  let upward = true
  for (let col = size - 1; col >= 0; col -= 2) {
    if (col === 6) col = 5 // skip timing column
    const rows = upward ? Array.from({ length: size }, (_, i) => size - 1 - i) : Array.from({ length: size }, (_, i) => i)
    for (const row of rows) {
      for (const dc of [0, -1]) {
        const c = col + dc
        if (c < 0 || reserved[row][c]) continue
        matrix[row][c] = bitIdx < bits.length ? bits[bitIdx] === 1 : false
        bitIdx++
      }
    }
    upward = !upward
  }

  // Apply mask (pattern 0: (row + col) % 2 === 0)
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c]) {
        if ((r + c) % 2 === 0) matrix[r][c] = !matrix[r][c]
      }
    }
  }

  // Format info (mask 0, EC level M)
  const formatBits = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0] // pre-computed for M + mask 0
  // Place format bits
  const formatPositions1: [number, number][] = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  ]
  const formatPositions2: [number, number][] = [
    [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8], [size - 7, 8],
    [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1],
  ]
  for (let i = 0; i < 15; i++) {
    const bit = formatBits[i] === 1
    const [r1, c1] = formatPositions1[i]
    const [r2, c2] = formatPositions2[i]
    matrix[r1][c1] = bit
    matrix[r2][c2] = bit
  }

  return matrix as boolean[][]
}

function drawQR(
  canvas: HTMLCanvasElement,
  matrix: boolean[][],
  fgColor: string,
  bgColor: string,
  moduleSize: number
) {
  const size = matrix.length
  const quietZone = 4
  const totalSize = (size + quietZone * 2) * moduleSize
  canvas.width = totalSize
  canvas.height = totalSize
  const ctx = canvas.getContext("2d")!

  // Background
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, totalSize, totalSize)

  // Modules
  ctx.fillStyle = fgColor
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c]) {
        ctx.fillRect(
          (c + quietZone) * moduleSize,
          (r + quietZone) * moduleSize,
          moduleSize,
          moduleSize
        )
      }
    }
  }
}

function escapeSvg(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function qrToSvg(matrix: boolean[][], fgColor: string, bgColor: string, moduleSize: number): string {
  const quietZone = 4
  const totalModules = matrix.length + quietZone * 2
  const size = totalModules * moduleSize
  const rects: string[] = []

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix.length; c++) {
      if (matrix[r][c]) {
        rects.push(`<rect x="${(c + quietZone) * moduleSize}" y="${(r + quietZone) * moduleSize}" width="${moduleSize}" height="${moduleSize}" />`)
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="${escapeSvg(bgColor)}" />
  <g fill="${escapeSvg(fgColor)}">
    ${rects.join("\n    ")}
  </g>
</svg>`
}

export default function QrGeneratorPage() {
  const [text, setText] = useState("")
  const [fgColor, setFgColor] = useState("#ffffff")
  const [bgColor, setBgColor] = useState("#000000")
  const [moduleSize, setModuleSize] = useState(8)
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const render = useCallback(() => {
    if (!canvasRef.current) return
    const matrix = generateQR(text || "https://9ruby.com")
    drawQR(canvasRef.current, matrix, fgColor, bgColor, moduleSize)
  }, [text, fgColor, bgColor, moduleSize])

  useEffect(() => {
    render()
  }, [render])

  const downloadPNG = () => {
    if (!canvasRef.current) return
    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()
  }

  const downloadSVG = () => {
    const matrix = generateQR(text || "https://9ruby.com")
    const svg = qrToSvg(matrix, fgColor, bgColor, moduleSize)
    const blob = new Blob([svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = "qrcode.svg"
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  const copyImage = async () => {
    if (!canvasRef.current) return
    try {
      const blob = await new Promise<Blob>((resolve) =>
        canvasRef.current!.toBlob(b => resolve(b!), "image/png")
      )
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback: copy data URL
      const dataUrl = canvasRef.current.toDataURL()
      await navigator.clipboard.writeText(dataUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const inputCls = "flex-1 h-11 px-3 bg-white border border-black/[0.08] rounded-xl text-[#1A1A1A] text-sm font-mono focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 focus:outline-none transition-all"

  return (
    <main className="relative min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "QR Generator" }]} />
      <div className="relative max-w-4xl mx-auto px-6 pt-8 pb-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm hover:text-[#1A1A1A] transition-colors mb-12" style={{ color: "var(--ink-muted)" }}>
          <ArrowLeft size={14} /> Back to Tools
        </Link>

        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "var(--accent)" }}>
            Free Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic tracking-tighter leading-[1.1] mb-4 mt-3" style={{ color: "var(--ink-strong)" }}>
            QR Code Generator
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            Generate QR codes for any text or URL. Customize colors and download as PNG. No external APIs used.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div className="p-6 bg-white border border-black/[0.04] rounded-2xl space-y-5">
              <div>
                <label className="text-xs text-[#7A7A72] mb-1.5 block">Content</label>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Enter text or URL..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/[0.02] border border-black/[0.08] rounded-xl text-[#1A1A1A] placeholder:text-[#B8B8B0] focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 focus:outline-none text-sm font-mono resize-none transition-all"
                />
                <span className="text-xs text-[#B8B8B0] mt-1.5 block font-mono">{text.length} characters</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#7A7A72] mb-1.5 block">Foreground</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={e => setFgColor(e.target.value)}
                      className="w-11 h-11 bg-transparent border border-black/[0.08] rounded-xl cursor-pointer"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={e => setFgColor(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#7A7A72] mb-1.5 block">Background</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={e => setBgColor(e.target.value)}
                      className="w-11 h-11 bg-transparent border border-black/[0.08] rounded-xl cursor-pointer"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={e => setBgColor(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#7A7A72] mb-2 block">Module Size: <span className="font-mono text-[#7A7A72]">{moduleSize}px</span></label>
                <input
                  type="range"
                  min={4}
                  max={16}
                  value={moduleSize}
                  onChange={e => setModuleSize(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
                <div className="flex justify-between text-xs text-[#B8B8B0] mt-1 font-mono">
                  <span>Small</span>
                  <span>Large</span>
                </div>
              </div>

              {/* Quick presets */}
              <div>
                <label className="text-xs text-[#7A7A72] mb-2 block">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "9Ruby Dark", fg: "#fff", bg: "#000000" },
                    { label: "Classic", fg: "#000000", bg: "#ffffff" },
                    { label: "Inverted", fg: "#ffffff", bg: "#000000" },
                    { label: "Ocean", fg: "#0891b2", bg: "#f0fdfa" },
                    { label: "Forest", fg: "#166534", bg: "#f0fdf4" },
                  ].map(preset => (
                    <button
                      key={preset.label}
                      onClick={() => { setFgColor(preset.fg); setBgColor(preset.bg) }}
                      className="text-xs px-3 py-1.5 bg-white/[0.02] border border-black/[0.08] rounded-lg text-[#7A7A72] hover:text-[#1A1A1A] hover:border-black/[0.15] transition-all"
                    >
                      <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: preset.fg }} />
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={downloadPNG}
                className="flex-1 h-11 bg-[#1A1A1A] text-[#F8F7F4] text-sm font-medium rounded-full hover:bg-[#333] transition-all flex items-center justify-center gap-2"
              >
                <Download size={16} /> Download PNG
              </button>
              <button
                onClick={downloadSVG}
                className="h-11 px-5 bg-white/[0.02] border border-black/[0.08] rounded-xl text-[#7A7A72] hover:text-[#1A1A1A] hover:border-black/[0.12] transition-all flex items-center gap-2"
              >
                <Download size={16} /> SVG
              </button>
              <button
                onClick={copyImage}
                className="h-11 px-5 bg-white/[0.02] border border-black/[0.08] rounded-xl text-[#7A7A72] hover:text-[#1A1A1A] hover:border-black/[0.12] transition-all flex items-center gap-2"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={() => { setFgColor("#ffffff"); setBgColor("#000000"); setModuleSize(8) }}
                className="h-11 px-4 bg-white/[0.02] border border-black/[0.08] rounded-xl text-[#7A7A72] hover:text-[#1A1A1A] hover:border-black/[0.12] transition-all"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center">
            <div className="p-8 bg-white border border-black/[0.04] rounded-2xl w-full flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="max-w-full"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <p className="text-xs text-[#B8B8B0] mt-3 text-center font-mono">
              {text ? `Encoding: ${text.length} characters` : "Showing default: https://9ruby.com"}
            </p>
          </div>
        </div>

        <ToolServiceCta slug="qr-generator" />
      </div>
    </main>
  )
}
