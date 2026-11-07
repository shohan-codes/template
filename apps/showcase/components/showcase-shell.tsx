"use client"

import { Home, Layers, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import * as React from "react"
import { Sidebar, type SidebarItemData } from "@workspace/pattern/sidebar"
import { Button } from "@workspace/shadcn-ui/components/button"
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@workspace/shadcn-ui/components/sidebar"
import {
  familyHref,
  variantHref,
  showcaseFamilies,
  getShowcaseRoute,
} from "@/lib/showcase-registry"

export interface ShowcaseShellProps {
  readonly children: React.ReactNode
}
const navigation: readonly SidebarItemData[] = [
  {
    type: "link",
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: <Home />,
  },
  {
    type: "group",
    id: "patterns",
    label: "Patterns",
    items: showcaseFamilies.map((family) => ({
      type: "disclosure",
      id: family.id,
      label: family.label,
      icon: <Layers />,
      items: [
        {
          type: "link",
          id: `${family.id}-all`,
          label: "All designs",
          href: familyHref(family.id),
        },
        ...family.variants.map((variant) => ({
          type: "link" as const,
          id: `${family.id}-${variant.id}`,
          label: variant.label,
          href: variantHref(family.id, variant.id),
        })),
      ],
    })),
  },
]
function CloseNavigationOnRouteChange() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  React.useEffect(() => {
    setOpenMobile(false)
  }, [pathname, setOpenMobile])
  return null
}
export function ShowcaseShell({ children }: ShowcaseShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const contentRef = React.useRef<HTMLDivElement>(null)
  const route = getShowcaseRoute(pathname)
  const title =
    pathname === "/"
      ? "Dashboard"
      : route
        ? `${route.family.label}${route.variant ? ` / ${route.variant.label}` : ""}`
        : "Pattern Showcase"
  React.useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return (
    <SidebarProvider className="h-svh min-h-0 overflow-hidden bg-background text-foreground">
      <CloseNavigationOnRouteChange />
      <a
        href="#main-content"
        className="sr-only fixed top-2 left-2 z-50 rounded bg-background p-3 text-sm focus:not-sr-only"
      >
        Skip to content
      </a>
      <Sidebar
        items={navigation}
        activeHref={pathname}
        navigationLabel="Showcase navigation"
        header={
          <Link
            href="/"
            className="flex h-10 items-center gap-2 px-2 text-sm font-semibold"
          >
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs text-primary-foreground">
              UI
            </span>
            Pattern Showcase
          </Link>
        }
        footer={
          <span className="px-2 py-1 text-xs text-muted-foreground">
            @workspace/pattern
          </span>
        }
        onNavigate={(item, event) => {
          event.preventDefault()
          router.push(item.href)
        }}
      />
      <div
        ref={contentRef}
        className="flex min-w-0 flex-1 flex-col overflow-y-auto"
      >
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background/95 px-4 backdrop-blur-md sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger />
            <span className="truncate text-sm font-medium">{title}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle color theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun aria-hidden="true" />
            ) : (
              <Moon aria-hidden="true" />
            )}
          </Button>
        </header>
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 p-4 sm:p-6 lg:p-8"
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
