import CollapsibleShowcase from "@/app/components/collapsible/page"
import DropdownShowcase from "@/app/components/dropdown/page"
import { notFound } from "next/navigation"

import AccordionShowcase from "@/app/components/accordion/page"
import CodeBlockShowcase from "@/app/components/code-block/page"
import QuestionnaireShowcase from "@/app/components/questionnaire/page"
import TabsShowcase from "@/app/components/tabs/page"
import { PreviewExample } from "@/components/preview-example"

const showcases = {
  dropdown: DropdownShowcase,
  collapsible: CollapsibleShowcase,
  accordion: AccordionShowcase,
  "code-block": CodeBlockShowcase,
  questionnaire: QuestionnaireShowcase,
  tabs: TabsShowcase,
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ component: string; example: string }>
}) {
  const { component, example } = await params
  if (!Object.hasOwn(showcases, component)) notFound()
  const Showcase = showcases[component as keyof typeof showcases]

  return (
    <PreviewExample example={example}>
      <Showcase />
    </PreviewExample>
  )
}
