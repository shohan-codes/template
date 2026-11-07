# Hierarchy and Naming

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Family, composition variant ও visual design আলাদা রেখে folder, package boundary এবং import naming সাজানোর নির্দেশনা।

এখানে স্থির principle ও প্রস্তাবিত উদাহরণ আলাদা করে চিহ্নিত। এগুলো architecture নির্দেশনা; নতুন system implement হয়েছে এমন দাবি নয়।

## মূল ধারণা

- **Family** হলো component-এর কাজের ধরন, যেমন accordion, feature-list, data-table বা form-field।

- **Variant** হলো family-র নির্দিষ্ট composition/structure, যেমন feature-list-এর grid ও list। আলাদা composition হলে আলাদা variant/core হতে পারে।

- **Design** হলো একই variant/composition-এর ভিন্ন visual presentation। `01`, `02`, `03` এই design-গুলো চিহ্নিত করবে।

- Variant ও design-এর সংখ্যা নির্দিষ্ট তালিকায় বন্ধ থাকবে না। নতুন প্রয়োজন অনুযায়ী যোগ করা যাবে।

- ব্যবহারকারীকে সাধারণ ব্যবহারে primitives জোড়া লাগানো, layout তৈরি বা CSS লেখা বাধ্যতামূলক করা যাবে না। Interactive component-এর ক্ষেত্রে প্রয়োজনীয় callbacks/state থাকবে।

## একই নামের নিচে ভিন্ন দায়িত্ব মেশানো এড়ানো

এগুলো implementation-এর জন্য প্রস্তাবিত স্পষ্টীকরণ। Family → variant → numbered design-এর স্থির কাঠামো বজায় থাকবে।

| পরিবর্তনটি কী                                        | কোথায় প্রকাশ করা ভালো                  | উদাহরণ                                   |
| ---------------------------------------------------- | -------------------------------------- | ---------------------------------------- |
| Component-এর কাজ আলাদা                               | Family                                 | navigation-menu বনাম filter-builder      |
| একই কাজের markup/flow বা composition আলাদা           | Variant                                | feature-list/grid বনাম feature-list/list |
| Composition একই, visual presentation আলাদা           | Design                                 | card/01 ও card/02                        |
| সাধারণ size, tone, density, disabled বা active state | উপযুক্ত prop/token/state               | compact, danger, loading                 |
| State/data ownership আলাদা                           | স্পষ্ট controlled API বা adapter       | local paging বনাম server paging          |
| External library integration                         | পাতলা integration wrapper              | plain field এবং RHF field                |
| Underlying engine আলাদা                              | আলাদা implementation entry যখন প্রয়োজন | TanStack বনাম simple table               |

`plain`/`rhf` দুটি integration variant রাখার সিদ্ধান্ত বজায় থাকবে; দুটির visual composition অকারণে duplicate হবে না। একইভাবে `tanstack` একটি engine-এর নাম, visual style নয়। প্রাথমিক `data-table/tanstack` entry রাখা যায়, কিন্তু তার নিচে numbered design-এর মানে হবে একই নির্ধারিত composition-এর style। যদি grid/record/compact layout আলাদা structure দাবি করে, hierarchy flatten বা অতিরিক্ত meaningful variant করা উচিত কি না তখন স্পষ্ট সিদ্ধান্ত নিতে হবে; একই স্তরে engine, color ও layout এলোমেলোভাবে মেশানো নয়।

এই ভাগের লাভ হলো `small-dark-rhf-server-card` ধরনের অসংখ্য variant বানাতে হয় না। Tradeoff হলো কিছু concern আলাদা adapter/config হিসেবে বুঝতে হয়; তাই সাধারণ ব্যবহারটির default প্রস্তুত থাকবে।

## Folder hierarchy এবং naming

