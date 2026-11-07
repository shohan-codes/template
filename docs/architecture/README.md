# Current architecture

Baseline inspected: [d6be5f7](https://github.com/shohan-codes/template/commit/d6be5f702fe3c83cff7152ba410a7eca212fe77f). This is a snapshot of implemented code, not the target design in PRD-0001.

## Workspace layout

- `apps/web`: consuming Next.js application.
- `apps/showcase`: examples, previews and source display.
- `packages/shadcn-ui`: shadcn UI primitives and supporting code.
- `packages/pattern`: data-driven Accordion, Tabs, Questionnaire and CodeBlock compositions.
- `packages/hooks` and `packages/css`: shared hooks and styles.
- ESLint and TypeScript configuration packages provide workspace tooling.

The repository uses pnpm and Turborepo. See [root package scripts](../../package.json), [workspace membership](../../pnpm-workspace.yaml) and [task graph](../../turbo.json).

## Pattern composition today

[AccordionCore](../../packages/pattern/src/accordion/core.tsx) receives `defaultSlots` and optional instance `slots`; instance mappings override the defaults. The [default Accordion](../../packages/pattern/src/accordion/variants/default-accordion.tsx) injects primitive components. [CardAccordion](../../packages/pattern/src/accordion/variants/card-accordion.tsx) supplies styled slots through that wrapper.

Accordion, Questionnaire and Tabs currently use family-level `core.tsx` plus a `variants/` directory. CodeBlock already separates `single/` and `tabs/` compositions. Slot types use `React.ElementType`, and several slot-prop bags use `Record<string, unknown>`; stronger contracts in the proposal are not yet implemented.

[Pattern package exports](../../packages/pattern/package.json) include explicit `accordion`, `tabs`, `questionnaire` and `code-block` entries pointing to their built `index` files. The numbered family/variant/design hierarchy described in [PRD-0001](../proposals/active/PRD-0001-component-pattern-library/README.md) does not yet exist.

## Showcase today

[ShowcaseShell](../../apps/showcase/components/showcase-shell.tsx) defines flat family navigation links. Pages such as [Accordion](../../apps/showcase/app/components/accordion/page.tsx) contain multiple examples. Family expansion and separate variant pages are proposed changes, not current behavior at this baseline.

The [showcase TypeScript configuration](../../apps/showcase/tsconfig.json) aliases workspace packages to source files. Testing the showcase alone therefore does not verify built-package resolution.

## Boundaries of this snapshot

The dynamic plain/RHF field system, generic recursive configuration catalog and new TanStack table family in PRD-0001 are design work, not code present in this checkout. Separate UI work may be reviewed in another branch; update this snapshot after that work is merged, not merely because a proposal exists.
