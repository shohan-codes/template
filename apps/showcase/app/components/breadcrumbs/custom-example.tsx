"use client"

import Link from "next/link"
import { Home } from "lucide-react"
import { Breadcrumbs } from "@workspace/pattern/breadcrumbs"

export default function CustomExample() {
  return (
    <Breadcrumbs
      aria-label="Project breadcrumb"
      separator="/"
      slots={{ Link }}
      $link={{
        className:
          "rounded-sm underline-offset-4 hover:underline focus-visible:outline-2",
      }}
      items={[
        {
          id: "home",
          type: "link",
          label: "Home",
          icon: <Home aria-hidden="true" className="inline size-4" />,
          href: "/",
        },
        {
          id: "library",
          type: "link",
          label: "Component library",
          href: "/components/tabs",
        },
        {
          id: "page",
          type: "page",
          label:
            "An unusually long page title that wraps gracefully on narrow screens",
        },
      ]}
    />
  )
}
