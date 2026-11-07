import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { Dropdown, DropdownCore } from "../dist/dropdown/index.js"

const action = { id: "copy", type: "action", label: "Copy" }

test("default menu supplies a styled non-submit trigger from text and data", () => {
  const markup = renderToStaticMarkup(
    h(Dropdown, { trigger: "Actions", items: [action] })
  )
  assert.match(markup, /type="button"/)
  assert.match(markup, /aria-haspopup="menu"/)
  assert.match(markup, /aria-expanded="false"/)
  assert.match(markup, /data-variant="outline"/)
  assert.match(markup, /Actions/)
})

test("empty menus render nothing and custom triggers remain a single button", () => {
  assert.equal(
    renderToStaticMarkup(h(Dropdown, { trigger: "Actions", items: [] })),
    ""
  )
  const markup = renderToStaticMarkup(
    h(Dropdown, {
      trigger: h("button", { type: "button", "data-custom": true }, "Custom"),
      items: [action],
      $trigger: { asChild: true, disabled: true },
    })
  )
  assert.equal((markup.match(/<button/g) ?? []).length, 1)
  assert.match(markup, /disabled=""/)
  assert.match(markup, /data-custom="true"/)
})

test("recursive data maps to distinct slots, state, handlers and runtime overrides", () => {
  const seen = []
  const record = (name) => (props) => {
    seen.push({ name, props })
    return h("div", { "data-test-slot": name }, props.children)
  }
  const names = [
    "Root",
    "Trigger",
    "Content",
    "Item",
    "Label",
    "Separator",
    "Group",
    "Shortcut",
    "CheckboxItem",
    "RadioGroup",
    "RadioItem",
    "Sub",
    "SubTrigger",
    "SubContent",
    "Portal",
  ]
  const defaultSlots = Object.fromEntries(
    names.map((name) => [name, record(name)])
  )
  const onSelect = () => {}
  const onCheckedChange = () => {}
  const onValueChange = () => {}
  const items = [
    { id: "label", type: "label", label: "Project" },
    {
      id: "group",
      type: "group",
      label: "Actions",
      items: [
        {
          ...action,
          disabled: true,
          variant: "destructive",
          shortcut: "⌘C",
          icon: h("svg", { "aria-hidden": true }),
          textValue: "Copy",
          onSelect,
        },
        {
          id: "more",
          type: "submenu",
          label: "More",
          items: [
            { id: "nested", type: "submenu", label: "Nested", items: [action] },
          ],
        },
      ],
    },
    { id: "separator", type: "separator" },
    {
      id: "checked",
      type: "checkbox",
      label: "Visible",
      checked: "indeterminate",
      onCheckedChange,
    },
    {
      id: "radios",
      type: "radio-group",
      label: "Layout",
      value: "grid",
      onValueChange,
      items: [
        { id: "grid", value: "grid", label: "Grid" },
        { id: "list", value: "list", label: "List", disabled: true },
      ],
    },
  ]
  const markup = renderToStaticMarkup(
    h(DropdownCore, {
      defaultSlots,
      slots: { Item: record("CustomItem") },
      trigger: "Actions",
      items,
      open: true,
      $content: { align: "end" },
      $subContent: { sideOffset: 12 },
    })
  )
  assert.match(markup, /data-test-slot="CustomItem"/)
  assert.equal(seen.filter(({ name }) => name === "Sub").length, 2)
  assert.equal(seen.filter(({ name }) => name === "Portal").length, 2)
  assert.equal(seen.find(({ name }) => name === "Root").props.open, true)
  assert.equal(seen.find(({ name }) => name === "Content").props.align, "end")
  assert.equal(
    seen.find(({ name }) => name === "SubContent").props.sideOffset,
    12
  )
  const item = seen.find(({ name }) => name === "CustomItem").props
  assert.equal(item.onSelect, onSelect)
  assert.equal(item.disabled, true)
  assert.equal(item.variant, "destructive")
  assert.equal(item.textValue, "Copy")
  const checkbox = seen.find(({ name }) => name === "CheckboxItem").props
  assert.equal(checkbox.checked, "indeterminate")
  assert.equal(checkbox.onCheckedChange, onCheckedChange)
  const radio = seen.find(({ name }) => name === "RadioGroup").props
  assert.equal(radio.value, "grid")
  assert.equal(radio.onValueChange, onValueChange)
  assert.equal(radio["aria-label"], "Layout")
  assert.equal(
    seen.filter(({ name }) => name === "RadioItem")[1].props.disabled,
    true
  )
})
