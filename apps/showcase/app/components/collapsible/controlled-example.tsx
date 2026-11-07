"use client"

import * as React from "react"
import { Collapsible } from "@workspace/pattern/collapsible"
import { Button } from "@workspace/shadcn-ui/components/button"

export default function ControlledExample() {
  const [open, setOpen] = React.useState(false)
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  return (
    <div className="mx-auto max-w-lg space-y-3">
      <Button variant="outline" onClick={() => setOpen(!open)}>
        Toggle from outside
      </Button>
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        trigger="Release notes"
        items={[
          {
            id: "migration",
            type: "disclosure",
            trigger: "Migration notes",
            open: detailsOpen,
            onOpenChange: setDetailsOpen,
            items: [
              {
                id: "details",
                type: "content",
                content:
                  "Controlled nested state survives closing and reopening Release notes.",
              },
            ],
          },
          {
            id: "future",
            type: "disclosure",
            trigger: "Upcoming changes",
            disabled: true,
            items: [
              { id: "details", type: "content", content: "Not available yet." },
            ],
          },
        ]}
      >
        Shared controlled state keeps both triggers in sync.
      </Collapsible>
      <Collapsible disabled trigger="Unavailable section">
        This section cannot be opened.
      </Collapsible>
      <p role="status" className="text-xs text-muted-foreground">
        {open ? "Expanded" : "Collapsed"}. Migration notes:{" "}
        {detailsOpen ? "open" : "closed"}.
      </p>
    </div>
  )
}
