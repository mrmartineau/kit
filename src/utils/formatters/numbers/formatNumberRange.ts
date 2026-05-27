/**
 * Formats a numeric range using `Intl.NumberFormat#formatRange`
 * (e.g. `1`, `5` → `1–5`).
 * @param min - Lower bound.
 * @param max - Upper bound.
 * @param options - Additional, optional `Intl.NumberFormatOptions`.
 * @param locale - Optional. Defaults to `"en-GB"`.
 */
export const formatNumberRange = (
  min: number,
  max: number,
  options?: Intl.NumberFormatOptions,
  locale: string = "en-GB",
) => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new Error("formatNumberRange: Invalid range");
  }
  return new Intl.NumberFormat(locale, options).formatRange(min, max);
};
