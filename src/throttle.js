// cd
// 函数节流
// 使用在一些触发请求的按钮里面使用，比如加载数据

let cd = false
const fn = () => {console.log('执行 fn ...')}

const throttle = () => {
  if (cd) return
  cd = true
  fn()
  setTimeout(() => {
    cd = false
  }, 1000)
}

throttle()
throttle()
