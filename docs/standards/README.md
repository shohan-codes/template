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
