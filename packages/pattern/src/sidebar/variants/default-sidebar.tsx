"use client"
import type * as React from "react"
import { ChevronRight, X } from "lucide-react"
import { Button as PlainButton } from "@workspace/shadcn-ui/components/button"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  Sidebar as PrimitiveSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarGroupLabel,
  SidebarSeparator,
  useSidebar,
} from "@workspace/shadcn-ui/components/sidebar"
import {
  Collapsible as PrimitiveDisclosure,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/shadcn-ui/components/collapsible"
import { Collapsible, type CollapsibleProps } from "../../collapsible"
import { SidebarCore } from "../core"
import type { SidebarProps, SidebarSlots } from "../types"

export function SidebarRoot({
  children,
  collapsible = "offcanvas",
  variant = "sidebar",
  className,
  inert,
  ...props
}: React.ComponentProps<typeof PrimitiveSidebar>) {
  const { isMobile, open, setOpenMobile } = useSidebar()
  const hidden = !isMobile && !open && collapsible === "offcanvas"
  return (
    <PrimitiveSidebar
      {...props}
      variant={variant}
      collapsible={collapsible}
      inert={hidden || inert}
      className={cn(
        collapsible === "none" &&
          variant === "floating" &&
          "rounded-xl border shadow-sm",
        className
      )}
    >
      {isMobile && collapsible !== "none" && (
        <SidebarHeader className="flex-row items-center justify-between">
          <span className="text-sm font-medium">Navigation</span>
          <PlainButton
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close navigation"
            onClick={() => setOpenMobile(false)}
          >
            <X aria-hidden="true" />
          </PlainButton>
        </SidebarHeader>
      )}
      {children}
    </PrimitiveSidebar>
  )
}
function Nav({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav {...props} className={cn("p-2", className)} />
}
function List({
  depth,
  ...props
}: React.ComponentProps<"ul"> & { depth: number }) {
  return depth > 0 ? <SidebarMenuSub {...props} /> : <SidebarMenu {...props} />
}
function Item({
  depth,
  ...props
}: React.ComponentProps<"li"> & { depth: number }) {
  return depth > 0 ? (
    <SidebarMenuSubItem {...props} />
  ) : (
    <SidebarMenuItem {...props} />
  )
}
function ItemLabel({
  children,
  icon,
  badge,
}: {
  children: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
}) {
  return (
    <>
      {icon}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {badge != null && (
        <span className="text-xs tabular-nums group-data-[collapsible=icon]:hidden">
          {badge}
        </span>
      )}
    </>
  )
}
function Link({
  depth,
  ...props
}: React.ComponentProps<"a"> & { depth: number }) {
  const active = props["aria-current"] === "page"
  return depth > 0 ? (
    <SidebarMenuSubButton
      {...props}
      isActive={active}
      data-active={active || undefined}
    />
  ) : (
    <SidebarMenuButton
      asChild
      isActive={active}
      data-active={active || undefined}
    >
      <a {...props} />
    </SidebarMenuButton>
  )
}
function Button({
  depth,
  ...props
}: React.ComponentProps<"button"> & { depth: number }) {
  return depth > 0 ? (
    <SidebarMenuSubButton asChild data-active={undefined}>
      <button {...props} />
    </SidebarMenuSubButton>
  ) : (
    <SidebarMenuButton data-active={undefined} {...props} />
  )
}
function DisclosureTrigger({
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger>) {
  return (
    <CollapsibleTrigger {...props} asChild>
      <SidebarMenuButton>{children}</SidebarMenuButton>
    </CollapsibleTrigger>
  )
}
function Disclosure(props: CollapsibleProps) {
  return (
    <Collapsible
      {...props}
      slots={{
        Root: PrimitiveDisclosure,
        Trigger: DisclosureTrigger,
        Content: CollapsibleContent,
        ...props.slots,
      }}
    />
  )
}
function Indicator({
  className,
  ...props
}: React.ComponentProps<typeof ChevronRight>) {
  return (
    <ChevronRight
      {...props}
      className={cn(
        "ml-auto size-4 shrink-0 transition-transform data-[state=open]:rotate-90 motion-reduce:transition-none group-data-[collapsible=icon]:hidden",
        className
      )}
    />
  )
}
export const defaultSidebarSlots: SidebarSlots = {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Nav,
  List,
  Item,
  Label: SidebarGroupLabel,
  ItemLabel,
  Link,
  Button,
  Disclosure,
  Separator: SidebarSeparator,
  Indicator,
}

/** Plain docked navigation. Place inside the primitive SidebarProvider. */
export function Sidebar({ onNavigate, ...props }: SidebarProps) {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarCore
      defaultSlots={defaultSidebarSlots}
      {...props}
      onNavigate={(item, event) => {
        onNavigate?.(item, event)
        setOpenMobile(false)
      }}
    />
  )
}
