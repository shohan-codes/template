"use client"

import { useSyncExternalStore } from "react"

function subscribe(callback: () => void): () => void {
  window.addEventListener("hashchange", callback)
  window.addEventListener("popstate", callback)
  return () => {
    window.removeEventListener("hashchange", callback)
    window.removeEventListener("popstate", callback)
  }
}

function getSnapshot(): string {
  return typeof window !== "undefined" ? window.location.hash.slice(1) : ""
}

function getServerSnapshot(): string {
  return ""
}

/**
 * Subscribes to the browser's URL hash (#hash) using React 19's `useSyncExternalStore`.
 * Returns the hash without the leading `#` character (e.g. "overview").
 * Safe for SSR and avoids React hydration mismatches.
 */
export function useHash(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

