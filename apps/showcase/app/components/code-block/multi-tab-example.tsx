"use client"

import { CodeBlockTabs, type CodeTab } from "@workspace/pattern"

const files: readonly CodeTab[] = [
  {
    id: "page.tsx",
    label: "app/page.tsx",
    language: "tsx",
    code: `import { CodeBlockTabs } from "@workspace/pattern"

export default function Page() {
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold">Multi-Tab CodeBlock</h1>
    </main>
  )
}`,
  },
  {
    id: "actions.ts",
    label: "app/actions.ts",
    language: "typescript",
    code: `"use server"

export async function submitTelemetry(event: string) {
  // Process analytics telemetry
  console.log("Telemetry event:", event)
  return { success: true }
}`,
  },
  {
    id: "types.ts",
    label: "app/types.ts",
    language: "typescript",
    code: `export type UserProfile = {
  id: string
  name: string
  role: "admin" | "member" | "viewer"
}`,
  },
]

export default function MultiTabExample() {
  return (
    <div className="max-w-2xl">
      <CodeBlockTabs defaultValue="page.tsx" tabs={files} />
    </div>
  )
}
