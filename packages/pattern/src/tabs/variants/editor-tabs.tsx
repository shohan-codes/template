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
      "w-full rounded-xl border border-border bg-background shadow-2xs overflow-hidden flex flex-col",
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
      "flex w-full items-stretch border-b border-border bg-muted/30",
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
      "relative -mb-px inline-flex h-9.5 items-center gap-2 border-r border-border border-b border-b-border px-4 text-xs font-medium text-muted-foreground transition-colors cursor-pointer select-none outline-none",
      "hover:bg-muted/50 hover:text-foreground",
      "data-[state=active]:border-b-transparent data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:z-10",
      "data-[state=active]:after:absolute data-[state=active]:after:-bottom-px data-[state=active]:after:inset-x-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-background data-[state=active]:after:z-20",
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
      "text-sm text-foreground focus-visible:outline-hidden",
      className
    )}
    {...props}
  />
)

export const editorTabsSlots: TabsSlots = {
  Root,
  List,
  Trigger,
  Content,
}

export type EditorTabsProps = TabsProps

/**
 * Modern code editor & IDE tab strip where tabs are flush and divided by vertical borders.
 */
export function EditorTabs(props: EditorTabsProps) {
  return (
    <TabsCore
      defaultSlots={editorTabsSlots}
      {...props}
    />
  )
}

