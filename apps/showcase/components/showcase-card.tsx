"use client"

import { RiCodeSSlashLine, RiEyeLine } from "@remixicon/react"
import * as React from "react"

import { ShowcasePreview } from "@/components/showcase-preview"

import { Button } from "@workspace/shadcn-ui"
import { CodeBlock } from "@workspace/pattern"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/shadcn-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

/** Props accepted by {@link ShowcaseCard}. */
export interface ShowcaseCardProps extends Omit<
  React.ComponentProps<typeof Card>,
  "title"
> {
  /** Section heading for the showcase example. */
  readonly title: React.ReactNode
  /** Explanatory description of the demonstration. */
  readonly description?: React.ReactNode
  /** Optional badge or tag displayed alongside the title. */
  readonly badge?: React.ReactNode
  /** Optional interactive controls displayed above the component preview. */
  readonly controls?: React.ReactNode
  /** Optional code preview string displayed in an expandable tab. */
  readonly code?: string
  /** Programming language for syntax highlighting (defaults to "tsx"). */
  readonly language?: string
  /** Line numbers or range to visually highlight in code preview (e.g. `[3, 4]` or `"3-5"`). */
  readonly highlightLines?: readonly number[] | string
  /** Line numbers or range marked as added (+) in code preview. */
  readonly addedLines?: readonly number[] | string
  /** Line numbers or range marked as removed (−) in code preview. */
  readonly removedLines?: readonly number[] | string
  /** Whether to auto-detect diff (+/-) lines in code preview. */
  readonly diff?: boolean
  /** Whether to display line numbers in code preview. */
  readonly lineNumbers?: boolean
  /** Whether to parse internal magic notations or display raw code (defaults to false). */
  readonly notations?: boolean
  /** Same-origin isolated preview route, when available. */
  readonly previewSrc?: string
  /** Component interactive preview content. */
  readonly children: React.ReactNode
}

/**
 * Container card for rendering component examples with optional controls and code preview.
 *
 * @param props - Card heading, description, controls, code preview, and children.
 * @returns The structured showcase card view.
 */
export function ShowcaseCard({
  title,
  description,
  badge,
  controls,
  code,
  language = "tsx",
  highlightLines,
  addedLines,
  removedLines,
  diff,
  lineNumbers,
  notations = false,
  children,
  previewSrc,
  className,
  ...props
}: ShowcaseCardProps) {
  const [viewMode, setViewMode] = React.useState<"preview" | "code">("preview")

  return (
    <Card
      className={cn("overflow-hidden bg-secondary/5", className)}
      {...props}
    >
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {Boolean(badge) && <div>{badge}</div>}
        </div>
        {Boolean(description) && (
          <CardDescription className="text-xs">{description}</CardDescription>
        )}
        {Boolean(code) && (
          <CardAction>
            <div className="flex items-center rounded-lg border bg-background p-0.5 shadow-xs">
              <Button
                type="button"
                variant={viewMode === "preview" ? "secondary" : "ghost"}
                size="xs"
                className="h-6 gap-1 px-2 text-xs"
                aria-pressed={viewMode === "preview"}
                onClick={() => setViewMode("preview")}
              >
                <RiEyeLine className="size-3.5" />
                Preview
              </Button>
              <Button
                type="button"
                variant={viewMode === "code" ? "secondary" : "ghost"}
                size="xs"
                className="h-6 gap-1 px-2 text-xs"
                aria-pressed={viewMode === "code"}
                onClick={() => setViewMode("code")}
              >
                <RiCodeSSlashLine className="size-3.5" />
                Code
              </Button>
            </div>
          </CardAction>
        )}
      </CardHeader>

      {Boolean(controls) && (
        <div className="flex flex-wrap items-center gap-3 border-b bg-muted/10 px-6 py-3 text-xs">
          {controls}
        </div>
      )}

      <CardContent className="min-w-0 p-4 sm:p-6">
        <div hidden={viewMode !== "preview"}>
          {previewSrc ? (
            <ShowcasePreview
              src={previewSrc}
              title={typeof title === "string" ? title : "Component"}
            />
          ) : (
            children
          )}
        </div>
        {viewMode === "code" && (
          <CodeBlock
            code={code ?? ""}
            language={language}
            className="max-h-96"
            lineNumbers={lineNumbers}
            highlightLines={highlightLines}
            addedLines={addedLines}
            removedLines={removedLines}
            diff={diff}
            notations={notations}
            copyable
          />
        )}
      </CardContent>
    </Card>
  )
}
