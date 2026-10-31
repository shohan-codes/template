/* ========================================================================== *\
 * CodeBlock Notations & Utilities
 * ========================================================================== */

export type CodeBlockLineVariant =
  | "default"
  | "added"
  | "removed"
  | "highlighted"
  | "error"
  | "warning"

/**
 * Regex matching Fumadocs and Shiki comment notations at the end of a line.
 * Supports:
 * - `// [!code ++]`
 * - `// [!code --]`
 * - `// [!code highlight]`
 * - `// [!code focus]`
 * - `// [!code error]`
 * - `// [!code warning]`
 * Also supports `#`, `/* ... *\/`, and `<!-- ... -->` comment formats.
 */
export const NOTATION_REGEX =
  /(?:\/\/\s*|#\s*|\/\*\s*|<!--\s*)\[!code\s*(\+\+|--|highlight|focus|error|warning)\](?:\s*\*\/|\s*-->)?\s*$/

/**
 * Parses numbers and numeric ranges (e.g. `[1, 2, 5]` or `"1-3, 5, 8"`) into a Set of line numbers.
 */
export function parseLineNumbers(
  input?: readonly number[] | string
): ReadonlySet<number> {
  if (!input) return new Set<number>()
  if (Array.isArray(input)) return new Set(input)
  if (typeof input !== "string") return new Set<number>()

  const numbers = new Set<number>()
  for (const part of input.split(",")) {
    const trimmed = part.trim()
    if (!trimmed) continue
    if (trimmed.includes("-")) {
      const parts = trimmed.split("-")
      const start = Number(parts[0])
      const end = Number(parts[1])
      if (Number.isFinite(start) && Number.isFinite(end)) {
        for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
          numbers.add(i)
        }
      }
    } else {
      const n = Number(trimmed)
      if (Number.isFinite(n)) numbers.add(n)
    }
  }
  return numbers
}

export interface ParseNotationsOptions {
  /** Whether to parse in-code comment notations like `// [!code ++]`. Defaults to true. */
  notations?: boolean
  /** Whether to auto-detect git diff +/- lines. Defaults to false. */
  diff?: boolean
  /** Line numbers or range to visually highlight. */
  highlightLines?: readonly number[] | string
  /** Line numbers or range marked as added (+). */
  addedLines?: readonly number[] | string
  /** Line numbers or range marked as removed (−). */
  removedLines?: readonly number[] | string
  /** Whether to omit `[!code --]` lines from the copied string. Defaults to true. */
  filterRemovedOnCopy?: boolean
  /** Custom callback for determining the variant for a line. */
  getLineVariant?: (
    lineNumber: number,
    lineText: string
  ) => CodeBlockLineVariant | undefined
  /** Starting line number. Defaults to 1. */
  startLine?: number
}

export interface ParsedLineData {
  /** Clean text of the line with notations removed. */
  readonly text: string
  /** 1-based line number. */
  readonly lineNumber: number
  /** Line variant. */
  readonly variant?: CodeBlockLineVariant
  /** Whether this line is explicitly focused. */
  readonly isFocused: boolean
  /** Whether this line is marked as removed. */
  readonly isRemoved: boolean
}

export interface ParsedCodeNotations {
  /** Clean code string without notations, used for syntax highlighting and rendering. */
  readonly displayCode: string
  /** Clean code string formatted for clipboard copying. */
  readonly copyCode: string
  /** Line-by-line parsed information. */
  readonly lines: readonly ParsedLineData[]
  /** True if at least one line is explicitly focused. */
  readonly hasFocusedLines: boolean
}

/**
 * Parses raw code, extracting comment notations, determining line variants,
 * and preparing clean display and copy strings.
 */
