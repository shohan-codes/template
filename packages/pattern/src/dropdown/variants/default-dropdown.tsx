"use client"

import {
  DropdownMenu as Root,
  DropdownMenuTrigger as PrimitiveTrigger,
  DropdownMenuContent as PrimitiveContent,
  DropdownMenuItem as Item,
  DropdownMenuLabel as Label,
  DropdownMenuSeparator as Separator,
  DropdownMenuGroup as Group,
  DropdownMenuShortcut as Shortcut,
  DropdownMenuCheckboxItem as CheckboxItem,
  DropdownMenuRadioGroup as RadioGroup,
  DropdownMenuRadioItem as RadioItem,
  DropdownMenuSub as Sub,
  DropdownMenuSubTrigger as SubTrigger,
  DropdownMenuSubContent as SubContent,
  DropdownMenuPortal as Portal,
} from "@workspace/shadcn-ui"
import type * as React from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@workspace/shadcn-ui/components/button"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import { DropdownCore, type DropdownProps, type DropdownSlots } from "../core"

function Trigger({
  children,
  asChild,
  ...props
}: React.ComponentProps<typeof PrimitiveTrigger>) {
  if (asChild)
    return (
      <PrimitiveTrigger asChild {...props}>
        {children}
      </PrimitiveTrigger>
    )
  return (
    <PrimitiveTrigger asChild {...props}>
      <Button variant="outline">
        {children}
        <ChevronDown className="size-4" aria-hidden="true" />
      </Button>
    </PrimitiveTrigger>
  )
}

function Content({
  className,
  ...props
}: React.ComponentProps<typeof PrimitiveContent>) {
  return <PrimitiveContent className={cn("min-w-48", className)} {...props} />
}

export const defaultDropdownSlots: DropdownSlots = {
  Root,
  Trigger,
  Content,
  Item,
  Label,
  Separator,
  Group,
  Shortcut,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  Sub,
  SubTrigger,
  SubContent,
  Portal,
}

export function Dropdown(props: DropdownProps) {
  return <DropdownCore defaultSlots={defaultDropdownSlots} {...props} />
}
