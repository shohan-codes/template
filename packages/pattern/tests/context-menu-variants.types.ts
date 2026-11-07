import type { ActionsContextMenuProps } from "../src/context-menu/variants/actions-context-menu"
import type { SelectionContextMenuProps } from "../src/context-menu/variants/selection-context-menu"

const items = [{ id: "open", type: "action", label: "Open" }] as const
export const actions: ActionsContextMenuProps = {
  items,
  trigger: "File",
  menuLabel: "Actions",
  $actionMenu: { $content: { align: "end" } },
}
export const selection: SelectionContextMenuProps = {
  items,
  trigger: "Files",
  selectedIds: ["a"],
  multipleItems: items,
  selectionLabel: (count) => `${count} files`,
}
// @ts-expect-error The visible actions button needs a label.
export const unnamed: ActionsContextMenuProps = { items, trigger: "File" }
export const invalidTrigger: ActionsContextMenuProps = {
  ...actions,
  // @ts-expect-error The visible button owns its trigger element.
  $actionMenu: { $trigger: { asChild: true } },
}
// @ts-expect-error Bulk actions must be explicitly supplied.
export const noBulk: SelectionContextMenuProps = {
  items,
  trigger: "Files",
  selectedIds: ["a", "b"],
}
