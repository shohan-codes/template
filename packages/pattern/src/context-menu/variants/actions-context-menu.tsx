"use client"

import type { ComponentProps, ElementType } from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import { Dropdown, type DropdownProps } from "../../dropdown"
import {
  ContextMenuCore,
  type ContextMenuProps,
  type ContextMenuSlots,
} from "../core"
import { defaultContextMenuSlots } from "./default-context-menu"

export type ActionsContextMenuSlots = ContextMenuSlots &
  Readonly<{
    Container: ElementType
    ActionMenu: ElementType
  }>

function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("flex w-full flex-col items-end gap-2", className)}
    />
  )
}

export const actionsContextMenuSlots: ActionsContextMenuSlots = {
  ...defaultContextMenuSlots,
  Container,
  ActionMenu: Dropdown,
}

export type ActionsContextMenuProps = Omit<
  ContextMenuProps,
  "slots" | "defaultSlots"
> & {
  /** Visible label for a conventional button that opens the same actions. */
  menuLabel: string
  slots?: Partial<ActionsContextMenuSlots>
  defaultSlots?: ActionsContextMenuSlots
  $container?: Omit<ComponentProps<"div">, "children">
  $actionMenu?: Omit<DropdownProps, "items" | "trigger" | "$trigger"> & {
    $trigger?: Omit<NonNullable<DropdownProps["$trigger"]>, "asChild">
  }
}

/** The same contextual actions through right-click, keyboard, or a visible button. */
export function ActionsContextMenu({
  menuLabel,
  defaultSlots = actionsContextMenuSlots,
  slots,
  $container,
  $actionMenu,
  ...props
}: ActionsContextMenuProps) {
  if (props.items.length === 0) return null
  const P = slots ? { ...defaultSlots, ...slots } : defaultSlots
  return (
    <P.Container {...$container}>
      <ContextMenuCore defaultSlots={P} {...props} />
      <P.ActionMenu
        {...$actionMenu}
        items={props.items}
        trigger={menuLabel}
        $trigger={{
          ...$actionMenu?.$trigger,
          asChild: false,
          disabled: props.$trigger?.disabled || $actionMenu?.$trigger?.disabled,
        }}
      />
    </P.Container>
  )
}
