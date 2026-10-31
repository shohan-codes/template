import * as React from "react"
import {
  Accordion as Root,
  AccordionItem as Item,
  AccordionTrigger as Trigger,
  AccordionContent as Content,
} from "@workspace/shadcn-ui"

import {
  AccordionCore,
  type AccordionProps,
  type AccordionSlots,
} from "../core"

export const defaultAccordionSlots: AccordionSlots = {
  Root,
  Item,
  Trigger,
  Content,
}

export type { AccordionProps }

export function Accordion(props: AccordionProps) {
  return (
    <AccordionCore
      defaultSlots={defaultAccordionSlots}
      {...props}
    />
  )
}
