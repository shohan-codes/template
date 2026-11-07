"use client"

import { useState } from "react"
import { Copy, FolderInput, Trash2 } from "lucide-react"
import { ContextMenu, type ContextMenuItemData } from "@workspace/pattern"

export default function FileContextMenuExample() {
  const [status, setStatus] = useState("No action selected")
  const items: readonly ContextMenuItemData[] = [
    { type: "label", id: "file", label: "Brand guidelines.pdf" },
    {
      type: "action",
      id: "open",
      label: "Open preview",
      onSelect: () => setStatus("Preview opened (demo)"),
    },
    {
      type: "action",
      id: "copy",
      label: "Duplicate",
      icon: <Copy />,
      shortcut: "⌘D",
      onSelect: () => setStatus("Duplicate created (demo)"),
    },
    {
      type: "submenu",
      id: "move",
      label: "Move to",
      icon: <FolderInput />,
      items: [
        {
          type: "action",
          id: "design",
          label: "Design assets",
          onSelect: () => setStatus("Moved to Design assets (demo)"),
        },
        {
          type: "submenu",
          id: "archive",
          label: "Archive",
          items: [
            {
              type: "action",
              id: "year",
              label: "2026",
              onSelect: () => setStatus("Moved to Archive / 2026 (demo)"),
            },
          ],
        },
      ],
    },
    { type: "action", id: "share", label: "Share externally", disabled: true },
    { type: "separator", id: "danger-divider" },
    {
      type: "action",
      id: "trash",
      label: "Move to trash",
      icon: <Trash2 />,
      variant: "destructive",
      onSelect: () => setStatus("Moved to trash (demo)"),
    },
  ]
  return (
    <div className="min-h-105 space-y-4">
      <ContextMenu items={items} trigger="Brand guidelines.pdf" />
      <p role="status" className="text-sm text-muted-foreground">
        {status}
      </p>
    </div>
  )
}
