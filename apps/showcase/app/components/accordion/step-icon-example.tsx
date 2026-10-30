"use client"

import { Accordion, withStepIcon } from "@workspace/pattern"

const onboardingSteps = withStepIcon([
  {
    title: "Create your workspace account",
    content:
      "Sign up with your work email or single sign-on (SSO). Fill in your organization profile and customize team workspace settings.",
  },
  {
    title: "Connect your developer integrations",
    content:
      "Link your GitHub repositories, Slack channels, and cloud deployment providers to enable automated sync and webhook triggers.",
  },
  {
    title: "Invite team members and assign roles",
    content:
      "Send team invites with role-based access control (Admin, Developer, or Viewer) and configure fine-grained repository permissions.",
  },
])

/**
 * Minimal accordion example focusing on the StepIcon utility.
 */
export default function StepIconExample() {
  return (
    <div className="w-full max-w-xl">
      <Accordion
        items={onboardingSteps}
        mode="multiple"

      />
    </div>
  )
}


