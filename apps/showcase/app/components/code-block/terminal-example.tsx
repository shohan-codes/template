"use client"

import { TerminalCodeBlock } from "@workspace/pattern"

const shellScript = `# Install project dependencies
pnpm install

# Start development server with Turbopack
pnpm dev --turbo`

export default function TerminalExample() {
  return (
    <div className="max-w-2xl">
      <TerminalCodeBlock
        title="bash"
        language="bash"
        code={shellScript}
      />
    </div>
  )
}
