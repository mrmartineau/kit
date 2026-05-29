import { DEFAULT_DECIMAL_PLACES } from "../constants.js";
import { formatNumberBase } from "./formatNumberBase.js";

/**
 * Formats a number with an explicit sign for non-zero values (e.g. `5` → `+5`,
 * `-5` → `-5`, `0` → `0`). Pass `signDisplay: "always"` to also sign zero.
 * @param value - The number to format.
 * @param decimalCount - Maximum decimal places. Default 2.
 * @param signDisplay - `Intl.NumberFormatOptions['signDisplay']`. Default `"exceptZero"`.
 * @param options - Additional, optional `Intl.NumberFormatOptions`.
 */
export const formatNumberSignDisplay = (
  value: number | string,
  decimalCount: number = DEFAULT_DECIMAL_PLACES,
  signDisplay: Intl.NumberFormatOptions["signDisplay"] = "exceptZero",
  options?: Intl.NumberFormatOptions,
) => {
  return formatNumberBase(value, {
    style: "decimal",
    maximumFractionDigits: decimalCount,
    signDisplay,
    ...options,
  });
};
