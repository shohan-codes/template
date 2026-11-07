"use client"

import {
  NavigationMenu,
  type NavigationMenuItemData,
} from "@workspace/pattern/navigation-menu"

const items: readonly NavigationMenuItemData[] = [
  { id: "home", type: "link", label: "Home", href: "/" },
  {
    id: "patterns",
    type: "submenu",
    label: "Patterns",
    items: [
      {
        id: "tabs",
        type: "link",
        label: "Tabs",
        href: "/components/tabs",
        description: "Switch between related content.",
      },
      {
        id: "breadcrumbs",
        type: "link",
        label: "Breadcrumbs",
        href: "/components/breadcrumbs",
        description: "Show the current location.",
      },
    ],
  },
  {
    id: "current",
    type: "link",
    label: "Navigation",
    href: "/components/navigation-menu",
    active: true,
  },
  { id: "soon", type: "submenu", label: "Soon", disabled: true, items: [] },
]
export default function BasicExample() {
  return (
    <div className="min-h-56">
      <NavigationMenu items={items} />
    </div>
  )
}
