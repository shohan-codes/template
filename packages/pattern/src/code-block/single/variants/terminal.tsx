import * as React from "react"
import { Terminal as TerminalIcon } from "lucide-react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  defaultCodeBlockSlots,
  type CodeBlockProps,
} from "./code-block"
import { CodeBlockCore, type CodeBlockSlots } from "../core"

/**
 * Terminal Header:
 * CLI terminal window title bar featuring a terminal prompt icon.
 */
export function TerminalHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-header"
      className={cn(
        "flex min-h-9 min-w-0 shrink-0 items-center gap-2 border-b border-border bg-muted/50 px-3.5 py-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      <TerminalIcon className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
      {children}
    </div>
  )
}

export const terminalSlots: CodeBlockSlots = {
  ...defaultCodeBlockSlots,
  Header: TerminalHeader,
}

/** Backwards compatibility alias */
export const terminalCodeBlockSlots = terminalSlots

/**
 * Clean CLI Terminal CodeBlock with a terminal prompt icon.
 */
export const Terminal = (props: CodeBlockProps) => (
  <CodeBlockCore
    defaultSlots={terminalSlots}
    {...props}
  />
)

/** Backwards compatibility alias */
export const TerminalCodeBlock = Terminal
