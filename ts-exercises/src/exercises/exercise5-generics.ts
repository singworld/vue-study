/**
 * 练习 5: 泛型
 *
 * 目标：掌握泛型的使用，让类型更加灵活可复用
 *
 * 知识点：
 * - 泛型接口
 * - 泛型类型别名
 * - 泛型函数
 * - 泛型约束
 */

// ==================== 第一部分：理解泛型的意义 ====================

// 问题：下面两个接口结构相同，只是 data 类型不同
// 这样写会导致大量重复代码

interface UserResponse {
  code: number
  message: string
  data: { id: number; name: string }
}

interface ProductResponse {
  code: number
  message: string
  data: { id: number; title: string; price: number }
}

// TODO(human): 使用泛型重构上面的接口
// 提示：interface Response<T> { ... data: T ... }

interface Response<T> {
  code: number
  message: string
  data: T
}

// 使用泛型接口（取消注释验证）
type UserData = { id: number; name: string }
type ProductData = { id: number; title: string; price: number }
const userRes: Response<UserData> = { code: 200, message: 'ok', data: { id: 1, name: '张三' } }
const productRes: Response<ProductData> = { code: 200, message: 'ok', data: { id: 1, title: '手机', price: 999 } }

// ==================== 第二部分：泛型类型别名 ====================

// TODO(human): 使用 type 定义泛型类型
// 定义一个 Result 类型，表示操作结果
// - success: boolean
// - data: T (泛型参数)
// - error?: string

type Result<T> = {
  // 在这里定义...
  success: boolean
  data: T | null
  error?: string
}

// ==================== 第三部分：泛型函数 ====================

// TODO(human): 实现一个泛型函数 createArray
// 功能：创建一个指定长度的数组，每项填充相同的值
// 参数：length (数量), value (填充值，类型为 T)
// 返回：T[]
//
// 示例：
// createArray(3, 'x') => ['x', 'x', 'x']
// createArray(2, 0) => [0, 0]

function createArray<T>(length: number, value: T): T[] {
  // TODO(human): 实现函数逻辑
  return Array(length).fill(value)
}

// TODO(human): 实现一个泛型函数 getFirst
// 功能：获取数组的第一个元素
// 参数：arr (数组，类型为 T[])
// 返回：T | undefined

function getFirst<T>(arr: T[]): T | undefined {
  // TODO(human): 实现函数逻辑
  return arr[0]
}

// ==================== 第四部分：泛型约束 ====================

// 问题：我们想访问泛型参数的 length 属性，但 TS 报错
// function getLength<T>(arg: T): number {
//   return arg.length  // 错误：T 上不存在 length
// }

// TODO(human): 使用泛型约束解决这个问题
// 提示：<T extends { length: number }>

interface HasLength {
  length: number
}

function getLength<T extends HasLength>(arg: T): number {
  // 现在可以安全访问 length 了
  return arg.length
}

// 测试：以下调用都应该正常工作
// getLength('hello')     // 字符串有 length
// getLength([1, 2, 3])   // 数组有 length
// getLength({ length: 10 }) // 对象有 length 属性

// ==================== 第五部分：实战练习 ====================

// TODO(human): 实现一个泛型的 API 请求封装
// 要求：
// 1. 定义 ApiResult<T> 类型，包含 success, data, error
// 2. 实现 fetchData<T> 函数，模拟 API 请求

type ApiResult<T> = {
  success: boolean
  data: T | null
  error: string | null
}

// 模拟异步获取数据
async function fetchData<T>(url: string, mockData: T): Promise<ApiResult<T>> {
  // TODO(human): 实现模拟的 API 请求
  // 提示：使用 setTimeout 模拟延迟，然后返回 mockData

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: mockData,
        error: null
      })
    }, 100)
  })
}

// 使用示例：
// const result = await fetchData<{ id: number; name: string }>('/api/user', { id: 1, name: '张三' })

// ==================== 验证函数（不需要修改）====================

export function validateExercise5() {
  const results: string[] = []

  const arr = createArray(3, 'test')
  if (arr.length === 3 && arr.every(item => item === 'test')) {
    results.push('✅ createArray 函数正确')
  }

  const first = getFirst<number>([1, 2, 3])
  if (first === 1) {
    results.push('✅ getFirst 函数正确')
  }

  if (getLength<string>('hello') === 5) {
    results.push('✅ getLength 函数正确')
  }

  return results
}

export { createArray, getFirst, getLength, fetchData }
export type { Response, Result, ApiResult }
