export interface MaskStringOptions {
  /** Number of characters to keep visible at the start. Default 0. */
  visibleStart?: number;
  /** Number of characters to keep visible at the end. Default 4. */
  visibleEnd?: number;
  /** Character used to mask the hidden portion. Default `"•"`. */
  maskChar?: string;
}

/**
 * Masks the middle of a string while keeping a configurable number of
 * characters visible at each end. Useful for partially redacting secrets
 * (tokens, card numbers, emails).
 * @example maskString("4242424242424242", { visibleEnd: 4 }) // "••••••••••••4242"
 */
export function maskString(
  str: string,
  options: MaskStringOptions = {},
): string {
  const { visibleStart = 0, visibleEnd = 4, maskChar = "•" } = options;
  if (!str) return "";

  const total = str.length;
  if (visibleStart + visibleEnd >= total) return str;

  const start = str.slice(0, visibleStart);
  const end = visibleEnd === 0 ? "" : str.slice(-visibleEnd);
  const masked = maskChar.repeat(total - visibleStart - visibleEnd);
  return `${start}${masked}${end}`;
}
