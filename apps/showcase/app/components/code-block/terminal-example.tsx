"use client"

import { Terminal } from "@workspace/pattern"

const shellScript = `# Install project dependencies
pnpm install

# Start development server with Turbopack
pnpm dev --turbo`

export default function TerminalExample() {
  return (
    <div className="grid gap-6 max-w-2xl">
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">CLI Terminal (Prompt Icon)</h4>
        <Terminal
          title="bash"
          language="bash"
          code={shellScript}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Mac Terminal (Traffic-light Dots)</h4>
        <Terminal
          indicator="macos"
          title="zsh"
          language="bash"
          code={shellScript}
        />
      </div>
    </div>
  )
}
