# Data Tables

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Ideas from the TanStack reference for table mechanics, data/state ownership, richer compositions, and limitations requiring verification.

Agreed principles and proposed examples are identified separately. These are architecture instructions, not claims that the new system has been implemented.

## Ideas to take from TanStack Table

Useful ideas from the reference project's DataTable and RecordTable:

- Generic typed `data` and `columns`, typed column metadata, and stable row IDs.

- Explicit separation of client-owned state and server-owned pagination/sorting. Fetching, URL state, permissions, and mutations remain the consuming app's responsibility.

- Numbered and cursor pagination, controlled selection, and bulk actions.

- Toolbar and empty-state injection; distinct UI for initial loading and background fetching.

- Richer compositions such as RecordTable may be built on the base table without making them mandatory for every consumer.

The reference `data-table.tsx` currently combines behavior and rendering; do not copy it under the assumption that it is already a headless core. Virtualization, grouping, resizing/pinning, and editable cells are future possibilities, not features found in the current implementation. The potential issue identified through static review of `pageSize={false}` is unconfirmed without runtime testing.
