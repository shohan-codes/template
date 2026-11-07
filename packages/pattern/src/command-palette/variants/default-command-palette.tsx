"use client"

import type * as React from "react"
import {
  Command as Root,
  CommandInput as Input,
  CommandList as List,
  CommandEmpty as Empty,
  CommandGroup as Group,
  CommandItem as Item,
  CommandSeparator as Separator,
  CommandShortcut as Shortcut,
} from "@workspace/shadcn-ui/components/command"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@workspace/shadcn-ui/components/dialog"
import { Button } from "@workspace/shadcn-ui/components/button"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  CommandPaletteCore,
  type CommandPaletteProps,
  type CommandPaletteSlots,
} from "../core"

function Trigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof DialogTrigger>) {
  return (
    <DialogTrigger asChild {...props}>
      {asChild ? (
        children
      ) : (
        <Button type="button" variant="outline">
          {children}
        </Button>
      )}
    </DialogTrigger>
  )
}
function Content({
  className,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      className={cn("gap-0 overflow-hidden p-0", className)}
      showCloseButton={false}
      {...props}
    />
  )
}
function Title({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  return <DialogTitle className={cn("sr-only", className)} {...props} />
}
function Description({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  return <DialogDescription className={cn("sr-only", className)} {...props} />
}
export const defaultCommandPaletteSlots: CommandPaletteSlots = {
  Root,
  Input,
  List,
  Empty,
  Group,
  Item,
  Separator,
  Shortcut,
  Dialog,
  Trigger,
  Content,
  Title,
  Description,
}
export function CommandPalette(props: CommandPaletteProps) {
  return (
    <CommandPaletteCore defaultSlots={defaultCommandPaletteSlots} {...props} />
  )
}
