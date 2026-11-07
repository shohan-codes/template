"use client"
import { Sidebar } from "./default-sidebar"
import type { SidebarProps } from "../types"
/** Floating navigation surface; behavior and typed items match the plain variant. */
export function FloatingSidebar(props: SidebarProps) {
  return <Sidebar variant="floating" {...props} />
}
