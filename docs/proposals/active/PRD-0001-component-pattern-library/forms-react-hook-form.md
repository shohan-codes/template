# Forms and React Hook Form

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

একই dynamic field UI-এর plain ও React Hook Form integration variant; typed field props, renderer registration এবং thin wrapper reuse।

এখানে স্থির principle ও প্রস্তাবিত উদাহরণ আলাদা করে চিহ্নিত। এগুলো architecture নির্দেশনা; নতুন system implement হয়েছে এমন দাবি নয়।

## Dynamic form field

দুটি integration variant থাকবে, দুটিতে একই field UI ও type-based rendering reuse হবে:

1. **Plain variant:** form-library-agnostic React component। Consumer প্রয়োজন অনুযায়ী value, change, blur, error ও অন্যান্য props দেবে।

2. **React Hook Form variant:** plain/core field-এর ওপর পাতলা wrapper। Provider/context ও একটি internal hook/adapter দিয়ে integration হবে; consumer-কে প্রতিটি field-এর জন্য আলাদা Controller composition লিখতে হবে না। প্রয়োজনীয় `name` ও form context লাগবে।

`type` অনুযায়ী field render ও props বদলাবে। উদাহরণ: text, number, select, combobox; এই তালিকা বন্ধ নয়।

- Discriminated union বা typed field map থেকে union তৈরি হবে। `type: "text"`-এ text-specific props, `type: "combobox"`-এ তার items/value/selection props থাকবে।

- নতুন field যোগ করতে type contract ও renderer/slot registration দুটোই extend করতে হবে; runtime rendering এবং TypeScript contract একসঙ্গে মিলবে।

- সাধারণ label, description, error এবং accessibility wiring reuse করা যাবে। Field-specific native props হারানো যাবে না।

- RHF wrapper UI আবার লিখবে না। Field ভেদে value/event/ref adaptation করবে, যেমন checkbox, number বা combobox-এর আলাদা semantics। Hook execution React-এর নিয়ম মেনে হবে।

- Consumer-এর কাছে RHF-এর অপ্রয়োজনীয় implementation detail লুকানো যাবে; plain variant-কে RHF-এর ওপর নির্ভরশীল করা যাবে না।
