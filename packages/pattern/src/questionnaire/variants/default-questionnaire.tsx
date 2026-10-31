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

import { createQuestionnaire } from "../core"

export const defaultQuestionnairePrimitives = {
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
} as const

const QuestionnaireBase = createQuestionnaire(defaultQuestionnairePrimitives)

export const Questionnaire = React.memo(QuestionnaireBase)

Questionnaire.displayName = "Questionnaire"

