"use client"

import { useState } from "react"
import { Copy, Download, Folder, Share2, Trash2 } from "lucide-react"
import { Dropdown, type DropdownItemData } from "@workspace/pattern"

export default function ActionDropdownExample() {
  const [result, setResult] = useState("Choose an action for the project.")
  const items: readonly DropdownItemData[] = [
    { type: "label", id: "project", label: "Website redesign" },
    {
      type: "action",
      id: "duplicate",
      label: "Duplicate",
      icon: <Copy />,
      onSelect: () => setResult("Project duplicated in this demo."),
    },
    {
      type: "submenu",
      id: "export",
      label: "Export",
      icon: <Download />,
      items: [
        {
          type: "action",
          id: "pdf",
          label: "PDF document",
          onSelect: () => setResult("PDF export selected."),
        },
        {
          type: "action",
          id: "csv",
          label: "CSV data",
          onSelect: () => setResult("CSV export selected."),
        },
        {
          type: "submenu",
          id: "assets",
          label: "Assets",
          icon: <Folder />,
          items: [
            {
              type: "action",
              id: "svg",
              label: "SVG icons",
              onSelect: () => setResult("SVG export selected."),
            },
            {
              type: "action",
              id: "png",
              label: "PNG images",
              onSelect: () => setResult("PNG export selected."),
            },
          ],
        },
      ],
    },
    {
      type: "action",
      id: "share",
      label: "Share (admin only)",
      icon: <Share2 />,
      disabled: true,
    },
    { type: "separator", id: "divider" },
    {
      type: "action",
      id: "archive",
      label: "Archive project",
      icon: <Trash2 />,
      variant: "destructive",
      onSelect: () => setResult("Project archived in this demo only."),
    },
  ]
  return (
    <div className="min-h-105 space-y-4">
      <Dropdown items={items} trigger="Project actions" />
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </div>
  )
}
