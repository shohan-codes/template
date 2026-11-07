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
import { useId, type ComponentProps } from "react"
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
  "aria-describedby": describedBy,
  ...props
}: ComponentProps<typeof PrimitiveTrigger>) {
  const hintId = useId()
  return (
    <PrimitiveTrigger
      aria-haspopup="menu"
      aria-disabled={disabled || undefined}
      {...props}
      asChild={asChild}
      disabled={disabled}
      aria-describedby={
        asChild ? describedBy : [describedBy, hintId].filter(Boolean).join(" ")
      }
      className={cn(
        !asChild &&
          "flex min-h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/30 p-6 text-center outline-none focus-visible:ring-2 focus-visible:ring-ring data-disabled:opacity-50",
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
      {asChild ? (
        children
      ) : (
        <>
          <span className="font-medium">{children}</span>
          <span id={hintId} className="text-xs text-muted-foreground">
            Right-click, press and hold, or focus and press Shift+F10
          </span>
        </>
      )}
    </PrimitiveTrigger>
  )
}

function Content({
  className,
  ...props
}: ComponentProps<typeof PrimitiveContent>) {
  return <PrimitiveContent {...props} className={cn("w-60", className)} />
}

function SubContent({
  className,
  ...props
}: ComponentProps<typeof PrimitiveSubContent>) {
  return <PrimitiveSubContent {...props} className={cn("w-52", className)} />
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

export function ContextMenu(props: ContextMenuProps) {
  return <ContextMenuCore defaultSlots={defaultContextMenuSlots} {...props} />
}
