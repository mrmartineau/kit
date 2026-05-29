import { stripDiacritics } from "./stripDiacritics.js";

/**
 * Converts a string to a URL-friendly slug.
 * @example slugify("Hello, World!") // "hello-world"
 */
export function slugify(str: string): string {
  return stripDiacritics(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
