"use client"

import * as React from "react"
import { Collapsible } from "@workspace/pattern/collapsible"
import { Button } from "@workspace/shadcn-ui/components/button"

export default function ControlledExample() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="mx-auto max-w-lg space-y-3">
      <Button variant="outline" onClick={() => setOpen(!open)}>
        Toggle from outside
      </Button>
      <Collapsible open={open} onOpenChange={setOpen} trigger="Release notes">
        Shared controlled state keeps both triggers in sync.
      </Collapsible>
      <Collapsible disabled trigger="Unavailable section">
        This section cannot be opened.
      </Collapsible>
      <p role="status" className="text-xs text-muted-foreground">
        {open ? "Expanded" : "Collapsed"}
      </p>
    </div>
  )
}
