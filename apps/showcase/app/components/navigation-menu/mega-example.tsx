"use client"

import { MegaNavigationMenu } from "@workspace/pattern/navigation-menu"

export default function MegaExample() {
  return (
    <div className="min-h-96">
      <MegaNavigationMenu
        items={[
          {
            id: "library",
            type: "submenu",
            label: "Explore the library",
            items: [
              {
                id: "navigation",
                type: "group",
                label: "Navigation",
                items: [
                  {
                    id: "tabs",
                    type: "link",
                    label: "Tabs",
                    href: "/components/tabs",
                    description: "Organize related panels in one place.",
                  },
                  {
                    id: "breadcrumbs",
                    type: "link",
                    label: "Breadcrumbs",
                    href: "/components/breadcrumbs",
                    description: "Clear paths through deep hierarchies.",
                  },
                ],
              },
              {
                id: "interaction",
                type: "group",
                label: "Interaction",
                items: [
                  {
                    id: "dropdown",
                    type: "link",
                    label: "Dropdown",
                    href: "/components/dropdown",
                    description: "Actions and choices near their trigger.",
                  },
                  {
                    id: "collapsible",
                    type: "link",
                    label: "Collapsible",
                    href: "/components/collapsible",
                    description: "Progressively reveal optional details.",
                  },
                ],
              },
            ],
          },
          { id: "overview", type: "link", label: "Overview", href: "/" },
        ]}
      />
    </div>
  )
}
