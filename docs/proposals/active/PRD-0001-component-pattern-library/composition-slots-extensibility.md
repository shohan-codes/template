# Composition Slots and Extensibility

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Variant-local core, সরাসরি component reuse, extensible props, default/runtime slots, state ownership এবং typed API contract।

এখানে স্থির principle ও প্রস্তাবিত উদাহরণ আলাদা করে চিহ্নিত। এগুলো architecture নির্দেশনা; নতুন system implement হয়েছে এমন দাবি নয়।

## Core এবং সরাসরি reuse

- Core variant-এর direct child থাকবে, বাধ্যতামূলকভাবে `shared`-এ নয়।

- Core ছোট হলে `core.tsx`; বড় হলে দায়িত্ব অনুযায়ী `core/`-এর ভেতর কয়েকটি file, আর `core/index.ts` থেকে প্রয়োজনীয় exports। শুধু line কমানোর জন্য অযথা ভাগ করা হবে না।

- `02.tsx` চাইলে `01.tsx`-এর exported component, props বা reusable অংশ import করে extend করতে পারবে। আগে সেই অংশ `shared`-এ সরানো বাধ্যতামূলক নয়।

- Dependency একদিকে থাকবে। `02 → 01` হলে `01 → 02` হবে না; circular import এড়াতে হবে।

- Number মানেই inheritance নয়। একই composition-এর design স্বাধীনভাবেও তৈরি হতে পারে।

- Composition আলাদা হয়ে গেলে অন্য variant/local core নেওয়া যাবে। সব design-কে একটি অতিরিক্ত generic core-এ জোর করে ঢোকানো হবে না।

- Base component বদলালে তার ওপর নির্ভরশীল design-গুলোও যাচাই করতে হবে।

## Props এবং slot contract

- Wrapper নিজের নতুন props যোগ করবে, পাশাপাশি base component-এর উপযোগী existing/default props, events ও overrides বজায় রাখবে। Props অকারণে সংকীর্ণ করা হবে না।

- `defaultSlots` হবে ready design-এর component mapping; `slots` হবে নির্দিষ্ট ব্যবহারের runtime override। একই key-তে runtime slot অগ্রাধিকার পাবে।

- Core-এর ভিতরে নির্দিষ্ট design component hard-code করা হবে না। যেমন Sidebar-এর Dropdown/Collapsible বদলানোর প্রয়োজন হলে সেগুলো typed slots দিয়ে আসবে। Default wrapper প্রয়োজনীয় implementations inject করবে।

- Slot-specific props-ও typed হবে, যাতে autocomplete ও invalid-prop checking থাকে।

- মিল আছে এমন component-এ অর্থপূর্ণভাবে data shape, props নাম, selection/open state ও callback naming মিল রাখা হবে। Dropdown ও Context Menu-র common অংশ মিলতে পারে; তাদের আলাদা interaction/accessibility আচরণ বজায় থাকবে।

- Primitive component-এর দায়িত্ব এবং composition core-এর দায়িত্ব আলাদা থাকবে। সব interaction core-এ নতুন করে লেখা প্রয়োজন নেই।

## প্রস্তাবিত API contract এবং extension নিয়ম

### Data এবং behavior আলাদা রাখা

- প্রতিটি state-এর owner স্পষ্ট: internal default, controlled consumer, অথবা external adapter। এক state-এর জন্য দুটি source of truth নয়।

- স্থায়ী identity দরকার হলে item `id` ব্যবহার করবে। Selection, reordering বা async refresh-এর ক্ষেত্রে array index identity হিসেবে যথেষ্ট নয়।

- `label`, `description`, `disabled`, `children`-এর মতো নাম একই অর্থে reuse করা যায়। `value` এবং `id` এক জিনিস ধরে নেওয়া যাবে না।

- Value change, command selection ও navigation আলাদা event। Consistency মানে সবকিছুর নাম `onChange` করা নয়।

- Consumer callbacks না থাকলে action কী করবে, empty/loading/error অবস্থায় UI কী দেখাবে, controlled/default props একসঙ্গে দিলে কী হবে, এসব contract-এ বলা থাকবে।

