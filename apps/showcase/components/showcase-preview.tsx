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
import { PreviewScopeProvider } from "@workspace/shadcn-ui/lib/preview-scope"
import {
  PreviewNavigationProvider,
  usePreviewLocation,
} from "@/components/preview-navigation"

const viewports = [
  { name: "Desktop", width: 1280, icon: RiComputerLine },
  { name: "Tablet", width: 768, icon: RiTabletLine },
  { name: "Mobile", width: 375, icon: RiSmartphoneLine },
] as const

interface ShowcasePreviewProps {
  readonly src: string
  readonly title: string
  readonly children: React.ReactNode
  readonly renderLayout: (parts: {
    controls: React.ReactNode
    preview: React.ReactNode
  }) => React.ReactNode
}

/** An interactive, independently themed viewport for one showcase example. */
export function ShowcasePreview({
  src,
  title,
  children,
  renderLayout,
}: ShowcasePreviewProps) {
  const [viewport, setViewport] = React.useState<(typeof viewports)[number]>(
    viewports[0]
  )
  const [themeMode, setThemeMode] = React.useState<"page" | "light" | "dark">(
    "page"
  )
  const [pageTheme, setPageTheme] = React.useState<"light" | "dark" | null>(
    null
  )
  const theme = themeMode === "page" ? pageTheme : themeMode
  const themeDescription =
    themeMode === "page"
      ? pageTheme
        ? `page (${pageTheme})`
        : "page"
      : themeMode
  const nextThemeMode =
    themeMode === "page" ? "light" : themeMode === "light" ? "dark" : "page"
  const [availableWidth, setAvailableWidth] = React.useState(0)
  const [height, setHeight] = React.useState(160)
  const [accentTheme, setAccentTheme] = React.useState("blue")
  const [previewRoot, setPreviewRoot] = React.useState<HTMLDivElement | null>(
    null
  )
  const navigation = usePreviewLocation(src)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const previewId = React.useId()
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
    const root = document.documentElement
    const syncTheme = () => {
      setAccentTheme(root.dataset.theme ?? "blue")
      setPageTheme(root.classList.contains("dark") ? "dark" : "light")
    }
    syncTheme()
    const observer = new MutationObserver(syncTheme)
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    })
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const content = contentRef.current
    if (!content) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry && entry.contentRect.height > 0) {
        // contentRect is unscaled; transforms must not shrink the measured layout.
        setHeight(
          Math.max(
            160,
            Math.ceil(entry.borderBoxSize[0]?.blockSize ?? content.offsetHeight)
          )
        )
      }
    })
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

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
              aria-controls={previewId}
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
            href={src + navigation.suffix}
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
          aria-label={`Preview theme: ${themeDescription}`}
          aria-controls={previewId}
          title={`Theme: ${themeDescription}. Switch to ${nextThemeMode === "page" ? "page theme" : `${nextThemeMode} mode`}`}
          onClick={() => setThemeMode(nextThemeMode)}
        >
          {themeMode === "page" ? (
            <RiComputerLine className="size-3.5" aria-hidden="true" />
          ) : theme === "dark" ? (
            <RiMoonLine className="size-3.5" aria-hidden="true" />
          ) : (
            <RiSunLine className="size-3.5" aria-hidden="true" />
          )}
          <span className="sr-only">
            {themeMode === "page"
              ? "Page"
              : theme === "dark"
                ? "Dark"
                : "Light"}
          </span>
        </Button>
      </div>
    </div>
  )
  const preview = (
    <div ref={containerRef} className="min-w-0 rounded-lg border bg-muted/20">
      <div
        className="relative mx-auto"
        style={{ width: viewport.width * scale, height: height * scale }}
      >
        <div
          ref={setPreviewRoot}
          id={previewId}
          role="region"
          aria-label={`${title} preview`}
          data-preview-root=""
          data-preview-theme={theme ?? undefined}
          data-preview-theme-mode={themeMode}
          data-theme={theme ? accentTheme : undefined}
          className={`${theme ?? ""} @container/showcase-preview absolute top-0 left-0 origin-top-left rounded-lg bg-background text-foreground`}
          style={{
            width: viewport.width,
            minHeight: height,
            transform: `scale(${scale})`,
            colorScheme: theme ?? "inherit",
          }}
        >
          <PreviewScopeProvider value={previewRoot}>
            <PreviewNavigationProvider value={navigation}>
              <div
                ref={contentRef}
                className="flow-root min-h-40 overflow-x-auto rounded-lg p-6"
              >
                {children}
              </div>
            </PreviewNavigationProvider>
          </PreviewScopeProvider>
        </div>
      </div>
    </div>
  )

  return renderLayout({ controls, preview })
}