```text
packages/
├── shadcn-ui/                  # শুধু shadcn UI ও তার প্রয়োজনীয় ভিত্তি
└── pattern/
    └── src/
        ├── accordion/
        │   ├── card/
        │   │   ├── core.tsx    # প্রয়োজন হলে variant-local composition
        │   │   ├── 01.tsx
        │   │   └── 02.tsx
        │   ├── default/
        │   │   ├── core.tsx
        │   │   ├── 01.tsx
        │   │   └── 02.tsx
        │   └── shared/         # সত্যিই common types/utilities প্রয়োজন হলে
        ├── feature-list/
        │   ├── grid/
        │   │   ├── core.tsx
        │   │   ├── 01.tsx
        │   │   └── 02.tsx
        │   └── list/
        │       ├── core.tsx
        │       ├── 01.tsx
        │       └── 02.tsx
        └── data-table/
            └── tanstack/
                ├── core/      # বড় core হলে file-এর বদলে folder
                │   ├── index.ts
                │   ├── types.ts
                │   ├── features.ts
                │   ├── state.ts
                │   └── table-core.tsx
                ├── 01.tsx
                └── 02.tsx
```

Tree-টি নিয়ম বোঝানোর উদাহরণ। প্রতিটি family-তে সব folder বাধ্যতামূলক নয়।

- Folder নাম ছোট হাতের, একাধিক শব্দ হলে kebab-case।

- Design file `01.tsx`, `02.tsx` হবে। Component-এর public নাম `CardAccordion` হতে পারে; নামের সঙ্গে `01` বা `02` বসানো বাধ্যতামূলক নয়। Import path design নির্বাচন করবে।

- একই ফাইলে দুটি design ব্যবহার করলে consumer import alias দিতে পারবে।

- Dependency বোঝাতে `02-from-01` ধরনের filename আপাতত ব্যবহার হবে না। Import-ই প্রকৃত dependency দেখাবে।

- Public entry-point-এর নির্দিষ্ট বানান implementation-এর সময় স্থির হবে।

## প্রস্তাবিত naming পরিমার্জন

- Family-র নাম consumer-এর কাজ বোঝাবে: `command-menu`, `filter-builder`, `description-list`, `metric-card`। শুধু `misc`, `advanced` বা `other` এড়িয়ে চলা ভালো।

- Variant-র নাম composition বোঝাবে: `grid`, `list`, `rail`, `stacked`। শুধুমাত্র color/state হলে prop বা token বেশি উপযুক্ত।

- `default` রাখা যাবে, তবে catalog বড় হলে সেই default-এর composition বোঝায় এমন নাম বেশি পরিষ্কার কি না দেখা হবে।

- Numeric design path স্থিতিশীল থাকবে; public component নাম অকারণে numbered হবে না। Design বদলে যাওয়ার কারণে পুরোনো `01`-কে নীরবে অন্য design-এ পুনর্ব্যবহার নয়।

- Config-এর `type` meaningful semantic choice হবে। Native input-এর `type`-এর সঙ্গে collision হলে native props আলাদা typed bag বা অন্য স্পষ্ট নাম পেতে পারে; এক property-তে দুই অর্থ নয়।

- Component lookup-এর জন্য showcase metadata-তে purpose, tags, compatible slots, dependencies, example data ও states রাখা যায়। এটি runtime global registry বাধ্যতামূলক করে না।

## Package এবং import সীমা

- `shadcn-ui` package-এ শুধু shadcn UI থাকবে। Product-specific ready compositions বা business components এখানে রাখা হবে না।

- Ready components, design wrappers ও composition rules থাকবে `pattern` package-এ। এগুলো shadcn primitives বা অনুমোদিত slot implementations ব্যবহার করবে।

- প্রতিটি design আলাদাভাবে import করা যাবে। একটি বিশাল `variant` switch থেকে সব design বাধ্যতামূলকভাবে load করানো হবে না।

- আলাদা file/import থাকলেই unused code বাদ যাওয়ার নিশ্চয়তা নেই। Public exports, bundler tree shaking ও actual consumer bundle দিয়ে যাচাই করতে হবে।
