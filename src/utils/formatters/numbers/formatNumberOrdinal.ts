const ORDINAL_SUFFIXES: Record<Intl.LDMLPluralRule, string> = {
  zero: "th",
  one: "st",
  two: "nd",
  few: "rd",
  many: "th",
  other: "th",
};

/**
 * Formats an integer with its English ordinal suffix (e.g. `1` → `1st`).
 * @param value - The integer to format.
 * @param locale - Optional. Defaults to `"en-GB"`.
 */
export const formatNumberOrdinal = (
  value: number,
  locale: string = "en-GB",
) => {
  if (!Number.isFinite(value)) {
    throw new Error("formatNumberOrdinal: Invalid number");
  }
  const rules = new Intl.PluralRules(locale, { type: "ordinal" });
  const suffix = ORDINAL_SUFFIXES[rules.select(value)];
  return `${value}${suffix}`;
};
