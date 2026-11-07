"use client"
import { useState } from "react"
import { Sidebar, type SidebarItemData } from "@workspace/pattern/sidebar"
import { SidebarProvider } from "@workspace/shadcn-ui/components/sidebar"
import { Button } from "@workspace/shadcn-ui/components/button"

const items: readonly SidebarItemData[] = [
  {
    type: "group",
    id: "sections",
    label: "Documentation",
    items: [
      {
        type: "disclosure",
        id: "guides",
        label: "Guides",
        items: [
          {
            type: "link",
            id: "start",
            label: "Getting started",
            href: "#start",
          },
          { type: "link", id: "routing", label: "Routing", href: "#routing" },
        ],
      },
      {
        type: "disclosure",
        id: "reference",
        label: "Reference",
        items: [
          { type: "link", id: "api", label: "API reference", href: "#api" },
        ],
      },
    ],
  },
]
export default function ControlledSidebarExample() {
  const [expandedIds, setExpandedIds] = useState<string[]>(["guides"])
  const [activeHref, setActiveHref] = useState("#start")
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        onClick={() =>
          setExpandedIds(expandedIds.length ? [] : ["guides", "reference"])
        }
      >
        Toggle all sections
      </Button>
      <SidebarProvider className="min-h-0">
        <Sidebar
          items={items}
          collapsible="none"
          activeHref={activeHref}
          expandedIds={expandedIds}
          onExpandedChange={setExpandedIds}
          onNavigate={(item, event) => {
            event.preventDefault()
            setActiveHref(item.href)
          }}
        />
      </SidebarProvider>
      <p role="status" className="text-sm text-muted-foreground">
        Open sections: {expandedIds.join(", ") || "none"}
      </p>
    </div>
  )
}
