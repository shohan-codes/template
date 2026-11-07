# Component and block discovery backlog

**Status:** Saved for later, not active research. Updated 7 November 2026.

First review the [five initial family PRDs](../proposals/initial-component-batch.md).
Wait for feedback before writing remaining family PRDs. Implement and validate
the accepted initial batch before restarting this discovery work. Then compare
new findings against the actual implementation to identify genuine additions,
missing behavior or improvements. A long source list is not a delivery goal.

## Named sources to revisit first

These are the explicitly requested sources. “Partially inspected” means only the
named items or documentation were studied, never the entire collection.

1. **[Untitled UI](https://www.untitledui.com/react/components)**: partially
   inspected. Five stronger desktop references are captured in the initial
   register; table and empty-state primitive source is pinned. Revisit other
   families after implementation and compare hierarchy, density and states. Keep
   MIT items separate from Pro compositions/assets. Pro inspiration is not a
   license to create a competing kit or template library.
2. **[shadcn.io](https://www.shadcn.io/)**: partially inspected Color Picker and API
   Latency Dashboard documentation/access. Independent of official shadcn/ui.
   Compare useful controls versus task-specific Blocks; verify each free item's
   exact source terms. The selected component install required a free account;
   Pro block source was gated. Its Pro terms restrict redistributed UI kits and
   starter/template collections. No item was installed or runtime-tested.
3. **[Shadcnblocks](https://www.shadcnblocks.com/)**: partially inspected Tree Multi
   1 (Pro component example) and About 3 (Basic Block). Compare rich component
   composition and separate section-level needs. Paid and free-block terms are
   not a blanket right to republish a competing collection. Retain links and
   original notes until exact rights are verified.
4. **[Kibo UI](https://www.kibo-ui.com/)**: selected Kanban, Gantt and Editor
   registry payloads inspected, not installed. Prioritize genuine complex-widget
   gaps, dependency cost and data/state boundaries. Source repository is MIT
   with notice obligations. Registry file targets and dependency licenses need
   review; persistence, storage and collaboration services are not included.
5. **[Magic UI](https://magicui.design/)**: selected Marquee and Animated List
   payloads inspected. Compare motion only where it improves an implemented
   pattern, including reduced-motion and CSS collision checks. Free repository
   MIT rights differ from Magic UI Pro. Codeforge public preview was retained as
   restricted inspiration; premium source was not obtained.

## Additional already-identified collections

- **[HyperUI](https://www.hyperui.dev/):** 76 inspected references, 55 Components
  and 21 Blocks, at commit `637323c8d3046645ac5f28edc2074d18f22a2b94`. Full selected
  HTML, desktop previews and mobile sample DOM were reviewed previously; this
  does not equal an approved visual catalog or full accessibility pass. A1/M1
  are provisional inputs in this batch. Standard MIT source notice required;
  third-party media needs its own rights. Review only a concrete gap later.
- **[daisyUI](https://daisyui.com/components/):** 17 saved source records, 15
  Components and 2 Blocks, with pinned MIT sources in prior research. Compare
  useful state/structure ideas against our actual primitives; do not introduce
  a second theme framework just to reproduce examples. Not all records have
  selective visual approval.
- **[Dice UI](https://diceui.com/):** File Upload payload and Kanban/Data Grid docs
  partially inspected. MIT source; Base UI and Radix variants differ. Check
  keyboard/editing/drag behavior, final registry imports and version compatibility.
  A prior registry health warning is a dated signal, not proof an item is broken.
- **[ReUI](https://reui.io/docs):** Data Grid, Event Calendar and Shift Roster docs
  partially inspected. Public primitives/hooks/component examples have MIT terms;
  Pro blocks and templates, including some labeled Free, have commercial terms.
  Compare grid/calendar gaps without mistaking local-state roster demos for
  persistence or server-side scheduling guarantees.
- **[coss ui](https://coss.com/ui):** Composer documentation and source lineage
  partially inspected. Origin UI now points to coss ui; count it as one lineage.
  MIT source and current Base UI APIs need item/version checks, particularly when
  considering old Radix-based Origin examples.
- **[Cult UI](https://www.cult-ui.com/):** Dynamic Island payload plus Expandable
  and Wizard Expandable docs partially inspected. Public repository is MIT.
  Later saved access research reports Pro sales ended 30 September 2026 and some
  former Pro components entered the free library. Verify exact item relicensing;
  do not apply free-library terms to every legacy template or Pro asset.
- **[Tailark](https://tailark.com/docs):** OSS Dusk Hero Section 1 payload inspected;
  Quartz access docs retained. OSS and paid registries/terms differ. Compare
  section composition in the Blocks stream. No Quartz item has a completed
  visual/source review in the retained evidence.
- **[Aceternity UI](https://ui.aceternity.com/components):** selected File Upload
  docs, hero galleries and premium Bento Grid With Skeletons preview/docs were
  partially inspected. Source access and terms vary; free does not automatically
  mean MIT. A separate free bento payload returned 403 and remains unverified.
  Do not bypass access restrictions or conflate that failure with the Pro item.
- **[Animate UI](https://animate-ui.com/):** accordion payload/license and current
  installation docs partially inspected. Older v1 registry and current v2 APIs
  differ. MIT plus Commons Clause is not plain MIT; redistribution as reusable
  components needs separate rights consideration. Reference only until resolved.
- **[React Bits](https://reactbits.dev/):** Split Text documentation/registry
  command and current license partially inspected. Compare purposeful motion
  with reduced-motion and bundle costs. Commons Clause restrictions apply to
  component redistribution and ports; language/style variants are not separate
  original designs or evidence of reuse permission.
- **[Motion Primitives](https://motion-primitives.com/):** discovery lead with a
  blocked `morphing-dialog.json` fetch, not verified source or runtime behavior.
  Resolve exact public documentation, rights and access legitimately before any
  adoption decision; do not retry through an access-bypass route.

No source in this list is fully explored. Collection breadth, popularity and a
public preview are not evidence that a particular design is suitable or reusable.

## Retained catalog boundaries

The earlier HyperUI Components cover Feature List, Pricing Cards, Testimonial,
Review List, Accordion, Steps, Metric Card, Empty State, Table, Pagination, File
Selector, Dialog, Breadcrumb, Dropdown, Notice and Switch. Its Blocks cover
Feature Section, Hero, Site Header, Newsletter, Contact Form, Empty Workflow and
Confirmation Dialog. These are research categories, not a commitment to write
all of their PRDs now.

The ecommerce comparison's 9 negative/repair references and 4 on hold remain
excluded from positive selection. The known HyperUI stats/1 percentage error is
an avoid/repair finding, not an implementation model. CTA section browsing had
begun, but no CTA design was evaluated or accepted. Do not turn incomplete
browsing into a fictitious Block PRD.

## Bounded comparison process after implementation

1. Pin the actual implemented commit, exports, showcase routes and tested states
   for the initial families. Reuse their PRD IDs; do not renumber history.
2. Choose one concrete gap and a small set of exact items from the sources above.
   Record item URL, source commit/version if available, Component/Block boundary,
   access tier, source license and asset restrictions before adoption.
3. Compare each item with the implementation: existing coverage, new behavior,
   meaningful composition difference, visual improvement or no useful change.
   Reject duplicates and cosmetic variants that are only ordinary props.
4. Review rendered hierarchy/spacing/type, exact viewports, interaction states,
   keyboard/accessibility, reduced motion and source/dependency quality separately.
   Mark each dimension passed, failed, partial or untested. Never promote a weak
   sample because its library has a strong reputation.
5. Classify the outcome: reuse existing design, improve existing design, add a
   design, add a composition variant, propose a new family, propose a Block,
   hold for rights/access/evidence, or reject with a concrete reason.
6. Write only justified changes for review. A new family gets one PRD with
   variant/design documents; Blocks stay separate. Stop when the chosen gap has
   a supported decision rather than continuing to maximize reference counts.

## Future comparison record

For each investigated item, record: date; implementation commit/path; exact
reference; source and rights status; observed strengths/defects; current overlap;
genuine missing behavior/composition; proposed reuse/extension; tests required;
decision; and reviewer feedback. Evidence may justify **no change**.

## Completion boundary

Saving this backlog completes the planning request, not the future investigation.
It starts no automation, installation, purchase, signup or new research sweep.
The next step is review of the five PRDs. Remaining PRD writing waits for feedback;
the listed discovery work waits until accepted initial implementation is complete.
