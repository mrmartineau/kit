import { DEFAULT_DECIMAL_PLACES } from "../constants.js";
import { formatNumberBase } from "./formatNumberBase.js";

/**
 * Formats a number as currency in accounting style: negative values are wrapped
 * in parentheses (e.g. `-100` → `(£100.00)`).
 * @param value - The number to format.
 * @param currency - The currency code e.g. `USD`, `GBP`, `EUR`.
 * @param decimalCount - Number of decimal places. Default 2.
 * @param options - Additional, optional `Intl.NumberFormatOptions`.
 */
export const formatNumberAccounting = (
  value: number | string,
  currency: string,
  decimalCount: number = DEFAULT_DECIMAL_PLACES,
  options?: Intl.NumberFormatOptions,
) => {
  return formatNumberBase(value, {
    minimumFractionDigits: decimalCount,
    maximumFractionDigits: decimalCount,
    ...options,
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    currencySign: "accounting",
  });
};
