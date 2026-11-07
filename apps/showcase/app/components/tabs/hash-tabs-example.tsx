"use client"

import {
  PreviewNavigationLink,
  usePreviewNavigation,
} from "@/components/preview-navigation"

import { useHash } from "@workspace/hooks"
import { SegmentedTabs, type TabItemData } from "@workspace/pattern"
import {
  RiHome4Line,
  RiGitMergeLine,
  RiLineChartLine,
  RiSettings4Line,
} from "@remixicon/react"

const hashItems: readonly TabItemData[] = [
  {
    id: "overview",
    label: "Overview",
    href: "#overview",
    icon: <RiHome4Line className="size-3.5 text-muted-foreground" />,
    content: (
      <div className="w-full space-y-2 rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            Cluster Health
          </span>
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            #overview
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Deep-linked via window.location.hash. Synchronized with the browser
          URL without hydration mismatches.
        </p>
      </div>
    ),
  },
  {
    id: "deployments",
    label: "Deployments",
    href: "#deployments",
    icon: <RiGitMergeLine className="size-3.5 text-muted-foreground" />,
    badge: (
      <span className="inline-flex size-1.5 animate-pulse rounded-full bg-emerald-500" />
    ),
    content: (
      <div className="w-full space-y-2 rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            Production Deployment
          </span>
          <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            #deployments • Live
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Clicking updates the URL hash to #deployments. Opening this URL
          directly will activate this tab.
        </p>
      </div>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "#analytics",
    icon: <RiLineChartLine className="size-3.5 text-muted-foreground" />,
    content: (
      <div className="w-full space-y-2 rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            Traffic Telemetry
          </span>
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            #analytics
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Direct shareable bookmark. Visit the page with #analytics to land
          directly on this view.
        </p>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    href: "#settings",
    icon: <RiSettings4Line className="size-3.5 text-muted-foreground" />,
    content: (
      <div className="w-full space-y-2 rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            Configuration
          </span>
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            #settings
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Manage team environments and domain DNS routing with URL bookmarkable
          views.
        </p>
      </div>
    ),
  },
]

export default function HashTabsExample({
  defaultValue,
}: {
  defaultValue?: string
}) {
  const currentHash = useHash()
  const navigation = usePreviewNavigation()

  return (
    <div className="mx-auto w-full max-w-xl">
      <SegmentedTabs
        items={hashItems}
        defaultValue={defaultValue ?? "deployments"}
        value={
          navigation ? (navigation.suffix.split("#")[1] ?? "") : currentHash
        }
        slots={navigation ? { Link: PreviewNavigationLink } : undefined}
      />
    </div>
  )
}
