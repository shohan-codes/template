# Context Menu variants

All designs accept the same readonly `ContextMenuItemData[]` contract as Dropdown: actions, labels, groups, separators, submenus, checkboxes and radio groups. The simple `ContextMenu` remains a neutral, focusable right-click surface. It renders caller-provided trigger content without a card, fixed height, padding, tint, or instruction text. Keyboard opening and focus indicators remain built in. Use `$trigger.className`, `$trigger["aria-describedby"]`, or `$trigger.asChild` for an optional styled surface and caller-owned guidance; the preferences showcase demonstrates this.

- `ActionsContextMenu` adds a visible, keyboard-accessible actions button for people who do not use right-click or press-and-hold. The context menu and button menu receive the exact same item data and callbacks, so controlled preferences remain synchronized.
- `SelectionContextMenu` chooses single-item, multiple-item or optional empty-selection actions from caller-owned selection IDs. It adds a visible selection summary and menu label.

## Imports and customization

Use `@workspace/pattern/context-menu`, the package root, or a direct design path:

- `@workspace/pattern/context-menu/variants/actions-context-menu`
- `@workspace/pattern/context-menu/variants/selection-context-menu`

Both retain the default core's `trigger`, native root props, `slots`, `defaultSlots`, `$trigger`, `$content`, `$item` and `$subContent`. Custom slots must preserve primitive keyboard, focus and accessible-name behavior.

`ActionsContextMenu` also requires `menuLabel`, the visible actions button text. `slots.Container`, `slots.ActionMenu` and `$container` customize the composition. `$actionMenu` configures the separate Dropdown, including its slots, open state and content alignment. Its trigger remains a real button; use the action-menu slot for a complete custom rendering. Disabling the context surface also disables the visible button. An empty item list renders nothing.

`SelectionContextMenu` requires `selectedIds`, single-selection `items`, and `multipleItems`. Repeated IDs count only once. `emptyItems` supplies optional zero-selection actions, and `selectionLabel(count)` customizes the summary. If the selected action list is empty, the entire surface is hidden: show the caller's empty-state guidance alongside it. Selection remains caller-owned; selecting a menu action never implicitly changes the selected IDs. With `$trigger.asChild`, the supplied custom element is preserved without wrapping, and the selection summary is shown in the menu only.

## Showcase routes

- `/components/context-menu/default`: file actions, controlled preferences and custom slots.
- `/components/context-menu/actions`: shared state through contextual and visible-button entry points.
- `/components/context-menu/selection`: single, multiple and empty selection states.

The examples only update local demo state. They do not change real files.
