import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import {
  ActionsContextMenu,
  actionsContextMenuSlots,
} from "../dist/context-menu/variants/actions-context-menu.js"
import {
  SelectionContextMenu,
  selectionContextMenuSlots,
} from "../dist/context-menu/variants/selection-context-menu.js"
import * as family from "../dist/context-menu/index.js"

const items = [{ id: "open", type: "action", label: "Open file" }]
const multipleItems = [
  { id: "archive", type: "action", label: "Archive files" },
]
const base = { items, trigger: "File" }
const record = (seen, name) => (props) => {
  seen.push({ name, props })
  return h("div", null, props.children)
}
const fakeSlots = (seen) =>
  Object.fromEntries(
    ["Root", "Trigger", "Content", "Label", "Separator", "Group", "Item"].map(
      (name) => [name, record(seen, name)]
    )
  )

test("both context variants have family and direct entrypoints and distinct defaults", () => {
  assert.equal(family.ActionsContextMenu, ActionsContextMenu)
  assert.equal(family.SelectionContextMenu, SelectionContextMenu)
  assert.ok(actionsContextMenuSlots.ActionMenu)
  assert.ok(selectionContextMenuSlots.Trigger)
})

test("actions variant adds a named non-submit button beside the keyboard-accessible surface", () => {
  const markup = renderToStaticMarkup(
    h(ActionsContextMenu, { ...base, menuLabel: "File actions" })
  )
  assert.match(markup, /tabindex="0"/)
  assert.match(markup, /Shift\+F10/)
  assert.match(markup, /type="button"/)
  assert.match(markup, /File actions/)
  assert.equal((markup.match(/aria-haspopup="menu"/g) ?? []).length, 2)
  const disabled = renderToStaticMarkup(
    h(ActionsContextMenu, {
      ...base,
      menuLabel: "File actions",
      $trigger: { disabled: true },
    })
  )
  assert.match(disabled, /aria-disabled="true"/)
  assert.match(disabled, /tabindex="-1"/)
  assert.match(disabled, /<button[^>]*disabled=""/)
  assert.equal(
    renderToStaticMarkup(
      h(ActionsContextMenu, { ...base, items: [], menuLabel: "Actions" })
    ),
    ""
  )
})

test("actions variant shares exact item objects and forwards separate menu customization", () => {
  const seen = []
  const onSelect = () => {}
  const data = [{ ...items[0], onSelect }]
  renderToStaticMarkup(
    h(ActionsContextMenu, {
      ...base,
      items: data,
      menuLabel: "File actions",
      slots: {
        ...fakeSlots(seen),
        Container: record(seen, "Container"),
        ActionMenu: record(seen, "ActionMenu"),
      },
      $container: { id: "surface" },
      $actionMenu: { open: true, $content: { align: "end" } },
      onOpenChange: () => {},
    })
  )
  const actionMenu = seen.find((x) => x.name === "ActionMenu").props
  assert.equal(actionMenu.items, data)
  assert.equal(actionMenu.trigger, "File actions")
  assert.equal(
    seen.find((x) => x.name === "Content").props["aria-label"],
    "File actions"
  )
  assert.equal(actionMenu.open, true)
  assert.equal(actionMenu.$content.align, "end")
  assert.equal(actionMenu.$trigger.asChild, false)
  assert.equal(seen.find((x) => x.name === "Item").props.onSelect, onSelect)
  assert.equal(seen.find((x) => x.name === "Container").props.id, "surface")
})

test("selection variant chooses single versus bulk data and deduplicates IDs", () => {
  for (const [selectedIds, label, action] of [
    [["a"], "1 item selected", "Open file"],
    [["a", "a"], "1 item selected", "Open file"],
    [["a", "b"], "2 items selected", "Archive files"],
  ]) {
    const seen = []
    const markup = renderToStaticMarkup(
      h(SelectionContextMenu, {
        ...base,
        multipleItems,
        selectedIds,
        slots: fakeSlots(seen),
      })
    )
    assert.match(markup, new RegExp(label))
    assert.equal(
      seen.find((x) => x.name === "Content").props["aria-label"],
      label
    )
    assert.equal(
      seen.find((x) => x.name === "Item").props.children[1].props.children,
      action
    )
    assert.equal(
      seen.find((x) => x.name === "Group").props["aria-label"],
      "Selection actions"
    )
  }
})

test("selection variant has explicit empty behavior and supports optional empty actions", () => {
  assert.equal(
    renderToStaticMarkup(
      h(SelectionContextMenu, { ...base, multipleItems, selectedIds: [] })
    ),
    ""
  )
  assert.equal(
    renderToStaticMarkup(
      h(SelectionContextMenu, {
        ...base,
        multipleItems: [],
        selectedIds: ["a", "b"],
      })
    ),
    ""
  )
  const seen = []
  const markup = renderToStaticMarkup(
    h(SelectionContextMenu, {
      ...base,
      multipleItems,
      selectedIds: [],
      emptyItems: [{ id: "new", type: "action", label: "New file" }],
      slots: fakeSlots(seen),
      selectionLabel: (count) => `${count} chosen files`,
    })
  )
  assert.match(markup, /0 chosen files/)
  assert.match(markup, /New file/)
})

test("selection custom triggers remain a single focusable child and native props survive", () => {
  const markup = renderToStaticMarkup(
    h(SelectionContextMenu, {
      ...base,
      multipleItems,
      selectedIds: ["a"],
      trigger: h("button", { type: "button" }, "Selected file"),
      $trigger: { asChild: true, "aria-label": "File selection" },
    })
  )
  assert.equal((markup.match(/<button/g) ?? []).length, 1)
  assert.match(markup, /aria-label="File selection"/)
  assert.match(markup, /Selected file/)
  assert.doesNotMatch(markup, /1 item selected/)
})

test("context catalog has separately importable default, actions and selection variants", async () => {
  const { showcaseFamilies } =
    await import("../../../apps/showcase/lib/showcase-registry.ts")
  const { variants } = showcaseFamilies.find((x) => x.id === "context-menu")
  assert.deepEqual(
    variants.map((x) => x.id),
    ["default", "actions", "selection"]
  )
  assert.deepEqual(variants[1].exampleIds, ["actions-context-menu"])
  assert.deepEqual(variants[2].exampleIds, ["selection-context-menu"])
})
