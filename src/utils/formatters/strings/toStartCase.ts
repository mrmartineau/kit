/**
 * Converts a string to Start Case format
 * Similar to the functionality in the 'to-start-case' package
 *
 * @param str The input string to convert
 * @returns The converted string in Start Case format
 * @example
 * toStartCase('hello_world') // 'Hello World'
 * toStartCase('helloWorld') // 'Hello World'
 * toStartCase('hello-world') // 'Hello-world'
 *
 * FYI hyphens will be kept so this will not convert kebab-case to Start Case
 */
export function toStartCase(str: string): string {
  if (!str) return "";

  return str
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, (_str, $1, $2) => $1 + " " + $2)
    .replace(/(\s|^)(\w)/g, (_str, $1, $2) => $1 + $2.toUpperCase());
}
