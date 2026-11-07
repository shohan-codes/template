# Activity Feed specification

## Problem and outcome

Consumers need to present a readable ordered history of events or messages using
data and callbacks. Actor, action, time and related content should be clear while
leaving ordering, permissions, fetching and delivery to the consuming product.

## Scope and boundaries

Include one read-only family with connected event rows and spaced message rows,
optional attachment summaries, unread text and caller-owned load-more/retry
controls. Exclude composing/sending, realtime transport, threads, reactions,
read-receipt persistence, file upload/download storage, automatic mark-as-read,
virtualization and a complete activity dashboard or inbox Block.

At the [baseline](../../initial-component-batch.md), there is no Activity Feed
family. Avatar, Button, Badge and theme tokens exist; their suitable composition
still needs implementation and testing. No feed engine or messaging service is
inferred from those primitives or the source previews.

## Proposed contract and ownership

- A readonly ordered list of events with stable IDs, actor display data,
  machine-readable timestamp and caller-provided display time. Keep caller order;
  do not infer chronology by parsing localized display strings.
- Use a discriminated event shape: an activity has an action summary and optional
  detail; a message has a text/React content body. Both may have optional metadata
  and attachment summaries with stable IDs, names and authorized destinations.
- Do not accept unsanitized HTML strings. Text is escaped; caller React slots are
  trusted application code. A remote message is never automatically executable.
- Optional actor image has a text/initial fallback. The actor's visible name
  remains accessible if an image fails. Duplicate adjacent name/image labels
  should not be announced unnecessarily.
- Unread is caller state with explicit text or accessible wording. A green dot
  does not by itself mean unread, online, successful or verified.
- Caller controls loading, refreshing, errors, empty data, `hasMore` and pending
  actions. Load more emits one callback; no automatic network request on scroll.
- Typed actor/time/body/attachment slots allow extensions while retaining ordered
  list semantics, IDs, refs, accessible names and event behavior.

Proposed paths are `activity-feed/connected/01` and `activity-feed/messages/01`.
Shared event types or time/attachment utilities may be extracted if actually used
by both; no universal conditional feed core is required.

## Interaction and accessibility

Use an ordered list within a caller-labeled section where appropriate. Decorative
connectors have no semantic role. Use `time` with a valid `dateTime`; visible time
and any tooltip must agree, with locale/time zone supplied by the product. Long
names, links and filenames wrap without pushing actions off-screen.

Appending entries must preserve scroll position and current keyboard focus.
Do not auto-scroll to newest content or mark it read on render. A caller may
provide a concise polite “new items available” announcement; do not make the
entire historical feed a live region. Loading more preserves already-read content;
a failure permits retry without replacing the whole list.

Links and attachments only act when a real destination/callback is provided.
Unavailable attachments have explanatory text, not a dead link. A retry or load
control is disabled while pending, with state communicated beyond color.

## Rights and original-design gate

The public Pro previews support generic ideas such as chronology and grouping.
Their source, exact arrangement, copy and assets are not available for reuse in
this competing library. Writing a close replica from scratch is not sufficient.
Before implementation approval, review original sketches/tokens and ensure the
result is not a reconstruction of the restricted design. If a requirement needs
protected expression, obtain permission or omit it. Use original fixture copy and
cleared or generated-neutral avatars, not vendor portraits.

## Acceptance

- Both variants render from the shared event meaning with no product backend.
  Activity/message discriminants prevent impossible content combinations.
- Stable IDs survive insertion and reordering. Empty, initial loading, refresh,
  populated failure, unavailable attachment and load-more retry are demonstrated.
- Long/bidirectional body text, filenames, missing images and mixed event lengths
  remain usable at 320/375/768/1280 px, zoom, RTL and light/dark themes.
- Keyboard order follows visual reading order. New items and retries preserve
  focus/scroll; no automatic read receipt, send or navigation occurs.
- Meaningful unread text, machine-readable time and screen-reader list semantics
  are checked. Decorative connectors/media are ignored appropriately.
- Review hierarchy, spacing, typography, contrast and the independent visual
  treatment separately from functional tests. No Pro source/assets are shipped.
- Separately built design imports, extension examples, applicable type/lint/build
  checks and interaction tests pass. Record actual evidence and remaining limits.

## Alternatives and rollout

Separate activity/message engines duplicate actor/time/attachment rules. One huge
renderer couples unrelated future behaviors. Start with two thin compositions
over a small shared meaning; direct reuse is allowed. A full chat library adds
unrequested sending/backend behavior. Establish the original visual treatment,
implement connected rows, extend message bodies, then test states and showcase
examples. Defer broader discovery until the initial batch is implemented.
