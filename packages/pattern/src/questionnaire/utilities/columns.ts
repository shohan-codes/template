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

const breakpointMap = {
  default: { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" },
  sm: { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" },
  md: { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" },
  lg: { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" },
} as const

/**
 * Resolves static Tailwind grid-cols classes for questionnaire choices layout.
 */
export function resolveColumnClass(columns?: QuestionnaireColumns): string | undefined {
  if (!columns) return undefined
  if (typeof columns === "number") {
    return breakpointMap.sm[columns] ? `grid-cols-1 ${breakpointMap.sm[columns]}` : "grid-cols-1"
  }
  return Object.entries(columns)
    .map(([bp, count]) => breakpointMap[bp as keyof typeof breakpointMap]?.[count as 1 | 2 | 3 | 4])
    .filter(Boolean)
    .join(" ") || undefined
}

