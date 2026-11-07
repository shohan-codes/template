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

import ActionsContextMenuExample from "./actions-context-menu-example"
import ActionsContextMenuExampleRaw from "./actions-context-menu-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import SelectionContextMenuExample from "./selection-context-menu-example"
import SelectionContextMenuExampleRaw from "./selection-context-menu-example.tsx?raw" with {
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
  {
    id: "actions-context-menu",
    title: "Actions Context Menu",
    description:
      "The same file actions through a right-click surface and a visible button, sharing controlled checkbox state.",
    code: ActionsContextMenuExampleRaw,
    preview: <ActionsContextMenuExample />,
  },
  {
    id: "selection-context-menu",
    title: "Selection Context Menu",
    description:
      "Caller-owned selection switches between single-file and bulk actions, with an explicit empty state.",
    code: SelectionContextMenuExampleRaw,
    preview: <SelectionContextMenuExample />,
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
