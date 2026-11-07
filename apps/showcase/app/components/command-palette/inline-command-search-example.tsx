"use client"

import * as React from "react"
import {
  CommandSearch,
  type CommandItemData,
} from "@workspace/pattern/command-palette"

const items = [
  {
    id: "resources",
    type: "group",
    label: "Resources",
    items: [
      {
        id: "guide",
        type: "action",
        label: "Getting started",
        keywords: ["documentation", "help"],
      },
      { id: "components", type: "action", label: "Component library" },
      { id: "changelog", type: "action", label: "Changelog" },
      {
        id: "roadmap",
        type: "action",
        label: "Private roadmap",
        disabled: true,
      },
    ],
  },
] as const satisfies readonly CommandItemData[]
export default function InlineCommandSearchExample() {
  const [result, setResult] = React.useState("Choose a resource.")
  return (
    <div className="max-w-lg space-y-4">
      <CommandSearch
        items={items}
        label="Search resources"
        placeholder="Find a resource..."
        empty="No resources match your search."
        onAction={(item) => setResult(`Selected: ${item.label}`)}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
      <p className="text-sm text-muted-foreground">
        An always-visible variant with a compact border. Selection keeps the
        search available; Tab moves out normally.
      </p>
    </div>
  )
}
