"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

import { ShowcaseShell } from "@/components/showcase-shell"
import { ThemeProvider } from "@/components/theme-provider"

/** Preview documents have their own viewport and never change the app theme. */
export function ShowcaseLayout({ children }: { readonly children: ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith("/preview/")) return children

  return (
    <ThemeProvider>
      <ShowcaseShell>{children}</ShowcaseShell>
    </ThemeProvider>
  )
}
