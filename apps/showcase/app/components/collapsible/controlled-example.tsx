"use client"

import * as React from "react"
import { Collapsible } from "@workspace/pattern/collapsible"
import { Button } from "@workspace/shadcn-ui/components/button"

export default function ControlledExample() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-xl border bg-card p-6">
      <Button variant="outline" onClick={() => setOpen(!open)}>
        Toggle from outside
      </Button>
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        trigger="Release notes"
        $trigger={{
          className:
            "rounded-md text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring",
        }}
      >
        <p className="pt-3 text-sm text-muted-foreground">
          Shared controlled state keeps both triggers in sync.
        </p>
      </Collapsible>
      <Collapsible
        disabled
        trigger="Unavailable section"
        $trigger={{
          className: "text-sm text-muted-foreground disabled:opacity-50",
        }}
      >
        This section cannot be opened.
      </Collapsible>
      <p role="status" className="text-xs text-muted-foreground">
        {open ? "Expanded" : "Collapsed"}
      </p>
    </div>
  )
}
