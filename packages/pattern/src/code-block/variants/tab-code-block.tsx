import * as React from "react"
import { TabHeader } from "../headers/tab-header"
import { CodeBlock, type CodeBlockProps } from "./default-code-block"

export function TabCodeBlock({ slots, ...props }: CodeBlockProps) {
  return (
    <CodeBlock
      {...props}
      slots={{ ...(slots ?? {}), Header: TabHeader }}
    />
  )
}
