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
  type MultiTabCodeBlockCoreProps,
  type MultiTabCodeBlockProps,
  type MultiTabCodeBlockSlots,
} from "../core"

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root className={cn("w-full", className)} {...props} />
)

const DefaultTabsHeader = ({
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

const FolderTabsHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="code-block-header"
    className={cn(
      "flex min-h-10 min-w-0 shrink-0 items-end border-b border-border bg-muted/30 px-3 pt-2 text-muted-foreground",
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

const DefaultCodeBlockTabsBase = (props: CodeBlockProps) => (
  <CodeBlockCore
    defaultSlots={{
      ...defaultCodeBlockSlots,
      Header: DefaultTabsHeader,
      Actions: TabsActions,
    }}
    {...props}
  />
)

const FolderCodeBlockTabsBase = (props: CodeBlockProps) => (
  <CodeBlockCore
    defaultSlots={{
      ...defaultCodeBlockSlots,
      Header: FolderTabsHeader,
      Actions: TabsActions,
    }}
    {...props}
  />
)

const DefaultTabsList = ({
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

const FolderTabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "flex items-end gap-1 overflow-x-auto overflow-y-hidden scrollbar-none",
      className
    )}
    {...props}
  />
)

const DefaultTabTrigger = ({
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

const FolderTabTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      "relative -mb-px inline-flex items-center gap-2 rounded-t-lg border border-transparent px-3.5 py-1.5 font-mono text-xs text-muted-foreground transition-all cursor-pointer select-none outline-none hover:text-foreground hover:bg-muted/50",
      "data-[state=active]:border-t-border data-[state=active]:border-x-border data-[state=active]:border-b-transparent data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:z-10",
      "data-[state=active]:after:absolute data-[state=active]:after:-bottom-px data-[state=active]:after:inset-x-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-background data-[state=active]:after:z-20",
      "focus-visible:ring-2 focus-visible:ring-ring/50",
      className
    )}
    {...props}
  />
)

export const defaultCodeBlockTabsSlots: MultiTabCodeBlockSlots = {
  Root,
  TabsList: DefaultTabsList,
  TabTrigger: DefaultTabTrigger,
  CodeBlock: DefaultCodeBlockTabsBase,
}

export const folderCodeBlockTabsSlots: MultiTabCodeBlockSlots = {
  Root,
  TabsList: FolderTabsList,
  TabTrigger: FolderTabTrigger,
  CodeBlock: FolderCodeBlockTabsBase,
}

export type CodeBlockTabsVariant = "default" | "folder"

export type CodeBlockTabsProps = MultiTabCodeBlockProps & {
  /** Visual variant of the code tabs header. Defaults to "default". */
  variant?: CodeBlockTabsVariant
  /** Optional custom default slots override. */
  defaultSlots?: MultiTabCodeBlockSlots
}

/**
 * Multi-tab CodeBlock supporting classic IDE editor tabs and connected folder tabs.
 */
export const CodeBlockTabs = ({
  variant = "default",
  defaultSlots,
  ...props
}: CodeBlockTabsProps) => {
  const slotsToUse =
    defaultSlots ??
    (variant === "folder"
      ? folderCodeBlockTabsSlots
      : defaultCodeBlockTabsSlots)

  return (
    <MultiTabCodeBlockCore
      defaultSlots={slotsToUse}
      {...props}
    />
  )
}
