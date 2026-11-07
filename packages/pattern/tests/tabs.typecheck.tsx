import { createElement } from "react"
import {
  Tabs,
  SegmentedTabs,
  FolderTabs,
  TabsCore,
  defaultTabsSlots,
  getTabId,
  type TabItemData,
  type TypedTabItemData,
  type TypedTabsProps,
} from "@workspace/pattern/tabs"

import { Tabs as DirectTabs } from "@workspace/pattern/tabs/variants/default-tabs"
import { SegmentedTabs as DirectSegmentedTabs } from "@workspace/pattern/tabs/variants/segmented-tabs"
import { FolderTabs as DirectFolderTabs } from "@workspace/pattern/tabs/variants/folder-tabs"

const items = [
  { id: "overview", type: "tab", label: "Overview", content: "Overview panel" },
  {
    id: "details",
    type: "tab",
    label: "Details",
    content: null,
    disabled: true,
  },
] satisfies readonly TypedTabItemData[]
const typedProps: TypedTabsProps = {
  mode: "typed",
  items,
  value: "overview",
  onValueChange: (id) => id.toUpperCase(),
  $list: { "aria-label": "Project", loop: false },
  $trigger: { className: "text-sm", title: "Select panel" },
  $content: { forceMount: true },
}
const typedExamples = [
  <DirectTabs {...typedProps} />,
  <DirectSegmentedTabs {...typedProps} />,
  <DirectFolderTabs {...typedProps} />,
  <Tabs {...typedProps} variant="line" />,
  <SegmentedTabs {...typedProps} pill={false} fullWidth />,
  <FolderTabs {...typedProps} variant="floating" />,
  <TabsCore {...typedProps} defaultSlots={defaultTabsSlots} />,
  createElement(Tabs, typedProps),
]
const legacy: readonly TabItemData[] = [
  { label: "Automatically identified", content: "Panel" },
  {
    value: "query",
    label: "Query",
    href: "?tab=query",
    content: "Query panel",
  },
  { id: "hash", label: "Hash", href: "#hash" },
]
const legacyExamples = [
  <Tabs
    items={legacy}
    value={null}
    $link={{ scroll: false, prefetch: false }}
  />,
  <SegmentedTabs
    mode="legacy"
    items={legacy}
    $trigger={{ customProp: true }}
  />,
  <FolderTabs items={legacy} $content={{ customProp: true }} />,
  getTabId(legacy[0]!),
]

// @ts-expect-error Strict items require stable identity.
const missingId: TypedTabItemData = {
  type: "tab",
  label: "Bad",
  content: "Bad",
}
// @ts-expect-error Strict items require a discriminator.
const missingType: TypedTabItemData = {
  id: "bad",
  label: "Bad",
  content: "Bad",
}
// @ts-expect-error A selection tab must supply its panel, even when explicitly null.
const missingContent: TypedTabItemData = {
  id: "bad",
  type: "tab",
  label: "Bad",
}
const link: TypedTabItemData = {
  id: "bad",
  type: "tab",
  label: "Bad",
  content: "Bad",
  // @ts-expect-error Route links cannot masquerade as panel-selecting tabs.
  href: "/bad",
}
const alias: TypedTabItemData = {
  id: "bad",
  type: "tab",
  label: "Bad",
  content: "Bad",
  // @ts-expect-error IDs are the only selection values in strict mode.
  value: "different",
}
// @ts-expect-error Legacy items cannot carry the strict discriminator.
const disguisedLegacy: TabItemData = { id: "bad", type: "tab", label: "Bad" }
// @ts-expect-error Explicit opt-in keeps legacy slot props out of the typed path.
const missingMode = <Tabs items={items} />
// @ts-expect-error Legacy and strict entries cannot be mixed.
const mixed = <Tabs mode="typed" items={[items[0]!, legacy[0]!]} />
// @ts-expect-error Typed mode cannot accept legacy item arrays.
const legacyInTyped = <FolderTabs mode="typed" items={legacy} />
const badValue = (
  // @ts-expect-error Slot props cannot change which item the trigger selects.
  <Tabs
    mode="typed"
    items={items}
    $trigger={{ className: "x", value: "bad" }}
  />
)
const badDisabled = (
  // @ts-expect-error Slot props cannot enable disabled items.
  <SegmentedTabs mode="typed" items={items} $trigger={{ disabled: false }} />
)
const badAsChild = (
  // @ts-expect-error Slot props cannot replace the button with another element.
  <FolderTabs mode="typed" items={items} $trigger={{ asChild: true }} />
)
const badChildren = (
  // @ts-expect-error Slot props cannot replace owned content.
  <Tabs mode="typed" items={items} $content={{ children: "Wrong panel" }} />
)
// @ts-expect-error Slot props cannot detach the panel from its trigger.
const badPanel = <Tabs mode="typed" items={items} $content={{ value: "bad" }} />
// @ts-expect-error Slot props cannot replace the tablist semantics.
const badList = <Tabs mode="typed" items={items} $list={{ role: "menu" }} />
const badAria = (
  // @ts-expect-error Slot props cannot replace generated accessibility relationships.
  <Tabs mode="typed" items={items} $trigger={{ "aria-controls": "wrong" }} />
)
const broadSlot = (
  // @ts-expect-error Arbitrary legacy-only props are rejected even with valid styling.
  <Tabs
    mode="typed"
    items={items}
    $trigger={{ className: "x", madeUp: true }}
  />
)
const badLinkProps = (
  // @ts-expect-error Strict selection tabs do not have a route/link slot-prop path.
  <Tabs mode="typed" items={items} $link={{ href: "/bad" }} />
)
const badRoot = (
  // @ts-expect-error Root children are owned by the item renderer.
  <Tabs mode="typed" items={items}>
    Unexpected children
  </Tabs>
)
const badCore = (
  // @ts-expect-error The core obeys the same strict slot contract as every variant.
  <TabsCore
    mode="typed"
    items={items}
    defaultSlots={defaultTabsSlots}
    $trigger={{ value: "bad" }}
  />
)
const badTriggerName = (
  // @ts-expect-error Accessible trigger names belong to each item.
  <Tabs mode="typed" items={items} $trigger={{ "aria-label": "Same name" }} />
)
void [
  badTriggerName,
  typedExamples,
  legacyExamples,
  missingId,
  missingType,
  missingContent,
  link,
  alias,
  disguisedLegacy,
  missingMode,
  mixed,
  legacyInTyped,
  badValue,
  badDisabled,
  badAsChild,
  badChildren,
  badPanel,
  badList,
  badAria,
  broadSlot,
  badLinkProps,
  badRoot,
  badCore,
]
