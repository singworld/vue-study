/**
 * 练习 1: 基础类型注解
 *
 * 目标：掌握 TypeScript 基础类型的使用
 *
 * 知识点：
 * - 简单类型：number, string, boolean, null, undefined
 * - 类型推断
 * - 类型注解语法
 */

// ==================== 第一部分：简单类型 ====================

// TODO(human): 为下面的变量添加正确的类型注解
// 提示：使用 : 类型 的语法

let userName: string= '张三'           // 添加 string 类型
let userAge: number = 25               // 添加 number 类型
let isStudent: boolean = true           // 添加 boolean 类型
let score: number = 98.5               // 添加 number 类型

userName = '李四'

// ==================== 第二部分：特殊类型 ====================

// TODO(human): 声明一个可以为 null 的变量
// 提示：使用联合类型 string | null

let nickname: string | null = null            // 修改为可以是 string 或 null

// ==================== 第三部分：类型推断 ====================

// 下面的变量 TS 会自动推断类型，鼠标悬停查看
let PI = 3.14159             // TS 推断为字面量类型 3.14159
const greeting = 'Hello'       // TS 推断为字面量类型 'Hello'
let count = 0                  // TS 推断为 number

// ==================== 验证函数（不需要修改）====================

export function validateExercise1() {
  const results: string[] = []

  // 验证类型
  if (typeof userName === 'string') results.push('✅ userName 类型正确')
  if (typeof userAge === 'number') results.push('✅ userAge 类型正确')
  if (typeof isStudent === 'boolean') results.push('✅ isStudent 类型正确')
  if (typeof score === 'number') results.push('✅ score 类型正确')

  return results
}

// 导出变量供测试
export { userName, userAge, isStudent, score, nickname }
