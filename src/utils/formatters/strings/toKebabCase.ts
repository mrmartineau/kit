import { splitWords } from "./splitWords.js";

/**
 * Converts a string to `kebab-case`.
 * @example toKebabCase("helloWorld") // "hello-world"
 */
export function toKebabCase(str: string): string {
  return splitWords(str)
    .map((word) => word.toLowerCase())
    .join("-");
}
