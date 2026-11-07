"use client"

import * as React from "react"

const eventName = "showcase-preview-navigation"
const stateKey = "showcasePreviews"

interface PreviewNavigation {
  readonly src: string
  readonly suffix: string
  readonly navigate: (href: string) => void
}

const PreviewNavigationContext = React.createContext<PreviewNavigation | null>(
  null
)
export const usePreviewNavigation = () =>
  React.useContext(PreviewNavigationContext)

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback)
  window.addEventListener("hashchange", callback)
  window.addEventListener(eventName, callback)
  return () => {
    window.removeEventListener("popstate", callback)
    window.removeEventListener("hashchange", callback)
    window.removeEventListener(eventName, callback)
  }
}

/** Each embedded example owns its URL state; browser Back/Forward still work. */
export function usePreviewLocation(src: string) {
  const suffix = React.useSyncExternalStore(
    subscribe,
    () => {
      const saved: unknown = window.history.state?.[stateKey]?.[src]
      return typeof saved === "string"
        ? saved
        : window.location.search + window.location.hash
    },
    () => ""
  )
  const navigate = React.useCallback(
    (href: string) => {
      const saved: unknown = window.history.state?.[stateKey]?.[src]
      const currentSuffix =
        typeof saved === "string"
          ? saved
          : window.location.search + window.location.hash
      const next = new URL(href, window.location.origin + src + currentSuffix)
      const nextSuffix = next.search + next.hash
      if (nextSuffix === currentSuffix) return
      // Retain Next.js history fields and every other example's independent state.
      const currentState = window.history.state ?? {}
      if (typeof saved !== "string") {
        window.history.replaceState(
          {
            ...currentState,
            [stateKey]: { ...currentState[stateKey], [src]: currentSuffix },
          },
          "",
          window.location.href
        )
      }
      window.history.pushState(
        {
          ...window.history.state,
          [stateKey]: {
            ...window.history.state?.[stateKey],
            [src]: nextSuffix,
          },
        },
        "",
        window.location.href
      )
      window.dispatchEvent(new Event(eventName))
    },
    [src]
  )
  return React.useMemo(
    () => ({ src, suffix, navigate }),
    [src, suffix, navigate]
  )
}

export const PreviewNavigationProvider = PreviewNavigationContext.Provider

/** A real shareable anchor, with unmodified clicks scoped to this preview. */
export function PreviewNavigationLink({
  href,
  onClick,
  ...props
}: React.ComponentProps<"a">) {
  const navigation = usePreviewNavigation()
  const destination =
    navigation && href
      ? new URL(
          href,
          "https://preview.invalid" + navigation.src + navigation.suffix
        )
      : null
  return (
    <a
      {...props}
      href={
        destination
          ? destination.pathname + destination.search + destination.hash
          : href
      }
      onClick={(event) => {
        onClick?.(event)
        if (
          !navigation ||
          !href ||
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target === "_blank" ||
          props.download != null
        )
          return
        event.preventDefault()
        navigation.navigate(href)
      }}
    />
  )
}
