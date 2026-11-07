import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import {
  CardCollapsible,
  Collapsible,
  CollapsibleCore,
  defaultCollapsibleSlots,
} from "../dist/collapsible/index.js"

const render = (props = {}) =>
  renderToStaticMarkup(
    h(Collapsible, { trigger: "Details", ...props }, "Disclosure body")
  )
test("legacy content asChild preserves one custom element", () => {
  const markup = renderToStaticMarkup(
    h(
      Collapsible,
      {
        trigger: "Legacy content",
        open: true,
        $content: { asChild: true },
      },
      h("section", { "aria-label": "Details body" }, "Custom section")
    )
  )
  assert.match(markup, /<section[^>]*aria-label="Details body"/)
  assert.match(markup, /Custom section/)
})

test("data content asChild supplies one concrete wrapper instead of a fragment", () => {
  const markup = renderToStaticMarkup(
    h(Collapsible, {
      trigger: "Data content",
      open: true,
      $content: { asChild: true, "data-testid": "data-content" },
      items: [{ id: "body", type: "content", content: "Data body" }],
    })
  )
  assert.match(markup, /<div[^>]*data-testid="data-content"/)
  assert.match(markup, /Data body/)
})
test("default disclosure has a non-submit trigger and collapsed ARIA state", () => {
  const markup = render()
  assert.match(markup, /type="button"/)
  assert.match(markup, /aria-expanded="false"/)
  assert.doesNotMatch(markup, /Disclosure body/)
})
test("controlled open and disabled behavior reach Radix primitives", () => {
  const markup = render({ open: true, disabled: true })
  assert.match(markup, /aria-expanded="true"/)
  assert.match(markup, /disabled=""/)
  assert.match(markup, /Disclosure body/)
})
test("runtime slots override injected defaults without losing content", () => {
  const Trigger = (props) =>
    h("button", { ...props, "data-custom-trigger": "true" })
  const markup = renderToStaticMarkup(
    h(
      CollapsibleCore,
      {
        defaultSlots: defaultCollapsibleSlots,
        slots: { Trigger },
        open: true,
        trigger: "Custom details",
        $content: { className: "custom-content" },
      },
      "Custom body"
    )
  )
  assert.match(markup, /data-custom-trigger="true"/)
  assert.match(markup, /custom-content/)
  assert.match(markup, /Custom body/)
})

test("neutral default and explicit card variant share disclosure behavior", () => {
  const neutral = render({ open: true })
  const card = renderToStaticMarkup(
    h(CardCollapsible, { trigger: "Card", open: true }, "Card body")
  )
  assert.doesNotMatch(neutral, /bg-card|rounded-xl border/)
  assert.match(card, /rounded-xl border bg-card/)
  assert.match(card, /aria-expanded="true"/)
  assert.match(card, /Card body/)
})

test("recursive groups, separators, custom content and disclosures use content semantics", () => {
  const markup = renderToStaticMarkup(
    h(
      Collapsible,
      {
        trigger: "Root",
        open: true,
        items: [
          { id: "content", type: "content", content: "Introduction" },
          {
            id: "group",
            type: "group",
            label: "Group one",
            items: [
              {
                id: "group",
                type: "group",
                label: "Group two",
                items: [
                  { id: "separator", type: "separator" },
                  {
                    id: "custom",
                    type: "custom",
                    content: h("input", { "aria-label": "Name" }),
                  },
                  {
                    id: "nested",
                    type: "disclosure",
                    trigger: "Nested",
                    defaultOpen: true,
                    items: [
                      {
                        id: "nested",
                        type: "disclosure",
                        trigger: "Deep",
                        open: true,
                        items: [
                          { id: "body", type: "content", content: "Deep body" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      "Trailing JSX"
    )
  )
  assert.match(markup, /role="group" aria-label="Group one"/)
  assert.match(markup, /role="group" aria-label="Group two"/)
  assert.match(markup, /<hr[^>]*role="separator"/)
  assert.match(markup, /<input aria-label="Name"/)
  assert.match(markup, /Deep body/)
  assert.match(markup, /Trailing JSX/)
  assert.equal((markup.match(/aria-expanded="true"/g) ?? []).length, 3)
  assert.doesNotMatch(markup, /role="menu|role="tree|role="menuitem/)
})

test("existing three-slot defaults support items without new required slots", () => {
  const { Root, Trigger, Content } = defaultCollapsibleSlots
  const markup = renderToStaticMarkup(
    h(CollapsibleCore, {
      defaultSlots: { Root, Trigger, Content },
      open: true,
      trigger: "Legacy slots",
      items: [
        {
          id: "group",
          type: "group",
          label: "Fallback",
          items: [
            { id: "custom", type: "custom", content: "Custom text" },
            { id: "separator", type: "separator" },
            { id: "body", type: "content", content: "Plain content" },
          ],
        },
      ],
    })
  )
  assert.match(markup, /role="group" aria-label="Fallback"/)
  assert.match(markup, /Custom text/)
  assert.match(markup, /Plain content/)
})

test("resolved item and trigger slots propagate through nested disclosures", () => {
  const Item = ({ children }) =>
    h("article", { "data-custom-item": "true" }, children)
  const Trigger = (props) =>
    h(defaultCollapsibleSlots.Trigger, {
      ...props,
      "data-custom-trigger": "true",
    })
  const markup = renderToStaticMarkup(
    h(Collapsible, {
      open: true,
      trigger: "Root",
      slots: { Item, Trigger },
      $trigger: { id: "root-trigger" },
      items: [
        {
          id: "nested",
          type: "disclosure",
          trigger: "Nested",
          open: true,
          $trigger: { id: "nested-trigger" },
          $content: { "data-testid": "nested-content" },
          items: [{ id: "body", type: "content", content: "Nested body" }],
        },
      ],
    })
  )
  assert.equal((markup.match(/data-custom-trigger="true"/g) ?? []).length, 2)
  assert.equal((markup.match(/id="root-trigger"/g) ?? []).length, 1)
  assert.match(markup, /id="nested-trigger"/)
  assert.match(markup, /data-testid="nested-content"/)
  assert.match(
    markup,
    /<article data-custom-item="true">Nested body<\/article>/
  )
})

test("nested controlled state, callback and disabled state reach their own root", () => {
  const roots = []
  const changed = []
  const Root = (props) => {
    roots.push(props)
    return h(defaultCollapsibleSlots.Root, props)
  }
  const markup = renderToStaticMarkup(
    h(Collapsible, {
      open: true,
      trigger: "Parent",
      slots: { Root },
      items: [
        {
          id: "child",
          type: "disclosure",
          trigger: "Child",
          open: true,
          disabled: true,
          onOpenChange: (open) => changed.push(open),
          items: [{ id: "body", type: "content", content: "Controlled child" }],
        },
      ],
    })
  )
  assert.equal(roots.length, 2)
  assert.equal(roots[0].disabled, undefined)
  assert.equal(roots[1].disabled, true)
  assert.equal(roots[1].open, true)
  roots[1].onOpenChange(false)
  assert.deepEqual(changed, [false])
  assert.match(markup, /disabled=""/)
})

test("empty items remain a usable disclosure and asChild preserves a single custom button", () => {
  const markup = renderToStaticMarkup(
    h(Collapsible, {
      trigger: h("button", { type: "button" }, "Custom trigger"),
      $trigger: { asChild: true },
      items: [],
    })
  )
  assert.equal((markup.match(/<button/g) ?? []).length, 1)
  assert.match(markup, /aria-expanded="false"/)
})
