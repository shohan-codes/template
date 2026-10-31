import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

/**
 * Tab Header:
 * VS Code style active tab title bar where the file title is enclosed in an editor tab.
 */
export function TabHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-header"
      className={cn(
        "flex min-w-0 shrink-0 items-center border-b border-border bg-muted/20 px-0 py-0 text-muted-foreground [&>[data-slot=code-block-title]]:inline-flex [&>[data-slot=code-block-title]]:items-center [&>[data-slot=code-block-title]]:border-r [&>[data-slot=code-block-title]]:border-border [&>[data-slot=code-block-title]]:bg-background [&>[data-slot=code-block-title]]:px-3.5 [&>[data-slot=code-block-title]]:py-2 [&>[data-slot=code-block-title]]:text-foreground [&>[data-slot=code-block-title]]:font-mono [&>[data-slot=code-block-title]]:text-xs [&>[data-slot=code-block-actions]]:pe-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
