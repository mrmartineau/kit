import { isPlainObject } from './objects.js'

/**
 * `true` for `null`, `undefined`, `''`, `[]`, `{}` and empty `Map`s and `Set`s.
 * Everything else is `false`, including `0`, `false` and `' '`.
 * @example isEmpty({}) // true
 * @example isEmpty(0) // false
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0
  if (value instanceof Map || value instanceof Set) return value.size === 0
  if (isPlainObject(value)) return Object.keys(value).length === 0
  return false
}
