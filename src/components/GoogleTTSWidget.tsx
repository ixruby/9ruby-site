"use client"

import { useRef, useState } from "react"
import { Mic, Play, Square, Loader, AlertCircle, Sparkles } from "lucide-react"

const DEMO_PHRASES = [
  "Hi, this is your AI sales agent. I'm calling about a limited-time offer for your business.",
  "Thank you for calling support. I'm here to help resolve your issue quickly.",
  "Your appointment has been confirmed for tomorrow at 2 PM. Have a great day!",
  "We noticed your payment is overdue. I can help set up a payment plan right now.",
]

type Status = "idle" | "loading" | "playing" | "error" | "unconfigured"

export default function GoogleTTSWidget() {
  const [status, setStatus] = useState<Status>("idle")
  const [text, setText] = useState(DEMO_PHRASES[0])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setStatus("idle")
  }

  const play = async () => {
    if (status === "loading") return
    stop()
    setStatus("loading")
    setErrorMessage(null)

    try {
      const res = await fetch("/api/google-tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        cache: "no-store",
      })

      if (res.status === 503) {
        const data = (await res.json()) as { code?: string }
        if (data.code === "GOOGLE_TTS_NOT_CONFIGURED") {
          setStatus("unconfigured")
          setErrorMessage("Add GEMINI_API_KEY to enable live TTS preview.")
          return
        }
      }

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error || "TTS failed")
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio

      audio.onended = () => {
        setStatus("idle")
        URL.revokeObjectURL(url)
        audioRef.current = null
      }

      audio.onerror = () => {
        setStatus("error")
        setErrorMessage("Audio playback failed.")
        URL.revokeObjectURL(url)
        audioRef.current = null
      }

      setStatus("playing")
      await audio.play()
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "TTS request failed.")
    }
  }

  return (
    <div className="rounded-3xl overflow-hidden bg-[#0E0E12]" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={13} style={{ color: "#4285F4" }} />
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Google Gemini TTS
          </span>
        </div>
        <span
          className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
          style={{
            background:
              status === "playing"
                ? "rgba(66,133,244,0.2)"
                : status === "unconfigured" || status === "error"
                ? "rgba(248,113,113,0.16)"
                : "rgba(255,255,255,0.08)",
            color:
              status === "playing"
                ? "#93c5fd"
                : status === "unconfigured" || status === "error"
                ? "#f87171"
                : "rgba(255,255,255,0.72)",
          }}
        >
          {status === "playing" ? "Speaking" : status === "loading" ? "Generating" : status === "unconfigured" || status === "error" ? "Unavailable" : "Ready"}
        </span>
      </div>

      <div className="px-6 pb-6">
        <div
          className="rounded-2xl p-5"
          style={{
            minHeight: 420,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Demo phrase selector */}
          <div className="mb-5">
            <p className="text-[11px] font-mono uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
              Sample scripts
            </p>
            <div className="grid grid-cols-1 gap-2">
              {DEMO_PHRASES.map((phrase, i) => (
                <button
                  key={i}
                  onClick={() => { setText(phrase); stop() }}
                  className="text-left text-xs px-3.5 py-2.5 rounded-xl transition-all duration-200"
                  style={{
                    background: text === phrase ? "rgba(66,133,244,0.15)" : "rgba(255,255,255,0.04)",
                    border: text === phrase ? "1px solid rgba(66,133,244,0.35)" : "1px solid rgba(255,255,255,0.06)",
                    color: text === phrase ? "#93c5fd" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* Custom input */}
          <div className="mb-5">
            <p className="text-[11px] font-mono uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              Or type custom text
            </p>
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value.slice(0, 500)); stop() }}
              rows={3}
              placeholder="Type anything to hear Google TTS..."
              className="w-full rounded-xl text-sm resize-none outline-none px-3.5 py-3 transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#F8F7F4",
              }}
            />
            <p className="text-right text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
              {text.length}/500
            </p>
          </div>

          {/* Error state */}
          {(status === "error" || status === "unconfigured") && errorMessage && (
            <div
              className="flex items-start gap-2.5 rounded-xl px-4 py-3 mb-4 text-sm"
              style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}
            >
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              {errorMessage}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-3">
            {status === "playing" ? (
              <button
                onClick={stop}
                className="flex-1 h-11 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300"
                style={{ background: "rgba(66,133,244,0.2)", border: "1px solid rgba(66,133,244,0.35)", color: "#93c5fd" }}
              >
                <Square size={14} fill="currentColor" /> Stop
              </button>
            ) : (
              <button
                onClick={play}
                disabled={status === "loading" || !text.trim()}
                className="flex-1 h-11 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-40"
                style={{ background: "rgba(66,133,244,0.2)", border: "1px solid rgba(66,133,244,0.35)", color: "#93c5fd" }}
              >
                {status === "loading" ? (
                  <><Loader size={14} className="animate-spin" /> Generating audio...</>
                ) : (
                  <><Play size={14} fill="currentColor" /> Play with Google TTS</>
                )}
              </button>
            )}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Mic size={16} style={{ color: status === "playing" ? "#93c5fd" : "rgba(255,255,255,0.35)" }} />
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center mt-5 text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
            Powered by Gemini 2.5 Flash TTS · Kore voice · Sub-500ms
          </p>
        </div>
      </div>
    </div>
  )
}
