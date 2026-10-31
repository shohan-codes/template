"use client"

import { CodeBlock } from "@workspace/pattern"

const metricsCode = `export function trackPerformance(metric: MetricPayload) {
  const timestamp = performance.now()
  const sanitized = sanitizeTelemetry(metric)

  // Send payload to real-time analytics stream
  analyticsClient.send({ timestamp, ...sanitized }) // [!code focus]

  return { status: "recorded", latency: performance.now() - timestamp }
}`

export default function FocusExample() {
  return (
    <div className="max-w-2xl">
      <CodeBlock
        title="telemetry.ts (focus)"
        language="typescript"
        code={metricsCode}
        lineNumbers
      />
    </div>
  )
}

