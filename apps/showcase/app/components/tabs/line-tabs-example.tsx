"use client"

import { Tabs, type TabItemData } from "@workspace/pattern"
import { Button } from "@workspace/shadcn-ui"
import { RiRefreshLine } from "@remixicon/react"

const overviewItems: readonly TabItemData[] = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <div className="pt-2 text-sm text-muted-foreground">
        Real-time metrics, active sessions, and system health status.
      </div>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    content: (
      <div className="pt-2 text-sm text-muted-foreground">
        Weekly traffic breakdown, conversion funnels, and bounce rates.
      </div>
    ),
  },
  {
    id: "reports",
    label: "Reports",
    content: (
      <div className="pt-2 text-sm text-muted-foreground">
        Exportable PDF and CSV reports generated for your organization.
      </div>
    ),
  },
]

export default function LineTabsExample() {
  return (
    <div className="w-full max-w-xl">
      <Tabs
        variant="line"
        items={overviewItems}
        actions={
          <Button variant="ghost" size="xs" className="gap-1.5 text-xs text-muted-foreground">
            <RiRefreshLine className="size-3.5" />
            Refresh
          </Button>
        }
      />
    </div>
  )
}

