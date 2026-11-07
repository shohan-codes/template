"use client"
import type { ShowcaseItem } from "@/components/example-page-shell"
import { ShowcaseFamilyPage } from "@/components/showcase-family-page"
import BasicExample from "./basic-example"
import BasicExampleRaw from "./basic-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import MegaExample from "./mega-example"
import MegaExampleRaw from "./mega-example.tsx?raw" with {
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
    id: "basic-navigation-menu",
    title: "Basic navigation menu",
    description:
      "A neutral site menu with real links, an active destination, and a disabled disclosure. Arrow keys, Enter, and Escape keep navigation accessible.",
    code: BasicExampleRaw,
    preview: <BasicExample />,
  },
  {
    id: "mega-navigation-menu",
    title: "Mega navigation variant",
    description:
      "Grouped destinations in a wider panel. Two columns become one within narrow containers.",
    code: MegaExampleRaw,
    preview: <MegaExample />,
  },
  {
    id: "controlled-navigation-menu",
    title: "Controlled navigation with a router",
    description:
      "External state and an optional Next.js Link anchor slot without losing navigation semantics.",
    code: ControlledExampleRaw,
    preview: <ControlledExample />,
  },
]
export default function NavigationMenuShowcase({
  variantId,
}: {
  readonly variantId?: string
}) {
  return (
    <ShowcaseFamilyPage
      familyId="navigation-menu"
      variantId={variantId}
      items={items}
    />
  )
}
