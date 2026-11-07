"use client"
import * as React from "react"
import { getActiveSidebarDisclosures } from "./model"
import type { SidebarCoreProps, SidebarItemData } from "./types"

/** Typed navigation behavior. Presentation and primitives come from injected slots. */
export function SidebarCore({
  items,
  defaultSlots,
  slots,
  header,
  footer,
  navigationLabel = "Main navigation",
  activeHref,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  onNavigate,
  $nav,
  $list,
  $item,
  $link,
  $button,
  ...rootProps
}: SidebarCoreProps) {
  const P = { ...defaultSlots, ...slots }
  // Guard semantic fields at runtime as well as in the public TypeScript API.
  const buttonProps = Object.fromEntries(
    Object.entries($button ?? {}).filter(
      ([key]) =>
        ![
          "children",
          "type",
          "disabled",
          "aria-expanded",
          "aria-controls",
        ].includes(key)
    )
  )
  const activeIds = getActiveSidebarDisclosures(items, activeHref)
  const [expansion, setExpansion] = React.useState(() => ({
    activeHref,
    ids: [...new Set([...defaultExpandedIds, ...activeIds])],
  }))
  let current = expansion
  if (expansion.activeHref !== activeHref) {
    current = {
      activeHref,
      ids: [...new Set([...expansion.ids, ...activeIds])],
    }
    setExpansion(current)
  }
  const openIds = expandedIds ?? current.ids
  const label = (item: Exclude<SidebarItemData, { type: "separator" }>) => (
    <P.ItemLabel icon={item.icon} badge={item.badge}>
      {item.label}
    </P.ItemLabel>
  )
  function renderItems(
    entries: readonly SidebarItemData[],
    depth = 0
  ): React.ReactNode {
    return (
      <P.List {...$list} depth={depth}>
        {entries.map((item) => {
          let content: React.ReactNode
          switch (item.type) {
            case "separator":
              content = <P.Separator />
              break
            case "label":
              content = <P.Label>{label(item)}</P.Label>
              break
            case "group":
              content = (
                <>
                  <P.Label>{label(item)}</P.Label>
                  {renderItems(item.items, depth)}
                </>
              )
              break
            case "link":
              content = (
                <P.Link
                  {...$link}
                  depth={depth}
                  href={item.disabled ? undefined : item.href}
                  target={item.target}
                  rel={
                    item.rel ??
                    (item.target === "_blank"
                      ? "noopener noreferrer"
                      : undefined)
                  }
                  aria-disabled={item.disabled || undefined}
                  aria-current={
                    !item.disabled && activeHref === item.href
                      ? "page"
                      : undefined
                  }
                  tabIndex={item.disabled ? -1 : undefined}
                  onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    if (item.disabled) {
                      event.preventDefault()
                      return
                    }
                    $link?.onClick?.(event)
                    if (
                      !event.defaultPrevented &&
                      event.button === 0 &&
                      !event.metaKey &&
                      !event.ctrlKey &&
                      !event.altKey &&
                      !event.shiftKey &&
                      (!item.target || item.target === "_self")
                    )
                      onNavigate?.(item, event)
                  }}
                >
                  {label(item)}
                </P.Link>
              )
              break
            case "action":
              content = (
                <P.Button
                  {...buttonProps}
                  depth={depth}
                  type="button"
                  disabled={item.disabled}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    if (item.disabled) {
                      event.preventDefault()
                      return
                    }
                    $button?.onClick?.(event)
                    if (!event.defaultPrevented)
                      item.onSelect?.(event.nativeEvent)
                  }}
                >
                  {label(item)}
                </P.Button>
              )
              break
            case "disclosure": {
              const open = openIds.includes(item.id)
              content = (
                <P.Disclosure
                  open={open}
                  disabled={item.disabled}
                  onOpenChange={(nextOpen: boolean) => {
                    if (item.disabled) return
                    const ids = nextOpen
                      ? [...new Set([...openIds, item.id])]
                      : openIds.filter((id) => id !== item.id)
                    if (expandedIds === undefined)
                      setExpansion({ activeHref, ids })
                    onExpandedChange?.(ids)
                  }}
                  $trigger={{
                    ...buttonProps,
                    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                      if (item.disabled) {
                        event.preventDefault()
                        return
                      }
                      $button?.onClick?.(event)
                    },
                    "data-active": activeIds.includes(item.id) || undefined,
                  }}
                  trigger={
                    <>
                      {label(item)}
                      <P.Indicator
                        aria-hidden="true"
                        data-state={open ? "open" : "closed"}
                      />
                    </>
                  }
                >
                  {renderItems(item.items, depth + 1)}
                </P.Disclosure>
              )
              break
            }
          }
          return (
            <P.Item {...$item} key={item.id} depth={depth}>
              {content}
            </P.Item>
          )
        })}
      </P.List>
    )
  }
  return (
    <P.Root {...rootProps}>
      {header != null && <P.Header>{header}</P.Header>}
      <P.Content>
        <P.Nav {...$nav} aria-label={$nav?.["aria-label"] ?? navigationLabel}>
          {renderItems(items)}
        </P.Nav>
      </P.Content>
      {footer != null && <P.Footer>{footer}</P.Footer>}
    </P.Root>
  )
}
