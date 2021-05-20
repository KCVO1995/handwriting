import * as chai from 'chai'
import _bind from '../src/bind.js'

const assert = chai.assert
const equal = assert.equal

Function.prototype._bind = _bind
describe('bind', () => {
  it('_bind 方法存在', () => {
    const fn = function () {}
    equal(fn._bind, _bind)
  })
  it('fn.bind(asThis)', () => {
    function fn() {
      return this.a
    }

    const obj = {a: 1}
    const newFn = fn._bind(obj)
    equal(newFn(), obj.a)
  })
  it('fn.bind(asThis, params, params)', () => {
    function fn2(p1, p2) { return [this, p1, p2] }

    const newFn2 = fn2._bind({a: 1}, 123, 456)
    assert(newFn2()[0].a === 1)
    assert(newFn2()[1] === 123)
    assert(newFn2()[2] === 456)
  })
  it('fn.bind(asThis, params)(p) 成功', () => {
    function fn2(p1, p2) { return [this, p1, p2] }

    const newFn3 = fn2._bind({a: 1}, 123)
    assert(newFn3(456)[0].a === 1)
    assert(newFn3(456)[1] === 123)
    assert(newFn3(456)[2] === 456)
  })
  it('new 的时候绑定了 p1, p2', () => {
    function Fn(p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }

    const fn = Fn._bind(undefined, 'x', 'y')
    const obj = new fn()
    assert(obj.p1 === 'x')
    assert(obj.p2 === 'y')
  })
  it('new 的时候绑定了 p1, p2，并且 fn 有 prototype.name', () => {
    function Fn(p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }

    Fn.prototype.name = 'Jacky'
    const fn = Fn._bind(undefined, 'x', 'y')
    const obj = new fn()
    assert(obj.p1 === 'x')
    assert(obj.p2 === 'y')
    assert(obj.name === 'Jacky')
    assert(obj.constructor === Fn)
  })
})