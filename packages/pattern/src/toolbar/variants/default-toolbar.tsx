"use client"

import type { ComponentProps } from "react"
import { Toolbar as Primitive } from "radix-ui"
import { buttonVariants } from "@workspace/shadcn-ui/components/button"
import { toggleVariants } from "@workspace/shadcn-ui/components/toggle"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import { ToolbarCore, type ToolbarProps, type ToolbarSlots } from "../core"

function Root({ className, ...props }: ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root
      data-slot="toolbar"
      className={cn(
        "flex w-fit max-w-full flex-wrap items-center gap-1 rounded-lg border bg-background p-1 text-foreground data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className
      )}
      {...props}
    />
  )
}
function Button({
  className,
  ...props
}: ComponentProps<typeof Primitive.Button>) {
  return (
    <Primitive.Button
      data-slot="toolbar-button"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        className
      )}
      {...props}
    />
  )
}
function Link({ className, ...props }: ComponentProps<typeof Primitive.Link>) {
  return (
    <Primitive.Link
      data-slot="toolbar-link"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        className
      )}
      {...props}
    />
  )
}
function Separator({
  className,
  ...props
}: ComponentProps<typeof Primitive.Separator>) {
  return (
    <Primitive.Separator
      data-slot="toolbar-separator"
      className={cn(
        "mx-1 h-5 w-px shrink-0 bg-border data-[orientation=horizontal]:mx-0 data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        className
      )}
      {...props}
    />
  )
}
function ToggleGroup({
  className,
  ...props
}: ComponentProps<typeof Primitive.ToggleGroup>) {
  return (
    <Primitive.ToggleGroup
      data-slot="toolbar-toggle-group"
      className={cn(
        "flex max-w-full flex-wrap items-center gap-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className
      )}
      {...props}
    />
  )
}
function ToggleItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.ToggleItem>) {
  return (
    <Primitive.ToggleItem
      data-slot="toolbar-toggle-item"
      className={cn(toggleVariants({ size: "sm" }), className)}
      {...props}
    />
  )
}
export const defaultToolbarSlots: ToolbarSlots = {
  Root,
  Button,
  Link,
  Separator,
  ToggleGroup,
  ToggleItem,
}
export function Toolbar({
  defaultSlots = defaultToolbarSlots,
  ...props
}: ToolbarProps) {
  return <ToolbarCore defaultSlots={defaultSlots} {...props} />
}
