"use client"

import Link from "next/link"
import { useEffect, useEffectEvent, useRef, useState } from "react"
import { AlertCircle, LoaderCircle, Mic, WifiOff } from "lucide-react"

const WIDGET_SCRIPT_ID = "elevenlabs-convai-widget-script"
const WIDGET_SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed"

type WidgetStatus =
  | "idle"
  | "loading"
  | "ready"
  | "offline"
  | "unconfigured"
  | "error"

async function postWidgetEvent(type: string, meta?: Record<string, unknown>) {
  try {
    await fetch("/api/elevenlabs/widget-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, meta }),
      cache: "no-store",
    })
  } catch {
    // Logging must never break the widget flow.
  }
}

export default function ElevenLabsSupportWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<WidgetStatus>("idle")
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [scriptReady, setScriptReady] = useState(false)

  const logEvent = useEffectEvent(async (type: string, meta?: Record<string, unknown>) => {
    await postWidgetEvent(type, meta)
  })

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const handleNetworkChange = () => {
      if (navigator.onLine) {
        setStatus((current) => (current === "offline" ? "idle" : current))
      } else {
        setStatus("offline")
        void logEvent("widget.offline")
      }
    }

    handleNetworkChange()
    window.addEventListener("online", handleNetworkChange)
    window.addEventListener("offline", handleNetworkChange)

    return () => {
      window.removeEventListener("online", handleNetworkChange)
      window.removeEventListener("offline", handleNetworkChange)
    }
  }, [logEvent])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    if (window.customElements?.get("elevenlabs-convai")) {
      setScriptReady(true)
      return
    }

    const existingScript = document.getElementById(WIDGET_SCRIPT_ID) as HTMLScriptElement | null
    if (existingScript) {
      const onLoad = () => setScriptReady(true)
      const onError = () => {
        setStatus("error")
        setErrorMessage("The voice widget script failed to load.")
        void logEvent("widget.script_error")
      }

      existingScript.addEventListener("load", onLoad)
      existingScript.addEventListener("error", onError)

      return () => {
        existingScript.removeEventListener("load", onLoad)
        existingScript.removeEventListener("error", onError)
      }
    }

    const script = document.createElement("script")
    script.id = WIDGET_SCRIPT_ID
    script.src = WIDGET_SCRIPT_SRC
    script.async = true
    script.type = "text/javascript"
    script.onload = () => setScriptReady(true)
    script.onerror = () => {
      setStatus("error")
      setErrorMessage("The voice widget script failed to load.")
      void logEvent("widget.script_error")
    }

    document.body.appendChild(script)
  }, [logEvent])

  useEffect(() => {
    if (status === "offline") {
      return
    }

    let cancelled = false

    const bootstrapWidget = async () => {
      setStatus("loading")
      setErrorMessage(null)

      try {
        const response = await fetch("/api/elevenlabs/signed-url", {
          method: "GET",
          cache: "no-store",
        })
        const payload = (await response.json()) as {
          signedUrl?: string
          error?: string
          code?: string
        }

        if (cancelled) {
          return
        }

        if (response.status === 503 && payload.code === "ELEVENLABS_NOT_CONFIGURED") {
          setStatus("unconfigured")
          setErrorMessage("Add your ElevenLabs agent ID and API key to enable live voice support.")
          return
        }

        if (!response.ok || !payload.signedUrl) {
          throw new Error(payload.error || "Unable to start the voice support session.")
        }

        setSignedUrl(payload.signedUrl)
      } catch (error) {
        setStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "Unable to start the voice support session.")
        void logEvent("widget.bootstrap_error", {
          message: error instanceof Error ? error.message : "unknown",
        })
      }
    }

    void bootstrapWidget()

    return () => {
      cancelled = true
    }
  }, [status, logEvent])

  useEffect(() => {
    if (!scriptReady || !signedUrl || !containerRef.current) {
      return
    }

    const container = containerRef.current
    container.innerHTML = ""

    const widget = document.createElement("elevenlabs-convai")
    widget.setAttribute("signed-url", signedUrl)
    widget.setAttribute("variant", "expanded")
    widget.setAttribute("avatar-orb-color-1", "#C41A3B")
    widget.setAttribute("avatar-orb-color-2", "#E8C9CF")
    widget.setAttribute("action-text", "Talk to 9Ruby Support")
    widget.setAttribute("start-call-text", "Start voice support")
    widget.setAttribute("end-call-text", "End call")
    widget.setAttribute("expand-text", "Open support")
    widget.setAttribute("listening-text", "Listening...")
    widget.setAttribute("speaking-text", "9Ruby is responding")
    widget.setAttribute(
      "dynamic-variables",
      JSON.stringify({
        source: "9ruby-home",
        page: "/services/voice-agents",
        channel: "website-widget",
      }),
    )

    const handleCall = (event: Event) => {
      const detail = (event as CustomEvent<{ config?: { clientTools?: Record<string, unknown> } }>).detail

      if (detail?.config) {
        detail.config.clientTools = {
          openSupportEscalation: ({ path }: { path?: string }) => {
            const href = path || "/contact?source=voice-support"
            void logEvent("widget.escalation_requested", { href })
            window.location.href = href
          },
        }
      }

      void logEvent("widget.call_started")
    }

    widget.addEventListener("elevenlabs-convai:call", handleCall as EventListener)
    container.appendChild(widget)
    setStatus("ready")
    void logEvent("widget.ready")

    return () => {
      widget.removeEventListener("elevenlabs-convai:call", handleCall as EventListener)
      container.innerHTML = ""
    }
  }, [scriptReady, signedUrl, logEvent])

  const retry = () => {
    setSignedUrl(null)
    setErrorMessage(null)
    setStatus(navigator.onLine ? "idle" : "offline")
  }

  return (
    <div className="rounded-3xl overflow-hidden bg-[#0E0E12]" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
          Live Support Widget
        </span>
        <span
          className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
          style={{
            background:
              status === "ready"
                ? "rgba(34,197,94,0.16)"
                : status === "offline"
                  ? "rgba(234,179,8,0.16)"
                  : "rgba(255,255,255,0.08)",
            color:
              status === "ready"
                ? "#86efac"
                : status === "offline"
                  ? "#fde68a"
                  : "rgba(255,255,255,0.72)",
          }}
        >
          {status === "ready" ? "Voice + Text Ready" : status === "offline" ? "Offline Fallback" : "Booting"}
        </span>
      </div>

      <div className="px-6 pb-6">
        <div
          className="rounded-2xl p-4 md:p-5"
          style={{
            minHeight: 420,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {status === "ready" ? (
            <div ref={containerRef} />
          ) : (
            <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
              {status === "loading" || status === "idle" ? (
                <>
                  <LoaderCircle className="mb-4 animate-spin" size={28} style={{ color: "#C41A3B" }} />
                  <div className="mb-2 text-base font-medium" style={{ color: "#F8F7F4" }}>
                    Preparing voice support
                  </div>
                  <p className="max-w-sm text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
                    We&apos;re creating a secure session with ElevenLabs and loading the multimodal widget.
                  </p>
                </>
              ) : null}

              {status === "offline" ? (
                <>
                  <WifiOff className="mb-4" size={28} style={{ color: "#facc15" }} />
                  <div className="mb-2 text-base font-medium" style={{ color: "#F8F7F4" }}>
                    Low connectivity detected
                  </div>
                  <p className="max-w-sm text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
                    Voice support needs a stable connection. Use chat fallback or contact the team directly.
                  </p>
                </>
              ) : null}

              {status === "unconfigured" || status === "error" ? (
                <>
                  <AlertCircle className="mb-4" size={28} style={{ color: "#f87171" }} />
                  <div className="mb-2 text-base font-medium" style={{ color: "#F8F7F4" }}>
                    Widget unavailable
                  </div>
                  <p className="max-w-sm text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
                    {errorMessage || "The voice support session could not be started."}
                  </p>
                </>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={retry}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#F8F7F4",
                  }}
                >
                  <Mic size={14} />
                  Retry widget
                </button>
                <Link
                  href="/contact?source=voice-support"
                  className="inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.82)",
                  }}
                >
                  Escalate to human
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
