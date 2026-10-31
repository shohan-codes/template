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
    className={cn("w-full flex flex-col gap-0", className)}
    {...props}
  />
)

const List = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "flex w-full items-end gap-1 border-b border-border px-2 pt-2",
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
      "relative -mb-px inline-flex items-center gap-2 rounded-t-lg border border-transparent px-4 py-2 text-xs font-medium text-muted-foreground transition-colors cursor-pointer select-none outline-none hover:text-foreground hover:bg-muted/40",
      "data-[state=active]:border-border data-[state=active]:border-b-background data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:font-medium",
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
      "rounded-b-lg rounded-tr-lg border border-border bg-background p-5 text-sm text-foreground shadow-2xs focus-visible:outline-hidden",
      className
    )}
    {...props}
  />
)

export const folderTabsSlots: TabsSlots = {
  Root,
  List,
  Trigger,
  Content,
}

export type FolderTabsProps = TabsProps

/**
 * Connected folder tabs component where the active tab smoothly merges with the content container.
 */
export function FolderTabs(props: FolderTabsProps) {
  return (
    <TabsCore
      defaultSlots={folderTabsSlots}
      {...props}
    />
  )
}
