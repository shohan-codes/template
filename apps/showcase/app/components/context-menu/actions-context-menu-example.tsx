"use client"

import { useState } from "react"
import { Copy, Download } from "lucide-react"
import { ActionsContextMenu } from "@workspace/pattern/context-menu/variants/actions-context-menu"

export default function ActionsContextMenuExample() {
  const [result, setResult] = useState("No action selected.")
  const [favorite, setFavorite] = useState(false)
  return (
    <div className="min-h-100 space-y-4">
      <ActionsContextMenu
        trigger="Product brief.pdf"
        menuLabel="File actions"
        $actionMenu={{ $content: { align: "end" } }}
        items={[
          {
            id: "copy",
            type: "action",
            label: "Duplicate",
            icon: <Copy />,
            onSelect: () => setResult("File duplicated in this demo."),
          },
          {
            id: "download",
            type: "action",
            label: "Download",
            icon: <Download />,
            onSelect: () => setResult("Download selected."),
          },
          { id: "divider", type: "separator" },
          {
            id: "favorite",
            type: "checkbox",
            label: "Favorite",
            checked: favorite,
            onCheckedChange: setFavorite,
          },
          {
            id: "delete",
            type: "action",
            label: "Delete",
            variant: "destructive",
            disabled: true,
          },
        ]}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {result} Favorite {favorite ? "on" : "off"}.
      </p>
      <p className="text-xs text-muted-foreground">
        Use the visible button on touch screens, or right-click the file
        surface. Both menus share the same state.
      </p>
    </div>
  )
}
