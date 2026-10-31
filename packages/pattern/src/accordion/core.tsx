"use client"

import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

/* ========================================================================== *\
 * Headless Accordion Core Component
 * ========================================================================== */

/**
 * Headless, data-driven Accordion core component.
 * Expects `defaultSlots` to be injected from outside, achieving loose coupling.
 */
export function AccordionCore({
  items,
  defaultSlots,
  slots,
  $item,
  $trigger,
  $content,
  mode,
  value,
  defaultValue,
  onValueChange,
  collapsible,
  ...$root
}: AccordionCoreProps) {
  if (items.length === 0) return null

  const P = slots ? { ...defaultSlots, ...slots } : defaultSlots

  const rootBehaviorProps: AccordionRootBehaviorProps =
    mode === "multiple"
      ? { type: "multiple", value, defaultValue, onValueChange }
      : {
          type: "single",
          value,
          defaultValue,
          onValueChange,
          collapsible: collapsible ?? true,
        }

  return (
    <P.Root {...$root} {...rootBehaviorProps}>
      {items.map((item, index) => {
        const itemValue = item.id ?? String(index)

        return (
          <P.Item
            {...$item}
            key={itemValue}
            value={itemValue}
            disabled={item.disabled}
          >
            <P.Trigger
              key="trigger"
              {...$trigger}
              className={cn(
                "flex min-w-0 items-center gap-2",
                $trigger?.className
              )}
            >
              {item.icon}
              {item.title}
              {item.badge}
            </P.Trigger>

            <P.Content key="content" {...$content}>
              {item.content}
            </P.Content>
          </P.Item>
        )
      })}
    </P.Root>
  )
}

/* ========================================================================== *\
 * Accordion Types
 * ========================================================================== */

export type AccordionSlots = Readonly<{
  Root: React.ElementType
  Item: React.ElementType
  Trigger: React.ElementType
  Content: React.ElementType
}>

type AccordionSingleProps = {
  mode?: "single"
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  collapsible?: boolean
}

type AccordionMultipleProps = {
  mode: "multiple"
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  collapsible?: never
}

export type AccordionBehaviorProps = AccordionSingleProps | AccordionMultipleProps

export type AccordionRootBehaviorProps =
  | {
      type: "single"
      value?: string
      defaultValue?: string
      onValueChange?: (value: string) => void
      collapsible: boolean
    }
  | {
      type: "multiple"
      value?: string[]
      defaultValue?: string[]
      onValueChange?: (value: string[]) => void
    }

export type AccordionBaseProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "onValueChange"
> & {
  items: readonly AccordionItemData[]
  /** Runtime slot overrides passed per instance. */
  slots?: Partial<AccordionSlots>
  /** Slot props passed directly to the Item primitive. */
  $item?: Record<string, unknown>
  /** Slot props passed directly to the Trigger primitive. */
  $trigger?: Record<string, unknown> & { className?: string }
  /** Slot props passed directly to the Content primitive. */
  $content?: Record<string, unknown>
}

export type AccordionCoreProps = AccordionBaseProps & {
  /** Injected default slots for loosely coupled primitives. */
  defaultSlots: AccordionSlots
} & AccordionBehaviorProps

export type AccordionProps = AccordionBaseProps & {
  /** Optional custom default slots override. */
  defaultSlots?: AccordionSlots
} & AccordionBehaviorProps

/** Data for one item in the data-driven Accordion. */
export type AccordionItemData = Readonly<{
  id?: string
  icon?: React.ReactNode
  title: React.ReactNode
  badge?: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}>
