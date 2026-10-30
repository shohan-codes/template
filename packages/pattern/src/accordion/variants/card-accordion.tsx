import * as React from "react"

import { Accordion } from "./default-accordion"

export type CardAccordionProps = React.ComponentProps<typeof Accordion>

const defaultSlotProps = {
  className: "w-full space-y-2.5",
  $item: {
    className:
      "rounded-lg border bg-card px-4 py-1 text-card-foreground shadow-2xs transition-colors",
  },
  $trigger: {
    className: "py-3 text-start font-medium hover:no-underline",
  },
  $content: {
    className: "pt-1 pb-3 text-sm text-muted-foreground leading-relaxed",
  },
} as const

/**
 * Card-styled Accordion where each item is rendered as an independent rounded card.
 */
const CardAccordionBase = (props: CardAccordionProps) => (
  <Accordion
    {...defaultSlotProps}
    {...props}
  />
)



export const CardAccordion = React.memo(CardAccordionBase)
