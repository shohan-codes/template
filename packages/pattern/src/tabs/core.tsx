"use client"

import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

/* ========================================================================== *\
 * Headless Tabs Core Component
 * ========================================================================== */

export type TabItemData = Readonly<{
  /** Optional unique identifier for the tab. Auto-derived from value, href, label, or index if omitted. */
  id?: string
  /** Value identifier alias for the tab. */
  value?: string
  /** Tab label rendered inside the trigger. */
  label: React.ReactNode
  /** Tab content rendered inside the panel. Optional when used purely as navigation tabs. */
  content?: React.ReactNode
  /** Optional destination URL when using tabs as navigation links. */
  href?: string
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode
  /** Optional badge rendered after the label. */
  badge?: React.ReactNode
  /** Whether this tab is disabled. */
  disabled?: boolean
}>

/**
 * Resolves a unique string identifier for a tab item.
 * Falls back to value, href, slugified label, or the array index.
 */
export function getTabId(item: TabItemData, index: number = 0): string {
  if (item.id) return item.id
  if (item.value) return item.value
  if (item.href) return item.href
  if (typeof item.label === "string" && item.label.trim().length > 0) {
    const slug = item.label
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
    if (slug.length > 0) return slug
  }
  return String(index)
}

export type TabsSlots = Readonly<{
  Root: React.ElementType
  List: React.ElementType
  Trigger: React.ElementType
  Content: React.ElementType
  /** Optional Link slot for navigation tabs (e.g. Next.js Link). Defaults to "a". */
  Link?: React.ElementType
}>

export type TabsBaseProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "value" | "onChange"
> & {
  /** Array of tabs to render. */
  items: readonly TabItemData[]
  /** Controlled active tab ID. Accepts string, null, or undefined (e.g. from URL query/hash). */
  value?: string | null
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
  /** Slot props passed to the Link slots (e.g. scroll={false} for Next.js Link). */
  $link?: Record<string, unknown> & { className?: string }
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
  $link,
  actions,
  className,
  ...rootProps
}: TabsCoreProps) {
  if (items.length === 0) return null

  const LinkSlot = slots?.Link ?? defaultSlots?.Link ?? "a"
  const P = { ...defaultSlots, ...slots, Link: LinkSlot }

  const fallbackTab = defaultValue ?? (items[0] ? getTabId(items[0], 0) : undefined)
  const hasControlledValue = value !== undefined && value !== null
  const isValueValid =
    hasControlledValue &&
    items.some((item, index) => getTabId(item, index) === value)
  const resolvedValue = hasControlledValue
    ? isValueValid
      ? value
      : fallbackTab
    : undefined

  const listNode = (
    <P.List
      {...$list}
      className={cn(
        orientation === "vertical" ? "flex-col items-stretch" : "items-center",
        $list?.className
      )}
    >
      {items.map((item, index) => {
        const tabId = getTabId(item, index)
        const triggerContent = (
          <>
            {item.icon}
            <span>{item.label}</span>
            {item.badge}
          </>
        )

        return (
          <P.Trigger
            key={tabId}
            value={tabId}
            disabled={item.disabled}
            asChild={Boolean(item.href)}
            {...$trigger}
            className={cn(
              "inline-flex items-center gap-2",
              $trigger?.className
            )}
          >
            {item.href ? (
              <P.Link href={item.href} {...$link}>
                {triggerContent}
              </P.Link>
            ) : (
              triggerContent
            )}
          </P.Trigger>
        )
      })}
    </P.List>
  )

  return (
    <P.Root
      value={resolvedValue}
      defaultValue={fallbackTab}
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

      {items.map((item, index) => {
        if (item.content === undefined || item.content === null) {
          return null
        }
        const tabId = getTabId(item, index)
        return (
          <P.Content
            key={tabId}
            value={tabId}
            {...$content}
          >
            {item.content}
          </P.Content>
        )
      })}
    </P.Root>
  )
}

