import type { ToolbarItemData, ToolbarProps } from "../src/toolbar"

const action: ToolbarItemData = { id: "save", type: "action", label: "Save" }
const single: ToolbarItemData = {
  id: "align",
  type: "toggle-group",
  selectionMode: "single",
  label: "Alignment",
  value: "left",
  items: [],
}
const multiple: ToolbarItemData = {
  id: "style",
  type: "toggle-group",
  selectionMode: "multiple",
  label: "Style",
  value: ["bold"],
  items: [],
}
// @ts-expect-error Link destinations are required.
const missingHref: ToolbarItemData = { id: "help", type: "link", label: "Help" }
// @ts-expect-error Actions require stable identity.
const missingId: ToolbarItemData = { type: "action", label: "Save" }
const badValue: ToolbarItemData = {
  id: "align",
  type: "toggle-group",
  selectionMode: "single",
  label: "Alignment",
  // @ts-expect-error Single selection cannot receive multiple values.
  value: ["left"],
  items: [],
}
const badProps: ToolbarProps = {
  "aria-label": "Tools",
  items: [],
  // @ts-expect-error Native button type is owned by the core.
  $button: { type: "submit" },
}
void [action, single, multiple, missingHref, missingId, badValue, badProps]
