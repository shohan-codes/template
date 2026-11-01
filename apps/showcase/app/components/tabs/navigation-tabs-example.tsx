"use client"

import Link from "next/link"
import { useState } from "react"
import { SegmentedTabs, type TabItemData } from "@workspace/pattern"
import {
  RiHome4Line,
  RiGitMergeLine,
  RiLineChartLine,
  RiSettings4Line,
  RiExternalLinkLine,
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
      <span className="inline-flex size-2 rounded-full bg-emerald-500 animate-pulse" />
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
    <div className="w-full max-w-xl space-y-4">
      {/* Navigation Header Strip with Next.js Link injected via slots */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Project Console</h4>
          <p className="text-xs text-muted-foreground">
            Navigation tab strip with Next.js Link prefetching and route linking.
          </p>
        </div>

        <SegmentedTabs
          items={navItems}
          value={activeTab}
          onValueChange={setActiveTab}
          slots={{ Link }}
        />
      </div>

      {/* Simulated Route Page View */}
      <div className="rounded-xl border border-border/80 bg-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-foreground capitalize">
              active route: #{activeTab}
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              slots.Link = next/link
            </span>
          </div>
          <a
            href={`#${activeTab}`}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Direct URL <RiExternalLinkLine className="size-3" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Each tab renders an accessible <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">&lt;Link href=&quot;#{activeTab}&quot;&gt;</code> tag
          with client-side routing, middle-click &quot;Open in New Tab&quot; support, and automatic Next.js prefetching.
        </p>
      </div>
    </div>
  )
}
