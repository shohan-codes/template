"use client"

import { Tabs, type TypedTabItemData } from "@workspace/pattern/tabs"

const items = [
  {
    id: "overview",
    type: "tab",
    label: "Overview",
    content: (
      <p>A simple tab group with stable IDs and local panel selection.</p>
    ),
  },
  {
    id: "details",
    type: "tab",
    label: "Details",
    content: (
      <p>Use arrow keys to switch tabs. Each tab owns its content panel.</p>
    ),
  },
  {
    id: "activity",
    type: "tab",
    label: "Activity",
    disabled: true,
    content: <p>Activity is not available yet.</p>,
  },
] satisfies readonly TypedTabItemData[]

export default function DefaultTabsExample() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <Tabs
        mode="typed"
        items={items}
        $list={{ "aria-label": "Project information" }}
        $content={{ className: "rounded-lg border p-4 text-muted-foreground" }}
      />
    </div>
  )
}
