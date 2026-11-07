# Showcase Navigation

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Showcase-এ প্রতিটি component family expand করলে তার variants দেখা যাবে। প্রতিটি variant-এর আলাদা page থাকবে, আর সেই page-এ ওই composition-এর numbered designs দেখানো হবে। এই নিয়ম পুরো catalog-এর জন্য, শুধু Accordion-এর জন্য নয়।

**অবস্থা:** এটি সম্মত showcase requirement ও তার ভিত্তিতে প্রস্তাবিত implementation guidance। এখনো showcase code পরিবর্তন করা হয়নি।

## সম্মত navigation model

- Sidebar-এ family একটি expandable/collapsible parent হবে। Parent-এ click করলে তার variant links প্রকাশ পাবে।

- প্রতিটি variant আলাদা navigation item ও আলাদা page পাবে।

- একটি family page-এ সব variant একের পর এক stack করে দেখানোই মূল navigation হবে না। Family overview থাকলে তা সংক্ষিপ্ত পরিচিতি ও variant links দেবে।

- Variant page-এ `01`, `02`, `03` হলো একই composition-এর ভিন্ন visual designs। Composition আলাদা হলে নতুন variant হবে।

- নতুন family, variant ও design একই generic model-এ যোগ হবে। Accordion-এর জন্য আলাদা hard-coded navigation logic লেখা হবে না।

## Navigation tree

```text
Showcase sidebar
├── Accordion                     [expand/collapse]
│   ├── Default                   → variant page: 01, 02, ...
│   └── Card                      → variant page: 01, 02, ...
├── Feature List                  [expand/collapse]
│   ├── Grid                      → variant page: 01, 02, ...
│   └── List                      → variant page: 01, 02, ...
├── Form Field                    [expand/collapse]
│   ├── Plain                     → integration page + designs
│   └── React Hook Form           → integration page + designs
└── Data Table                    [expand/collapse]
    └── TanStack                  → variant/implementation page + designs
```

নাম ও example variants illustrative। Hierarchy guide-এর composition বনাম integration/engine পার্থক্য বজায় থাকবে; শুধু sidebar-এ একই level-এ দেখানোর কারণে তাদের semantics এক হয়ে যাবে না।

## প্রস্তাবিত catalog এবং routing

- একটি typed catalog/manifest থেকে sidebar, variant links, breadcrumbs ও design listing তৈরি করা যেতে পারে। Family/variant ID, label, description, design entries ও preview loader আলাদা থাকবে।

- Runtime UI registry এবং showcase metadata এক জিনিস নয়। Navigation তৈরি করতে সব component implementation eager-import করা লাগবে না।

- উদাহরণ route: `/components/:family/:variant`। নির্দিষ্ট design-এর shareable anchor বা nested route থাকতে পারে, কিন্তু শুরুতেই সব numbered design sidebar-এ ছড়িয়ে দেওয়া প্রয়োজন নেই।

- Direct URL খুললেও সঠিক variant active থাকবে এবং তার parent family expanded থাকবে। Back/forward navigation-এ route ও sidebar state মিলতে হবে।

- Design সংখ্যা বেশি হলে সেই variant page-এ local picker, search বা lazy preview ব্যবহার করা যায়। এতে family/variant navigation অপরিবর্তিত থাকবে।

- Component name, variant label ও tags দিয়ে catalog search/filter রাখা যায়। Search result সরাসরি সঠিক variant/design-এ নিয়ে যাবে।

## Variant page-এর প্রস্তাবিত বিষয়বস্তু

- Family ও variant পরিচয় এবং সংক্ষিপ্ত ব্যবহার নির্দেশনা।

- প্রত্যেক numbered design-এর preview, import path, data/config example এবং প্রয়োজনীয় props/slots-এর সংযোগ।

- Design নিজে নতুন component name বাধ্যতামূলক করবে না; path দিয়ে নির্বাচন ও প্রয়োজনে import alias ব্যবহারের নিয়ম থাকবে।

- Loading, empty, error, disabled এবং interactive states যেখানে প্রযোজ্য সেখানে দেখা যাবে।

- Responsive preview ও theme controls একরকম হবে, যাতে designs তুলনা করা যায়।

- Demo-local actions বাস্তব destructive API কল করবে না; প্রয়োজন হলে mock/controlled example ব্যবহার করবে।

## Accessibility এবং scalable behavior

- Family expand control একটি keyboard-operable button হবে; expanded state ও controlled region সঠিকভাবে প্রকাশ করবে।

- Variant item navigation link হবে, active page স্পষ্ট হবে। যদি family overview link-ও থাকে, expand toggle ও navigation action যেন অস্পষ্ট একই control না হয়।

- Sidebar keyboard focus, visible focus, collapsed item behavior এবং mobile drawer/close behavior পরীক্ষা করতে হবে।

- সব preview একসঙ্গে mount না করে প্রয়োজন অনুযায়ী load করো। একটি preview failure যেন পুরো catalog ভেঙে না দেয়।

- Missing/duplicate catalog ID, missing variant route ও unavailable preview-এর জন্য স্পষ্ট fallback ও validation রাখো।

## সম্পন্ন হওয়ার শর্ত

1. অন্তত কয়েকটি ভিন্ন family দিয়ে একই navigation logic পরীক্ষা করো; শুধু Accordion demo যথেষ্ট নয়।

2. Family expand/collapse, variant link, direct URL, refresh, back/forward এবং active-state behavior যাচাই করো।

3. প্রত্যেক variant page শুধু তার সঠিক numbered designs দেখায় কি না পরীক্ষা করো।

4. Desktop/mobile, keyboard, overflow, long names, অনেক family/variant এবং loading/error অবস্থায় manual review করো।

5. [Testing and Visual QA](testing-visual-qa.md)-এর completion rules অনুসরণ করো; implementation, screenshots ও actual checks ছাড়া finished বলা যাবে না।
