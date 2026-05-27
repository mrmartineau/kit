/**
 * Removes diacritical marks from a string.
 * @example stripDiacritics("café") // "cafe"
 */
export function stripDiacritics(str: string): string {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
