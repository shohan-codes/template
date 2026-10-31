"use client"

import { Questionnaire, type QuestionnaireQuestionData } from "@workspace/pattern"

// Multi-step questionnaire demonstrating different Multiple Choice looks:
// Step 1: Multiple choice with simple labels & keyboard shortcuts (Screenshot 2)
// Step 2: Multiple choice with rich choice descriptions
// Step 3: Multiple choice with custom inline input (select items + specify additional items)
// Step 4: Multi-select in a 2-column grid layout via $choices prop
const multipleChoiceQuestions: readonly QuestionnaireQuestionData[] = [
  // Step 1: Simple labels with keyboard shortcuts (A, B, C, D)
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
  // Step 2: Choices with detailed descriptions
  {
    name: "integrations",
    title: "Which integrations do you want enabled?",
    description: "You can select multiple services to connect to your project pipeline.",
    multiple: true,
    choices: [
      {
        value: "github",
        label: "GitHub Actions",
        description: "Automated CI/CD pipelines for linting, testing, and deployment previews.",
      },
      {
        value: "slack",
        label: "Slack Notifications",
        description: "Receive instant team alerts when builds fail or pull requests need review.",
      },
      {
        value: "sentry",
        label: "Sentry Error Monitoring",
        description: "Real-time crash reporting and stack trace tracking across production instances.",
      },
      {
        value: "datadog",
        label: "Datadog APM",
        description: "Infrastructure telemetry and distributed tracing for microservices.",
      },
    ],
    required: true,
  },
  // Step 3: Choices with custom freeform input (Other / Custom requirement)
  {
    name: "features",
    title: "Which core features should be scaffolded?",
    description: "Pick preset features or type any extra modules needed below.",
    multiple: true,
    choices: [
      { value: "auth", label: "Authentication & RBAC" },
      { value: "billing", label: "Stripe Subscriptions & Invoicing" },
      { value: "i18n", label: "Internationalization (i18n)" },
      { value: "analytics", label: "Product Analytics Tracking" },
    ],
    input: {
      placeholder: "Other custom features (e.g. GraphQL, Webhooks)...",
    },
    required: false,
  },
  // Step 4: 2-column grid layout of multi-select tags via `columns: 2`
  {
    name: "tech_stack",
    title: "Select your preferred tech stack tools",
    description: "Multi-select choices arranged in a modern responsive 2-column grid.",
    multiple: true,
    columns: 2,
    choices: [
      { value: "nextjs", label: "Next.js 15+" },
      { value: "tailwind", label: "Tailwind CSS v4" },
      { value: "typescript", label: "TypeScript Strict" },
      { value: "turborepo", label: "Turborepo Monorepo" },
      { value: "prisma", label: "Prisma ORM" },
      { value: "trpc", label: "tRPC Endpoints" },
    ],
    input: {
      placeholder: "Other tool / framework (e.g. Bun, Drizzle)...",
    },
    required: true,
  },
]

export default function MultipleChoiceQuestionnaireExample() {
  return (
    <div className="w-full max-w-xl">
      <Questionnaire
        questions={multipleChoiceQuestions}
        shortcuts="letters"
        $submit={{
          children: "Submit selections",
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
