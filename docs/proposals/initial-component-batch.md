# Initial evidence-based component batch

**Status:** Proposed for review. Documentation complete for this bounded batch;
component implementation and production acceptance remain pending.

**Baseline:** `main` at [cccefd6](https://github.com/shohan-codes/template/commit/cccefd6f9b2bacf40513550269d61f6ff77e91c0),
inspected on 7 November 2026. Preserve [PRD-0001](active/PRD-0001-component-pattern-library/README.md)
and the existing implementation. This batch changes documentation only.

## Decision and scope

Stop open-ended collection research and specify a useful first delivery from the
evidence already reviewed. Exactly five family PRDs are included for the first review. Five stronger
desktop references support three families; two additional families use bounded,
previously inspected HyperUI evidence with provisional visual status. They are reference records, not five approved implementations
or five separate behavioral engines.

| Family PRD                                                        | Variant/design documents            | Source records | Implementation status                              |
| ----------------------------------------------------------------- | ----------------------------------- | -------------- | -------------------------------------------------- |
| [PRD-0002 Empty State](active/PRD-0002-empty-state/README.md)     | `search/01.md`, `invitation/01.md`  | E1, E2         | Not started                                        |
| [PRD-0003 Data Table](active/PRD-0003-data-table/README.md)       | `people/01.md`                      | T1             | Not started; no table engine selected or installed |
| [PRD-0004 Activity Feed](active/PRD-0004-activity-feed/README.md) | `connected/01.md`, `messages/01.md` | F1, F2         | Not started; original design review required       |
| [PRD-0005 Accordion](active/PRD-0005-accordion/README.md)         | `disclosure/01.md`                  | A1             | Existing family; extension/reuse decision pending  |
| [PRD-0006 Metric Card](active/PRD-0006-metric-card/README.md)     | `icon-value/01.md`                  | M1             | Not started; visual candidate approval pending     |

Each family owns one numbered PRD. Variants describe composition; `01.md` specifies
one visual design. Sizes, light/dark themes, disabled/loading states and data
ownership do not create additional numbered designs. Family or variant `shared/`
utilities are optional and should follow demonstrated reuse, not empty scaffolding.

**Components:** bounded reusable UI contracts. **Blocks:** task-specific sections
or workflows composed from components. There are **zero Blocks** in this initial
batch. An invitation empty state does not send invitations; a people table does
not administer accounts; a message feed is not a messaging system.

## Current implementation match

These are static repository findings at the pinned baseline, not runtime test
results:

- [Pattern exports](../../packages/pattern/src/index.ts) contain Accordion, Tabs,
  Questionnaire and CodeBlock. Empty State, Data Table, Activity Feed and Metric Card do not exist there.
  Accordion already exists and must be extended or reused without replacing its lifecycle.
- [Empty primitives](../../packages/shadcn-ui/src/components/empty.tsx) already
  provide layout pieces. They do not supply the new data-driven contract or its
  semantic heading requirement. `EmptyTitle` renders a `div`; `EmptyDescription`
  declares paragraph props but renders a `div`. Review those integration details
  rather than assuming the desired semantics.
- [Table primitives](../../packages/shadcn-ui/src/components/table.tsx) provide
  table elements and horizontal overflow. They are not a selection, sorting or
  pagination engine. [Pattern dependencies](../../packages/pattern/package.json)
  and [primitive dependencies](../../packages/shadcn-ui/package.json) contain
  neither TanStack Table nor React Aria Components.
- Button, Avatar, Badge, Checkbox and Skeleton primitives exist and should be
  evaluated for reuse. Existence does not establish compatibility or completed QA.
- [ShowcasePreview](../../apps/showcase/components/showcase-preview.tsx) already
  offers 1280, 768 and 375 CSS-pixel preview widths plus light/dark controls after
  PR #2. Preserve it. [Showcase navigation](../../apps/showcase/components/showcase-shell.tsx)
  still has four flat family links; expandable family/variant routes remain the
  PRD-0001 proposal.

The older architecture document retains its stated historical baseline. This
comparison does not silently declare PRD-0001 implemented or rewrite that history.

## Evidence and rights

See the [reference register](initial-component-references.md) for source URLs,
provenance, exact inspected code, visual strengths and verification limits. The five stronger
references passed a recorded desktop visual review. A1/M1 have source/sample
layout evidence but have not passed that selective visual-quality gate. Only T1 had a limited
live keyboard selection check. No complete mobile, contrast or screen-reader
audit is claimed.

Reuse rights are independent of visual quality. The MIT table and empty-state
primitive have pinned sources. Pro feed source and exact empty-state demo
compositions were not retrieved. Restricted previews support discussion of
generic needs only; this library must not reproduce restricted source, assets or
distinctive composition. Writing new code alone is not a rights clearance.

The earlier HyperUI catalog has 76 inspected records, split into 55 Components
and 21 Blocks. It is not a 76-design approval. The separate ecommerce comparison
has 9 negative/repair references and 4 on hold, with no positive selections. Do
not promote them to this batch merely to increase its size.

## Delivery sequence

1. Review these five family PRDs, their acceptance criteria and rights boundaries.
   Wait for feedback before writing any remaining family PRDs.
2. After review, implement Empty State and Metric Card, validate the Accordion
   extension/reuse decision, then Data Table and the independently designed
   Activity Feed. This is a proposed sequence, not a claim of authorized merge or
   completed implementation. Keep existing family imports and behavior working.
3. For each family, build its data/config entry points, extension examples,
   separately importable designs, showcase routes and required tests. A global
   showcase reorganization must follow PRD-0001 rather than becoming an implicit
   dependency of every small component change.
4. Review actual UI at 375, 768 and 1280 CSS px plus a 320 px stress case, light and
   dark, keyboard, long content and relevant interrupted/repeated interactions.
   Record exact states, browser and commit. Do not substitute a scaled desktop
   screenshot for a narrow layout test.
5. Verify built-package consumption, applicable type/lint/build checks and the
   family criteria. Publish a factual result with passed, failed, blocked and
   unrun checks separated. Update current architecture only after implementation
   is accepted and merged.
6. After this implementation batch is complete, use the [discovery backlog](../research/component-discovery-backlog.md)
   to compare selected new references against the actual implementation. Add
   only demonstrated gaps or useful improvements. Do not restart broad research
   as a prerequisite for this batch.

## Documentation acceptance

- Exactly five new family PRDs, seven variant/design documents, one reference register and a
  separately saved future-discovery backlog are linked and written in English.
- Existing PRD IDs, source exports, lockfile and runtime files are unchanged.
- Every proposed family has an explicit contract, scope, current-code comparison,
  source limitations, alternatives, rollout and testable acceptance criteria.
- Validate Markdown formatting, relative links and `git diff --check`. Runtime
  typecheck/lint/build are not substitutes for document checks and are not needed
  for this prose-only change under the existing repository conventions.
- Open a draft PR for review. Do not merge, install reference packages or fetch
  restricted source as part of this documentation delivery.
