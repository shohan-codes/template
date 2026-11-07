# Breadcrumbs

Import `Breadcrumbs` or `ScrollableBreadcrumbs` from `@workspace/pattern/breadcrumbs`.

Both variants use the existing shadcn breadcrumb primitives. Breadcrumbs wraps long trails and labels naturally. ScrollableBreadcrumbs keeps the trail on one horizontally scrollable row without widening its parent.

## Data

Every item requires a stable `id`, `label`, and `type`. A `link` requires an `href` and may have an icon or per-link `$link` props. A `page` is non-interactive and receives `aria-current="page"`. Supply one page item at the end of the trail. Empty items render nothing; a one-item trail has no separator.

Links are real anchors. The current page is a span, not a fake disabled link. Separators are decorative and hidden from assistive technology. The default navigation label is "Breadcrumb" and can be replaced with root `aria-label` for pages with several trails.

## Customization

Variants provide complete defaults; slots are not needed for normal use. `BreadcrumbsCore` requires `defaultSlots`; runtime `slots` override them. Use `slots.Link` for a router integration such as Next.js Link. Typed `$list`, `$item`, `$link`, `$page`, and `$separator` props allow targeted customization. Per-item link props override shared link props, while the typed item's href remains authoritative.

Use `separator` for a different decorative separator. The default remains the existing shadcn chevron.

Showcases cover defaults, scrollable trails, router slots and long labels. Contract/type tests verify navigation semantics, empty data, destinations and invalid inputs; browser checks cover keyboard navigation, history, narrow layouts and color themes.
