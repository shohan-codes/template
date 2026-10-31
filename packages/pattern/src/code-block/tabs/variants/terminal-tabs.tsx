import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  Terminal,
  type TerminalIndicator,
} from "../../single/variants/terminal"
import {
  MultiTabCodeBlockCore,
  type MultiTabCodeBlockProps,
  type MultiTabCodeBlockSlots,
} from "../core"

const Root = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("w-full", className)} {...props} />
)

const TabsList = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex items-center gap-1 ms-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      className
    )}
    {...props}
  />
)

const TabTrigger = ({
  className,
  ...props
}: React.ComponentProps<"button">) => (
  <button
    className={cn(
      "inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs text-muted-foreground transition-all hover:text-foreground hover:bg-muted/50 focus-visible:outline-hidden",
      "data-[state=active]:bg-background/80 data-[state=active]:text-foreground data-[state=active]:shadow-2xs data-[state=active]:border data-[state=active]:border-border/60",
      className
    )}
    {...props}
  />
)

export const defaultTerminalTabsSlots: MultiTabCodeBlockSlots = {
  Root,
  TabsList,
  TabTrigger,
  CodeBlock: Terminal,
}

export type TerminalTabsProps = MultiTabCodeBlockProps & {
  /**
   * Terminal header indicator:
   * - `"prompt"` (default): CLI prompt icon (`>_`)
   * - `"macos"`: 3 traffic-light window controls (`🔴 🟡 🟢`)
   * - Custom ReactNode icon
   */
  indicator?: TerminalIndicator | React.ReactNode
}

/**
 * Terminal multi-tab CodeBlock with switchable indicator (CLI prompt or macOS window controls).
 */
export const TerminalTabs = ({
  indicator = "prompt",
  $codeBlock,
  ...props
}: TerminalTabsProps) => (
  <MultiTabCodeBlockCore
    defaultSlots={defaultTerminalTabsSlots}
    $codeBlock={{
      ...$codeBlock,
      $header: { indicator, ...$codeBlock?.$header },
    }}
    {...props}
  />
)
