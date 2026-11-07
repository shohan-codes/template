# Purpose and Philosophy

Status: Proposed implementation guidance. This document does not describe features already shipped.

[Proposal overview](README.md) · [Specification](spec.md)

Why this library exists, what it should achieve, what is outside its scope, and how to derive general principles from examples.

Agreed principles and proposed examples are identified separately. These are architecture instructions, not claims that the new system has been implemented.

## Purpose and philosophy

Ready-made UI should be quick to use and remain extensible when requirements grow beyond the library's defaults. Keep ordinary usage simple without blocking advanced usage. Reuse composition and interaction where useful instead of writing them repeatedly, but do not sacrifice design freedom for an overly generic abstraction.

## Goals

- Obtain functional, usable UI by importing a component and supplying data/configuration.

- Make families, composition variants, and visual designs easy to discover in a large catalog.

- Preserve separate design imports, typed APIs, native props, and slot-based customization.

- Allow new components to be built by wrapping existing components.

- Maintain meaningful API consistency to reduce the learning cost of similar components.

- Make visual quality, behavior, accessibility, type safety, and bundle impact verifiable.

## Non-goals

- Force every component into a universal layout, identical props, or identical interactions.

- Load every design through a giant component with a design switch.

- Move all reusable code into generic shared/core modules before allowing reuse.

- Put business UI or project-specific logic in the shadcn primitives package.

- Make the plain field depend on React Hook Form.

- Treat a numbered design as a version upgrade or replacement for an earlier design.

- Treat a written architecture proposal as implemented code.

## How to use this guide

This is a SKILL.md-style architecture guide for creating new patterns, extending existing patterns, reviewing APIs, and reviewing designs. It is not an installed executable skill.

Before starting, identify the family, variant/composition, and design. Check whether an existing component can be reused directly. Then define typed data contracts, slots, and public props before implementing and verifying the result. When a decision changes, update the relevant rule rather than leaving contradictory old and new instructions side by side.

**Agreed direction:** The hierarchy, reuse, slots, extensible props, integration variants, and type-driven configuration described in this guide.

**Examples and names remain open:** The component/type lists, names, and tree entries discussed are illustrative, not exhaustive or final boundaries. Propose additional components, variants, field types, or better naming conventions with reasons. Exercise judgment while preserving purpose, extensibility, and consistency; do not blindly turn examples into fixed rules. Clearly distinguish new recommendations from agreed principles.

## Deriving patterns from new requirements

Following this guide means more than copying the components already mentioned. Derive the general need behind each example and consider important related use cases.

1. **Identify the task:** What does the consumer need to display, select, execute, edit, or navigate?

2. **Identify the shape:** Is it a single value, homogeneous list, mixed typed items, tree, table, sequence, graph, or free-form content?

3. **Identify the interaction:** Does it involve disclosure, selection, editing, navigation, command execution, asynchronous fetching, or drag/reorder?

4. **Separate the concerns:** Does it require a new family, or would an existing family's composition variant, visual design, state prop, or integration adapter suffice?

5. **Check reuse:** Reuse an existing design/component directly when that is clear. Creating a new generic core is not automatically the first step.

6. **Find related opportunities:** Consider where the same principle applies beyond the user's examples and where it does not.

7. **Explain the proposal:** Briefly state the benefits, costs, and compatibility impact of a new name, family, or abstraction. Adding names alone is not progress.

8. **Verify with a small consumer example:** Check whether ordinary use needs only data/config, whether native/advanced props remain available, and whether extension breaks the API.

Deriving principles from a discussion does not authorize repository refactoring or new feature implementation. The broader scope of this guide is an architecture proposal; implementation remains a separately authorized task.
