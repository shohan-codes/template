# Command Palette

Import `CommandPalette`, `CommandSearch`, and `CommandItemData` from
`@workspace/pattern/command-palette`.

`CommandPalette` is a neutral shadcn dialog opened by an outline button. Title
and description are inside the dialog content, including when visually hidden.
`CommandSearch` is a separate inline variant with a compact border, no trigger,
no focus trap, and no open state. Both are useful with only typed data.

```tsx
const items = [
  { id: "overview", type: "action", label: "Open overview", keywords: ["home"] },
  { id: "divider", type: "separator" },
  {
    id: "projects", type: "group", label: "Projects",
    items: [{ id: "create", type: "action", label: "Create project" }],
  },
] as const satisfies readonly CommandItemData[]

<CommandPalette trigger="Open commands" items={items} onAction={runAction} />
<CommandSearch items={items} label="Find an action" onAction={runAction} />
```

## Data and search

- `action`: a required plain-text `label`, optional icon, keywords, shortcut hint,
  disabled state, `onSelect(id)`, and palette-only `closeOnSelect` override.
- `group`: a visible label and readonly actions/separators. Groups cannot nest.
- `separator`: a divider, hidden during filtering by the cmdk primitive.

Use stable IDs unique throughout one command search, including actions in different
groups. IDs are command values and React keys, not DOM IDs. Search matches IDs,
labels and optional keywords. Duplicate labels are fine when IDs differ.

The input has the accessible `label` (default: "Search commands"). `placeholder`
and `empty` customize visible messages. Empty arrays still render searchable UI
and the empty state. Disabled commands cannot be selected. Arrow keys, Home/End
and Enter follow cmdk behavior; navigation loops by default. `$root.loop` can turn
looping off. Shortcut hints are display-only. No global keyboard listener is
installed. Applications may own an explicit shortcut and controlled open state.

## State and selection

`open` and `onOpenChange` control the palette, or use `defaultOpen` for internal
state. `query` and `onQueryChange` control search text; `defaultQuery` initializes
uncontrolled search. An uncontrolled query resets when dialog content unmounts.
Use controlled query state when it must survive close/reopen.

Selection calls the item's `onSelect(id)`, then `onAction(item)`. The palette
then closes when the item's `closeOnSelect` is supplied, or the palette's policy
(default `true`) permits it. `closeOnSelect={false}` supports repeated actions.
Inline search never dismisses. These are synchronous notifications, not promises
or cancelable DOM events. Manage pending async work in application state. A
controlled parent must update state in response to callbacks.

Radix supplies Escape, outside dismissal, modal focus containment and restoration
to the trigger. Text triggers become non-submit buttons. For your own accessible,
ref-capable button use `$trigger={{ asChild: true }}`. `$content` supports Radix
focus/dismissal handlers; prevent default only when intentionally overriding that
behavior. Supply useful `title` and `description` for your application's task.

## Slots and variants

`CommandSearchCore` requires `defaultSlots: CommandSearchSlots`;
`CommandPaletteCore` requires the same command slots plus `Dialog`, `Trigger`,
`Content`, `Title`, and `Description`. Public wrappers supply
`defaultCommandPaletteSlots` and `inlineCommandSearchSlots` respectively.
Runtime `slots` override those defaults. Custom command slots must retain cmdk
props, refs, filtering and keyboard semantics; dialog slots must retain Radix
semantics. Slots are a presentation contract, not a plain-div substitute for
interactive primitives.

Typed `$root`, `$input`, `$list`, `$empty`, `$item`, `$trigger`, `$content`,
`$title`, and `$description` props configure their matching primitives. Data-owned
item values, keywords, disabled state and selection handlers cannot be replaced
through `$item`. For controlled highlighted command selection (distinct from
query text), use `$root.value` and `$root.onValueChange` with action IDs. Server
filtering can use `$root.shouldFilter={false}` and externally supplied items.

The showcase has default modal, inline, controlled keep-open, and optional slot
customization examples, each with working viewport/theme controls and standalone
preview routes. Inside the optional showcase PreviewScope only, dialogs portal
into that scope and are non-modal so one embedded example does not disable the
entire showcase. Ordinary application dialogs remain modal.
