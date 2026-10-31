"use client"

import {
  ExamplePageShell,
  type ShowcaseItem,
} from "@/components/example-page-shell"

import DefaultTabsExample from "./default-tabs-example"
import DefaultTabsExampleRaw from "./default-tabs-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import LineTabsExample from "./line-tabs-example"
import LineTabsExampleRaw from "./line-tabs-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import CardTabsExample from "./card-tabs-example"
import CardTabsExampleRaw from "./card-tabs-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const tabsShowcaseItems: readonly ShowcaseItem[] = [
  {
    id: "default-tabs",
    title: "Default Tabs (Pill Style)",
    description:
      "Data-driven tabs with optional icons and notification badges in trigger buttons.",
    code: DefaultTabsExampleRaw,
    preview: <DefaultTabsExample />,
  },
  {
    id: "line-tabs",
    title: "Line Variant with Actions",
    description:
      "Underlined tabs variant with right-aligned action buttons in the header row.",
    code: LineTabsExampleRaw,
    preview: <LineTabsExample />,
  },
  {
    id: "card-tabs",
    title: "Card Tabs Variant",
    description:
      "Enclosed card container with header tabs and bordered content panel.",
    code: CardTabsExampleRaw,
    preview: <CardTabsExample />,
  },
]

export default function TabsShowcase() {
  return (
    <ExamplePageShell
      title="Tabs Patterns"
      description="Accessible, data-driven tabbed navigation powered by Radix UI primitives with loosely coupled slot architecture."
      items={tabsShowcaseItems}
    />
  )
}

