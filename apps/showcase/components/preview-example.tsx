"use client"

import { createContext, useContext, type ReactNode } from "react"

const PreviewExampleContext = createContext<string | null>(null)

export const usePreviewExample = () => useContext(PreviewExampleContext)

/** Reuse each page's examples without rendering nested showcase cards. */
export function PreviewExample({
  example,
  children,
}: {
  readonly example: string
  readonly children: ReactNode
}) {
  return (
    <PreviewExampleContext.Provider value={example}>
      <div id="showcase-preview-root" className="flow-root p-6">
        {children}
      </div>
    </PreviewExampleContext.Provider>
  )
}
