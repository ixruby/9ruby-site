"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

type Theme = "light" | "dark"

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  localStorage.setItem("theme", theme)
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const initial = (document.documentElement.dataset.theme as Theme) || "light"
    requestAnimationFrame(() => {
      setTheme(initial)
      setReady(true)
    })
  }, [])

  const nextTheme = theme === "dark" ? "light" : "dark"

  return (
    <button
      type="button"
      aria-label={ready ? `Switch to ${nextTheme} mode` : "Toggle theme"}
      aria-pressed={theme === "dark"}
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark"
        setTheme(next)
        applyTheme(next)
      }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
      style={{
        background: "var(--surface-muted)",
        border: "1px solid var(--border-subtle)",
        color: "var(--ink-muted)",
      }}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}
