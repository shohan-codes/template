# Initial component reference register

Scope: five positive desktop reference records and two provisional HyperUI
source candidates from the 7 November 2026 research. These support exactly five
family PRDs; source counts are not PRD counts.
This register makes the important evidence available in the repository without
requiring access to working research documents. The recorded desktop findings
were not rerun during this documentation pass. The pinned MIT license, table
demo/primitive, empty-state primitive, HyperUI FAQ 2, HyperUI stats 4 and both
pinned licenses were reread for this batch.

## Status vocabulary

- **Visual reference:** a useful observed composition; not an implementation pass.
- **Source inspected:** named source was read; not a tested dependency tree.
- **Limited behavior check:** only the described action was exercised.
- **Restricted inspiration:** no copying or redistribution permission is inferred.
- **Pending:** not checked, not failed, and not silently accepted.

## E1: Search recovery empty state

- **Preview:** [Featured icon empty state](https://www.untitledui.com/react/components/empty-states#featured-icon).
- **Target:** [PRD-0002 search/01](active/PRD-0002-empty-state/variants/search/01.md).
- **Observed merit:** small search symbol, succinct heading, readable text width
  and a distinct filled primary action beside an outlined reset action. Clear
  hierarchy without an oversized illustration.
- **Evidence:** desktop rendered preview. Shared MIT primitive inspected; exact
  preview composition source was behind “Get the code” and not retrieved.
- **Pending:** narrow action wrapping, translated labels, focus after clearing,
  contrast and screen-reader checks. Original copy and visual choices required.

## E2: Invitation empty state with avatar row

- **Preview:** [Avatar-row empty state](https://www.untitledui.com/react/components/empty-states#avatar-row).
- **Target:** [PRD-0002 invitation/01](active/PRD-0002-empty-state/variants/invitation/01.md).
- **Observed merit:** centered invitation cue, clear title and restrained people
  decoration support the task. The surrounding portraits are secondary to text.
- **Evidence:** desktop rendered preview, same inspected MIT primitive as E1.
  Exact composition source and portrait rights are not established.
- **Pending:** clipping, narrow actions, heading/landmark integration, decorative
  media semantics, contrast and screen-reader checks. Do not copy portrait assets
  or reproduce the proprietary arrangement.

## T1: Selectable people table

- **Preview:** [Tables](https://www.untitledui.com/react/components/tables), observed
  example corresponding to `Table01DividerLine`.
- **Target:** [PRD-0003 people/01](active/PRD-0003-data-table/variants/people/01.md).
- **Pinned demo:** [table.demo.tsx](https://github.com/untitleduico/react/blob/1d410cb8facde8d50869e7bbb5f3d048e2267466/components/application/table/table.demo.tsx).
- **Pinned primitive:** [table.tsx](https://github.com/untitleduico/react/blob/1d410cb8facde8d50869e7bbb5f3d048e2267466/components/application/table/table.tsx).
- **Observed merit:** restrained card header, aligned rows, neutral header fill,
  quiet dividers, clear name/handle hierarchy and compact status/team badges.
- **Limited behavior check:** selecting Olivia's checkbox set checked to true;
  Space returned it to false. The accessibility snapshot exposed a named grid,
  row headers, selection checkboxes and named Edit/Delete actions. Those actions
  were not invoked. This is not a complete keyboard or accessibility audit.
- **Source findings:** demo sorts `teamMembers.items` in place; adaptations must
  avoid mutating caller data. “100 users” and pagination are fixtures. Edit/Delete
  controls do not provide mutation callbacks in this demo. React Aria supplies
  its table interaction model, which does not automatically transfer to this
  repository's HTML table primitive.
- **Responsive evidence:** horizontal-overflow wrapper, header alignment at `md`
  and email visibility using `md:hidden xl:table-cell`. The viewed desktop omitted
  email at its current width. No mobile rendering was exercised.

## F1: Connected activity feed

- **Preview:** [Activity feed connected](https://www.untitledui.com/react/components/activity-feeds#activity-feed-connected).
- **Target:** [PRD-0004 connected/01](active/PRD-0004-activity-feed/variants/connected/01.md).
- **Observed merit:** chronology is clear from the avatar spine; actor, time and
  action follow a consistent order; attachments remain subordinate to their event.
- **Evidence:** desktop public preview with connectors, avatars, event text,
  attachments, labels and green indicators. Pro source was not retrieved.
- **Rights:** restricted inspiration only. Generic chronological list behavior
  may inform requirements; use an original treatment, not a reconstruction of
  the Pro design. Indicator meaning needs text, not color alone.
- **Pending:** mobile, focus/navigation, contrast and screen-reader behavior.

## F2: Spaced message feed

- **Preview:** [Messages spaced](https://www.untitledui.com/react/components/activity-feeds#messages-spaced).
- **Target:** [PRD-0004 messages/01](active/PRD-0004-activity-feed/variants/messages/01.md).
- **Observed merit:** consistent actor metadata, separated message surfaces and
  whitespace establish grouping without a divider under every entry.
- **Evidence:** desktop read-only feed with avatars, names, handles, timestamps,
  message surfaces and indicators. No proof of sending, threading or realtime
  delivery. Pro source was not retrieved.
- **Rights:** restricted inspiration only, with the same independent-design gate
  as F1. The two feeds share a family, not an inferred vendor behavioral engine.
- **Pending:** long/bidirectional content, narrow widths, unread announcements,
  keyboard and screen-reader checks.

## Source and asset rights

The table and shared empty-state primitive are pinned to Untitled UI commit
`1d410cb8facde8d50869e7bbb5f3d048e2267466` under its
[MIT license](https://github.com/untitleduico/react/blob/1d410cb8facde8d50869e7bbb5f3d048e2267466/LICENSE),
copyright 2025 Untitled UI. Retain its copyright and permission notice if copying
substantial source. Dependencies and external images require their own review.
The [empty-state source](https://github.com/untitleduico/react/blob/1d410cb8facde8d50869e7bbb5f3d048e2267466/components/application/empty-state/empty-state.tsx)
defaults Content to `main` and Title to `h1`; embedding that composition unchanged
could produce duplicate main landmarks or inappropriate heading levels.

The [commercial license](https://www.untitledui.com/license) distinguishes clearly
marked MIT components from its commercial products. It restricts redistribution
and competing kits, libraries, templates or derivatives. Public visibility does
not grant permission to republish a Pro composition. MIT coverage of a primitive
does not establish MIT coverage of a proprietary demo, portrait, logo or other
asset. No restricted code, screenshots or assets are copied into this batch.

Preferred implementation: reuse existing repository primitives and write original
contracts, copy and visual treatments. Where MIT source is actually adopted,
record the upstream commit, file, license notice, dependency audit and local
changes. If a desired result depends on restricted expression, obtain permission
or omit that treatment. Premium references remain inspiration, not source inputs.

## A1: Divider disclosure

- **Preview:** [HyperUI FAQ 2](https://www.hyperui.dev/examples/marketing/faqs/2.html).
- **Pinned source:** [marketing/faqs/2.html](https://github.com/markmead/hyperui/blob/637323c8d3046645ac5f28edc2074d18f22a2b94/public/examples/marketing/faqs/2.html).
- **Target:** [PRD-0005 disclosure/01](active/PRD-0005-accordion/variants/disclosure/01.md).
- **Observed:** native details with divider rows, first item initially open and
  a decorative rotating chevron. Recorded interaction: opening another item
  leaves both open; Enter closes the focused summary. This is source behavior,
  not a test of the repository's Radix-backed Accordion.
- **Quality status:** source/anatomy candidate, not a promoted positive shortlist
  design. Desktop/sample-mobile inspection is not full responsive or visual
  approval. Compare the proposed treatment with existing default Accordion and
  reuse it if a new export would be redundant. Focus, reduced motion, long
  content, contrast and screen-reader checks remain implementation gates.

## M1: Icon and value metric

- **Preview:** [HyperUI stats 4](https://www.hyperui.dev/examples/application/stats/4.html).
- **Pinned source:** [application/stats/4.html](https://github.com/markmead/hyperui/blob/637323c8d3046645ac5f28edc2074d18f22a2b94/public/examples/application/stats/4.html).
- **Target:** [PRD-0006 icon-value/01](active/PRD-0006-metric-card/variants/icon-value/01.md).
- **Observed:** value above label with leading/trailing icon samples; the trailing
  icon becomes leading below `sm`. Two placement examples do not establish two
  independent designs. No trend behavior or percentage calculation is present.
- **Quality status:** provisional source/anatomy candidate. Original typography,
  theme, responsive placement and long-value behavior need explicit visual QA.
  Do not promote all metric samples on the strength of source access.
- **Excluded negative evidence:** stats/1 displays 404.32 to 240.94 with a stated
  67.81% decrease; the decrease is about 40.41%. It is not used here. No comparison
  math or trend feature is introduced through this simple icon/value design.

Both A1 and M1 use HyperUI commit `637323c8d3046645ac5f28edc2074d18f22a2b94`,
under its [MIT license](https://github.com/markmead/hyperui/blob/637323c8d3046645ac5f28edc2074d18f22a2b94/LICENSE),
copyright Mark Mead. Retain its notice if substantial source is adopted. Use
repository icons or separately cleared assets. Recorded sample-width review
does not clear dark mode, accessibility, every viewport or final visual quality.
