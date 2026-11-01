"use client"

import Link from "next/link"
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
    content: (
      <div className="w-full rounded-xl border border-border/70 bg-card p-4 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Cluster Status</span>
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            #overview
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Multi-tenant edge cluster routing nominal. Active pods serving ingress traffic across 4 regions.
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
      <span className="inline-flex size-1.5 rounded-full bg-emerald-500 animate-pulse" />
    ),
    content: (
      <div className="w-full rounded-xl border border-border/70 bg-card p-4 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Production Deployment</span>
          <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            #deployments • Live
          </span>
        </div>
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>commit 6c320b9</span>
          <span>Deployed 2m ago</span>
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "#analytics",
    icon: <RiLineChartLine className="size-3.5 text-muted-foreground" />,
    content: (
      <div className="w-full rounded-xl border border-border/70 bg-card p-4 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Traffic Telemetry</span>
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            #analytics
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="rounded-lg border border-border/60 bg-muted/20 p-2.5">
            <div className="text-[10px] text-muted-foreground">Edge Ingress</div>
            <div className="mt-0.5 font-mono text-xs font-semibold text-foreground">1.42M req/h</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-2.5">
            <div className="text-[10px] text-muted-foreground">Average Latency</div>
            <div className="mt-0.5 font-mono text-xs font-semibold text-foreground">24ms p95</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    href: "#settings",
    icon: <RiSettings4Line className="size-3.5 text-muted-foreground" />,
    content: (
      <div className="w-full rounded-xl border border-border/70 bg-card p-4 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Project Configuration</span>
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            #settings
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Configure custom domains, automatic SSL renewals, environment variables, and webhook alerts.
        </p>
      </div>
    ),
  },
]

export default function NavigationTabsExample() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <SegmentedTabs
        items={navItems}
        defaultValue="deployments"
        slots={{ Link }}
      />
    </div>
  )
}
