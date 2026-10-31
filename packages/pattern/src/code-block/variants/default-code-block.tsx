import {
  CodeBlock as Root,
  CodeBlockHeader as Header,
  CodeBlockTitle as Title,
  CodeBlockActions as Actions,
  CodeBlockCopyButton as CopyButton,
  CodeBlockContent as Content,
  CodeBlockLine as Line,
  CodeBlockFooter as Footer,
} from "@workspace/shadcn-ui"

import { createCodeBlock } from "../core"

export const defaultCodeBlockPrimitives = {
  Root,
  Header,
  Title,
  Actions,
  CopyButton,
  Content,
  Line,
  Footer,
} as const

export const CodeBlock = createCodeBlock(defaultCodeBlockPrimitives)

