import type * as React from "react"
import type { Sidebar as PrimitiveSidebar } from "@workspace/shadcn-ui/components/sidebar"

type Entry = Readonly<{ id: string }>
type LabeledEntry = Entry &
  Readonly<{
    label: React.ReactNode
    icon?: React.ReactNode
    badge?: React.ReactNode
  }>
type InteractiveEntry = LabeledEntry & Readonly<{ disabled?: boolean }>

export type SidebarLinkItem = InteractiveEntry &
  Readonly<{
    type: "link"
    href: string
    target?: React.HTMLAttributeAnchorTarget
    rel?: string
  }>
export type SidebarActionItem = InteractiveEntry &
  Readonly<{
    type: "action"
    /** Native click Event, including keyboard-triggered clicks; not a menu-selection event. */
    onSelect?: (event: Event) => void
  }>
export type SidebarGroupItem = LabeledEntry &
  Readonly<{
    type: "group"
    items: readonly SidebarItemData[]
  }>
export type SidebarDisclosureItem = InteractiveEntry &
  Readonly<{
    type: "disclosure"
    items: readonly SidebarItemData[]
  }>
export type SidebarItemData =
  | SidebarLinkItem
  | SidebarActionItem
  | SidebarGroupItem
  | SidebarDisclosureItem
  | (LabeledEntry & Readonly<{ type: "label" }>)
  | (Entry & Readonly<{ type: "separator" }>)

/** Slots must forward children and the supplied semantic attributes/handlers. */
export type SidebarSlots = Readonly<{
  Root: React.ElementType
  Header: React.ElementType
  Content: React.ElementType
  Footer: React.ElementType
  Nav: React.ElementType
  List: React.ElementType
  Item: React.ElementType
  Label: React.ElementType
  ItemLabel: React.ElementType
  Link: React.ElementType
  Button: React.ElementType
  Disclosure: React.ElementType
  Separator: React.ElementType
  Indicator: React.ElementType
}>

type SemanticLinkProps =
  | "children"
  | "href"
  | "target"
  | "rel"
  | "aria-current"
  | "aria-disabled"
  | "tabIndex"
type SemanticButtonProps =
  "children" | "type" | "disabled" | "aria-expanded" | "aria-controls"
export type SidebarBaseProps = Omit<
  React.ComponentProps<typeof PrimitiveSidebar>,
  "children"
> & {
  /** IDs are stable and unique across the complete navigation tree. */
  readonly items: readonly SidebarItemData[]
  readonly header?: React.ReactNode
  readonly footer?: React.ReactNode
  readonly navigationLabel?: string
  readonly activeHref?: string
  readonly expandedIds?: readonly string[]
  readonly defaultExpandedIds?: readonly string[]
  readonly onExpandedChange?: (ids: string[]) => void
  /** Unmodified same-tab links only. Prevent default here for client-side routing. */
  readonly onNavigate?: (
    item: SidebarLinkItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => void
  readonly slots?: Partial<SidebarSlots>
  readonly $nav?: Omit<React.ComponentPropsWithoutRef<"nav">, "children">
  readonly $list?: Omit<React.ComponentPropsWithoutRef<"ul">, "children">
  readonly $item?: Omit<React.ComponentPropsWithoutRef<"li">, "children">
  readonly $link?: Omit<React.ComponentPropsWithoutRef<"a">, SemanticLinkProps>
  readonly $button?: Omit<
    React.ComponentPropsWithoutRef<"button">,
    SemanticButtonProps
  >
}
export type SidebarCoreProps = SidebarBaseProps & {
  readonly defaultSlots: SidebarSlots
}
export type SidebarProps = SidebarBaseProps & {
  readonly defaultSlots?: SidebarSlots
}
