"use client"

import { Fragment } from "react"
import type {
  ComponentProps,
  ElementType,
  MouseEventHandler,
  ReactNode,
} from "react"
import type { Toolbar as Primitive } from "radix-ui"

type Entry = Readonly<{ id: string }>
type LabeledEntry = Entry &
  Readonly<{
    label: ReactNode
    icon?: ReactNode
    disabled?: boolean
    "aria-label"?: string
  }>
export type ToolbarActionItem = LabeledEntry &
  Readonly<{ type: "action"; onSelect?: MouseEventHandler<HTMLButtonElement> }>
export type ToolbarLinkItem = Omit<LabeledEntry, "disabled"> &
  Readonly<{ type: "link"; href: string }>
export type ToolbarToggleOption = LabeledEntry & Readonly<{ value: string }>
type ToggleGroup = Entry &
  Readonly<{
    type: "toggle-group"
    label: string
    disabled?: boolean
    items: readonly ToolbarToggleOption[]
  }>
export type ToolbarItemData =
  | ToolbarActionItem
  | ToolbarLinkItem
  | (Entry & Readonly<{ type: "separator" }>)
  | (ToggleGroup &
      Readonly<{
        selectionMode: "single"
        value?: string
        defaultValue?: string
        onValueChange?: (value: string) => void
      }>)
  | (ToggleGroup &
      Readonly<{
        selectionMode: "multiple"
        value?: string[]
        defaultValue?: string[]
        onValueChange?: (value: string[]) => void
      }>)
export type ToolbarSlots = Readonly<{
  Root: ElementType
  Button: ElementType
  Link: ElementType
  Separator: ElementType
  ToggleGroup: ElementType
  ToggleItem: ElementType
}>
export type ToolbarBaseProps = Omit<
  ComponentProps<typeof Primitive.Root>,
  "children" | "asChild"
> & {
  readonly "aria-label": string
  readonly items: readonly ToolbarItemData[]
  readonly slots?: Partial<ToolbarSlots>
  readonly $button?: Omit<
    ComponentProps<typeof Primitive.Button>,
    "children" | "asChild" | "disabled" | "onClick" | "type"
  >
  readonly $link?: Omit<
    ComponentProps<typeof Primitive.Link>,
    "children" | "href" | "asChild"
  >
  readonly $toggleGroup?: Omit<
    ComponentProps<"div">,
    "children" | "defaultValue" | "onChange"
  >
  readonly $toggleItem?: Omit<
    ComponentProps<typeof Primitive.ToggleItem>,
    "children" | "asChild" | "disabled" | "value" | "type"
  >
  readonly $separator?: Omit<
    ComponentProps<typeof Primitive.Separator>,
    "children" | "orientation" | "asChild"
  >
}
export type ToolbarProps = ToolbarBaseProps & {
  readonly defaultSlots?: ToolbarSlots
}
export type ToolbarCoreProps = ToolbarBaseProps & {
  readonly defaultSlots: ToolbarSlots
}

export function ToolbarCore({
  items,
  defaultSlots,
  slots,
  orientation = "horizontal",
  $button,
  $link,
  $toggleGroup,
  $toggleItem,
  $separator,
  ...root
}: ToolbarCoreProps) {
  if (!items.length) return null
  const P = { ...defaultSlots, ...slots }
  return (
    <P.Root {...root} orientation={orientation}>
      {items.map((item) => {
        switch (item.type) {
          case "separator":
            return (
              <P.Separator
                {...$separator}
                key={item.id}
                orientation={
                  orientation === "horizontal" ? "vertical" : "horizontal"
                }
              />
            )
          case "action":
            return (
              <P.Button
                {...$button}
                key={item.id}
                type="button"
                disabled={item.disabled}
                aria-label={item["aria-label"]}
                onClick={item.onSelect}
              >
                <Fragment key="icon">{item.icon}</Fragment>
                <Fragment key="label">{item.label}</Fragment>
              </P.Button>
            )
          case "link":
            return (
              <P.Link
                {...$link}
                key={item.id}
                href={item.href}
                aria-label={item["aria-label"]}
              >
                <Fragment key="icon">{item.icon}</Fragment>
                <Fragment key="label">{item.label}</Fragment>
              </P.Link>
            )
          case "toggle-group":
            return (
              <P.ToggleGroup
                {...$toggleGroup}
                key={item.id}
                type={item.selectionMode}
                value={item.value}
                defaultValue={item.defaultValue}
                onValueChange={item.onValueChange}
                disabled={item.disabled}
                aria-label={item.label}
              >
                {item.items.map((option) => (
                  <P.ToggleItem
                    {...$toggleItem}
                    key={option.id}
                    type="button"
                    value={option.value}
                    disabled={option.disabled}
                    aria-label={option["aria-label"]}
                  >
                    <Fragment key="icon">{option.icon}</Fragment>
                    <Fragment key="label">{option.label}</Fragment>
                  </P.ToggleItem>
                ))}
              </P.ToggleGroup>
            )
        }
      })}
    </P.Root>
  )
}
