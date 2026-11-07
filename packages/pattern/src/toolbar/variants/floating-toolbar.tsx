"use client"

import type { ComponentProps } from "react"
import { Toolbar as Primitive } from "radix-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import { ToolbarCore, type ToolbarProps, type ToolbarSlots } from "../core"
import { defaultToolbarSlots } from "./default-toolbar"

function Root({ className, ...props }: ComponentProps<typeof Primitive.Root>) {
  const DefaultRoot = defaultToolbarSlots.Root
  return (
    <DefaultRoot
      className={cn(
        "rounded-full bg-popover px-2 py-1.5 text-popover-foreground shadow-lg ring-1 ring-border/50 data-[orientation=vertical]:rounded-2xl",
        className
      )}
      {...props}
    />
  )
}
export const floatingToolbarSlots: ToolbarSlots = {
  ...defaultToolbarSlots,
  Root,
}
/** A compact floating surface; placement remains under the host application's control. */
export function FloatingToolbar(props: ToolbarProps) {
  return <ToolbarCore defaultSlots={floatingToolbarSlots} {...props} />
}
