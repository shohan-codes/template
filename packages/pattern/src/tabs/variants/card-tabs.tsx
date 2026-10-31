"use client"

import * as React from "react"
import { Card } from "@workspace/shadcn-ui"
import {
  Tabs as RootPrimitive,
  TabsList as ListPrimitive,
  TabsTrigger as TriggerPrimitive,
  TabsContent as ContentPrimitive,
} from "@workspace/shadcn-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import { TabsCore, type TabsProps, type TabsSlots } from "../core"

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof RootPrimitive>) => (
  <Card className="w-full bg-card/20 overflow-hidden border shadow-sm">
    <RootPrimitive
      className={cn("w-full flex flex-col gap-0", className)}
      {...props}
    />
  </Card>
)

const List = ({
  className,
  ...props
}: React.ComponentProps<typeof ListPrimitive>) => (
  <div className="flex w-full items-center border-b border-border bg-muted/20 px-3 py-2 sm:px-4">
    <ListPrimitive
      className={cn("h-8 bg-muted/60 p-0.5", className)}
      {...props}
    />
  </div>
)

const Trigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TriggerPrimitive>) => (
  <TriggerPrimitive
    className={cn(
      "px-3 text-xs font-medium",
      className
    )}
    {...props}
  />
)

const Content = ({
  className,
  ...props
}: React.ComponentProps<typeof ContentPrimitive>) => (
  <ContentPrimitive
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
