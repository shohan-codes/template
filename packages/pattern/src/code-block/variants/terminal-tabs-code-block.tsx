import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import { TerminalCodeBlock } from "./terminal-code-block"
import {
  MultiTabCodeBlockCore,
  type MultiTabCodeBlockProps,
  type MultiTabCodeBlockSlots,
} from "../multi-tab-core"

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

export const defaultTerminalTabsCodeBlockSlots: MultiTabCodeBlockSlots = {
  Root,
  TabsList,
  TabTrigger,
  CodeBlock: TerminalCodeBlock,
}

export type TerminalTabsCodeBlockProps = MultiTabCodeBlockProps

/**
 * Terminal-styled multi-tab CodeBlock with macOS traffic-light window dots alongside the tabs.
 */
export function TerminalTabsCodeBlock({
  defaultSlots: customDefaultSlots,
  ...props
}: TerminalTabsCodeBlockProps) {
  return (
    <MultiTabCodeBlockCore
      defaultSlots={customDefaultSlots ?? defaultTerminalTabsCodeBlockSlots}
      {...props}
    />
  )
}

