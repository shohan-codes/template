import * as React from "react"
import {
  Questionnaire as Root,
  QuestionnaireProgress as Progress,
  QuestionnaireItem as Item,
  QuestionnaireTitle as Title,
  QuestionnaireDescription as Description,
  QuestionnaireChoices as Choices,
  QuestionnaireChoice as Choice,
  QuestionnaireInput as Input,
  QuestionnaireError as Error,
  QuestionnaireActions as Actions,
  QuestionnairePrevious as Previous,
  QuestionnaireSkip as Skip,
  QuestionnaireNext as Next,
  QuestionnaireSubmit as Submit,
} from "@workspace/shadcn-ui"

import {
  QuestionnaireCore,
  type QuestionnaireProps,
  type QuestionnaireSlots,
} from "../core"

export const defaultQuestionnaireSlots: QuestionnaireSlots = {
  Root,
  Progress,
  Item,
  Title,
  Description,
  Choices,
  Choice,
  Input,
  Error,
  Actions,
  Previous,
  Skip,
  Next,
  Submit,
}

export type { QuestionnaireProps }

export function Questionnaire(props: QuestionnaireProps) {
  return (
    <QuestionnaireCore
      defaultSlots={defaultQuestionnaireSlots}
      {...props}
    />
  )
}
