"use client"

import {
  TerminalTabs,
  type CodeTab,
} from "@workspace/pattern"

const installTabs: readonly CodeTab[] = [
  {
    id: "pnpm",
    label: "pnpm",
    language: "bash",
    code: "pnpm add @workspace/pattern",
  },
  {
    id: "npm",
    label: "npm",
    language: "bash",
    code: "npm install @workspace/pattern",
  },
  {
    id: "yarn",
    label: "yarn",
    language: "bash",
    code: "yarn add @workspace/pattern",
  },
  {
    id: "bun",
    label: "bun",
    language: "bash",
    code: "bun add @workspace/pattern",
  },
]

export default function PackageManagerExample() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Terminal Tabs (CLI Prompt Icon)
        </h4>
        <TerminalTabs defaultValue="pnpm" tabs={installTabs} />
      </div>

      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Terminal Tabs (macOS Dots Indicator)
        </h4>
        <TerminalTabs indicator="macos" defaultValue="pnpm" tabs={installTabs} />
      </div>
    </div>
  )
}
