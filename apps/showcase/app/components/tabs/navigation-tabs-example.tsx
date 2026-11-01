"use client"

import Link from "next/link"
import { useState } from "react"
import { SegmentedTabs, type TabItemData } from "@workspace/pattern"
import {
  RiHome4Line,
  RiGitMergeLine,
  RiLineChartLine,
  RiSettings4Line,
} from "@remixicon/react"

const navItems: readonly TabItemData[] = [
  {
    id: "overview",
    label: "Overview",
    href: "#overview",
    icon: <RiHome4Line className="size-3.5 text-muted-foreground" />,
  },
  {
    id: "deployments",
    label: "Deployments",
    href: "#deployments",
    icon: <RiGitMergeLine className="size-3.5 text-muted-foreground" />,
    badge: (
      <span className="inline-flex size-1.5 rounded-full bg-emerald-500 animate-pulse" />
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "#analytics",
    icon: <RiLineChartLine className="size-3.5 text-muted-foreground" />,
  },
  {
    id: "settings",
    label: "Settings",
    href: "#settings",
    icon: <RiSettings4Line className="size-3.5 text-muted-foreground" />,
  },
]

export default function NavigationTabsExample() {
  const [activeTab, setActiveTab] = useState("deployments")

  return (
    <div className="w-full max-w-xl">
      <SegmentedTabs
        items={navItems}
        value={activeTab}
        onValueChange={setActiveTab}
        slots={{ Link }}
      />
    </div>
  )
}
