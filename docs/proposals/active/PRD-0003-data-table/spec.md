# Data Table specification

## Problem and outcome

A consuming page should supply typed rows, columns, stable identity and callbacks
to render a usable people table. Visual polish must not hide ambiguous selection,
fake paging, inaccessible columns or mutation controls with no behavior.

## Scope and limits

Include one people table composition with optional row selection, single-column
sorting, numbered pagination, status/team cells, row actions and explicit loading,
empty and error states. Support client-owned data and a controlled server-data
boundary without implementing network calls. Exclude virtualization, cell editing,
grouping, column dragging/pinning, cursor paging, global search, saved views,
bulk mutation workflows and a complete administration dashboard.

## Current-code comparison and engine decision

At the [batch baseline](../../initial-component-batch.md), shadcn's Table supplies
semantic elements and horizontal overflow, not the required state engine. There
is no Data Table family, TanStack Table dependency or React Aria Components
dependency. The upstream example uses React Aria; its keyboard model cannot be
claimed for a local HTML wrapper.

Follow PRD-0001's TanStack direction as the preferred engine candidate, subject to
version, React compatibility, package/bundle and interaction review. Record the
decision before adding a dependency. Engine choice is not a numbered visual design.
Default to semantic HTML table navigation with focusable controls; do not add
`role="grid"` unless the full chosen grid keyboard contract is implemented and
tested. Reuse current Button, Checkbox, Badge and Avatar only after compatibility
checks. No upstream dependency tree is installed by this documentation PR.

## Proposed consumer contract

- Generic `rows: readonly T[]`, typed column definitions and `getRowId(row)`.
  IDs are stable domain keys, never array positions. Duplicate IDs are invalid.
- Column IDs, labels, cell rendering, sortable capability and optional responsive
  priority are explicit. Preserve typed native props and compatible cell/header
  slots; data-only defaults cover normal usage.
- Selection may be disabled or multiple. Initial scope is **current-page
  selection only**: the header checkbox selects eligible rows on the visible
  page and exposes mixed state. Page, page-size, filter or dataset changes clear
  selection. Sorting preserves selected IDs only when the visible-page membership
  stays unchanged; otherwise it requests clearing selection. Label this scope
  visibly. A
  future cross-page/all-results policy needs its own explicit contract.
- Controlled `selectedIds`/change callback and an uncontrolled default are
  supported; controlled state wins. The caller must apply requested changes.
  Do not emit duplicate changes on rerender or pretend a refused update succeeded.
- Sorting is disabled or single-column with an explicit ID and ascending/
  descending direction. Sort a copy in client mode; never mutate input data.
- A discriminated data mode separates client processing of all rows from server
  processing. Server mode receives the current rows, page index/size, known total
  row count, sorting and callbacks. It must not sort or repaginate that page as if
  it were the complete dataset. Unknown-total/cursor pagination is deferred.
- Optional row actions have stable IDs, accessible labels, typed callbacks,
  disabled/pending state and permission-filtered visibility. No default delete
  handler, browser confirmation or fabricated mutation is supplied.
- Status distinguishes initial loading, background refresh, success-empty,
  failure without data and failure with stale data. Retry belongs to the caller.

Concrete exported names are subject to the engine decision. Preserve this
behavioral contract even if the chosen engine uses different internal terminology.

## Behavior and integration

The caller owns fetches, URL state, authorization, mutations and request races.
Use a mock adapter to prove late responses do not overwrite a newer requested
page. Render the provided total, not the current page length or a fixture badge.
In client mode, clamp an out-of-range page when data shrinks; in server mode,
request a valid page through the caller rather than fabricating missing rows.

Keep focus on an activated sort or pagination control. After a successful caller
mutation removes the focused row, move focus to the next available row action,
previous row or table heading according to a documented rule. A failed mutation
keeps its row and exposes caller error feedback. Native controls remain available
without making an entire row an unexpected click target.

Hidden lower-priority columns must remain reachable through an explicitly labeled
details affordance or not be hidden at all. Prefer horizontal scrolling for this
first design. Do not mimic the source's email-hiding breakpoint without an access
path. Overflow must not clip focused controls.

## Acceptance

- A typed fixture renders with no consumer layout CSS. Empty, one-row, multi-page,
  long-name, missing-avatar, missing-field and many-team cases are covered.
- Checkbox click and Space, select-visible-page, mixed selection, disabled rows,
  sort, page and page-size changes follow the documented scope without ID drift.
  A multi-page sort that moves selected rows off-page requests clearing selection;
  a sort of unchanged page membership preserves selection.
- Source rows remain unchanged after sorting. Client/server mode tests prove
  server pages are not silently treated as all data; total counts are accurate.
- Controlled state refusal, pending actions, repeated activation, stale response,
  failed retry and focus recovery after row removal are exercised.
- Header/cell associations, table name, sort direction, checkbox/action labels
  and screen-reader announcements are verified. No partial grid semantics.
- 320/375/768/1280 px, zoom, RTL and light/dark checks cover overflow, long values,
  accessible hidden details and focus outlines. Color is not the only status cue.
- Verify version/license/dependency choices, built-package imports, typecheck,
  lint, build, interactions and an actual consumer bundle. Do not call the engine
  accessible based solely on its reputation or the source's limited test.

## Alternatives and rollout

Plain static tables remain appropriate without stateful requirements. Importing
the full React Aria demo adds an engine and theme mismatch; direct copying also
retains fixture defects. A custom state engine avoids a dependency but creates
more behavior to maintain. Record the tradeoff rather than quietly choosing one.

Implement the stable identity/column contract and selected engine first, then
the people design, caller adapters, states and showcase tests. Optional shared
selection/formatting utilities belong to this family only when actually reused.
Do not build a universal table core for deferred features. Keep old exports
working and seek implementation review before merge.
