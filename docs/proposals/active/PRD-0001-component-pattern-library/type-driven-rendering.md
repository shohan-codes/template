# Type Driven Rendering

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Discriminated configuration ও recursive items কোথায় ব্যবহার করা যায়, কোথায় সরল data/JSX ভালো, এবং উদাহরণের বাইরে সম্ভাব্য component families।

এখানে স্থির principle ও প্রস্তাবিত উদাহরণ আলাদা করে চিহ্নিত। এগুলো architecture নির্দেশনা; নতুন system implement হয়েছে এমন দাবি নয়।

## Type driven configuration সব component জুড়ে

Type-driven configuration একটি সাধারণ composition technique। যেখানে heterogeneous items, field/renderer selection বা nested structure আছে, সেখানে discriminator অনুযায়ী সঠিক UI ও props বেছে নেওয়া যায়। Forms, menus, navigation ছাড়াও tree, filter builder, feed, property editor, file preview এবং structured content-এ এটি কাজে লাগতে পারে। Homogeneous বা free-form UI-তে এই technique বাধ্যতামূলক নয়।

- একটি item-এর `type` তার অর্থ, rendering এবং বৈধ props নির্ধারণ করবে।

- Menu-তে action, separator, custom UI এবং nested children আলাদা item shape হতে পারে।

- Sidebar-এর link/group/nested items বা form-এর text/select/combobox একই পদ্ধতির family-specific প্রয়োগ।

- যেখানে nesting অর্থপূর্ণ, recursive typed configuration থাকবে। সব item-এ `children` জোর করে থাকবে না।

- Discriminated union ভুল combination ধরবে: যেমন separator-এ action-only props গ্রহণ না করা; custom UI-র জন্য typed renderer/slot contract রাখা।

- নতুন item type যোগ করতে renderer/slot registration ও TypeScript type map একসঙ্গে extend করতে হবে।

- সম্ভব হলে একই নাম ও semantics reuse হবে, কিন্তু Menu, Sidebar, Collapsible বা form-এর আলাদা keyboard, focus, selection ও accessibility behavior অক্ষুণ্ণ থাকবে।

- React node বা callback-সহ config ব্যবহার করা যেতে পারে; তাই এই API-কে স্বয়ংক্রিয়ভাবে JSON-serializable বলা হবে না।

এটি স্থির design direction; এখনো নতুন library code-এ implement করা হয়নি।

## প্রস্তাবিত বিস্তৃত component catalog

নিচের catalog নতুন component ও variant খুঁজে পাওয়ার ভিত্তি। এটি roadmap, implementation count বা শেষ তালিকা নয়। প্রতিটি row-র সব item একই union, core বা package-এ রাখার প্রস্তাবও নয়।

