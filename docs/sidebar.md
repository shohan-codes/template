# Sidebar

The Sidebar pattern renders useful, plain navigation from typed data. Use the default as-is; slots and shared `$` props are escape hatches, not required setup.

```tsx
import { Sidebar } from "@workspace/pattern/sidebar"
import { SidebarProvider, SidebarTrigger } from "@workspace/shadcn-ui/components/sidebar"
import type { SidebarItemData } from "@workspace/pattern/sidebar"

const items: readonly SidebarItemData[] = [
  { type: "link", id: "home", label: "Home", href: "/" },
  {
    type: "group", id: "workspace", label: "Workspace", items: [
      { type: "link", id: "inbox", label: "Inbox", href: "/inbox", badge: 4 },
      {
        type: "disclosure", id: "projects", label: "Projects", items: [
          { type: "link", id: "website", label: "Website", href: "/projects/website" },
        ],
      },
    ],
  },
]

export function Layout() {
  return (
    <SidebarProvider>
      <Sidebar items={items} activeHref="/inbox" />
      <main><SidebarTrigger />Content</main>
    </SidebarProvider>
  )
}
```

## Data and behavior

Every entry has a stable ID unique in the complete tree. `link` owns its destination, active state and disabled state. `action` is a button with an optional `onSelect(event)` callback. `group` is a static label and children; `disclosure` is an expandable section. `label` and `separator` provide simple organization. Groups and disclosures can contain further groups and disclosures.

This vocabulary matches the other patterns where the meanings overlap. Navigation links are not menu items. Sidebar action callbacks receive the native, cancellable click `Event`, including keyboard-triggered clicks. Dropdown and Context Menu callbacks receive their primitive's selection event instead. Sidebar does not implement a menu-close default action.

Pass `activeHref` for exact route matching. Uncontrolled navigation opens active ancestors initially and when the route changes, without closing other sections. `defaultExpandedIds` adds initial expansions. For controlled behavior, pass `expandedIds` and `onExpandedChange`; controlled state stays authoritative.

`onNavigate(item, event)` runs only for unmodified, same-tab link activation. Call `event.preventDefault()` there for client-side routing. Modified clicks and external targets retain native browser behavior. Disabled links cannot navigate; disabled actions and disclosures do not run callbacks.

## Variants and layout

- `Sidebar`, from `@workspace/pattern/sidebar/variants/default-sidebar`, is the plain docked variant.
- `FloatingSidebar`, from `@workspace/pattern/sidebar/variants/floating-sidebar`, adds an opt-in floating surface. Its data and behavior are the same.

Both are also exported by `@workspace/pattern/sidebar`. They use the primitive `SidebarProvider`. The default responsive shell uses a mobile Sheet with close, Escape and focus restoration to `SidebarTrigger`. Desktop off-canvas navigation is inert while hidden. `collapsible="none"` creates an inline, always-visible navigation region, useful for isolated previews. `collapsible="icon"` retains the primitive's icon-rail behavior.

Use ordinary `header` and `footer` content when the layout needs it. Slots are optional. `SidebarCore` receives injected `defaultSlots`, then runtime `slots` override individual pieces. Core behavior contains no presentation classes. Custom slots must forward children, semantic attributes and event handlers. `$link` and `$button` cannot replace data-owned destinations, disabled state or disclosure ARIA semantics.

## Showcase

The app uses this pattern for its own navigation. Each family expands to an overview and dedicated variant pages; a variant page contains only that variant's designs. The registry in `apps/showcase/lib/showcase-registry.ts` drives navigation, dashboard cards, route metadata, static parameters and preview validation. New families also register their showcase component in `showcase-components.ts`.

Existing family URLs and standalone preview URLs remain valid. The preview controls stay inline and iframe-free. Primary examples pass data/configuration only; the Floating variant is a separate import rather than a mandatory customization recipe.
