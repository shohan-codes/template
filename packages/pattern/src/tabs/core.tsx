"use client"

import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

/* ========================================================================== *\
 * Headless Tabs Core Component
 * ========================================================================== */

export type TabItemData = Readonly<{
  /** Unique identifier for the tab. */
  id: string
  /** Tab label rendered inside the trigger. */
  label: React.ReactNode
  /** Tab content rendered inside the panel. */
  content: React.ReactNode
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode
  /** Optional badge rendered after the label. */
  badge?: React.ReactNode
  /** Whether this tab is disabled. */
  disabled?: boolean
}>

export type TabsSlots = Readonly<{
  Root: React.ElementType
  List: React.ElementType
  Trigger: React.ElementType
  Content: React.ElementType
}>

export type TabsBaseProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "value" | "onChange"
> & {
  /** Array of tabs to render. */
  items: readonly TabItemData[]
  /** Controlled active tab ID. */
  value?: string
  /** Default active tab ID for uncontrolled usage. */
  defaultValue?: string
  /** Callback fired when the active tab changes. */
  onValueChange?: (value: string) => void
  /** Orientation of the tabs. Defaults to "horizontal". */
  orientation?: "horizontal" | "vertical"
  /** Activation mode of the tabs. Defaults to "automatic". */
  activationMode?: "automatic" | "manual"
  /** Slot overrides. */
  slots?: Partial<TabsSlots>
  /** Slot props passed to the List slot. */
  $list?: Record<string, unknown> & { className?: string }
  /** Slot props passed to the Trigger slots. */
  $trigger?: Record<string, unknown> & { className?: string }
  /** Slot props passed to the Content slots. */
  $content?: Record<string, unknown> & { className?: string }
  /** Extra content rendered next to the tabs list (e.g. actions). */
  actions?: React.ReactNode
}

export type TabsCoreProps = TabsBaseProps & {
  /** Injected default slots for loosely coupled primitives. */
  defaultSlots: TabsSlots
}

export type TabsProps = TabsBaseProps & {
  /** Optional custom default slots override. */
  defaultSlots?: TabsSlots
}

/**
 * Headless, data-driven Tabs core component.
 * Expects `defaultSlots` to be injected from outside, achieving loose coupling.
 */
export function TabsCore({
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
  actions,
  className,
  ...rootProps
}: TabsCoreProps) {
  if (items.length === 0) return null

  const P = slots ? { ...defaultSlots, ...slots } : defaultSlots

  const defaultTab = defaultValue ?? items[0]?.id

  const listNode = (
    <P.List
      {...$list}
      className={cn(
        orientation === "vertical" ? "flex-col items-stretch" : "items-center",
        $list?.className
      )}
    >
      {items.map((item) => (
        <P.Trigger
          key={item.id}
          value={item.id}
          disabled={item.disabled}
          {...$trigger}
          className={cn(
            "inline-flex items-center gap-2",
            $trigger?.className
          )}
        >
          {item.icon}
          <span>{item.label}</span>
          {item.badge}
        </P.Trigger>
      ))}
    </P.List>
  )

  return (
    <P.Root
      value={value}
      defaultValue={defaultTab}
      onValueChange={onValueChange}
      orientation={orientation}
      activationMode={activationMode}
      className={cn("w-full", className)}
      {...rootProps}
    >
      {actions ? (
        <div className="flex items-center justify-between gap-4">
          {listNode}
          <div data-slot="tabs-actions">{actions}</div>
        </div>
      ) : (
        listNode
      )}

      {items.map((item) => (
        <P.Content
          key={item.id}
          value={item.id}
          {...$content}
        >
          {item.content}
        </P.Content>
      ))}
    </P.Root>
  )
}

