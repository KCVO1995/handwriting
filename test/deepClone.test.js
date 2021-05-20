// can clone basic types
// can clone object
// can clone array
// can clone function
// can clone cycle object
// will not stack over flow
// can clone date
// can clone regexp
// will not clone origin attribute
import * as chai from 'chai'
import DeepClone from '../src/deepClone.js'

const assert = chai.assert
const equal = chai.assert.equal
const notEqual = chai.assert.notEqual
const deepEqual = chai.assert.deepEqual
describe('deep clone', () => {
  it('can clone basic types', () => {
    const deepClone = new DeepClone().clone
    const number = 1
    equal(number, deepClone(number))
    const string = '1'
    equal(string, deepClone(string))
    const boolean = true
    equal(boolean, deepClone(boolean))
    const symbol = Symbol('xxx')
    equal(symbol, deepClone(symbol))
  })
  describe('object', () => {
    it('can clone object', () => {
      const obj = {a: 1, b: {c: 1}}
      const objClone = new DeepClone().clone(obj)
      notEqual(obj, objClone)
      equal(obj.a, objClone.a)
      notEqual(obj.b, objClone.b)
      equal(obj.b.c, objClone.b.c)
      deepEqual(obj, objClone)
    })
    it('can clone array', () => {
      const array = [1, [1, 2]]
      const arrayClone = new DeepClone().clone(array)
      notEqual(array, arrayClone)
      equal(array.length, arrayClone.length)
      equal(array[0], arrayClone[0])
      notEqual(array[1], arrayClone[1])
      equal(array[1][0], arrayClone[1][0])
      deepEqual(array, arrayClone)
    })
    it('can clone function', () => {
      const fn = function (x, y) {
        return x + y
      }
      fn.a = 1
      fn.b = {c: 1}
      const fnClone = new DeepClone().clone(fn)
      notEqual(fn, fnClone)
      equal(fn.a, fnClone.a)
      notEqual(fn.b, fnClone.b)
      equal(fn.b.c, fnClone.b.c)
      equal(fn(1, 1), fnClone(1, 1))
    })
    it('can clone cycle object', () => {
      const cycleObj = { a: 1, b: {c: 1} }
      cycleObj.cycle = cycleObj
      const cycleObjClone = new DeepClone().clone(cycleObj)
      notEqual(cycleObj, cycleObjClone)
      equal(cycleObj.a, cycleObjClone.a)
      notEqual(cycleObj.b, cycleObjClone.b)
      equal(cycleObj.b.c, cycleObjClone.b.c)
      notEqual(cycleObj.cycle, cycleObjClone.cycle)
    })
    it('can clone date', () => {
      const date = new Date('2011-01-01')
      date.a = 1
      date.b = {c: 1}
      const dateClone = new DeepClone().clone(date)
      notEqual(date, dateClone)
      equal(date.a, dateClone.a)
      notEqual(date.b, dateClone.b)
      equal(date.b.c, dateClone.b.c)
      equal(date.getTime(), dateClone.getTime())
    })
    it('can clone regexp', () => {
      const regexp = RegExp('h1\\d+', 'gi')
      regexp.a = 1
      regexp.b = {c: 1}
      const regexpClone = new DeepClone().clone(regexp)
      notEqual(regexp, regexpClone)
      equal(regexp.source, regexp.source)
      equal(regexp.flags, regexp.flags)
      equal(regexp.a, regexpClone.a)
      notEqual(regexp.b, regexpClone.b)
      equal(regexp.b.c, regexpClone.b.c)
    })
    it('will not clone origin attribute', () => {
      const obj = Object.create({d: 1})
      obj.a = 1
      obj.b = {c: 1}
      const objClone = new DeepClone().clone(obj)
      notEqual(obj, objClone)
      equal(obj.a, objClone.a)
      notEqual(obj.b, objClone.b)
      equal(obj.b.c, objClone.b.c)
      assert.isFalse('d' in objClone)
      assert.isTrue('d' in obj)
    })
  })
})