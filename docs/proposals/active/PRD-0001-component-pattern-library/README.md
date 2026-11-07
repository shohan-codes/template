# PRD-0001 Component pattern library

- **Status:** Proposed; direction captured for review, implementation pending.
- **Owning area:** `packages/pattern` and `apps/showcase`; related boundaries in `packages/shadcn-ui`, `packages/hooks` and `packages/css`.
- **Builds on:** [current architecture](../../../architecture/README.md), existing slot-based compositions and the [repository conventions](../../../standards/README.md).
- **Scope of this PR:** documentation only. No runtime code, catalog placeholder directories, installed skill or branch-protection changes.

## Summary

Make ready-made components usable with data/configuration while retaining native props, typed slots and wrapper-based extension. Organize families, composition variants and numbered visual designs; reuse code directly where appropriate rather than forcing everything into a generic shared core. Showcase navigation should expand every family into variant pages.

The user-provided examples are starting points, not an exhaustive catalog or fixed naming scheme. Generalize the principles, propose justified improvements and keep design recommendations distinct from implemented facts. The detailed guides use English throughout, preserving the architecture decisions and examples from the discussion.

## Reading order

1. [Specification](spec.md): problem, scope, alternatives, rollout and acceptance.
2. [Purpose and philosophy](purpose-philosophy.md): goals, non-goals and how to derive new patterns.
3. [Hierarchy and naming](hierarchy-naming.md): family/variant/design, package boundaries and import rules.
4. [Composition, slots and extensibility](composition-slots-extensibility.md): defaults, overrides, contracts and direct reuse.
5. [Type-driven rendering](type-driven-rendering.md): discriminated/recursive configuration and broader component opportunities.
6. [Forms and React Hook Form](forms-react-hook-form.md): plain UI plus a thin integration wrapper.
7. [Data tables](data-tables.md): typed data, ownership and composition ideas.
8. [Showcase navigation](showcase-navigation.md): family expansion, variant pages and design previews.
9. [Testing and visual QA](testing-visual-qa.md): definition of done and evidence required.

## Reading labels

- **Direction/requirement:** intended behavior established in the architecture discussion.
- **Proposal/example:** names, catalog entries and implementation choices to validate during delivery.
- **Current:** only facts backed by the baseline in the current architecture document.

Numbered designs are alternatives, not releases. Do not infer that accepting this documentation authorizes bulk implementation, direct pushes to main, a merge or a deployment.
