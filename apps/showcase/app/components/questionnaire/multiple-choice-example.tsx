"use client"

import { Questionnaire, type QuestionnaireQuestionData } from "@workspace/pattern"

const inspectContextQuestions: readonly QuestionnaireQuestionData[] = [
  {
    name: "context",
    title: "What context should the agent inspect?",
    description: "Select every source that may affect the implementation.",
    multiple: true,
    choices: [
      { value: "source", label: "Relevant source files" },
      { value: "tests", label: "Existing tests" },
      { value: "architecture", label: "Architecture documentation" },
      { value: "commits", label: "Recent commit history" },
    ],
    required: true,
  },
]

export default function MultipleChoiceQuestionnaireExample() {
  return (
    <div className="w-full max-w-xl">
      <Questionnaire
        questions={inspectContextQuestions}
        shortcuts="letters"
        $submit={{
          children: "Share context",
        }}
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          console.log("Context submitted:", Object.fromEntries(data.entries()))
          alert("Submitted! Check browser console.")
        }}
      />
    </div>
  )
}

