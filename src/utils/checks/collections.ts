/** @example isArray([]) // true */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

/**
 * `true` for an array where every item passes `check`.
 * @example isArrayOf(['a', 'b'], isString) // true
 */
export function isArrayOf<T>(value: unknown, check: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(check)
}

/**
 * `true` for a `Date` that holds a real date. `new Date('nonsense')` is `false`.
 * @example isValidDate(new Date('nonsense')) // false
 */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

/** @example isRegExp(/a/) // true */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}

/** @example isMap(new Map()) // true */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return value instanceof Map
}

/** @example isSet(new Set()) // true */
export function isSet(value: unknown): value is Set<unknown> {
  return value instanceof Set
}

/** @example isError(new TypeError('x')) // true */
export function isError(value: unknown): value is Error {
  return value instanceof Error
}

/**
 * `true` for anything with a `.then` method: real promises and "thenables".
 * @example isPromiseLike(Promise.resolve()) // true
 */
export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { then?: unknown }).then === 'function'
  )
}

/**
 * `true` for anything `for...of` can loop over. Strings count.
 * @example isIterable(new Set()) // true
 */
export function isIterable(value: unknown): value is Iterable<unknown> {
  return (
    value != null &&
    typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === 'function'
  )
}
