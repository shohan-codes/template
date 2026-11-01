"use client"

import * as React from "react"
import {
  Tabs as Root,
  TabsList as List,
  TabsTrigger as Trigger,
  TabsContent as Content,
} from "@workspace/shadcn-ui"

import { TabsCore, type TabsProps, type TabsSlots } from "../core"

export const defaultTabsSlots: TabsSlots = {
  Root,
  List,
  Trigger,
  Content,
  Link: "a",
}

export type DefaultTabsProps = TabsProps & {
  /** Visual variant of the tabs list. Defaults to "default". */
  variant?: "default" | "line"
}

/**
 * Standard data-driven Tabs component based on shadcn-ui and Radix primitives.
 */
export function Tabs({ variant, $list, ...props }: DefaultTabsProps) {
  return (
    <TabsCore
      defaultSlots={defaultTabsSlots}
      $list={{ variant, ...$list }}
      {...props}
    />
  )
}

