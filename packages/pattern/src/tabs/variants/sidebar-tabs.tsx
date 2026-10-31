"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import { TabsCore, type TabsProps, type TabsSlots } from "../core"

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root
    className={cn(
      "flex w-full flex-col sm:flex-row gap-6 sm:gap-8 items-start",
      className
    )}
    {...props}
  />
)

const List = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "flex w-full sm:w-52 md:w-60 shrink-0 flex-col gap-1 sm:border-r sm:border-border/60 sm:pe-4",
      className
    )}
    {...props}
  />
)

const Trigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      "group relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-start text-xs font-medium text-muted-foreground transition-all cursor-pointer select-none outline-none hover:bg-muted/60 hover:text-foreground",
      "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold",
      "focus-visible:ring-2 focus-visible:ring-ring/50",
      className
    )}
    {...props}
  />
)

const Content = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn(
      "min-w-0 flex-1 text-sm text-foreground focus-visible:outline-hidden",
      className
    )}
    {...props}
  />
)

export const sidebarTabsSlots: TabsSlots = {
  Root,
  List,
  Trigger,
  Content,
}

export type SidebarTabsProps = TabsProps

/**
 * Vertical settings/preferences sidebar tabs layout inspired by Notion, Vercel, and Stripe dashboards.
 */
export function SidebarTabs({ orientation = "vertical", ...props }: SidebarTabsProps) {
  return (
    <TabsCore
      defaultSlots={sidebarTabsSlots}
      orientation={orientation}
      {...props}
    />
  )
}
