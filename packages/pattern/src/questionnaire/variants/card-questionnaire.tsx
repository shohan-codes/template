import * as React from "react"
import {
  Questionnaire as RootPrimitive,
  QuestionnaireProgress as ProgressPrimitive,
  QuestionnaireItem as ItemPrimitive,
  QuestionnaireTitle as TitlePrimitive,
  QuestionnaireDescription as DescriptionPrimitive,
  QuestionnaireChoices as ChoicesPrimitive,
  QuestionnaireChoice as ChoicePrimitive,
  QuestionnaireInput as InputPrimitive,
  QuestionnaireError as ErrorPrimitive,
  QuestionnaireActions as ActionsPrimitive,
  QuestionnairePrevious as PreviousPrimitive,
  QuestionnaireSkip as SkipPrimitive,
  QuestionnaireNext as NextPrimitive,
  QuestionnaireSubmit as SubmitPrimitive,
  Card,
  CardFooter,
} from "@workspace/shadcn-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import { Questionnaire, type QuestionnaireProps } from "./default-questionnaire"
import type { QuestionnaireSlots } from "../core"

const Root = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RootPrimitive>) => (
  <Card className="w-full bg-card/20 overflow-hidden border shadow-sm">
    <RootPrimitive
      {...props}
      className={cn(
        "w-full p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6",
        className
      )}
    >
      {children}
    </RootPrimitive>
  </Card>
)

const Progress = ({
  className,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive>) => (
  <ProgressPrimitive
    {...props}
    className={cn(
      "text-xs font-semibold tracking-wider uppercase text-muted-foreground",
      className
    )}
  />
)

const Item = ({
  className,
  ...props
}: React.ComponentProps<typeof ItemPrimitive>) => (
  <ItemPrimitive
    {...props}
    className={cn("space-y-4 pt-2 first:pt-0", className)}
  />
)

const Title = ({
  className,
  ...props
}: React.ComponentProps<typeof TitlePrimitive>) => (
  <TitlePrimitive
    {...props}
    className={cn(
      "text-lg sm:text-xl font-semibold tracking-tight text-foreground",
      className
    )}
  />
)

const Description = ({
  className,
  ...props
}: React.ComponentProps<typeof DescriptionPrimitive>) => (
  <DescriptionPrimitive
    {...props}
    className={cn("text-sm text-muted-foreground", className)}
  />
)

const Choices = ({
  className,
  ...props
}: React.ComponentProps<typeof ChoicesPrimitive>) => (
  <ChoicesPrimitive {...props} className={cn("grid gap-3 pt-2", className)} />
)

const Choice = ({
  className,
  ...props
}: React.ComponentProps<typeof ChoicePrimitive>) => (
  <ChoicePrimitive
    {...props}
    className={cn(
      "relative flex cursor-pointer items-start gap-3 rounded-lg border bg-card/50 p-3.5 sm:p-4 shadow-2xs transition-all hover:bg-accent/40",
      "data-checked:border-primary data-checked:bg-primary/5 dark:data-checked:bg-primary/10",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary/5",
      className
    )}
  />
)

const Actions = ({
  className,
  ...props
}: React.ComponentProps<typeof ActionsPrimitive>) => (
  <CardFooter
    className={cn(
      "-mx-4 -mb-4 mt-2 flex items-center border-t bg-muted/30 px-4 py-3 sm:-mx-6 sm:-mb-6 sm:px-6 sm:py-4 md:-mx-8 md:-mb-8 md:px-8",
      className
    )}
  >
    <ActionsPrimitive
      {...props}
      className="w-full gap-2 sm:gap-2.5"
    />
  </CardFooter>
)

export const cardQuestionnaireSlots: QuestionnaireSlots = {
  Root,
  Progress,
  Item,
  Title,
  Description,
  Choices,
  Choice,
  Input: InputPrimitive,
  Error: ErrorPrimitive,
  Actions,
  Previous: PreviousPrimitive,
  Skip: SkipPrimitive,
  Next: NextPrimitive,
  Submit: SubmitPrimitive,
}

export type CardQuestionnaireProps = QuestionnaireProps

/**
 * Card-styled Questionnaire featuring an enclosed container and custom choice cards.
 */
export function CardQuestionnaire(props: CardQuestionnaireProps) {
  return (
    <Questionnaire
      defaultSlots={cardQuestionnaireSlots}
      {...props}
    />
  )
}
