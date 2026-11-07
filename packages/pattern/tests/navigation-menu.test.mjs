import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { NavigationMenu, MegaNavigationMenu, NavigationMenuCore, defaultNavigationMenuSlots } from "../dist/navigation-menu/index.js"
const items = [{ id: "home", type: "link", label: "Home", href: "/", active: true }, { id: "resources", type: "submenu", label: "Resources", items: [{id:"docs",type:"link",label:"Docs",href:"/docs"}] }, {id:"soon",type:"submenu",label:"Soon",disabled:true,items:[]}]
test("default navigation keeps real anchors, active destination, and non-submit disclosure semantics",()=>{
  const html=renderToStaticMarkup(h(NavigationMenu,{items}))
  assert.match(html,/<nav[^>]*aria-label="Main navigation"/);assert.match(html,/href="\/"/);assert.match(html,/aria-current="page"/);assert.match(html,/type="button"/);assert.match(html,/aria-expanded="false"/);assert.match(html,/disabled=""/);assert.doesNotMatch(html,/role="menu/)
})
test("empty navigation renders nothing and custom root label is preserved",()=>{
  assert.equal(renderToStaticMarkup(h(NavigationMenu,{items:[]})),"")
  assert.match(renderToStaticMarkup(h(NavigationMenu,{items,"aria-label":"Product navigation"})),/aria-label="Product navigation"/)
})
test("group and link data render through runtime slots without losing destinations or content",()=>{
  const wrap=tag=>({children,...props})=>h(tag,{className:props.className},children)
  const slots={Root:wrap("nav"),List:wrap("ul"),Item:wrap("li"),Trigger:wrap("button"),Content:wrap("section"),Link:({children})=>children,Anchor:props=>h("a",{...props,"data-router":"custom"})}
  const html=renderToStaticMarkup(h(NavigationMenuCore,{defaultSlots:defaultNavigationMenuSlots,slots,items:[{id:"library",type:"submenu",label:"Library",items:[{id:"group",type:"group",label:"Getting started",items:[{id:"guide",type:"link",label:"Guide",description:"Read the guide",href:"/guide",active:true}]}]}],$anchor:{title:"Destination"}}))
  assert.match(html,/Getting started/);assert.match(html,/Read the guide/);assert.match(html,/href="\/guide"/);assert.match(html,/data-router="custom"/);assert.match(html,/title="Destination"/);assert.match(html,/aria-current="page"/)
})
test("mega variant retains navigation semantics and exports distinct injected defaults",()=>{
  const html=renderToStaticMarkup(h(MegaNavigationMenu,{items}))
  assert.match(html,/aria-label="Main navigation"/);assert.match(html,/href="\/"/)
})

test("open navigation uses real disclosure state and scoped open-state styling",()=>{const html=renderToStaticMarkup(h(NavigationMenu,{items,defaultValue:"resources"}));assert.match(html,/aria-expanded="true"/);assert.match(html,/data-state="open"/);assert.match(html,/data-\[state=open\]:\[&amp;&gt;svg:last-child\]:rotate-180/);})

test("open real primitives preserve panel links, router anchors, and mega layout slots",()=>{
  const Anchor=props=>h("a",{...props,"data-router":"retained"})
  const html=renderToStaticMarkup(h(MegaNavigationMenu,{items,defaultValue:"resources",$content:{forceMount:true},slots:{Anchor}}))
  assert.match(html,/aria-labelledby="[^"]*trigger-resources"/)
  assert.match(html,/href="\/docs"/)
  assert.match(html,/data-router="retained"/)
  assert.match(html,/@min-\[30rem\]\/navigation:grid-cols-2/)
  assert.match(html,/data-\[state=open\]:animate-in/)
})
