# Data Tables

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

TanStack reference থেকে table mechanics, data/state ownership ও richer composition-এর ধারণা এবং যাচাই প্রয়োজন এমন সীমা।

এখানে স্থির principle ও প্রস্তাবিত উদাহরণ আলাদা করে চিহ্নিত। এগুলো architecture নির্দেশনা; নতুন system implement হয়েছে এমন দাবি নয়।

## TanStack Table থেকে নেওয়ার ধারণা

Reference project-এর DataTable ও RecordTable থেকে নেওয়ার উপযোগী ধারণা:

- Generic typed `data` ও `columns`, typed column metadata এবং stable row IDs।

- Client-owned state ও server-owned pagination/sorting স্পষ্টভাবে আলাদা। Fetching, URL state, permissions ও mutations consuming app-এর দায়িত্ব।

- Numbered এবং cursor pagination, controlled selection ও bulk actions।

- Toolbar ও empty-state injection; initial loading এবং background fetching-এর আলাদা UI।

- Base table-এর ওপর RecordTable-এর মতো richer composition বানানো যাবে; সবার জন্য সেটি বাধ্যতামূলক নয়।

Reference-এর `data-table.tsx` এখন behavior ও rendering একসঙ্গে রাখে; সরাসরি headless core ধরে কপি করা যাবে না। Virtualization, grouping, resizing/pinning ও editable cells পরবর্তী সম্ভাবনা, বর্তমান implementation-এ পাওয়া features নয়। `pageSize={false}` নিয়ে static review-এর সম্ভাব্য সমস্যা runtime test ছাড়া নিশ্চিত নয়।
