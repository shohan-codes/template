import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import {
  Tabs,
  SegmentedTabs,
  FolderTabs,
  TabsCore,
  defaultTabsSlots,
  getTabId,
} from "../dist/tabs/index.js"

const items = [
  { id: "overview", type: "tab", label: "Overview", content: "Overview panel" },
  { id: "details", type: "tab", label: "Details", content: "Details panel" },
  {
    id: "locked",
    type: "tab",
    label: "Locked",
    content: "Locked panel",
    disabled: true,
  },
]
const designs = [
  ["default", Tabs, {}],
  ["line", Tabs, { variant: "line" }],
  ["segmented", SegmentedTabs, { pill: false, fullWidth: true }],
  ["enclosed folder", FolderTabs, {}],
  ["floating folder", FolderTabs, { variant: "floating" }],
]
const render = (props, Component = Tabs) =>
  renderToStaticMarkup(h(Component, props))
const activeTab = (html) =>
  html.match(
    /<button[^>]*aria-selected="true"[^>]*>.*?<span>(.*?)<\/span>/
  )?.[1]

for (const [name, Component, props] of designs) {
  test(`${name}: strict items preserve tab/panel roles, labels and disabled state`, () => {
    const html = render(
      {
        ...props,
        mode: "typed",
        items,
        $list: { "aria-label": "Project views" },
      },
      Component
    )
    assert.equal(activeTab(html), "Overview")
    assert.equal((html.match(/role="tab"/g) ?? []).length, 3)
    assert.equal((html.match(/role="tabpanel"/g) ?? []).length, 3)
    assert.match(html, /role="tablist"[^>]*aria-label="Project views"/)
    assert.match(html, /disabled=""/)
    assert.doesNotMatch(html, /<a\b|href=/)
    const triggerId = html.match(/<button[^>]*id="([^"]+)"/)[1]
    const panelId = html.match(/<button[^>]*aria-controls="([^"]+)"/)[1]
    assert.ok(html.includes(`id="${panelId}"`))
    assert.ok(html.includes(`aria-labelledby="${triggerId}"`))
  })
  test(`${name}: vertical mode reaches the primitive keyboard and ARIA context`, () => {
    const html = render(
      { ...props, mode: "typed", items, orientation: "vertical" },
      Component
    )
    assert.match(html, /aria-orientation="vertical"/)
    assert.doesNotMatch(html, /data-orientation="horizontal"/)
  })
  test(`${name}: legacy query/hash links and router slot props still work`, () => {
    const Link = ({ scroll, children, ...linkProps }) =>
      h("a", { ...linkProps, "data-router-scroll": String(scroll) }, children)
    const legacy = [
      {
        id: "overview",
        label: "Overview",
        href: "?tab=overview",
        content: "Query panel",
      },
      {
        id: "details",
        label: "Details",
        href: "#details",
        content: "Hash panel",
      },
    ]
    const html = render(
      {
        ...props,
        items: legacy,
        value: "details",
        slots: { Link },
        $link: { scroll: false },
      },
      Component
    )
    assert.match(html, /<a[^>]*href="\?tab=overview"/)
    assert.match(html, /<a[^>]*href="#details"/)
    assert.match(html, /data-router-scroll="false"/)
    assert.match(
      html,
      /<a[^>]*aria-selected="true"[^>]*>.*?<span>Details<\/span>/
    )
    assert.match(html, /Hash panel/)
    assert.doesNotMatch(html, /Query panel/)
  })
}

test("an explicitly undefined default-slot override retains each design", () => {
  for (const [, Component, props] of designs) {
    assert.equal(
      activeTab(
        render(
          { ...props, mode: "typed", items, defaultSlots: undefined },
          Component
        )
      ),
      "Overview"
    )
  }
})

