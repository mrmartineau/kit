import { DEFAULT_DECIMAL_PLACES } from "../constants.js";
import { formatNumberDecimal } from "./formatNumberDecimal.js";

const DECIMAL_UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB"] as const;
const BINARY_UNITS = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"] as const;

/**
 * Formats a byte count as a human-readable string (e.g. `1500` → `1.5 KB`).
 * @param bytes - The byte count.
 * @param binary - If `true`, use 1024-based units (KiB, MiB, …). Default `false`.
 * @param decimalCount - Maximum decimal places. Default 2.
 */
export const formatNumberBytes = (
  bytes: number,
  binary: boolean = false,
  decimalCount: number = DEFAULT_DECIMAL_PLACES,
) => {
  if (!Number.isFinite(bytes)) {
    throw new Error("formatNumberBytes: Invalid byte count");
  }
  if (bytes === 0) return "0 B";

  const base = binary ? 1024 : 1000;
  const units = binary ? BINARY_UNITS : DECIMAL_UNITS;
  const rawExponent = Math.floor(Math.log(Math.abs(bytes)) / Math.log(base));
  const exponent = Math.min(Math.max(rawExponent, 0), units.length - 1);
  const value = bytes / Math.pow(base, exponent);
  return `${formatNumberDecimal(value, decimalCount)} ${units[exponent]}`;
};
