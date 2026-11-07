"use client"

import {
  RiComputerLine,
  RiExternalLinkLine,
  RiMoonLine,
  RiSmartphoneLine,
  RiSunLine,
  RiTabletLine,
} from "@remixicon/react"
import * as React from "react"

import { Button } from "@workspace/shadcn-ui"

const viewports = [
  { name: "Desktop", width: 1280, icon: RiComputerLine },
  { name: "Tablet", width: 768, icon: RiTabletLine },
  { name: "Mobile", width: 375, icon: RiSmartphoneLine },
] as const

function subscribeToLocation(callback: () => void) {
  window.addEventListener("popstate", callback)
  window.addEventListener("hashchange", callback)
  return () => {
    window.removeEventListener("popstate", callback)
    window.removeEventListener("hashchange", callback)
  }
}

const getLocationSuffix = () => window.location.search + window.location.hash
const getServerLocationSuffix = () => ""

interface ShowcasePreviewProps {
  readonly src: string
  readonly title: string
  readonly renderLayout: (parts: {
    controls: React.ReactNode
    preview: React.ReactNode
  }) => React.ReactNode
}

/** An interactive, independently themed viewport for one showcase example. */
export function ShowcasePreview({
  src,
  title,
  renderLayout,
}: ShowcasePreviewProps) {
  const [viewport, setViewport] = React.useState<(typeof viewports)[number]>(
    viewports[0]
  )
  const [theme, setTheme] = React.useState<"light" | "dark">("light")
  const [availableWidth, setAvailableWidth] = React.useState(0)
  const [height, setHeight] = React.useState(160)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const locationSuffix = React.useSyncExternalStore(
    subscribeToLocation,
    getLocationSuffix,
    getServerLocationSuffix
  )
  const frameSrc = src + locationSuffix
  const containerRef = React.useRef<HTMLDivElement>(null)
  const frameRef = React.useRef<HTMLIFrameElement>(null)
  const frameId = React.useId()
  const scale = availableWidth
    ? Math.min(1, availableWidth / viewport.width)
    : 1

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(([entry]) => {
      // Retain dimensions while the Preview tab is hidden.
      if (entry && entry.contentRect.width > 0) {
        setAvailableWidth(entry.contentRect.width)
      }
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    let cleanupDocument = () => {}

    function connectDocument() {
      cleanupDocument()
      const frameDocument = frame?.contentDocument
      if (!frameDocument) return
      const root = frameDocument.documentElement

      function syncTheme() {
        root.classList.toggle("dark", theme === "dark")
        root.classList.toggle("light", theme === "light")
        root.setAttribute(
          "data-theme",
          document.documentElement.dataset.theme ?? "blue"
        )
        root.style.setProperty("color-scheme", theme)
      }

      syncTheme()
      const themeObserver = new MutationObserver(syncTheme)
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      })

      const resizeObserver = new ResizeObserver(([entry]) => {
        if (entry && entry.contentRect.height > 0) {
          setHeight(
            Math.max(
              160,
              Math.ceil(entry.target.getBoundingClientRect().height)
            )
          )
        }
      })
      let observedRoot: HTMLElement | null = null
      const observeContent = () => {
        const content = frameDocument.getElementById("showcase-preview-root")
        if (content && content !== observedRoot) {
          resizeObserver.disconnect()
          resizeObserver.observe(content)
          observedRoot = content
        }
      }
      // Streaming or cached iframe HTML can finish before parent hydration.
      // Observe both the current document and later load/stream completion.
      observeContent()
      const frameWindow = frameDocument.defaultView
      const updatePreviewUrl = () => {
        if (!frameWindow) return
        const { pathname, search, hash } = frameWindow.location
        setPreviewUrl(pathname + search + hash)
      }
      const contentObserver = new MutationObserver(() => {
        observeContent()
        updatePreviewUrl()
      })
      frameWindow?.addEventListener("hashchange", updatePreviewUrl)
      frameWindow?.addEventListener("popstate", updatePreviewUrl)
      contentObserver.observe(frameDocument, { childList: true, subtree: true })
      cleanupDocument = () => {
        themeObserver.disconnect()
        resizeObserver.disconnect()
        contentObserver.disconnect()
        frameWindow?.removeEventListener("hashchange", updatePreviewUrl)
        frameWindow?.removeEventListener("popstate", updatePreviewUrl)
      }
    }

    connectDocument()
    frame.addEventListener("load", connectDocument)
    return () => {
      frame.removeEventListener("load", connectDocument)
      cleanupDocument()
    }
  }, [theme, frameSrc])

  const controls = (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="Preview viewport"
          className="flex h-8 items-center gap-0.5 rounded-md border bg-background p-0.5"
        >
          {viewports.map((option) => (
            <Button
              key={option.name}
              type="button"
              variant={viewport.name === option.name ? "secondary" : "ghost"}
              size="icon-sm"
              aria-label={`${option.name} preview`}
              aria-pressed={viewport.name === option.name}
              aria-controls={frameId}
              title={`${option.name} (${option.width}px)`}
              onClick={() => setViewport(option)}
            >
              <option.icon className="size-4" aria-hidden="true" />
            </Button>
          ))}
        </div>
        <span aria-live="polite" className="sr-only">
          {viewport.width}px
          {scale < 1 && ` · ${Math.round(scale * 100)}%`}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon-sm">
          <a
            href={previewUrl ?? frameSrc}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open preview in new tab"
            title="Open or share this preview"
          >
            <RiExternalLinkLine className="size-4" aria-hidden="true" />
          </a>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xs"
          aria-label="Dark preview"
          aria-pressed={theme === "dark"}
          aria-controls={frameId}
          title={`Switch preview to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "dark" ? (
            <RiMoonLine className="size-3.5" aria-hidden="true" />
          ) : (
            <RiSunLine className="size-3.5" aria-hidden="true" />
          )}
          <span className="sr-only">{theme === "dark" ? "Dark" : "Light"}</span>
        </Button>
      </div>
    </div>
  )
  const preview = (
    <div
      ref={containerRef}
      className="min-w-0 overflow-hidden rounded-lg border bg-muted/20"
    >
      <div
        className="relative mx-auto"
        style={{ width: viewport.width * scale, height: height * scale }}
      >
        <iframe
          ref={frameRef}
          id={frameId}
          title={`${title} preview`}
          src={frameSrc}
          className="absolute top-0 left-0 block origin-top-left border-0"
          style={{
            width: viewport.width,
            height,
            transform: `scale(${scale})`,
          }}
        />
      </div>
    </div>
  )

  return renderLayout({ controls, preview })
}
