import { createCodeBlock } from "../core"
import { TabHeader } from "../headers/tab-header"
import { defaultCodeBlockPrimitives } from "./default-code-block"

export const TabCodeBlock = createCodeBlock(defaultCodeBlockPrimitives, {
  Header: TabHeader,
})
