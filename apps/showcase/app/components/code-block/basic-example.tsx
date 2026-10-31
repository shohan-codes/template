"use client"

import { CodeBlock } from "@workspace/pattern"

const sampleCode = `import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  )
}`

export default function BasicExample() {
  return (
    <div className="max-w-2xl">
      <CodeBlock
        title="counter.tsx"
        language="tsx"
        code={sampleCode}
      />
    </div>
  )
}

