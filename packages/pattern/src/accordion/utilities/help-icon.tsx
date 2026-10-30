import * as React from "react"
import { CircleHelp } from "lucide-react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

export type HelpIconProps = React.ComponentProps<typeof CircleHelp>

export const HelpIcon = ({ className, ...props }: HelpIconProps) => (
  <CircleHelp
    className={cn("size-4 shrink-0 text-muted-foreground", className)}
    {...props}
  />
)

/**
 * Maps items and injects a default HelpIcon for each element.
 */
export function withHelpIcon<T extends object>(items: readonly T[]) {
  return items.map((v) => ({
    icon: <HelpIcon />,
    ...v,
  }))
}

