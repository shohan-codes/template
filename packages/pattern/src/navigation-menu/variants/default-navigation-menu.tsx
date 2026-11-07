"use client"

import type { ComponentProps } from "react"
import * as Primitive from "@workspace/shadcn-ui/components/navigation-menu"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  NavigationMenuCore,
  type NavigationMenuProps,
  type NavigationMenuSlots,
} from "../core"

function Root({
  className,
  ...props
}: ComponentProps<typeof Primitive.NavigationMenu>) {
  return (
    <Primitive.NavigationMenu
      className={cn(
        "@container/navigation block w-full max-w-none flex-none [&>div]:w-full",
        className
      )}
      {...props}
    />
  )
}
function List({
  className,
  ...props
}: ComponentProps<typeof Primitive.NavigationMenuList>) {
  return (
    <Primitive.NavigationMenuList
      className={cn("flex-wrap justify-start gap-1", className)}
      {...props}
    />
  )
}
function Item({
  className,
  ...props
}: ComponentProps<typeof Primitive.NavigationMenuItem>) {
  return (
    <Primitive.NavigationMenuItem
      className={cn("static", className)}
      {...props}
    />
  )
}
function Trigger({
  className,
  ...props
}: ComponentProps<typeof Primitive.NavigationMenuTrigger>) {
  return (
    <Primitive.NavigationMenuTrigger
      className={cn(
        "data-[state=open]:bg-muted/50 motion-reduce:[&>svg]:transition-none data-[state=open]:[&>svg:last-child]:rotate-180",
        className
      )}
      {...props}
    />
  )
}
function Content({
  className,
  ...props
}: ComponentProps<typeof Primitive.NavigationMenuContent>) {
  return (
    <Primitive.NavigationMenuContent
      className={cn(
        "absolute z-20 w-80 max-w-full p-2 group-data-[viewport=false]/navigation-menu:max-h-[min(70vh,28rem)] group-data-[viewport=false]/navigation-menu:overflow-y-auto data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none md:w-80",
        className
      )}
      {...props}
    />
  )
}
function ContentList({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul className={cn("grid min-w-0 list-none gap-1", className)} {...props} />
  )
}
function ContentItem({ className, ...props }: ComponentProps<"li">) {
  return <li className={cn("min-w-0", className)} {...props} />
}
function Link({
  className,
  ...props
}: ComponentProps<typeof Primitive.NavigationMenuLink>) {
  return (
    <Primitive.NavigationMenuLink
      className={cn(
        "h-full items-start [&_svg]:mt-0.5 [&_svg]:shrink-0 [&>span]:min-w-0",
        className
      )}
      {...props}
    />
  )
}
function Label({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("block text-sm font-medium wrap-anywhere", className)}
      {...props}
    />
  )
}
function Description({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "mt-1 block text-xs leading-relaxed wrap-anywhere text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
function GroupLabel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-2 py-2 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
export const defaultNavigationMenuSlots: NavigationMenuSlots = {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Link,
  Anchor: "a",
  ContentList,
  ContentItem,
  Group: "div",
  GroupLabel,
  Label,
  Description,
}
export function NavigationMenu(props: NavigationMenuProps) {
  return (
    <NavigationMenuCore defaultSlots={defaultNavigationMenuSlots} {...props} />
  )
}
