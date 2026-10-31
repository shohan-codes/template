"use client"

import { CardTabs, type TabItemData } from "@workspace/pattern"
import { RiCodeSSlashLine, RiTerminalBoxLine, RiBookOpenLine } from "@remixicon/react"

const docTabs: readonly TabItemData[] = [
  {
    id: "guide",
    label: "Quickstart Guide",
    icon: <RiBookOpenLine className="size-4" />,
    content: (
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Getting Started</h4>
        <p className="text-muted-foreground leading-relaxed">
          Install the core library using your preferred package manager and initialize the
          configuration file.
        </p>
      </div>
    ),
  },
  {
    id: "api",
    label: "API Reference",
    icon: <RiCodeSSlashLine className="size-4" />,
    content: (
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Component Props & Slots</h4>
        <p className="text-muted-foreground leading-relaxed">
          Comprehensive API specifications for all headless slots, events, and styling hooks.
        </p>
      </div>
    ),
  },
  {
    id: "cli",
    label: "CLI Commands",
    icon: <RiTerminalBoxLine className="size-4" />,
    content: (
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Command Line Interface</h4>
        <p className="text-muted-foreground leading-relaxed">
          Run automated migrations, codemods, and code generation scripts from your terminal.
        </p>
      </div>
    ),
  },
]

export default function CardTabsExample() {
  return (
    <div className="w-full max-w-xl">
      <CardTabs items={docTabs} />
    </div>
  )
}

