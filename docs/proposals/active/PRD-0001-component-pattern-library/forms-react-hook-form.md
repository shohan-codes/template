# Forms and React Hook Form

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Plain and React Hook Form integration variants for the same dynamic field UI, with typed field props, renderer registration, and thin-wrapper reuse.

Agreed principles and proposed examples are identified separately. These are architecture instructions, not claims that the new system has been implemented.

## Dynamic form field

Provide two integration variants that reuse the same field UI and type-driven rendering:

1. **Plain variant:** A form-library-agnostic React component. The consumer supplies value, change, blur, error, and other props as needed.

2. **React Hook Form variant:** A thin wrapper around the plain/core field. Integrate through provider/context and an internal hook/adapter so consumers do not have to write a separate Controller composition for every field. The required `name` and form context are still needed.

Field rendering and props vary by `type`. Examples include text, number, select, and combobox; this list remains open.

- Define a discriminated union or derive a union from a typed field map. `type: "text"` exposes text-specific props, while `type: "combobox"` exposes its items/value/selection props.

- Adding a field requires extending both the type contract and renderer/slot registration. Runtime rendering and the TypeScript contract must stay aligned.

- Reuse common label, description, error, and accessibility wiring. Preserve field-specific native props.

- The RHF wrapper must not rewrite the UI. Adapt values/events/refs per field, accounting for distinct semantics such as checkbox, number, and combobox. Hook execution must follow React's rules.

- Hide unnecessary RHF implementation details from consumers, but do not make the plain variant depend on RHF.
