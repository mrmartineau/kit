/** A value that isn't an object or a function. */
export type Primitive = string | number | bigint | boolean | symbol | null | undefined

/**
 * `true` for strings. Doesn't match `new String()` wrapper objects.
 * @example isString('a') // true
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/** @example isBoolean(false) // true */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/** @example isBigInt(10n) // true */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

/** @example isSymbol(Symbol('id')) // true */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

/**
 * `true` for functions, including classes and async functions.
 * @example isFunction(() => {}) // true
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function'
}

/**
 * `true` for anything that isn't an object or a function, including `null`.
 * @example isPrimitive(null) // true
 */
export function isPrimitive(value: unknown): value is Primitive {
  return value === null || (typeof value !== 'object' && typeof value !== 'function')
}
