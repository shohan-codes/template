"use client"

import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import type { CodeBlockCoreProps } from "../single/core"

/* ========================================================================== *\
 * MultiTab CodeBlock Core Types
 * ========================================================================== */

export type CodeTab = Readonly<{
  /** Unique identifier for the tab (e.g. "pnpm", "app/page.tsx"). */
  id: string
  /** Tab label rendered inside the tab trigger. */
  label: React.ReactNode
  /** Code string to display and highlight. */
  code: string
  /** Programming language identifier (e.g. "typescript", "bash"). */
  language?: string
  /** Optional icon rendered next to the label. */
  icon?: React.ReactNode
  /** Whether to parse Fumadocs/Shiki notations in this tab. Defaults to true. */
  notations?: boolean
  /** Whether to auto-detect diffs in this tab. */
  diff?: boolean
  /** Lines to highlight in this tab. */
  highlightLines?: readonly number[] | string
  /** Added lines in this tab. */
  addedLines?: readonly number[] | string
  /** Removed lines in this tab. */
  removedLines?: readonly number[] | string
  /** Whether to exclude removed lines on copy. */
  filterRemovedOnCopy?: boolean
  /** Line numbers for this tab. */
  lineNumbers?: boolean
  /** Starting line number for this tab. */
  startLine?: number
  /** Line wrapping for this tab. */
  wrap?: boolean
}>

export type MultiTabCodeBlockSlots = Readonly<{
  Root: React.ElementType
  TabsList: React.ElementType
  TabTrigger: React.ElementType
  CodeBlock: React.ElementType
}>

export type MultiTabCodeBlockBaseProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "onChange"
> & {
  /** Array of tabs to display. */
  tabs: readonly CodeTab[]
  /** Controlled active tab ID. */
  value?: string
  /** Uncontrolled default active tab ID. */
  defaultValue?: string
  /** Callback fired when the active tab changes. */
  onValueChange?: (tabId: string) => void
  /** Runtime slot overrides passed per instance. */
  slots?: Partial<MultiTabCodeBlockSlots>
  /** Extra actions to display next to the copy button. */
  actions?: React.ReactNode
  /** Footer content rendered below the code content. */
  footer?: React.ReactNode
  /** Whether to show the copy button. Defaults to true. */
  copyable?: boolean
  /** Default language for tabs that do not specify one. */
  language?: string
  /** Default lineNumbers setting for tabs that do not specify one. */
  lineNumbers?: boolean
  /** Default wrap setting for tabs that do not specify one. */
  wrap?: boolean
  /** Slot props passed directly to the TabsList primitive. */
  $tabsList?: Record<string, unknown> & { className?: string }
  /** Slot props passed directly to the TabTrigger primitive. */
  $tabTrigger?: Record<string, unknown> & { className?: string }
  /** Slot props passed directly to the underlying CodeBlock component. */
  $codeBlock?: Partial<CodeBlockCoreProps>
}

export type MultiTabCodeBlockCoreProps = MultiTabCodeBlockBaseProps & {
  /** Injected default slots for loosely coupled primitives. */
  defaultSlots: MultiTabCodeBlockSlots
}

export type MultiTabCodeBlockProps = MultiTabCodeBlockBaseProps

/* ========================================================================== *\
 * Headless MultiTab CodeBlock Core Component
 * ========================================================================== */

function PassThroughTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center self-stretch overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Headless MultiTab CodeBlock Core component.
 * Manages only tab state, selection, and navigation, delegating code rendering
 * directly to an injected CodeBlock slot without duplicating syntax highlighting.
 */
export function MultiTabCodeBlockCore({
  tabs,
  value,
  defaultValue,
  onValueChange,
  defaultSlots,
  slots,
  actions,
  footer,
  copyable = true,
  language,
  lineNumbers,
  wrap,
  $tabsList,
  $tabTrigger,
  $codeBlock,
  className,
  ...rootProps
}: MultiTabCodeBlockCoreProps) {
  const [uncontrolledId, setUncontrolledId] = React.useState<string>(
    () => value ?? defaultValue ?? tabs?.[0]?.id ?? ""
  )

  const activeId = value !== undefined ? value : uncontrolledId

  const handleTabChange = React.useCallback(
    (newId: string) => {
      if (value === undefined) {
        setUncontrolledId(newId)
      }
      onValueChange?.(newId)
    },
    [value, onValueChange]
  )

  if (!tabs || tabs.length === 0) return null

  const P = slots ? { ...defaultSlots, ...slots } : defaultSlots

  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0]
  if (!activeTab) return null

  const tabsListNode = (
    <P.TabsList
      {...$tabsList}
      className={cn("flex items-center", $tabsList?.className)}
    >
      {tabs.map((tab) => (
        <P.TabTrigger
          key={tab.id}
          value={tab.id}
          onClick={() => handleTabChange(tab.id)}
          {...$tabTrigger}
          className={cn(
            "inline-flex items-center gap-1.5 select-none transition-colors",
            $tabTrigger?.className
          )}
        >
          {tab.icon}
          {tab.label}
        </P.TabTrigger>
      ))}
    </P.TabsList>
  )

  return (
    <P.Root
      value={activeId}
      onValueChange={handleTabChange}
      className={cn("w-full", className)}
      {...rootProps}
    >
      <P.CodeBlock
        code={activeTab.code}
        language={activeTab.language ?? language}
        title={tabsListNode}
        actions={actions}
        footer={footer}
        copyable={copyable}
        lineNumbers={activeTab.lineNumbers ?? lineNumbers}
        startLine={activeTab.startLine}
        wrap={activeTab.wrap ?? wrap}
        notations={activeTab.notations}
        diff={activeTab.diff}
        highlightLines={activeTab.highlightLines}
        addedLines={activeTab.addedLines}
        removedLines={activeTab.removedLines}
        filterRemovedOnCopy={activeTab.filterRemovedOnCopy}
        {...$codeBlock}
        slots={{
          Title: PassThroughTitle,
          ...$codeBlock?.slots,
        }}
      />
    </P.Root>
  )
}

