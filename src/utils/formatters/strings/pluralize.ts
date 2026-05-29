/**
 * Picks the singular or plural form based on a count.
 * If `plural` is omitted, appends `"s"` to the singular form.
 * @example pluralize(1, "apple") // "apple"
 * @example pluralize(2, "apple") // "apples"
 * @example pluralize(2, "child", "children") // "children"
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string,
): string {
  if (count === 1) return singular;
  return plural ?? `${singular}s`;
}
