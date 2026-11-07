import type { SidebarItemData } from "./types"

/** Reveal expandable ancestors only; a group never implies a disclosure. */
export function getActiveSidebarDisclosures(
  items: readonly SidebarItemData[],
  activeHref?: string
): string[] {
  if (!activeHref) return []
  const ids: string[] = []
  function visit(entries: readonly SidebarItemData[]): boolean {
    let active = false
    for (const item of entries) {
      if (item.type === "link" && !item.disabled && item.href === activeHref)
        active = true
      if (item.type === "group" || item.type === "disclosure") {
        const childActive = visit(item.items)
        if (childActive && item.type === "disclosure" && !item.disabled)
          ids.push(item.id)
        active ||= childActive
      }
    }
    return active
  }
  visit(items)
  return ids
}
export function toggleSidebarDisclosure(
  ids: readonly string[],
  id: string
): string[] {
  return ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id]
}
