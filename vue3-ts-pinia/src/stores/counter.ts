/**
 * 练习 1: Pinia 基础 Store - Counter
 *
 * 目标：掌握 Pinia store 的定义和使用
 *
 * 知识点：
 * - defineStore 定义 store
 * - state: ref() 定义响应式状态
 * - getters: computed() 定义计算属性
 * - actions: 普通函数定义操作
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// defineStore 参数说明：
// 参数1: store 的唯一标识符（字符串），用于 devtools 调试
// 参数2: setup 函数，返回要暴露的状态和方法

export const useCounterStore = defineStore('counter', () => {
  // ==================== State ====================
  // 使用 ref() 定义响应式状态
  const count = ref(0)

  // TODO(human): 添加一个 name 状态
  // 类型为 string，初始值为 '计数器'
  const name = ref('计数器')

  // ==================== Getters ====================
  // 使用 computed() 定义计算属性（派生状态）

  const doubleCount = computed(() => count.value * 2)

  // TODO(human): 实现 countInfo getter
  // 返回格式：'[计数器]: count 的值是 0'
  const countInfo = computed(() => `[${name.value}]: count 的值是 ${count.value}`)

  // ==================== Actions ====================
  // 普通函数即可，可以是同步或异步

  function increment() {
    count.value++
  }

  // TODO(human): 实现 decrement 方法，让 count - 1
  function decrement() {
    count.value--
  }

  // TODO(human): 实现 incrementBy 方法
  // 接收参数 n: number，让 count + n
  function incrementBy(n: number) {
    count.value += n
  }

  // TODO(human): 实现 reset 方法，重置 count 为 0
  function reset() {
    count.value = 0
  }

  // 必须 return 出去才能在组件中使用
  return {
    // state
    count,
    name,
    // getters
    doubleCount,
    countInfo,
    // actions
    increment,
    decrement,
    incrementBy,
    reset
  }
})
