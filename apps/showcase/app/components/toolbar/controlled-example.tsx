"use client"

import { useState } from "react"
import { Toolbar } from "@workspace/pattern/toolbar"

export default function ControlledExample() {
  const [alignment, setAlignment] = useState("left")
  return (
    <div className="space-y-3">
      <Toolbar
        aria-label="Paragraph tools"
        orientation="vertical"
        items={[
          {
            id: "alignment",
            type: "toggle-group",
            selectionMode: "single",
            label: "Text alignment",
            value: alignment,
            onValueChange: (value) => {
              if (value) setAlignment(value)
            },
            items: [
              { id: "left", value: "left", label: "Left" },
              { id: "center", value: "center", label: "Center" },
              { id: "right", value: "right", label: "Right" },
            ],
          },
          { id: "separator", type: "separator" },
          {
            id: "reset",
            type: "action",
            label: "Reset alignment",
            onSelect: () => setAlignment("left"),
          },
        ]}
      />
      <p role="status" className="text-sm text-muted-foreground">
        Alignment: {alignment}
      </p>
    </div>
  )
}
