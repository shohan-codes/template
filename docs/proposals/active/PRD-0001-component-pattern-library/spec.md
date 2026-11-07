# Specification

Status: Proposed. See the [overview](README.md) for ownership and reading order.

## Problem

Consumers currently need to understand primitive composition and library structure to assemble UI. A large catalog also becomes difficult to browse if every composition and style is placed on one family page. We need simple data/configuration-based consumption without losing extension points, native behavior or separately importable designs.

## Goals

- Ready-made UI for common usage, with typed data/configuration and minimal consumer assembly.
- Extensible props, slots, callbacks and wrappers rather than a deliberately narrow facade.
- A discoverable family → composition variant → numbered visual design model.
- Similar semantics and names where components genuinely share concepts.
- Plain and integration-specific entry points without unnecessary dependency coupling.
- Manual, responsive, functional and visual verification before calling UI work complete.

## Non-goals

- One universal component, union or core that forces every behavior and layout into the same API.
- A giant style switch that eagerly imports every design.
- Mandatory extraction into shared code before direct reuse.
- Product fetching, authorization, billing or workflow execution inside presentation cores.
- Treating illustrative names or the current idea list as exhaustive.
- Reorganizing source files or creating empty catalog directories in this documentation PR.

## Design

### Hierarchy and reuse

Families describe consumer tasks; composition variants describe structural differences; `01`/`02` designs share that composition while changing visual presentation. Keep optional cores local to a variant: `core.tsx` when small, `core/` plus `index.ts` when responsibilities justify splitting. Later designs may import earlier designs directly, with no circular dependency or forced shared extraction. Public component names need not contain design numbers.

### Contracts and configuration

Default wrappers inject typed `defaultSlots`; instance `slots` override selected implementations. Preserve useful native props and define event/ref/class merging deliberately. Use discriminated configuration for heterogeneous items and recursive children only where nesting is meaningful. Forms, commands, trees, filters and structured content can share the mental model without sharing one universal union.

Keep visual design, state, ownership, integration and engine choices distinct. A disabled state is not automatically a new design; a server-data adapter is not automatically a new visual composition.

### Forms and tables

Reuse plain dynamic fields through a thin React Hook Form wrapper rather than rewriting their UI. The form wrapper adapts name/context/value/events/ref and field-specific semantics. The plain variant remains form-library independent.

For tables, keep typed data/columns, stable identity and client/server state ownership clear. Higher-level record lists can add toolbar/filter/bulk behavior. Reference implementation observations are inspiration, not proof that these features exist in this repository; inspect versions and reproduce suspected defects before reuse.

### Showcase

Every family expands to variant links. Each variant has its own page showing its numbered designs. Route, active state and expanded navigation must agree, including direct URLs and browser history. Build navigation from a generic catalog rather than family-specific hard coding. See [showcase navigation](showcase-navigation.md).

## Alternatives and tradeoffs

- **One component with a large variant switch:** convenient discovery, but can couple unrelated designs and dependencies. Prefer separately importable designs; measure actual bundle behavior rather than assuming tree shaking.
- **One shared core for all variants:** reduces some repetition but can become a conditional framework that constrains composition. Use variant-local cores and direct reuse where contracts fit.
- **Independent copies of every design:** simple isolation but duplicated behavior and fixes. Allow dependency reuse and test dependents when bases change.
- **Configuration for every UI:** consistent syntax but excessive schemas for homogeneous or free-form content. Use typed config only when it improves correctness and consumption; retain JSX/slots escape hatches.
- **All variants on one showcase page:** easy to start, poor navigation at scale. Use expandable families and variant pages, with local design navigation when needed.

## Rollout

1. Review the proposal and settle concrete public paths, representative compositions and compatibility requirements.
2. Choose a small representative set: disclosure/navigation, typed mixed items, plain/RHF fields and one table composition. Build on isolated branches.
3. Add consumer examples and tests before widening the catalog. Verify built-package imports outside source aliases.
4. Introduce generic showcase metadata/routes, preserve useful legacy links or document their migration, and validate direct URLs and navigation.
5. Expand families by demonstrated need. Add visual designs without silently changing the meaning of existing numeric paths.
6. Update current architecture only after implementation merges; record actual checks and known limitations.

## Acceptance

An implementation is not done when files merely compile. Run applicable type/lint/build and functional checks, inspect browser interactions manually, test responsive sizes and relevant states/accessibility, and provide representative previews/screenshots. Report passed, failed, blocked and unrun checks separately. Visual regression needs a reviewed baseline; passing tests alone do not establish aesthetic quality. Full criteria are in [testing and visual QA](testing-visual-qa.md).

For this documentation PR, acceptance is narrower: preserve the modular rules, distinguish proposals from current truth, validate links and formatting, and avoid runtime/source changes.
