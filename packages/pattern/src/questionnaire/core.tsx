"use client"

import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

/* ========================================================================== *\
 * Grid Column Mapping (Static Tailwind classes for bundler safelist)
 * ========================================================================== */

const columnClasses: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
}

function resolveColumnClass(columns?: QuestionnaireColumns): string | undefined {
  if (!columns) return undefined
  if (typeof columns === "number") {
    return columnClasses[columns]
  }

  const classes: string[] = []
  if (columns.default) {
    if (columns.default === 1) classes.push("grid-cols-1")
    else if (columns.default === 2) classes.push("grid-cols-2")
    else if (columns.default === 3) classes.push("grid-cols-3")
    else if (columns.default === 4) classes.push("grid-cols-4")
  }
  if (columns.sm) {
    if (columns.sm === 1) classes.push("sm:grid-cols-1")
    else if (columns.sm === 2) classes.push("sm:grid-cols-2")
    else if (columns.sm === 3) classes.push("sm:grid-cols-3")
    else if (columns.sm === 4) classes.push("sm:grid-cols-4")
  }
  if (columns.md) {
    if (columns.md === 1) classes.push("md:grid-cols-1")
    else if (columns.md === 2) classes.push("md:grid-cols-2")
    else if (columns.md === 3) classes.push("md:grid-cols-3")
    else if (columns.md === 4) classes.push("md:grid-cols-4")
  }
  if (columns.lg) {
    if (columns.lg === 1) classes.push("lg:grid-cols-1")
    else if (columns.lg === 2) classes.push("lg:grid-cols-2")
    else if (columns.lg === 3) classes.push("lg:grid-cols-3")
    else if (columns.lg === 4) classes.push("lg:grid-cols-4")
  }

  return classes.length > 0 ? classes.join(" ") : undefined
}

/* ========================================================================== *\
 * Questionnaire Factory
 * ========================================================================== */

/**
 * Creates a data-driven Questionnaire component configured with the provided primitives.
 */
export function createQuestionnaire<
  const TPrimitives extends QuestionnairePrimitives,
>(
  defaultPrimitives: TPrimitives,
  slots?: {
    Root?: TPrimitives["Root"]
    Progress?: TPrimitives["Progress"]
    Item?: TPrimitives["Item"]
    Title?: TPrimitives["Title"]
    Description?: TPrimitives["Description"]
    Choices?: TPrimitives["Choices"]
    Choice?: TPrimitives["Choice"]
    Input?: TPrimitives["Input"]
    Error?: TPrimitives["Error"]
    Actions?: TPrimitives["Actions"]
    Previous?: TPrimitives["Previous"]
    Skip?: TPrimitives["Skip"]
    Next?: TPrimitives["Next"]
    Submit?: TPrimitives["Submit"]
  }
) {
  const Root = slots?.Root ?? defaultPrimitives.Root
  const Progress = slots?.Progress ?? defaultPrimitives.Progress
  const Item = slots?.Item ?? defaultPrimitives.Item
  const Title = slots?.Title ?? defaultPrimitives.Title
  const Description = slots?.Description ?? defaultPrimitives.Description
  const Choices = slots?.Choices ?? defaultPrimitives.Choices
  const Choice = slots?.Choice ?? defaultPrimitives.Choice
  const Input = slots?.Input ?? defaultPrimitives.Input
  const Error = slots?.Error ?? defaultPrimitives.Error
  const Actions = slots?.Actions ?? defaultPrimitives.Actions
  const Previous = slots?.Previous ?? defaultPrimitives.Previous
  const Skip = slots?.Skip ?? defaultPrimitives.Skip
  const Next = slots?.Next ?? defaultPrimitives.Next
  const Submit = slots?.Submit ?? defaultPrimitives.Submit

  function Questionnaire(
    props: QuestionnaireProps<
      TPrimitives["Root"],
      TPrimitives["Progress"],
      TPrimitives["Item"],
      TPrimitives["Title"],
      TPrimitives["Description"],
      TPrimitives["Choices"],
      TPrimitives["Choice"],
      TPrimitives["Input"],
      TPrimitives["Error"],
      TPrimitives["Actions"],
      TPrimitives["Previous"],
      TPrimitives["Skip"],
      TPrimitives["Next"],
      TPrimitives["Submit"]
    >
  ) {
    const {
      questions,
      progress,
      actions,
      $progress,
      $item,
      $title,
      $description,
      $choices,
      $choice,
      $input,
      $error,
      $actions,
      $previous,
      $skip,
      $next,
      $submit,
      ...rootProps
    } = props

    if (questions.length === 0) return null

    // Automatically derive the item definitions for Root state tracking
    const itemDefinitions = questions.map((q) => ({
      name: q.name,
      required: q.required,
      disabled: q.disabled,
      choices: q.choices?.map((c) => ({
        value: c.value,
        disabled: c.disabled,
      })),
    }))

    return (
      <Root items={itemDefinitions} {...rootProps}>
        {progress !== false && <Progress {...$progress} />}

        {questions.map((q) => (
          <Item
            key={q.name}
            name={q.name}
            required={q.required}
            disabled={q.disabled}
            multiple={q.multiple}
            invalid={q.invalid}
            {...$item}
          >
            {q.title && (
              <Title {...$title}>
                {q.title}
              </Title>
            )}

            {q.description && (
              <Description {...$description}>
                {q.description}
              </Description>
            )}

            {((q.choices && q.choices.length > 0) || q.input) && (
              <Choices
                {...$choices}
                className={cn(resolveColumnClass(q.columns), $choices?.className)}
              >
                {q.choices?.map((choice) => (
                  <Choice
                    key={choice.value}
                    value={choice.value}
                    disabled={choice.disabled}
                    {...$choice}
                  >
                    {choice.description ? (
                      <>
                        <span>{choice.label ?? choice.value}</span>
                        <span
                          data-slot="questionnaire-choice-description"
                          className="text-muted-foreground text-xs"
                        >
                          {choice.description}
                        </span>
                      </>
                    ) : (
                      choice.label ?? choice.value
                    )}
                  </Choice>
                ))}

                {q.input && (
                  <div className={cn(q.columns ? "col-span-full" : undefined)}>
                    <Input
                      {...(typeof q.input === "object" ? q.input : {})}
                      {...$input}
                    />
                  </div>
                )}
              </Choices>
            )}

            {q.error && (
              <Error {...$error}>
                {q.error}
              </Error>
            )}
          </Item>
        ))}

        {actions !== false && (
          <Actions {...$actions}>
            <Previous {...$previous} />
            <Skip {...$skip} />
            <Next {...$next} />
            <Submit {...$submit} />
          </Actions>
        )}
      </Root>
    )
  }

  return Questionnaire
}

