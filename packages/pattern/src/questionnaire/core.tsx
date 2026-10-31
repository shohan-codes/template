"use client"

import * as React from "react"
import { cn } from "@workspace/shadcn-ui/lib/utils"

import { resolveColumnClass, type QuestionnaireColumns } from "./utilities/columns"

/* ========================================================================== *\
 * Headless Questionnaire Core Component
 * ========================================================================== */

/**
 * Headless, data-driven Questionnaire core component.
 * Expects `defaultSlots` to be injected from outside, achieving loose coupling.
 */
export function QuestionnaireCore({
  questions,
  progress,
  actions,
  defaultSlots,
  slots,
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
}: QuestionnaireCoreProps) {
  if (questions.length === 0) return null

  const P = slots ? { ...defaultSlots, ...slots } : defaultSlots

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

/* ========================================================================== *\
 * Questionnaire Types
 * ========================================================================== */

export type QuestionnaireSlots = Readonly<{
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

export type QuestionnaireShortcutMode = "letters" | "numbers"

export type QuestionnaireBaseProps = Omit<
  React.ComponentPropsWithoutRef<"form">,
  "children" | "defaultValue" | "value"
> & {
  questions: readonly QuestionnaireQuestionData[]
  progress?: boolean
  actions?: boolean
  defaultItem?: string
  item?: string
  onItemChange?: (item: string) => void
  shortcuts?: QuestionnaireShortcutMode
  slots?: Partial<QuestionnaireSlots>
  $progress?: Record<string, unknown>
  $item?: Record<string, unknown>
  $title?: Record<string, unknown>
  $description?: Record<string, unknown>
  $choices?: Record<string, unknown> & { className?: string }
  $choice?: Record<string, unknown>
  $input?: Record<string, unknown>
  $error?: Record<string, unknown>
  $actions?: Record<string, unknown>
  $previous?: Record<string, unknown>
  $skip?: Record<string, unknown>
  $next?: Record<string, unknown>
  $submit?: Record<string, unknown>
}

export type QuestionnaireCoreProps = QuestionnaireBaseProps & {
  /** Injected default slots for loosely coupled primitives. */
  defaultSlots: QuestionnaireSlots
}

export type QuestionnaireProps = QuestionnaireBaseProps & {
  /** Optional custom default slots override. */
  defaultSlots?: QuestionnaireSlots
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
