"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { ArrowUpRight } from "lucide-react"
import { vercelShowcaseProjects, type VercelShowcaseProject } from "@/lib/vercel-projects"

const FEATURED_PROJECT_NAMES = [
  "brandkit",
  "design-agency",
  "clearpath",
  "bake-today",
  "forward-2026",
  "hypersonic-9ruby",
  "launchgrid",
  "monocore",
] as const

function displayName(name: string) {
  return name
    .replace(/^v\d+-/i, "")
    .replace(/-9ruby$/i, "")
    .replace(/[-_]+/g, " ")
    .trim()
}

function projectPreviewStyle(project: VercelShowcaseProject, stackIndex: number, activeIndex: number) {
  const url = project.url ?? ""
  const offset = stackIndex
  const rotate = offset === 0 ? 0 : offset % 2 === 0 ? -2.2 : 2.4

  return {
    "--project-preview-image": `url("https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1100")`,
    "--swap-x": `${offset * 18}px`,
    "--swap-y": `${offset * 14}px`,
    "--swap-scale": String(1 - offset * 0.045),
    "--swap-rotate": `${rotate}deg`,
    "--swap-z": String(8 - offset),
    "--swap-opacity": String(1 - offset * 0.1),
    "--swap-active": activeIndex,
  } as CSSProperties
}

export default function HomeCardSwap() {
  const projects = useMemo(() => {
    const liveProjects = vercelShowcaseProjects.filter((project) => Boolean(project.url))
    const featured = FEATURED_PROJECT_NAMES.map((name) => liveProjects.find((project) => project.name === name)).filter(
      (project): project is VercelShowcaseProject => Boolean(project),
    )

    return featured.length >= 5 ? featured : liveProjects.slice(0, 8)
  }, [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (paused || media.matches || projects.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % projects.length)
    }, 2800)

    return () => window.clearInterval(timer)
  }, [paused, projects.length])

  const stackedProjects = projects.map((project, index) => ({
    project,
    stackIndex: (index - activeIndex + projects.length) % projects.length,
  }))

  const activeProject = projects[activeIndex]

  return (
    <div
      className="home-card-swap"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="home-card-swap__stage" aria-label="Featured live website previews">
        {stackedProjects.map(({ project, stackIndex }) => {
          const isVisible = stackIndex < 5
          const isActive = stackIndex === 0

          return (
            <a
              key={project.name}
              href={project.url ?? "/templates"}
              target="_blank"
              rel="noopener noreferrer"
              className={`home-card-swap__card ${isActive ? "is-active" : ""}`}
              style={projectPreviewStyle(project, stackIndex, activeIndex)}
              aria-label={`Open ${displayName(project.name)} preview`}
              aria-hidden={!isVisible}
              tabIndex={isActive ? 0 : -1}
            >
              <span className="home-card-swap__screen" aria-hidden />
              <span className="home-card-swap__name">{displayName(project.name)}</span>
              <span className="home-card-swap__open" aria-hidden>
                <ArrowUpRight size={15} />
              </span>
            </a>
          )
        })}
      </div>

      <div className="home-card-swap__footer">
        <span>{activeProject ? displayName(activeProject.name) : "Live preview"}</span>
        <div className="home-card-swap__controls" aria-label="Choose featured template preview">
          {projects.map((project, index) => (
            <button
              key={project.name}
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              aria-label={`Show ${displayName(project.name)}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