test("legacy identifier derivation remains compatible", () => {
  assert.equal(
    getTabId({ id: "id", value: "value", href: "/url", label: "Label" }),
    "id"
  )
  assert.equal(
    getTabId({ value: "value", href: "/url", label: "Label" }),
    "value"
  )
  assert.equal(getTabId({ href: "/url", label: "Label" }), "/url")
  assert.equal(getTabId({ label: "  General Settings!  " }), "general-settings")
  assert.equal(getTabId({ label: h("span", null, "Node") }, 4), "4")
  assert.equal(getTabId({ label: "?!" }, 2), "2")
})

test("legacy null, missing and invalid URL selection keep the original default rules", () => {
  const legacy = items.map(({ id, label, content, disabled }) => ({
    id,
    label,
    content,
    disabled,
  }))
  for (const value of [undefined, null, "", "missing"]) {
    assert.equal(
      activeTab(render({ items: legacy, value, defaultValue: "details" })),
      "Details"
    )
  }
  assert.equal(
    activeTab(
      render({ items: legacy, value: "overview", defaultValue: "details" })
    ),
    "Overview"
  )
  // This intentionally preserves the old disabled-default behavior only in legacy mode.
  assert.equal(
    activeTab(render({ items: legacy, defaultValue: "locked" })),
    "Locked"
  )
})

test("strict selection supports controlled and uncontrolled defaults with enabled fallbacks", () => {
  for (const value of [undefined, null, "", "missing", "locked"]) {
    assert.equal(
      activeTab(
        render({ mode: "typed", items, value, defaultValue: "details" })
      ),
      "Details"
    )
  }
  assert.equal(
    activeTab(
      render({
        mode: "typed",
        items,
        value: "overview",
        defaultValue: "details",
      })
    ),
    "Overview"
  )
  assert.equal(
    activeTab(render({ mode: "typed", items, defaultValue: "locked" })),
    "Overview"
  )
  assert.equal(
    activeTab(render({ mode: "typed", items: [items[2], items[1], items[0]] })),
    "Details"
  )
  assert.equal(
    activeTab(render({ mode: "typed", items: [items[2]] })),
    undefined
  )
  assert.equal(render({ mode: "typed", items: [] }), "")
  assert.equal(render({ items: [] }), "")
})

test("strict IDs, not translated labels or array positions, drive selection", () => {
  const renamed = [
    { ...items[1], label: "Changed details" },
    { ...items[0], label: "Changed overview" },
  ]
  assert.equal(
    activeTab(render({ mode: "typed", items: renamed, value: "overview" })),
    "Changed overview"
  )
  assert.equal(
    activeTab(render({ mode: "typed", items: [items[1]], value: "overview" })),
    "Details"
  )
})

test("strict runtime slots preserve priority, actions, native props and ARIA", () => {
  const Trigger = (props) =>
    h(defaultTabsSlots.Trigger, { ...props, "data-custom": "runtime" })
  const DefaultTrigger = (props) =>
    h(defaultTabsSlots.Trigger, { ...props, "data-custom": "default" })
  const html = renderToStaticMarkup(
    h(TabsCore, {
      mode: "typed",
      items,
      title: "Project",
      orientation: "vertical",
      activationMode: "manual",
      defaultSlots: { ...defaultTabsSlots, Trigger: DefaultTrigger },
      slots: { Trigger },
      $list: { "aria-label": "Views" },
      $trigger: { title: "Select view" },
      actions: h("button", { type: "button" }, "Add view"),
    })
  )
  assert.match(html, /data-custom="runtime"/)
  assert.doesNotMatch(html, /data-custom="default"/)
  assert.match(html, /aria-orientation="vertical"/)
  assert.match(html, /title="Select view"/)
  assert.match(html, /data-slot="tabs-actions"/)
})

