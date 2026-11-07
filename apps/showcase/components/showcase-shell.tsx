"use client"

import {
  RiArrowRightUpLine,
  RiDashboardLine,
  RiMoonLine,
  RiStackLine,
  RiSunLine,
  RiLayoutTopLine,
  RiCodeBoxLine,
  RiQuestionAnswerLine,
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import * as React from "react"

import { Button } from "@workspace/shadcn-ui"
import { Separator } from "@workspace/shadcn-ui"

export interface ShowcaseShellProps {
  readonly children: React.ReactNode
}

const navItems = [
  {
    title: "Overview",
    items: [
      {
        id: "nav-dashboard",
        href: "/",
        title: "Dashboard",
        icon: <RiDashboardLine className="size-4" />,
      },
    ],
  },
  {
    title: "Patterns",
    items: [
      {
        id: "nav-dropdown",
        href: "/components/dropdown",
        title: "Dropdown",
        icon: <RiStackLine className="size-4" />,
      },
      {
        id: "nav-collapsible",
        href: "/components/collapsible",
        title: "Collapsible",
        icon: <RiStackLine className="size-4" />,
      },
      {
        id: "nav-accordion",
        href: "/components/accordion",
        title: "Accordion",
        icon: <RiStackLine className="size-4" />,
      },
      {
        id: "nav-tabs",
        href: "/components/tabs",
        title: "Tabs",
        icon: <RiLayoutTopLine className="size-4" />,
      },
      {
        id: "nav-code-block",
        href: "/components/code-block",
        title: "Code Block",
        icon: <RiCodeBoxLine className="size-4" />,
      },
      {
        id: "nav-questionnaire",
        href: "/components/questionnaire",
        title: "Questionnaire",
        icon: <RiQuestionAnswerLine className="size-4" />,
      },
    ],
  },
]

export function ShowcaseShell({ children }: ShowcaseShellProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return (
    <div className="flex h-svh w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col border-r bg-card">
        <div className="flex h-14 items-center gap-2 border-b px-4 font-semibold text-sm">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            UI
          </div>
          <div>
            <div className="leading-tight">Pattern Showcase</div>
            <div className="text-[11px] font-normal text-muted-foreground">
              Starter Template
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto p-4">
          {navItems.map((section) => (
            <div key={section.title} className="space-y-1.5">
              <div className="px-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      }`}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t p-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>@workspace/pattern</span>
            <span>v0.0.1</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        ref={contentRef}
        className="flex min-w-0 flex-1 flex-col overflow-y-auto"
      >
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b bg-background/95 px-6 backdrop-blur-md">
          <div className="text-sm font-medium">
            {pathname === "/"
              ? "Dashboard"
              : `${navItems.flatMap((section) => section.items).find((item) => item.href === pathname)?.title ?? "Component"} Showcase`}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Toggle color theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? (
                <RiSunLine className="size-4" />
              ) : (
                <RiMoonLine className="size-4" />
              )}
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
            >
              <Link href="/components/accordion">
                Components
                <RiArrowRightUpLine className="size-3 text-muted-foreground" />
              </Link>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
