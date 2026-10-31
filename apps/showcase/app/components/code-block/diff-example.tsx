"use client"

import { CodeBlock } from "@workspace/pattern"

const diffCode = `// Authenticate incoming request
const user = await legacyAuth(req.headers)
const session = await auth.verifySessionToken(token)
if (!session.isValid) {
  throw new UnauthorizedError("Session expired")
}
return session.user`

export default function DiffExample() {
  return (
    <div className="max-w-2xl">
      <CodeBlock
        title="auth-middleware.ts (diff)"
        language="typescript"
        code={diffCode}
        lineNumbers
        getLineVariant={(lineNumber) => {
          if (lineNumber === 2) return "removed"
          if (lineNumber >= 3 && lineNumber <= 6) return "added"
          return undefined
        }}
      />
    </div>
  )
}

