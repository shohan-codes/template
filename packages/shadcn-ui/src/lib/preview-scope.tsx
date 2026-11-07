"use client"

import * as React from "react"

const PreviewScopeContext = React.createContext<HTMLElement | null>(null)

/** Optional boundary for embedded examples. Normal application portals are unchanged. */
export const PreviewScopeProvider = PreviewScopeContext.Provider
export const usePreviewScope = () => React.useContext(PreviewScopeContext)
