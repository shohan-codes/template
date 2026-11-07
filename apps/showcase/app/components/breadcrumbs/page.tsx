"use client"
import {
  ExamplePageShell,
  type ShowcaseItem,
} from "@/components/example-page-shell"
import BasicExample from "./basic-example"
import BasicExampleRaw from "./basic-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import CustomExample from "./custom-example"
import CustomExampleRaw from "./custom-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import ScrollableExample from "./scrollable-example"
import ScrollableExampleRaw from "./scrollable-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
const items: readonly ShowcaseItem[] = [
  {
    id: "basic-breadcrumbs",
    title: "Basic breadcrumb trail",
    description:
      "Real links followed by a non-interactive current page. No styling or slots required.",
    code: BasicExampleRaw,
    preview: <BasicExample />,
  },
  {
    id: "scrollable-breadcrumbs",
    title: "Scrollable breadcrumb variant",
    description:
      "A separately importable single-row trail for deep hierarchies. Long trails scroll without widening the page.",
    code: ScrollableExampleRaw,
    preview: <ScrollableExample />,
  },
  {
    id: "custom-breadcrumbs",
    title: "Optional routing and separator",
    description:
      "A Next.js Link slot, a custom separator, and long labels that wrap on small screens.",
    code: CustomExampleRaw,
    preview: <CustomExample />,
  },
]
export default function BreadcrumbsShowcase() {
  return (
    <ExamplePageShell
      title="Breadcrumbs Patterns"
      description="Accessible, typed location trails that keep destinations distinct from the current page."
      items={items}
    />
  )
}
