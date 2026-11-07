"use client"

import { useState } from "react"
import { Bold, Italic, Underline } from "lucide-react"
import { FloatingToolbar } from "@workspace/pattern/toolbar"

export default function FloatingExample() {
  const [format, setFormat] = useState<string[]>(["bold"])
  return (
    <div className="space-y-4">
      <FloatingToolbar
        aria-label="Selection formatting"
        items={[
          {
            id: "style",
            type: "toggle-group",
            selectionMode: "multiple",
            label: "Text style",
            value: format,
            onValueChange: setFormat,
            items: [
              {
                id: "bold",
                value: "bold",
                label: <Bold aria-hidden="true" />,
                "aria-label": "Bold",
              },
              {
                id: "italic",
                value: "italic",
                label: <Italic aria-hidden="true" />,
                "aria-label": "Italic",
              },
              {
                id: "underline",
                value: "underline",
                label: <Underline aria-hidden="true" />,
                "aria-label": "Underline",
              },
            ],
          },
        ]}
      />
      <p role="status" className="text-sm text-muted-foreground">
        Selected: {format.join(", ") || "none"}
      </p>
    </div>
  )
}
