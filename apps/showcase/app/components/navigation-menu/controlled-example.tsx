"use client"

import { useState } from "react"
import Link from "next/link"
import { NavigationMenu } from "@workspace/pattern/navigation-menu"
import { Button } from "@workspace/shadcn-ui/components/button"

export default function ControlledExample() {
  const [value, setValue] = useState("")
  return (
    <div className="min-h-64 space-y-3">
      <Button
        variant="outline"
        onClick={() => setValue(value ? "" : "resources")}
      >
        Toggle resources
      </Button>
      <NavigationMenu
        aria-label="Resources navigation"
        value={value}
        onValueChange={setValue}
        slots={{ Anchor: Link }}
        items={[
          {
            id: "resources",
            type: "submenu",
            label: "Resources",
            items: [
              {
                id: "accordion",
                type: "link",
                label: "Accordion",
                href: "/components/accordion",
              },
              {
                id: "toolbar",
                type: "link",
                label: "Toolbar",
                href: "/components/toolbar",
              },
            ],
          },
        ]}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {value ? "Resources open" : "Navigation closed"}
      </p>
    </div>
  )
}
