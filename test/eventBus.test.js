// 可以创建实例
// 监听事件之后，可以触发
// 可以多次触发
// 可以取消监听

import EventBus from '../src/eventBus.js'
import * as chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

const assert = chai.assert
const expect = chai.expect
describe('event bus', () => {
  it('可以创建实例', () => {
    const eventBus = new EventBus()
    assert(typeof eventBus === 'object')
  })
  it('监听事件之后，可以触发', () => {
    const eventBus = new EventBus()
    const spy = sinon.spy()
    eventBus.on('iPhone12发布', spy)
    eventBus.emit('iPhone12发布')
    setTimeout(() => {
      expect(spy).to.have.been.called
    }, 200)
  })
  it('多次监听同一个时间，都可以触发', () => {
    const eventBus = new EventBus()
    const spy1 = sinon.spy()
    const spy2 = sinon.spy()
    eventBus.on('iPhone12发布', spy1)
    eventBus.on('iPhone12发布', spy2)
    eventBus.emit('iPhone12发布')
    setTimeout(() => {
      expect(spy1).to.have.been.called
      expect(spy2).to.have.been.called
    }, 200)
  })
  it('可以取消监听', () => {
    const eventBus = new EventBus()
    const spy = sinon.spy()
    eventBus.on('iPhone12发布', spy)
    eventBus.off('iPhone12发布', spy)
    eventBus.emit('iPhone12发布')
    setTimeout(() => {
      expect(spy).to.have.not.been.called
    }, 200)
  })
})
