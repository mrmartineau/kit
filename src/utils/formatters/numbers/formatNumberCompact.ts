import { formatNumberBase } from "./formatNumberBase.js";

/**
 * Formats a number in compact notation (e.g. `1200` → `1.2K`).
 * @param value - The number to format.
 * @param display - `"short"` (default) or `"long"` (e.g. `1.2 thousand`).
 * @param options - Additional, optional `Intl.NumberFormatOptions`.
 */
export const formatNumberCompact = (
  value: number | string,
  display: "short" | "long" = "short",
  options?: Intl.NumberFormatOptions,
) => {
  return formatNumberBase(value, {
    notation: "compact",
    compactDisplay: display,
    ...options,
  });
};
