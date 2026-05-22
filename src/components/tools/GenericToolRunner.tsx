"use client"

import { useState, type ReactNode } from "react"
import { Check, Copy, Download, RefreshCw } from "lucide-react"
import type { PublicTool } from "@/lib/tools"

const panelClass = "bg-white border border-black/[0.04] rounded-2xl p-5 md:p-6"
const inputClass = "w-full h-11 px-4 bg-white border border-black/[0.08] rounded-xl placeholder:text-[#B8B8B0] focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 focus:outline-none text-sm transition-all"
const textareaClass = "w-full px-4 py-3 bg-white border border-black/[0.08] rounded-xl placeholder:text-[#B8B8B0] focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 focus:outline-none text-sm resize-none transition-all"
const primaryButtonClass = "h-11 px-5 bg-[#1A1A1A] text-[#F8F7F4] text-sm font-medium rounded-full hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2"
const secondaryButtonClass = "h-11 px-5 bg-white border border-black/[0.08] rounded-xl text-sm hover:border-black/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2"

type TextToolConfig = {
  label: string
  placeholder: string
  defaultValue?: string
  button: string
  transform: (input: string) => string | Promise<string>
}

type CalculatorField = {
  key: string
  label: string
  placeholder?: string
  defaultValue?: string
}

type CalculatorConfig = {
  fields: CalculatorField[]
  calculate: (values: Record<string, number>) => string
}

function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

async function copyText(text: string, onCopied: () => void) {
  await navigator.clipboard.writeText(text)
  onCopied()
  window.setTimeout(onCopied, 1500)
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function titleCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
}

function sentenceCase(value: string): string {
  const lower = value.toLowerCase()
  return lower.replace(/(^\s*[a-z]|[.!?]\s+[a-z])/g, (match) => match.toUpperCase())
}

function words(value: string): string[] {
  return value.trim().match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)?/g) ?? []
}

function parseCsv(input: string): string[][] {
  return input
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(",").map((cell) => cell.trim()))
    .filter((row) => row.some(Boolean))
}

function csvToMarkdown(input: string): string {
  const rows = parseCsv(input)
  if (rows.length === 0) return "Paste CSV rows first."
  const width = Math.max(...rows.map((row) => row.length))
  const normalized = rows.map((row) => Array.from({ length: width }, (_, index) => row[index] ?? ""))
  const header = normalized[0]
  const separator = Array.from({ length: width }, () => "---")
  return [header, separator, ...normalized.slice(1)].map((row) => `| ${row.join(" | ")} |`).join("\n")
}

function csvToJson(input: string): string {
  const rows = parseCsv(input)
  if (rows.length < 2) return "Add a header row and at least one data row."
  const [headers, ...body] = rows
  return JSON.stringify(
    body.map((row) => Object.fromEntries(headers.map((header, index) => [header || `field_${index + 1}`, row[index] ?? ""]))),
    null,
    2,
  )
}

function jsonToCsv(input: string): string {
  const parsed = JSON.parse(input)
  const rows = Array.isArray(parsed) ? parsed : [parsed]
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row ?? {}))))
  const escapeCell = (value: unknown) => {
    const text = String(value ?? "")
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  return [headers.join(","), ...rows.map((row) => headers.map((header) => escapeCell(row?.[header])).join(","))].join("\n")
}

function formatHtml(input: string): string {
  return input
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .reduce<{ depth: number; lines: string[] }>((state, rawLine) => {
      const line = rawLine.trim()
      const closing = /^<\//.test(line)
      const selfClosing = /\/>$/.test(line) || /^<(meta|link|br|hr|img|input)\b/i.test(line)
      const depth = closing ? Math.max(0, state.depth - 1) : state.depth
      state.lines.push(`${"  ".repeat(depth)}${line}`)
      state.depth = closing || selfClosing ? depth : depth + 1
      return state
    }, { depth: 0, lines: [] }).lines.join("\n")
}

function formatCss(input: string): string {
  return input
    .replace(/\s*{\s*/g, " {\n  ")
    .replace(/;\s*/g, ";\n  ")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/\n\s*\n/g, "\n")
    .trim()
}

function formatSql(input: string): string {
  return input
    .replace(/\b(SELECT|FROM|WHERE|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN|GROUP BY|ORDER BY|HAVING|LIMIT|VALUES|SET)\b/gi, "\n$1")
    .replace(/\s*,\s*/g, ",\n  ")
    .trim()
}

function minifyCode(input: string): string {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .trim()
}

