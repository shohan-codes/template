"use client"
import type { ShowcaseItem } from "@/components/example-page-shell"
import { ShowcaseFamilyPage } from "@/components/showcase-family-page"
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
import FloatingExample from "./floating-example"
import FloatingExampleRaw from "./floating-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
const items: readonly ShowcaseItem[] = [
  {
    id: "basic-toolbar",
    title: "Basic editor toolbar",
    description:
      "Actions, a disabled button, independent toggles, and a real link. Use arrow keys, Home, and End to move between controls.",
    code: BasicExampleRaw,
    preview: <BasicExample />,
  },
  {
    id: "floating-toolbar",
    title: "Floating toolbar variant",
    description:
      "A separately importable floating surface with named icon controls and controlled multiple selection.",
    code: FloatingExampleRaw,
    preview: <FloatingExample />,
  },
  {
    id: "controlled-toolbar",
    title: "Controlled vertical toolbar",
    description:
      "A single-choice group with external state and a reset action. Up and Down follow the toolbar orientation.",
    code: ControlledExampleRaw,
    preview: <ControlledExample />,
  },
]
export default function ToolbarShowcase({
  variantId,
}: {
  readonly variantId?: string
}) {
  return (
    <ShowcaseFamilyPage
      familyId="toolbar"
      variantId={variantId}
      items={items}
    />
  )
}
