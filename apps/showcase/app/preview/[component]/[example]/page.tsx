import { notFound } from "next/navigation"
import { PreviewExample } from "@/components/preview-example"
import { getShowcaseFamily } from "@/lib/showcase-registry"
import { showcaseComponents } from "@/lib/showcase-components"
export default async function PreviewPage({
  params,
}: {
  params: Promise<{ component: string; example: string }>
}) {
  const { component, example } = await params
  const family = getShowcaseFamily(component)
  if (
    !family?.variants.some((variant) => variant.exampleIds.includes(example)) ||
    !Object.hasOwn(showcaseComponents, component)
  )
    notFound()
  const Showcase =
    showcaseComponents[component as keyof typeof showcaseComponents]
  return (
    <PreviewExample example={example}>
      <Showcase />
    </PreviewExample>
  )
}
