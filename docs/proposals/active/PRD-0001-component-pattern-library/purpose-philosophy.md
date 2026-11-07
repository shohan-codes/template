# Purpose and Philosophy

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

কেন এই library বানানো হচ্ছে, কী অর্জন করতে হবে, কোন কাজ এর scope নয়, এবং উদাহরণ থেকে সাধারণ principle কীভাবে বের করতে হবে।

এখানে স্থির principle ও প্রস্তাবিত উদাহরণ আলাদা করে চিহ্নিত। এগুলো architecture নির্দেশনা; নতুন system implement হয়েছে এমন দাবি নয়।

## Purpose এবং philosophy

Ready-made UI দ্রুত ব্যবহার করা যাবে, আবার library-র সীমা ছাড়িয়ে প্রয়োজন বাড়লে সেটিকে extend করাও যাবে। সাধারণ ব্যবহার সহজ রাখব; advanced ব্যবহার বন্ধ করব না। একই composition ও interaction বারবার লেখার বদলে প্রয়োজনমতো reuse হবে, কিন্তু design freedom হারিয়ে একটি অতিরিক্ত generic abstraction বানানো হবে না।

## Goals

- Component import করে data/configuration দিয়ে কার্যকর, ব্যবহারযোগ্য UI পাওয়া।

- বড় catalog-এ family, composition variant ও visual design সহজে খুঁজে পাওয়া।

- আলাদা design import, typed API, native props এবং slot-based customization বজায় রাখা।

- Existing component-এর ওপর wrapper দিয়ে নতুন component বানানোর সুযোগ রাখা।

- একই ধরনের component ব্যবহার শেখার খরচ কমাতে অর্থপূর্ণ API consistency রাখা।

- Visual quality, behavior, accessibility, type safety ও bundle impact যাচাইযোগ্য রাখা।

## Non goals

- প্রতিটি component-কে একটি universal layout, একই props বা একই interaction-এ বাধ্য করা।

- একটি giant component-এ সব design switch করে load করা।

- প্রতিবার reuse-এর আগে সব code generic shared/core-এ সরিয়ে নেওয়া।

- shadcn primitives package-এ business UI বা project-specific logic ঢোকানো।

- Plain field-কে React Hook Form-এর ওপর বাধ্যতামূলকভাবে নির্ভরশীল করা।

- Numbered design-কে version upgrade বা আগের design-এর replacement ধরে নেওয়া।

- প্রস্তাবিত architecture লেখা মানেই code implement হয়েছে ধরে নেওয়া।

## Guide ব্যবহার করার নিয়ম

এটি SKILL.md-style architecture guide: নতুন pattern তৈরি, existing pattern extend, API review ও design review-এর সময় ব্যবহারযোগ্য। এটি কোনো installed executable skill নয়।

কাজ শুরুর আগে family, variant/composition এবং design নির্ধারণ করো। বিদ্যমান component সরাসরি reuse করা যায় কি না দেখো। তারপর typed data contract, slots ও public props ঠিক করে implementation এবং checks করো। নতুন সিদ্ধান্ত হলে সংশ্লিষ্ট নিয়ম আপডেট করো; পুরোনো ও নতুন বিরোধপূর্ণ নির্দেশ পাশাপাশি রেখো না।

**স্থির দিকনির্দেশ:** নিচের hierarchy, reuse, slots, extensible props, integration variants ও type-driven configuration।

**উদাহরণ ও নাম পরিবর্তনযোগ্য:** আলোচনায় বলা component/type তালিকা, naming এবং tree-এর নামগুলো illustrative, exhaustive বা চূড়ান্ত সীমা নয়। আরও উপযোগী component, variant, field type বা naming convention থাকলে যুক্তিসহ প্রস্তাব করা যাবে। Purpose, extensibility এবং consistency বজায় রেখে ভালো সিদ্ধান্ত নিতে হবে; উদাহরণকে অন্ধভাবে স্থির rule ধরা যাবে না। নতুন সুপারিশ ও স্থির principle আলাদা করে জানাতে হবে।

## নতুন প্রয়োজন থেকে pattern বের করার পদ্ধতি

এই guide অনুসরণকারীর কাজ শুধু উল্লেখ করা component-গুলো নকল করা নয়। প্রতিটি উদাহরণ থেকে সাধারণ প্রয়োজন বের করে তার কাছাকাছি গুরুত্বপূর্ণ use case-ও বিবেচনা করতে হবে।

1. **কাজটি চিহ্নিত করো:** consumer কী দেখাতে, বেছে নিতে, চালাতে, সম্পাদনা করতে বা navigate করতে চায়?

2. **Shape চিহ্নিত করো:** single value, homogeneous list, mixed typed items, tree, table, sequence, graph, নাকি free-form content?

3. **Interaction চিহ্নিত করো:** disclosure, selection, editing, navigation, command execution, async fetching বা drag/reorder আছে কি?

4. **বিভাজন করো:** নতুন family দরকার, নাকি existing family-র composition variant, visual design, state prop বা integration adapter যথেষ্ট?

5. **Reuse যাচাই করো:** সরাসরি existing design/component reuse করা পরিষ্কার হলে সেটাই করো। নতুন generic core বানানো automatic প্রথম ধাপ নয়।

6. **সম্পর্কিত সুযোগ খুঁজে বের করো:** ব্যবহারকারীর উদাহরণ ছাড়াও একই principle কোন কাজে প্রযোজ্য এবং কোথায় নয়, দুটোই বিবেচনা করো।

7. **প্রস্তাব ব্যাখ্যা করো:** নতুন naming, family বা abstraction-এর সুবিধা, খরচ এবং compatibility impact সংক্ষেপে জানাও। নামগুলো বাড়ানোই অগ্রগতি নয়।

8. **ছোট consumer example দিয়ে যাচাই করো:** সাধারণ ব্যবহার data/config দিয়েই হয় কি, native/advanced props হারায় কি, আর extension করলে API ভাঙে কি না দেখো।

কথা থেকে principle নেওয়ার অর্থ অনুমতি ছাড়া repository refactor বা নতুন features implement করা নয়। এই guide-এর বিস্তার architecture proposal; implementation আলাদা অনুমোদিত কাজ।
