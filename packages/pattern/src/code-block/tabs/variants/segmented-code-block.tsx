import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import { CodeBlock } from "../../single/variants/default-code-block"
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
      "inline-flex items-center gap-1 rounded-md bg-muted/80 p-0.5 text-muted-foreground",
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
      "inline-flex cursor-pointer items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium transition-all focus-visible:outline-hidden",
      "hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-2xs",
      className
    )}
    {...props}
  />
)

export const defaultSegmentedCodeBlockSlots: MultiTabCodeBlockSlots = {
  Root,
  TabsList,
  TabTrigger,
  CodeBlock,
}

export type SegmentedCodeBlockProps = MultiTabCodeBlockProps

/**
 * Segmented/Pill-styled multi-tab CodeBlock ideal for package manager switchers (pnpm, npm, bun, yarn).
 */
export function SegmentedCodeBlock({
  defaultSlots: customDefaultSlots,
  ...props
}: SegmentedCodeBlockProps) {
  return (
    <MultiTabCodeBlockCore
      defaultSlots={customDefaultSlots ?? defaultSegmentedCodeBlockSlots}
      {...props}
    />
  )
}
