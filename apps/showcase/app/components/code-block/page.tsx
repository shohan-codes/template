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

import TerminalExample from "./terminal-example"
import TerminalExampleRaw from "./terminal-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import TabHeaderExample from "./tab-header-example"
import TabHeaderExampleRaw from "./tab-header-example.tsx?raw" with {
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
    title: "Default Editor Header",
    description:
      "Polished editor title bar with bottom border separation, subtle background, and clipboard copy action.",
    code: BasicExampleRaw,
    preview: <BasicExample />,
  },
  {
    id: "terminal-code-block",
    title: "Terminal Header Variant (Lazy)",
    description:
      "macOS traffic light window controls loaded on demand via lazy slot architecture.",
    code: TerminalExampleRaw,
    preview: <TerminalExample />,
  },
  {
    id: "tab-header-code-block",
    title: "Tab Header Variant (Lazy)",
    description:
      "VS Code style active tab title bar where the file name is enclosed in a dedicated bordered tab.",
    code: TabHeaderExampleRaw,
    preview: <TabHeaderExample />,
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
      description="Syntax-highlighted code display components with custom header variants (Editor, Terminal, Tab), line numbers, diff notations, and clipboard integration."
      items={codeBlockShowcaseItems}
    />
  )
}
