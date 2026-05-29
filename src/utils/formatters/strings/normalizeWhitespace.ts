/**
 * Collapses any run of whitespace (including newlines and tabs) into a single
 * space and trims the result.
 * @example normalizeWhitespace("  hello\n\tworld  ") // "hello world"
 */
export function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}
