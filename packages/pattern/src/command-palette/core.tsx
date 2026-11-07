"use client"

import { resolveSlots } from "../utilities/resolve-slots"
import * as React from "react"
import type {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@workspace/shadcn-ui/components/command"
import type {
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@workspace/shadcn-ui/components/dialog"

export type CommandSearchSlots = Readonly<{
  Root: React.ElementType
  Input: React.ElementType
  List: React.ElementType
  Empty: React.ElementType
  Item: React.ElementType
  Group: React.ElementType
  Separator: React.ElementType
  Shortcut: React.ElementType
}>
export type CommandPaletteSlots = CommandSearchSlots &
  Readonly<{
    Dialog: React.ElementType
    Trigger: React.ElementType
    Content: React.ElementType
    Title: React.ElementType
    Description: React.ElementType
  }>

type Entry = Readonly<{ id: string }>
export type CommandActionItem = Entry &
  Readonly<{
    type: "action"
    /** Plain text gives every action a predictable accessible name and search text. */
    label: string
    icon?: React.ReactNode
    shortcut?: React.ReactNode
    keywords?: readonly string[]
    disabled?: boolean
    onSelect?: (id: string) => void
    /** Overrides the palette's closeOnSelect policy. Has no effect inline. */
    closeOnSelect?: boolean
  }>
export type CommandSeparatorItem = Entry & Readonly<{ type: "separator" }>
export type CommandItemData =
  | CommandActionItem
  | CommandSeparatorItem
  | (Entry &
      Readonly<{
        type: "group"
        label: string
        /** Command groups are intentionally flat, not nested menus. */
        items: readonly (CommandActionItem | CommandSeparatorItem)[]
      }>)

export type CommandSearchBaseProps = {
  readonly items: readonly CommandItemData[]
  readonly label?: string
  readonly placeholder?: string
  readonly empty?: React.ReactNode
  readonly query?: string
  readonly defaultQuery?: string
  readonly onQueryChange?: (query: string) => void
  readonly onAction?: (item: CommandActionItem) => void
  readonly slots?: Partial<CommandSearchSlots>
  readonly $root?: Omit<
    React.ComponentProps<typeof Command>,
    "children" | "asChild" | "label"
  >
  readonly $input?: Omit<
    React.ComponentProps<typeof CommandInput>,
    | "children"
    | "asChild"
    | "value"
    | "defaultValue"
    | "onValueChange"
    | "placeholder"
    | "aria-label"
  >
  readonly $list?: Omit<
    React.ComponentProps<typeof CommandList>,
    "children" | "asChild"
  >
  readonly $empty?: Omit<
    React.ComponentProps<typeof CommandEmpty>,
    "children" | "asChild"
  >
  readonly $item?: Omit<
    React.ComponentProps<typeof CommandItem>,
    "children" | "asChild" | "value" | "keywords" | "disabled" | "onSelect"
  >
}
export type CommandSearchCoreProps = CommandSearchBaseProps & {
  readonly defaultSlots: CommandSearchSlots
}
export type CommandSearchProps = CommandSearchBaseProps & {
  readonly defaultSlots?: CommandSearchSlots
}
export type CommandPaletteBaseProps = Omit<CommandSearchBaseProps, "slots"> & {
  readonly trigger: React.ReactNode
  readonly title?: string
  readonly description?: string
  readonly open?: boolean
  readonly defaultOpen?: boolean
  readonly onOpenChange?: (open: boolean) => void
  /** Defaults to true. Individual actions can override this. */
  readonly closeOnSelect?: boolean
  readonly slots?: Partial<CommandPaletteSlots>
  readonly $trigger?: Omit<
    React.ComponentProps<typeof DialogTrigger>,
    "children"
  >
  readonly $content?: Omit<
    React.ComponentProps<typeof DialogContent>,
    "children" | "asChild"
  >
  readonly $title?: Omit<
    React.ComponentProps<typeof DialogTitle>,
    "children" | "asChild"
  >
  readonly $description?: Omit<
    React.ComponentProps<typeof DialogDescription>,
    "children" | "asChild"
  >
}
export type CommandPaletteCoreProps = CommandPaletteBaseProps & {
  readonly defaultSlots: CommandPaletteSlots
}
export type CommandPaletteProps = CommandPaletteBaseProps & {
  readonly defaultSlots?: CommandPaletteSlots
}

/** Inject cmdk-compatible slots to retain filtering, keyboard navigation and ARIA semantics. */
export function CommandSearchCore({
  defaultSlots,
  slots,
  items,
  label = "Search commands",
  placeholder = "Search commands...",
  empty = "No commands found.",
  query,
  defaultQuery = "",
  onQueryChange,
  onAction,
  $root,
  $input,
  $list,
  $empty,
  $item,
}: CommandSearchCoreProps) {
  const P = resolveSlots(defaultSlots, slots)
  const [internalQuery, setInternalQuery] = React.useState(defaultQuery)
  function changeQuery(next: string) {
    if (query === undefined) setInternalQuery(next)
    onQueryChange?.(next)
  }
  function renderEntry(item: CommandActionItem | CommandSeparatorItem) {
    if (item.type === "separator") return <P.Separator key={item.id} />
    return (
      <P.Item
        {...$item}
        key={item.id}
        value={item.id}
        keywords={[item.label, ...(item.keywords ?? [])]}
        disabled={item.disabled}
        onSelect={() => {
          if (item.disabled) return
          item.onSelect?.(item.id)
          onAction?.(item)
        }}
      >
        {item.icon != null && (
          <span key="icon" aria-hidden="true">
            {item.icon}
          </span>
        )}
        <span key="label">{item.label}</span>
        {item.shortcut != null && (
          <P.Shortcut key="shortcut">{item.shortcut}</P.Shortcut>
        )}
      </P.Item>
    )
  }
  return (
    <P.Root loop {...$root} label={label}>
      <P.Input
        key="input"
        {...$input}
        aria-label={label}
        placeholder={placeholder}
        value={query ?? internalQuery}
        onValueChange={changeQuery}
      />
      <P.List key="list" {...$list}>
        <P.Empty key="empty" {...$empty}>
          {empty}
        </P.Empty>
        {items.map((item) =>
          item.type === "group" ? (
            <P.Group key={item.id} value={item.id} heading={item.label}>
              {item.items.map(renderEntry)}
            </P.Group>
          ) : (
            renderEntry(item)
          )
        )}
      </P.List>
    </P.Root>
  )
}

/** Dialog slots own Escape, focus trapping and restoration. No document-level shortcut is installed. */
export function CommandPaletteCore({
  defaultSlots,
  slots,
  trigger,
  title = "Command palette",
  description = "Search for an action, then use the arrow keys and Enter to run it.",
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnSelect = true,
  onAction,
  $trigger,
  $content,
  $title,
  $description,
  ...searchProps
}: CommandPaletteCoreProps) {
  const P = resolveSlots(defaultSlots, slots)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  function changeOpen(next: boolean) {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }
  return (
    <P.Dialog open={open ?? internalOpen} onOpenChange={changeOpen}>
      <P.Trigger type="button" {...$trigger}>
        {trigger}
      </P.Trigger>
      <P.Content {...$content}>
        <P.Title {...$title}>{title}</P.Title>
        <P.Description {...$description}>{description}</P.Description>
        <CommandSearchCore
          {...searchProps}
          defaultSlots={P}
          onAction={(item) => {
            onAction?.(item)
            if (item.closeOnSelect ?? closeOnSelect) changeOpen(false)
          }}
        />
      </P.Content>
    </P.Dialog>
  )
}
