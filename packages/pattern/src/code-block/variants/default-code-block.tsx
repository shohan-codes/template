import * as React from "react"
import {
  CodeBlock as Root,
  CodeBlockTitle as Title,
  CodeBlockActions as Actions,
  CodeBlockCopyButton as CopyButton,
  CodeBlockContent as Content,
  CodeBlockLine as Line,
  CodeBlockFooter as Footer,
} from "@workspace/shadcn-ui"

import { EditorHeader as Header } from "../headers/editor-header"
import {
  CodeBlockCore,
  type CodeBlockCoreProps,
  type CodeBlockSlots,
} from "../core"

export const defaultCodeBlockSlots: CodeBlockSlots = {
  Root,
  Header,
  Title,
  Actions,
  CopyButton,
  Content,
  Line,
  Footer,
}

export type CodeBlockProps = Omit<CodeBlockCoreProps, "defaultSlots"> & {
  /** Optional custom default slots override. */
  defaultSlots?: CodeBlockSlots
}

export const CodeBlock = (props: CodeBlockProps) => (
  <CodeBlockCore
    defaultSlots={defaultCodeBlockSlots}
    {...props}
  />
)

