"use client"

import type * as React from "react"
import { Fragment } from "react"
import type {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from "@workspace/shadcn-ui"

export type DropdownSlots = Readonly<{
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

type Entry = Readonly<{ id: string }>
type LabeledEntry = Entry &
  Readonly<{
    label: React.ReactNode
    icon?: React.ReactNode
    disabled?: boolean
    /** Accessible typeahead text when label contains more than plain text. */
    textValue?: string
  }>

export type DropdownActionItem = LabeledEntry &
  Readonly<{
    type: "action"
    shortcut?: React.ReactNode
    variant?: "default" | "destructive"
    onSelect?: (event: Event) => void
  }>
export type DropdownCheckboxItem = LabeledEntry &
  Readonly<{
    type: "checkbox"
    checked: boolean | "indeterminate"
    onCheckedChange?: (checked: boolean) => void
    /** Prevent default to keep the menu open while toggling multiple choices. */
    onSelect?: (event: Event) => void
  }>
export type DropdownRadioOption = LabeledEntry & Readonly<{ value: string }>
export type DropdownItemData =
  | DropdownActionItem
  | DropdownCheckboxItem
  | (Entry & Readonly<{ type: "separator" }>)
  | (Entry & Readonly<{ type: "label"; label: React.ReactNode }>)
  | (Entry &
      Readonly<{
        type: "group"
        label: string
        items: readonly DropdownItemData[]
      }>)
  | (LabeledEntry &
      Readonly<{ type: "submenu"; items: readonly DropdownItemData[] }>)
  | (Entry &
      Readonly<{
        type: "radio-group"
        label: string
        value: string
        onValueChange?: (value: string) => void
        items: readonly DropdownRadioOption[]
      }>)

export type DropdownBaseProps = Omit<
  React.ComponentProps<typeof DropdownMenu>,
  "children"
> & {
  items: readonly DropdownItemData[]
  /** Text is rendered in a native button; use $trigger.asChild for a custom button. */
  trigger: React.ReactNode
  slots?: Partial<DropdownSlots>
  $trigger?: Omit<React.ComponentProps<typeof DropdownMenuTrigger>, "children">
  $content?: Omit<React.ComponentProps<typeof DropdownMenuContent>, "children">
  $item?: Omit<
    React.ComponentProps<typeof DropdownMenuItem>,
    "children" | "onSelect" | "disabled" | "asChild" | "variant" | "textValue"
  >
  $subContent?: Omit<
    React.ComponentProps<typeof DropdownMenuSubContent>,
    "children"
  >
}
export type DropdownProps = DropdownBaseProps & { defaultSlots?: DropdownSlots }
export type DropdownCoreProps = DropdownBaseProps & {
  defaultSlots: DropdownSlots
}

/** Data controls menu structure; injected slots control presentation and primitives. */
export function DropdownCore({
  items,
  trigger,
  defaultSlots,
  slots,
  $trigger,
  $content,
  $item,
  $subContent,
  ...root
}: DropdownCoreProps) {
  const P = slots ? { ...defaultSlots, ...slots } : defaultSlots

  function renderItems(entries: readonly DropdownItemData[]): React.ReactNode {
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
      <P.Trigger {...$trigger}>{trigger}</P.Trigger>
      <P.Content {...$content}>{renderItems(items)}</P.Content>
    </P.Root>
  )
}
