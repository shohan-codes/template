import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import {
  SidebarCore,
  Sidebar,
  FloatingSidebar,
  getActiveSidebarDisclosures,
  toggleSidebarDisclosure,
} from "../dist/sidebar/index.js"
import { SidebarProvider } from "@workspace/shadcn-ui/components/sidebar"

const link = (id, extra = {}) => ({
  type: "link",
  id,
  label: id,
  href: `/${id}`,
  ...extra,
})
const disclosure = (id, items, extra = {}) => ({
  type: "disclosure",
  id,
  label: id,
  items,
  ...extra,
})
const tree = [
  {
    type: "group",
    id: "section",
    label: "Section",
    items: [
      disclosure("outer", [
        disclosure("inner", [link("page")]),
        link("disabled", { disabled: true }),
      ]),
    ],
  },
]
function capture(props = {}, overrides = {}) {
  const seen = []
  const record = (name) =>
    function Slot(props) {
      seen.push({ name, props })
      return h("div", { "data-test-slot": name }, props.trigger, props.children)
    }
  const defaultSlots = Object.fromEntries(
    [
      "Root",
      "Header",
      "Content",
      "Footer",
      "Nav",
      "List",
      "Item",
      "Label",
      "ItemLabel",
      "Link",
      "Button",
      "Disclosure",
      "Separator",
      "Indicator",
    ].map((name) => [name, record(name)])
  )
  const markup = renderToStaticMarkup(
    h(SidebarCore, {
      defaultSlots,
      items: [],
      ...props,
      slots: Object.fromEntries(
        Object.entries(overrides).map(([slot, name]) => [slot, record(name)])
      ),
    })
  )
  return {
    markup,
    seen,
    all: (name) => seen.filter((x) => x.name === name).map((x) => x.props),
    one: (name) => seen.find((x) => x.name === name)?.props,
  }
}
function click(extra = {}) {
  return {
    nativeEvent: new Event("click", { cancelable: true }),
    defaultPrevented: false,
    button: 0,
    preventDefault() {
      this.defaultPrevented = true
    },
    ...extra,
  }
}

