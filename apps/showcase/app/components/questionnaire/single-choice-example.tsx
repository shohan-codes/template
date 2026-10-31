"use client"

import { Questionnaire, type QuestionnaireQuestionData } from "@workspace/pattern"

// Multi-step workflow demonstrating:
// 1. With input, without choice description (Screenshot 1)
// 2. With choice descriptions, without input
// 3. Simple choices (without descriptions, without input)
// 4. Standalone freeform text input step
const refactorWorkflowQuestions: readonly QuestionnaireQuestionData[] = [
  // Step 1: Choices with freeform input (No choice descriptions)
  {
    name: "strategy",
    title: "How should the agent approach this refactor?",
    description: "Choose a strategy or write a more specific instruction.",
    choices: [
      { value: "smallest", label: "Make the smallest safe change" },
      { value: "module", label: "Refactor one module at a time" },
      { value: "complete", label: "Replace the implementation completely" },
    ],
    input: {
      placeholder: "Write a more specific instruction...",
      defaultValue: "hello",
    },
    required: true,
  },
  // Step 2: Choices with descriptions (No input)
  {
    name: "deployment_target",
    title: "Where should the preview build be deployed?",
    description: "Select the primary hosting tier for smoke testing.",
    choices: [
      {
        value: "ephemeral",
        label: "Ephemeral Preview Environment",
        description: "Spins up an isolated sandbox pod destroyed on branch merge.",
      },
      {
        value: "staging",
        label: "Shared Staging Cluster",
        description: "Deploys to the pre-production Kubernetes cluster.",
      },
      {
        value: "local",
        label: "Local Development Server",
        description: "Run strictly in memory on localhost without cloud ingress.",
      },
    ],
    required: true,
  },
  // Step 3: Simple minimal choices (No descriptions, No input)
  {
    name: "notification_channel",
    title: "Where should the build report be posted?",
    description: "Notification will include execution time and bundle size diff.",
    choices: [
      { value: "slack", label: "Slack Engineering Channel" },
      { value: "discord", label: "Discord Bot Webhook" },
      { value: "email", label: "Email Digest" },
    ],
  },
  // Step 4: Standalone Input step (No choices)
  {
    name: "notes",
    title: "Any release notes or migration warnings?",
    description: "Optional notes appended to the automated pull request description.",
    input: {
      placeholder: "e.g. Breaking change in v2 config format...",
    },
  },
]

export default function SingleChoiceQuestionnaireExample() {
  return (
    <div className="w-full max-w-xl">
      <Questionnaire
        questions={refactorWorkflowQuestions}
        shortcuts="letters"
        $submit={{
          children: "Complete workflow",
        }}
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          console.log("Workflow submitted:", Object.fromEntries(data.entries()))
          alert("Workflow completed! Check console for submitted values.")
        }}
      />
    </div>
  )
}
