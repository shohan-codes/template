import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/shadcn-ui"
import { showcaseFamilies, familyHref } from "@/lib/showcase-registry"
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pattern Showcase</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a family, then explore each variant and its designs.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {showcaseFamilies.map((family) => (
          <Card key={family.id}>
            <CardHeader>
              <CardTitle className="text-base">{family.label}</CardTitle>
              <CardDescription>{family.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground">
                {family.variants.length}{" "}
                {family.variants.length === 1 ? "variant" : "variants"}
              </p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full justify-between"
              >
                <Link href={familyHref(family.id)}>
                  Explore designs
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
