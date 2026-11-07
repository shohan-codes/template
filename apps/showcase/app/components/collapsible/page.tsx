"use client"
import { ExamplePageShell } from "@/components/example-page-shell"
import type { ShowcaseItem } from "@/components/example-page-shell"
import BasicExample from "./basic-example"
import BasicExampleRaw from "./basic-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import ControlledExample from "./controlled-example"
import ControlledExampleRaw from "./controlled-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
const items: readonly ShowcaseItem[] = [
  {
    id: "basic-collapsible",
    title: "Basic disclosure",
    description:
      "Keyboard-accessible disclosure with an independent open state.",
    code: BasicExampleRaw,
    preview: <BasicExample />,
  },
  {
    id: "controlled-collapsible",
    title: "Controlled disclosure",
    description: "External state, a second toggle, and a disabled section.",
    code: ControlledExampleRaw,
    preview: <ControlledExample />,
  },
]
export default function CollapsibleShowcase() {
  return (
    <ExamplePageShell
      title="Collapsible Patterns"
      description="Accessible disclosure behavior with controlled and uncontrolled state."
      items={items}
    />
  )
}
