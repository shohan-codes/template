# Metric Card specification

## Problem and outcome

A consumer should render one readable label/value metric with data/configuration,
without inventing statistics, adding an analytics backend or duplicating basic
loading/missing-value presentation. Keep the first design deliberately small.

## Scope and current-code comparison

Include `icon-value/01`, optional decorative icon, explicit value state, caller
formatting and original theme-aware layout. At the [baseline](../../initial-component-batch.md)
there is no Metric Card pattern export. Existing Card/Skeleton primitives and
theme tokens may be reused after integration review.

Exclude trends, percentages, baseline comparisons, sparklines/charts, automatic
polling, metric calculations, clickable whole cards, drill-down workflows and
dashboard sections. Those require separate evidence and requirements. The
HyperUI stats/1 example has a known inconsistent percentage and is not a positive
source or an implementation fixture for this PRD.

## Proposed consumer contract

- Required human-readable label and discriminated state: `ready`, `loading`,
  `unavailable` or `error`. A ready value is a string or number, including zero.
  Missing values never default to zero or a fabricated percentage.
- Optional caller formatter receives the ready value. Locale/currency/unit
  choices belong to the caller; do not parse already formatted currency strings
  or calculate a change from displayed text. Provide accessible full-value text
  when the visual value is abbreviated.
- Optional description or period clarifies meaning. Values and dates are not
  financial claims or live analytics unless the caller supplies that meaning.
- Optional decorative icon and `iconPlacement` use logical `start`/`end`. The
  first design keeps placement stable across breakpoints; changing placement is a
  prop, not a new design or an automatic DOM reorder.
- Typed value/label/icon slots and native root props allow extension while
  retaining semantic relationships. Default rendering uses a label/value group
  such as `dl`/`dt`/`dd`, not an unconditional page heading or live region.
- Loading has an accessible status and stable layout. Unavailable/error show
  truthful text distinct from zero. Retry or navigation workflows remain caller
  composition, not implicit actions on the entire card.

Concrete public API names remain subject to implementation review. The ready
default must require only data, not consumer CSS or primitive assembly.

## Visual and evidence boundaries

HyperUI stats/4 has a value above its label with an icon beside it. Two samples
demonstrate leading/trailing placement; the trailing sample visually moves its
icon to the leading side below `sm`. These are placement examples, not two
independent components. Do not copy that breakpoint reorder unintentionally.

Source inspection and sample desktop/mobile review do not establish selective
visual approval. Build an original treatment with repository spacing, readable
label/value hierarchy, restrained media and light/dark tokens. Review it against
the quality standard before implementation acceptance. No premium metric-card
source or assets are needed for this scope.

## Acceptance

- Ready zero, negative, large, decimal and localized/currency strings render
  without accidental coercion. Custom formatted values have equivalent readable
  accessible text. Input data is not mutated or used for invented calculations.
- Loading, ready, unavailable and error states are distinct. State transitions
  do not announce every render or suggest a failure is a real zero value.
- Icon omitted/start/end and long label/description cases are covered with a
  stable reading order. Decorative icons are hidden from assistive technology.
- At 320/375/768/1280 px, zoom and RTL, large values and translated labels do not
  overlap or disappear. Prefer wrapping/readable sizing over inaccessible
  ellipsis or unexplained abbreviation. Check contrast and both themes.
- Data-only usage, custom formatter/slot, native props and built-package imports
  are demonstrated. Applicable typecheck/lint/build and state/formatting tests pass.
- Visual review accepts the original treatment separately from functional tests,
  with screenshots and exact commit/state/viewport evidence.

## Alternatives and rollout

Manual Card composition is flexible but repeats missing-value and semantic
decisions. A universal analytics card with trend math or charts exceeds this
evidence. Start with the single-value contract and original layout, then fixtures,
states and showcase tests. Optional shared formatting is justified only by actual
reuse; keep caller business calculations outside the family. Further designs wait
for the post-implementation comparison in the discovery backlog.
