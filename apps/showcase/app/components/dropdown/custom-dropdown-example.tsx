"use client"

import { useState, type ComponentProps } from "react"
import { Dropdown } from "@workspace/pattern"
import { Button, DropdownMenuItem } from "@workspace/shadcn-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

function SpaciousItem({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      {...props}
      className={cn("rounded-lg px-3 py-2.5 font-medium", className)}
    />
  )
}

export default function CustomDropdownExample() {
  const [open, setOpen] = useState(false)
  const [workspace, setWorkspace] = useState("Design studio")
  return (
    <div className="min-h-105 space-y-4">
      <Dropdown
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="outline">Switch workspace</Button>}
        $trigger={{ asChild: true }}
        $content={{ className: "w-64 rounded-xl p-2" }}
        slots={{ Item: SpaciousItem }}
        items={[
          { type: "label", id: "label", label: "Your workspaces" },
          {
            type: "group",
            id: "workspaces",
            label: "Available workspaces",
            items: [
              {
                type: "action",
                id: "design",
                label: "Design studio",
                onSelect: () => setWorkspace("Design studio"),
              },
              {
                type: "action",
                id: "engineering",
                label: "Engineering",
                onSelect: () => setWorkspace("Engineering"),
              },
              {
                type: "action",
                id: "marketing",
                label: "Marketing",
                disabled: true,
              },
            ],
          },
        ]}
      />
      <p role="status" className="text-sm text-muted-foreground">
        Current workspace: {workspace}. Menu {open ? "open" : "closed"}.
      </p>
    </div>
  )
}
