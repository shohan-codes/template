import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { Breadcrumbs, ScrollableBreadcrumbs, BreadcrumbsCore, defaultBreadcrumbsSlots } from "../dist/breadcrumbs/index.js"
const items = [{ id: "home", type: "link", label: "Home", href: "/" }, { id: "current", type: "page", label: "Current page" }]
test("default trail uses navigation, a real link and a non-interactive current page", () => {
  const html = renderToStaticMarkup(h(Breadcrumbs, { items }))
  assert.match(html, /<nav aria-label="Breadcrumb"/)
  assert.match(html, /<ol/)
  assert.match(html, /href="\/"/)
  assert.match(html, /<span[^>]*aria-current="page"/)
  assert.doesNotMatch(html, /role="link"/)
  assert.match(html, /aria-hidden="true"/)
})
test("empty trail renders nothing and a single page has no separator", () => {
  assert.equal(renderToStaticMarkup(h(Breadcrumbs, { items: [] })), "")
  assert.doesNotMatch(renderToStaticMarkup(h(Breadcrumbs, { items: [items[1]] })), /breadcrumb-separator/)
})
test("runtime slots and per-link props override defaults without replacing destinations", () => {
  const Link = (props) => h("a", { ...props, "data-router": "custom" })
  const html = renderToStaticMarkup(h(BreadcrumbsCore, { defaultSlots: defaultBreadcrumbsSlots, slots: { Link }, items: [{ ...items[0], $link: { title: "Home page" } }, items[1]], separator: "/", $link: { className: "router-link" } }))
  assert.match(html, /data-router="custom"/)
  assert.match(html, /title="Home page"/)
  assert.match(html, /router-link/)
  assert.match(html, /href="\/"/)
})

test("scrollable variant retains breadcrumb semantics with a bounded single row", () => { const html=renderToStaticMarkup(h(ScrollableBreadcrumbs,{items})); assert.match(html,/overflow-x-auto/);assert.match(html,/flex-nowrap/);assert.match(html,/aria-current="page"/); })
