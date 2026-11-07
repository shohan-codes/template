"use client"

import {
  Collapsible as Root,
  CollapsibleTrigger as Trigger,
  CollapsibleContent as Content,
} from "@workspace/shadcn-ui/components/collapsible"
import {
  CollapsibleCore,
  type CollapsibleProps,
  type CollapsibleSlots,
} from "../core"

export const defaultCollapsibleSlots: CollapsibleSlots = {
  Root,
  Trigger,
  Content,
}

export function Collapsible(props: CollapsibleProps) {
  return <CollapsibleCore defaultSlots={defaultCollapsibleSlots} {...props} />
}
