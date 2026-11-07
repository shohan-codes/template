# Testing and Visual QA

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Implementation alone is not completion. Completion requires functional, manual, responsive, visual, and accessibility checks, followed by an accurate report of results and remaining blockers.

Agreed principles and proposed examples are identified separately. These are architecture instructions, not claims that the new system has been implemented.

## Definition of done and verification

**Implementation alone is not completion.** Before calling a component complete, perform applicable automated tests, manual browser interactions, visual reviews, and responsive checks. If a check cannot run, report that part as incomplete or blocked; never assume a pass.

- **Code and package:** Run typecheck, lint, built-package import resolution, and the applicable production build. Verify actual consumer imports beyond source aliases.

- **Functional tests:** Verify data/config-only usage, controlled/uncontrolled state, callbacks, wrapper extension, native props, and slot overrides. Use unit, interaction, or integration tests appropriate to the component.

- **Manual interaction and accessibility:** In the browser, check keyboard behavior, focus order/return, labels, semantic roles, disabled/loading/error/empty states, and relevant pointer/touch interactions. Use automated accessibility checks where available; they do not replace manual review.

- **Responsiveness and visual review:** Check small/mobile, medium/tablet, and large/desktop viewports. Inspect overflow, clipping, wrapping, spacing, visible focus, long content, and edge-case data. Also verify supported light/dark themes.

- **Bundle:** Verify which dependencies enter the bundle when importing one design, including exports and CSS side effects. Measure whether unnecessary designs are excluded rather than assuming they are.

- **Regression:** When a base design changes, also test dependent designs. Compare visual regression results against a reviewed baseline; never blindly accept a failing screenshot as the new baseline.

Provide a preview and representative screenshots so the checks can be reviewed. The completion report must distinguish actual check results, tested viewports/states, remaining warnings, defects, and blockers. A screenshot or passing automated test does not establish aesthetic quality. Assess hierarchy, readability, alignment, consistency, and relevant design references separately.
