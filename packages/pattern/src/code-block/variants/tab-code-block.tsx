import { createCodeBlock } from "../core"
import { LazyTabHeader } from "../headers/lazy-headers"
import { defaultCodeBlockPrimitives } from "./default-code-block"

export const TabCodeBlock = createCodeBlock(defaultCodeBlockPrimitives, {
  Header: LazyTabHeader,
})
