"use client"

import type { ComponentProps } from "react"
import { NavigationMenuContent } from "@workspace/shadcn-ui/components/navigation-menu"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  NavigationMenuCore,
  type NavigationMenuProps,
  type NavigationMenuSlots,
} from "../core"
import { defaultNavigationMenuSlots } from "./default-navigation-menu"

function Content({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuContent>) {
  const DefaultContent = defaultNavigationMenuSlots.Content
  return (
    <DefaultContent
      className={cn(
        "w-xl p-3 md:w-xl [&>ul]:@min-[30rem]/navigation:grid-cols-2",
        className
      )}
      {...props}
    />
  )
}
export const megaNavigationMenuSlots: NavigationMenuSlots = {
  ...defaultNavigationMenuSlots,
  Content,
}
/** A wider, grouped two-column panel that collapses inside narrow containers. */
export function MegaNavigationMenu({
  defaultSlots = megaNavigationMenuSlots,
  ...props
}: NavigationMenuProps) {
  return <NavigationMenuCore defaultSlots={defaultSlots} {...props} />
}
