"use client"

import * as React from "react"
import { useHighlightedCode } from "@workspace/shadcn-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import {
  parseCodeNotations,
  getLineVariantClassName,
  type CodeBlockLineVariant,
} from "./utilities/notations"
import { TerminalHeader } from "./headers/terminal-header"
import { TabHeader } from "./headers/tab-header"

/* ========================================================================== *\
 * CodeBlock Factory
 * ========================================================================== */

/**
 * Creates a data-driven CodeBlock with optional replacements for its primitives.
 */
export function createCodeBlock<const TPrimitives extends CodeBlockPrimitives>(
  defaultPrimitives: TPrimitives,
  slots?: Partial<CodeBlockPrimitives>
) {
  const P = { ...defaultPrimitives, ...slots }

  function CodeBlock(props: CodeBlockProps<TPrimitives>) {
    const {
      code = "",
      language = "",
      title,
      header,
      headerVariant,
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
      slots: propSlots,
      $header,
      $title,
      $actions,
      $copyButton,
      $content,
      $line,
      $footer,
      ...rootProps
    } = props

    const Header =
      headerVariant === "terminal"
        ? TerminalHeader
        : headerVariant === "tab"
          ? TabHeader
          : propSlots?.Header ?? P.Header

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

    const hasActions = Boolean(actions || (copyable && Boolean(parsed.copyCode)))
    const hasHeader = Boolean(header || title)

    return (
      <P.Root {...rootProps}>
        {hasHeader ? (
          <Header {...$header}>
            {header ?? (
              <>
                {title && <P.Title {...$title}>{title}</P.Title>}
                {hasActions && (
                  <P.Actions {...$actions}>
                    {actions}
                    {copyable && Boolean(parsed.copyCode) && (
                      <P.CopyButton value={copyValue} {...$copyButton} />
                    )}
                  </P.Actions>
                )}
              </>
            )}
          </Header>
        ) : hasActions ? (
          <P.Actions {...$actions}>
            {actions}
            {copyable && Boolean(parsed.copyCode) && (
              <P.CopyButton value={copyValue} {...$copyButton} />
            )}
          </P.Actions>
        ) : null}

        <P.Content
          wrap={wrap}
          lineNumbers={lineNumbers}
          startLine={startLine}
          {...$content}
        >
          {lines.map((line, index) => {
            const parsedLine = parsed.lines[index]
            const lineNumber = startLine + index
            const isBlurred = parsed.hasFocusedLines && !parsedLine?.isFocused
            const variant = parsedLine?.variant

            const mappedPrimitiveVariant =
              variant === "added" ||
              variant === "removed" ||
              variant === "highlighted"
                ? variant
                : "default"

            const variantClassName = getLineVariantClassName(variant, isBlurred)

            return (
              <P.Line
                key={lineNumber}
                variant={mappedPrimitiveVariant}
                {...$line}
                className={cn(variantClassName, $line?.className)}
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

  return CodeBlock
}

/* ========================================================================== *\
 * CodeBlock Types
 * ========================================================================== */

export type { CodeBlockLineVariant } from "./utilities/notations"

export type CodeBlockHeaderVariant = "editor" | "terminal" | "tab"

export type CodeBlockPrimitives = Readonly<{
  Root: React.ElementType
  Header: React.ElementType
  Title: React.ElementType
  Actions: React.ElementType
  CopyButton: React.ElementType
  Content: React.ElementType
  Line: React.ElementType
  Footer: React.ElementType
}>

export type CodeBlockProps<
  TPrimitives extends CodeBlockPrimitives = CodeBlockPrimitives,
> = Omit<React.ComponentPropsWithoutRef<TPrimitives["Root"]>, "children"> & {
  /** The code string to display and highlight. */
  code?: string
  /** Programming language identifier for syntax highlighting (e.g. "typescript", "bash", "json"). */
  language?: string
  /** Header title, such as a filename or description. */
  title?: React.ReactNode
  /** Custom header element to replace the standard header. */
  header?: React.ReactNode
  /** Header styling variant: "editor" (default), "terminal" (macOS dots), or "tab" (VS Code tab). */
  headerVariant?: CodeBlockHeaderVariant
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
  /** Slot overrides for primitives passed per-instance. */
  slots?: Partial<CodeBlockPrimitives>
  /** Slot props passed directly to the Header primitive. */
  $header?: Omit<
    React.ComponentPropsWithoutRef<TPrimitives["Header"]>,
    "children"
  >
  /** Slot props passed directly to the Title primitive. */
  $title?: Omit<React.ComponentPropsWithoutRef<TPrimitives["Title"]>, "children">
  /** Slot props passed directly to the Actions primitive. */
  $actions?: Omit<
    React.ComponentPropsWithoutRef<TPrimitives["Actions"]>,
    "children"
  >
  /** Slot props passed directly to the CopyButton primitive. */
  $copyButton?: Partial<
    React.ComponentPropsWithoutRef<TPrimitives["CopyButton"]>
  >
  /** Slot props passed directly to the Content primitive. */
  $content?: Omit<
    React.ComponentPropsWithoutRef<TPrimitives["Content"]>,
    "children" | "wrap" | "lineNumbers" | "startLine"
  >
  /** Slot props passed directly to the Line primitive. */
  $line?: Omit<
    React.ComponentPropsWithoutRef<TPrimitives["Line"]>,
    "children" | "variant"
  >
  /** Slot props passed directly to the Footer primitive. */
  $footer?: Omit<
    React.ComponentPropsWithoutRef<TPrimitives["Footer"]>,
    "children"
  >
}