export function parseCodeNotations(
  rawCode: string,
  options: ParseNotationsOptions = {}
): ParsedCodeNotations {
  const {
    notations = true,
    diff = false,
    highlightLines,
    addedLines,
    removedLines,
    filterRemovedOnCopy = true,
    getLineVariant,
    startLine = 1,
  } = options

  if (!rawCode) {
    return {
      displayCode: "",
      copyCode: "",
      lines: [],
      hasFocusedLines: false,
    }
  }

  const highlightedSet = parseLineNumbers(highlightLines)
  const addedSet = parseLineNumbers(addedLines)
  const removedSet = parseLineNumbers(removedLines)

  const rawLines = rawCode.split("\n")
  const parsedLines: ParsedLineData[] = []
  const displayLineTexts: string[] = []
  const copyLineTexts: string[] = []

  let hasFocusedLines = false

  for (let index = 0; index < rawLines.length; index++) {
    const rawLine = rawLines[index] ?? ""
    const lineNumber = startLine + index

    let cleanText = rawLine
    let variant: CodeBlockLineVariant | undefined = undefined
    let isFocused = false
    let isRemoved = false

    // 1. Parse comment notation if enabled
    if (notations) {
      const match = rawLine.match(NOTATION_REGEX)
      if (match && match[1]) {
        cleanText = rawLine.replace(NOTATION_REGEX, "").trimEnd()
        const tag = match[1]

        switch (tag) {
          case "++":
            variant = "added"
            break
          case "--":
            variant = "removed"
            isRemoved = true
            break
          case "highlight":
            variant = "highlighted"
            break
          case "focus":
            isFocused = true
            hasFocusedLines = true
            break
          case "error":
            variant = "error"
            break
          case "warning":
            variant = "warning"
            break
        }
      }
    }

    // 2. Check props (highlightLines, addedLines, removedLines) if not already tagged
    if (!variant) {
      if (addedSet.has(lineNumber)) {
        variant = "added"
      } else if (removedSet.has(lineNumber)) {
        variant = "removed"
        isRemoved = true
      } else if (highlightedSet.has(lineNumber)) {
        variant = "highlighted"
      } else if (diff) {
        if (cleanText.startsWith("+")) {
          variant = "added"
        } else if (cleanText.startsWith("-")) {
          variant = "removed"
          isRemoved = true
        }
      }
    }

    // 3. Custom getLineVariant overrides
    if (getLineVariant) {
      const custom = getLineVariant(lineNumber, cleanText)
      if (custom) {
        variant = custom
        if (custom === "removed") isRemoved = true
      }
    }

    parsedLines.push({
      text: cleanText,
      lineNumber,
      variant,
      isFocused,
      isRemoved,
    })

    displayLineTexts.push(cleanText)

    if (!filterRemovedOnCopy || !isRemoved) {
      copyLineTexts.push(cleanText)
    }
  }

  return {
    displayCode: displayLineTexts.join("\n"),
    copyCode: copyLineTexts.join("\n"),
    lines: parsedLines,
    hasFocusedLines,
  }
}

/**
 * Returns Tailwind class names for a line variant and blur state.
 */
export function getLineVariantClassName(
  variant: CodeBlockLineVariant | undefined,
  isBlurred: boolean
): string {
  const classes: string[] = []

  if (isBlurred) {
    classes.push(
      "opacity-35 blur-[0.5px] transition-all hover:opacity-100 hover:blur-none"
    )
  }

  switch (variant) {
    case "added":
      classes.push(
        "bg-emerald-500/10 text-emerald-950 dark:bg-emerald-500/20 dark:text-emerald-100 after:text-emerald-600 dark:after:text-emerald-400"
      )
      break
    case "removed":
      classes.push(
        "bg-rose-500/10 text-rose-950 dark:bg-rose-500/20 dark:text-rose-100 after:text-rose-600 dark:after:text-rose-400"
      )
      break
    case "highlighted":
      classes.push("bg-muted/80 dark:bg-muted/50")
      break
    case "error":
      classes.push(
        "bg-destructive/15 text-destructive after:text-destructive after:content-['!']"
      )
      break
    case "warning":
      classes.push(
        "bg-amber-500/15 text-amber-950 dark:text-amber-100 after:text-amber-600 dark:after:text-amber-400 after:content-['!']"
      )
      break
  }

  return classes.join(" ")
}

