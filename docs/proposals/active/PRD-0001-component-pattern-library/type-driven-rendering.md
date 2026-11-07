# Type-Driven Rendering

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Where to use discriminated configuration and recursive items, where simple data/JSX is preferable, and potential component families beyond the original examples.

Agreed principles and proposed examples are identified separately. These are architecture instructions, not claims that the new system has been implemented.

## Type-driven configuration across components

Type-driven configuration is a general composition technique. When there are heterogeneous items, field/renderer choices, or nested structures, a discriminator can select the correct UI and props. Beyond forms, menus, and navigation, it can help with trees, filter builders, feeds, property editors, file previews, and structured content. This technique is not mandatory for homogeneous or free-form UI.

- An item's `type` determines its meaning, rendering, and valid props.

- In a menu, actions, separators, custom UI, and nested children may have different item shapes.

- Sidebar links/groups/nested items and form text/select/combobox fields are family-specific applications of the same approach.

- Use recursive typed configuration where nesting is meaningful. Do not force `children` onto every item.

- A discriminated union should reject invalid combinations, such as action-only props on a separator, and provide a typed renderer/slot contract for custom UI.

- Adding an item type requires extending renderer/slot registration and the TypeScript type map together.

- Reuse names and semantics where appropriate while preserving the distinct keyboard, focus, selection, and accessibility behavior of menus, sidebars, collapsibles, and forms.

- Config may include React nodes or callbacks, so do not automatically describe the API as JSON-serializable.

This is an agreed design direction, not an implemented feature of the new library.

## Proposed broader component catalog

The catalog below is a starting point for discovering components and variants. It is not a roadmap, implementation count, or exhaustive list. Nor does it propose putting every item in a row into the same union, core, or package.

| Use-case area        | Potential families                                                       | Data and composition ideas                                                                  | Boundaries                                                                                  |
| -------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Navigation           | breadcrumb, navigation-menu, sidebar, bottom-navigation, pagination      | Links, active items, groups, overflow; horizontal, vertical, rail, or overflow compositions | Navigation links and command actions have different semantics                               |
| Commands             | dropdown-menu, context-menu, command-menu, action-bar, split-button      | Actions, links, checkbox/radio choices, separators, groups, submenus, custom items          | Menu keyboard models and command-search models are not identical                            |
| Hierarchical content | tree-view, file-tree, nested-list, accordion, collapsible                | Leaves and branches/groups; nested children, expansion, lazy-child state                    | Handle deep nesting, cycles, and focus order                                                |
| Selection            | select, combobox, multi-select, choice-group, transfer-list              | Options/groups, single/multiple values, search, disabled options, custom option views       | Do not force multiple values into an API designed for a single value                        |
| Data display         | data-table, data-list, description-list, comparison-table, entity-card   | Rows/columns, label-value entries, media/text/status/link/custom values                     | Tables, cards, and description lists have different compositions even for the same dataset  |
| Filtering            | filter-bar, filter-builder, search-panel, saved-view-selector            | Field/operator/value conditions; AND/OR groups and recursive expressions                    | Connect the UI query schema to the backend query language through a separate adapter        |
| Metrics              | metric-card, metric-grid, trend-card, progress-summary                   | Values, formatters, units, deltas, trends, thresholds; icon/sparkline slots                 | Value formatting and domain calculations are separate responsibilities                      |
| Content collections  | feature-list, testimonial-list, FAQ-list, timeline, activity-feed        | Content items, sections, events, dividers, grouped dates, custom entries                    | Homogeneous lists do not need unnecessary discriminators                                    |
| Product information  | pricing-plan, pricing-comparison, product-card, plan-selector            | Features, included/excluded states, prices, periods, actions; list/grid/comparison          | Tax, billing, and checkout logic do not belong in the library core                          |
| Feedback             | alert-panel, banner, empty-state, result-panel, notification-feed        | Status, title, message, action, timestamp, read state, custom detail                        | Status is usually data/state; not every status needs a separate design file                 |
| Overlays             | dialog, sheet, popover, confirm-dialog, form-dialog                      | Header/body/footer/action slots; triggers, open state, form or confirmation content         | Follow each component's semantics for modal focus trapping, Escape, and focus return        |
| Process              | stepper, wizard, task-list, checklist, onboarding-flow                   | Steps, sections, completion, branch decisions, navigation actions                           | Displaying a stepper is not the same as implementing a workflow execution engine            |
| Media and files      | avatar-group, media-gallery, attachment-list, upload-field, file-preview | Image/video/file items, upload progress/errors, thumbnail and preview slots                 | Upload transport, authentication, and storage providers belong in the consuming app/adapter |
| Editing              | inline-editor, editable-list, property-editor, repeatable-field-group    | Read/edit state, field schemas, save/cancel, item add/remove/reorder                        | Rich text, undo history, and collaborative editing introduce separate complexity            |
| Time and scheduling  | date-picker, date-range-picker, calendar, agenda, time-slot-picker       | Dates/ranges/events/slots, disabled intervals, time zones, formatting                       | Do not silently conflate date-only values with timestamps                                   |
| Layout and utilities | section, panel, toolbar, resizable-layout, master-detail, code-block     | Regions, actions, tabs, code/language; configurable child slots                             | An arbitrary page builder is not a required goal of this library                            |

### Where typed configuration is most useful

1. **Mixed item collections:** Actions, separators, and groups in a command menu; messages, action requests, and system events in a notification feed; text, dates, links, and custom values in a description list. Discriminated unions fit these cases well.

2. **Recursive structures:** Tree views, nested navigation, filter-builder AND/OR groups, and grouped form sections. Only container types have `children`, not leaves.

3. **Field or renderer selection:** Dynamic fields, property editors, table-cell renderers, and file previews. Changing the type also changes the valid props.

4. **Explicit state models:** Loading/success/empty/error for an async picker or queued/uploading/done/failed for an upload. This may be a state union separate from the UI item type.

5. **Homogeneous collections:** A simple generic array is enough when every item in a testimonial or feature list has the same shape. Do not add `type` to every object unless it provides a benefit.

6. **Free-form composition:** JSX/children/slots may be clearer than a config schema for a bespoke hero, canvas editor, or irregular content layout. Do not force these into a giant schema.

### Opportunities derived from the examples

- Dropdown and Context Menu suggest more than another menu: consider **Command Menu, Toolbar, and Bulk Action Bar** using the same action vocabulary.

- Sidebar nesting suggests **Tree View, File Tree, and Nested Outline**, while retaining each one's distinct interactions.

- Dynamic fields suggest **Filter Builder, Property Editor, Repeatable Field Group, and Inline Editor**.

- DataTable can lead to **Record List, Master Detail, Saved Views, and Comparison Table** when consumers need them.

- KPI/Feature Card can lead to **Metric Grid, Trend Summary, Pricing Comparison, and Status Overview**. Renaming a card alone does not create a new family; verify that the task and contract genuinely differ.
