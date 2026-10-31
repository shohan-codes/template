import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  defaultCodeBlockSlots,
  type CodeBlockProps,
} from "./code-block"
import { CodeBlockCore, type CodeBlockSlots } from "../core"

export const CodeBlockTabHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="code-block-header"
    className={cn(
      "flex min-h-9 min-w-0 shrink-0 items-stretch border-b border-border bg-muted/20 px-0 py-0 text-muted-foreground",
      className
    )}
    {...props}
  />
)

export const CodeBlockTabTitle = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="code-block-title"
    className={cn(
      "inline-flex h-9 items-center border-r border-border bg-background px-4 font-mono text-xs text-foreground",
      className
    )}
    {...props}
  />
)

export const CodeBlockTabActions = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="code-block-actions"
    className={cn(
      "ms-auto flex shrink-0 items-center gap-1 pe-3 my-auto",
      className
    )}
    {...props}
  />
)

export const codeBlockTabSlots: CodeBlockSlots = {
  ...defaultCodeBlockSlots,
  Header: CodeBlockTabHeader,
  Title: CodeBlockTabTitle,
  Actions: CodeBlockTabActions,
}

/**
 * Single file CodeBlock with an active editor tab header.
 */
export const CodeBlockTab = (props: CodeBlockProps) => (
  <CodeBlockCore
    defaultSlots={codeBlockTabSlots}
    {...props}
  />
)
