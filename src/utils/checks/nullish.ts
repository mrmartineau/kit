/** @example isNull(null) // true */
export function isNull(value: unknown): value is null {
  return value === null
}

/** @example isUndefined(undefined) // true */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

/**
 * `true` for `null` or `undefined`, and nothing else.
 * @example isNil(0) // false
 */
export function isNil(value: unknown): value is null | undefined {
  return value == null
}

/**
 * `true` for anything except `null` and `undefined`. Keeps the rest of the
 * type, so it works as a `filter` callback.
 * @example [1, null, 2].filter(isDefined) // number[]
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
  return value != null
}
