import type { IconDropdownProps } from "../src/dropdown/variants/icon-dropdown"
import type { SplitDropdownProps } from "../src/dropdown/variants/split-dropdown"

const items = [{ id: "save", type: "action", label: "Save draft" }] as const

export const icon: IconDropdownProps = {
  label: "Project actions",
  items,
  $trigger: { disabled: false },
  onOpenChange: (open: boolean) => void open,
}

export const split: SplitDropdownProps = {
  items,
  menuLabel: "More sending options",
  primaryAction: {
    label: "Send message",
    onClick: (event) => event.currentTarget.focus(),
  },
  $primary: { title: "Send now" },
  $container: { "aria-label": "Delivery" },
}

// @ts-expect-error An icon-only menu must have a textual accessible name.
export const unnamedIcon: IconDropdownProps = { items }

export const customIconTrigger: IconDropdownProps = {
  ...icon,
  // @ts-expect-error The variant owns the trigger element; use Dropdown for asChild.
  $trigger: { asChild: true },
}

// @ts-expect-error The split menu needs a secondary accessible name.
export const unnamedSplit: SplitDropdownProps = {
  items,
  primaryAction: { label: "Send" },
}

export const invalidSplitAction: SplitDropdownProps = {
  ...split,
  // @ts-expect-error Primary actions use native click handlers, not menu selection events.
  primaryAction: { label: "Send", onClick: (event: Event) => void event },
}
