"use client"

import type * as React from "react"
import type {
  Collapsible as Root,
  CollapsibleTrigger as Trigger,
  CollapsibleContent as Content,
} from "@workspace/shadcn-ui/components/collapsible"

export type CollapsibleSlots = Readonly<{
  Root: React.ElementType
  Trigger: React.ElementType
  Content: React.ElementType
}>

export type CollapsibleBaseProps = Omit<
  React.ComponentProps<typeof Root>,
  "children" | "asChild"
> & {
  readonly trigger: React.ReactNode
  readonly children: React.ReactNode
  readonly slots?: Partial<CollapsibleSlots>
  readonly $trigger?: React.ComponentProps<typeof Trigger>
  readonly $content?: React.ComponentProps<typeof Content>
}

export type CollapsibleCoreProps = CollapsibleBaseProps & {
  readonly defaultSlots: CollapsibleSlots
}
export type CollapsibleProps = CollapsibleBaseProps & {
  readonly defaultSlots?: CollapsibleSlots
}

/** Disclosure behavior comes from the injected primitives, including keyboard and ARIA state. */
export function CollapsibleCore({
  defaultSlots,
  slots,
  trigger,
  children,
  $trigger,
  $content,
  ...rootProps
}: CollapsibleCoreProps) {
  const P = { ...defaultSlots, ...slots }
  return (
    <P.Root {...rootProps}>
      <P.Trigger type="button" {...$trigger}>
        {trigger}
      </P.Trigger>
      <P.Content {...$content}>{children}</P.Content>
    </P.Root>
  )
}
