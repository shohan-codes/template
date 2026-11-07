"use client"

import { ScrollableBreadcrumbs } from "@workspace/pattern/breadcrumbs"

export default function ScrollableExample() {
  return (
    <ScrollableBreadcrumbs
      items={[
        { id: "home", type: "link", label: "Home", href: "/" },
        {
          id: "workspace",
          type: "link",
          label: "Workspace",
          href: "/components/tabs",
        },
        {
          id: "library",
          type: "link",
          label: "Component library",
          href: "/components/accordion",
        },
        {
          id: "navigation",
          type: "link",
          label: "Navigation patterns",
          href: "/components/dropdown",
        },
        { id: "page", type: "page", label: "Breadcrumbs" },
      ]}
    />
  )
}
