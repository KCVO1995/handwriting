const a = "9007199254740991";
const b = "1234567899999999999";

const add = (a, b) => {
  const maxLength = Math.max(a.length, b.length)
  let _a = a.padStart(maxLength, '0'); // 补长度 0009007199254740991
  let _b = b.padStart(maxLength, '0'); // 1234567899999999999
  let result = ''
  let carryBit = 0
  for (let i = 1; i <= maxLength; i++) { // 相加
    const sum = parseInt(_a[maxLength - i]) + parseInt(_b[maxLength - i]) + carryBit
    carryBit = Math.floor(sum/10)
    result = sum % 10 + result
  }
  if (carryBit === 1)  result = '1' + result // 最后的进位
  console.log(result, 'result')
  return result
}

add(a, b)