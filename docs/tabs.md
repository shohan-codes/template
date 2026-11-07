# Tabs: typed selection and legacy compatibility

Tabs, SegmentedTabs, and FolderTabs share the same data and state contract. Their existing designs remain separate imports. `Tabs` is the neutral default, `SegmentedTabs` is a compact switcher, and `FolderTabs` connects a tab strip to enclosed or floating panels.

## Recommended selection API

```tsx
import { Tabs, type TypedTabItemData } from "@workspace/pattern/tabs"

const items = [
  { id: "overview", type: "tab", label: "Overview", content: <Overview /> },
  { id: "details", type: "tab", label: "Details", content: <Details /> },
] satisfies readonly TypedTabItemData[]

<Tabs
  mode="typed"
  items={items}
  defaultValue="overview"
  $list={{ "aria-label": "Project views" }}
/>
```

- Every item requires a unique, nonempty, stable `id`, `type: "tab"`, a `label`, and `content`. The ID is also its selection value. Labels and array order never determine identity.
- `icon`, `badge`, `disabled`, and an item-specific `aria-label` are optional. Give the list an accessible name through `$list`.
- `href` and the legacy `value` alias are rejected. These entries select panels; they do not represent navigation links. Explicitly null panel content still has a panel with its accessibility relationship.
- Use `value` and `onValueChange` for controlled state, or `defaultValue` for uncontrolled state. Null and undefined `value` use uncontrolled behavior. Keep the state model consistent for a mounted instance.
- An absent, removed, unknown, or disabled selection falls back to an enabled `defaultValue`, then the first enabled item. No enabled items means no active panel. Empty arrays render nothing. Fallbacks do not emit change callbacks.
- Automatic activation, manual activation, horizontal/vertical orientation, keyboard navigation, and focus behavior come from the Radix primitives. Disabled entries cannot be selected. Repeated selection of the active value does not emit another change callback.
- `$list`, `$trigger`, and `$content` derive from their primitive props. Owned values, disabled state, children, `asChild`, and accessibility relationships cannot be overridden through these props. `$link` is not available in typed mode. Event handlers may deliberately prevent primitive behavior, so use them carefully.
- Horizontal lists scroll inside their available width when labels are long. Header actions wrap onto another row on narrow containers.
- `slots` override `defaultSlots`. Replacement slots remain an advanced escape hatch and must preserve the Radix primitive contract, refs, keyboard behavior, and accessibility semantics. The component cannot enforce a custom slot's implementation.

## Why `mode="typed"` is explicit

The old API accepts broad slot-prop records, optional IDs, and combined link/panel entries. An items-only union can let those legacy props leak into otherwise typed JSX. A top-level discriminator provides an actual compile-time boundary while preserving existing calls.

The tradeoff is one extra opt-in prop during migration. Other navigation families need not have this mode: they do not share this compatibility constraint. The shared vocabulary is `items`, stable IDs, semantic item types, slots, and state callbacks, not identical contracts for unrelated keyboard models.

## Migrating existing selection tabs

1. Change `TabItemData` to `TypedTabItemData`.
2. Assign each entry a stable ID and `type: "tab"`, and provide its panel content.
3. Add `mode="typed"` to the existing component. All existing visual variants support it.
4. Move trigger `value`/`disabled` overrides into item data and panel content into `content`.
5. Keep URL synchronization in the consumer: derive the selected ID from the URL and update the URL from `onValueChange`. Do not add hrefs to typed panel entries.

Separate design imports remain supported:

```tsx
import { Tabs } from "@workspace/pattern/tabs/variants/default-tabs"
import { SegmentedTabs } from "@workspace/pattern/tabs/variants/segmented-tabs"
import { FolderTabs } from "@workspace/pattern/tabs/variants/folder-tabs"
import type { TypedTabItemData, TypedTabsProps } from "@workspace/pattern/tabs"
```

## Deprecated legacy API

Existing `TabItemData`, `getTabId`, omitted mode, and `mode="legacy"` continue working. `TabItemData` aliases the explicitly deprecated `LegacyTabItemData`, whose `type?: never` prevents mixing strict entries into the compatibility branch.

The legacy branch retains:

- Identifier fallback order: `id`, `value`, `href`, a slug of the string label, then the array index.
- Optional content, mixed href/content entries, Next.js/custom Link slots, and broad `$link` props such as `scroll: false`.
- Existing null/undefined handling and invalid query/hash value fallback rules.
- Existing slot-prop override ordering. These permissive overrides are deliberately not advertised as the safe API.

The query/hash showcase examples stay on this branch to demonstrate compatibility. Legacy anchor-as-tab semantics are unchanged; new route-only navigation should use a navigation component with real anchors and navigation semantics. There is no new `type: "link"` entry squeezed into a tabpanel model.

The shared shadcn Tabs root now forwards `orientation` to Radix. This fixes a pre-existing mismatch where vertical styling still had horizontal keyboard behavior and ARIA orientation.

## Verification

- `packages/pattern/tests/tabs.typecheck.tsx`: positive legacy/typed JSX and negative item, mode, slot, and accessibility fixtures.
- `packages/pattern/tests/tabs.test.mjs`: built-package SSR and event-contract tests across all existing designs, stable identity, enabled fallbacks, runtime slot protections, and legacy URL/router compatibility.
- Browser validation should also exercise pointer and arrow-key selection, manual activation, disabled items, controlled callbacks, and legacy query/hash back/forward navigation. SSR alone does not verify browser focus or history behavior.
