"use client"

import { Collapsible } from "@workspace/pattern/collapsible"
import { ChevronDown } from "lucide-react"

export default function BasicExample() {
  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-card p-4">
      <Collapsible
        trigger={
          <>
            <span>Project details</span>
            <ChevronDown
              className="size-4 transition-transform group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </>
        }
        $trigger={{
          className:
            "group flex w-full items-center justify-between rounded-md p-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-ring",
        }}
        $content={{ className: "px-2 pt-2 pb-3 text-sm text-muted-foreground" }}
      >
        Build accessible patterns once, then share their behavior across every
        layout.
      </Collapsible>
    </div>
  )
}
