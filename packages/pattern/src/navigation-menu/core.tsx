"use client"

import { resolveSlots } from "../utilities/resolve-slots"
import {
  Fragment,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react"
import type * as Primitive from "@workspace/shadcn-ui/components/navigation-menu"

type Entry = Readonly<{ id: string; label: ReactNode }>
export type NavigationMenuLinkItem = Entry &
  Readonly<{
    type: "link"
    href: string
    icon?: ReactNode
    description?: ReactNode
    active?: boolean
    onSelect?: (event: Event) => void
    $anchor?: Omit<ComponentProps<"a">, "children" | "href" | "aria-current">
  }>
export type NavigationMenuGroup = Entry &
  Readonly<{ type: "group"; items: readonly NavigationMenuLinkItem[] }>
export type NavigationMenuContentItem =
  NavigationMenuLinkItem | NavigationMenuGroup
export type NavigationMenuItemData =
  | NavigationMenuLinkItem
  | (Entry &
      Readonly<{
        type: "submenu"
        disabled?: boolean
        items: readonly NavigationMenuContentItem[]
      }>)
export type NavigationMenuSlots = Readonly<{
  Root: ElementType
  List: ElementType
  Item: ElementType
  Trigger: ElementType
  Content: ElementType
  Link: ElementType
  Anchor: ElementType
  ContentList: ElementType
  ContentItem: ElementType
  Group: ElementType
  GroupLabel: ElementType
  Label: ElementType
  Description: ElementType
}>
export type NavigationMenuBaseProps = Omit<
  ComponentProps<typeof Primitive.NavigationMenu>,
  "children" | "asChild" | "viewport" | "orientation"
> & {
  readonly items: readonly NavigationMenuItemData[]
  readonly slots?: Partial<NavigationMenuSlots>
  readonly $list?: Omit<
    ComponentProps<typeof Primitive.NavigationMenuList>,
    "children" | "asChild"
  >
  readonly $trigger?: Omit<
    ComponentProps<typeof Primitive.NavigationMenuTrigger>,
    "children" | "asChild" | "disabled" | "value" | "type"
  >
  readonly $content?: Omit<
    ComponentProps<typeof Primitive.NavigationMenuContent>,
    "children" | "asChild"
  >
  readonly $link?: Omit<
    ComponentProps<typeof Primitive.NavigationMenuLink>,
    "children" | "asChild" | "active" | "href" | "onSelect" | "aria-current"
  >
  readonly $anchor?: Omit<
    ComponentProps<"a">,
    "children" | "href" | "aria-current"
  >
  readonly $contentList?: Omit<ComponentProps<"ul">, "children">
}
export type NavigationMenuProps = NavigationMenuBaseProps & {
  readonly defaultSlots?: NavigationMenuSlots
}
export type NavigationMenuCoreProps = NavigationMenuBaseProps & {
  readonly defaultSlots: NavigationMenuSlots
}

/** Site-navigation links and disclosure panels, intentionally not an action menu. */
export function NavigationMenuCore({
  items,
  defaultSlots,
  slots,
  $list,
  $trigger,
  $content,
  $link,
  $anchor,
  $contentList,
  ...root
}: NavigationMenuCoreProps) {
  if (!items.length) return null
  const P = resolveSlots(defaultSlots, slots)
  function renderLink(item: NavigationMenuLinkItem) {
    return (
      <P.Link {...$link} asChild active={item.active} onSelect={item.onSelect}>
        <P.Anchor
          {...$anchor}
          {...item.$anchor}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
        >
          <Fragment key="icon">{item.icon}</Fragment>
          <span>
            <P.Label>{item.label}</P.Label>
            {item.description && (
              <P.Description>{item.description}</P.Description>
            )}
          </span>
        </P.Anchor>
      </P.Link>
    )
  }
  return (
    <P.Root
      aria-label="Main navigation"
      {...root}
      viewport={false}
      orientation="horizontal"
    >
      <P.List {...$list}>
        {items.map((item) => (
          <P.Item key={item.id} value={item.id}>
            {item.type === "link" ? (
              renderLink(item)
            ) : (
              <>
                <P.Trigger {...$trigger} type="button" disabled={item.disabled}>
                  {item.label}
                </P.Trigger>
                <P.Content {...$content}>
                  <P.ContentList {...$contentList}>
                    {item.items.map((entry) => (
                      <P.ContentItem key={entry.id}>
                        {entry.type === "link" ? (
                          renderLink(entry)
                        ) : (
                          <P.Group>
                            <P.GroupLabel>{entry.label}</P.GroupLabel>
                            <P.ContentList
                              {...$contentList}
                              aria-label={
                                typeof entry.label === "string"
                                  ? entry.label
                                  : undefined
                              }
                            >
                              {entry.items.map((link) => (
                                <P.ContentItem key={link.id}>
                                  {renderLink(link)}
                                </P.ContentItem>
                              ))}
                            </P.ContentList>
                          </P.Group>
                        )}
                      </P.ContentItem>
                    ))}
                  </P.ContentList>
                </P.Content>
              </>
            )}
          </P.Item>
        ))}
      </P.List>
    </P.Root>
  )
}
