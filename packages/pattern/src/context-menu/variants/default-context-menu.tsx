"use client"

import {
  ContextMenu as Root,
  ContextMenuTrigger as PrimitiveTrigger,
  ContextMenuContent as PrimitiveContent,
  ContextMenuItem as Item,
  ContextMenuLabel as Label,
  ContextMenuSeparator as Separator,
  ContextMenuGroup as Group,
  ContextMenuShortcut as Shortcut,
  ContextMenuCheckboxItem as CheckboxItem,
  ContextMenuRadioGroup as RadioGroup,
  ContextMenuRadioItem as RadioItem,
  ContextMenuSub as Sub,
  ContextMenuSubTrigger as SubTrigger,
  ContextMenuSubContent as PrimitiveSubContent,
  ContextMenuPortal as Portal,
} from "@workspace/shadcn-ui"
import type { ComponentProps } from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  ContextMenuCore,
  type ContextMenuProps,
  type ContextMenuSlots,
} from "../core"

/** Bridge keyboard context-menu requests into Radix's positioning/open handler.
 * Radix still owns focus, typeahead, dismissal, pointer and long-press handling.
 */
function Trigger({
  onKeyDown,
  disabled,
  asChild,
  children,
  className,
  ...props
}: ComponentProps<typeof PrimitiveTrigger>) {
  return (
    <PrimitiveTrigger
      aria-haspopup="menu"
      aria-disabled={disabled || undefined}
      {...props}
      asChild={asChild}
      disabled={disabled}
      className={cn(
        !asChild &&
          "outline-none focus-visible:ring-2 focus-visible:ring-ring data-disabled:opacity-50",
        className
      )}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (
          event.defaultPrevented ||
          disabled ||
          event.target !== event.currentTarget
        )
          return
        if (
          event.key !== "ContextMenu" &&
          !(event.shiftKey && event.key === "F10")
        )
          return
        event.preventDefault()
        const target = event.currentTarget
        const bounds = target.getBoundingClientRect()
        target.dispatchEvent(
          new MouseEvent("contextmenu", {
            bubbles: true,
            cancelable: true,
            clientX: bounds.left + bounds.width / 2,
            clientY: bounds.top + bounds.height / 2,
          })
        )
      }}
    >
      {children}
    </PrimitiveTrigger>
  )
}

function Content({
  className,
  ...props
}: ComponentProps<typeof PrimitiveContent>) {
  return (
    <PrimitiveContent
      collisionPadding={8}
      {...props}
      className={cn(
        "w-60 max-w-(--radix-context-menu-content-available-width) min-w-0",
        className
      )}
    />
  )
}

function SubContent({
  className,
  ...props
}: ComponentProps<typeof PrimitiveSubContent>) {
  return (
    <PrimitiveSubContent
      collisionPadding={8}
      {...props}
      className={cn(
        "w-52 max-w-(--radix-context-menu-content-available-width) min-w-0",
        className
      )}
    />
  )
}

export const defaultContextMenuSlots: ContextMenuSlots = {
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

export function ContextMenu({
  defaultSlots = defaultContextMenuSlots,
  ...props
}: ContextMenuProps) {
  return <ContextMenuCore defaultSlots={defaultSlots} {...props} />
}
