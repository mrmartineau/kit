import { DEFAULT_DECIMAL_PLACES } from "../constants.js";
import { formatNumberBase } from "./formatNumberBase.js";

/**
 * Formats a number with decimal places.
 * @param value - The number to format.
 * @param decimalCount - Optional. The number of decimal places to display. Default is 2.
 * @param options - Additional, optional options for formatting the number.
 * @returns The formatted number as a string.
 */
export const formatNumberDecimal = (
  value: number | string,
  decimalCount: number = DEFAULT_DECIMAL_PLACES,
  options?: Intl.NumberFormatOptions,
) => {
  return formatNumberBase(value, {
    style: "decimal",
    maximumFractionDigits: decimalCount,
    ...options,
  });
};
