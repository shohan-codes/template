"use client"

import {
  ExamplePageShell,
  type ShowcaseItem,
} from "@/components/example-page-shell"
import DefaultCommandPaletteExample from "./default-command-palette-example"
import DefaultCommandPaletteExampleRaw from "./default-command-palette-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import InlineCommandSearchExample from "./inline-command-search-example"
import InlineCommandSearchExampleRaw from "./inline-command-search-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import ControlledCommandPaletteExample from "./controlled-command-palette-example"
import ControlledCommandPaletteExampleRaw from "./controlled-command-palette-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}
import CustomCommandSearchExample from "./custom-command-search-example"
import CustomCommandSearchExampleRaw from "./custom-command-search-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const items: readonly ShowcaseItem[] = [
  {
    id: "default-command-palette",
    title: "Default Command Palette",
    description:
      "A neutral modal using standard shadcn styling. Text and typed data are sufficient; filtering, disabled actions, keyboard navigation, dismissal and focus restoration are built in.",
    code: DefaultCommandPaletteExampleRaw,
    preview: <DefaultCommandPaletteExample />,
  },
  {
    id: "inline-command-search",
    title: "Inline Command Search",
    description:
      "A separate, always-visible search variant. It shares the action data contract without opening a dialog or trapping focus.",
    code: InlineCommandSearchExampleRaw,
    preview: <InlineCommandSearchExample />,
  },
  {
    id: "controlled-command-palette",
    title: "Controlled State and Selection",
    description:
      "Controlled open state and query, with a per-action keep-open policy for repeat actions.",
    code: ControlledCommandPaletteExampleRaw,
    preview: <ControlledCommandPaletteExample />,
  },
  {
    id: "custom-command-search",
    title: "Optional Slot Customization",
    description:
      "A runtime item slot and typed $root props add spacing and a muted surface while retaining cmdk behavior.",
    code: CustomCommandSearchExampleRaw,
    preview: <CustomCommandSearchExample />,
  },
]

export default function CommandPaletteShowcase() {
  return (
    <ExamplePageShell
      title="Command Palette Patterns"
      description="Typed commands with a neutral modal default and a distinct inline search variant. No global keyboard shortcuts are registered."
      items={items}
    />
  )
}
