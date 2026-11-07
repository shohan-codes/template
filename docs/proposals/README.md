# Proposals

Proposals record future changes for review. Current implemented architecture belongs in [architecture](../architecture/README.md); existing repository conventions belong in [standards](../standards/README.md).

## Organization

Use `active/PRD-NNNN-short-name/` for an active proposal. Four-digit identifiers are permanent and must not be reused or renumbered. Each proposal owns its directory and contains:

- `README.md`: status, owning area, dependencies, summary and reading order.
- `spec.md`: problem, goals/non-goals, design, alternatives, rollout and acceptance.
- Focused subject files only when useful. UI documentation does not require unrelated API/database sections.

A proposed design is not an implemented standard. When implementation is accepted, record its actual status and update the current architecture. Preserve the proposal's identifier and decision history when archiving it.

## Active proposals

- [PRD-0001 Component pattern library](active/PRD-0001-component-pattern-library/README.md): modular, extensible ready-made components and scalable showcase navigation. Status: Proposed, implementation pending.
