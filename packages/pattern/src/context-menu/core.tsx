"use client"

import { resolveSlots } from "../utilities/resolve-slots"
import type * as React from "react"
import { Fragment } from "react"
import type {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuSubContent,
  ContextMenuItem,
} from "@workspace/shadcn-ui"

export type ContextMenuSlots = Readonly<{
  Root: React.ElementType
  Trigger: React.ElementType
  Content: React.ElementType
  Item: React.ElementType
  Label: React.ElementType
  Separator: React.ElementType
  Group: React.ElementType
  Shortcut: React.ElementType
  CheckboxItem: React.ElementType
  RadioGroup: React.ElementType
  RadioItem: React.ElementType
  Sub: React.ElementType
  SubTrigger: React.ElementType
  SubContent: React.ElementType
  Portal: React.ElementType
}>

// Share the data contract without coupling dropdown and context-menu primitives.
export type {
  DropdownActionItem as ContextMenuActionItem,
  DropdownCheckboxItem as ContextMenuCheckboxItem,
  DropdownRadioOption as ContextMenuRadioOption,
  DropdownItemData as ContextMenuItemData,
} from "../dropdown/core"
import type { DropdownItemData as ContextMenuItemData } from "../dropdown/core"

export type ContextMenuBaseProps = Omit<
  React.ComponentProps<typeof ContextMenu>,
  "children"
> & {
  items: readonly ContextMenuItemData[]
  /** Content for the default styled, focusable surface. Use $trigger.asChild for a custom element. */
  trigger: React.ReactNode
  slots?: Partial<ContextMenuSlots>
  $trigger?: Omit<React.ComponentProps<typeof ContextMenuTrigger>, "children">
  $content?: Omit<React.ComponentProps<typeof ContextMenuContent>, "children">
  $item?: Omit<
    React.ComponentProps<typeof ContextMenuItem>,
    "children" | "onSelect" | "disabled" | "asChild" | "variant" | "textValue"
  >
  $subContent?: Omit<
    React.ComponentProps<typeof ContextMenuSubContent>,
    "children"
  >
}
export type ContextMenuProps = ContextMenuBaseProps & {
  defaultSlots?: ContextMenuSlots
}
export type ContextMenuCoreProps = ContextMenuBaseProps & {
  defaultSlots: ContextMenuSlots
}

/** Data controls menu structure; injected slots control presentation and primitives. */
export function ContextMenuCore({
  items,
  trigger,
  defaultSlots,
  slots,
  $trigger,
  $content,
  $item,
  $subContent,
  ...root
}: ContextMenuCoreProps) {
  const P = resolveSlots(defaultSlots, slots)

  function renderItems(
    entries: readonly ContextMenuItemData[]
  ): React.ReactNode {
    return entries.map((item) => {
      switch (item.type) {
        case "separator":
          return <P.Separator key={item.id} />
        case "label":
          return <P.Label key={item.id}>{item.label}</P.Label>
        case "group":
          return (
            <P.Group key={item.id} aria-label={item.label}>
              {renderItems(item.items)}
            </P.Group>
          )
        case "radio-group":
          return (
            <P.RadioGroup
              key={item.id}
              aria-label={item.label}
              value={item.value}
              onValueChange={item.onValueChange}
            >
              {item.items.map((option) => (
                <P.RadioItem
                  {...$item}
                  key={option.id}
                  value={option.value}
                  disabled={option.disabled}
                  textValue={option.textValue}
                >
                  <Fragment key="icon">{option.icon}</Fragment>
                  <Fragment key="label">{option.label}</Fragment>
                </P.RadioItem>
              ))}
            </P.RadioGroup>
          )
        case "submenu":
          return (
            <P.Sub key={item.id}>
              <P.SubTrigger
                {...$item}
                disabled={item.disabled}
                textValue={item.textValue}
              >
                <Fragment key="icon">{item.icon}</Fragment>
                <Fragment key="label">{item.label}</Fragment>
              </P.SubTrigger>
              <P.Portal>
                <P.SubContent {...$subContent}>
                  {renderItems(item.items)}
                </P.SubContent>
              </P.Portal>
            </P.Sub>
          )
        case "checkbox":
          return (
            <P.CheckboxItem
              {...$item}
              key={item.id}
              disabled={item.disabled}
              textValue={item.textValue}
              checked={item.checked}
              onCheckedChange={item.onCheckedChange}
              onSelect={item.onSelect}
            >
              <Fragment key="icon">{item.icon}</Fragment>
              <Fragment key="label">{item.label}</Fragment>
            </P.CheckboxItem>
          )
        case "action":
          return (
            <P.Item
              {...$item}
              key={item.id}
              disabled={item.disabled}
              textValue={item.textValue}
              variant={item.variant}
              onSelect={item.onSelect}
            >
              <Fragment key="icon">{item.icon}</Fragment>
              <Fragment key="label">{item.label}</Fragment>
              {item.shortcut != null && (
                <P.Shortcut key="shortcut">{item.shortcut}</P.Shortcut>
              )}
            </P.Item>
          )
      }
    })
  }

  if (items.length === 0) return null
  return (
    <P.Root {...root}>
      <P.Trigger tabIndex={$trigger?.disabled ? -1 : 0} {...$trigger}>
        {trigger}
      </P.Trigger>
      <P.Content {...$content}>{renderItems(items)}</P.Content>
    </P.Root>
  )
}
