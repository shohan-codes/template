"use client"

import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import { resolveColumnClass, type QuestionnaireColumns } from "./utilities/columns"

/* ========================================================================== *\
 * Questionnaire Factory
 * ========================================================================== */

/**
 * Creates a data-driven Questionnaire component configured with the provided primitives.
 */
export function createQuestionnaire<const TPrimitives extends QuestionnairePrimitives>(
  defaultPrimitives: TPrimitives,
  slots?: Partial<TPrimitives>
) {
  const P = { ...defaultPrimitives, ...slots }

  function Questionnaire(props: QuestionnaireProps<TPrimitives>) {
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
      <P.Root items={itemDefinitions} {...rootProps}>
        {progress !== false && <P.Progress {...$progress} />}

        {questions.map((q) => (
          <P.Item
            key={q.name}
            name={q.name}
            required={q.required}
            disabled={q.disabled}
            multiple={q.multiple}
            invalid={q.invalid}
            {...$item}
          >
            {q.title && <P.Title {...$title}>{q.title}</P.Title>}

            {q.description && (
              <P.Description {...$description}>
                {q.description}
              </P.Description>
            )}

            {((q.choices && q.choices.length > 0) || q.input) && (
              <P.Choices
                {...$choices}
                className={cn(resolveColumnClass(q.columns), $choices?.className)}
              >
                {q.choices?.map((choice) => (
                  <P.Choice
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
                  </P.Choice>
                ))}

                {q.input && (
                  <div className={cn(q.columns ? "col-span-full" : undefined)}>
                    <P.Input
                      {...(typeof q.input === "object" ? q.input : {})}
                      {...$input}
                    />
                  </div>
                )}
              </P.Choices>
            )}

            {q.error && <P.Error {...$error}>{q.error}</P.Error>}
          </P.Item>
        ))}

        {actions !== false && (
          <P.Actions {...$actions}>
            <P.Previous {...$previous} />
            <P.Skip {...$skip} />
            <P.Next {...$next} />
            <P.Submit {...$submit} />
          </P.Actions>
        )}
      </P.Root>
    )
  }

  return Questionnaire
}

/* ========================================================================== *\
 * Questionnaire Types
 * ========================================================================== */

/** The primitives record used by the data-driven Questionnaire. */
export type QuestionnairePrimitives = Readonly<{
  Root: React.ElementType
  Progress: React.ElementType
  Item: React.ElementType
  Title: React.ElementType
  Description: React.ElementType
  Choices: React.ElementType
  Choice: React.ElementType
  Input: React.ElementType
  Error: React.ElementType
  Actions: React.ElementType
  Previous: React.ElementType
  Skip: React.ElementType
  Next: React.ElementType
  Submit: React.ElementType
}>

export type QuestionnaireProps<TPrimitives extends QuestionnairePrimitives> =
  Omit<React.ComponentPropsWithoutRef<TPrimitives["Root"]>, "children"> & {
    questions: readonly QuestionnaireQuestionData[]
    progress?: boolean
    actions?: boolean
    $progress?: React.ComponentPropsWithoutRef<TPrimitives["Progress"]>
    $item?: Omit<React.ComponentPropsWithoutRef<TPrimitives["Item"]>, "children" | "name">
    $title?: React.ComponentPropsWithoutRef<TPrimitives["Title"]>
    $description?: React.ComponentPropsWithoutRef<TPrimitives["Description"]>
    $choices?: React.ComponentPropsWithoutRef<TPrimitives["Choices"]>
    $choice?: Omit<React.ComponentPropsWithoutRef<TPrimitives["Choice"]>, "children" | "value">
    $input?: React.ComponentPropsWithoutRef<TPrimitives["Input"]>
    $error?: React.ComponentPropsWithoutRef<TPrimitives["Error"]>
    $actions?: React.ComponentPropsWithoutRef<TPrimitives["Actions"]>
    $previous?: React.ComponentPropsWithoutRef<TPrimitives["Previous"]>
    $skip?: React.ComponentPropsWithoutRef<TPrimitives["Skip"]>
    $next?: React.ComponentPropsWithoutRef<TPrimitives["Next"]>
    $submit?: React.ComponentPropsWithoutRef<TPrimitives["Submit"]>
  }

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
  columns?: QuestionnaireColumns
  input?: React.ComponentPropsWithoutRef<"input"> | boolean
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  invalid?: boolean
  error?: React.ReactNode
}>
