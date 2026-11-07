# Accordion specification

## Problem and outcome

The repository already has usable data-driven Accordion compositions. Specify a
bounded divider-disclosure treatment and its compatibility/quality gates instead
of importing a second FAQ engine or renaming existing code to resemble a catalog.

## Scope and current implementation

At the [baseline](../../initial-component-batch.md), `AccordionCore` merges
default and instance slots, maps items and supports single/multiple, controlled/
default expansion and disabled items. `Accordion` injects Radix-backed shadcn
primitives; `CardAccordion` supplies styled slots through it. Empty items return
null. Item IDs are optional with index fallback; slots use `React.ElementType`
and several prop bags use `Record<string, unknown>`.

Preserve those public contracts, exports and existing showcase examples. Add only
the new divider presentation and focused tests/typing needed by it. Stable IDs
are required in the new design's dynamic examples; do not silently break legacy
static index fallback in a documentation-led migration. Exclude nested trees,
FAQ page/section Blocks, asynchronous fetching and wholesale slot API rewrites.

## Requirements

- Use existing single/multiple expansion behavior. Single can be collapsible or
  noncollapsible; multiple opens independent items. Controlled value is owned by
  the caller; defaults apply only at initialization.
- Preserve item title, content, optional icon/badge and disabled state. New
  dynamic examples use stable unique IDs so open content does not jump on reorder.
- Reuse `Accordion` with typed design slots or direct wrapper extension. No new
  mandatory core/shared folder, parallel native-details engine or global variant
  switch. Family/variant utility extraction must follow demonstrated reuse.
- Keep refs, native props, event handlers, classes and instance overrides
  functional. Document class/event precedence for any new typed slot wrapper;
  never discard required Radix props or call a callback twice.
- Maintain trigger/content relationships, expanded/disabled state, visible focus,
  heading semantics and keyboard behavior of the chosen primitive. Do not infer
  Radix behavior from the source's native `details` test.
- Long questions wrap while the disclosure indicator remains visible. Answers
  may contain links and structured content; do not nest interactive content
  inside a trigger. Reduced motion must remove nonessential expansion animation.

## Source interpretation and visual gate

HyperUI FAQ 2 demonstrates plain divider rows using native `details`. The
recorded sample allows multiple open items and Enter closes a focused summary.
That is useful behavioral evidence, not proof of our React wrapper's behavior.
The source's static text, colors and animation are not production defaults.

Its visual quality has not passed the selective shortlist standard. Use it as
anatomy evidence only, with original spacing/type using repository tokens. Before
accepting the new design, compare it with the existing default Accordion. If it
is functionally and visually redundant, reuse/document the existing design
instead of exporting a duplicate. Record that decision without repurposing IDs.

## Acceptance

- Existing `Accordion`, `CardAccordion` and `AccordionCore` imports/examples still
  work. Baseline single/multiple and controlled/default behaviors are preserved.
- Test open/close, noncollapsible single, independent multiple, disabled items,
  controlled refusal, empty array, rapid repeated activation and dynamic reorder.
- Verify Enter/Space and the chosen primitive's documented arrow/Home/End
  behavior, trigger/content labels, focus order, headings and collapsed content
  access with keyboard and screen reader. Check links inside expanded content.
- Native props, refs, instance slots and class/event composition survive the new
  wrapper. No duplicated or lost callback occurs.
- Inspect 320/375/768/1280 px, long titles/answers, RTL, zoom, light/dark and reduced
  motion. No clipping, fixed-height assumption or hidden focus outline.
- Visual review records why the new design is useful compared with current
  defaults, or records reuse instead of adding a duplicate.
- Built-package imports, typecheck/lint/build and relevant regression tests pass.
  Record actual results, not source-review results, before implementation approval.

## Alternatives and rollout

A native `details` replacement would change existing controlled API and keyboard
semantics; it is unnecessary for a presentation addition. Copying the whole
existing family duplicates fixes. Prefer a thin wrapper or existing-design reuse.
First verify baseline behavior, then implement/review the treatment, add variant
showcase coverage and preserve current URLs/exports. No merge is authorized here.
