"use client"

import { CardAccordion, withHelpIcon } from "@workspace/pattern"

const faqItems = withHelpIcon([
  {
    title: "How does the automated pod autoscaling algorithm work?",
    content:
      "The Horizontal Pod Autoscaler (HPA) continuously samples CPU and memory metrics over a 15-second sliding window. When utilization exceeds the target 80% threshold for 2 consecutive cycles, additional replica pods are scheduled across available availability zones.",
  },
  {
    title: "What is the replication topology for persistent storage volumes?",
    content:
      "All persistent volume claims (PVCs) utilize NVMe-backed SSD storage replicated synchronously across 3 independent availability zones with 99.999999999% (11 9s) durability guarantees.",
  },
  {
    title: "How is zero-trust network encryption enforced between services?",
    content:
      "Mutual TLS (mTLS) is enforced at the sidecar proxy layer with automated 24-hour cryptographic certificate rotation managed by the cluster mesh certificate authority.",
  },
])

/**
 * CardAccordion example displaying segmented card-styled accordion items.
 */
export default function CardAccordionExample() {
  return (
    <div className="max-w-2xl">
      <CardAccordion items={faqItems} />
    </div>
  )
}

