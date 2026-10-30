import * as React from "react"
import {
  Accordion as AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@workspace/shadcn-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import { createAccordion } from "../core"

const Root = ({ className, ...props }: React.ComponentProps<typeof AccordionRoot>) => (
  <AccordionRoot {...props} className={cn("w-full space-y-2.5", className)} />
)

const Item = ({ className, ...props }: React.ComponentProps<typeof AccordionItem>) => (
  <AccordionItem
    {...props}
    className={cn(
      "rounded-lg border bg-card px-4 py-1 text-card-foreground shadow-2xs transition-colors",
      className
    )}
  />
)

const Trigger = ({ className, ...props }: React.ComponentProps<typeof AccordionTrigger>) => (
  <AccordionTrigger
    {...props}
    className={cn("py-3 text-start font-medium hover:no-underline", className)}
  />
)

const Content = ({ className, ...props }: React.ComponentProps<typeof AccordionContent>) => (
  <AccordionContent
    {...props}
    className={cn("pt-1 pb-3 text-sm text-muted-foreground leading-relaxed", className)}
  />
)

const CardAccordionBase = createAccordion({
  Root,
  Item,
  Trigger,
  Content,
})

export type CardAccordionProps = React.ComponentProps<typeof CardAccordionBase>

/**
 * Card-styled Accordion where each item is rendered as an independent rounded card.
 */
export const CardAccordion = React.memo(CardAccordionBase)