| কাজের ক্ষেত্র        | সম্ভাব্য families                                                        | Data এবং composition-এর ধারণা                                                          | সীমা                                                                        |
| -------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Navigation           | breadcrumb, navigation-menu, sidebar, bottom-navigation, pagination      | link, active item, group, overflow; horizontal, vertical, rail বা overflow composition | Navigation link ও command action-এর semantics আলাদা                         |
| Commands             | dropdown-menu, context-menu, command-menu, action-bar, split-button      | action, link, checkbox/radio choice, separator, group, submenu, custom item            | Menu keyboard model ও command-search model এক নয়                            |
| Hierarchical content | tree-view, file-tree, nested-list, accordion, collapsible                | leaf ও branch/group; nested children, expansion, lazy-child state                      | Deep nesting, cycle এবং focus order সামলাতে হবে                             |
| Selection            | select, combobox, multi-select, choice-group, transfer-list              | option/group, single/multiple value, search, disabled option, custom option view       | একটি single value-র API-তে multi-value জোর করে বসানো নয়                     |
| Data display         | data-table, data-list, description-list, comparison-table, entity-card   | row/column, label-value entry, media/text/status/link/custom value                     | একই dataset হলেও table, cards ও description list ভিন্ন composition          |
| Filtering            | filter-bar, filter-builder, search-panel, saved-view-selector            | field/operator/value condition; AND/OR group ও recursive expressions                   | UI query schema এবং backend query language আলাদা adapter দিয়ে যুক্ত হবে     |
| Metrics              | metric-card, metric-grid, trend-card, progress-summary                   | value, formatter, unit, delta, trend, threshold; icon/sparkline slots                  | Value formatter এবং domain calculation এক দায়িত্ব নয়                        |
| Content collections  | feature-list, testimonial-list, FAQ-list, timeline, activity-feed        | content item, section, event, divider, grouped date বা custom entry                    | Homogeneous list-এ অপ্রয়োজনীয় discriminator দরকার নেই                       |
| Product information  | pricing-plan, pricing-comparison, product-card, plan-selector            | feature, included/excluded state, price, period, action; list/grid/comparison          | Tax, billing বা checkout logic library core-এর দায়িত্ব নয়                   |
| Feedback             | alert-panel, banner, empty-state, result-panel, notification-feed        | status, title, message, action, timestamp, read state, custom detail                   | Status সাধারণত data/state; প্রতিটি status-এর জন্য আলাদা design file নয়      |
| Overlays             | dialog, sheet, popover, confirm-dialog, form-dialog                      | header/body/footer/action slots; trigger, open state, form বা confirmation content     | Modal focus trapping, escape ও focus return প্রতিটির semantics মেনে         |
| Process              | stepper, wizard, task-list, checklist, onboarding-flow                   | step, section, completion, branch decision, navigation action                          | Stepper দেখানো আর workflow execution engine এক নয়                           |
| Media ও files        | avatar-group, media-gallery, attachment-list, upload-field, file-preview | image/video/file item, upload progress/error, thumbnail ও preview slots                | Upload transport, authentication ও storage provider consuming app/adapter-এ |
| Editing              | inline-editor, editable-list, property-editor, repeatable-field-group    | read/edit state, field schema, save/cancel, item add/remove/reorder                    | Rich text, undo history বা collaborative editing আলাদা complexity           |
| Time ও scheduling    | date-picker, date-range-picker, calendar, agenda, time-slot-picker       | date/range/event/slot, disabled intervals, time zone ও formatting                      | Date-only value ও timestamp যেন নীরবে এক হয়ে না যায়                         |
| Layout ও utilities   | section, panel, toolbar, resizable-layout, master-detail, code-block     | regions, actions, tabs, code/language; configurable child slots                        | Arbitrary page builder বানানো এই library-র প্রয়োজনীয় লক্ষ্য নয়              |

### কোন ক্ষেত্রে typed configuration সবচেয়ে কার্যকর

1. **Mixed item collection:** command-menu-তে action, separator ও group; notification-feed-এ message, action request ও system event; description-list-এ text, date, link ও custom value। এখানে discriminated union ভালো fit।

2. **Recursive structure:** tree-view, nested navigation, filter-builder-এর AND/OR group, grouped form sections। শুধু container type-এ `children` থাকবে; leaf-এ নয়।

3. **Field বা renderer selection:** dynamic field, property-editor, table cell renderer, file-preview। Type বদলালে তার বৈধ props-ও বদলাবে।

4. **Explicit state model:** async picker-এ loading/success/empty/error বা upload-এ queued/uploading/done/failed। এটি UI item type থেকে আলাদা state union হতে পারে।

5. **Homogeneous collection:** সাধারণ testimonial বা feature list-এ সব item একই shape হলে সরল generic array যথেষ্ট। প্রতিটি object-এ `type` যোগ করলে বাড়তি সুবিধা না থাকলে তা করা হবে না।

6. **Free-form composition:** bespoke hero, canvas editor বা অনিয়মিত content layout-এ JSX/children/slots কখনো config schema-র চেয়ে পরিষ্কার। সেগুলোকে জোর করে একটি giant schema-তে রূপান্তর নয়।

### উদাহরণ থেকে পরবর্তী সুযোগ

- Dropdown ও Context Menu থেকে শুধু আরেকটি menu নয়, একই action vocabulary ব্যবহার করা **Command Menu, Toolbar এবং Bulk Action Bar**-ও বিবেচনা করা যায়।

- Sidebar-এর nesting থেকে **Tree View, File Tree ও Nested Outline**-এর প্রয়োজন বোঝা যায়; তবে প্রতিটির interaction আলাদা থাকবে।

- Dynamic field থেকে **Filter Builder, Property Editor, Repeatable Field Group এবং Inline Editor** পাওয়া যায়।

- DataTable থেকে **Record List, Master Detail, Saved Views এবং Comparison Table** তৈরি করা যেতে পারে, যখন consumer-এর কাজে প্রয়োজন আছে।

- KPI/Feature Card থেকে **Metric Grid, Trend Summary, Pricing Comparison এবং Status Overview** বের করা যায়। শুধু card-এর নাম পাল্টালেই নতুন family নয়; কাজ ও contract সত্যিই আলাদা কি না দেখতে হবে।
