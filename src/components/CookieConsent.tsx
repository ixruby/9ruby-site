"use client"
import { useState, useEffect } from "react"

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="rounded-2xl border border-white/[0.06] bg-black/95 backdrop-blur-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-white/50 max-w-lg">
            We use cookies to improve your experience. By continuing to use this site, you agree to our{" "}
            <a href="/privacy" className="text-white/70 underline underline-offset-2 hover:text-white transition-colors">
              privacy policy
            </a>.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={decline}
              className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="text-sm font-medium bg-white text-black rounded-full px-6 py-2 hover:bg-white/90 transition-all"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
