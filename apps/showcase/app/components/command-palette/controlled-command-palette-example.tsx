"use client"

import * as React from "react"
import {
  CommandPalette,
  type CommandItemData,
} from "@workspace/pattern/command-palette"

export default function ControlledCommandPaletteExample() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [pinned, setPinned] = React.useState(false)
  const [result, setResult] = React.useState("Choose an action.")
  const items = [
    {
      id: "pin",
      type: "action",
      label: pinned ? "Unpin project" : "Pin project",
      closeOnSelect: false,
      onSelect: () => setPinned((value) => !value),
    },
    { id: "done", type: "action", label: "Done" },
  ] satisfies readonly CommandItemData[]
  return (
    <div className="min-h-96 space-y-4">
      <CommandPalette
        trigger="Manage project"
        title="Project commands"
        description="Pin the project without closing, or choose Done."
        items={items}
        open={open}
        onOpenChange={setOpen}
        query={query}
        onQueryChange={setQuery}
        onAction={(item) => setResult(`Selected: ${item.label}`)}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {open ? "Palette open" : "Palette closed"} ·{" "}
        {pinned ? "Project pinned" : "Project unpinned"} · {result}
      </p>
      <p className="text-sm text-muted-foreground">
        Open state and query are controlled. Pin keeps the palette open; Done
        follows the default close-on-select policy. The query persists between
        openings.
      </p>
    </div>
  )
}
