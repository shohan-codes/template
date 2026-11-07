"use client"

import { resolveSlots } from "../utilities/resolve-slots"
import type * as React from "react"
import { Fragment } from "react"
import type {
  Collapsible as Root,
  CollapsibleTrigger as Trigger,
  CollapsibleContent as Content,
} from "@workspace/shadcn-ui/components/collapsible"

export type CollapsibleSlots = Readonly<{
  Root: React.ElementType
  Trigger: React.ElementType
  Content: React.ElementType
  /** Optional so existing three-slot integrations remain valid. */
  Item?: React.ElementType
  Group?: React.ElementType
  GroupLabel?: React.ElementType
  Separator?: React.ElementType
  Custom?: React.ElementType
}>

type Entry = Readonly<{ id: string }>
type TriggerProps = React.ComponentProps<typeof Trigger>
type ContentProps = React.ComponentProps<typeof Content>

/** Groups organize content; disclosures add an independent expandable section. */
export type CollapsibleItemData =
  | (Entry & Readonly<{ type: "content"; content: React.ReactNode }>)
  | (Entry & Readonly<{ type: "custom"; content: React.ReactNode }>)
  | (Entry & Readonly<{ type: "separator" }>)
  | (Entry &
      Readonly<{
        type: "group"
        label: string
        items: readonly CollapsibleItemData[]
      }>)
  | (Entry &
      Readonly<{
        type: "disclosure"
        trigger: React.ReactNode
        items: readonly CollapsibleItemData[]
        open?: boolean
        defaultOpen?: boolean
        onOpenChange?: (open: boolean) => void
        disabled?: boolean
        $trigger?: TriggerProps
        $content?: ContentProps
      }>)

export type CollapsibleBaseProps = Omit<
  React.ComponentProps<typeof Root>,
  "children" | "asChild"
> & {
  readonly trigger: React.ReactNode
  /** Data-first content. IDs must be stable and unique within each sibling list. */
  readonly items?: readonly CollapsibleItemData[]
  /** Existing JSX composition remains supported; rendered after items when both are supplied. */
  readonly children?: React.ReactNode
  readonly slots?: Partial<CollapsibleSlots>
  readonly $trigger?: TriggerProps
  readonly $content?: ContentProps
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
  items,
  children,
  $trigger,
  $content,
  ...rootProps
}: CollapsibleCoreProps) {
  const P = resolveSlots(
    resolveSlots<Required<CollapsibleSlots>>(
      {
        ...defaultSlots,
        Item: "div",
        Group: "div",
        GroupLabel: "div",
        Separator: "hr",
        Custom: Fragment,
      },
      defaultSlots
    ),
    slots
  )

  function renderItems(
    entries: readonly CollapsibleItemData[]
  ): React.ReactNode {
    return entries.map((item) => {
      switch (item.type) {
        case "content":
          return <P.Item key={item.id}>{item.content}</P.Item>
        case "custom":
          return <P.Custom key={item.id}>{item.content}</P.Custom>
        case "separator":
          return <P.Separator key={item.id} role="separator" />
        case "group":
          return (
            <P.Group key={item.id} role="group" aria-label={item.label}>
              <P.GroupLabel>{item.label}</P.GroupLabel>
              {renderItems(item.items)}
            </P.Group>
          )
        case "disclosure":
          return (
            <CollapsibleCore
              key={item.id}
              defaultSlots={P}
              trigger={item.trigger}
              items={item.items}
              open={item.open}
              defaultOpen={item.defaultOpen}
              onOpenChange={item.onOpenChange}
              disabled={item.disabled}
              $trigger={item.$trigger}
              $content={item.$content}
            />
          )
      }
    })
  }

  // Preserve the original single child for consumers composing Content asChild.
  const content =
    items === undefined ? (
      children
    ) : (
      <>
        {renderItems(items)}
        {children}
      </>
    )

  return (
    <P.Root {...rootProps}>
      <P.Trigger type="button" {...$trigger}>
        {trigger}
      </P.Trigger>
      <P.Content {...$content}>
        {items !== undefined && $content?.asChild ? (
          <div>{content}</div>
        ) : (
          content
        )}
      </P.Content>
    </P.Root>
  )
}
