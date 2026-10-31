"use client"

import { SegmentedTabs, type TabItemData } from "@workspace/pattern"

const filterItems: readonly TabItemData[] = [
  {
    id: "all",
    label: "All Projects",
    badge: (
      <span className="inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-muted-foreground/15 px-1.5 font-mono text-[10px] font-medium text-foreground">
        18
      </span>
    ),
    content: (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        Showing all 18 production and staging workspaces.
      </div>
    ),
  },
  {
    id: "active",
    label: "In Progress",
    badge: (
      <span className="inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-muted-foreground/15 px-1.5 font-mono text-[10px] font-medium text-foreground">
        7
      </span>
    ),
    content: (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        7 deployment builds currently compiling or passing tests.
      </div>
    ),
  },
  {
    id: "archived",
    label: "Archived",
    content: (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        Zero archived projects in this organization.
      </div>
    ),
  },
]

export default function SegmentedTabsExample() {
  return (
    <div className="w-full max-w-xl">
      <SegmentedTabs items={filterItems} />
    </div>
  )
}

