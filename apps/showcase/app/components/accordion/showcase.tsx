"use client"

import type { ShowcaseItem } from "@/components/example-page-shell"
import { ShowcaseFamilyPage } from "@/components/showcase-family-page"

import CardAccordionExample from "./card-accordion-example"
import CardAccordionExampleRaw from "./card-accordion-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import StepIconExample from "./step-icon-example"
import StepIconExampleRaw from "./step-icon-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const accordionShowcaseItems: readonly ShowcaseItem[] = [
  {
    id: "card-accordion",
    title: "Card Accordion Variant",
    description:
      "Segmented card variant where each item is rendered in a discrete container with rounded borders and subtle elevation.",
    code: CardAccordionExampleRaw,
    preview: <CardAccordionExample />,
  },
  {
    id: "step-icon-accordion",
    title: "Step Icon (Numbered Stepper)",
    description:
      "Minimal accordion utilizing the withStepIcon utility for auto-incrementing circular step indicators.",
    code: StepIconExampleRaw,
    preview: <StepIconExample />,
  },
]

export default function AccordionShowcase({
  variantId,
}: {
  readonly variantId?: string
}) {
  return (
    <ShowcaseFamilyPage
      familyId="accordion"
      variantId={variantId}
      items={accordionShowcaseItems}
    />
  )
}
