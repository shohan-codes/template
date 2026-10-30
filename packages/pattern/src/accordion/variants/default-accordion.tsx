import {
  Accordion as Root,
  AccordionItem as Item,
  AccordionTrigger as Trigger,
  AccordionContent as Content,
} from "@workspace/shadcn-ui"

import { createAccordion } from "../core"
import React from "react"

export const defaultAccordionPrimitives = {
  Root,
  Item,
  Trigger,
  Content,
} as const


const AccordionBase = createAccordion(defaultAccordionPrimitives)

export const Accordion = React.memo(AccordionBase)

Accordion.displayName = "Accordion"

