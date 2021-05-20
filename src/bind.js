function _bind () {
  const slice = Array.prototype.slice
  const asThis = arguments[0]
  const args = slice.call(arguments, 1)
  const fn = this
  if(typeof fn !== 'function') {
    throw new TypeError('你不行')
  }
  function resultFn () {
    const arg2 = slice.call(arguments, 0)
    return fn.apply(resultFn.prototype.isPrototypeOf(this) ? this : asThis, args.concat(arg2))
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

export default _bind