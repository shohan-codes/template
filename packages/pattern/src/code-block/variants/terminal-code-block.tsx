import * as React from "react"
import { TerminalHeader } from "../headers/terminal-header"
import { CodeBlock, type CodeBlockProps } from "./default-code-block"

export function TerminalCodeBlock({ slots, ...props }: CodeBlockProps) {
  return (
    <CodeBlock
      {...props}
      slots={{ ...(slots ?? {}), Header: TerminalHeader }}
    />
  )
}
