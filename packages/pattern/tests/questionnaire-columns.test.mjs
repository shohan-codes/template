import assert from "node:assert/strict"
import { Buffer } from "node:buffer"
import { test } from "node:test"
import { readFile } from "node:fs/promises"
import ts from "typescript"

// Exercise the source mapping without requiring a workspace build or Node TS stripping.
const source = await readFile(new URL("../src/questionnaire/utilities/columns.ts", import.meta.url), "utf8")
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
})
const { resolveColumnClass } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`)

test("omitted columns leave the choices layout unchanged", () => {
  assert.equal(resolveColumnClass(), undefined)
  assert.equal(resolveColumnClass({}), undefined)
})

test("numeric columns use thresholds suited to the choice layout", () => {
  assert.equal(resolveColumnClass(1), "grid-cols-1")
  for (const [count, width] of [[2, 448], [3, 640], [4, 768]]) {
    assert.equal(
      resolveColumnClass(count),
      `grid-cols-1 @min-[${width}px]/questionnaire:grid-cols-${count}`,
    )
  }
})

test("two-column auto layout activates inside a 576px component, but not at 375px", () => {
  const classes = resolveColumnClass(2)
  const threshold = Number(classes.match(/@min-\[(\d+)px\]/)[1])
  assert.ok(375 < threshold)
  assert.ok(576 >= threshold)
  // An explicitly selected sm breakpoint keeps its documented 640px contract.
  assert.equal(resolveColumnClass({ sm: 2 }), "@min-[640px]/questionnaire:grid-cols-2")
})

test("responsive columns preserve explicit viewport-equivalent thresholds locally", () => {
  assert.equal(
    resolveColumnClass({ default: 1, sm: 2, md: 3, lg: 4 }),
    "grid-cols-1 @min-[640px]/questionnaire:grid-cols-2 @min-[768px]/questionnaire:grid-cols-3 @min-[1024px]/questionnaire:grid-cols-4",
  )
  for (const [breakpoint, width] of [["sm", 640], ["md", 768], ["lg", 1024]]) {
    for (const count of [1, 2, 3, 4]) {
      assert.equal(
        resolveColumnClass({ [breakpoint]: count }),
        `@min-[${width}px]/questionnaire:grid-cols-${count}`,
      )
    }
  }
})

test("default-only columns need no query container threshold", () => {
  assert.equal(resolveColumnClass({ default: 3 }), "grid-cols-3")
})
