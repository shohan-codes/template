"use client"

import * as React from "react"
import {
  CommandPalette,
  type CommandItemData,
} from "@workspace/pattern/command-palette"

export default function DefaultCommandPaletteExample() {
  const [result, setResult] = React.useState("No command selected.")
  const items = [
    {
      id: "navigation",
      type: "group",
      label: "Navigation",
      items: [
        {
          id: "overview",
          type: "action",
          label: "Open overview",
          keywords: ["home", "dashboard"],
        },
        { id: "projects", type: "action", label: "Browse projects" },
      ],
    },
    { id: "divider", type: "separator" },
    { id: "new-project", type: "action", label: "Create project" },
    { id: "invite", type: "action", label: "Invite teammate", disabled: true },
  ] satisfies readonly CommandItemData[]
  return (
    <div className="min-h-96 space-y-4">
      <CommandPalette
        trigger="Open commands"
        items={items}
        onAction={(item) => setResult(`Selected: ${item.label}`)}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
      <p className="text-sm text-muted-foreground">
        Search “home” to find the overview. Arrow keys move, Enter selects, and
        Escape closes. All actions are local demos.
      </p>
    </div>
  )
}
