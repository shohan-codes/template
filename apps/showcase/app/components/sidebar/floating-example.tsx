"use client"
import { useState } from "react"
import { ChartNoAxesCombined, Users, Settings } from "lucide-react"
import {
  FloatingSidebar,
  type SidebarItemData,
} from "@workspace/pattern/sidebar"
import { SidebarProvider } from "@workspace/shadcn-ui/components/sidebar"

const items: readonly SidebarItemData[] = [
  { type: "label", id: "workspace", label: "Workspace" },
  {
    type: "link",
    id: "overview",
    label: "Overview",
    href: "#overview",
    icon: <ChartNoAxesCombined />,
  },
  {
    type: "link",
    id: "members",
    label: "Members",
    href: "#members",
    icon: <Users />,
  },
  {
    type: "disclosure",
    id: "settings",
    label: "Settings",
    icon: <Settings />,
    items: [
      { type: "link", id: "profile", label: "Profile", href: "#profile" },
      {
        type: "link",
        id: "notifications",
        label: "Notifications",
        href: "#notifications",
      },
    ],
  },
]
export default function FloatingSidebarExample() {
  const [activeHref, setActiveHref] = useState("#overview")
  return (
    <SidebarProvider className="min-h-0 p-3">
      <FloatingSidebar
        items={items}
        activeHref={activeHref}
        collapsible="none"
        onNavigate={(item, event) => {
          event.preventDefault()
          setActiveHref(item.href)
        }}
      />
    </SidebarProvider>
  )
}