function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ""
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function decodeBase64(input: string): string {
  const binary = atob(input.trim())
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

async function hashText(input: string, algorithm: AlgorithmIdentifier): Promise<string> {
  const hash = await crypto.subtle.digest(algorithm, new TextEncoder().encode(input))
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

const extensionLookup: Record<string, string> = {
  jpg: "JPEG image. MIME: image/jpeg",
  jpeg: "JPEG image. MIME: image/jpeg",
  png: "PNG image. MIME: image/png",
  webp: "WebP image. MIME: image/webp",
  svg: "SVG vector image. MIME: image/svg+xml",
  pdf: "Portable Document Format. MIME: application/pdf",
  csv: "Comma-separated values. MIME: text/csv",
  json: "JSON data. MIME: application/json",
  xml: "XML document. MIME: application/xml",
  html: "HTML document. MIME: text/html",
  css: "CSS stylesheet. MIME: text/css",
  js: "JavaScript file. MIME: text/javascript",
  mp4: "MP4 video. MIME: video/mp4",
  mp3: "MP3 audio. MIME: audio/mpeg",
  wav: "WAV audio. MIME: audio/wav",
  zip: "ZIP archive. MIME: application/zip",
}

const textToolConfigs: Record<string, TextToolConfig> = {
  "word-counter": {
    label: "Text",
    placeholder: "Paste text to count words, characters, sentences, and reading time.",
    button: "Analyze text",
    transform: (input) => {
      const wordList = words(input)
      const characters = input.length
      const charactersNoSpaces = input.replace(/\s/g, "").length
      const sentences = (input.match(/[.!?]+/g) ?? []).length
      const paragraphs = input.split(/\n\s*\n/).filter((part) => part.trim()).length
      const readingMinutes = Math.max(1, Math.ceil(wordList.length / 225))
      return [
        `Words: ${wordList.length}`,
        `Characters: ${characters}`,
        `Characters without spaces: ${charactersNoSpaces}`,
        `Sentences: ${sentences}`,
        `Paragraphs: ${paragraphs}`,
        `Estimated reading time: ${readingMinutes} min`,
      ].join("\n")
    },
  },
  "character-counter": {
    label: "Text",
    placeholder: "Paste text to count characters and length limits.",
    button: "Count characters",
    transform: (input) => [
      `Characters: ${input.length}`,
      `Without spaces: ${input.replace(/\s/g, "").length}`,
      `SMS segments: ${Math.max(1, Math.ceil(input.length / 160))}`,
      `Meta title fit: ${input.length <= 60 ? "Fits" : `${input.length - 60} characters too long`}`,
      `Meta description fit: ${input.length <= 160 ? "Fits" : `${input.length - 160} characters too long`}`,
    ].join("\n"),
  },
  "case-converter": {
    label: "Text",
    placeholder: "Paste text to convert case.",
    button: "Convert case",
    transform: (input) => [
      "UPPERCASE",
      input.toUpperCase(),
      "",
      "lowercase",
      input.toLowerCase(),
      "",
      "Title Case",
      titleCase(input),
      "",
      "Sentence case",
      sentenceCase(input),
      "",
      "kebab-case",
      slugify(input),
      "",
      "snake_case",
      slugify(input).replace(/-/g, "_"),
    ].join("\n"),
  },
  "slug-generator": {
    label: "Title or name",
    placeholder: "AI tools for small business",
    button: "Generate slug",
    transform: (input) => slugify(input),
  },
  "lorem-ipsum-generator": {
    label: "Topic or word count",
    placeholder: "marketing website, 80 words",
    button: "Generate placeholder copy",
    transform: (input) => {
      const count = Number(input.match(/\d+/)?.[0] ?? 80)
      const topic = input.replace(/\d+/g, "").trim() || "digital product"
      const base = `This ${topic} section gives teams a clean way to present information, test layout density, and keep the design moving before final copy is ready. The placeholder copy should feel calm, practical, and easy to replace when the real message is approved.`
      const pool = words(base)
      return Array.from({ length: count }, (_, index) => pool[index % pool.length]).join(" ") + "."
    },
  },
  "text-diff-checker": {
    label: "Two text blocks",
    placeholder: "Paste old text, then add --- on its own line, then paste new text.",
    button: "Compare text",
    transform: (input) => {
      const [left = "", right = ""] = input.split(/\n---\n/)
      const oldLines = left.split(/\r?\n/)
      const newLines = right.split(/\r?\n/)
      const max = Math.max(oldLines.length, newLines.length)
      return Array.from({ length: max }, (_, index) => {
        if (oldLines[index] === newLines[index]) return `  ${oldLines[index] ?? ""}`
        return [`- ${oldLines[index] ?? ""}`, `+ ${newLines[index] ?? ""}`].join("\n")
      }).join("\n")
    },
  },
  "remove-duplicate-lines": {
    label: "Lines",
    placeholder: "Paste lines to remove duplicates.",
    button: "Remove duplicates",
    transform: (input) => Array.from(new Set(input.split(/\r?\n/).map((line) => line.trim()).filter(Boolean))).join("\n"),
  },
  "sort-lines-tool": {
    label: "Lines",
    placeholder: "Paste lines to sort.",
    button: "Sort lines",
    transform: (input) => input.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).join("\n"),
  },
  "markdown-table-generator": {
    label: "CSV rows",
    placeholder: "Name,Role\nVishnu,Founder\nRuby,Assistant",
    button: "Create Markdown table",
    transform: csvToMarkdown,
  },
  "readability-checker": {
    label: "Text",
    placeholder: "Paste copy to check readability.",
    button: "Check readability",
    transform: (input) => {
      const wordList = words(input)
      const sentenceCount = Math.max(1, (input.match(/[.!?]+/g) ?? []).length)
      const avg = wordList.length / sentenceCount
      const longWords = wordList.filter((word) => word.length > 12).length
      const score = Math.max(0, Math.min(100, Math.round(100 - avg * 2.2 - longWords * 0.8)))
      return [`Readability score: ${score}/100`, `Words: ${wordList.length}`, `Sentences: ${sentenceCount}`, `Average sentence length: ${avg.toFixed(1)} words`, `Long words: ${longWords}`, score > 70 ? "Good: easy to scan." : "Improve: shorten sentences and simplify long words."].join("\n")
    },
  },
  "headline-analyzer": {
    label: "Headline",
    placeholder: "Launch faster with 9Ruby tools",
    button: "Analyze headline",
    transform: (input) => {
      const text = input.trim()
      const wordList = words(text)
      const powerWords = ["free", "new", "fast", "simple", "proven", "complete", "easy", "best", "clean", "launch"]
      const hasNumber = /\d/.test(text)
      const hasPowerWord = powerWords.some((word) => text.toLowerCase().includes(word))
      const lengthScore = text.length >= 35 && text.length <= 70 ? 35 : text.length >= 20 && text.length <= 90 ? 24 : 12
      const specificityScore = hasNumber ? 20 : 10
      const clarityScore = wordList.length >= 4 && wordList.length <= 12 ? 25 : 14
      const powerScore = hasPowerWord ? 20 : 8
      const score = lengthScore + specificityScore + clarityScore + powerScore
      return [
        `Score: ${score}/100`,
        `Characters: ${text.length}`,
        `Words: ${wordList.length}`,
        `Length: ${lengthScore >= 24 ? "Good" : "Needs work"}`,
        `Specificity: ${hasNumber ? "Has a number" : "Add a number, audience, or measurable promise"}`,
        `Hook strength: ${hasPowerWord ? "Strong" : "Add a concrete benefit word"}`,
      ].join("\n")
    },
  },
  "keyword-density-checker": {
    label: "Copy",
    placeholder: "Paste page copy to see repeated keywords and density.",
    button: "Check density",
    transform: (input) => {
      const stopWords = new Set(["the", "and", "for", "with", "that", "this", "from", "you", "your", "are", "was", "have", "has", "into", "our", "can", "will", "not", "but", "all"])
      const wordList = words(input).map((word) => word.toLowerCase()).filter((word) => word.length > 2 && !stopWords.has(word))
      if (!wordList.length) return "Paste copy with enough words to analyze."
      const counts = new Map<string, number>()
      wordList.forEach((word) => counts.set(word, (counts.get(word) ?? 0) + 1))
      return Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([word, count]) => `${word}: ${count} (${((count / wordList.length) * 100).toFixed(1)}%)`)
        .join("\n")
    },
  },
  "serp-snippet-preview": {
    label: "Title and description",
    placeholder: "9Ruby Tools - Free browser utilities\nUse SEO, design, marketing, developer, and business tools in one place.",
    button: "Preview SERP fit",
    transform: (input) => {
      const [title = "", description = ""] = input.split(/\r?\n/)
      const titleFit = title.length <= 60 ? "Safe" : `${title.length - 60} characters over`
      const descriptionFit = description.length <= 160 ? "Safe" : `${description.length - 160} characters over`
      return [
        "Search preview",
        title || "Untitled page",
        "https://9ruby.com/tools",
        description || "No description added.",
        "",
        `Title length: ${title.length}/60 - ${titleFit}`,
        `Description length: ${description.length}/160 - ${descriptionFit}`,
      ].join("\n")
    },
  },
  "newsletter-subject-line-tester": {
    label: "Subject and preview text",
    placeholder: "Subject line\nPreview text",
    button: "Test subject line",
    transform: (input) => {
      const [subject = "", preview = ""] = input.split(/\r?\n/)
      const subjectLength = subject.trim().length
      const previewLength = preview.trim().length
      const score = (subjectLength >= 28 && subjectLength <= 55 ? 40 : 20) + (previewLength >= 35 && previewLength <= 90 ? 35 : 15) + (/[?0-9]/.test(subject) ? 15 : 5) + (/\b(free|new|today|guide|template|launch)\b/i.test(subject) ? 10 : 4)
      return [
        `Score: ${score}/100`,
        `Subject length: ${subjectLength} characters`,
        `Preview length: ${previewLength} characters`,
        subjectLength > 55 ? "Subject may truncate on mobile." : "Subject length is usable.",
        previewLength < 35 ? "Preview text is short. Add supporting context." : "Preview text gives enough context.",
      ].join("\n")
    },
  },
  "title-tag-previewer": {
    label: "Title and description",
    placeholder: "9Ruby Tools - Free SEO, design, AI, PDF and developer tools\nOne place for branded utilities.",
    button: "Preview snippet",
    transform: (input) => {
      const [title = "", description = ""] = input.split(/\r?\n/)
      return [`Title: ${title}`, `Title length: ${title.length}/60`, `Description: ${description}`, `Description length: ${description.length}/160`, "", title.length > 60 ? "Title may truncate." : "Title length is safe.", description.length > 160 ? "Description may truncate." : "Description length is safe."].join("\n")
    },
  },
  "meta-description-writer": {
    label: "Page details",
    placeholder: "Page: 9Ruby tools\nAudience: founders\nOffer: free online utilities",
    button: "Write descriptions",
    transform: (input) => {
      const clean = input.replace(/\s+/g, " ").trim()
      return [
        `${clean}. Find useful tools, export clean outputs, and ask 9Ruby to turn results into production work.`,
        `${clean}. Free no-login utilities for faster website, marketing, design, and business decisions.`,
        `${clean}. Use the tool, copy the output, and move from insight to implementation with 9Ruby.`,
      ].join("\n\n")
    },
  },
  "base64-encoder": {
    label: "Text",
    placeholder: "Text to encode",
    button: "Encode",
    transform: encodeBase64,
  },
  "base64-decoder": {
    label: "Base64",
    placeholder: "SGVsbG8=",
    button: "Decode",
    transform: decodeBase64,
  },
  "url-encoder-decoder": {
    label: "URL or query text",
    placeholder: "hello world?source=9ruby tools",
    button: "Encode and decode",
    transform: (input) => [`Encoded: ${encodeURIComponent(input)}`, `Decoded: ${decodeURIComponent(input)}`].join("\n"),
  },
  "jwt-decoder": {
    label: "JWT",
    placeholder: "Paste a JWT. Do not paste production secrets.",
    button: "Decode JWT",
    transform: (input) => {
      const [header, payload] = input.trim().split(".")
      if (!header || !payload) return "Invalid JWT shape."
      const decode = (part: string) => JSON.stringify(JSON.parse(decodeBase64(part.replace(/-/g, "+").replace(/_/g, "/"))), null, 2)
      return [`Header`, decode(header), "", `Payload`, decode(payload)].join("\n")
    },
  },
  "uuid-generator": {
    label: "Amount",
    placeholder: "10",
    button: "Generate UUIDs",
    transform: (input) => Array.from({ length: Math.min(100, Math.max(1, Number(input) || 10)) }, () => crypto.randomUUID()).join("\n"),
  },
  "regex-tester": {
    label: "Pattern and text",
    placeholder: "^[a-z]+$\n---\nhello\nHello123",
    button: "Test regex",
    transform: (input) => {
      const [pattern = "", sample = ""] = input.split(/\n---\n/)
      const regex = new RegExp(pattern, "gm")
      const matches = [...sample.matchAll(regex)].map((match) => match[0])
      return matches.length ? matches.map((match, index) => `${index + 1}. ${match}`).join("\n") : "No matches."
    },
  },
  "html-formatter": { label: "HTML", placeholder: "<div><h1>Hello</h1></div>", button: "Format HTML", transform: formatHtml },
  "css-formatter": { label: "CSS", placeholder: "body{color:#fff;background:#000;}", button: "Format CSS", transform: formatCss },
  "javascript-formatter": { label: "JavaScript", placeholder: "function hi(){console.log('hi')}", button: "Format JS", transform: (input) => input.replace(/[;{}]/g, (match) => `${match}\n`).replace(/\n\s*\n/g, "\n").trim() },
  "html-minifier": { label: "HTML", placeholder: "<div>  Hello  </div>", button: "Minify HTML", transform: minifyCode },
  "css-minifier": { label: "CSS", placeholder: "body { color: #fff; }", button: "Minify CSS", transform: minifyCode },
  "javascript-minifier": { label: "JavaScript", placeholder: "const value = 1;", button: "Minify JS", transform: minifyCode },
  "yaml-formatter": { label: "YAML", placeholder: "name: 9Ruby\nitems:\n - tools", button: "Normalize YAML", transform: (input) => input.split(/\r?\n/).map((line) => line.trimEnd()).join("\n") },
  "sql-formatter": { label: "SQL", placeholder: "select * from users where active = true order by created_at", button: "Format SQL", transform: formatSql },
  "xml-formatter": { label: "XML", placeholder: "<root><item>9Ruby</item></root>", button: "Format XML", transform: formatHtml },
  "json-to-csv-converter": { label: "JSON", placeholder: "[{\"name\":\"Ruby\",\"role\":\"Tool\"}]", button: "Convert to CSV", transform: jsonToCsv },
  "csv-to-json-converter": { label: "CSV", placeholder: "name,role\nRuby,Tool", button: "Convert to JSON", transform: csvToJson },
  "csv-cleaner": { label: "CSV", placeholder: " name , role \n Ruby , Tool ", button: "Clean CSV", transform: (input) => parseCsv(input).map((row) => row.join(",")).join("\n") },
  "csv-to-markdown-table": { label: "CSV", placeholder: "name,role\nRuby,Tool", button: "Convert to Markdown", transform: csvToMarkdown },
  "data-table-viewer": { label: "CSV", placeholder: "name,role\nRuby,Tool", button: "Create readable table", transform: csvToMarkdown },
  "hash-generator": { label: "Text", placeholder: "Text to hash", button: "Generate hashes", transform: async (input) => [`SHA-1: ${await hashText(input, "SHA-1")}`, `SHA-256: ${await hashText(input, "SHA-256")}`, `SHA-384: ${await hashText(input, "SHA-384")}`, `SHA-512: ${await hashText(input, "SHA-512")}`].join("\n") },
  "checksum-verifier": { label: "Expected hash and text", placeholder: "expected-hash\n---\ntext to hash", button: "Verify SHA-256", transform: async (input) => { const [expected = "", text = ""] = input.split(/\n---\n/); const actual = await hashText(text, "SHA-256"); return [`Expected: ${expected.trim()}`, `Actual: ${actual}`, `Match: ${expected.trim().toLowerCase() === actual ? "Yes" : "No"}`].join("\n") } },
  "random-picker": { label: "Options", placeholder: "Option A\nOption B\nOption C", button: "Pick one", transform: (input) => { const lines = input.split(/\r?\n/).filter(Boolean); return lines.length ? lines[Math.floor(Math.random() * lines.length)] : "Add options first." } },
  "date-formatter": { label: "Date", placeholder: "2026-05-12", button: "Format date", transform: (input) => { const date = input.trim() ? new Date(input) : new Date(); return [`ISO: ${date.toISOString()}`, `Local: ${date.toLocaleString()}`, `Date: ${date.toLocaleDateString()}`, `Time: ${date.toLocaleTimeString()}`, `Filename: ${date.toISOString().slice(0, 10)}`].join("\n") } },
  "number-formatter": { label: "Number", placeholder: "1234567.89", button: "Format number", transform: (input) => { const n = Number(input); return [`Standard: ${n.toLocaleString()}`, `Compact: ${Intl.NumberFormat("en", { notation: "compact" }).format(n)}`, `Percent: ${Intl.NumberFormat("en", { style: "percent" }).format(n / 100)}`].join("\n") } },
  "currency-formatter": { label: "Amount and currency", placeholder: "12345.67 USD", button: "Format currency", transform: (input) => { const [amount, currency = "USD"] = input.trim().split(/\s+/); const n = Number(amount); return ["en-US", "en-GB", "en-IN", "ar-AE"].map((locale) => `${locale}: ${Intl.NumberFormat(locale, { style: "currency", currency }).format(n)}`).join("\n") } },
  "filename-cleaner": { label: "Filename", placeholder: "My Report: Final / 2026.pdf", button: "Clean filename", transform: (input) => input.trim().replace(/[<>:"/\\|?*\x00-\x1F]/g, "-").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() },
  "file-extension-finder": { label: "Extension", placeholder: "pdf", button: "Look up extension", transform: (input) => extensionLookup[input.trim().replace(/^\./, "").toLowerCase()] ?? "Unknown extension. Add more context or use a common web/file extension." },
  "mime-type-lookup": { label: "Extension", placeholder: "json", button: "Find MIME type", transform: (input) => extensionLookup[input.trim().replace(/^\./, "").toLowerCase()] ?? "Unknown MIME type." },
}

function buildPassword(length: number, charset: string): string {
  const bytes = new Uint32Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (value) => charset[value % charset.length]).join("")
}

const calculatorConfigs: Record<string, CalculatorConfig> = {
  "percentage-calculator": { fields: [{ key: "part", label: "Part" }, { key: "whole", label: "Whole" }], calculate: ({ part, whole }) => `${part} is ${((part / whole) * 100).toFixed(2)}% of ${whole}` },
  "profit-margin-calculator": { fields: [{ key: "revenue", label: "Revenue" }, { key: "cost", label: "Cost" }], calculate: ({ revenue, cost }) => [`Profit: ${(revenue - cost).toFixed(2)}`, `Margin: ${(((revenue - cost) / revenue) * 100).toFixed(2)}%`, `Markup: ${(((revenue - cost) / cost) * 100).toFixed(2)}%`].join("\n") },
  "roi-calculator": { fields: [{ key: "gain", label: "Gain" }, { key: "cost", label: "Cost" }], calculate: ({ gain, cost }) => `ROI: ${(((gain - cost) / cost) * 100).toFixed(2)}%` },
  "rice-score-calculator": { fields: [{ key: "reach", label: "Reach", defaultValue: "100" }, { key: "impact", label: "Impact 1-5", defaultValue: "3" }, { key: "confidence", label: "Confidence %", defaultValue: "80" }, { key: "effort", label: "Effort", defaultValue: "5" }], calculate: ({ reach, impact, confidence, effort }) => `RICE score: ${((reach * impact * (confidence / 100)) / Math.max(effort, 0.01)).toFixed(2)}` },
  "vat-calculator": { fields: [{ key: "amount", label: "Amount" }, { key: "rate", label: "VAT rate %", defaultValue: "5" }], calculate: ({ amount, rate }) => [`Tax: ${(amount * rate / 100).toFixed(2)}`, `Total: ${(amount * (1 + rate / 100)).toFixed(2)}`].join("\n") },
  "gst-calculator": { fields: [{ key: "amount", label: "Amount" }, { key: "rate", label: "GST rate %", defaultValue: "18" }], calculate: ({ amount, rate }) => [`GST: ${(amount * rate / 100).toFixed(2)}`, `Total: ${(amount * (1 + rate / 100)).toFixed(2)}`].join("\n") },
  "discount-calculator": { fields: [{ key: "price", label: "Original price" }, { key: "discount", label: "Discount %" }], calculate: ({ price, discount }) => [`Discount: ${(price * discount / 100).toFixed(2)}`, `Sale price: ${(price * (1 - discount / 100)).toFixed(2)}`].join("\n") },
  "loan-payment-calculator": { fields: [{ key: "principal", label: "Loan amount" }, { key: "rate", label: "Annual rate %" }, { key: "months", label: "Months" }], calculate: ({ principal, rate, months }) => { const r = rate / 100 / 12; const p = r ? principal * r / (1 - Math.pow(1 + r, -months)) : principal / months; return [`Monthly payment: ${p.toFixed(2)}`, `Total paid: ${(p * months).toFixed(2)}`, `Interest: ${(p * months - principal).toFixed(2)}`].join("\n") } },
  "break-even-calculator": { fields: [{ key: "fixed", label: "Fixed costs" }, { key: "price", label: "Price per unit" }, { key: "variable", label: "Variable cost per unit" }], calculate: ({ fixed, price, variable }) => `Break-even units: ${Math.ceil(fixed / (price - variable))}` },
  "runway-calculator": { fields: [{ key: "cash", label: "Cash balance" }, { key: "burn", label: "Monthly burn" }], calculate: ({ cash, burn }) => `Runway: ${(cash / burn).toFixed(1)} months` },
  "mrr-calculator": { fields: [{ key: "customers", label: "Customers" }, { key: "price", label: "Average monthly price" }], calculate: ({ customers, price }) => `MRR: ${(customers * price).toFixed(2)}` },
  "churn-calculator": { fields: [{ key: "lost", label: "Lost customers" }, { key: "start", label: "Customers at start" }], calculate: ({ lost, start }) => `Churn: ${((lost / start) * 100).toFixed(2)}%` },
  "ltv-calculator": { fields: [{ key: "revenue", label: "Monthly revenue per customer" }, { key: "margin", label: "Gross margin %" }, { key: "churn", label: "Monthly churn %" }], calculate: ({ revenue, margin, churn }) => `LTV: ${(revenue * (margin / 100) / (churn / 100)).toFixed(2)}` },
  "cac-calculator": { fields: [{ key: "spend", label: "Sales and marketing spend" }, { key: "customers", label: "New customers" }], calculate: ({ spend, customers }) => `CAC: ${(spend / customers).toFixed(2)}` },
  "hourly-rate-calculator": { fields: [{ key: "income", label: "Target annual income" }, { key: "expenses", label: "Annual expenses" }, { key: "hours", label: "Billable hours per year" }], calculate: ({ income, expenses, hours }) => `Hourly rate: ${((income + expenses) / hours).toFixed(2)}` },
  "salary-to-hourly-calculator": { fields: [{ key: "salary", label: "Annual salary" }, { key: "hours", label: "Hours per week", defaultValue: "40" }], calculate: ({ salary, hours }) => `Hourly equivalent: ${(salary / (hours * 52)).toFixed(2)}` },
  "rent-yield-calculator": { fields: [{ key: "rent", label: "Monthly rent" }, { key: "price", label: "Purchase price" }, { key: "expenses", label: "Annual expenses" }], calculate: ({ rent, price, expenses }) => `Net yield: ${(((rent * 12 - expenses) / price) * 100).toFixed(2)}%` },
  "mortgage-affordability-calculator": { fields: [{ key: "income", label: "Monthly income" }, { key: "debt", label: "Monthly debt" }, { key: "ratio", label: "Allowed payment ratio %", defaultValue: "35" }], calculate: ({ income, debt, ratio }) => `Estimated max monthly payment: ${(income * ratio / 100 - debt).toFixed(2)}` },
  "sales-pipeline-calculator": { fields: [{ key: "target", label: "Revenue target" }, { key: "closeRate", label: "Close rate %" }, { key: "deal", label: "Average deal size" }], calculate: ({ target, closeRate, deal }) => [`Pipeline needed: ${(target / (closeRate / 100)).toFixed(2)}`, `Deals needed: ${Math.ceil(target / deal)}`].join("\n") },
  "commission-calculator": { fields: [{ key: "sales", label: "Sales amount" }, { key: "rate", label: "Commission %" }], calculate: ({ sales, rate }) => `Commission: ${(sales * rate / 100).toFixed(2)}` },
  "lead-response-time-calculator": { fields: [{ key: "total", label: "Total response minutes" }, { key: "leads", label: "Leads" }], calculate: ({ total, leads }) => `Average response time: ${(total / leads).toFixed(1)} minutes` },
  "ad-budget-calculator": { fields: [{ key: "target", label: "Revenue target" }, { key: "conversion", label: "Conversion rate %" }, { key: "cpc", label: "Cost per click" }, { key: "value", label: "Value per conversion" }], calculate: ({ target, conversion, cpc, value }) => { const conversions = target / value; const clicks = conversions / (conversion / 100); return [`Conversions needed: ${Math.ceil(conversions)}`, `Clicks needed: ${Math.ceil(clicks)}`, `Budget: ${(clicks * cpc).toFixed(2)}`].join("\n") } },
  "roas-calculator": { fields: [{ key: "revenue", label: "Revenue" }, { key: "spend", label: "Ad spend" }], calculate: ({ revenue, spend }) => `ROAS: ${(revenue / spend).toFixed(2)}x` },
  "ctr-calculator": { fields: [{ key: "clicks", label: "Clicks" }, { key: "impressions", label: "Impressions" }], calculate: ({ clicks, impressions }) => `CTR: ${((clicks / impressions) * 100).toFixed(2)}%` },
  "cpc-calculator": { fields: [{ key: "spend", label: "Spend" }, { key: "clicks", label: "Clicks" }], calculate: ({ spend, clicks }) => `CPC: ${(spend / clicks).toFixed(2)}` },
  "cpa-calculator": { fields: [{ key: "spend", label: "Spend" }, { key: "conversions", label: "Conversions" }], calculate: ({ spend, conversions }) => `CPA: ${(spend / conversions).toFixed(2)}` },
  "cpm-calculator": { fields: [{ key: "spend", label: "Spend" }, { key: "impressions", label: "Impressions" }], calculate: ({ spend, impressions }) => `CPM: ${((spend / impressions) * 1000).toFixed(2)}` },
  "email-open-rate-calculator": { fields: [{ key: "opens", label: "Opens" }, { key: "delivered", label: "Delivered emails" }], calculate: ({ opens, delivered }) => `Open rate: ${((opens / delivered) * 100).toFixed(2)}%` },
  "email-click-rate-calculator": { fields: [{ key: "clicks", label: "Clicks" }, { key: "delivered", label: "Delivered emails" }, { key: "opens", label: "Opens" }], calculate: ({ clicks, delivered, opens }) => [`Click rate: ${((clicks / delivered) * 100).toFixed(2)}%`, `Click-to-open rate: ${((clicks / opens) * 100).toFixed(2)}%`].join("\n") },
  "landing-page-conversion-calculator": { fields: [{ key: "conversions", label: "Conversions" }, { key: "visits", label: "Visits" }], calculate: ({ conversions, visits }) => `Conversion rate: ${((conversions / visits) * 100).toFixed(2)}%` },
  "form-dropoff-calculator": { fields: [{ key: "views", label: "Form views" }, { key: "starts", label: "Starts" }, { key: "completions", label: "Completions" }], calculate: ({ views, starts, completions }) => [`Start rate: ${((starts / views) * 100).toFixed(2)}%`, `Completion rate: ${((completions / starts) * 100).toFixed(2)}%`, `Total conversion: ${((completions / views) * 100).toFixed(2)}%`].join("\n") },
}

function TextUtilityTool({ tool, config }: { tool: PublicTool; config: TextToolConfig }) {
  const [input, setInput] = useState(config.defaultValue ?? "")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  async function run() {
    try {
      setError("")
      setOutput(await config.transform(input))
    } catch (err) {
      setOutput("")
      setError(err instanceof Error ? err.message : "Could not run this tool.")
    }
  }

  return (
    <ToolShell title={tool.title}>
      <div className={`${panelClass} space-y-4`}>
        <label className="block">
          <span className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>{config.label}</span>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={config.placeholder} className={`${textareaClass} min-h-[260px]`} style={{ color: "var(--ink-strong)" }} />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button onClick={run} className={primaryButtonClass}><RefreshCw size={16} /> {config.button}</button>
      </div>
      <OutputPanel output={output} copied={copied} setCopied={setCopied} filename={`${tool.slug}.txt`} />
    </ToolShell>
  )
}

function CalculatorTool({ tool, config }: { tool: PublicTool; config: CalculatorConfig }) {
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(config.fields.map((field) => [field.key, field.defaultValue ?? ""])))
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  function calculate() {
    const numbers = Object.fromEntries(config.fields.map((field) => [field.key, Number(values[field.key] || 0)]))
    setOutput(config.calculate(numbers))
  }

  return (
    <ToolShell title={tool.title}>
      <div className={`${panelClass} space-y-4`}>
        <div className="grid sm:grid-cols-2 gap-3">
          {config.fields.map((field) => (
            <label key={field.key} className="block">
              <span className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>{field.label}</span>
              <input type="number" value={values[field.key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} placeholder={field.placeholder ?? "0"} className={inputClass} style={{ color: "var(--ink-strong)" }} />
            </label>
          ))}
        </div>
        <button onClick={calculate} className={primaryButtonClass}>Calculate</button>
      </div>
      <OutputPanel output={output} copied={copied} setCopied={setCopied} filename={`${tool.slug}.txt`} />
    </ToolShell>
  )
}

function PasswordTool({ tool, mode }: { tool: PublicTool; mode: "password" | "passphrase" }) {
  const [length, setLength] = useState(mode === "password" ? "20" : "5")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const wordPool = ["ruby", "signal", "orbit", "matrix", "field", "north", "clean", "launch", "system", "vault", "pixel", "craft", "stone", "spark"]

  function generate() {
    const count = Math.max(3, Math.min(64, Number(length) || 12))
    if (mode === "passphrase") {
      const bytes = new Uint32Array(count)
      crypto.getRandomValues(bytes)
      setOutput(Array.from(bytes, (value) => wordPool[value % wordPool.length]).join("-"))
    } else {
      setOutput(buildPassword(count, "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@$%*-_=+"))
    }
  }

  return (
    <ToolShell title={tool.title}>
      <div className={`${panelClass} space-y-4`}>
        <label className="block">
          <span className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>{mode === "password" ? "Length" : "Word count"}</span>
          <input type="number" value={length} onChange={(event) => setLength(event.target.value)} className={inputClass} style={{ color: "var(--ink-strong)" }} />
        </label>
        <button onClick={generate} className={primaryButtonClass}>Generate</button>
      </div>
      <OutputPanel output={output} copied={copied} setCopied={setCopied} filename={`${tool.slug}.txt`} />
    </ToolShell>
  )
}

function UnitConverterTool({ tool }: { tool: PublicTool }) {
  const [value, setValue] = useState("1")
  const [from, setFrom] = useState("meter")
  const [to, setTo] = useState("foot")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const factors: Record<string, number> = { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, foot: 0.3048, inch: 0.0254, mile: 1609.344 }

  function convert() {
    setOutput(`${value} ${from} = ${((Number(value) * factors[from]) / factors[to]).toFixed(6)} ${to}`)
  }

  return (
    <ToolShell title={tool.title}>
      <div className={`${panelClass} space-y-4`}>
        <input type="number" value={value} onChange={(event) => setValue(event.target.value)} className={inputClass} style={{ color: "var(--ink-strong)" }} />
        <div className="grid sm:grid-cols-2 gap-3">
          {[["From", from, setFrom], ["To", to, setTo]].map(([label, selected, setter]) => (
            <label key={String(label)} className="block">
              <span className="text-xs mb-2 block" style={{ color: "var(--ink-muted)" }}>{String(label)}</span>
              <select value={String(selected)} onChange={(event) => (setter as (value: string) => void)(event.target.value)} className={inputClass} style={{ color: "var(--ink-strong)" }}>
                {Object.keys(factors).map((unit) => <option key={unit}>{unit}</option>)}
              </select>
            </label>
          ))}
        </div>
        <button onClick={convert} className={primaryButtonClass}>Convert</button>
      </div>
      <OutputPanel output={output} copied={copied} setCopied={setCopied} filename="unit-conversion.txt" />
    </ToolShell>
  )
}

function StructuredDocumentTool({ tool }: { tool: PublicTool }) {
  const [context, setContext] = useState("")
  const [audience, setAudience] = useState("")
  const [notes, setNotes] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  function generate() {
    const isChecklist = tool.title.toLowerCase().includes("checklist")
    const header = `${tool.title}\n\nContext: ${context || "Not specified"}\nAudience: ${audience || "Not specified"}\n`
    const keywords = tool.keywords.map((keyword) => `- ${titleCase(keyword)}`).join("\n")
    const sections = isChecklist
      ? ["Confirm the goal", "Collect required inputs", "Check owner and deadline", "Review risks and edge cases", "Verify final output", "Save notes and next action"]
      : ["Goal", "Inputs", "Recommended structure", "Draft output", "Review notes", "Next action"]
    setOutput([
      header,
      `Useful focus areas:\n${keywords}`,
      "",
      isChecklist ? "Checklist:" : "Generated structure:",
      ...sections.map((section, index) => `${index + 1}. ${section}`),
      "",
      notes ? `Notes:\n${notes}` : "Notes:\nAdd any project-specific notes here.",
      "",
      "9Ruby next step:",
      `Use this output as the first draft, then ask 9Ruby to turn it into a production-ready ${tool.category.toLowerCase()} asset or workflow.`,
    ].join("\n"))
  }

  return (
    <ToolShell title={tool.title}>
      <div className={`${panelClass} space-y-4`}>
        <input value={context} onChange={(event) => setContext(event.target.value)} placeholder="Project, product, or situation" className={inputClass} style={{ color: "var(--ink-strong)" }} />
        <input value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="Audience or user" className={inputClass} style={{ color: "var(--ink-strong)" }} />
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Extra notes, constraints, examples, links, or requirements" className={`${textareaClass} min-h-[180px]`} style={{ color: "var(--ink-strong)" }} />
        <button onClick={generate} className={primaryButtonClass}>Generate</button>
      </div>
      <OutputPanel output={output} copied={copied} setCopied={setCopied} filename={`${tool.slug}.txt`} />
    </ToolShell>
  )
}

function ToolShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/62">
        {title} runs in your browser. No login required.
      </div>
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
        {children}
      </div>
    </div>
  )
}

