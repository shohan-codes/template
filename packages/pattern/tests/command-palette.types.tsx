import {
  CommandPalette,
  CommandPaletteCore,
  CommandSearch,
  type CommandItemData,
} from "../src/command-palette"

const items = [
  { id: "open", type: "action", label: "Open", keywords: ["home"] },
  { id: "divider", type: "separator" },
  {
    id: "group",
    type: "group",
    label: "Navigation",
    items: [
      {
        id: "projects",
        type: "action",
        label: "Projects",
        closeOnSelect: false,
      },
    ],
  },
] as const satisfies readonly CommandItemData[]

export const validPalette = (
  <CommandPalette
    items={items}
    trigger="Commands"
    onAction={(item) => item.onSelect?.(item.id)}
    $content={{ onEscapeKeyDown: (event) => event.preventDefault() }}
    $input={{ autoComplete: "off" }}
  />
)
export const validInline = (
  <CommandSearch
    items={items}
    query="home"
    onQueryChange={(query) => query.toUpperCase()}
    $item={{ className: "my-item" }}
  />
)
// @ts-expect-error Stable IDs are required.
export const missingId: CommandItemData = { type: "action", label: "Open" }
// @ts-expect-error Commands are not submenus.
export const invalidType: CommandItemData = {
  id: "sub",
  type: "submenu",
  label: "More",
  items: [],
}
// @ts-expect-error Labels must provide plain searchable text.
export const invalidLabel: CommandItemData = {
  id: "open",
  type: "action",
  label: <span>Open</span>,
}
// @ts-expect-error Groups intentionally cannot nest.
export const nestedGroup: CommandItemData = {
  id: "outer",
  type: "group",
  label: "Outer",
  items: [{ id: "inner", type: "group", label: "Inner", items: [] }],
}
// @ts-expect-error Core requires explicit default slots.
export const missingSlots = (
  <CommandPaletteCore items={items} trigger="Commands" />
)
// @ts-expect-error Inline search has no dialog state.
export const inlineOpen = <CommandSearch items={items} open />
// @ts-expect-error Data owns disabled state.
export const invalidItemProps = (
  <CommandSearch items={items} $item={{ disabled: true }} />
)
// @ts-expect-error Query state has a dedicated prop.
export const invalidInputProps = (
  <CommandSearch items={items} $input={{ value: "query" }} />
)
// @ts-expect-error Unknown slots cannot silently go unused.
export const invalidSlot = (
  <CommandSearch items={items} slots={{ Content: "div" }} />
)
