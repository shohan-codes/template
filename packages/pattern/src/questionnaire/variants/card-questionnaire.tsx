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

import { createQuestionnaire } from "../core"

const Root = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RootPrimitive>) => (
  <Card className="w-full">
    <RootPrimitive
      {...props}
      className={cn("w-full p-6 sm:p-8", className)}
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
    className={cn("mb-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground", className)}
  />
)

const Item = ({
  className,
  ...props
}: React.ComponentProps<typeof ItemPrimitive>) => (
  <ItemPrimitive {...props} className={cn("space-y-6", className)} />
)

const Title = ({
  className,
  ...props
}: React.ComponentProps<typeof TitlePrimitive>) => (
  <TitlePrimitive
    {...props}
    className={cn("text-xl font-semibold tracking-tight text-foreground", className)}
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
  <ChoicesPrimitive
    {...props}
    className={cn("grid gap-3 sm:grid-cols-1", className)}
  />
)

const Choice = ({
  className,
  ...props
}: React.ComponentProps<typeof ChoicePrimitive>) => (
  <ChoicePrimitive
    {...props}
    className={cn(
      "min-h-12 border-border/80 bg-background/50 hover:bg-accent/60 data-checked:border-primary data-checked:bg-primary/5 dark:bg-card/40 dark:data-checked:bg-primary/10",
      className
    )}
  />
)

const Actions = ({
  className,
  ...props
}: React.ComponentProps<typeof ActionsPrimitive>) => (
  <CardFooter className={cn("mt-6 p-0 border-t pt-4 bg-transparent", className)}>
    <ActionsPrimitive
      {...props}
      className="w-full justify-end gap-3"
    />
  </CardFooter>
)

export const cardQuestionnairePrimitives = {
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
} as const

export const CardQuestionnaire = createQuestionnaire(cardQuestionnairePrimitives)
