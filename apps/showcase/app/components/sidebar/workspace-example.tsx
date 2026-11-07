"use client"
import { useState } from "react"
import { Folder, Inbox, Settings } from "lucide-react"
import { Sidebar, type SidebarItemData } from "@workspace/pattern/sidebar"
import { SidebarProvider } from "@workspace/shadcn-ui/components/sidebar"

export default function WorkspaceSidebarExample() {
  const [activeHref, setActiveHref] = useState("#inbox")
  const [status, setStatus] = useState("Inbox selected")
  const items: readonly SidebarItemData[] = [
    {
      type: "group",
      id: "workspace",
      label: "Workspace",
      items: [
        {
          type: "link",
          id: "inbox",
          label: "Inbox",
          href: "#inbox",
          icon: <Inbox />,
          badge: 4,
        },
        {
          type: "disclosure",
          id: "projects",
          label: "Projects",
          icon: <Folder />,
          items: [
            { type: "link", id: "website", label: "Website", href: "#website" },
            {
              type: "disclosure",
              id: "archive",
              label: "Archive",
              items: [
                {
                  type: "link",
                  id: "last-year",
                  label: "Last year",
                  href: "#last-year",
                },
              ],
            },
          ],
        },
        {
          type: "link",
          id: "billing",
          label: "Billing (unavailable)",
          href: "#billing",
          disabled: true,
        },
      ],
    },
    { type: "separator", id: "divider" },
    {
      type: "action",
      id: "settings",
      label: "Workspace settings",
      icon: <Settings />,
      onSelect: () => setStatus("Settings opened (demo)"),
    },
  ]
  return (
    <div className="space-y-3">
      <SidebarProvider className="min-h-0">
        <Sidebar
          items={items}
          activeHref={activeHref}
          collapsible="none"
          onNavigate={(item, event) => {
            event.preventDefault()
            setActiveHref(item.href)
            setStatus(`${item.label} selected`)
          }}
        />
      </SidebarProvider>
      <p role="status" className="text-sm text-muted-foreground">
        {status}
      </p>
    </div>
  )
}