function OutputPanel({ output, copied, setCopied, filename }: { output: string; copied: boolean; setCopied: (value: boolean) => void; filename: string }) {
  return (
    <div className={`${panelClass} space-y-4`}>
      <h3 className="text-sm font-semibold" style={{ color: "var(--ink-strong)" }}>Output</h3>
      <textarea value={output} readOnly placeholder="Output appears here..." className={`${textareaClass} min-h-[320px] font-mono`} style={{ color: "var(--ink-strong)" }} />
      <div className="flex flex-wrap gap-3">
        <button onClick={() => copyText(output, () => setCopied(!copied))} disabled={!output} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button onClick={() => downloadText(output, filename)} disabled={!output} className={secondaryButtonClass} style={{ color: "var(--ink-muted)" }}>
          <Download size={16} /> Download
        </button>
      </div>
    </div>
  )
}

export default function GenericToolRunner({ tool }: { tool: PublicTool }) {
  if (textToolConfigs[tool.slug]) return <TextUtilityTool tool={tool} config={textToolConfigs[tool.slug]} />
  if (calculatorConfigs[tool.slug]) return <CalculatorTool tool={tool} config={calculatorConfigs[tool.slug]} />
  if (tool.slug === "password-generator") return <PasswordTool tool={tool} mode="password" />
  if (tool.slug === "passphrase-generator") return <PasswordTool tool={tool} mode="passphrase" />
  if (tool.slug === "unit-converter") return <UnitConverterTool tool={tool} />

  return <StructuredDocumentTool tool={tool} />
}
