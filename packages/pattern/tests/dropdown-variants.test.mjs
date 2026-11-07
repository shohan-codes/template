import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import {
  IconDropdown,
  iconDropdownSlots,
} from "../dist/dropdown/variants/icon-dropdown.js"
import {
  SplitDropdown,
  splitDropdownSlots,
} from "../dist/dropdown/variants/split-dropdown.js"
import * as family from "../dist/dropdown/index.js"
import * as root from "../dist/index.js"

const items = [{ id: "save", type: "action", label: "Save draft" }]
const primaryAction = { label: "Send message" }

test("variants are available from direct, family and package entrypoints", () => {
  assert.equal(family.IconDropdown, IconDropdown)
  assert.equal(root.SplitDropdown, SplitDropdown)
  assert.equal(family.iconDropdownSlots, iconDropdownSlots)
  assert.equal(root.splitDropdownSlots, splitDropdownSlots)
})

test("icon variant supplies a single named non-submit overflow button", () => {
  const markup = renderToStaticMarkup(
    h(IconDropdown, { label: "More project actions", items })
  )
  assert.equal((markup.match(/<button/g) ?? []).length, 1)
  assert.match(markup, /aria-label="More project actions"/)
  assert.match(markup, /aria-haspopup="menu"/)
  assert.match(markup, /type="button"/)
  assert.match(markup, /data-size="icon"/)
  assert.match(markup, /aria-hidden="true"/)
  assert.doesNotMatch(markup, /chevron-down/)
})

test("icon variant forwards native props, custom icon and disabled state", () => {
  const markup = renderToStaticMarkup(
    h(IconDropdown, {
      label: "Actions",
      items,
      icon: h("span", { "data-custom-icon": true }, "!"),
      $trigger: { disabled: true, title: "Project actions" },
    })
  )
  assert.match(markup, /disabled=""/)
  assert.match(markup, /title="Project actions"/)
  assert.match(markup, /data-custom-icon="true"/)
  assert.equal(
    renderToStaticMarkup(h(IconDropdown, { label: "Actions", items: [] })),
    ""
  )
})

test("split variant provides independent primary and named secondary buttons", () => {
  const markup = renderToStaticMarkup(
    h(SplitDropdown, {
      items,
      primaryAction: { ...primaryAction, disabled: true },
      menuLabel: "More sending options",
      $container: { "aria-label": "Message delivery" },
    })
  )
  assert.equal((markup.match(/<button/g) ?? []).length, 2)
  assert.equal((markup.match(/type="button"/g) ?? []).length, 2)
  assert.match(markup, /role="group" aria-label="Message delivery"/)
  assert.match(markup, /aria-label="More sending options"/)
  assert.equal((markup.match(/disabled=""/g) ?? []).length, 1)
  const empty = renderToStaticMarkup(
    h(SplitDropdown, { items: [], primaryAction, menuLabel: "More" })
  )
  assert.equal((empty.match(/<button/g) ?? []).length, 1)
  assert.match(empty, /Send message/)
})

test("split slots preserve independent callbacks, controlled state and customization", () => {
  const seen = []
  const record = (name) => (props) => {
    seen.push({ name, props })
    return h("div", null, props.children)
  }
  const onClick = () => {}
  const onOpenChange = () => {}
  const onSelect = () => {}
  renderToStaticMarkup(
    h(SplitDropdown, {
      items: [{ ...items[0], onSelect }],
      primaryAction: { ...primaryAction, onClick },
      menuLabel: "More",
      open: true,
      onOpenChange,
      $content: { align: "end" },
      $trigger: { disabled: true },
      slots: {
        Container: record("Container"),
        PrimaryAction: record("Primary"),
        Root: record("Root"),
        Trigger: record("Trigger"),
        Content: record("Content"),
        Item: record("Item"),
      },
    })
  )
  assert.equal(
    seen.find(({ name }) => name === "Primary").props.onClick,
    onClick
  )
  assert.equal(seen.find(({ name }) => name === "Primary").props.type, "button")
  assert.equal(seen.find(({ name }) => name === "Trigger").props.disabled, true)
  assert.equal(seen.find(({ name }) => name === "Root").props.open, true)
  assert.equal(
    seen.find(({ name }) => name === "Root").props.onOpenChange,
    onOpenChange
  )
  assert.equal(seen.find(({ name }) => name === "Content").props.align, "end")
  assert.equal(
    seen.find(({ name }) => name === "Item").props.onSelect,
    onSelect
  )
})

test("dropdown catalog lists separately importable default, icon and split variants", async () => {
  const { showcaseFamilies } =
    await import("../../../apps/showcase/lib/showcase-registry.ts")
  const { variants } = showcaseFamilies.find(
    (family) => family.id === "dropdown"
  )
  assert.deepEqual(
    variants.map(({ id }) => id),
    ["default", "icon", "split"]
  )
  assert.deepEqual(variants[1].exampleIds, ["icon-dropdown"])
  assert.deepEqual(variants[2].exampleIds, ["split-dropdown"])
})
