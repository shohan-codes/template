import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import {
  showcaseFamilies,
  getShowcaseRoute,
  familyHref,
  variantHref,
} from "../../../apps/showcase/lib/showcase-registry.ts"

test("sidebar catalog routes and design IDs are unique and complete", () => {
  const routes = new Set()
  for (const family of showcaseFamilies) {
    assert.ok(!routes.has(familyHref(family.id)))
    routes.add(familyHref(family.id))
    const source = readFileSync(
      new URL(
        `../../../apps/showcase/app/components/${family.id}/showcase.tsx`,
        import.meta.url
      ),
      "utf8"
    )
    const ids = [...source.matchAll(/\bid:\s*["']([^"']+)["']/g)].map(
      (match) => match[1]
    )
    const registered = family.variants.flatMap((variant) => variant.exampleIds)
    assert.equal(
      new Set(ids).size,
      ids.length,
      `${family.id}: duplicate source IDs`
    )
    assert.equal(
      new Set(registered).size,
      registered.length,
      `${family.id}: duplicate catalog IDs`
    )
    assert.deepEqual(
      new Set(registered),
      new Set(ids),
      `${family.id}: missing or unregistered examples`
    )
    assert.equal(getShowcaseRoute(familyHref(family.id))?.family.id, family.id)
    for (const variant of family.variants) {
      const href = variantHref(family.id, variant.id)
      assert.ok(!routes.has(href), `Duplicate route ${href}`)
      routes.add(href)
      assert.ok(variant.exampleIds.length > 0)
      assert.equal(getShowcaseRoute(href)?.variant?.id, variant.id)
    }
  }
})

test("tabs examples are assigned to the implementation variant they actually render", () => {
  const variants = showcaseFamilies.find(
    (family) => family.id === "tabs"
  ).variants
  assert.deepEqual(
    new Set(variants.find((variant) => variant.id === "default").exampleIds),
    new Set(["default-tabs", "line-tabs"])
  )
  assert.deepEqual(
    new Set(variants.find((variant) => variant.id === "segmented").exampleIds),
    new Set(["segmented-tabs", "query-tabs", "hash-tabs"])
  )
})

test("invalid or overlong component routes do not resolve as catalog locations", () => {
  for (const path of [
    "/",
    "/preview/tabs/default-tabs",
    "/components/tabs-nope",
    "/components/tabs/unknown",
    "/components/tabs/default/extra",
  ])
    assert.equal(getShowcaseRoute(path), undefined, path)
})
