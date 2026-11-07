"use client"

import {
  Collapsible,
  type CollapsibleItemData,
} from "@workspace/pattern/collapsible"

const items = [
  {
    id: "summary",
    type: "content",
    content:
      "Build accessible patterns once, then share their behavior across every layout.",
  },
] satisfies readonly CollapsibleItemData[]

export default function BasicExample() {
  return (
    <div className="mx-auto max-w-lg">
      <Collapsible trigger="Project details" items={items} />
    </div>
  )
}
