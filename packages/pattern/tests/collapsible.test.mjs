import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { Collapsible, CollapsibleCore, defaultCollapsibleSlots } from "../dist/collapsible/index.js"

const render = (props = {}) => renderToStaticMarkup(h(Collapsible, { trigger: "Details", ...props }, "Disclosure body"))
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
  const Trigger = (props) => h("button", { ...props, "data-custom-trigger": "true" })
  const markup = renderToStaticMarkup(h(CollapsibleCore, { defaultSlots: defaultCollapsibleSlots, slots: { Trigger }, open: true, trigger: "Custom details", $content: { className: "custom-content" } }, "Custom body"))
  assert.match(markup, /data-custom-trigger="true"/)
  assert.match(markup, /custom-content/)
  assert.match(markup, /Custom body/)
})
