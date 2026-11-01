"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import { TabsCore, type TabsProps, type TabsSlots } from "../core"

const EnclosedRoot = ({
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

const FloatingRoot = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root
    className={cn("w-full flex flex-col gap-0", className)}
    {...props}
  />
)

const EnclosedList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "flex w-full items-end gap-1 border-b border-border bg-muted/30 px-3 pt-2.5",
      className
    )}
    {...props}
  />
)

const FloatingList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "flex w-full items-end gap-1 border-b border-border px-0 pt-2",
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
      "relative -mb-px inline-flex items-center gap-2 rounded-t-lg border border-transparent px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all cursor-pointer select-none outline-none hover:text-foreground hover:bg-muted/50",
      "data-[state=active]:border-t-border data-[state=active]:border-x-border data-[state=active]:border-b-transparent data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:shadow-2xs data-[state=active]:z-10",
      "data-[state=active]:after:absolute data-[state=active]:after:-bottom-px data-[state=active]:after:inset-x-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-background data-[state=active]:after:z-20",
      "focus-visible:ring-2 focus-visible:ring-ring/50",
      className
    )}
    {...props}
  />
)

const EnclosedContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn(
      "p-5 sm:p-6 text-sm text-foreground focus-visible:outline-hidden",
      className
    )}
    {...props}
  />
)

const FloatingContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn(
      "rounded-b-xl border border-border -mt-px bg-background p-5 sm:p-6 text-sm text-foreground shadow-2xs focus-visible:outline-hidden",
      className
    )}
    {...props}
  />
)

export const enclosedFolderTabsSlots: TabsSlots = {
  Root: EnclosedRoot,
  List: EnclosedList,
  Trigger,
  Content: EnclosedContent,
  Link: "a",
}

export const floatingFolderTabsSlots: TabsSlots = {
  Root: FloatingRoot,
  List: FloatingList,
  Trigger,
  Content: FloatingContent,
  Link: "a",
}

export type FolderTabsProps = TabsProps & {
  /**
   * Layout style of the folder tabs container:
   * - "enclosed" (default): Tabs hosted inside an enclosed window header strip.
   * - "floating": Classic folder tabs floating directly above a standalone bordered content card.
   */
  variant?: "enclosed" | "floating"
}

/**
 * Connected folder tabs component where rounded tabs smoothly merge with the content container.
 */
export function FolderTabs({
  variant = "enclosed",
  defaultSlots,
  ...props
}: FolderTabsProps) {
  const slotsToUse =
    defaultSlots ??
    (variant === "floating"
      ? floatingFolderTabsSlots
      : enclosedFolderTabsSlots)

  return (
    <TabsCore
      defaultSlots={slotsToUse}
      {...props}
    />
  )
}