/* ========================================================================== *\
 * Questionnaire Types
 * ========================================================================== */

export type QuestionnaireProps<
  TRoot extends React.ElementType = React.ElementType,
  TProgress extends React.ElementType = React.ElementType,
  TItem extends React.ElementType = React.ElementType,
  TTitle extends React.ElementType = React.ElementType,
  TDescription extends React.ElementType = React.ElementType,
  TChoices extends React.ElementType = React.ElementType,
  TChoice extends React.ElementType = React.ElementType,
  TInput extends React.ElementType = React.ElementType,
  TError extends React.ElementType = React.ElementType,
  TActions extends React.ElementType = React.ElementType,
  TPrevious extends React.ElementType = React.ElementType,
  TSkip extends React.ElementType = React.ElementType,
  TNext extends React.ElementType = React.ElementType,
  TSubmit extends React.ElementType = React.ElementType,
> = Omit<React.ComponentPropsWithoutRef<TRoot>, "children"> & {
  questions: readonly QuestionnaireQuestionData[]
  progress?: boolean
  actions?: boolean
  $progress?: React.ComponentPropsWithoutRef<TProgress>
  $item?: Omit<React.ComponentPropsWithoutRef<TItem>, "children" | "name">
  $title?: React.ComponentPropsWithoutRef<TTitle>
  $description?: React.ComponentPropsWithoutRef<TDescription>
  $choices?: React.ComponentPropsWithoutRef<TChoices>
  $choice?: Omit<React.ComponentPropsWithoutRef<TChoice>, "children" | "value">
  $input?: React.ComponentPropsWithoutRef<TInput>
  $error?: React.ComponentPropsWithoutRef<TError>
  $actions?: React.ComponentPropsWithoutRef<TActions>
  $previous?: React.ComponentPropsWithoutRef<TPrevious>
  $skip?: React.ComponentPropsWithoutRef<TSkip>
  $next?: React.ComponentPropsWithoutRef<TNext>
  $submit?: React.ComponentPropsWithoutRef<TSubmit>
}

/** The main primitives used by the data-driven Questionnaire. */
export type QuestionnairePrimitives<
  TRoot extends React.ElementType = React.ElementType,
  TProgress extends React.ElementType = React.ElementType,
  TItem extends React.ElementType = React.ElementType,
  TTitle extends React.ElementType = React.ElementType,
  TDescription extends React.ElementType = React.ElementType,
  TChoices extends React.ElementType = React.ElementType,
  TChoice extends React.ElementType = React.ElementType,
  TInput extends React.ElementType = React.ElementType,
  TError extends React.ElementType = React.ElementType,
  TActions extends React.ElementType = React.ElementType,
  TPrevious extends React.ElementType = React.ElementType,
  TSkip extends React.ElementType = React.ElementType,
  TNext extends React.ElementType = React.ElementType,
  TSubmit extends React.ElementType = React.ElementType,
> = Readonly<{
  Root: TRoot
  Progress: TProgress
  Item: TItem
  Title: TTitle
  Description: TDescription
  Choices: TChoices
  Choice: TChoice
  Input: TInput
  Error: TError
  Actions: TActions
  Previous: TPrevious
  Skip: TSkip
  Next: TNext
  Submit: TSubmit
}>

export type QuestionnaireChoiceData = Readonly<{
  value: string
  label?: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}>

export type QuestionnaireColumns =
  | 1
  | 2
  | 3
  | 4
  | Readonly<{
      default?: 1 | 2 | 3 | 4
      sm?: 1 | 2 | 3 | 4
      md?: 1 | 2 | 3 | 4
      lg?: 1 | 2 | 3 | 4
    }>

export type QuestionnaireQuestionData = Readonly<{
  name: string
  title?: React.ReactNode
  description?: React.ReactNode
  choices?: readonly QuestionnaireChoiceData[]
  columns?: QuestionnaireColumns
  input?: React.ComponentPropsWithoutRef<"input"> | boolean
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  invalid?: boolean
  error?: React.ReactNode
}>

