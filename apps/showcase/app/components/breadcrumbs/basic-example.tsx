"use client"

import {
  Breadcrumbs,
  type BreadcrumbItemData,
} from "@workspace/pattern/breadcrumbs"

const items: readonly BreadcrumbItemData[] = [
  { id: "home", type: "link", label: "Home", href: "/" },
  { id: "patterns", type: "link", label: "Patterns", href: "/components/tabs" },
  { id: "breadcrumbs", type: "page", label: "Breadcrumbs" },
]
export default function BasicExample() {
  return <Breadcrumbs items={items} />
}
