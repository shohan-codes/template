"use client"

import { useId, useState } from "react"
import { ContextMenu, type ContextMenuItemData } from "@workspace/pattern"

export default function PreferencesContextMenuExample() {
  const hintId = useId()
  const [grid, setGrid] = useState(true)
  const [guides, setGuides] = useState(false)
  const [zoom, setZoom] = useState("100")
  const items: readonly ContextMenuItemData[] = [
    { type: "label", id: "view-label", label: "Canvas view" },
    {
      type: "checkbox",
      id: "grid",
      label: "Show grid",
      checked: grid,
      onCheckedChange: setGrid,
      onSelect: (event) => event.preventDefault(),
    },
    {
      type: "checkbox",
      id: "guides",
      label: "Show guides",
      checked: guides,
      onCheckedChange: setGuides,
      onSelect: (event) => event.preventDefault(),
    },
    { type: "separator", id: "zoom-divider" },
    { type: "label", id: "zoom-label", label: "Zoom level" },
    {
      type: "radio-group",
      id: "zoom",
      label: "Zoom level",
      value: zoom,
      onValueChange: setZoom,
      items: [
        { id: "50", value: "50", label: "50%", textValue: "50 percent" },
        { id: "100", value: "100", label: "100%", textValue: "100 percent" },
        { id: "200", value: "200", label: "200%", textValue: "200 percent" },
      ],
    },
  ]
  return (
    <div className="min-h-105 space-y-4">
      <ContextMenu
        items={items}
        trigger={`Canvas at ${zoom}%`}
        $trigger={{
          "aria-describedby": hintId,
          className:
            "flex min-h-40 w-full items-center justify-center rounded-xl border border-dashed bg-muted/30 p-6 text-center font-medium",
        }}
      />
      <p id={hintId} className="text-xs text-muted-foreground">
        Right-click, press and hold, or focus and press Shift+F10
      </p>
      <p role="status" className="text-sm text-muted-foreground">
        Grid {grid ? "on" : "off"} · Guides {guides ? "on" : "off"} · Zoom{" "}
        {zoom}%
      </p>
    </div>
  )
}
