export type QuestionnaireColumns =
  | 1
  | 2
  | 3
  | 4
  | Readonly<{
      default?: 1 | 2 | 3 | 4
      sm?: 1 | 2 | 3 | 4
      md?: 1 | 2 | 3 | 4
      lg?: 1 | 2 | 3 | 4
    }>

// Numeric columns adapt to the space needed by the choices rather than viewport sizes.
const automaticColumnMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 @min-[448px]/questionnaire:grid-cols-2",
  3: "grid-cols-1 @min-[640px]/questionnaire:grid-cols-3",
  4: "grid-cols-1 @min-[768px]/questionnaire:grid-cols-4",
} as const

const breakpointMap = {
  default: {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  },
  sm: {
    1: "@min-[640px]/questionnaire:grid-cols-1",
    2: "@min-[640px]/questionnaire:grid-cols-2",
    3: "@min-[640px]/questionnaire:grid-cols-3",
    4: "@min-[640px]/questionnaire:grid-cols-4",
  },
  md: {
    1: "@min-[768px]/questionnaire:grid-cols-1",
    2: "@min-[768px]/questionnaire:grid-cols-2",
    3: "@min-[768px]/questionnaire:grid-cols-3",
    4: "@min-[768px]/questionnaire:grid-cols-4",
  },
  lg: {
    1: "@min-[1024px]/questionnaire:grid-cols-1",
    2: "@min-[1024px]/questionnaire:grid-cols-2",
    3: "@min-[1024px]/questionnaire:grid-cols-3",
    4: "@min-[1024px]/questionnaire:grid-cols-4",
  },
} as const

/**
 * Resolves static Tailwind grid-cols classes against the questionnaire container.
 * Numeric counts use component-fit thresholds (2: 448px, 3: 640px, 4: 768px).
 * Explicit breakpoint keys retain their 640px / 768px / 1024px thresholds.
 */
export function resolveColumnClass(
  columns?: QuestionnaireColumns
): string | undefined {
  if (!columns) return undefined
  if (typeof columns === "number") {
    return automaticColumnMap[columns] ?? "grid-cols-1"
  }
  return (
    Object.entries(columns)
      .map(
        ([bp, count]) =>
          breakpointMap[bp as keyof typeof breakpointMap]?.[
            count as 1 | 2 | 3 | 4
          ]
      )
      .filter(Boolean)
      .join(" ") || undefined
  )
}
