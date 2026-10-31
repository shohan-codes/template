import { createCodeBlock } from "../core"
import { TerminalHeader } from "../headers/terminal-header"
import { defaultCodeBlockPrimitives } from "./default-code-block"

export const TerminalCodeBlock = createCodeBlock(defaultCodeBlockPrimitives, {
  Header: TerminalHeader,
})
