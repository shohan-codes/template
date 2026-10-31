"use client"

import { CodeBlock } from "@workspace/pattern"

const configCode = `export interface DatabaseConfig {
  host: string
  port: number
  database: string
  ssl: boolean
  maxConnections: number
}

export const dbConfig: DatabaseConfig = {
  host: "db.production.internal",
  port: 5432,
  database: "analytics",
  ssl: true,
  maxConnections: 20,
}`

export default function LineNumbersExample() {
  return (
    <div className="max-w-2xl">
      <CodeBlock
        title="database.ts"
        language="typescript"
        code={configCode}
        lineNumbers
        highlightLines={[10, 11]}
      />
    </div>
  )
}

