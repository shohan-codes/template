"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { SplitDropdown } from "@workspace/pattern/dropdown/variants/split-dropdown"

export default function SplitDropdownExample() {
  const [result, setResult] = useState("Draft ready. Nothing has been sent.")
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-80 space-y-4">
      <SplitDropdown
        primaryAction={{
          label: "Send message",
          icon: <Send />,
          onClick: () => setResult("Message sent in this demo only."),
        }}
        menuLabel="More sending options"
        open={open}
        onOpenChange={setOpen}
        items={[
          {
            id: "later",
            type: "action",
            label: "Schedule for later",
            onSelect: () => setResult("Scheduling selected."),
          },
          {
            id: "draft",
            type: "action",
            label: "Save as draft",
            onSelect: () => setResult("Draft saved in this demo."),
          },
          {
            id: "disabled",
            type: "action",
            label: "Send to all members",
            disabled: true,
          },
        ]}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
      <p className="text-xs text-muted-foreground">
        Menu {open ? "open" : "closed"}. The primary action runs without opening
        it.
      </p>
    </div>
  )
}
