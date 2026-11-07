# Composition Slots and Extensibility

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Variant-local cores, direct component reuse, extensible props, default/runtime slots, state ownership, and typed API contracts.

Agreed principles and proposed examples are identified separately. These are architecture instructions, not claims that the new system has been implemented.

## Core and direct reuse

- Keep the core as a direct child of its variant, not necessarily in `shared`.

- Use `core.tsx` for a small core. For a large core, split files by responsibility inside `core/` and expose the necessary exports through `core/index.ts`. Do not split files merely to reduce line counts.

- `02.tsx` may import and extend an exported component, props, or reusable part from `01.tsx`. Moving that part into `shared` first is not required.

- Dependencies must remain one-way. If `02 → 01`, do not also introduce `01 → 02`; avoid circular imports.

- Numbering does not imply inheritance. Designs with the same composition may also be implemented independently.

- When composition differs, use another variant/local core. Do not force every design into an overly generic core.

- When a base component changes, verify the designs that depend on it as well.

## Props and slot contracts

- A wrapper adds its new props while preserving applicable existing/default props, events, and overrides from its base component. Do not narrow props unnecessarily.

- `defaultSlots` is the ready design's component mapping; `slots` contains runtime overrides for a particular usage. A runtime slot takes precedence for the same key.

- Do not hard-code specific design components inside the core. For example, if a Sidebar's Dropdown/Collapsible must be replaceable, receive them through typed slots. The default wrapper injects the required implementations.

- Type slot-specific props to preserve autocomplete and invalid-prop checking.

- Keep data shapes, prop names, selection/open state, and callback names meaningfully consistent across related components. Dropdown and Context Menu may share common aspects while retaining their distinct interaction/accessibility behavior.

- Separate primitive responsibilities from composition-core responsibilities. Not every interaction needs to be reimplemented in the core.

## Proposed API contracts and extension rules

### Separate data and behavior

- Give each state an explicit owner: internal default, controlled consumer, or external adapter. Do not create two sources of truth for one state.

- Use an item `id` when stable identity is required. An array index is insufficient identity for selection, reordering, or asynchronous refresh.

- Reuse names such as `label`, `description`, `disabled`, and `children` with consistent meanings. Do not assume that `value` and `id` are interchangeable.

- Value changes, command selection, and navigation are different events. Consistency does not mean calling everything `onChange`.

- Document what an action does without consumer callbacks, what appears in empty/loading/error states, and what happens if controlled and default props are supplied together.

### Type maps and renderer maps

The TypeScript union defines the valid payload for each type; the renderer map connects that type to an implementation. Build-time or registration-time checks should catch a type without a renderer or a renderer without a props contract.

Proposed recursive model:

```text
Item
├── action      → label, disabled, action callback
├── link        → label, href
├── separator   → id
├── group       → label?, children: Item[]
└── custom      → typed render/slot contract
```

This illustrates a menu-like structure. Forms, trees, and timelines should not use this exact union unchanged. Reuse vocabulary where meaningful while retaining family-specific types.

TypeScript alone does not validate config received as runtime JSON/API data. Provide runtime schema validation, unsupported-type handling, and error reporting as needed. Also consider depth/cycle guards for recursive input and rendering strategies for large collections.

### Slot and prop precedence

- Component selection: consumer-provided `slots` override default slots.

- Slot props: define an explicit merge policy for default, design-level, and consumer-level props. A simple object spread is not always enough for event handlers, `className`, `style`, and refs.

- Overrides must not accidentally erase required accessibility props or core handlers. The extension contract should say what is composed and what is replaced.

- The core accepts replaceable components as slots; a design wrapper can inject its defaults. Not every plain DOM span needs a separate slot.

- Wrappers preserve native prop forwarding, refs, and generic value types. Do not use `any` as a substitute for extensibility.

- Unnecessarily changing a slot component's identity on every render may cause remounts/state loss. Consider stable definitions and, where needed, distinct contracts for render functions.

### Dependency and bundle boundaries

When one design reuses another, including that dependency in the bundle is expected. The goal is not always zero dependencies; it is to include necessary code and understand what loads. Direct imports are allowed. If a deep inheritance chain becomes complicated, reconsider composition boundaries without breaking existing designs.

Verify public barrels, subpath exports, CSS side effects, and client/server boundaries with a consumer build. A showcase passing through source aliases alone does not establish that the published package works.

## Evidence from current code

**Starter template:**

- `packages/pattern/src/accordion/variants/default-accordion.tsx` maps primitives into `defaultAccordionSlots` and injects them into the core.

- `card-accordion.tsx` exports a separate `CardAccordion` and reuses the default wrapper with card slots.

- `accordion/core.tsx` merges runtime slots over the defaults.

**Reference project:** `ecomsaashq/frontend/packages/ui/src/patterns` currently has a flat structure. The proposed numbered hierarchy has not been implemented there.

- `record-dialog.tsx` directly reuses header and size constants from `form-dialog.tsx`.

- `danger-card.tsx` wraps `SectionCard`; `record-table.tsx` composes `DataTable`.

- Picker components reuse `PickerTrigger`, `PickerPopover`, and `PickerGrid`.

These demonstrate direct composition/reuse, not implementation of the new hierarchy.
