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
    className={cn("flex w-full flex-col gap-4", className)}
    {...props}
  />
)

const List = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex h-9 w-fit items-center rounded-lg border border-border/60 bg-muted/40 p-1 text-muted-foreground shadow-2xs backdrop-blur-xs",
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
      "inline-flex h-7 cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent px-3 text-xs font-medium whitespace-nowrap text-muted-foreground transition-all duration-150 outline-none select-none hover:text-foreground",
      "focus-visible:ring-2 focus-visible:ring-ring/50",
      "data-[state=active]:bg-background data-[state=active]:font-medium data-[state=active]:text-foreground data-[state=active]:shadow-xs",
      "dark:data-[state=active]:bg-secondary dark:data-[state=active]:text-foreground dark:data-[state=active]:shadow-xs",
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
      "w-full flex-1 text-sm outline-none focus-visible:outline-hidden",
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
  Link: "a",
}

export type SegmentedTabsProps = TabsProps & {
  /**
   * Whether to render with fully rounded capsule pill geometry instead of standard rounded-lg.
   * Defaults to true.
   */
  pill?: boolean
  /**
   * Whether the segmented control should expand to fill the full container width.
   * Defaults to false.
   */
  fullWidth?: boolean
}

/**
 * Segmented control component inspired by Apple/macOS and Linear design systems.
 */
export function SegmentedTabs({
  pill = true,
  fullWidth = false,
  defaultSlots = segmentedTabsSlots,
  className,
  $list,
  $trigger,
  ...props
}: SegmentedTabsProps) {
  return (
    <TabsCore
      defaultSlots={defaultSlots}
      className={cn("w-full", className)}
      $list={{
        ...$list,
        className: cn(
          fullWidth ? "grid w-full auto-cols-fr grid-flow-col" : "w-fit",
          pill && "rounded-full",
          $list?.className
        ),
      }}
      $trigger={{
        ...$trigger,
        className: cn(pill && "rounded-full px-3.5", $trigger?.className),
      }}
      {...props}
    />
  )
}
