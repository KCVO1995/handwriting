const linkedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value:3,
      next: {
        value: 4,
        next: {
          value: 5,
          next: null
        }
      }
    }
  }
}

const reverseLinked = head => {
  let newHead = head
  let temp = null
  while (head && head.next) {
    temp = head.next
    head.next = temp.next
    temp.next = newHead
    newHead = temp
  }
  return newHead
}

console.log(reverseLinked(linkedList))
