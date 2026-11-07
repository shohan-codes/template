"use client"

import type * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  Collapsible as PrimitiveRoot,
  CollapsibleTrigger as PrimitiveTrigger,
  CollapsibleContent as PrimitiveContent,
} from "@workspace/shadcn-ui/components/collapsible"
import {
  CollapsibleCore,
  type CollapsibleProps,
  type CollapsibleSlots,
} from "../core"

function Root({
  className,
  ...props
}: React.ComponentProps<typeof PrimitiveRoot>) {
  return (
    <PrimitiveRoot
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
  children,
  asChild,
  ...props
}: React.ComponentProps<typeof PrimitiveTrigger>) {
  if (asChild)
    return (
      <PrimitiveTrigger asChild className={className} {...props}>
        {children}
      </PrimitiveTrigger>
    )
  return (
    <PrimitiveTrigger
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-start text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="min-w-0">{children}</span>
      <ChevronDown
        className="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </PrimitiveTrigger>
  )
}

function Content({
  className,
  ...props
}: React.ComponentProps<typeof PrimitiveContent>) {
  return (
    <PrimitiveContent
      className={cn("px-4 pt-1 pb-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export const defaultCollapsibleSlots: CollapsibleSlots = {
  Root,
  Trigger,
  Content,
}

/** Complete default presentation; customize slots only for exceptional layouts. */
export function Collapsible(props: CollapsibleProps) {
  return <CollapsibleCore defaultSlots={defaultCollapsibleSlots} {...props} />
}
