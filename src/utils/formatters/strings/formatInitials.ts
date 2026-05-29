/**
 * Returns the initials for a name.
 * @param name - The full name string.
 * @param maxLength - Maximum number of initials to return. Default 2.
 * @example formatInitials("John Smith") // "JS"
 * @example formatInitials("Mary Jane Watson", 3) // "MJW"
 */
export function formatInitials(name: string, maxLength: number = 2): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase())
    .filter(Boolean)
    .slice(0, maxLength)
    .join("");
}
