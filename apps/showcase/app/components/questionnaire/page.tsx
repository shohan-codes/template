"use client"

import {
  ExamplePageShell,
  type ShowcaseItem,
} from "@/components/example-page-shell"

import SingleChoiceExample from "./single-choice-example"
import SingleChoiceExampleRaw from "./single-choice-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import MultipleChoiceExample from "./multiple-choice-example"
import MultipleChoiceExampleRaw from "./multiple-choice-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

import CardQuestionnaireExample from "./card-questionnaire-example"
import CardQuestionnaireExampleRaw from "./card-questionnaire-example.tsx?raw" with {
  turbopackLoader: "raw-loader",
  turbopackAs: "*.js",
}

const questionnaireShowcaseItems: readonly ShowcaseItem[] = [
  {
    id: "card-questionnaire",
    title: "Card Questionnaire Variant",
    description:
      "A card-contained questionnaire variant featuring a unified bordered surface, header progress, distinct choice states, and separated footer actions.",
    code: CardQuestionnaireExampleRaw,
    preview: <CardQuestionnaireExample />,
  },
  {
    id: "single-choice-with-input",
    title: "Single Choice with Custom Input",
    description:
      "Radio selection with keyboard shortcut indicators (A, B, C) and an optional freeform text response directly inside the choices group.",
    code: SingleChoiceExampleRaw,
    preview: <SingleChoiceExample />,
  },
  {
    id: "multiple-choice-checkbox",
    title: "Multiple Choice (Checkboxes)",
    description:
      "Multi-select question utilizing square checkbox indicators with custom submit action label.",
    code: MultipleChoiceExampleRaw,
    preview: <MultipleChoiceExample />,
  },
]

export default function QuestionnaireShowcase() {
  return (
    <ExamplePageShell
      title="Questionnaire Patterns"
      description="Multi-step sequential question forms with progress tracking, keyboard shortcuts, and form submission."
      items={questionnaireShowcaseItems}
    />
  )
}
