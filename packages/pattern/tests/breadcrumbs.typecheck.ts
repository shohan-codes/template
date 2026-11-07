import type { BreadcrumbItemData } from "../src/breadcrumbs"
const link: BreadcrumbItemData = {
  id: "home",
  type: "link",
  label: "Home",
  href: "/",
}
const page: BreadcrumbItemData = {
  id: "current",
  type: "page",
  label: "Current",
}
// @ts-expect-error A link needs a destination.
const missingHref: BreadcrumbItemData = {
  id: "home",
  type: "link",
  label: "Home",
}
// @ts-expect-error Every entry needs stable identity.
const missingId: BreadcrumbItemData = { type: "page", label: "Current" }
const invalidPage: BreadcrumbItemData = {
  id: "current",
  type: "page",
  label: "Current",
  // @ts-expect-error A page item is not a navigation link.
  href: "/",
}
void [link, page, missingHref, missingId, invalidPage]
