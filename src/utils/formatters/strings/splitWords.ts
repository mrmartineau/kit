/**
 * Splits a string into lowercase-friendly word tokens. Handles camelCase,
 * PascalCase, ACRONYMTransitions, snake_case, kebab-case, and whitespace.
 */
export function splitWords(str: string): string[] {
  if (!str) return [];
  return str
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[\s_\-]+/)
    .filter(Boolean);
}
