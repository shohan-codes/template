"use client"

import { CodeBlock } from "@workspace/pattern"

const diffCode = `// Authenticate incoming request
const user = await legacyAuth(req.headers) // [!code --]
const session = await auth.verifySessionToken(token) // [!code ++]
if (!session.isValid) { // [!code ++]
  throw new UnauthorizedError("Session expired") // [!code ++]
} // [!code ++]
return session.user`

export default function DiffExample() {
  return (
    <div className="max-w-2xl">
      <CodeBlock
        title="auth-middleware.ts (diff)"
        language="typescript"
        code={diffCode}
        lineNumbers
      />
    </div>
  )
}
