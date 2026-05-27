import { DEFAULT_DECIMAL_PLACES } from "../constants.js";
import { formatNumberBase } from "./formatNumberBase.js";

/**
 * Formats a number as a percentage. The value is expected to already be in
 * decimal form (e.g. `0.42` → `42%`).
 * @param value - The number to format.
 * @param decimalCount - Optional. Maximum decimal places. Default 2.
 * @param options - Additional, optional `Intl.NumberFormatOptions`.
 */
export const formatNumberPercent = (
  value: number | string,
  decimalCount: number = DEFAULT_DECIMAL_PLACES,
  options?: Intl.NumberFormatOptions,
) => {
  return formatNumberBase(value, {
    style: "percent",
    maximumFractionDigits: decimalCount,
    ...options,
  });
};
