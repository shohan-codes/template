import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"
import type * as React from "react"

import "@workspace/css/globals.css"
import "@workspace/css/themes/all.css"

import { ShowcaseLayout } from "@/components/showcase-layout"
import { cn } from "@workspace/shadcn-ui/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Pattern Showcase",
    template: "%s | Pattern Showcase",
  },
  description:
    "Data-driven pattern families, variants, and interactive examples from @workspace/pattern",
  openGraph: {
    title: "Pattern Showcase",
    description:
      "Data-driven pattern families, variants, and interactive examples from @workspace/pattern",
    type: "website",
  },
}

/**
 * Root application layout wrapper setting up global typography, theme provider, and showcase shell.
 *
 * @param props - Layout props containing child nodes.
 * @returns Root HTML layout structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="blue"
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ShowcaseLayout>{children}</ShowcaseLayout>
      </body>
    </html>
  )
}
