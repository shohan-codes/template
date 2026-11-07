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
export const invalidType: CommandItemData = {
  id: "sub",
  // @ts-expect-error Commands are not submenus.
  type: "submenu",
  label: "More",
  items: [],
}
export const invalidLabel: CommandItemData = {
  id: "open",
  type: "action",
  // @ts-expect-error Labels must provide plain searchable text.
  label: <span>Open</span>,
}
export const nestedGroup: CommandItemData = {
  id: "outer",
  type: "group",
  label: "Outer",
  // @ts-expect-error Groups intentionally cannot nest.
  items: [{ id: "inner", type: "group", label: "Inner", items: [] }],
}
export const missingSlots = (
  // @ts-expect-error Core requires explicit default slots.
  <CommandPaletteCore items={items} trigger="Commands" />
)
// @ts-expect-error Inline search has no dialog state.
export const inlineOpen = <CommandSearch items={items} open />
export const invalidItemProps = (
  // @ts-expect-error Data owns disabled state.
  <CommandSearch items={items} $item={{ disabled: true }} />
)
export const invalidInputProps = (
  // @ts-expect-error Query state has a dedicated prop.
  <CommandSearch items={items} $input={{ value: "query" }} />
)
export const invalidSlot = (
  // @ts-expect-error Unknown slots cannot silently go unused.
  <CommandSearch items={items} slots={{ Content: "div" }} />
)
