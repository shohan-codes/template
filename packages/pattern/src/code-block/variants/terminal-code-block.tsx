import { createCodeBlock } from "../core"
import { LazyTerminalHeader } from "../headers/lazy-headers"
import { defaultCodeBlockPrimitives } from "./default-code-block"

export const TerminalCodeBlock = createCodeBlock(defaultCodeBlockPrimitives, {
  Header: LazyTerminalHeader,
})
