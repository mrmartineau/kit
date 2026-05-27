import { DEFAULT_DECIMAL_PLACES } from "../constants.js";
import { formatNumberBase } from "./formatNumberBase.js";

/**
 * Formats a number as currency.
 * @param value - The number to format.
 * @param currency - The currency code e.g. USD, GBP, EUR, etc.
 * @param decimalCount - Optional. The number of decimal places to display. Default is 2.
 * @param options - Additional, optional options for formatting the number.
 * @returns The formatted currency as a string.
 */
export const formatNumberCurrency = (
  value: number | string,
  currency: string,
  decimalCount: number = DEFAULT_DECIMAL_PLACES,
  options?: Intl.NumberFormatOptions,
) => {
  return formatNumberBase(value, {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: currency,
    maximumFractionDigits: decimalCount,
    ...options,
  });
};
