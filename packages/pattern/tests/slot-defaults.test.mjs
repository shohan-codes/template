import assert from "node:assert/strict"
import { test } from "node:test"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import * as pattern from "../dist/index.js"
import { SidebarProvider } from "@workspace/shadcn-ui/components/sidebar"
import { resolveSlots } from "../dist/utilities/resolve-slots.js"

const action = { id: "open", type: "action", label: "Open" }
const link = { id: "home", type: "link", label: "Home", href: "/" }
const menu = { trigger: "Actions", items: [action] }
const tab = { id: "one", type: "tab", label: "One", content: "Panel" }
// Keep every design in the matrix, including wrappers that already handled undefined.
const cases = [
  [
    "Accordion",
    "defaultAccordionSlots",
    { items: [{ id: "one", title: "One", content: "Panel" }] },
  ],
  [
    "CardAccordion",
    "cardAccordionSlots",
    { items: [{ id: "one", title: "One", content: "Panel" }] },
  ],
  [
    "Questionnaire",
    "defaultQuestionnaireSlots",
    { questions: [{ name: "name", title: "Your name", input: true }] },
  ],
  [
    "CardQuestionnaire",
    "cardQuestionnaireSlots",
    { questions: [{ name: "name", title: "Your name", input: true }] },
  ],
  [
    "Collapsible",
    "defaultCollapsibleSlots",
    { trigger: "Details", children: "Panel" },
  ],
  [
    "CardCollapsible",
    "cardCollapsibleSlots",
    {
      trigger: "Details",
      items: [{ id: "one", type: "content", content: "Panel" }],
    },
  ],
  ["Dropdown", "defaultDropdownSlots", menu],
  ["IconDropdown", "iconDropdownSlots", { label: "Actions", items: [action] }],
  [
    "SplitDropdown",
    "splitDropdownSlots",
    {
      items: [action],
      primaryAction: { label: "Save" },
      menuLabel: "Save options",
    },
  ],
  ["ContextMenu", "defaultContextMenuSlots", menu],
  [
    "ActionsContextMenu",
    "actionsContextMenuSlots",
    { ...menu, menuLabel: "Actions" },
  ],
  [
    "SelectionContextMenu",
    "selectionContextMenuSlots",
    { ...menu, selectedIds: ["one"], multipleItems: [action] },
  ],
  ["Sidebar", "defaultSidebarSlots", { items: [link], collapsible: "none" }],
  [
    "FloatingSidebar",
    "defaultSidebarSlots",
    { items: [link], collapsible: "none" },
  ],
  ["Breadcrumbs", "defaultBreadcrumbsSlots", { items: [link] }],
  ["ScrollableBreadcrumbs", "scrollableBreadcrumbsSlots", { items: [link] }],
  [
    "Toolbar",
    "defaultToolbarSlots",
    { items: [action], "aria-label": "Tools" },
  ],
  [
    "FloatingToolbar",
    "floatingToolbarSlots",
    { items: [action], "aria-label": "Tools" },
  ],
  ["CommandPalette", "defaultCommandPaletteSlots", menu],
  [
    "CommandSearch",
    "inlineCommandSearchSlots",
    { items: [action], label: "Search" },
  ],
  ["NavigationMenu", "defaultNavigationMenuSlots", { items: [link] }],
  ["MegaNavigationMenu", "megaNavigationMenuSlots", { items: [link] }],
  ["Tabs", "defaultTabsSlots", { mode: "typed", items: [tab] }],
  ["SegmentedTabs", "segmentedTabsSlots", { mode: "typed", items: [tab] }],
  ["FolderTabs", "enclosedFolderTabsSlots", { mode: "typed", items: [tab] }],
]

function render(name, props) {
  const element = h(pattern[name], props)
  return renderToStaticMarkup(
    name.includes("Sidebar") ? h(SidebarProvider, null, element) : element
  )
}

for (const [name, defaultsName, props] of cases) {
  test(`${name}: undefined defaultSlots and partial slots preserve the exact design`, () => {
    const defaults = pattern[defaultsName]
    assert.ok(defaults, defaultsName)
    const baseline = render(name, props)
    assert.ok(baseline.length > 0)
    assert.equal(render(name, { ...props, defaultSlots: undefined }), baseline)
    const slots = Object.fromEntries(
      Object.keys(defaults).map((key) => [key, undefined])
    )
    assert.equal(render(name, { ...props, slots }), baseline)
    assert.equal(
      render(name, { ...props, defaultSlots: undefined, slots }),
      baseline
    )
  })

  test(`${name}: valid defaults and runtime overrides remain effective`, () => {
    const defaults = pattern[defaultsName]
    // Wrap a rendered slot while preserving the real primitive and its context.
    const key =
      name === "CommandPalette"
        ? "Trigger"
        : name.includes("Dropdown") || name.includes("ContextMenu")
          ? "Trigger"
          : "Root"
    const Original = defaults[key]
    const DefaultOverride = (slotProps) =>
      h("div", { "data-override": "default" }, h(Original, slotProps))
    const RuntimeOverride = (slotProps) =>
      h("div", { "data-override": "runtime" }, h(Original, slotProps))
    const defaultSlots = { ...defaults, [key]: DefaultOverride }
    assert.match(
      render(name, { ...props, defaultSlots }),
      /data-override="default"/
    )
    assert.match(
      render(name, { ...props, defaultSlots, slots: { [key]: undefined } }),
      /data-override="default"/
    )
    const markup = render(name, {
      ...props,
      defaultSlots,
      slots: { [key]: RuntimeOverride },
    })
    assert.match(markup, /data-override="runtime"/)
    assert.doesNotMatch(markup, /data-override="default"/)
  })
}

