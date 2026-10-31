import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  defaultCodeBlockSlots,
  type CodeBlockProps,
} from "../../single/variants/code-block"
import { CodeBlockCore } from "../../single/core"
import {
  MultiTabCodeBlockCore,
  type MultiTabCodeBlockProps,
  type MultiTabCodeBlockSlots,
} from "../core"

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root className={cn("w-full", className)} {...props} />
)

const TabsHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="code-block-header"
    className={cn(
      "flex min-h-9 min-w-0 shrink-0 items-stretch border-b border-border bg-muted/20 px-0 py-0 text-muted-foreground",
      className
    )}
    {...props}
  />
)

const TabsActions = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="code-block-actions"
    className={cn(
      "ms-auto flex shrink-0 items-center gap-1 pe-3 my-auto",
      className
    )}
    {...props}
  />
)

const CodeBlockTabsBase = (props: CodeBlockProps) => (
  <CodeBlockCore
    defaultSlots={{
      ...defaultCodeBlockSlots,
      Header: TabsHeader,
      Actions: TabsActions,
    }}
    {...props}
  />
)

const TabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "flex h-full items-stretch overflow-x-auto overflow-y-hidden scrollbar-none",
      className
    )}
    {...props}
  />
)

const TabTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex h-9 items-center gap-2 border-r border-border px-4 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/30 focus-visible:outline-hidden cursor-pointer shrink-0 select-none",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:shadow-2xs",
      className
    )}
    {...props}
  />
)

export const defaultCodeBlockTabsSlots: MultiTabCodeBlockSlots = {
  Root,
  TabsList,
  TabTrigger,
  CodeBlock: CodeBlockTabsBase,
}

/**
 * Editor-styled multi-tab CodeBlock where tabs are rendered as classic file editor tabs.
 */
export const CodeBlockTabs = (props: MultiTabCodeBlockProps) => (
  <MultiTabCodeBlockCore
    defaultSlots={defaultCodeBlockTabsSlots}
    {...props}
  />
)
