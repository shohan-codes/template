"use client"

import type { ComponentProps } from "react"
import * as Primitive from "@workspace/shadcn-ui/components/breadcrumb"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  BreadcrumbsCore,
  type BreadcrumbsProps,
  type BreadcrumbsSlots,
} from "../core"

function Root(props: ComponentProps<typeof Primitive.Breadcrumb>) {
  return <Primitive.Breadcrumb aria-label="Breadcrumb" {...props} />
}
function List({
  className,
  ...props
}: ComponentProps<typeof Primitive.BreadcrumbList>) {
  return (
    <Primitive.BreadcrumbList
      className={cn("gap-x-2 gap-y-2", className)}
      {...props}
    />
  )
}
function Item({
  className,
  ...props
}: ComponentProps<typeof Primitive.BreadcrumbItem>) {
  return (
    <Primitive.BreadcrumbItem
      className={cn("max-w-full min-w-0", className)}
      {...props}
    />
  )
}
function Link({
  className,
  ...props
}: ComponentProps<typeof Primitive.BreadcrumbLink>) {
  return (
    <Primitive.BreadcrumbLink
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5 rounded-sm wrap-anywhere outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}
function Page({
  className,
  ...props
}: ComponentProps<typeof Primitive.BreadcrumbPage>) {
  return (
    <Primitive.BreadcrumbPage
      role={undefined}
      aria-disabled={undefined}
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5 font-medium wrap-anywhere [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}
export const defaultBreadcrumbsSlots: BreadcrumbsSlots = {
  Root,
  List,
  Item,
  Link,
  Page,
  Separator: Primitive.BreadcrumbSeparator,
}
export function Breadcrumbs({
  defaultSlots = defaultBreadcrumbsSlots,
  ...props
}: BreadcrumbsProps) {
  return <BreadcrumbsCore defaultSlots={defaultSlots} {...props} />
}
