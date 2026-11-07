"use client"

import { useState } from "react"
import { Toolbar, type ToolbarItemData } from "@workspace/pattern/toolbar"

export default function BasicExample() {
  const [status, setStatus] = useState("No action selected")
  const items: readonly ToolbarItemData[] = [
    {
      id: "undo",
      type: "action",
      label: "Undo",
      onSelect: () => setStatus("Undo selected"),
    },
    { id: "redo", type: "action", label: "Redo", disabled: true },
    { id: "separator", type: "separator" },
    {
      id: "format",
      type: "toggle-group",
      label: "Text formatting",
      selectionMode: "multiple",
      defaultValue: [],
      items: [
        { id: "bold", value: "bold", label: "Bold" },
        { id: "italic", value: "italic", label: "Italic" },
      ],
    },
    { id: "help", type: "link", label: "Help", href: "/components/toolbar" },
  ]
  return (
    <div className="space-y-3">
      <Toolbar aria-label="Editor actions" items={items} />
      <p role="status" className="text-sm text-muted-foreground">
        {status}
      </p>
    </div>
  )
}
