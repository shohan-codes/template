"use client"

import {
  ExamplePageShell,
  type ShowcaseItem,
} from "@/components/example-page-shell"

import BasicExample from "./basic-example"
import BasicExampleRaw from "./basic-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import LineNumbersExample from "./line-numbers-example"
import LineNumbersExampleRaw from "./line-numbers-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import DiffExample from "./diff-example"
import DiffExampleRaw from "./diff-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import FocusExample from "./focus-example"
import FocusExampleRaw from "./focus-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const codeBlockShowcaseItems: readonly ShowcaseItem[] = [
  {
    id: "basic-code-block",
    title: "Basic Code Block",
    description:
      "Data-driven code block with title header, syntax highlighting via Shiki, and one-click copy button.",
    code: BasicExampleRaw,
    preview: <BasicExample />,
  },
  {
    id: "line-numbers-and-highlight",
    title: "Line Numbers & Highlighted Lines",
    description:
      "Code block with numbered lines using CSS subgrid counters and highlighted lines.",
    code: LineNumbersExampleRaw,
    preview: <LineNumbersExample />,
  },
  {
    id: "diff-code-block",
    title: "Diff Notations (Added & Removed)",
    description:
      "Fumadocs Shiki comment notations (// [!code ++] and // [!code --]) with automatic clean clipboard copying.",
    code: DiffExampleRaw,
    preview: <DiffExample />,
  },
  {
    id: "focus-code-block",
    title: "Focus & Blur Notation",
    description:
      "Focus notation (// [!code focus]) keeping the target line clear while other lines are subtly dimmed and blurred with hover reveal.",
    code: FocusExampleRaw,
    preview: <FocusExample />,
  },
]

export default function CodeBlockShowcase() {
  return (
    <ExamplePageShell
      title="Code Block Patterns"
      description="Syntax-highlighted code display components with headers, line numbers, line variants, and clipboard integration."
      items={codeBlockShowcaseItems}
    />
  )
}
