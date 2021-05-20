class DeepClone {
  cache = []

  findInCache(source) {
    let result
    this.cache.forEach(item => {
      if (item[0] === source)  result = item[1]
    })
    return result
  }

  clone(source) {
    if (source instanceof Object) { // 复杂类型
      const cache = this.findInCache(source)
      if (cache) return cache
      let result
      if (source instanceof Array) {
        result = []
      } else if (source instanceof Function) {
        result = function () { return source.apply(this, arguments) }
      } else if (source instanceof Date) {
        result = new Date(source)
      } else if (source instanceof RegExp) {
        result = new RegExp(source.source, source.flags)
      } else {
        result = {}
      }

      this.cache.push([source, result])
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          result[key] = this.clone(source[key])
        }
      }
      return result
    } else { // 简单类型
      return source
    }
  }
}

export default DeepClone