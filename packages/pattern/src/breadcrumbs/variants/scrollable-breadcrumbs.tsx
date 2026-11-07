"use client"

import type { ComponentProps } from "react"
import { BreadcrumbList } from "@workspace/shadcn-ui/components/breadcrumb"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import {
  BreadcrumbsCore,
  type BreadcrumbsProps,
  type BreadcrumbsSlots,
} from "../core"
import { defaultBreadcrumbsSlots } from "./default-breadcrumbs"

function List({ className, ...props }: ComponentProps<typeof BreadcrumbList>) {
  return (
    <BreadcrumbList
      className={cn(
        "max-w-full flex-nowrap overflow-x-auto p-1 pb-2 [&>li]:shrink-0 [&>li]:whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}
export const scrollableBreadcrumbsSlots: BreadcrumbsSlots = {
  ...defaultBreadcrumbsSlots,
  List,
}
/** Keeps deep trails on one row; focused destinations scroll into view. */
export function ScrollableBreadcrumbs({
  defaultSlots = scrollableBreadcrumbsSlots,
  ...props
}: BreadcrumbsProps) {
  return <BreadcrumbsCore defaultSlots={defaultSlots} {...props} />
}
