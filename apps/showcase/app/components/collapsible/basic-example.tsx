"use client"

import { Collapsible } from "@workspace/pattern/collapsible"

export default function BasicExample() {
  return (
    <div className="mx-auto max-w-lg">
      <Collapsible trigger="Project details">
        Build accessible patterns once, then share their behavior across every
        layout.
      </Collapsible>
    </div>
  )
}
