"use client"

import { SegmentedTabs, type TabItemData } from "@workspace/pattern"
import { Badge } from "@workspace/shadcn-ui"

const filterItems: readonly TabItemData[] = [
  {
    id: "all",
    label: "All Projects",
    badge: (
      <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
        18
      </Badge>
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
      <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
        7
      </Badge>
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