test("legacy Tabs keep URL links and their original design with undefined slot entries", () => {
  for (const [name, defaultsName] of cases.filter(([name]) =>
    name.includes("Tabs")
  )) {
    const props = {
      items: [{ id: "one", label: "One", href: "?tab=one", content: "Panel" }],
    }
    const slots = Object.fromEntries(
      Object.keys(pattern[defaultsName]).map((key) => [key, undefined])
    )
    const markup = render(name, { ...props, slots, defaultSlots: undefined })
    assert.equal(markup, render(name, props))
    assert.match(markup, /href="\?tab=one"/)
  }
})

test("slot resolution skips only undefined values and does not mutate inputs", () => {
  const defaults = Object.freeze({ Root: "div", Item: "span" })
  const overrides = Object.freeze({ Root: undefined, Item: "button" })
  assert.deepEqual(resolveSlots(defaults, overrides), {
    Root: "div",
    Item: "button",
  })
  assert.equal(resolveSlots(defaults), defaults)
  assert.deepEqual(resolveSlots(defaults, { Item: null }), {
    Root: "div",
    Item: null,
  })
})

test("context surfaces preserve caller descriptions, classes and unwrapped children", () => {
  const html = render("ContextMenu", {
    ...menu,
    trigger: h("strong", { "data-caller": true }, "Caller content"),
    $trigger: {
      className: "caller-surface",
      "aria-describedby": "caller-hint",
    },
  })
  assert.match(html, /class="[^"]*caller-surface/)
  assert.match(html, /aria-describedby="caller-hint"/)
  assert.match(
    html,
    /><strong data-caller="true">Caller content<\/strong><\/span>/
  )
})

for (const [name, defaultsName, props] of [
  [
    "CodeBlock",
    "defaultCodeBlockSlots",
    { code: "const value = 1", language: "text" },
  ],
  ["Terminal", "terminalSlots", { code: "echo hello", language: "text" }],
  [
    "CodeBlockTabs",
    "defaultCodeBlockTabsSlots",
    {
      tabs: [{ id: "one", title: "Example", code: "hello", language: "text" }],
    },
  ],
  [
    "TerminalTabs",
    "defaultTerminalTabsSlots",
    {
      tabs: [{ id: "one", title: "Example", code: "hello", language: "text" }],
    },
  ],
]) {
  test(`${name}: partial slots skip undefined and retain real overrides`, () => {
    const defaults = pattern[defaultsName]
    const slots = Object.fromEntries(
      Object.keys(defaults).map((key) => [key, undefined])
    )
    assert.equal(render(name, { ...props, slots }), render(name, props))
    const Original = defaults.Root
    const Root = (slotProps) =>
      h("div", { "data-override": "code" }, h(Original, slotProps))
    assert.match(
      render(name, { ...props, slots: { ...slots, Root } }),
      /data-override="code"/
    )
  })
}

test("legacy three-slot Collapsible integrations retain optional structural fallbacks", () => {
  const { Root, Trigger, Content } = pattern.defaultCollapsibleSlots
  const markup = renderToStaticMarkup(
    h(pattern.CollapsibleCore, {
      defaultSlots: {
        Root,
        Trigger,
        Content,
        Item: undefined,
        Group: undefined,
        GroupLabel: undefined,
        Custom: undefined,
        Separator: undefined,
      },
      trigger: "Details",
      defaultOpen: true,
      items: [
        {
          id: "group",
          type: "group",
          label: "Group",
          items: [{ id: "one", type: "content", content: "Legacy content" }],
        },
        { id: "separator", type: "separator" },
        {
          id: "custom",
          type: "custom",
          content: h("strong", null, "Custom content"),
        },
      ],
    })
  )
  assert.match(markup, /Group/)
  assert.match(markup, /Legacy content/)
  assert.match(markup, /<hr/)
  assert.match(markup, /<strong>Custom content<\/strong>/)
})
