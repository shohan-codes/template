"use client"

import { CardTabs, type TabItemData } from "@workspace/pattern"
import { RiCodeSSlashLine, RiTerminalBoxLine, RiBookOpenLine } from "@remixicon/react"

const docTabs: readonly TabItemData[] = [
  {
    id: "guide",
    label: "Quickstart",
    icon: <RiBookOpenLine className="size-3.5" />,
    content: (
      <div className="space-y-3.5">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Installation & Setup</h4>
          <p className="text-xs text-muted-foreground">
            Add the pattern library and configure headless slot primitives.
          </p>
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/40 p-3 font-mono text-xs text-foreground">
          <div className="text-muted-foreground/60 select-none"># Install pattern primitives</div>
          <div className="mt-1 flex items-center justify-between">
            <span>pnpm add @workspace/pattern radix-ui</span>
            <span className="text-[10px] text-muted-foreground">bash</span>
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/40 p-3 font-mono text-xs text-foreground">
          <div className="text-purple-400">import</div> &#123; <span className="text-amber-400">CardTabs</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">&quot;@workspace/pattern&quot;</span>
        </div>
      </div>
    ),
  },
  {
    id: "api",
    label: "API Reference",
    icon: <RiCodeSSlashLine className="size-3.5" />,
    content: (
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Component Props</h4>
          <p className="text-xs text-muted-foreground">
            Strongly-typed headless slots and configuration parameters.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border/70">
          <table className="w-full text-start font-mono text-[11px]">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="p-2 text-start">Prop</th>
                <th className="p-2 text-start">Type</th>
                <th className="p-2 text-start">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground">
              <tr>
                <td className="p-2 font-semibold text-primary">items</td>
                <td className="p-2 text-muted-foreground">TabItemData[]</td>
                <td className="p-2 text-muted-foreground/60">required</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-primary">defaultValue</td>
                <td className="p-2 text-muted-foreground">string</td>
                <td className="p-2 text-muted-foreground/60">items[0].id</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-primary">slots</td>
                <td className="p-2 text-muted-foreground">Partial&lt;TabsSlots&gt;</td>
                <td className="p-2 text-muted-foreground/60">undefined</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: "cli",
    label: "CLI Commands",
    icon: <RiTerminalBoxLine className="size-3.5" />,
    content: (
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Code Generation</h4>
          <p className="text-xs text-muted-foreground">
            Scaffold interactive tabs variants directly into your workspace.
          </p>
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/40 p-3 font-mono text-xs text-foreground">
          <div className="text-muted-foreground/60 select-none"># Add tab variant to your project</div>
          <div className="mt-1">npx @workspace/cli add tabs --variant=folder</div>
        </div>
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
