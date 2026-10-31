"use client"

import * as React from "react"

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

        {questions.map((question) => (
          <Item
            key={question.name}
            name={question.name}
            required={question.required}
            disabled={question.disabled}
            multiple={question.multiple}
            invalid={question.invalid}
            {...$item}
          >
            {question.title && (
              <Title {...$title}>
                {question.title}
              </Title>
            )}

            {question.description && (
              <Description {...$description}>
                {question.description}
              </Description>
            )}

            {((question.choices && question.choices.length > 0) || question.input) && (
              <Choices {...$choices}>
                {question.choices?.map((choice) => (
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

                {question.input && (
                  <Input
                    {...(typeof question.input === "object" ? question.input : {})}
                    {...$input}
                  />
                )}
              </Choices>
            )}

            {question.error && (
              <Error {...$error}>
                {question.error}
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

export type QuestionnaireQuestionData = Readonly<{
  name: string
  title?: React.ReactNode
  description?: React.ReactNode
  choices?: readonly QuestionnaireChoiceData[]
  input?: React.ComponentPropsWithoutRef<"input"> | boolean
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  invalid?: boolean
  error?: React.ReactNode
}>

