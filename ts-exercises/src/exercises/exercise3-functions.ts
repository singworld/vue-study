/**
 * 练习 3: 函数类型
 *
 * 目标：掌握函数参数和返回值的类型注解
 *
 * 知识点：
 * - 参数类型注解
 * - 返回值类型注解
 * - 可选参数 ?
 * - void 类型
 * - 函数表达式类型
 */

// ==================== 第一部分：基础函数类型 ====================

// TODO(human): 为函数添加参数和返回值类型
// 提示：(参数: 类型): 返回类型

function add(a, b) {
  return a + b
}

function greet(name) {
  return `Hello, ${name}!`
}

function isEven(num) {
  return num % 2 === 0
}

// ==================== 第二部分：可选参数 ====================

// TODO(human): 实现一个带可选参数的函数
// 要求：fullName(firstName, lastName?) - lastName 可选
// 如果有 lastName，返回 "firstName lastName"
// 如果没有，只返回 firstName

function fullName(firstName, lastName?) {
  // 在这里实现...
  return lastName ? `${firstName} ${lastName}` : firstName
}

// ==================== 第三部分：void 返回类型 ====================

// TODO(human): 为没有返回值的函数添加 void 类型
// 提示：function xxx(): void

function logMessage(message) {
  console.log(`[LOG] ${message}`)
}

function printUser(name, age) {
  console.log(`用户: ${name}, 年龄: ${age}`)
}

// ==================== 第四部分：函数表达式类型 ====================

// TODO(human): 为函数表达式添加类型注解
// 方式1：参数和返回值分开注解

const multiply = (a, b) => {
  return a * b
}

// TODO(human): 使用整体类型注解
// 方式2：(参数类型) => 返回类型
// 提示：const divide: (a: number, b: number) => number = ...

const divide = (a, b) => {
  return a / b
}

// ==================== 第五部分：实战练习 ====================

// TODO(human): 实现一个数组转字符串的函数
// 要求：
// - arr: 可以是 number[] 或 string[]
// - separator: 可选的分隔符，默认为 ','
// - 返回拼接后的字符串
//
// 示例：
// arr2Str([1, 2, 3]) => '1,2,3'
// arr2Str(['a', 'b'], '-') => 'a-b'

function arr2Str(arr, separator) {
  // 在这里实现...
  return arr.join(separator ?? ',')
}

// ==================== 验证函数（不需要修改）====================

export function validateExercise3() {
  const results: string[] = []

  if (add(1, 2) === 3) results.push('✅ add 函数正确')
  if (greet('TS') === 'Hello, TS!') results.push('✅ greet 函数正确')
  if (isEven(4) === true) results.push('✅ isEven 函数正确')
  if (fullName('张', '三') === '张 三') results.push('✅ fullName 完整姓名正确')
  if (fullName('张') === '张') results.push('✅ fullName 单名正确')
  if (multiply(3, 4) === 12) results.push('✅ multiply 函数正确')
  if (arr2Str([1, 2, 3], '-') === '1-2-3') results.push('✅ arr2Str 函数正确')

  return results
}

export { add, greet, isEven, fullName, logMessage, multiply, divide, arr2Str }
