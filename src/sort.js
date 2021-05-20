// 时间复杂度 O(n2)
// 选择排序
const selectSort = array => {
  if (array.length < 2) return array[0] < array[1] ? array : array.reverse()
  const min = minOf(array)
  const minIndex = array.indexOf(min)
  array.splice(minIndex, 1)
  return [min, ...selectSort(array)]
}
const minOf = array => {
  if (array.length > 2) {
    return minOf([array[0], minOf(array.slice(1))])
  } else {
    return array[0] < array[1] ? array[0] : array[1]
  }
}

console.log(selectSort([1, 3, 2, 2, 6, 5]))


// 快速排序 O(n * log2n)
const quickSort = array => {
  if (array.length <= 1) return array
  const pivotIndex = Math.floor(array.length / 2)
  const pivot = array.splice(pivotIndex, 1)[0]
  const left = []
  const right = []
  for (let i = 0; i < array.length; i++) {
    array[i] < pivot ? left.push(array[i]) : right.push(array[i])
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}
console.log(quickSort([1, 3, 2, 2, 6, 5]))

// 归并排序 O(n * log2n)
const mergeSort = array => {
  if (array.length <= 1) return array
  const middleIndex = Math.floor(array.length / 2)
  const left = array.slice(0, middleIndex)
  const right = array.slice(middleIndex)
  return merge(mergeSort(left), mergeSort(right))
}

const merge = (left, right) => {
  const result = []
  while (left.length > 0 && right.length > 0) {
    left[0] < right[0] ? result.push(left.shift()) : result.push(right.shift())
  }
  while (left.length > 0) {
    result.push(left.shift())
  }
  while (right.length > 0) {
    result.push(right.shift())
  }
  return result
}
console.log(mergeSort([1, 3, 2, 2, 6, 5]))
