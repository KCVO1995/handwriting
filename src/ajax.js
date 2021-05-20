const request = new XMLHttpRequest()

request.open('GET', 'https://baidu.com')
request.onreadystatechange = () => {
  if (request.readyState === 4) {
    console.log('请求完成')
    if (request.response.status >= 200 && request.response.status < 300) {
      console.log('请求成功')
    } else {
      console.log('请求失败')
    }
  }
}
request.send()