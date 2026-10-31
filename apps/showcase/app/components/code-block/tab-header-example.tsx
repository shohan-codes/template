"use client"

import { TabCodeBlock } from "@workspace/pattern"

const queryCode = `import { useQuery } from "@tanstack/react-query"

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserProfile(userId),
    staleTime: 5 * 60 * 1000,
  })
}`

export default function TabHeaderExample() {
  return (
    <div className="max-w-2xl">
      <TabCodeBlock
        title="use-user-profile.ts"
        language="typescript"
        code={queryCode}
        lineNumbers
      />
    </div>
  )
}

