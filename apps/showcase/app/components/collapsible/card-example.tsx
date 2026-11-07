"use client"

import { CardCollapsible } from "@workspace/pattern/collapsible"

export default function CardExample() {
  return (
    <div className="mx-auto max-w-lg">
      <CardCollapsible
        trigger="Project summary"
        defaultOpen
        items={[
          {
            id: "summary",
            type: "content",
            content:
              "Choose this variant when the disclosure needs its own bordered surface.",
          },
        ]}
      />
    </div>
  )
}
