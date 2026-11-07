# Empty State specification

## Problem and outcome

Consumers need a clear explanation and next action when a search has no matches
or an account has no invited people. They should pass content and callbacks,
without rebuilding layout or confusing empty data with a loading/error state.

## Scope

Include `search/01` and `invitation/01`, optional decorative media, typed actions,
responsive layout and semantic heading control. Exclude error pages, skeleton
loaders, sending invitations, creating accounts, resetting filters internally,
permission logic and image sourcing. A full invitation workflow is a Block.

## Current-code comparison

At the [batch baseline](../../initial-component-batch.md), shadcn provides `Empty`,
`EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription` and `EmptyContent`.
There is no ready empty-state family in `packages/pattern`. Reuse compatible
layout pieces, Button and theme tokens. Do not assume `EmptyTitle` is a heading:
it currently renders a `div`. The upstream MIT primitive's `main`/`h1` defaults
are also inappropriate as unconditional defaults for an embedded pattern.

## Proposed consumer contract

- Required title and a semantic heading level, defaulting to `h2` for an embedded
  section. Support caller heading integration without duplicate IDs.
- Optional description, media and accessible region label. Default root is a
  neutral container, not an automatic `main` landmark or live region.
- Actions use stable IDs and labels. A discriminated action is either a link
  with `href` or a button with `onAction`; it cannot be both. Buttons default to
  `type="button"`. Native props, disabled/pending state and accessible names
  remain available through typed props/slots.
- Allow zero, one or two actions in this batch, with at most one primary action.
  Their input order defines reading and keyboard order, including when stacked.
- Callers choose variant, exact copy, primary intent, permission gating and state.
  A missing callback must not create a fake working control.
- Typed media/title/description/action slots may override presentation. Preserve
  IDs, names, refs, event composition and focus behavior. Do not use an untyped
  universal slot-prop bag for the new contract.

These are proposed API requirements, not exported TypeScript symbols. Validate
concrete names with a minimal usage example before implementation is finalized.

## Behavior and state ownership

The pattern is presentational. Search reset invokes one callback and lets the
caller update filters/results. Invitation actions request the caller's workflow;
they do not create links or send messages on mount. The caller supplies pending
and failure feedback. Pending actions cannot fire repeatedly. Do not silently
disable an unrelated action unless its caller says so.

Mounting must not steal focus or announce the entire region repeatedly. After
search reset or closing an invitation dialog, the consuming example demonstrates
deliberate focus recovery to the initiating control or a documented result target.
Only the caller decides when a changed result count needs a polite announcement.

## Composition and visual direction

Both variants share content/action meaning. Search has compact symbolic media;
invitation permits a wider, original people-related decoration. Variant wrappers
can reuse the same earlier design directly; extract family `shared/` only when
types or action rendering truly repeat. Do not create a universal empty/error/
loading framework. Theme, density and loading are not new design numbers.

Use repository typography, spacing and color tokens, with one clear heading,
readable description width and visible primary/secondary distinction. Wrap or
stack actions at narrow widths. Avoid fixed heights, clipped text and decorative
assets that dominate the task. Do not copy the Pro portrait arrangement.

## Acceptance

- Data/config alone renders both variants with zero, one and two actions.
- Search no-results and no-people onboarding use different explanatory copy;
  loading and request failures are not misrepresented as empty success.
- Button callbacks fire once per activation; links navigate correctly. Pending,
  disabled, retry, cancellation and caller-controlled recovery are demonstrated.
- Heading levels are correct inside an existing `main`; no duplicate landmark,
  duplicate ID or decorative media announcement is introduced.
- 320/375/768/1280 px, long translated labels, 200% zoom, RTL and light/dark checks
  show no clipped copy or unreachable action. Focus and contrast are reviewed.
- Custom action and media slots preserve keyboard access, refs and disabled
  behavior. Tests include a form embedding so actions do not submit accidentally.
- Public design imports work from the built package, existing exports remain
  unchanged, and applicable typecheck/lint/build plus interaction tests pass.
- Record the actual tested commit, viewports, states, screenshots and remaining
  limits. Source desktop observations do not count as implementation tests.

## Alternatives and rollout

Manual primitive assembly remains an escape hatch, but does not meet the ready
component goal. Copying the vendor composition adds rights and semantic risks;
use existing primitives and an original design instead. Start with search, then
reuse the validated contract for invitation. Add showcase examples and tests
before exporting both designs. This proposal does not authorize a merge.
