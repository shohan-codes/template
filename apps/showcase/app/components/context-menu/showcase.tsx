"use client"

import type { ShowcaseItem } from "@/components/example-page-shell"
import { ShowcaseFamilyPage } from "@/components/showcase-family-page"
import FileContextMenuExample from "./file-context-menu-example"
import FileContextMenuExampleRaw from "./file-context-menu-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import PreferencesContextMenuExample from "./preferences-context-menu-example"
import PreferencesContextMenuExampleRaw from "./preferences-context-menu-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import CustomContextMenuExample from "./custom-context-menu-example"
import CustomContextMenuExampleRaw from "./custom-context-menu-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const contextMenuShowcaseItems: readonly ShowcaseItem[] = [
  {
    id: "file-context-menu",
    title: "File Context Menu",
    description:
      "Right-click file actions with nested destinations, disabled sharing, and destructive styling. Focus the surface and use Shift+F10 or the ContextMenu key. All actions are local demos.",
    code: FileContextMenuExampleRaw,
    preview: <FileContextMenuExample />,
  },
  {
    id: "preferences-context-menu",
    title: "Preferences Context Menu",
    description:
      "Controlled canvas checkboxes stay open while toggling; radio items update zoom. Radix supplies arrow navigation, typeahead, and dismissal.",
    code: PreferencesContextMenuExampleRaw,
    preview: <PreferencesContextMenuExample />,
  },
  {
    id: "custom-context-menu",
    title: "Custom Context Menu",
    description:
      "Replace the item slot while preserving the primitive behavior. A local article workflow reports selection and open state.",
    code: CustomContextMenuExampleRaw,
    preview: <CustomContextMenuExample />,
  },
]

export default function ContextMenuShowcase({
  variantId,
}: {
  readonly variantId?: string
}) {
  return (
    <ShowcaseFamilyPage
      familyId="context-menu"
      variantId={variantId}
      items={contextMenuShowcaseItems}
    />
  )
}
