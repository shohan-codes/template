# Navigation Menu

Import `NavigationMenu` or `MegaNavigationMenu` from `@workspace/pattern/navigation-menu`.

The default variant uses the existing shadcn navigation primitives with neutral styles. The mega variant provides a wider, two-column panel that becomes one column inside a narrow container. Both use the same core, item contract, and keyboard behavior.

## Data

- Every item has a stable, unique `id` and a `type` discriminator.
- A `link` has `label` and a required `href`. It may include `icon`, `description`, `active`, `onSelect`, and anchor props. `active` applies `aria-current="page"`.
- A top-level `submenu` has `label`, optional `disabled`, and `items` containing links or static groups.
- A static `group` has a label and link items. Groups do not toggle or behave like nested action menus.
- Use root `value`, `defaultValue`, and `onValueChange` to control the open submenu by its ID. An empty value closes the panel.

This is site navigation, not an application action menu. Links remain genuine anchors, top-level panels use disclosure buttons, and lists keep ordinary navigation/list semantics. Use Dropdown or Context Menu for commands and checkbox/radio menu items.

## Customization

The core requires injected `defaultSlots`; ready-to-use variants supply them. Per-instance `slots` take precedence. `slots.Anchor` can be a router link such as Next.js Link, while `slots.Link` retains the Radix navigation behavior.

Typed `$list`, `$trigger`, `$content`, `$link`, `$anchor`, and `$contentList` props extend presentation and safe primitive options. Data-owned values, destinations, active state, and disabled state are applied after slot props. Custom slots must preserve forwarded props, children, refs where applicable, and accessibility behavior.

## Keyboard and layout

These variants are horizontal site navigation; use Sidebar for vertical site navigation. Radix supplies arrow navigation, Enter/Space activation, Escape dismissal, and focus management. Disabled submenu triggers are skipped. Navigation panels are bounded to the containing navigation width and scroll vertically when needed. Long link labels/descriptions wrap. Group columns respond to the navigation container rather than the browser viewport.

Showcases cover a default menu, grouped mega navigation, and controlled state with a router anchor. Tests cover semantic structure, data rendering, slot overrides, empty input, and positive/negative TypeScript inputs.
