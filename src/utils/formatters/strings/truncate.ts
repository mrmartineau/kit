export interface TruncateOptions {
  /** The ellipsis suffix appended when truncation occurs. Default `"…"`. */
  ellipsis?: string;
  /** If `true`, truncates on the last word boundary inside the limit. */
  wordBoundary?: boolean;
}

/**
 * Truncates a string to a maximum length, appending an ellipsis when shortened.
 * The returned string (including ellipsis) will not exceed `maxLength`.
 * @example truncate("Hello world", 8) // "Hello w…"
 */
export function truncate(
  str: string,
  maxLength: number,
  options: TruncateOptions = {},
): string {
  const { ellipsis = "…", wordBoundary = false } = options;
  if (!str || str.length <= maxLength) return str;
  if (maxLength <= ellipsis.length) return ellipsis.slice(0, maxLength);

  const sliceLength = maxLength - ellipsis.length;
  let truncated = str.slice(0, sliceLength);
  if (wordBoundary) {
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) truncated = truncated.slice(0, lastSpace);
  }
  return truncated + ellipsis;
}
