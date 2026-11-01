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

import FloatingFolderTabsExample from "./floating-folder-tabs-example"
import FloatingFolderTabsExampleRaw from "./floating-folder-tabs-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import QueryTabsExample from "./query-tabs-example"
import QueryTabsExampleRaw from "./query-tabs-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import HashTabsExample from "./hash-tabs-example"
import HashTabsExampleRaw from "./hash-tabs-example.tsx?raw" with {
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
    id: "query-tabs",
    title: "Query Parameter Tabs (Next.js useSearchParams)",
    description:
      "SSR-friendly URL query routing using Next.js useSearchParams() without any useEffect or client listeners.",
    code: QueryTabsExampleRaw,
    preview: <QueryTabsExample />,
  },
  {
    id: "hash-tabs",
    title: "Hash Deep-Link Tabs (window.location.hash)",
    description:
      "Anchor hash deep-linking with client-side mount synchronization and shareable browser bookmark URLs.",
    code: HashTabsExampleRaw,
    preview: <HashTabsExample />,
  },
  {
    id: "folder-tabs-enclosed",
    title: "Enclosed Folder Tabs (macOS Window)",
    description:
      "Connected folder tabs with an integrated header tab strip, seamless cutout, and enclosed content window.",
    code: FolderTabsExampleRaw,
    preview: <FolderTabsExample />,
  },
  {
    id: "folder-tabs-floating",
    title: "Floating Folder Tabs (Classic Filing Tabs)",
    description:
      "Classic file-folder index tabs floating directly above a standalone bordered content card.",
    code: FloatingFolderTabsExampleRaw,
    preview: <FloatingFolderTabsExample />,
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
