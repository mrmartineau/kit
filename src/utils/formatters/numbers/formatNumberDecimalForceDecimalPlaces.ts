import { DEFAULT_DECIMAL_PLACES } from "../constants.js";
import { formatNumberDecimal } from "./formatNumberDecimal.js";

/**
 * Formats a number with decimal places.
 * @param value - The number to format.
 * @param decimalCount - The number of decimal places to display. Default is 2.
 * @param options - Additional, optional options for formatting the number.
 * @returns The formatted number as a string.
 */
export const formatNumberDecimalForceDecimalPlaces = (
  value: number,
  decimalCount: number = DEFAULT_DECIMAL_PLACES,
  options?: Intl.NumberFormatOptions,
) => {
  return formatNumberDecimal(value, decimalCount, {
    ...options,
    // The `Intl.NumberFormat` constructor that `formatNumberDecimal` uses trims
    // decimal places if possible so I have ensured that the number of decimal
    // places will be kept no matter what here.
    minimumFractionDigits: decimalCount,
  });
};
