"use client"

import * as React from "react"
import {
  Collapsible,
  type CollapsibleItemData,
} from "@workspace/pattern/collapsible"
import { Input } from "@workspace/shadcn-ui/components/input"

function GroupLabel({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className="text-xs font-semibold tracking-wide text-primary uppercase"
      {...props}
    >
      {children}
    </div>
  )
}

export default function CustomExample() {
  const id = React.useId()
  const [name, setName] = React.useState("Design system")
  const items = [
    {
      id: "workspace",
      type: "group",
      label: "Workspace settings",
      items: [
        {
          id: "name",
          type: "custom",
          content: (
            <div className="space-y-2">
              <label htmlFor={id} className="text-foreground">
                Workspace name
              </label>
              <Input
                id={id}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          ),
        },
      ],
    },
    { id: "divider", type: "separator" },
    {
      id: "summary",
      type: "content",
      content: `Current name: ${name || "Untitled"}`,
    },
  ] satisfies readonly CollapsibleItemData[]

  return (
    <div className="mx-auto max-w-lg">
      <Collapsible
        trigger="Custom content and slots"
        defaultOpen
        items={items}
        slots={{ GroupLabel }}
      />
    </div>
  )
}
