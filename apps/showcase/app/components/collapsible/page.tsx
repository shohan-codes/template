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
import NestedExample from "./nested-example"
import NestedExampleRaw from "./nested-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import CardExample from "./card-example"
import CardExampleRaw from "./card-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import CustomExample from "./custom-example"
import CustomExampleRaw from "./custom-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
const items: readonly ShowcaseItem[] = [
  {
    id: "basic-collapsible",
    title: "Basic disclosure",
    description:
      "Neutral styling and an items array. No slots or custom layout required.",
    code: BasicExampleRaw,
    preview: <BasicExample />,
  },
  {
    id: "nested-collapsible",
    title: "Recursive content",
    description:
      "Groups organize content; nested disclosures expand independently. These are not menus.",
    code: NestedExampleRaw,
    preview: <NestedExample />,
  },
  {
    id: "controlled-collapsible",
    title: "Controlled disclosure",
    description:
      "Controlled parent and nested state, an external toggle, and disabled sections. JSX children still work.",
    code: ControlledExampleRaw,
    preview: <ControlledExample />,
  },
  {
    id: "card-collapsible",
    title: "Card variant",
    description:
      "A separate, opt-in bordered surface using the same data and behavior.",
    code: CardExampleRaw,
    preview: <CardExample />,
  },
  {
    id: "custom-collapsible",
    title: "Optional customization",
    description:
      "Custom content can contain ordinary controls. Override a slot only when needed.",
    code: CustomExampleRaw,
    preview: <CustomExample />,
  },
]
export default function CollapsibleShowcase() {
  return (
    <ExamplePageShell
      title="Collapsible Patterns"
      description="Data-first recursive content, neutral defaults, and accessible disclosure behavior."
      items={items}
    />
  )
}
