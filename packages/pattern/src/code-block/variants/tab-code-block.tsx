import * as React from "react"
import { TabHeader } from "../headers/tab-header"
import {
  defaultCodeBlockSlots,
  type CodeBlockProps,
} from "./default-code-block"
import { CodeBlockCore, type CodeBlockSlots } from "../core"

export const tabCodeBlockSlots: CodeBlockSlots = {
  ...defaultCodeBlockSlots,
  Header: TabHeader,
}

export function TabCodeBlock(props: CodeBlockProps) {
  return (
    <CodeBlockCore
      defaultSlots={tabCodeBlockSlots}
      {...props}
    />
  )
}
