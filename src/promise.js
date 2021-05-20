// 基础版 promise
class MyPromise {
  callbacks = []
  status = 'pending'
  constructor(fn) {
    if (typeof fn !== 'function') throw new TypeError('你不是函数')
    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve(value) {
    if (this.status !== 'pending') return
    this.status = 'fulfilled'
    setTimeout(() => {
      this.callbacks.forEach(callback => {
        callback[0] && callback[0].call(undefined, value)
      })
    },0)
  }
  reject(reason) {
    if (this.status !== 'pending') return
    this.status = 'rejected'
    setTimeout(() => {
      this.callbacks.forEach(callback => {
        callback[1] && callback[1].call(undefined, reason)
      })
    },0)
  }
  then(success, fail) {
    const handle = []
    if (success && typeof success === 'function') {
      handle[0] = success
    }
    if (fail && typeof fail === 'function') {
      handle[1] = fail
    }
    this.callbacks.push(handle)
  }

}

export default MyPromise