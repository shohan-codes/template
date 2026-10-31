import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

/**
 * Default Editor Header:
 * A clean, modern editor title bar with a subtle bottom border and background.
 */
export function EditorHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-header"
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-2 border-b border-border bg-muted/40 px-3.5 py-1.5 text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

