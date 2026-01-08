<script setup lang="ts">
/**
 * 练习 1: Pinia Counter Store 使用
 *
 * 知识点：
 * - useStore() 获取 store 实例
 * - storeToRefs() 保持响应式解构
 * - 直接调用 actions
 */
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

// 获取 store 实例
const counterStore = useCounterStore()

// TODO(human): 使用 storeToRefs 解构响应式状态
// 注意：actions 不需要 storeToRefs，可以直接解构
const { count, name, doubleCount, countInfo } = storeToRefs(counterStore)
const { increment, decrement, incrementBy, reset } = counterStore

// 自定义增加数量
function addCustom(n: number) {
  incrementBy(n)
}
</script>

<template>
  <div class="pinia-counter">
    <h2>练习 1: Pinia 基础 - Counter Store</h2>

    <div class="info-box">
      <h4>知识点</h4>
      <ul>
        <li><code>defineStore</code> 定义 store</li>
        <li><code>ref()</code> 定义响应式状态 (state)</li>
        <li><code>computed()</code> 定义计算属性 (getters)</li>
        <li>普通函数定义操作 (actions)</li>
        <li><code>storeToRefs()</code> 响应式解构</li>
      </ul>
    </div>

    <div class="demo-section">
      <h4>{{ name }}</h4>
      <p class="count-display">Count: {{ count }}</p>
      <p>Double Count: {{ doubleCount }}</p>
      <p class="count-info">{{ countInfo }}</p>

      <div class="button-group">
        <button @click="decrement">-1</button>
        <button @click="increment">+1</button>
        <button @click="addCustom(5)">+5</button>
        <button @click="addCustom(10)">+10</button>
        <button class="reset" @click="reset">重置</button>
      </div>
    </div>

    <div class="code-hint">
      <h4>关键代码</h4>
      <pre><code>// storeToRefs 保持响应式
const { count, doubleCount } = storeToRefs(counterStore)

// actions 直接解构
const { increment, reset } = counterStore</code></pre>
    </div>
  </div>
</template>

<style scoped>
.pinia-counter {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.info-box {
  background: #e8f5e9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.info-box ul {
  margin: 10px 0 0;
  padding-left: 20px;
}

.demo-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.count-display {
  font-size: 2em;
  font-weight: bold;
  color: #42b883;
}

.count-info {
  color: #666;
  font-style: italic;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #42b883;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #3aa876;
}

button.reset {
  background: #ff6b6b;
}

button.reset:hover {
  background: #ee5a5a;
}

.code-hint {
  background: #263238;
  color: #aed581;
  padding: 15px;
  border-radius: 8px;
}

.code-hint h4 {
  color: #fff;
  margin: 0 0 10px;
}

.code-hint pre {
  margin: 0;
  overflow-x: auto;
}

code {
  font-family: 'Fira Code', monospace;
}
</style>
