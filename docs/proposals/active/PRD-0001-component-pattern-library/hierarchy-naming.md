# Hierarchy and Naming

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Guidance for folders, package boundaries, and import naming that keeps families, composition variants, and visual designs distinct.

Agreed principles and proposed examples are identified separately. These are architecture instructions, not claims that the new system has been implemented.

## Mental model

- A **family** describes the component's task/category, such as accordion, feature-list, data-table, or form-field.

- A **variant** is a particular composition/structure within a family, such as grid and list in feature-list. A different composition may have a different variant/core.

- A **design** is a different visual presentation of the same variant/composition. `01`, `02`, and `03` identify these designs.

- Variants and designs are not restricted to a fixed list. Add them as requirements arise.

- Ordinary use must not require consumers to assemble primitives, build layouts, or write CSS. Interactive components will still need the appropriate callbacks/state.

## Avoid mixing different responsibilities under one label

These are proposed implementation clarifications. The agreed family → variant → numbered design structure remains unchanged.

| What changes                                            | Preferred expression                      | Example                                    |
| ------------------------------------------------------- | ----------------------------------------- | ------------------------------------------ |
| The component's task                                    | Family                                    | navigation-menu versus filter-builder      |
| Markup/flow or composition for the same task            | Variant                                   | feature-list/grid versus feature-list/list |
| Visual presentation with the same composition           | Design                                    | card/01 and card/02                        |
| Ordinary size, tone, density, disabled, or active state | Appropriate prop/token/state              | compact, danger, loading                   |
| State/data ownership                                    | Explicit controlled API or adapter        | local paging versus server paging          |
| External library integration                            | Thin integration wrapper                  | plain field and RHF field                  |
| Underlying engine                                       | Separate implementation entry when needed | TanStack versus simple table               |

Keep the decision to provide two integration variants, `plain` and `rhf`; do not unnecessarily duplicate their visual composition. Likewise, `tanstack` names an engine, not a visual style. An initial `data-table/tanstack` entry is possible, but its numbered designs must represent styles of the same defined composition. If grid/record/compact layouts require different structures, explicitly decide whether to flatten the hierarchy or add meaningful variants. Do not mix engines, colors, and layouts arbitrarily at the same level.

This separation avoids a proliferation of variants such as `small-dark-rhf-server-card`. The tradeoff is that some concerns must be understood as separate adapters/configuration, so ready defaults should cover ordinary usage.

## Folder hierarchy and naming

```text
packages/
├── shadcn-ui/                  # shadcn UI and its necessary foundations only
└── pattern/
    └── src/
        ├── accordion/
        │   ├── card/
        │   │   ├── core.tsx    # optional variant-local composition
        │   │   ├── 01.tsx
        │   │   └── 02.tsx
        │   ├── default/
        │   │   ├── core.tsx
        │   │   ├── 01.tsx
        │   │   └── 02.tsx
        │   └── shared/         # only for genuinely common types/utilities
        ├── feature-list/
        │   ├── grid/
        │   │   ├── core.tsx
        │   │   ├── 01.tsx
        │   │   └── 02.tsx
        │   └── list/
        │       ├── core.tsx
        │       ├── 01.tsx
        │       └── 02.tsx
        └── data-table/
            └── tanstack/
                ├── core/      # a folder instead of a file when the core is large
                │   ├── index.ts
                │   ├── types.ts
                │   ├── features.ts
                │   ├── state.ts
                │   └── table-core.tsx
                ├── 01.tsx
                └── 02.tsx
```

This tree illustrates the rules. Not every family needs every folder.

- Use lowercase folder names and kebab-case for multiple words.

- Name design files `01.tsx`, `02.tsx`, and so on. The public component name may be `CardAccordion`; it does not need a `01` or `02` suffix. The import path selects the design.

- Consumers can use import aliases when using two designs in the same file.

- Do not currently encode dependencies in filenames such as `02-from-01`. Imports show the actual dependencies.

- Decide exact public entry-point names during implementation.

## Proposed naming refinements

- Family names should describe the consumer's task: `command-menu`, `filter-builder`, `description-list`, or `metric-card`. Avoid vague names such as `misc`, `advanced`, or `other`.

- Variant names should describe composition: `grid`, `list`, `rail`, or `stacked`. A prop or token is usually more appropriate for a color/state difference alone.

- `default` is allowed, but as the catalog grows, consider whether a name describing that default's composition would be clearer.

- Keep numeric design paths stable; do not unnecessarily number public component names. Do not silently repurpose an existing `01` for a different design.

- A config's `type` should represent a meaningful semantic choice. If it collides with a native input's `type`, put native props in a separate typed bag or use another clear name. One property must not have two meanings.

- Showcase metadata may include purpose, tags, compatible slots, dependencies, example data, and states for component discovery. This does not require a global runtime registry.

## Package and import boundaries

- The `shadcn-ui` package contains only shadcn UI. Do not put product-specific ready compositions or business components here.

- Ready components, design wrappers, and composition rules belong in the `pattern` package. They use shadcn primitives or approved slot implementations.

- Each design must be separately importable. Do not force every design to load through one giant `variant` switch.

- Separate files/imports do not guarantee that unused code is excluded. Verify public exports, bundler tree shaking, and an actual consumer bundle.
