import { splitWords } from "./splitWords.js";

/**
 * Converts a string to `snake_case`.
 * @example toSnakeCase("helloWorld") // "hello_world"
 */
export function toSnakeCase(str: string): string {
  return splitWords(str)
    .map((word) => word.toLowerCase())
    .join("_");
}
