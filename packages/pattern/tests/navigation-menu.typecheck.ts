import type {
  NavigationMenuItemData,
  NavigationMenuProps,
} from "../src/navigation-menu"
const link: NavigationMenuItemData = {
  id: "home",
  type: "link",
  label: "Home",
  href: "/",
}
const submenu: NavigationMenuItemData = {
  id: "resources",
  type: "submenu",
  label: "Resources",
  items: [
    {
      id: "group",
      type: "group",
      label: "Documentation",
      items: [{ id: "guide", type: "link", label: "Guide", href: "/guide" }],
    },
  ],
}
// @ts-expect-error Links need destinations.
const missingHref: NavigationMenuItemData = {
  id: "home",
  type: "link",
  label: "Home",
}
// @ts-expect-error Stable identity is required.
const missingId: NavigationMenuItemData = {
  type: "link",
  label: "Home",
  href: "/",
}
const badProps: NavigationMenuProps = {
  items: [],
  $trigger: {
    // @ts-expect-error Disabled state belongs to the typed item.
    disabled: true,
  },
}
void [link, submenu, missingHref, missingId, badProps]

const unsupportedOrientation: NavigationMenuProps = {
  items: [],
  // @ts-expect-error The supplied navigation variants use horizontal layout and matching keys.
  orientation: "vertical",
}
void unsupportedOrientation