test("active model reveals only expandable ancestors and matches URLs exactly", () => {
  assert.deepEqual(getActiveSidebarDisclosures(tree, "/page"), [
    "inner",
    "outer",
  ])
  for (const href of [undefined, "/page-two", "/disabled"])
    assert.deepEqual(getActiveSidebarDisclosures(tree, href), [])
  assert.deepEqual(
    getActiveSidebarDisclosures(
      [disclosure("off", [link("page")], { disabled: true })],
      "/page"
    ),
    []
  )
})
test("expansion toggles are immutable and preserve other disclosures", () => {
  const ids = Object.freeze(["other"])
  assert.deepEqual(toggleSidebarDisclosure(ids, "target"), ["other", "target"])
  assert.deepEqual(toggleSidebarDisclosure(["other", "target"], "target"), [
    "other",
  ])
  assert.deepEqual(ids, ["other"])
})
test("groups are static labels; only disclosures own expansion and increase nesting", () => {
  const c = capture({ items: tree, activeHref: "/page" })
  assert.equal(c.all("Label").length, 1)
  assert.equal(c.all("Disclosure").length, 2)
  assert.deepEqual(
    c.all("List").map((p) => p.depth),
    [0, 0, 1, 2]
  )
  assert.ok(c.all("Disclosure").every((p) => p.open))
  assert.equal(
    c.all("Link").find((p) => p.href === "/page")["aria-current"],
    "page"
  )
})
test("uncontrolled initialization merges defaults and active ancestors; controlled IDs are authoritative", () => {
  const uncontrolled = capture({
    items: tree,
    activeHref: "/page",
    defaultExpandedIds: ["outer", "other"],
  })
  assert.deepEqual(
    uncontrolled.all("Disclosure").map((p) => p.open),
    [true, true]
  )
  const changes = []
  const controlled = capture({
    items: tree,
    activeHref: "/page",
    expandedIds: [],
    onExpandedChange: (ids) => changes.push(ids),
  })
  assert.deepEqual(
    controlled.all("Disclosure").map((p) => p.open),
    [false, false]
  )
  controlled.all("Disclosure")[0].onOpenChange(true)
  assert.deepEqual(changes, [["outer"]])
  assert.equal(controlled.all("Disclosure")[0].open, false)
})
test("uncontrolled change callback uses initialized expansion without mutating defaults", () => {
  const defaults = Object.freeze(["other"])
  const changes = []
  const c = capture({
    items: [disclosure("target", [])],
    defaultExpandedIds: defaults,
    onExpandedChange: (ids) => changes.push(ids),
  })
  c.one("Disclosure").onOpenChange(true)
  assert.deepEqual(changes, [["other", "target"]])
  assert.deepEqual(defaults, ["other"])
})
test("disabled links, actions and disclosures guard callbacks even with permissive custom slots", () => {
  let calls = 0
  const c = capture({
    items: [
      link("off", { disabled: true }),
      {
        type: "action",
        id: "action",
        label: "Action",
        disabled: true,
        onSelect: () => calls++,
      },
      disclosure("group", [], { disabled: true }),
    ],
    onNavigate: () => calls++,
    onExpandedChange: () => calls++,
    $link: { onClick: () => calls++ },
    $button: { onClick: () => calls++ },
  })
  const le = click(),
    be = click()
  c.one("Link").onClick(le)
  c.one("Button").onClick(be)
  c.one("Disclosure").onOpenChange(true)
  assert.equal(calls, 0)
  assert.ok(le.defaultPrevented && be.defaultPrevented)
  assert.equal(c.one("Link").href, undefined)
  assert.equal(c.one("Link").tabIndex, -1)
  assert.equal(c.one("Link")["aria-disabled"], true)
})
test("actions receive the native Event and honor the shared click cancellation", () => {
  const received = []
  const item = {
    type: "action",
    id: "action",
    label: "Action",
    onSelect: (event) => received.push(event),
  }
  const c = capture({ items: [item] })
  const event = click()
  c.one("Button").onClick(event)
  assert.equal(received[0], event.nativeEvent)
  assert.ok(received[0] instanceof Event)
  capture({ items: [item], $button: { onClick: (e) => e.preventDefault() } })
    .one("Button")
    .onClick(click())
  assert.equal(received.length, 1)
})
test("navigation runs only for uncancelled unmodified same-tab activation", () => {
  const calls = []
  const item = link("page")
  const c = capture({
    items: [item],
    onNavigate: (...args) => calls.push(args),
  })
  const event = click()
  c.one("Link").onClick(event)
  assert.deepEqual(calls, [[item, event]])
  for (const extra of [
    { button: 1 },
    { ctrlKey: true },
    { metaKey: true },
    { shiftKey: true },
    { altKey: true },
  ])
    c.one("Link").onClick(click(extra))
  capture({
    items: [link("external", { target: "_blank" })],
    onNavigate: () => calls.push("bad"),
  })
    .one("Link")
    .onClick(click())
  capture({
    items: [item],
    onNavigate: () => calls.push("bad"),
    $link: { onClick: (e) => e.preventDefault() },
  })
    .one("Link")
    .onClick(click())
  assert.equal(calls.length, 1)
})
test("data-owned link and action semantics cannot be overridden by runtime spread props", () => {
  const c = capture({
    items: [
      link("page", { target: "_blank" }),
      { type: "action", id: "action", label: "Action", disabled: true },
    ],
    activeHref: "/page",
    $link: {
      href: "/wrong",
      target: "_self",
      rel: "opener",
      "aria-current": false,
      "aria-disabled": true,
      tabIndex: 99,
    },
    $button: { type: "submit", disabled: false },
  })
  const l = c.one("Link")
  assert.equal(l.href, "/page")
  assert.equal(l.target, "_blank")
  assert.equal(l.rel, "noopener noreferrer")
  assert.equal(l["aria-current"], "page")
  assert.equal(l["aria-disabled"], undefined)
  assert.equal(l.tabIndex, undefined)
  assert.equal(c.one("Button").type, "button")
  assert.equal(c.one("Button").disabled, true)
})
test("slot overrides preserve content, labels, root props and semantic depth", () => {
  const c = capture(
    {
      items: [
        link("page", { icon: "ICON", badge: 4 }),
        { type: "label", id: "label", label: "Caption" },
        { type: "separator", id: "separator" },
      ],
      header: "Header",
      footer: "Footer",
      navigationLabel: "Primary",
      className: "custom-root",
      $nav: { "aria-label": "Override" },
      $list: { className: "custom-list" },
    },
    { Link: "CustomLink" }
  )
  assert.equal(c.all("Link").length, 0)
  assert.equal(c.one("CustomLink").href, "/page")
  assert.equal(c.one("Nav")["aria-label"], "Override")
  assert.equal(c.one("Root").className, "custom-root")
  assert.equal(c.one("List").className, "custom-list")
  assert.equal(c.one("ItemLabel").icon, "ICON")
  assert.equal(c.one("ItemLabel").badge, 4)
  assert.match(c.markup, /Header/)
  assert.match(c.markup, /Footer/)
  assert.equal(c.all("Separator").length, 1)
})
test("default and floating variants require Provider and render the same navigation semantics", () => {
  for (const Component of [Sidebar, FloatingSidebar])
    assert.throws(
      () => renderToStaticMarkup(h(Component, { items: [] })),
      /SidebarProvider/
    )
  const render = (Component) =>
    renderToStaticMarkup(
      h(
        SidebarProvider,
        null,
        h(Component, { items: tree, activeHref: "/page" })
      )
    )
  const plain = render(Sidebar),
    floating = render(FloatingSidebar)
  assert.match(plain, /data-variant="sidebar"/)
  assert.match(floating, /data-variant="floating"/)
  for (const markup of [plain, floating]) {
    assert.match(markup, /<nav[^>]*aria-label="Main navigation"/)
    assert.match(markup, /aria-current="page"/)
    assert.match(markup, /aria-expanded="true"/)
  }
})
test("closed desktop offcanvas is inert while noncollapsible navigation remains available", () => {
  const render = (collapsible) =>
    renderToStaticMarkup(
      h(
        SidebarProvider,
        { defaultOpen: false },
        h(Sidebar, { items: [link("page")], collapsible })
      )
    )
  assert.match(render("offcanvas"), /inert=""/)
  assert.doesNotMatch(render("none"), /inert=""/)
})

