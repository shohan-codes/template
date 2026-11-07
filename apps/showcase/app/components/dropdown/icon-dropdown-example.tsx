"use client"

import { useState } from "react"
import { Copy, Pencil, Trash2 } from "lucide-react"
import { IconDropdown } from "@workspace/pattern/dropdown/variants/icon-dropdown"

export default function IconDropdownExample() {
  const [result, setResult] = useState("No action selected.")
  return (
    <div className="min-h-80 space-y-4">
      <div className="flex items-center gap-4 rounded-xl border p-4">
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">Quarterly project review</p>
          <p className="text-sm text-muted-foreground">
            Updated a few minutes ago
          </p>
        </div>
        <IconDropdown
          label="Project actions"
          $content={{ align: "end" }}
          items={[
            {
              id: "rename",
              type: "action",
              label: "Rename",
              icon: <Pencil />,
              onSelect: () => setResult("Rename selected."),
            },
            {
              id: "copy",
              type: "action",
              label: "Duplicate",
              icon: <Copy />,
              onSelect: () => setResult("Project duplicated in this demo."),
            },
            { id: "divider", type: "separator" },
            {
              id: "delete",
              type: "action",
              label: "Delete",
              icon: <Trash2 />,
              variant: "destructive",
              disabled: true,
            },
          ]}
        />
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </div>
  )
}
