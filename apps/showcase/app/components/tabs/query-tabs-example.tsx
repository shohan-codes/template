"use client"

import {
  PreviewNavigationLink,
  usePreviewNavigation,
} from "@/components/preview-navigation"

import Link from "next/link"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SegmentedTabs, type TabItemData } from "@workspace/pattern"
import {
  RiHome4Line,
  RiGitMergeLine,
  RiLineChartLine,
  RiSettings4Line,
} from "@remixicon/react"

const queryItems: readonly TabItemData[] = [
  {
    id: "overview",
    label: "Overview",
    href: "?tab=overview",
    icon: <RiHome4Line className="size-3.5 text-muted-foreground" />,
    content: (
      <div className="w-full space-y-2 rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            Cluster Ingress
          </span>
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            ?tab=overview
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          SSR-compatible URL query navigation driven directly by Next.js
          useSearchParams().
        </p>
      </div>
    ),
  },
  {
    id: "deployments",
    label: "Deployments",
    href: "?tab=deployments",
    icon: <RiGitMergeLine className="size-3.5 text-muted-foreground" />,
    badge: (
      <span className="inline-flex size-1.5 animate-pulse rounded-full bg-emerald-500" />
    ),
    content: (
      <div className="w-full space-y-2 rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            Active Pipelines
          </span>
          <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            ?tab=deployments • Active
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Zero useEffect required. Active tab matches the ?tab query parameter
          synchronously.
        </p>
      </div>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "?tab=analytics",
    icon: <RiLineChartLine className="size-3.5 text-muted-foreground" />,
    content: (
      <div className="w-full space-y-2 rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            Usage Telemetry
          </span>
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            ?tab=analytics
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Shareable query parameter URL. Opening with ?tab=analytics activates
          this view immediately.
        </p>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    href: "?tab=settings",
    icon: <RiSettings4Line className="size-3.5 text-muted-foreground" />,
    content: (
      <div className="w-full space-y-2 rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            Security & Scopes
          </span>
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            ?tab=settings
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Standard Next.js link routing with prefetching and full browser
          history integration.
        </p>
      </div>
    ),
  },
]

function QueryTabsContent({ defaultValue }: { defaultValue?: string }) {
  const searchParams = useSearchParams()
  const navigation = usePreviewNavigation()
  const scopedParams = navigation
    ? new URLSearchParams(navigation.suffix.split("#")[0])
    : searchParams

  return (
    <div className="mx-auto w-full max-w-xl">
      <SegmentedTabs
        items={queryItems}
        defaultValue={defaultValue ?? "deployments"}
        value={scopedParams.get("tab") ?? ""}
        slots={{ Link: navigation ? PreviewNavigationLink : Link }}
        $link={navigation ? undefined : { scroll: false }}
      />
    </div>
  )
}

export default function QueryTabsExample({
  defaultValue,
}: {
  defaultValue?: string
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto h-28 w-full max-w-xl animate-pulse rounded-xl bg-muted/20" />
      }
    >
      <QueryTabsContent defaultValue={defaultValue} />
    </Suspense>
  )
}
