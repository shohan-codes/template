"use client"

import { useState } from "react"
import { Dropdown, type DropdownItemData } from "@workspace/pattern"

export default function PreferencesDropdownExample() {
  const [showCompleted, setShowCompleted] = useState(true)
  const [showAssignees, setShowAssignees] = useState(false)
  const [density, setDensity] = useState("comfortable")
  const items: readonly DropdownItemData[] = [
    { type: "label", id: "visibility", label: "Visible on board" },
    {
      type: "checkbox",
      id: "completed",
      label: "Completed tasks",
      checked: showCompleted,
      onCheckedChange: setShowCompleted,
      onSelect: (event) => event.preventDefault(),
    },
    {
      type: "checkbox",
      id: "assignees",
      label: "Assignee avatars",
      checked: showAssignees,
      onCheckedChange: setShowAssignees,
      onSelect: (event) => event.preventDefault(),
    },
    { type: "separator", id: "divider" },
    { type: "label", id: "density-label", label: "Display density" },
    {
      type: "radio-group",
      id: "density",
      label: "Display density",
      value: density,
      onValueChange: setDensity,
      items: [
        { id: "compact", value: "compact", label: "Compact" },
        { id: "comfortable", value: "comfortable", label: "Comfortable" },
        { id: "spacious", value: "spacious", label: "Spacious" },
      ],
    },
  ]
  return (
    <div className="min-h-105 space-y-4">
      <Dropdown items={items} trigger="View settings" />
      <p role="status" className="text-sm text-muted-foreground">
        {density} layout · Completed tasks{" "}
        {showCompleted ? "visible" : "hidden"} · Avatars{" "}
        {showAssignees ? "visible" : "hidden"}
      </p>
    </div>
  )
}
