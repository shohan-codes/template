"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { Card } from "@workspace/shadcn-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import { TabsCore, type TabsProps, type TabsSlots } from "../core"

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) => (
  <Card className="w-full bg-card/20 overflow-hidden border shadow-sm">
    <TabsPrimitive.Root
      className={cn("w-full flex flex-col gap-0", className)}
      {...props}
    />
  </Card>
)

const List = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <div className="flex w-full items-center border-b border-border bg-muted/20 px-3 py-2 sm:px-4">
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-8 items-center rounded-lg border border-border/60 bg-muted/60 p-0.5 text-muted-foreground",
        className
      )}
      {...props}
    />
  </div>
)

const Trigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex h-7 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 text-xs font-medium whitespace-nowrap text-muted-foreground transition-all duration-150 select-none cursor-pointer outline-none hover:text-foreground",
      "focus-visible:ring-2 focus-visible:ring-ring/50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-border/80 data-[state=active]:shadow-xs",
      "dark:data-[state=active]:bg-secondary dark:data-[state=active]:text-foreground dark:data-[state=active]:border-border/70 dark:data-[state=active]:shadow-xs",
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
      "p-4 sm:p-6 text-sm text-foreground focus-visible:outline-hidden",
      className
    )}
    {...props}
  />
)

export const cardTabsSlots: TabsSlots = {
  Root,
  List,
  Trigger,
  Content,
}

export type CardTabsProps = TabsProps

/**
 * Card-styled Tabs where the tabs list is hosted inside an enclosed card header
 * and active panel content is displayed within a card body.
 */
export function CardTabs(props: CardTabsProps) {
  return (
    <TabsCore
      defaultSlots={cardTabsSlots}
      {...props}
    />
  )
}

