"use client"

import {
  Fragment,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react"
import type * as Primitive from "@workspace/shadcn-ui/components/breadcrumb"

type Entry = Readonly<{ id: string; label: ReactNode; icon?: ReactNode }>
export type BreadcrumbLinkItem = Entry &
  Readonly<{
    type: "link"
    href: string
    $link?: Omit<ComponentProps<"a">, "children" | "href">
  }>
export type BreadcrumbPageItem = Entry & Readonly<{ type: "page" }>
/** Put a single page item at the end of the trail. Links remain real destinations. */
export type BreadcrumbItemData = BreadcrumbLinkItem | BreadcrumbPageItem
export type BreadcrumbsSlots = Readonly<{
  Root: ElementType
  List: ElementType
  Item: ElementType
  Link: ElementType
  Page: ElementType
  Separator: ElementType
}>
export type BreadcrumbsBaseProps = Omit<
  ComponentProps<typeof Primitive.Breadcrumb>,
  "children"
> & {
  readonly items: readonly BreadcrumbItemData[]
  readonly separator?: ReactNode
  readonly slots?: Partial<BreadcrumbsSlots>
  readonly $list?: Omit<
    ComponentProps<typeof Primitive.BreadcrumbList>,
    "children"
  >
  readonly $item?: Omit<
    ComponentProps<typeof Primitive.BreadcrumbItem>,
    "children"
  >
  readonly $link?: Omit<ComponentProps<"a">, "children" | "href">
  readonly $page?: Omit<
    ComponentProps<typeof Primitive.BreadcrumbPage>,
    "children" | "aria-current"
  >
  readonly $separator?: Omit<
    ComponentProps<typeof Primitive.BreadcrumbSeparator>,
    "children"
  >
}
export type BreadcrumbsProps = BreadcrumbsBaseProps & {
  readonly defaultSlots?: BreadcrumbsSlots
}
export type BreadcrumbsCoreProps = BreadcrumbsBaseProps & {
  readonly defaultSlots: BreadcrumbsSlots
}

/** Typed trail structure with presentation supplied by the injected slots. */
export function BreadcrumbsCore({
  items,
  separator,
  defaultSlots,
  slots,
  $list,
  $item,
  $link,
  $page,
  $separator,
  ...root
}: BreadcrumbsCoreProps) {
  if (!items.length) return null
  const P = { ...defaultSlots, ...slots }
  return (
    <P.Root {...root}>
      <P.List {...$list}>
        {items.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 && (
              <P.Separator
                {...$separator}
                aria-hidden="true"
                role="presentation"
              >
                {separator}
              </P.Separator>
            )}
            <P.Item {...$item}>
              {item.type === "link" ? (
                <P.Link {...$link} {...item.$link} href={item.href}>
                  {item.icon}
                  {item.label}
                </P.Link>
              ) : (
                <P.Page {...$page} aria-current="page">
                  {item.icon}
                  {item.label}
                </P.Page>
              )}
            </P.Item>
          </Fragment>
        ))}
      </P.List>
    </P.Root>
  )
}