### Type map এবং renderer map

TypeScript union প্রতিটি type-এর বৈধ payload বলবে; renderer map সেই type-কে implementation-এর সঙ্গে যুক্ত করবে। Type যোগ করে renderer বাদ পড়া বা renderer যোগ করে props contract বাদ পড়া build-time বা registration-time check-এ ধরা উচিত।

প্রস্তাবিত recursive model:

```text
Item
├── action      → label, disabled, action callback
├── link        → label, href
├── separator   → id
├── group       → label?, children: Item[]
└── custom      → typed render/slot contract
```

এটি menu-like structure-এর উদাহরণ; form, tree বা timeline একই union হুবহু ব্যবহার করবে না। একই vocabulary সম্ভব হলে reuse করবে, কিন্তু family-specific types থাকবে।

Runtime JSON/API থেকে config এলে TypeScript একা validation করে না। প্রয়োজনমতো runtime schema validation, unsupported type handling এবং error reporting থাকবে। Recursive input-এর depth/cycle guard এবং large collection-এর rendering strategy-ও বিবেচ্য।

### Slots এবং props-এর precedence

- Component selection: default slots-এর ওপর consumer-provided `slots` override।

- Slot props: default, design-level এবং consumer-level props-এর merge policy স্পষ্ট হতে হবে। Event handlers, `className`, `style` ও refs-এর জন্য সাধারণ object spread সবসময় যথেষ্ট নয়।

- Override-এ required accessibility props বা core handlers যেন ভুলে মুছে না যায়। Extension contract-এ কোনটা compose হবে এবং কোনটা replace হবে বলা থাকবে।

- Core replaceable components-কে slots হিসেবে গ্রহণ করবে; একটি design wrapper তার defaults inject করতে পারবে। Plain DOM structure-এর প্রত্যেকটি span আলাদা slot বানানো বাধ্যতামূলক নয়।

- Wrapper native props forwarding, refs এবং generic value types বজায় রাখবে; `any` দিয়ে extensibility দেখানো হবে না।

- Slot component identity অযথা প্রতি render-এ বদলালে remount/state loss হতে পারে। Stable definitions এবং প্রয়োজনমতো render functions-এর ভিন্ন contract বিবেচনা করতে হবে।

### Dependency এবং bundle সীমা

একটি design অন্য design reuse করলে সেই dependency bundle-এ যুক্ত হওয়া স্বাভাবিক। লক্ষ্য সবসময় zero dependency নয়, প্রয়োজনীয় code-ই থাকা এবং কী load হচ্ছে তা বোঝা। Direct imports অনুমোদিত; deep inheritance chain জটিল হলে existing design ভেঙে না দিয়ে composition boundary পুনর্বিবেচনা করা যাবে।

Public barrel, subpath exports, CSS side effects এবং client/server boundary consumer build দিয়ে যাচাই করতে হবে। শুধুমাত্র source alias-ভিত্তিক showcase পাস করাকে published package পাস ধরা যাবে না।

## বর্তমান code থেকে পাওয়া প্রমাণ

**Starter template:**

- `packages/pattern/src/accordion/variants/default-accordion.tsx` primitives-কে `defaultAccordionSlots`-এ map করে core-এ inject করে।

- `card-accordion.tsx` আলাদা `CardAccordion` export করে এবং card slots দিয়ে default wrapper reuse করে।

- `accordion/core.tsx` defaults-এর ওপর runtime slots merge করে।

**Reference project:** `ecomsaashq/frontend/packages/ui/src/patterns` বর্তমানে flat structure। নতুন numbered hierarchy সেখানে implement করা হয়নি।

- `record-dialog.tsx` সরাসরি `form-dialog.tsx` থেকে header ও size constants reuse করে।

- `danger-card.tsx` `SectionCard` wrap করে; `record-table.tsx` `DataTable` compose করে।

- Picker components `PickerTrigger`, `PickerPopover` ও `PickerGrid` reuse করে।

এগুলো direct composition/reuse-এর উদাহরণ, নতুন hierarchy-র implementation নয়।
