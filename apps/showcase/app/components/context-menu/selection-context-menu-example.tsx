"use client"

import { useState } from "react"
import { SelectionContextMenu } from "@workspace/pattern/context-menu/variants/selection-context-menu"

const files = [
  "Product brief.pdf",
  "Brand guidelines.pdf",
  "Research notes.pdf",
] as const

export default function SelectionContextMenuExample() {
  const [selectedIds, setSelectedIds] = useState<readonly string[]>([files[0]])
  const [result, setResult] = useState(
    "Choose files, then open the selection menu."
  )
  return (
    <div className="min-h-110 space-y-4">
      <fieldset className="space-y-2 rounded-xl border p-4">
        <legend className="px-1 text-sm font-medium">Select files</legend>
        {files.map((file) => (
          <label key={file} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedIds.includes(file)}
              onChange={(event) =>
                setSelectedIds(
                  event.target.checked
                    ? [...selectedIds, file]
                    : selectedIds.filter((id) => id !== file)
                )
              }
            />
            <span className="min-w-0 wrap-break-word">{file}</span>
          </label>
        ))}
      </fieldset>
      {selectedIds.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Select at least one file to show its contextual actions.
        </p>
      )}
      <SelectionContextMenu
        selectedIds={selectedIds}
        trigger="Selected files"
        items={[
          {
            id: "open",
            type: "action",
            label: "Open file",
            onSelect: () => setResult(`Opened ${selectedIds[0]} in this demo.`),
          },
          {
            id: "rename",
            type: "action",
            label: "Rename file",
            onSelect: () => setResult("Rename selected."),
          },
        ]}
        multipleItems={[
          {
            id: "download",
            type: "action",
            label: "Download selected files",
            onSelect: () =>
              setResult(`Download selected for ${selectedIds.length} files.`),
          },
          {
            id: "archive",
            type: "action",
            label: "Archive selected files",
            onSelect: () =>
              setResult(`Archived ${selectedIds.length} files in this demo.`),
          },
          {
            id: "share",
            type: "action",
            label: "Share selected files",
            disabled: true,
          },
        ]}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </div>
  )
}
