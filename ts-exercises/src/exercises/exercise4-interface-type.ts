/**
 * 练习 4: Interface 和 Type
 *
 * 目标：掌握对象类型的定义和使用
 *
 * 知识点：
 * - interface 定义对象类型
 * - 可选属性 ?
 * - interface 继承 extends
 * - type 定义对象类型
 * - type 交叉类型 &
 */

// ==================== 第一部分：interface 基础 ====================

// TODO(human): 定义一个 User 接口
// 要求：
// - id: number (必填)
// - name: string (必填)
// - email: string (必填)
// - age?: number (可选)

interface User {
  // TODO(human): 补充以下属性
  id: number
  name: string
  email: string
  age?: number
}

// TODO(human): 创建一个符合 User 接口的对象
const user1: User = {
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com'
  // age 是可选的，可以不写
}

// ==================== 第二部分：interface 继承 ====================

// TODO(human): 定义一个 Admin 接口，继承自 User
// 要求：新增 role: string 属性

interface Admin extends User {
  // TODO(human): 使用 extends User 继承并添加 role 属性
  role: string
}

// TODO(human): 创建一个 Admin 对象
const admin1: Admin = {
  id: 2,
  name: '李四',
  email: 'lisi@example.com',
  role: 'superadmin'
}

// ==================== 第三部分：type 定义对象 ====================

// TODO(human): 使用 type 定义一个 Product 类型
// 要求：
// - id: number
// - name: string
// - price: number
// - description?: string (可选)

type Product = {
  // 在这里定义...
}

// ==================== 第四部分：type 交叉类型 ====================

// 基础商品信息
type BaseProduct = {
  id: number
  name: string
}

// 价格信息
type PriceInfo = {
  price: number
  discount?: number
}

// TODO(human): 使用交叉类型 & 组合上面两个类型
// 提示：type FullProduct = BaseProduct & PriceInfo

type FullProduct = {
  // 改用交叉类型实现
}

// ==================== 第五部分：实战练习 ====================

// TODO(human): 定义 API 响应数据类型
// 场景：后端返回的统一数据格式
// 要求：
// - code: number (状态码，如 200, 400, 500)
// - message: string (提示信息)
// - data: unknown (实际数据，类型不确定)
// - timestamp?: number (可选的时间戳)

type ApiResponse = {
  // 在这里定义...
}

// TODO(human): 使用字面量类型优化 code
// 要求：code 只能是 200 | 400 | 401 | 403 | 500

type StatusCode = 200 | 400 | 401 | 403 | 500

type StrictApiResponse = {
  code: StatusCode
  message: string
  data: unknown
}

// ==================== 验证函数（不需要修改）====================

export function validateExercise4() {
  const results: string[] = []

  if (user1.id && user1.name && user1.email) {
    results.push('✅ user1 对象结构正确')
  }
  if (admin1.role) {
    results.push('✅ admin1 包含 role 属性')
  }

  return results
}

export { user1, admin1 }
export type { User, Admin, Product, FullProduct, ApiResponse, StrictApiResponse }
