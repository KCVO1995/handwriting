function LazyMan() {
  const taskQueue = []
  const next = () => {
    const fn = taskQueue.shift()
    fn?.()
  }
  taskQueue.push(() => {
    console.log('你好我是 Hank')
    next()
  })
  const api = {
    sleep(during) {
      taskQueue.push(
        () => {
          setTimeout(() => {
            console.log(`我睡醒了, 刚睡了 ${during} s`)
            next()
          }, during * 1000)
        }
      )
      return this
    },
    eat(something) {
      taskQueue.push(
        () => {
          console.log(something === 'lunch' ? '吃午餐' : '吃晚餐')
          next()
        }
      )
      return this
    },
    sleepFirst(during) {
      taskQueue.unshift(
        () => {
          setTimeout(() => {
            console.log(`我睡醒了, 刚睡了 ${during} s`)
            next()
          }, during * 1000)
        }
      )
      return this
    }
  }
  setTimeout(next)
  return api
}

