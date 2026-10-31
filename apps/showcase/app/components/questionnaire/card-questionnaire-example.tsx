"use client"

import { CardQuestionnaire, type QuestionnaireQuestionData } from "@workspace/pattern"

const feedbackQuestions: readonly QuestionnaireQuestionData[] = [
  {
    name: "satisfaction",
    title: "How satisfied are you with our service?",
    description: "Please select an option that best reflects your overall experience.",
    required: true,
    choices: [
      {
        value: "very-satisfied",
        label: "Very Satisfied",
        description: "Exceeded all expectations with fast and reliable responses.",
      },
      {
        value: "satisfied",
        label: "Satisfied",
        description: "Met expectations reasonably well.",
      },
      {
        value: "neutral",
        label: "Neutral",
        description: "Average experience with room for improvement.",
      },
      {
        value: "unsatisfied",
        label: "Unsatisfied",
        description: "Did not meet expectations.",
      },
    ],
  },
  {
    name: "improvements",
    title: "What areas need the most improvement?",
    description: "Choose any that apply to your workflow.",
    multiple: true,
    choices: [
      { value: "speed", label: "Performance & Speed" },
      { value: "docs", label: "Documentation & Examples" },
      { value: "ui", label: "Design & Customizability" },
      { value: "support", label: "Customer Support" },
    ],
  },
  {
    name: "feedback",
    title: "Any additional thoughts or suggestions?",
    description: "Your open feedback helps shape our upcoming releases.",
    input: {
      placeholder: "Write your feedback here...",
    },
  },
]

export default function CardQuestionnaireExample() {
  return (
    <div className="w-full max-w-xl">
      <CardQuestionnaire
        questions={feedbackQuestions}
        onSubmit={(data) => {
          console.log("Card Questionnaire Submitted:", data)
        }}
      />
    </div>
  )
}
