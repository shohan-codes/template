"use client"

import type * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import type {
  Collapsible as PrimitiveRoot,
  CollapsibleTrigger as PrimitiveTrigger,
  CollapsibleContent as PrimitiveContent,
} from "@workspace/shadcn-ui/components/collapsible"
import {
  CollapsibleCore,
  type CollapsibleProps,
  type CollapsibleSlots,
} from "../core"
import { defaultCollapsibleSlots } from "./default-collapsible"

function Root({
  className,
  ...props
}: React.ComponentProps<typeof PrimitiveRoot>) {
  const RootSlot = defaultCollapsibleSlots.Root
  return (
    <RootSlot
      className={cn(
        "rounded-xl border bg-card text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

function Trigger({
  className,
  ...props
}: React.ComponentProps<typeof PrimitiveTrigger>) {
  const TriggerSlot = defaultCollapsibleSlots.Trigger
  return (
    <TriggerSlot
      className={cn(!props.asChild && "rounded-xl px-4 py-3", className)}
      {...props}
    />
  )
}

function Content({
  className,
  ...props
}: React.ComponentProps<typeof PrimitiveContent>) {
  const ContentSlot = defaultCollapsibleSlots.Content
  return <ContentSlot className={cn("px-4 pb-4", className)} {...props} />
}

export const cardCollapsibleSlots: CollapsibleSlots = {
  ...defaultCollapsibleSlots,
  Root,
  Trigger,
  Content,
}

/** The original card presentation, now an explicit opt-in variant. */
export function CardCollapsible({
  defaultSlots = cardCollapsibleSlots,
  ...props
}: CollapsibleProps) {
  return <CollapsibleCore defaultSlots={defaultSlots} {...props} />
}
