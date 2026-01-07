/**
 * 练习 2: 数组类型与联合类型
 *
 * 目标：掌握数组类型注解和联合类型的使用
 *
 * 知识点：
 * - 数组类型：类型[] 或 Array<类型>
 * - 联合类型：类型1 | 类型2
 * - 类型别名：type 关键字
 */

// ==================== 第一部分：数组类型 ====================

// TODO(human): 为下面的数组添加类型注解
// 提示：使用 类型[] 的语法

const numbers: number[] = [1, 2, 3, 4, 5]           // 添加 number[] 类型
const names: string[] = ['Alice', 'Bob', 'Charlie'] // 添加 string[] 类型
const flags: boolean[] = [true, false, true]          // 添加 boolean[] 类型

// ==================== 第二部分：联合类型 ====================

// TODO(human): 声明一个可以存放 number 或 string 的数组
// 提示：使用 (number | string)[] 的语法

const mixedArray: (number | string)[] = [1, 'two', 3, 'four']   // 添加类型注解

// TODO(human): 声明一个 id 变量，可以是 number 或 string
// 场景：用户ID可能是数字也可能是UUID字符串

let userId: number | string = 12345                          // 添加 number | string 类型

// ==================== 第三部分：类型别名 ====================

// TODO(human): 使用 type 关键字定义一个类型别名
// 要求：定义 StringOrNumber 类型，表示 string 或 number

type StringOrNumber = string | number

// TODO(human): 使用定义好的类型别名
const value1: StringOrNumber = 'hello'
const value2: StringOrNumber = 100

// ==================== 第四部分：实战练习 ====================

// TODO(human): 定义一个状态类型，只能是 'loading' | 'success' | 'error'
// 提示：这是字面量类型与联合类型的结合

type Status = 'loading' | 'success' | 'error'
let currentStatus: Status = 'loading'

// ==================== 验证函数（不需要修改）====================

export function validateExercise2() {
  const results: string[] = []

  if (Array.isArray(numbers) && numbers.every(n => typeof n === 'number')) {
    results.push('✅ numbers 数组类型正确')
  }
  if (Array.isArray(names) && names.every(n => typeof n === 'string')) {
    results.push('✅ names 数组类型正确')
  }
  if (Array.isArray(mixedArray)) {
    results.push('✅ mixedArray 是数组')
  }

  return results
}

export { numbers, names, flags, mixedArray, userId }
