/** Optional slot values behave like omitted keys; only defined overrides replace defaults. */
export function resolveSlots<Slots extends object>(
  defaults: Slots,
  overrides?: Partial<NoInfer<Slots>>
): Slots {
  if (!overrides) return defaults
  const resolved = { ...defaults }
  for (const key of Object.keys(overrides) as (keyof Slots)[]) {
    const value = overrides[key]
    if (value !== undefined) resolved[key] = value
  }
  return resolved
}
