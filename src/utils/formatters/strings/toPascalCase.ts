import { splitWords } from "./splitWords.js";

/**
 * Converts a string to `PascalCase`.
 * @example toPascalCase("hello_world") // "HelloWorld"
 */
export function toPascalCase(str: string): string {
  return splitWords(str)
    .map((word) => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}
