import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getShowcaseFamily, showcaseFamilies } from "@/lib/showcase-registry"
import { showcaseComponents } from "@/lib/showcase-components"
type Props = { params: Promise<{ family: string; variant: string }> }
function resolve(familyId: string, variantId: string) {
  const family = getShowcaseFamily(familyId)
  const variant = family?.variants.find((item) => item.id === variantId)
  if (!family || !variant || !Object.hasOwn(showcaseComponents, familyId))
    notFound()
  return {
    family,
    variant,
    Showcase: showcaseComponents[familyId as keyof typeof showcaseComponents],
  }
}
export function generateStaticParams() {
  return showcaseFamilies.flatMap((family) =>
    family.variants.map((variant) => ({
      family: family.id,
      variant: variant.id,
    }))
  )
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { family: familyId, variant: variantId } = await params
  const { family, variant } = resolve(familyId, variantId)
  return {
    title: `${family.label} · ${variant.label}`,
    description: variant.description,
  }
}
export default async function Page({ params }: Props) {
  const { family, variant } = await params
  const { Showcase } = resolve(family, variant)
  return <Showcase variantId={variant} />
}
