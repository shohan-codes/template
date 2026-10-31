import * as React from "react"
import { Terminal as TerminalIcon } from "lucide-react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  defaultCodeBlockSlots,
  type CodeBlockProps,
} from "./code-block"
import { CodeBlockCore, type CodeBlockSlots } from "../core"

export type TerminalIndicator = "prompt" | "macos" | (string & {})

export interface TerminalHeaderProps extends React.ComponentProps<"div"> {
  indicator?: TerminalIndicator | React.ReactNode
}

function getTerminalIndicator(indicator: TerminalHeaderProps["indicator"]) {
  switch (indicator) {
    case "macos":
    case "dots":
      return (
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-rose-500/90 border border-rose-600/30 shadow-xs" />
          <span className="size-2.5 rounded-full bg-amber-400/90 border border-amber-500/30 shadow-xs" />
          <span className="size-2.5 rounded-full bg-emerald-500/90 border border-emerald-600/30 shadow-xs" />
        </div>
      )
    case "prompt":
    case "cli":
      return (
        <TerminalIcon className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
      )
    default:
      return React.isValidElement(indicator) ? indicator : null
  }
}

/**
 * Terminal Header:
 * Window title bar supporting CLI prompt icon (`>_`) or macOS traffic-light window controls.
 */
export function TerminalHeader({
  indicator = "prompt",
  className,
  children,
  ...props
}: TerminalHeaderProps) {
  const indicatorNode = getTerminalIndicator(indicator)

  return (
    <div
      data-slot="code-block-header"
      className={cn(
        "flex min-h-9 min-w-0 shrink-0 items-center gap-2.5 border-b border-border bg-muted/50 px-3.5 py-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {indicatorNode}
      {children}
    </div>
  )
}

export const terminalSlots: CodeBlockSlots = {
  ...defaultCodeBlockSlots,
  Header: TerminalHeader,
}

export type TerminalProps = CodeBlockProps & {
  /**
   * Terminal header indicator:
   * - `"prompt"` (default): CLI prompt icon (`>_`)
   * - `"macos"`: 3 traffic-light window controls (`🔴 🟡 🟢`)
   * - Custom ReactNode icon
   */
  indicator?: TerminalIndicator | React.ReactNode
}

/**
 * Terminal CodeBlock with switchable indicator (CLI prompt icon or macOS window controls).
 */
export const Terminal = ({
  indicator = "prompt",
  $header,
  ...props
}: TerminalProps) => (
  <CodeBlockCore
    defaultSlots={terminalSlots}
    $header={{ indicator, ...$header }}
    {...props}
  />
)
