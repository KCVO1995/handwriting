// 函数防抖
// 适合在频繁出发的事件上使用，比如 input 事件，scroll 事件
const fn = () => {console.log('执行 fn ...')}
let timeId = null

const debounce = () => {
  if(timeId) clearTimeout(timeId)
  timeId = setTimeout(() => fn(), 1000)
}

debounce()
debounce()
debounce()
