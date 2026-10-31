import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

/**
 * Terminal Header:
 * macOS terminal window title bar featuring 3 traffic-light window controls.
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
        "flex min-h-9 min-w-0 shrink-0 items-center gap-3 border-b border-border bg-muted/50 px-3.5 py-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-rose-500/90 border border-rose-600/30 shadow-xs" />
        <span className="size-2.5 rounded-full bg-amber-400/90 border border-amber-500/30 shadow-xs" />
        <span className="size-2.5 rounded-full bg-emerald-500/90 border border-emerald-600/30 shadow-xs" />
      </div>
      {children}
    </div>
  )
}

