"use client"

import * as React from "react"
import { useHighlightedCode } from "@workspace/shadcn-ui"

/* ========================================================================== *\
 * CodeBlock Factory
 * ========================================================================== */

/**
 * Creates a data-driven CodeBlock with optional replacements for its primitives.
 */
export function createCodeBlock<const TPrimitives extends CodeBlockPrimitives>(
  defaultPrimitives: TPrimitives,
  slots?: Partial<TPrimitives>
) {
  const P = { ...defaultPrimitives, ...slots }

  function CodeBlock(props: CodeBlockProps<TPrimitives>) {
    const {
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
      highlightLines,
      getLineVariant,
      $header,
      $title,
      $actions,
      $copyButton,
      $content,
      $line,
      $footer,
      ...rootProps
    } = props

    const lines = useHighlightedCode(code, language)

    const hasActions = Boolean(actions || (copyable && code))
    const hasHeader = Boolean(header || title)

    return (
      <P.Root {...rootProps}>
        {hasHeader ? (
          <P.Header {...$header}>
            {header ?? (
              <>
                {title && <P.Title {...$title}>{title}</P.Title>}
                {hasActions && (
                  <P.Actions {...$actions}>
                    {actions}
                    {copyable && code && (
                      <P.CopyButton
                        value={$copyButton?.value ?? code}
                        {...$copyButton}
                      />
                    )}
                  </P.Actions>
                )}
              </>
            )}
          </P.Header>
        ) : hasActions ? (
          <P.Actions {...$actions}>
            {actions}
            {copyable && code && (
              <P.CopyButton
                value={$copyButton?.value ?? code}
                {...$copyButton}
              />
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
            const lineNumber = startLine + index
            const lineVariant = getLineVariant
              ? getLineVariant(lineNumber)
              : highlightLines?.includes(lineNumber)
                ? "highlighted"
                : undefined

            return (
              <P.Line key={lineNumber} variant={lineVariant} {...$line}>
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

export type CodeBlockLineVariant = "default" | "added" | "removed" | "highlighted"

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

export type CodeBlockProps<TPrimitives extends CodeBlockPrimitives = CodeBlockPrimitives> = Omit<
  React.ComponentPropsWithoutRef<TPrimitives["Root"]>,
  "children"
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
  /** Whether to display line numbers. */
  lineNumbers?: boolean
  /** Starting line number for numbering. Defaults to 1. */
  startLine?: number
  /** Whether to wrap lines instead of scrolling horizontally. */
  wrap?: boolean
  /** Array of line numbers to visually highlight. */
  highlightLines?: readonly number[]
  /** Function returning variant for a specific line number. */
  getLineVariant?: (lineNumber: number) => CodeBlockLineVariant | undefined
  /** Slot props passed directly to the Header primitive. */
  $header?: Omit<React.ComponentPropsWithoutRef<TPrimitives["Header"]>, "children">
  /** Slot props passed directly to the Title primitive. */
  $title?: Omit<React.ComponentPropsWithoutRef<TPrimitives["Title"]>, "children">
  /** Slot props passed directly to the Actions primitive. */
  $actions?: Omit<React.ComponentPropsWithoutRef<TPrimitives["Actions"]>, "children">
  /** Slot props passed directly to the CopyButton primitive. */
  $copyButton?: Partial<React.ComponentPropsWithoutRef<TPrimitives["CopyButton"]>>
  /** Slot props passed directly to the Content primitive. */
  $content?: Omit<
    React.ComponentPropsWithoutRef<TPrimitives["Content"]>,
    "children" | "wrap" | "lineNumbers" | "startLine"
  >
  /** Slot props passed directly to the Line primitive. */
  $line?: Omit<React.ComponentPropsWithoutRef<TPrimitives["Line"]>, "children" | "variant">
  /** Slot props passed directly to the Footer primitive. */
  $footer?: Omit<React.ComponentPropsWithoutRef<TPrimitives["Footer"]>, "children">
}
