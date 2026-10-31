import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  CodeBlock as Root,
  CodeBlockTitle as Title,
  CodeBlockActions as Actions,
  CodeBlockCopyButton as CopyButton,
  CodeBlockContent as Content,
  CodeBlockLine as Line,
  CodeBlockFooter as Footer,
} from "@workspace/shadcn-ui"

import {
  CodeBlockCore,
  type CodeBlockCoreProps,
  type CodeBlockSlots,
} from "../core"

/**
 * Default Editor Header:
 * A clean editor title bar with a subtle bottom border and unified min-h-9 height.
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
        "flex min-h-9 min-w-0 shrink-0 items-center gap-2 border-b border-border bg-muted/40 px-3.5 py-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const defaultCodeBlockSlots: CodeBlockSlots = {
  Root,
  Header: EditorHeader,
  Title,
  Actions,
  CopyButton,
  Content,
  Line,
  Footer,
}

export type CodeBlockProps = Omit<CodeBlockCoreProps, "defaultSlots">

export const CodeBlock = (props: CodeBlockProps) => (
  <CodeBlockCore
    defaultSlots={defaultCodeBlockSlots}
    {...props}
  />
)

