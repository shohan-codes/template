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
    className={cn("w-full flex flex-col gap-4", className)}
    {...props}
  />
)

const List = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex w-fit items-center rounded-full border border-border/50 bg-muted/70 p-1 text-muted-foreground backdrop-blur-xs shadow-2xs",
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
      "inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap text-muted-foreground transition-all duration-200 select-none cursor-pointer outline-none hover:text-foreground",
      "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:shadow-xs data-[state=active]:border-border/40",
      "disabled:pointer-events-none disabled:opacity-50",
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
      "flex-1 text-sm outline-none focus-visible:outline-hidden",
      className
    )}
    {...props}
  />
)

export const segmentedTabsSlots: TabsSlots = {
  Root,
  List,
  Trigger,
  Content,
}

export type SegmentedTabsProps = TabsProps

/**
 * Segmented pill tabs component inspired by Apple/macOS and Linear design systems.
 */
export function SegmentedTabs(props: SegmentedTabsProps) {
  return (
    <TabsCore
      defaultSlots={segmentedTabsSlots}
      {...props}
    />
  )
}
