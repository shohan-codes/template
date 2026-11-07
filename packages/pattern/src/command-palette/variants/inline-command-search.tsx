"use client"

import type * as React from "react"
import { Command } from "@workspace/shadcn-ui/components/command"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  CommandSearchCore,
  type CommandSearchProps,
  type CommandSearchSlots,
} from "../core"
import { defaultCommandPaletteSlots } from "./default-command-palette"

function Root({ className, ...props }: React.ComponentProps<typeof Command>) {
  return <Command className={cn("h-auto border", className)} {...props} />
}
export const inlineCommandSearchSlots: CommandSearchSlots = {
  Root,
  Input: defaultCommandPaletteSlots.Input,
  List: defaultCommandPaletteSlots.List,
  Empty: defaultCommandPaletteSlots.Empty,
  Item: defaultCommandPaletteSlots.Item,
  Group: defaultCommandPaletteSlots.Group,
  Separator: defaultCommandPaletteSlots.Separator,
  Shortcut: defaultCommandPaletteSlots.Shortcut,
}
/** Always-visible command search, with no dialog, focus trap, trigger or close policy. */
export function CommandSearch(props: CommandSearchProps) {
  return (
    <CommandSearchCore defaultSlots={inlineCommandSearchSlots} {...props} />
  )
}
