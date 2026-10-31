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

import SegmentedTabsExample from "./segmented-tabs-example"
import SegmentedTabsExampleRaw from "./segmented-tabs-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import FolderTabsExample from "./folder-tabs-example"
import FolderTabsExampleRaw from "./folder-tabs-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import SidebarTabsExample from "./sidebar-tabs-example"
import SidebarTabsExampleRaw from "./sidebar-tabs-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const tabsShowcaseItems: readonly ShowcaseItem[] = [
  {
    id: "segmented-tabs",
    title: "Segmented Control Variant (Apple / Linear)",
    description:
      "Floating capsule pill switcher with rounded-full geometry, backdrop blur, and micro-elevation.",
    code: SegmentedTabsExampleRaw,
    preview: <SegmentedTabsExample />,
  },
  {
    id: "folder-tabs",
    title: "Connected Folder Tabs (VS Code / GitHub)",
    description:
      "Classic browser & code-editor tab bar where the active tab seamlessly merges with the content container below.",
    code: FolderTabsExampleRaw,
    preview: <FolderTabsExample />,
  },
  {
    id: "sidebar-tabs",
    title: "Sidebar Settings Variant (Notion / Vercel)",
    description:
      "Vertical navigation layout featuring stacked triggers with icons and badges alongside a content pane.",
    code: SidebarTabsExampleRaw,
    preview: <SidebarTabsExample />,
  },
  {
    id: "card-tabs",
    title: "Card Container Variant",
    description:
      "Enclosed card container with header tabs and bordered content panel.",
    code: CardTabsExampleRaw,
    preview: <CardTabsExample />,
  },
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
