"use client"
import Link from "next/link"
import {
  ExamplePageShell,
  type ShowcaseItem,
} from "@/components/example-page-shell"
import {
  getShowcaseFamily,
  familyHref,
  variantHref,
} from "@/lib/showcase-registry"

export function ShowcaseFamilyPage({
  familyId,
  variantId,
  items,
}: {
  readonly familyId: string
  readonly variantId?: string
  readonly items: readonly ShowcaseItem[]
}) {
  const family = getShowcaseFamily(familyId)
  if (!family) return null
  const variant = family.variants.find((item) => item.id === variantId)
  const visibleItems = variant
    ? items.filter((item) => item.id && variant.exampleIds.includes(item.id))
    : items
  return (
    <ExamplePageShell
      familyId={familyId}
      title={variant ? `${family.label} · ${variant.label}` : family.label}
      description={variant?.description ?? family.description}
      items={visibleItems}
      introduction={
        variant ? (
          <Link
            href={familyHref(familyId)}
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            All {family.label} designs
          </Link>
        ) : (
          <nav
            aria-label={`${family.label} variants`}
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
          >
            {family.variants.map((item) => (
              <Link
                key={item.id}
                href={variantHref(familyId, item.id)}
                className="rounded-lg border p-4 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <div className="text-sm font-medium">{item.label}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <span className="mt-3 block text-xs text-muted-foreground">
                  {item.exampleIds.length}{" "}
                  {item.exampleIds.length === 1 ? "design" : "designs"}
                </span>
              </Link>
            ))}
          </nav>
        )
      }
    />
  )
}
