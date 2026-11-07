"use client"

import type { ComponentProps, ReactNode } from "react"
import { Ellipsis } from "lucide-react"
import { DropdownMenuTrigger } from "@workspace/shadcn-ui"
import { Button } from "@workspace/shadcn-ui/components/button"
import { DropdownCore, type DropdownProps, type DropdownSlots } from "../core"
import { defaultDropdownSlots } from "./default-dropdown"

function Trigger({
  children,
  ...props
}: ComponentProps<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenuTrigger {...props} asChild>
      <Button variant="ghost" size="icon">
        {children}
      </Button>
    </DropdownMenuTrigger>
  )
}

export const iconDropdownSlots: DropdownSlots = {
  ...defaultDropdownSlots,
  Trigger,
}

export type IconDropdownProps = Omit<DropdownProps, "trigger" | "$trigger"> & {
  /** Required accessible name for the icon-only trigger. */
  label: string
  icon?: ReactNode
  $trigger?: Omit<
    NonNullable<DropdownProps["$trigger"]>,
    "asChild" | "aria-label"
  >
}

/** Compact overflow actions for cards, table rows and toolbars. */
export function IconDropdown({
  label,
  icon,
  $trigger,
  ...props
}: IconDropdownProps) {
  return (
    <DropdownCore
      defaultSlots={iconDropdownSlots}
      {...props}
      trigger={icon ?? <Ellipsis aria-hidden="true" />}
      $trigger={{ ...$trigger, "aria-label": label }}
    />
  )
}
