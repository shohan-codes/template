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
      "inline-flex h-9 items-center rounded-lg border border-border/60 bg-muted/40 p-1 text-muted-foreground shadow-2xs backdrop-blur-xs",
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
      "inline-flex h-7 items-center justify-center gap-2 rounded-md border border-transparent px-3 text-xs font-medium whitespace-nowrap text-muted-foreground transition-all duration-150 select-none cursor-pointer outline-none hover:text-foreground",
      "focus-visible:ring-2 focus-visible:ring-ring/50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:border-border/80 data-[state=active]:shadow-xs dark:data-[state=active]:bg-card dark:data-[state=active]:border-border/70",
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

export type SegmentedTabsProps = TabsProps & {
  /**
   * Whether to render with fully rounded capsule pill geometry instead of standard rounded-lg.
   * Defaults to false.
   */
  pill?: boolean
}

/**
 * Segmented control component inspired by Apple/macOS and Linear design systems.
 */
export function SegmentedTabs({
  pill = false,
  $list,
  $trigger,
  ...props
}: SegmentedTabsProps) {
  return (
    <TabsCore
      defaultSlots={segmentedTabsSlots}
      $list={{
        ...$list,
        className: cn(pill && "rounded-full", $list?.className),
      }}
      $trigger={{
        ...$trigger,
        className: cn(pill && "rounded-full px-3.5", $trigger?.className),
      }}
      {...props}
    />
  )
}
