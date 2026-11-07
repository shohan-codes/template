import Link from "next/link"
import { Button } from "@workspace/shadcn-ui"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/shadcn-ui"
import {
  RiStackLine,
  RiLayoutTopLine,
  RiCodeBoxLine,
  RiQuestionAnswerLine,
  RiArrowRightLine,
} from "@remixicon/react"

const patterns = [
  { title: "Dropdown Pattern", description: "Typed menus with nested actions, checkboxes, radio groups and custom slots.", href: "/components/dropdown", icon: RiStackLine },
  {
    title: "Collapsible Pattern",
    description:
      "Accessible disclosure with controlled state and customizable slots.",
    href: "/components/collapsible",
    icon: RiStackLine,
  },
  {
    title: "Accordion Pattern",
    description:
      "Data-driven Accordion built on top of Radix primitives and shadcn-ui.",
    href: "/components/accordion",
    icon: RiStackLine,
  },
  {
    title: "Tabs Pattern",
    description:
      "Accessible, data-driven tabbed navigation with pill, line, and card variants.",
    href: "/components/tabs",
    icon: RiLayoutTopLine,
  },
  {
    title: "Code Block Pattern",
    description:
      "Headless syntax-highlighted code blocks with notations, diffs, and terminal tabs.",
    href: "/components/code-block",
    icon: RiCodeBoxLine,
  },
  {
    title: "Questionnaire Pattern",
    description:
      "Multi-step sequential question forms with progress tracking and form submission.",
    href: "/components/questionnaire",
    icon: RiQuestionAnswerLine,
  },
] as const

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pattern Showcase</h1>
        <p className="text-sm text-muted-foreground">
          Interactive development playground for custom data-driven patterns in
          @workspace/pattern.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patterns.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.href}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Link href={item.href}>
                    View Showcase
                    <RiArrowRightLine className="size-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
