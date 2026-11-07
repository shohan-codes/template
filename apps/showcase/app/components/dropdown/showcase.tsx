"use client"

import type { ShowcaseItem } from "@/components/example-page-shell"
import { ShowcaseFamilyPage } from "@/components/showcase-family-page"
import ActionDropdownExample from "./action-dropdown-example"
import ActionDropdownExampleRaw from "./action-dropdown-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import PreferencesDropdownExample from "./preferences-dropdown-example"
import PreferencesDropdownExampleRaw from "./preferences-dropdown-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import CustomDropdownExample from "./custom-dropdown-example"
import CustomDropdownExampleRaw from "./custom-dropdown-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import IconDropdownExample from "./icon-dropdown-example"
import IconDropdownExampleRaw from "./icon-dropdown-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import SplitDropdownExample from "./split-dropdown-example"
import SplitDropdownExampleRaw from "./split-dropdown-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const dropdownShowcaseItems: readonly ShowcaseItem[] = [
  {
    id: "action-dropdown",
    title: "Action Dropdown",
    description:
      "Typed project actions with nested export menus, disabled items, and destructive styling. All actions are local demonstrations.",
    code: ActionDropdownExampleRaw,
    preview: <ActionDropdownExample />,
  },
  {
    id: "preferences-dropdown",
    title: "Preferences Dropdown",
    description:
      "Controlled checkbox and radio items. Toggle several options without closing the menu, then choose a display density.",
    code: PreferencesDropdownExampleRaw,
    preview: <PreferencesDropdownExample />,
  },
  {
    id: "custom-dropdown",
    title: "Custom Dropdown",
    description:
      "Runtime item-slot replacement and controlled open state with the same data-driven core and keyboard behavior.",
    code: CustomDropdownExampleRaw,
    preview: <CustomDropdownExample />,
  },
  {
    id: "icon-dropdown",
    title: "Icon Dropdown",
    description:
      "Compact overflow actions with a required accessible trigger name, disabled actions, and end alignment.",
    code: IconDropdownExampleRaw,
    preview: <IconDropdownExample />,
  },
  {
    id: "split-dropdown",
    title: "Split Dropdown",
    description:
      "A direct primary action and a separate alternatives menu, with controlled open state and independent callbacks.",
    code: SplitDropdownExampleRaw,
    preview: <SplitDropdownExample />,
  },
]

export default function DropdownShowcase({
  variantId,
}: {
  readonly variantId?: string
}) {
  return (
    <ShowcaseFamilyPage
      familyId="dropdown"
      variantId={variantId}
      items={dropdownShowcaseItems}
    />
  )
}
