import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { Toolbar, FloatingToolbar, ToolbarCore, defaultToolbarSlots } from "../dist/toolbar/index.js"
const items = [{ id: "save", type: "action", label: "Save" }, { id: "delete", type: "action", label: "Delete", disabled: true }, { id: "separator", type: "separator" }, { id: "help", type: "link", href: "/help", label: "Help" }]
test("toolbar exposes its label, non-submit actions, disabled state and real links", () => {
  const html=renderToStaticMarkup(h(Toolbar, { "aria-label": "Document actions", items }))
  assert.match(html,/role="toolbar"/); assert.match(html,/aria-label="Document actions"/); assert.match(html,/type="button"/);assert.match(html,/disabled=""/);assert.match(html,/href="\/help"/)
})
test("single and multiple groups retain their selection state", () => {
  const html=renderToStaticMarkup(h(Toolbar,{"aria-label":"Formatting",items:[{id:"format",type:"toggle-group",selectionMode:"multiple",label:"Font style",defaultValue:["bold"],items:[{id:"bold",value:"bold",label:"Bold"}]}]}))
  assert.match(html,/aria-pressed="true"/)
  const single=renderToStaticMarkup(h(Toolbar,{"aria-label":"Formatting",items:[{id:"align",type:"toggle-group",selectionMode:"single",label:"Alignment",value:"left",items:[{id:"left",value:"left",label:"Left"}]}]}))
  assert.match(single,/aria-checked="true"/)
})
test("runtime slots, orientation and empty data are handled",()=>{
  assert.equal(renderToStaticMarkup(h(Toolbar,{"aria-label":"Empty",items:[]})),"")
  const Button=props=>h("button",{...props,"data-custom":"yes"})
  const html=renderToStaticMarkup(h(ToolbarCore,{defaultSlots:defaultToolbarSlots,slots:{Button},"aria-label":"Tools",orientation:"vertical",items,$button:{title:"Action"}}))
  assert.match(html,/data-custom="yes"/);assert.match(html,/aria-orientation="vertical"/);assert.match(html,/title="Action"/)
})

test("floating variant retains toolbar semantics and explicit accessible icon labels",()=>{const html=renderToStaticMarkup(h(FloatingToolbar,{"aria-label":"Selection tools",items:[{id:"bold",type:"action",label:"B","aria-label":"Bold"}]}));assert.match(html,/rounded-full/);assert.match(html,/aria-label="Bold"/);assert.match(html,/role="toolbar"/);})
