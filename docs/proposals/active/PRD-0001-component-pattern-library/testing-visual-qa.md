# Testing and Visual QA

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

বানানোই শেষ নয়। Functional, manual, responsive, visual ও accessibility checks শেষে actual ফলাফল ও বাকি blockers জানানোই completion-এর শর্ত।

এখানে স্থির principle ও প্রস্তাবিত উদাহরণ আলাদা করে চিহ্নিত। এগুলো architecture নির্দেশনা; নতুন system implement হয়েছে এমন দাবি নয়।

## সম্পন্ন হওয়ার শর্ত এবং যাচাই

**বানানোই শেষ নয়।** Component সম্পন্ন বলার আগে তার প্রযোজ্য automated tests, manual browser interaction, visual review এবং responsive checks করতে হবে। কোনো check চালানো না গেলে কাজের সেই অংশ অসম্পূর্ণ বা blocked হিসেবে জানাতে হবে; অনুমান করে pass বলা যাবে না।

- **Code ও package:** Typecheck, lint, built package import resolution এবং প্রযোজ্য production build চালাও। Source alias-এর বাইরে বাস্তব consumer import যাচাই করো।

- **Functional tests:** Data/config-only usage, controlled/uncontrolled state, callbacks, wrapper extension, native props এবং slot overrides যাচাই করো। Component অনুযায়ী unit, interaction বা integration tests ব্যবহার করো।

- **Manual interaction ও accessibility:** Browser-এ keyboard, focus order/return, labels, semantic roles, disabled/loading/error/empty states এবং প্রাসঙ্গিক pointer/touch interactions পরীক্ষা করো। Automated accessibility checks যেখানে পাওয়া যায় ব্যবহার করো; সেগুলো manual review-এর বিকল্প নয়।

- **Responsiveness ও visual review:** Small/mobile, medium/tablet এবং large/desktop viewport-এ পরীক্ষা করো। Overflow, clipping, wrapping, spacing, focus visibility, দীর্ঘ content ও edge-case data দেখো; সমর্থিত light/dark theme-ও যাচাই করো।

- **Bundle:** এক design import করলে কোন dependencies bundle-এ যাচ্ছে যাচাই করো; export ও CSS side effects-ও দেখো। অপ্রয়োজনীয় design বাদ যাচ্ছে কি না মেপে বলো।

- **Regression:** Base design বদলালে dependent designs-ও পরীক্ষা করো। Visual regression ব্যবহার করলে review করা baseline-এর বিরুদ্ধে তুলনা করো; failing screenshot অন্ধভাবে নতুন baseline হিসেবে গ্রহণ করো না।

Preview এবং representative screenshots দিয়ে কী পরীক্ষা হয়েছে তা reviewযোগ্য করো। সম্পন্ন রিপোর্টে checks-এর actual result, tested viewport/state, remaining warnings, defects এবং blockers আলাদা থাকবে। কোনো screenshot বা automated test পাস করলেই design সুন্দর হয়েছে দাবি করা যাবে না; hierarchy, readability, alignment, consistency ও প্রয়োজনীয় design reference-এর সঙ্গে বিচার করতে হবে।
