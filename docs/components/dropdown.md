# Dropdown variants

The default `Dropdown` stays the general-purpose text-trigger menu. Each variant accepts the same typed `DropdownItemData[]`: actions, labels, groups, separators, nested submenus, checkboxes and radio groups.

| Variant | Use case | Required inputs |
| --- | --- | --- |
| `Dropdown` | General actions and preferences | `items`, `trigger` |
| `IconDropdown` | Compact overflow actions on a card, row or toolbar | `items`, accessible `label` |
| `SplitDropdown` | A primary action with a separate alternatives menu | `items`, `primaryAction`, accessible `menuLabel` |

Import the family from `@workspace/pattern/dropdown`, or one design from `@workspace/pattern/dropdown/variants/icon-dropdown` or `@workspace/pattern/dropdown/variants/split-dropdown`. The package root also exports all designs and their types.

## State and customization

All designs retain the core's `open`, `defaultOpen`, `onOpenChange`, `modal`, `slots`, `defaultSlots`, `$content`, `$item` and `$subContent` APIs. Icon and split triggers accept native `$trigger` props, including `disabled`, and require a textual accessible name. Their trigger is a real, non-submit button. Use `Dropdown` with `$trigger.asChild` when supplying a complete custom trigger element.

`IconDropdown` accepts an optional `icon`. `SplitDropdown` exposes `primaryAction.label`, `icon`, `disabled` and `onClick`, independently of the secondary menu. `$primary` customizes the primary button, `$container` the labelled group, and `slots.Container` / `slots.PrimaryAction` replace these surfaces. With no menu items, the primary action remains available and no empty menu trigger is rendered.

Item callbacks run only from the selected item; opening or dismissing a menu does not invoke the primary action. Checkbox and radio state stays caller-owned. Supplying an item's `onSelect` handler that prevents default keeps the menu open for multi-option adjustments.

The defaults retain Radix menu keyboard navigation, typeahead, disabled-item skipping, Escape dismissal and trigger focus return. Custom slots must preserve those primitive behaviors and accessible names.

## Showcase

- `/components/dropdown/default`: nested actions, preferences and slot customization.
- `/components/dropdown/icon`: compact project actions.
- `/components/dropdown/split`: direct send action, alternatives and controlled open state.

All examples are local demonstrations and do not send messages or mutate real projects.
