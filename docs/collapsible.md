# Collapsible

Import `Collapsible`, `CardCollapsible`, and `CollapsibleItemData` from
`@workspace/pattern/collapsible`.

`Collapsible` is a neutral disclosure: a button, an indicator, and expandable
content. It does not add a card border or background. Choose `CardCollapsible`
for the previous bordered-card presentation.

## Data-first content

```tsx
const items = [
  { id: "summary", type: "content", content: "Project overview" },
  { id: "divider", type: "separator" },
  {
    id: "release",
    type: "group",
    label: "Release",
    items: [
      {
        id: "checks",
        type: "disclosure",
        trigger: "Quality checks",
        items: [{ id: "tests", type: "content", content: "Run the tests." }],
      },
    ],
  },
] satisfies readonly CollapsibleItemData[]

<Collapsible trigger="Project details" items={items} />
```

- `content`: a content row with default wrapping and typography.
- `separator`: a semantic horizontal divider.
- `group`: a visibly labeled, accessible content group. Its `items` can contain
  more groups or any other item type. A group does not add an expand button.
- `disclosure`: a nested Collapsible with its own trigger and open state.
  It supports `open`, `defaultOpen`, `onOpenChange`, `disabled`, `$trigger`, and
  `$content`. Use this instead of `submenu`: content is not a menu and does not
  gain menu roles, arrow-key navigation, or selection behavior.
- `custom`: arbitrary React content, rendered without an additional wrapper by
  default. Use it for links, controls, or an exceptional layout. Consumers own
  that content's labels, semantics, responsive layout, and keyboard behavior.

Use stable IDs unique within each sibling array. The same ID may appear in
separate groups. An empty `items` array renders an empty disclosure, not `null`.

## State and composition

Root state retains the original Radix contract: `defaultOpen` is uncontrolled;
`open` with `onOpenChange` is controlled. Nested disclosures are independent.
Closing an ancestor normally unmounts its content, so uncontrolled descendant
state resets when it remounts. Lift state into `open` / `onOpenChange` when it must
survive closing an ancestor. `disabled` disables that disclosure's trigger, not
arbitrary controls in its content.

Existing `<Collapsible trigger="Details">…</Collapsible>` usage remains valid.
When both `items` and `children` are supplied, items render first, followed by
children. Text triggers become non-submit buttons. For a custom button, pass
`$trigger={{ asChild: true }}` and one accessible, ref-capable button as `trigger`.
Do not place interactive controls inside the ordinary trigger label.

The existing children-only `$content={{ asChild: true }}` composition keeps its
single custom content element. With `items`, `asChild` uses a plain generated
`div` to hold the data content; use children-only composition when you need to
supply the content element yourself.

## Presentation layers

`CollapsibleCore` requires injected `defaultSlots`. `Collapsible` provides
`defaultCollapsibleSlots`; `CardCollapsible` provides `cardCollapsibleSlots`.
Per-instance `slots` override injected defaults and also apply recursively.

The original required `Root`, `Trigger`, and `Content` slots are unchanged.
Optional `Item`, `Group`, `GroupLabel`, `Separator`, and `Custom` slots use
semantic HTML fallbacks when omitted, so existing three-slot integrations work.
Custom slots must forward supplied props, children, accessibility attributes,
and refs as appropriate. Core behavior still depends on suitable disclosure
primitives in the three original slots.

Root `$trigger` and `$content` props do not automatically propagate into nested
disclosures, avoiding duplicate DOM IDs and unrelated event handlers. Set those
props on the nested data item when needed.

The showcase separates neutral data-first, recursive, controlled, card, and
optional-customization examples. The default is usable without custom slots.
