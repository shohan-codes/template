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
- [PRD-0002 Empty State](active/PRD-0002-empty-state/README.md): search recovery and invitation compositions. Status: Proposed, implementation pending.
- [PRD-0003 Data Table](active/PRD-0003-data-table/README.md): selectable people table with explicit state ownership. Status: Proposed, implementation pending.
- [PRD-0004 Activity Feed](active/PRD-0004-activity-feed/README.md): read-only event/message compositions with an original-design gate. Status: Proposed, implementation pending.
- [PRD-0005 Accordion](active/PRD-0005-accordion/README.md): bounded divider treatment extending the existing family. Status: Proposed, extension pending.
- [PRD-0006 Metric Card](active/PRD-0006-metric-card/README.md): icon/value metric with truthful data states. Status: Proposed, implementation pending.

These five new family PRDs form the [initial review batch](initial-component-batch.md).
Its [reference register](initial-component-references.md) separates stronger
desktop references from provisional candidates. See the [future discovery backlog](../research/component-discovery-backlog.md)
for later sources; further family PRDs wait for feedback on this batch.