test("disclosure trigger keeps primitive-owned semantics despite runtime button props", () => {
  const markup = renderToStaticMarkup(
    h(
      SidebarProvider,
      null,
      h(Sidebar, {
        items: [disclosure("details", [link("page")], { disabled: true })],
        expandedIds: ["details"],
        $button: {
          type: "submit",
          disabled: false,
          "aria-expanded": false,
          "aria-controls": "wrong-target",
        },
      })
    )
  )
  assert.match(markup, /type="button"/)
  assert.match(markup, /aria-expanded="true"/)
  assert.match(markup, /disabled=""/)
  assert.doesNotMatch(markup, /type="submit"|aria-controls="wrong-target"/)
})

test("disclosure callbacks honor requested state rather than toggling blindly", () => {
  for (const initial of [[], ["target", "other"]]) {
    const changes = []
    const c = capture({
      items: [disclosure("target", [])],
      expandedIds: initial,
      onExpandedChange: (ids) => changes.push(ids),
    })
    c.one("Disclosure").onOpenChange(true)
    c.one("Disclosure").onOpenChange(false)
    assert.equal(changes[0].filter((id) => id === "target").length, 1)
    assert.ok(!changes[1].includes("target"))
    if (initial.includes("other"))
      assert.ok(changes.every((ids) => ids.includes("other")))
    assert.deepEqual(initial, initial.length ? ["target", "other"] : [])
  }
})
