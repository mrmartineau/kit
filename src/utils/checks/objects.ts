/**
 * `true` for anything `typeof` calls `'object'`, except `null`: arrays,
 * dates, maps, class instances and plain objects.
 * @example isObjectLike([]) // true
 */
export function isObjectLike(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}

/**
 * `true` for a non-null object that isn't an array. Dates, maps and class
 * instances pass; use `isPlainObject` to rule them out.
 * @example isObject({ a: 1 }) // true
 * @example isObject([]) // false
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return isObjectLike(value) && !Array.isArray(value)
}

/**
 * `true` only for `{}` literals and `Object.create(null)`: no arrays, dates,
 * maps or class instances. Use it before going through an object's keys.
 * @example isPlainObject(new Date()) // false
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!isObjectLike(value)) return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/**
 * `true` if the value is an object with this key as its own property.
 * Inherited keys like `toString` don't count.
 * @example hasKey({ id: 1 }, 'id') // true
 */
export function hasKey<K extends PropertyKey>(value: unknown, key: K): value is Record<K, unknown> {
  return isObjectLike(value) && Object.hasOwn(value, key)
}
