<script setup lang="ts">
/**
 * 练习 4: Vue3 + TS - Ref 类型标注和模板引用
 *
 * 知识点：
 * - ref<T>() 泛型标注类型
 * - 模板引用类型：ref<HTMLElement | null>
 * - 非空处理：可选链 ?. / 逻辑判断 / 非空断言 !
 */
import { ref, onMounted } from 'vue'

// ==================== 基础 Ref 类型 ====================

// 简单类型：自动推导
const count = ref(0) // 类型自动推导为 Ref<number>
const message = ref('hello') // 类型自动推导为 Ref<string>

// TODO(human): 复杂类型需要泛型指定
interface User {
  id: number
  name: string
  email?: string
}

// 使用泛型指定复杂类型
const user = ref<User | null>(null)

// TODO(human): 定义用户列表
const userList = ref<User[]>([])

// ==================== 模板引用类型 ====================

// TODO(human): 理解模板引用类型标注
// 模板引用初始值必须是 null，类型需要联合 null
const inputRef = ref<HTMLInputElement | null>(null)

// ==================== 生命周期中使用 ====================

onMounted(() => {
  // 方式1: 可选链 ?.
  // 如果 inputRef.value 为 null，不执行 focus()
  inputRef.value?.focus()

  // 方式2: 逻辑判断
  if (inputRef.value) {
    console.log('input 元素:', inputRef.value.tagName)
  }

  // 方式3: 非空断言 !（确定不为 null 时使用）
  // inputRef.value!.focus()  // 危险：如果真的为 null 会报错

  // 模拟加载用户数据
  setTimeout(() => {
    user.value = { id: 1, name: '张三', email: 'zhangsan@example.com' }
    userList.value = [
      { id: 1, name: '张三' },
      { id: 2, name: '李四', email: 'lisi@example.com' }
    ]
  }, 500)
})

// ==================== 方法 ====================

function focusInput() {
  // 使用可选链安全调用
  inputRef.value?.focus()
  inputRef.value?.select()
}

function updateUser(name: string) {
  if (user.value) {
    user.value.name = name
  }
}
</script>

<template>
  <div class="ref-demo">
    <h3>Ref 类型标注练习</h3>

    <!-- 基础 ref -->
    <div class="section">
      <p>count: {{ count }}</p>
      <p>message: {{ message }}</p>
      <button @click="count++">+1</button>
    </div>

    <!-- 模板引用 -->
    <div class="section">
      <h4>模板引用</h4>
      <input ref="inputRef" type="text" placeholder="点击按钮聚焦" />
      <button @click="focusInput">聚焦输入框</button>
    </div>

    <!-- 复杂类型 ref -->
    <div class="section">
      <h4>用户信息</h4>
      <div v-if="user">
        <p>ID: {{ user.id }}</p>
        <p>姓名: {{ user.name }}</p>
        <p>邮箱: {{ user.email ?? '未设置' }}</p>
      </div>
      <div v-else>
        <p>加载中...</p>
      </div>
    </div>

    <!-- 用户列表 -->
    <div class="section">
      <h4>用户列表</h4>
      <ul>
        <li v-for="u in userList" :key="u.id">
          {{ u.name }} - {{ u.email ?? '无邮箱' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.ref-demo {
  padding: 20px;
  max-width: 500px;
}

.section {
  margin: 20px 0;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.section h4 {
  margin: 0 0 10px 0;
  color: #333;
}

input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3aa876;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
</style>