test("strict slot props cannot corrupt owned semantics even from untyped JavaScript", () => {
  const html = render({
    mode: "typed",
    items,
    $list: { role: "menu", asChild: true, children: "Wrong list" },
    $trigger: {
      value: "wrong",
      disabled: false,
      asChild: true,
      type: "submit",
      role: "link",
      id: "wrong-trigger",
      "aria-controls": "wrong-panel",
      "aria-selected": false,
      tabIndex: 99,
      children: "Wrong label",
    },
    $content: {
      value: "wrong",
      asChild: true,
      role: "main",
      id: "wrong-panel",
      "aria-labelledby": "wrong-trigger",
      children: "Wrong panel",
      dangerouslySetInnerHTML: { __html: "Wrong markup" },
    },
  })
  assert.equal(activeTab(html), "Overview")
  assert.match(html, /disabled=""/)
  assert.match(html, /type="button"/)
  assert.match(html, /role="tablist"/)
  assert.match(html, /Overview panel/)
  assert.doesNotMatch(
    html,
    /wrong-|Wrong |type="submit"|role="link"|role="menu"|tabindex="99"/
  )
})

test("strict selection callbacks reject disabled, missing and repeated values", () => {
  let rootProps
  const changes = []
  const Root = (props) => {
    rootProps = props
    return h(defaultTabsSlots.Root, props)
  }
  render({
    mode: "typed",
    items,
    value: "overview",
    slots: { Root },
    onValueChange: (value) => changes.push(value),
  })
  rootProps.onValueChange("locked")
  rootProps.onValueChange("missing")
  rootProps.onValueChange("overview")
  assert.deepEqual(changes, [])
  rootProps.onValueChange("details")
  assert.deepEqual(changes, ["details"])
  assert.equal(rootProps.value, "overview")
  render({
    mode: "typed",
    items,
    value: "details",
    slots: { Root },
    onValueChange: (value) => changes.push(value),
  })
  rootProps.onValueChange("details")
  assert.deepEqual(changes, ["details"])
})

test("legacy router changes retain the original callback and selection contract", () => {
  let rootProps
  const changes = []
  const Root = (props) => {
    rootProps = props
    return h(defaultTabsSlots.Root, props)
  }
  const legacy = [
    { id: "query", label: "Query", href: "?tab=query", content: "Query" },
    { id: "hash", label: "Hash", href: "#hash", content: "Hash" },
  ]
  const onValueChange = (value) => changes.push(value)
  render({ items: legacy, value: "query", slots: { Root }, onValueChange })
  assert.equal(rootProps.onValueChange, onValueChange)
  rootProps.onValueChange("hash")
  render({ items: legacy, value: "hash", slots: { Root }, onValueChange })
  assert.equal(rootProps.value, "hash")
  render({ items: legacy, value: "query", slots: { Root }, onValueChange })
  assert.equal(rootProps.value, "query")
  assert.deepEqual(changes, ["hash"])
})

test("null strict panel content still has an accessible panel relationship", () => {
  const html = render({
    mode: "typed",
    items: [{ ...items[0], content: null }],
  })
  assert.match(html, /role="tabpanel"/)
  assert.match(html, /aria-labelledby=/)
})

test("horizontal lists stay bounded and action headers can wrap", () => {
  for (const mode of ["typed", "legacy"]) {
    const data =
      mode === "typed"
        ? items
        : items.map(({ id, label, content }) => ({ id, label, content }))
    const html = render({
      mode,
      items: data,
      actions: h("button", { type: "button" }, "Action"),
    })
    assert.match(html, /max-w-full/)
    assert.match(html, /overflow-x-auto/)
    assert.match(html, /overflow-y-hidden/)
    assert.match(html, /flex-wrap/)
  }
})

test("supplied icons, labels and badges survive the primitive child boundary", () => {
  for (const [, Component, props] of designs) {
    const html = render(
      {
        ...props,
        mode: "typed",
        items: [
          {
            id: "visual",
            type: "tab",
            label: h("strong", null, "Visual label"),
            icon: h("span", { "aria-hidden": "true" }, "Icon"),
            badge: h("span", null, "Badge"),
            content: "Panel",
          },
        ],
      },
      Component
    )
    assert.match(html, /Icon/)
    assert.match(html, /<strong>Visual label<\/strong>/)
    assert.match(html, /Badge/)
  }
})
