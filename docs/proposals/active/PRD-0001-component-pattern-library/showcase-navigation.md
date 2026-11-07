# Showcase Navigation

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Expanding a component family in the showcase reveals its variants. Each variant has a separate page showing numbered designs for that composition. This rule applies to the entire catalog, not only Accordion.

**Status:** This is an agreed showcase requirement with proposed implementation guidance. This documentation does not change showcase code.

## Agreed navigation model

- Each family is an expandable/collapsible parent in the sidebar. Clicking the parent reveals its variant links.

- Each variant has its own navigation item and page.

- Stacking all variants on one family page is not the primary navigation model. An optional family overview provides a brief introduction and variant links.

- On a variant page, `01`, `02`, and `03` represent different visual designs of the same composition. A different composition requires a new variant.

- Add new families, variants, and designs through the same generic model. Do not hard-code navigation logic specifically for Accordion.

## Navigation tree

```text
Showcase sidebar
├── Accordion                     [expand/collapse]
│   ├── Default                   → variant page: 01, 02, ...
│   └── Card                      → variant page: 01, 02, ...
├── Feature List                  [expand/collapse]
│   ├── Grid                      → variant page: 01, 02, ...
│   └── List                      → variant page: 01, 02, ...
├── Form Field                    [expand/collapse]
│   ├── Plain                     → integration page + designs
│   └── React Hook Form           → integration page + designs
└── Data Table                    [expand/collapse]
    └── TanStack                  → variant/implementation page + designs
```

Names and example variants are illustrative. Preserve the hierarchy guide's distinction between composition and integration/engine. Showing them at the same sidebar level does not make their semantics identical.

## Proposed catalog and routing

- A typed catalog/manifest may generate the sidebar, variant links, breadcrumbs, and design listings. Keep family/variant IDs, labels, descriptions, design entries, and preview loaders distinct.

- A runtime UI registry is not the same as showcase metadata. Building navigation must not require eager imports of every component implementation.

- Example route: `/components/:family/:variant`. A design may have a shareable anchor or nested route, but there is no need to put every numbered design directly in the sidebar from the start.

- Opening a direct URL must activate the correct variant and expand its parent family. Route and sidebar state must stay aligned during back/forward navigation.

- For variants with many designs, use a local picker, search, or lazy preview on the variant page. Family/variant navigation remains unchanged.

- The catalog may support search/filter by component name, variant label, and tags. Search results should lead directly to the relevant variant/design.

## Proposed variant-page contents

- Family and variant identification with brief usage guidance.

- A preview, import path, data/config example, and links to relevant props/slots for each numbered design.

- A design does not require a new component name. Document selection by import path and optional import aliases.

- Loading, empty, error, disabled, and interactive states where applicable.

- Consistent responsive-preview and theme controls so designs can be compared.

- Demo-local actions must not call real destructive APIs. Use mocks or controlled examples where needed.

## Accessibility and scalable behavior

- The family expand control must be a keyboard-operable button that correctly exposes its expanded state and controlled region.

- Each variant item is a navigation link with a clear active-page state. If a family overview link also exists, do not ambiguously combine expansion and navigation into the same control.

- Test sidebar keyboard focus, visible focus, collapsed-item behavior, and mobile drawer/close behavior.

- Load previews as needed instead of mounting them all at once. One failed preview must not break the entire catalog.

- Provide clear fallbacks and validation for missing/duplicate catalog IDs, missing variant routes, and unavailable previews.

## Definition of done

1. Test the same navigation logic with several different families. An Accordion-only demo is not enough.

2. Verify family expand/collapse, variant links, direct URLs, refresh, back/forward, and active-state behavior.

3. Verify that each variant page shows only its correct numbered designs.

4. Manually review desktop/mobile, keyboard operation, overflow, long names, many families/variants, and loading/error states.

5. Follow the completion rules in [Testing and Visual QA](testing-visual-qa.md). Do not call the work finished without implementation, screenshots, and actual checks.
