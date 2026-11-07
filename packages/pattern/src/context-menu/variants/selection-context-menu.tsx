"use client"

import type { ReactNode } from "react"
import {
  ContextMenuCore,
  type ContextMenuProps,
  type ContextMenuItemData,
  type ContextMenuSlots,
} from "../core"
import { defaultContextMenuSlots } from "./default-context-menu"

export const selectionContextMenuSlots: ContextMenuSlots = {
  ...defaultContextMenuSlots,
}

export type SelectionContextMenuProps = ContextMenuProps & {
  /** Caller-owned selection. Repeated IDs count only once. */
  selectedIds: readonly string[]
  /** Actions for more than one selected item; items supplies single-item actions. */
  multipleItems: readonly ContextMenuItemData[]
  /** Optional actions when nothing is selected. Otherwise the surface is hidden. */
  emptyItems?: readonly ContextMenuItemData[]
  selectionLabel?: (count: number) => ReactNode
}

/** Switch between single-item and bulk actions without changing menu primitives. */
export function SelectionContextMenu({
  selectedIds,
  items,
  multipleItems,
  emptyItems = [],
  selectionLabel = (count) =>
    `${count} ${count === 1 ? "item" : "items"} selected`,
  trigger,
  ...props
}: SelectionContextMenuProps) {
  const count = new Set(selectedIds).size
  const actions = count === 0 ? emptyItems : count === 1 ? items : multipleItems
  if (actions.length === 0) return null
  const summary = selectionLabel(count)
  return (
    <ContextMenuCore
      defaultSlots={selectionContextMenuSlots}
      {...props}
      trigger={
        props.$trigger?.asChild ? (
          trigger
        ) : (
          <>
            <span>{trigger}</span>
            <span className="mt-1 block text-xs text-muted-foreground">
              {summary}
            </span>
          </>
        )
      }
      items={[
        { id: "selection-label", type: "label", label: summary },
        { id: "selection-divider", type: "separator" },
        {
          id: "selection-actions",
          type: "group",
          label: "Selection actions",
          items: actions,
        },
      ]}
    />
  )
}
