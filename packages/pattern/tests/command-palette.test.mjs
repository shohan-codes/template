import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import {
  CommandPalette,
  CommandPaletteCore,
  CommandSearch,
  CommandSearchCore,
} from "../dist/command-palette/index.js"

const action = { id: "open", type: "action", label: "Open project" }
function recordingSlots(seen) {
  return Object.fromEntries(
    [
      "Root",
      "Input",
      "List",
      "Empty",
      "Item",
      "Group",
      "Separator",
      "Shortcut",
      "Dialog",
      "Trigger",
      "Content",
      "Title",
      "Description",
    ].map((name) => [
      name,
      (props) => {
        seen.push({ name, props })
        return h("div", { "data-test-slot": name }, props.children)
      },
    ])
  )
}
test("neutral palette supplies an accessible non-submit trigger", () => {
  const markup = renderToStaticMarkup(
    h(CommandPalette, { trigger: "Commands", items: [action] })
  )
  assert.match(markup, /type="button"/)
  assert.match(markup, /aria-haspopup="dialog"/)
  assert.match(markup, /aria-expanded="false"/)
  assert.match(markup, /data-variant="outline"/)
})
test("inline variant has a labeled combobox and no dialog or trigger", () => {
  const markup = renderToStaticMarkup(
    h(CommandSearch, { items: [], label: "Find resources" })
  )
  assert.match(markup, /role="combobox"/)
  assert.match(markup, /aria-label="Find resources"/)
  assert.doesNotMatch(markup, /role="dialog"|<button/)
})
test("readonly actions, groups and separators map to slots with protected data props", () => {
  const seen = []
  const selections = []
  const keywordList = Object.freeze(["home"])
  const defaults = recordingSlots(seen)
  renderToStaticMarkup(
    h(CommandSearchCore, {
      defaultSlots: defaults,
      slots: {
        Item: (props) => {
          seen.push({ name: "CustomItem", props })
          return h("div", null, props.children)
        },
      },
      items: Object.freeze([
        {
          id: "group",
          type: "group",
          label: "Navigation",
          items: Object.freeze([
            {
              ...action,
              keywords: keywordList,
              shortcut: "O",
              onSelect: (id) => selections.push(id),
            },
          ]),
        },
        { id: "divider", type: "separator" },
        {
          id: "blocked",
          type: "action",
          label: "Unavailable",
          disabled: true,
          onSelect: () => selections.push("blocked"),
        },
      ]),
      onAction: (item) => selections.push(item.label),
      query: "home",
      $list: { className: "list-props" },
      $item: { className: "item-props" },
    })
  )
  assert.equal(seen.find(({ name }) => name === "Input").props.value, "home")
  assert.equal(
    seen.find(({ name }) => name === "Group").props.heading,
    "Navigation"
  )
  assert.equal(
    seen.find(({ name }) => name === "List").props.className,
    "list-props"
  )
  assert.equal(seen.filter(({ name }) => name === "Separator").length, 1)
  const entries = seen.filter(({ name }) => name === "CustomItem")
  assert.equal(entries[0].props.value, "open")
  assert.equal(entries[0].props.className, "item-props")
  assert.deepEqual(entries[0].props.keywords, ["Open project", "home"])
  assert.notEqual(entries[0].props.keywords, keywordList)
  entries[0].props.onSelect("ignored")
  entries[1].props.onSelect("blocked")
  assert.deepEqual(selections, ["open", "Open project"])
})
test("palette owns title and description inside content and applies close policy", () => {
  for (const [rootPolicy, actionPolicy, closes] of [
    [true, undefined, true],
    [true, false, false],
    [false, undefined, false],
    [false, true, true],
  ]) {
    const seen = []
    const events = []
    const markup = renderToStaticMarkup(
      h(CommandPaletteCore, {
        defaultSlots: recordingSlots(seen),
        trigger: "Commands",
        title: "Workspace",
        description: "Search workspace",
        open: true,
        items: [
          {
            ...action,
            closeOnSelect: actionPolicy,
            onSelect: () => events.push("item"),
          },
        ],
        closeOnSelect: rootPolicy,
        onAction: () => events.push("root"),
        onOpenChange: (open) => events.push(open),
      })
    )
    assert.match(
      markup,
      /data-test-slot="Content"><div data-test-slot="Title">Workspace/
    )
    assert.match(markup, /data-test-slot="Description">Search workspace/)
    assert.equal(seen.find(({ name }) => name === "Dialog").props.open, true)
    seen.find(({ name }) => name === "Item").props.onSelect()
    assert.deepEqual(
      events,
      closes ? ["item", "root", false] : ["item", "root"]
    )
  }
})
test("defaultOpen and defaultQuery seed uncontrolled state and query change notifies", () => {
  const seen = [],
    queries = []
  renderToStaticMarkup(
    h(CommandPaletteCore, {
      defaultSlots: recordingSlots(seen),
      trigger: "Commands",
      items: [action],
      defaultOpen: true,
      defaultQuery: "project",
      onQueryChange: (value) => queries.push(value),
    })
  )
  assert.equal(seen.find(({ name }) => name === "Dialog").props.open, true)
  const input = seen.find(({ name }) => name === "Input").props
  assert.equal(input.value, "project")
  input.onValueChange("next")
  assert.deepEqual(queries, ["next"])
})
