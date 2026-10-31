"use client"

import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

/* ========================================================================== *\
 * Accordion Factory
 * ========================================================================== */

/**
 * Creates a data-driven Accordion with optional replacements for its four main primitives.
 */
export function createAccordion<const TPrimitives extends AccordionPrimitives>(
  defaultPrimitives: TPrimitives,
  slots?: Partial<TPrimitives>
) {
  const P = { ...defaultPrimitives, ...slots }

  function Accordion(props: AccordionProps<TPrimitives>) {
    const {
      items,
      $item,
      $trigger,
      $content,
      mode,
      value,
      defaultValue,
      onValueChange,
      collapsible,
      ...$root
    } = props

    if (items.length === 0) return null

    const rootBehaviorProps: AccordionRootBehaviorProps =
      mode === "multiple"
        ? { type: "multiple", value, defaultValue, onValueChange }
        : { type: "single", value, defaultValue, onValueChange, collapsible: collapsible ?? true }

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
                className={cn("flex min-w-0 items-center gap-2", $trigger?.className)}
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

  return Accordion
}

/* ========================================================================== *\
 * Accordion Types
 * ========================================================================== */

export type AccordionPrimitives = Readonly<{
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

type AccordionBehaviorProps = AccordionSingleProps | AccordionMultipleProps

type AccordionRootBehaviorProps =
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

export type AccordionProps<TPrimitives extends AccordionPrimitives> = Omit<
  React.ComponentPropsWithoutRef<TPrimitives["Root"]>,
  "children" | "type" | "value" | "defaultValue" | "onValueChange" | "collapsible"
> & {
  items: readonly AccordionItemData[]
  $item?: Omit<
    React.ComponentPropsWithoutRef<TPrimitives["Item"]>,
    "children" | "value" | "disabled"
  >
  $trigger?: Omit<
    React.ComponentPropsWithoutRef<TPrimitives["Trigger"]>,
    "children" | "asChild"
  > & { className?: string }
  $content?: Omit<
    React.ComponentPropsWithoutRef<TPrimitives["Content"]>,
    "children" | "asChild"
  >
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
