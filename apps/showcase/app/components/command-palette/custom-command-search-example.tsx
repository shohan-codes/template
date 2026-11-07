"use client"

import * as React from "react"
import { Search, FileText } from "lucide-react"
import {
  CommandSearch,
  type CommandItemData,
} from "@workspace/pattern/command-palette"
import { CommandItem } from "@workspace/shadcn-ui/components/command"
import { cn } from "@workspace/shadcn-ui/lib/utils"

function SpaciousItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandItem>) {
  return <CommandItem className={cn("my-1 py-3", className)} {...props} />
}
const items = [
  {
    id: "find",
    type: "action",
    label: "Find in workspace",
    icon: <Search className="size-4" />,
  },
  {
    id: "notes",
    type: "action",
    label: "Open notes",
    icon: <FileText className="size-4" />,
  },
] satisfies readonly CommandItemData[]
export default function CustomCommandSearchExample() {
  const [result, setResult] = React.useState("Choose a workspace action.")
  return (
    <div className="max-w-lg space-y-4">
      <CommandSearch
        items={items}
        slots={{ Item: SpaciousItem }}
        $root={{ className: "bg-muted/30" }}
        onAction={(item) => setResult(`Selected: ${item.label}`)}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </div>
  )
}
