"use client"

import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import type { TabsSlots, TypedTabsBaseProps } from "./core"

// Custom JavaScript consumers may bypass the type contract. Remove primitive-owned
// attributes instead of passing undefined: Radix needs to generate its own IDs/ARIA.
function safeSlotProps(
  props: object | undefined,
  protectedKeys: readonly string[]
): Record<string, unknown> {
  const safe: Record<string, unknown> = { ...props }
  for (const key of protectedKeys) delete safe[key]
  return safe
}

const ownedContentProps = ["children", "asChild", "dangerouslySetInnerHTML"]
const ownedTriggerProps = [
  ...ownedContentProps,
  "value",
  "disabled",
  "type",
  "role",
  "id",
  "aria-label",
  "aria-controls",
  "aria-selected",
  "aria-disabled",
  "tabIndex",
]
const ownedPanelProps = [
  ...ownedContentProps,
  "value",
  "role",
  "id",
  "aria-labelledby",
  "tabIndex",
]

/** Strict selection implementation. Legacy URL navigation stays in its original path. */
export function TypedTabsCore({
  mode: _mode,
  items,
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  activationMode = "automatic",
  defaultSlots,
  slots,
  $list,
  $trigger,
  $content,
  $link: _link,
  actions,
  className,
  ...rootProps
}: TypedTabsBaseProps & { defaultSlots: TabsSlots }) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const controlled = value !== undefined && value !== null
  const requestedValue = controlled ? value : uncontrolledValue
  const enabledItems = items.filter((item) => !item.disabled)
  const fallbackValue = enabledItems.some((item) => item.id === defaultValue)
    ? defaultValue!
    : (enabledItems[0]?.id ?? "")
  const resolvedValue = enabledItems.some((item) => item.id === requestedValue)
    ? requestedValue!
    : fallbackValue

  if (items.length === 0) return null

  const P = { ...defaultSlots, ...slots }
  const handleValueChange = (nextValue: string) => {
    if (
      nextValue === resolvedValue ||
      !enabledItems.some((item) => item.id === nextValue)
    ) {
      return
    }
    if (!controlled) setUncontrolledValue(nextValue)
    onValueChange?.(nextValue)
  }

  const listNode = (
    <P.List
      {...safeSlotProps($list, [...ownedContentProps, "role"])}
      asChild={false}
      role="tablist"
      dangerouslySetInnerHTML={undefined}
      className={cn(
        "max-w-full min-w-0",
        orientation === "vertical"
          ? "flex-col items-stretch"
          : "items-center overflow-x-auto overflow-y-hidden",
        $list?.className
      )}
    >
      {items.map((item) => (
        <P.Trigger
          {...safeSlotProps($trigger, ownedTriggerProps)}
          key={item.id}
          value={item.id}
          disabled={item.disabled}
          asChild={false}
          type="button"
          role="tab"
          dangerouslySetInnerHTML={undefined}
          aria-label={item["aria-label"]}
          className={cn("inline-flex items-center gap-2", $trigger?.className)}
        >
          <React.Fragment key="icon">{item.icon}</React.Fragment>
          <span key="label">{item.label}</span>
          <React.Fragment key="badge">{item.badge}</React.Fragment>
        </P.Trigger>
      ))}
    </P.List>
  )

  return (
    <P.Root
      {...rootProps}
      asChild={false}
      dangerouslySetInnerHTML={undefined}
      value={resolvedValue}
      defaultValue={undefined}
      onValueChange={handleValueChange}
      orientation={orientation}
      activationMode={activationMode}
      className={cn("w-full", className)}
    >
      {actions ? (
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-4">
          {listNode}
          <div data-slot="tabs-actions">{actions}</div>
        </div>
      ) : (
        listNode
      )}
      {items.map((item) => (
        <P.Content
          {...safeSlotProps($content, ownedPanelProps)}
          key={item.id}
          value={item.id}
          asChild={false}
          role="tabpanel"
          dangerouslySetInnerHTML={undefined}
        >
          {item.content}
        </P.Content>
      ))}
    </P.Root>
  )
}
