"use client"

import { useState, type ComponentProps } from "react"
import { ContextMenu } from "@workspace/pattern"
import { ContextMenuItem } from "@workspace/shadcn-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

function SpaciousItem({
  className,
  ...props
}: ComponentProps<typeof ContextMenuItem>) {
  return (
    <ContextMenuItem
      {...props}
      className={cn("rounded-lg px-3 py-2.5 font-medium", className)}
    />
  )
}

export default function CustomContextMenuExample() {
  const [status, setStatus] = useState("Draft")
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-105 space-y-4">
      <ContextMenu
        onOpenChange={setOpen}
        slots={{ Item: SpaciousItem }}
        trigger={
          <div
            className="rounded-xl border bg-card p-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Article workflow actions"
          >
            <p className="font-medium">A better onboarding experience</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Article · {status}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Right-click or use the keyboard menu key
            </p>
          </div>
        }
        $trigger={{ asChild: true }}
        $content={{ className: "w-64 rounded-xl p-2" }}
        items={[
          { type: "label", id: "workflow", label: "Local workflow demo" },
          {
            type: "group",
            id: "states",
            label: "Article status",
            items: [
              {
                type: "action",
                id: "review",
                label: "Mark ready for review",
                onSelect: () => setStatus("Ready for review"),
              },
              {
                type: "action",
                id: "draft",
                label: "Return to draft",
                onSelect: () => setStatus("Draft"),
              },
              {
                type: "action",
                id: "publish",
                label: "Publish",
                disabled: true,
              },
            ],
          },
        ]}
      />
      <p role="status" className="text-sm text-muted-foreground">
        Status: {status}. Menu {open ? "open" : "closed"}.
      </p>
    </div>
  )
}
