# Current repository conventions

This page records existing tooling and instructions. Proposed component API and quality requirements live in [PRD-0001](../proposals/active/PRD-0001-component-pattern-library/README.md).

## Existing instructions

Read [AGENTS.md](../../AGENTS.md). Before changing Next.js code, consult the installed version's relevant documentation as it requires. [CLAUDE.md](../../CLAUDE.md) points to the same instructions.

## Existing commands

Run from the repository root after dependencies are installed:

```sh
pnpm typecheck
pnpm lint
pnpm build
```

These commands delegate through [Turborepo](../../turbo.json). Focused builds can use the package filters declared in each workspace's `package.json`.

No root test script or GitHub Actions workflow is present at the documented baseline. Adding the proposal's behavior, accessibility and visual checks is future implementation work; listing those checks in a specification does not make them run automatically.

## Formatting and verification scope

[.prettierrc](../../.prettierrc) defines LF endings, two-space indentation, double quotes and no semicolons. The existing package `format` scripts target TypeScript/TSX; documentation formatting must be invoked separately.

For a documentation-only change, verify Markdown formatting, relative links, file placement, consistency between current/proposed statements and `git diff --check`. Runtime UI tests are not evidence about prose-only changes. For code changes, use the applicable project checks and the proposal's acceptance requirements once those changes are undertaken.

## Default-first patterns

A pattern must render a complete, polished, accessible UI when given only its data and normal configuration. Consumers should not need to assemble slots, add styling props, or write custom wrappers to obtain the intended default appearance.

- Put baseline layout, spacing, typography, interaction states, and responsive behavior in the default variant and its default slots.
- Keep behavior and data separate from presentation. Controlled values, callbacks, disabled state, and content are ordinary configuration, not visual customization.
- Preserve injected default slots and per-instance slot/prop overrides as extension points for exceptional needs. They must not be required for normal use.
- Lead each showcase with a ready-to-use default example using only data/content and configuration. Show optional customization in a separately named example after the defaults.
- Review the default result visually before publishing a pattern and its showcase. A successful typecheck alone does not demonstrate a complete default UI.
