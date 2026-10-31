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

import MultiTabExample from "./multi-tab-example"
import MultiTabExampleRaw from "./multi-tab-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import PackageManagerExample from "./package-manager-example"
import PackageManagerExampleRaw from "./package-manager-example.tsx?raw" with {
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
    title: "Terminal Variants (CLI & macOS)",
    description:
      "CLI prompt icon and macOS traffic light window controls for terminal code snippets.",
    code: TerminalExampleRaw,
    preview: <TerminalExample />,
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
    id: "multi-tab-code-block",
    title: "Multi-Tab Editor Variant",
    description:
      "Editor-styled multi-tab switcher for browsing multiple files with isolated code, notations, and dynamic clipboard copying.",
    code: MultiTabExampleRaw,
    preview: <MultiTabExample />,
  },
  {
    id: "terminal-tabs-code-block",
    title: "Terminal Tabs Variants",
    description:
      "CLI prompt icon and macOS traffic-light window controls for terminal command tabs.",
    code: PackageManagerExampleRaw,
    preview: <PackageManagerExample />,
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
