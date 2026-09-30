/**
 * `true` for any number, including `NaN` and `Infinity`. Use `isFiniteNumber`
 * for a number you can do maths with.
 * @example isNumber(Number.NaN) // true
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

/**
 * `true` for a real, usable number: not `NaN`, not `Infinity`.
 * @example isFiniteNumber(Number.NaN) // false
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/** @example isInteger(4) // true */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value)
}

/**
 * `true` for a string that holds a finite number, like a form field or URL
 * parameter. Empty and whitespace-only strings are `false`.
 * @example isNumericString('4.2e3') // true
 * @example isNumericString('12px') // false
 */
export function isNumericString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))
}
