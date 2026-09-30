import { describe, expect, it } from 'bun:test'

import {
  hasKey,
  isArrayOf,
  isDefined,
  isEmpty,
  isFiniteNumber,
  isFunction,
  isInteger,
  isIterable,
  isNil,
  isNumber,
  isNumericString,
  isObject,
  isObjectLike,
  isPlainObject,
  isPrimitive,
  isPromiseLike,
  isString,
  isValidDate,
} from './index'

class Foo {}

describe('primitives', () => {
  it('isString only matches strings', () => {
    expect(isString('')).toBe(true)
    expect(isString(1)).toBe(false)
    expect(isString(null)).toBe(false)
  })

  it('isFunction matches functions and classes', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(Foo)).toBe(true)
    expect(isFunction({})).toBe(false)
  })

  it('isPrimitive counts null but not objects or functions', () => {
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(undefined)).toBe(true)
    expect(isPrimitive(1n)).toBe(true)
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive(() => {})).toBe(false)
  })
})

describe('numbers', () => {
  it('isNumber includes NaN, isFiniteNumber does not', () => {
    expect(isNumber(Number.NaN)).toBe(true)
    expect(isFiniteNumber(Number.NaN)).toBe(false)
    expect(isFiniteNumber(Number.POSITIVE_INFINITY)).toBe(false)
    expect(isFiniteNumber(0)).toBe(true)
    expect(isFiniteNumber('1')).toBe(false)
  })

  it('isInteger', () => {
    expect(isInteger(4)).toBe(true)
    expect(isInteger(4.5)).toBe(false)
    expect(isInteger('4')).toBe(false)
  })

  it('isNumericString', () => {
    expect(isNumericString('42')).toBe(true)
    expect(isNumericString('4.2e3')).toBe(true)
    expect(isNumericString(' 7 ')).toBe(true)
    expect(isNumericString('')).toBe(false)
    expect(isNumericString('   ')).toBe(false)
    expect(isNumericString('12px')).toBe(false)
    expect(isNumericString('Infinity')).toBe(false)
    expect(isNumericString(42)).toBe(false)
  })
})

describe('nullish', () => {
  it('isNil only matches null and undefined', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil(0)).toBe(false)
    expect(isNil('')).toBe(false)
    expect(isNil(false)).toBe(false)
  })

  it('isDefined works as a filter callback', () => {
    const ids: number[] = [1, null, 2, undefined, 3].filter(isDefined)
    expect(ids).toEqual([1, 2, 3])
  })
})

describe('objects', () => {
  const cases: [string, unknown, boolean, boolean, boolean][] = [
    // name, value, isObjectLike, isObject, isPlainObject
    ['object literal', { a: 1 }, true, true, true],
    ['null-prototype object', Object.create(null), true, true, true],
    ['array', [], true, false, false],
    ['date', new Date(), true, true, false],
    ['map', new Map(), true, true, false],
    ['class instance', new Foo(), true, true, false],
    ['null', null, false, false, false],
    ['string', 'a', false, false, false],
  ]

  for (const [name, value, objectLike, object, plain] of cases) {
    it(name, () => {
      expect(isObjectLike(value)).toBe(objectLike)
      expect(isObject(value)).toBe(object)
      expect(isPlainObject(value)).toBe(plain)
    })
  }

  it('hasKey ignores inherited keys', () => {
    expect(hasKey({ id: 1 }, 'id')).toBe(true)
    expect(hasKey({ id: 1 }, 'toString')).toBe(false)
    expect(hasKey(null, 'id')).toBe(false)
  })
})

describe('collections and built-ins', () => {
  it('isArrayOf checks every item', () => {
    expect(isArrayOf(['a', 'b'], isString)).toBe(true)
    expect(isArrayOf(['a', 1], isString)).toBe(false)
    expect(isArrayOf([], isString)).toBe(true)
    expect(isArrayOf('ab', isString)).toBe(false)
  })

  it('isValidDate rejects invalid dates', () => {
    expect(isValidDate(new Date())).toBe(true)
    expect(isValidDate(new Date('nonsense'))).toBe(false)
    expect(isValidDate('2026-01-01')).toBe(false)
  })

  it('isPromiseLike matches promises and thenables', () => {
    expect(isPromiseLike(Promise.resolve())).toBe(true)
    // biome-ignore lint/suspicious/noThenProperty: a thenable is what this tests
    expect(isPromiseLike({ then: () => {} })).toBe(true)
    // biome-ignore lint/suspicious/noThenProperty: a thenable is what this tests
    expect(isPromiseLike({ then: 1 })).toBe(false)
    expect(isPromiseLike(null)).toBe(false)
  })

  it('isIterable', () => {
    expect(isIterable([])).toBe(true)
    expect(isIterable('abc')).toBe(true)
    expect(isIterable(new Set())).toBe(true)
    expect(isIterable({})).toBe(false)
    expect(isIterable(null)).toBe(false)
  })
})

describe('isEmpty', () => {
  it('is true for empty values', () => {
    for (const value of [null, undefined, '', [], {}, new Map(), new Set()]) {
      expect(isEmpty(value)).toBe(true)
    }
  })

  it('is false for everything else', () => {
    for (const value of [0, false, ' ', [0], { a: 1 }, new Map([[1, 1]]), new Date()]) {
      expect(isEmpty(value)).toBe(false)
    }
  })
})
