"use client"
import { ShowcaseFamilyPage } from "@/components/showcase-family-page"
import type { ShowcaseItem } from "@/components/example-page-shell"
import WorkspaceExample from "./workspace-example"
import WorkspaceExampleRaw from "./workspace-example.tsx?raw" with {
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
    id: "workspace-sidebar",
    title: "Workspace navigation",
    description:
      "Plain default navigation from typed links, groups, disclosures and actions.",
    code: WorkspaceExampleRaw,
    preview: <WorkspaceExample />,
  },
  {
    id: "controlled-sidebar",
    title: "Controlled navigation",
    description:
      "External expansion state and route selection using ordinary configuration.",
    code: ControlledExampleRaw,
    preview: <ControlledExample />,
  },
  {
    id: "floating-sidebar",
    title: "Floating navigation",
    description:
      "An optional elevated surface with the same typed data and behavior.",
    code: FloatingExampleRaw,
    preview: <FloatingExample />,
  },
]
export default function SidebarShowcase({
  variantId,
}: {
  readonly variantId?: string
}) {
  return (
    <ShowcaseFamilyPage
      familyId="sidebar"
      variantId={variantId}
      items={items}
    />
  )
}
