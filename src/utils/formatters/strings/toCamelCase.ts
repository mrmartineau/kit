import { splitWords } from "./splitWords.js";

/**
 * Converts a string to `camelCase`.
 * @example toCamelCase("hello_world") // "helloWorld"
 */
export function toCamelCase(str: string): string {
  const words = splitWords(str);
  if (words.length === 0) return "";
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}
