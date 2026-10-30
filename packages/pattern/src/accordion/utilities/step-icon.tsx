import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

export interface StepIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  step: React.ReactNode
}

export const StepIcon = ({ step, className, ...props }: StepIconProps) => (
  <span
    className={cn(
      "flex size-7 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs transition-colors group-aria-expanded/accordion-trigger:bg-primary group-aria-expanded/accordion-trigger:text-primary-foreground",
      className
    )}
    {...props}
  >
    {step}
  </span>
)

/**
 * Maps items and injects a sequential StepIcon for each element.
 */
export function withStepIcon<T extends object>(items: readonly T[]) {
  return items.map((v, i) => ({
    icon: <StepIcon step={i + 1} />,
    ...v,
  }))
}


