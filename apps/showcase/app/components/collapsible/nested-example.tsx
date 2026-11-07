"use client"

import {
  Collapsible,
  type CollapsibleItemData,
} from "@workspace/pattern/collapsible"

const items = [
  {
    id: "overview",
    type: "content",
    content:
      "Organize a release with groups, dividers, and independent disclosures.",
  },
  { id: "divider", type: "separator" },
  {
    id: "release",
    type: "group",
    label: "Release checklist",
    items: [
      {
        id: "tests",
        type: "content",
        content: "Run package checks and review the changelog.",
      },
      {
        id: "quality",
        type: "group",
        label: "Quality checks",
        items: [
          {
            id: "keyboard",
            type: "content",
            content: "Check keyboard navigation and visible focus.",
          },
          {
            id: "devices",
            type: "disclosure",
            trigger: "Device coverage",
            items: [
              {
                id: "mobile",
                type: "content",
                content: "Review layouts at 375px, 768px, and 1280px.",
              },
              {
                id: "details",
                type: "disclosure",
                trigger: "Small-screen details",
                items: [
                  {
                    id: "wrapping",
                    type: "content",
                    content:
                      "Long labels should wrap without pushing the disclosure icon off screen.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { id: "footer-divider", type: "separator" },
  {
    id: "deployment",
    type: "disclosure",
    trigger: "Deployment notes",
    items: [
      {
        id: "preview",
        type: "content",
        content: "Publish a preview and request review before merging.",
      },
    ],
  },
] satisfies readonly CollapsibleItemData[]

export default function NestedExample() {
  return (
    <div className="mx-auto max-w-lg">
      <Collapsible trigger="Release guide" defaultOpen items={items} />
    </div>
  )
}
