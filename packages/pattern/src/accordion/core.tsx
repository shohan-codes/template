"use client"

import * as React from "react"

import { cn } from "@workspace/shadcn-ui/lib/utils"

/* ========================================================================== *\
 * Accordion Factory
 * ========================================================================== */

/**
 * Creates a data-driven Accordion with optional replacements for its four
 * main primitives. Advanced customization can use the raw Radix primitives.
 */
export function createAccordion<
  const TPrimitives extends AccordionPrimitives,
>(
  defaultPrimitives: TPrimitives,
  slots?: {
    Root?: TPrimitives["Root"]
    Item?: TPrimitives["Item"]
    Trigger?: TPrimitives["Trigger"]
    Content?: TPrimitives["Content"]
  }
) {
  const Root = slots?.Root ?? defaultPrimitives.Root
  const Item = slots?.Item ?? defaultPrimitives.Item
  const Trigger = slots?.Trigger ?? defaultPrimitives.Trigger
  const Content = slots?.Content ?? defaultPrimitives.Content

  function Accordion(
    props: AccordionProps<
      TPrimitives["Root"],
      TPrimitives["Item"],
      TPrimitives["Trigger"],
      TPrimitives["Content"]
    >
  ) {
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

    const content = items.map((item, index) => {
      const value = item.id ?? String(index)

      return (
        <Item
          {...$item}
          key={value}
          value={value}
          disabled={item.disabled}
        >
          <Trigger
            key="trigger"
            {...$trigger}
            className={cn("flex min-w-0 items-center gap-2", $trigger?.className)}
          >
            {item.icon}
            {item.title}
            {item.badge}
          </Trigger>

          <Content key="content" {...$content}>
            {item.content}
          </Content>
        </Item>
      )
    })

    const rootBehaviorProps: AccordionRootBehaviorProps =
      mode === "multiple"
        ? {
            type: "multiple",
            value,
            defaultValue,
            onValueChange,
          }
        : {
            type: "single",
            value,
            defaultValue,
            onValueChange,
            collapsible: collapsible ?? true,
          }

    return (
      <Root {...$root} {...rootBehaviorProps}>
        {content}
      </Root>
    )
  }

  return Accordion
}

/* ========================================================================== *\
 * Accordion Types
 * ========================================================================== */

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

export type AccordionProps<
  TRoot extends React.ElementType = React.ElementType,
  TItem extends React.ElementType = React.ElementType,
  TTrigger extends React.ElementType = React.ElementType,
  TContent extends React.ElementType = React.ElementType,
> = Omit<
  React.ComponentPropsWithoutRef<TRoot>,
  | "children"
  | "type"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "collapsible"
> & {
  items: readonly AccordionItemData[]
  $item?: Omit<
    React.ComponentPropsWithoutRef<TItem>,
    "children" | "value" | "disabled"
  >
  $trigger?: Omit<
    React.ComponentPropsWithoutRef<TTrigger>,
    "children" | "asChild"
  > & { className?: string }
  $content?: Omit<
    React.ComponentPropsWithoutRef<TContent>,
    "children" | "asChild"
  >
} & AccordionBehaviorProps

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



/** The four main primitives used by the data-driven Accordion. */
export type AccordionPrimitives<
  TRoot extends React.ElementType = React.ElementType,
  TItem extends React.ElementType = React.ElementType,
  TTrigger extends React.ElementType = React.ElementType,
  TContent extends React.ElementType = React.ElementType,
> = Readonly<{
  Root: TRoot
  Item: TItem
  Trigger: TTrigger
  Content: TContent
}>

/** Data for one item in the data-driven Accordion. */
type AccordionItemData = Readonly<{
  id?: string
  icon?: React.ReactNode
  title: React.ReactNode
  badge?: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}>
