import Link from "next/link"
import { Button } from "@workspace/shadcn-ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/shadcn-ui"
import { RiStackLine, RiArrowRightLine } from "@remixicon/react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pattern Showcase</h1>
        <p className="text-sm text-muted-foreground">
          Interactive development playground for custom data-driven patterns in @workspace/pattern.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <RiStackLine className="size-4" />
              </div>
              <CardTitle className="text-base">Accordion Pattern</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Data-driven Accordion built on top of Radix primitives and shadcn-ui.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="sm" variant="outline" className="w-full gap-2">
              <Link href="/components/accordion">
                View Showcase
                <RiArrowRightLine className="size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
