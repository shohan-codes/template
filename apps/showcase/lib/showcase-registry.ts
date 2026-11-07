/** One catalog drives navigation, variant routes, previews, and dashboard cards. */
export interface ShowcaseVariant {
  readonly id: string
  readonly label: string
  readonly description: string
  readonly exampleIds: readonly string[]
}
export interface ShowcaseFamily {
  readonly id: string
  readonly label: string
  readonly description: string
  readonly variants: readonly ShowcaseVariant[]
}
export const showcaseFamilies: readonly ShowcaseFamily[] = [
  {
    id: "command-palette",
    label: "Command Palette",
    description:
      "Typed command actions with a neutral modal default and a separate inline search variant. No global keyboard shortcuts are registered.",
    variants: [
      {
        id: "default",
        label: "Default",
        description:
          "A neutral modal command palette with filtering, keyboard navigation, and controlled state.",
        exampleIds: ["default-command-palette", "controlled-command-palette"],
      },
      {
        id: "inline",
        label: "Inline",
        description:
          "Always-visible command search, with optional slot customization.",
        exampleIds: ["inline-command-search", "custom-command-search"],
      },
    ],
  },
  {
    id: "navigation-menu",
    label: "Navigation Menu",
    description:
      "Typed site navigation with real links, disclosure panels, and grouped destinations.",
    variants: [
      {
        id: "default",
        label: "Default",
        description:
          "Neutral horizontal navigation with optional controlled state and router anchors.",
        exampleIds: ["basic-navigation-menu", "controlled-navigation-menu"],
      },
      {
        id: "mega",
        label: "Mega",
        description:
          "Grouped destinations in a wider panel that adapts to its container.",
        exampleIds: ["mega-navigation-menu"],
      },
    ],
  },
  {
    id: "toolbar",
    label: "Toolbar",
    description:
      "Typed tool groups, actions and controls with keyboard navigation.",
    variants: [
      {
        id: "default",
        label: "Default",
        description: "Plain tool rows with controlled choices.",
        exampleIds: ["basic-toolbar", "controlled-toolbar"],
      },
      {
        id: "floating",
        label: "Floating",
        description: "A separate raised surface for contextual tools.",
        exampleIds: ["floating-toolbar"],
      },
    ],
  },
  {
    id: "breadcrumbs",
    label: "Breadcrumbs",
    description:
      "Typed location trails with overflow and current-page semantics.",
    variants: [
      {
        id: "default",
        label: "Default",
        description: "Plain location trails with optional customization.",
        exampleIds: ["basic-breadcrumbs", "custom-breadcrumbs"],
      },
      {
        id: "scrollable",
        label: "Scrollable",
        description: "Long location trails in a horizontal scrolling region.",
        exampleIds: ["scrollable-breadcrumbs"],
      },
    ],
  },
  {
    id: "sidebar",
    label: "Sidebar",
    description:
      "Typed navigation with nested disclosures, route awareness, and a responsive shell.",
    variants: [
      {
        id: "default",
        label: "Default",
        description: "Plain navigation for application layouts.",
        exampleIds: ["workspace-sidebar", "controlled-sidebar"],
      },
      {
        id: "floating",
        label: "Floating",
        description:
          "An opt-in elevated surface with the same navigation behavior.",
        exampleIds: ["floating-sidebar"],
      },
    ],
  },
  {
    id: "collapsible",
    label: "Collapsible",
    description:
      "Data-first recursive content and accessible disclosure behavior.",
    variants: [
      {
        id: "default",
        label: "Default",
        description: "Minimal disclosures and recursive content.",
        exampleIds: [
          "basic-collapsible",
          "nested-collapsible",
          "controlled-collapsible",
          "custom-collapsible",
        ],
      },
      {
        id: "card",
        label: "Card",
        description: "An optional bordered disclosure surface.",
        exampleIds: ["card-collapsible"],
      },
    ],
  },
  {
    id: "dropdown",
    label: "Dropdown",
    description:
      "Typed menus with actions, submenus and controlled preferences.",
    variants: [
      {
        id: "default",
        label: "Default",
        description:
          "Standard dropdown menus, with optional customization shown separately.",
        exampleIds: [
          "action-dropdown",
          "preferences-dropdown",
          "custom-dropdown",
        ],
      },
    ],
  },
  {
    id: "context-menu",
    label: "Context Menu",
    description: "Contextual actions with keyboard access and nested menus.",
    variants: [
      {
        id: "default",
        label: "Default",
        description: "Right-click actions and controlled preferences.",
        exampleIds: [
          "file-context-menu",
          "preferences-context-menu",
          "custom-context-menu",
        ],
      },
    ],
  },
  {
    id: "accordion",
    label: "Accordion",
    description: "Accessible panels powered by data and disclosure primitives.",
    variants: [
      {
        id: "default",
        label: "Default",
        description: "Plain accordion with step indicators.",
        exampleIds: ["step-icon-accordion"],
      },
      {
        id: "card",
        label: "Card",
        description: "A bordered accordion presentation.",
        exampleIds: ["card-accordion"],
      },
    ],
  },
  {
    id: "tabs",
    label: "Tabs",
    description:
      "Strict panel selection with compatible query and hash routing.",
    variants: [
      {
        id: "default",
        label: "Default",
        description: "Standard and line treatments.",
        exampleIds: ["default-tabs", "line-tabs"],
      },
      {
        id: "segmented",
        label: "Segmented",
        description:
          "Typed segmented controls and legacy query/hash compatibility examples.",
        exampleIds: ["segmented-tabs", "query-tabs", "hash-tabs"],
      },
      {
        id: "folder",
        label: "Folder",
        description: "Enclosed and floating folder designs.",
        exampleIds: ["folder-tabs-enclosed", "folder-tabs-floating"],
      },
    ],
  },
  {
    id: "code-block",
    label: "Code Block",
    description:
      "Syntax-highlighted code, diffs, terminal output and tabbed files.",
    variants: [
      {
        id: "editor",
        label: "Editor",
        description: "Single-file code with line numbers, diffs and focus.",
        exampleIds: [
          "basic-code-block",
          "line-numbers-and-highlight",
          "diff-code-block",
          "focus-code-block",
        ],
      },
      {
        id: "terminal",
        label: "Terminal",
        description: "Terminal-style single-file output.",
        exampleIds: ["terminal-code-block"],
      },
      {
        id: "tabs",
        label: "Tabs",
        description: "Switch between multiple code files.",
        exampleIds: ["multi-tab-code-block"],
      },
      {
        id: "terminal-tabs",
        label: "Terminal tabs",
        description: "Tabbed command-line snippets.",
        exampleIds: ["terminal-tabs-code-block"],
      },
    ],
  },
  {
    id: "questionnaire",
    label: "Questionnaire",
    description:
      "Existing sequential questions with choice controls and progress.",
    variants: [
      {
        id: "default",
        label: "Default",
        description: "Single and multiple choice question designs.",
        exampleIds: ["single-choice-with-input", "multiple-choice-checkbox"],
      },
      {
        id: "card",
        label: "Card",
        description: "A contained questionnaire presentation.",
        exampleIds: ["card-questionnaire"],
      },
    ],
  },
]
export function getShowcaseFamily(id: string) {
  return showcaseFamilies.find((family) => family.id === id)
}
export function familyHref(id: string) {
  return `/components/${id}`
}
export function variantHref(familyId: string, variantId: string) {
  return `${familyHref(familyId)}/${variantId}`
}
export function getShowcaseRoute(pathname: string) {
  const parts = pathname.split("/")
  if (parts.length > 4) return undefined
  const [, section, familyId, variantId] = parts
  if (section !== "components" || !familyId) return undefined
  const family = getShowcaseFamily(familyId)
  if (!family) return undefined
  const variant = family.variants.find((item) => item.id === variantId)
  if (variantId && !variant) return undefined
  return { family, variant }
}
