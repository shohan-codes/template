# Toolbar

Import `Toolbar` or `FloatingToolbar` from `@workspace/pattern/toolbar`.

Both variants use Radix Toolbar behavior and existing shadcn button/toggle styles. The default is a plain bordered surface. FloatingToolbar provides a rounded elevated surface suitable for selection controls; the host controls placement.

## Data and state

Every entry has a stable `id` and a `type`:

- `action`: visible `label`, optional `icon`, `disabled`, accessible `aria-label`, and `onSelect` click handler. It renders a non-submit button.
- `link`: visible label and required `href`; navigation remains a real anchor.
- `separator`: a decorative divider that follows the toolbar orientation.
- `toggle-group`: label, `items`, optional disabled state, and `selectionMode: "single" | "multiple"`. Single selection uses string values; multiple selection uses string arrays. Use controlled `value`/`onValueChange` or `defaultValue`.

Toggle options have `id`, `value`, `label`, optional `icon`, `disabled`, and `aria-label`. Supply an accessible label for icon-only content. A single-selection group may clear its selected value unless the consumer ignores the empty value in its controlled callback.

The toolbar requires an `aria-label`. Arrow keys, Home and End use Radix roving focus, skipping disabled controls. `orientation="vertical"` changes arrow handling. Enter/Space activate controls. The layout wraps within narrow containers.

## Extension points

Ready-to-use variants supply `defaultSlots`; `ToolbarCore` accepts them explicitly. Runtime `slots` and typed `$button`, `$link`, `$toggleGroup`, `$toggleItem`, and `$separator` props are optional. Core-owned selection, disabled state, destinations, and button type cannot be replaced through typed presentation props. Custom slots must retain the primitive's semantics and forwarded ref/props.

Showcases cover default actions, independently selected formatting options, controlled single selection, vertical focus, and an icon-only floating variant. Contract tests and TypeScript negative fixtures verify the public API.
