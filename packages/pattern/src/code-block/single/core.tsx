"use client"

import * as React from "react"
import { useHighlightedCode } from "@workspace/shadcn-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import {
  parseCodeNotations,
  getLineVariantClassName,
  type CodeBlockLineVariant,
  type ParsedLineData,
} from "../shared/notations"

/* ========================================================================== *\
 * Line State Helpers
 * ========================================================================== */

/**
 * Pure function resolving the primitive line variant and styling classes.
 */
function getLineState(
  parsedLine: ParsedLineData | undefined,
  hasFocusedLines: boolean
) {
  const isBlurred = hasFocusedLines && !parsedLine?.isFocused
  const variant = parsedLine?.variant
  const primitiveVariant =
    variant === "added" || variant === "removed" || variant === "highlighted"
      ? variant
      : "default"
  const className = getLineVariantClassName(variant, isBlurred)

  return { primitiveVariant, className }
}

/* ========================================================================== *\
 * Headless CodeBlock Core Component
 * ========================================================================== */

/**
 * Headless, data-driven CodeBlock core component.
 * Expects `defaultSlots` to be injected from outside, achieving loose coupling.
 */
export function CodeBlockCore({
  code = "",
  language = "",
  title,
  header,
  actions,
  footer,
  copyable = true,
  lineNumbers = false,
  startLine = 1,
  wrap = false,
  notations = true,
  diff = false,
  highlightLines,
  addedLines,
  removedLines,
  filterRemovedOnCopy = true,
  getLineVariant,
  defaultSlots,
  slots,
  $header,
  $title,
  $actions,
  $copyButton,
  $content,
  $line,
  $footer,
  ...rootProps
}: CodeBlockCoreProps) {
  const P = slots ? { ...defaultSlots, ...slots } : defaultSlots

  const parsed = React.useMemo(
    () =>
      parseCodeNotations(code, {
        notations,
        diff,
        highlightLines,
        addedLines,
        removedLines,
        filterRemovedOnCopy,
        getLineVariant,
        startLine,
      }),
    [
      code,
      notations,
      diff,
      highlightLines,
      addedLines,
      removedLines,
      filterRemovedOnCopy,
      getLineVariant,
      startLine,
    ]
  )

  const lines = useHighlightedCode(parsed.displayCode, language)
  const copyValue = $copyButton?.value ?? parsed.copyCode

  const canCopy = copyable && Boolean(parsed.copyCode)
  const hasActions = Boolean(actions || canCopy)
  const hasHeader = Boolean(header || title)

  const actionsContent = hasActions && (
    <P.Actions {...$actions}>
      {actions}
      {canCopy && <P.CopyButton value={copyValue} {...$copyButton} />}
    </P.Actions>
  )

  return (
    <P.Root {...rootProps}>
      {hasHeader && (
        <P.Header {...$header}>
          {header ?? (
            <>
              {title && <P.Title {...$title}>{title}</P.Title>}
              {actionsContent}
            </>
          )}
        </P.Header>
      )}

      {!hasHeader && actionsContent}

      <P.Content
        wrap={wrap}
        lineNumbers={lineNumbers}
        startLine={startLine}
        {...$content}
      >
        {lines.map((line, index) => {
          const lineNumber = startLine + index
          const { primitiveVariant, className } = getLineState(
            parsed.lines[index],
            parsed.hasFocusedLines
          )

          return (
            <P.Line
              key={lineNumber}
              variant={primitiveVariant}
              {...$line}
              className={cn(className, $line?.className)}
            >
              {line}
            </P.Line>
          )
        })}
      </P.Content>

      {footer && <P.Footer {...$footer}>{footer}</P.Footer>}
    </P.Root>
  )
}

/* ========================================================================== *\
 * CodeBlock Types
 * ========================================================================== */

export type { CodeBlockLineVariant } from "../shared/notations"

export type CodeBlockSlots = Readonly<{
  Root: React.ElementType
  Header: React.ElementType
  Title: React.ElementType
  Actions: React.ElementType
  CopyButton: React.ElementType
  Content: React.ElementType
  Line: React.ElementType
  Footer: React.ElementType
}>

export type CodeBlockCoreProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "title"
> & {
  /** The code string to display and highlight. */
  code?: string
  /** Programming language identifier for syntax highlighting (e.g. "typescript", "bash", "json"). */
  language?: string
  /** Header title, such as a filename or description. */
  title?: React.ReactNode
  /** Custom header element to replace the standard header. */
  header?: React.ReactNode
  /** Extra action buttons rendered inside the action container. */
  actions?: React.ReactNode
  /** Optional footer content rendered below the code content. */
  footer?: React.ReactNode
  /** Whether to show the copy button. Defaults to true when code is non-empty. */
  copyable?: boolean
  /** Whether to display line numbers. Defaults to false. */
  lineNumbers?: boolean
  /** Starting line number for numbering. Defaults to 1. */
  startLine?: number
  /** Whether to wrap lines instead of scrolling horizontally. Defaults to false. */
  wrap?: boolean
  /** Whether to parse Fumadocs/Shiki in-code notations (e.g. `// [!code ++]`, `// [!code focus]`). Defaults to true. */
  notations?: boolean
  /** Automatically detect added/removed line variants from leading +/- characters. Defaults to false. */
  diff?: boolean
  /** Line numbers or range to visually highlight (e.g. `[3, 4]` or `"3-5, 8"`). */
  highlightLines?: readonly number[] | string
  /** Line numbers or range marked as added (+) (e.g. `[2, 3]` or `"2-3"`). */
  addedLines?: readonly number[] | string
  /** Line numbers or range marked as removed (−) (e.g. `[1]` or `"1"`). */
  removedLines?: readonly number[] | string
  /** Whether to exclude lines marked with [!code --] from being copied. Defaults to true. */
  filterRemovedOnCopy?: boolean
  /** Function returning variant for a specific line number. */
  getLineVariant?: (
    lineNumber: number,
    lineText: string
  ) => CodeBlockLineVariant | undefined
  /** Injected default slots for loosely coupled primitives. */
  defaultSlots: CodeBlockSlots
  /** Runtime slot overrides passed per instance. */
  slots?: Partial<CodeBlockSlots>
  /** Slot props passed directly to the Header primitive. */
  $header?: Record<string, unknown>
  /** Slot props passed directly to the Title primitive. */
  $title?: Record<string, unknown>
  /** Slot props passed directly to the Actions primitive. */
  $actions?: Record<string, unknown>
  /** Slot props passed directly to the CopyButton primitive. */
  $copyButton?: Record<string, unknown> & { value?: string }
  /** Slot props passed directly to the Content primitive. */
  $content?: Record<string, unknown>
  /** Slot props passed directly to the Line primitive. */
  $line?: Record<string, unknown> & { className?: string }
  /** Slot props passed directly to the Footer primitive. */
  $footer?: Record<string, unknown>
}
