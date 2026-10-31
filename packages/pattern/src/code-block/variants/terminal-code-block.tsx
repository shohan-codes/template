import { TerminalHeader } from "../headers/terminal-header"
import {
  defaultCodeBlockSlots,
  type CodeBlockProps,
} from "./default-code-block"
import { CodeBlockCore, type CodeBlockSlots } from "../core"

export const terminalCodeBlockSlots: CodeBlockSlots = {
  ...defaultCodeBlockSlots,
  Header: TerminalHeader,
}

export function TerminalCodeBlock(props: CodeBlockProps) {
  return (
    <CodeBlockCore
      defaultSlots={terminalCodeBlockSlots}
      {...props}
    />
  )
}
