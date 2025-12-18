<script setup>
import { ref, provide, onMounted } from 'vue'

// ========== 导入组件 ==========
import LifecycleDemo from './components/lifecycle/LifecycleDemo.vue'
import ChildComponent from './components/communication/ChildComponent.vue'
import ExposeDemo from './components/communication/ExposeDemo.vue'
import MiddleComponent from './components/provide-inject/MiddleComponent.vue'

// ========== 生命周期演示相关 ==========
const showLifecycleDemo = ref(false)
const lifecycleCount = ref(0)
const lifecycleLogs = ref([])

const toggleComponent = () => {
  showLifecycleDemo.value = !showLifecycleDemo.value
  if (!showLifecycleDemo.value) {
    lifecycleLogs.value.push({
      type: 'unmount',
      message: '❌ Component Unmounted - 组件已卸载',
      time: new Date().toLocaleTimeString()
    })
  }
}

const updateData = () => {
  lifecycleCount.value++
}

const clearLogs = () => {
  lifecycleLogs.value = []
}

const addLifecycleLog = (log) => {
  lifecycleLogs.value.push(log)
}

// ========== 父子组件通信 ==========
const parentMessage = ref('Hello from Parent')
const parentCount = ref(0)
const childEmitData = ref('')

const handleChildUpdate = (data) => {
  childEmitData.value = data
}

// ========== 模板引用 ==========
const inputRef = ref(null)
const exposeRef = ref(null)
const inputValue = ref('')
const exposedDataResult = ref('')

const focusInput = () => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

const getInputValue = () => {
  if (inputRef.value) {
    inputValue.value = inputRef.value.value
  }
}

const callExposedMethod = () => {
  if (exposeRef.value) {
    const result = exposeRef.value.exposedMethod()
    console.log('方法返回值：', result)
  }
}

const getExposedData = () => {
  if (exposeRef.value) {
    exposedDataResult.value = exposeRef.value.exposedData
  }
}

// ========== Provide/Inject ==========
const themeColor = ref('#667eea')
const username = ref('Vue学习者')

// 提供数据给所有后代组件
provide('themeColor', themeColor)
provide('username', username)

// ========== 生命周期 ==========
onMounted(() => {
  console.log('🚀 App mounted')
})
</script>

<template>
  <div class="app-container">
    <h1>🚀 Vue3 生命周期与组件通信</h1>

    <!-- ==================== 生命周期函数演示 ==================== -->
    <section class="section">
      <h2>⏰ 组合式 API 生命周期函数</h2>

      <div class="lifecycle-demo">
        <div class="lifecycle-box">
          <h3>生命周期控制</h3>
          <div class="button-group">
            <button @click="toggleComponent">
              {{ showLifecycleDemo ? '销毁' : '创建' }}组件
            </button>
            <button @click="updateData" :disabled="!showLifecycleDemo">
              更新数据
            </button>
            <button @click="clearLogs" class="secondary">清空日志</button>
          </div>

          <div v-if="showLifecycleDemo" class="demo-area">
            <LifecycleDemo :count="lifecycleCount" @log="addLifecycleLog" />
          </div>
        </div>

        <div class="lifecycle-box">
          <h3>生命周期日志</h3>
          <div class="log-container">
            <div
              v-for="(log, index) in lifecycleLogs"
              :key="index"
              :class="['log-entry', log.type]"
            >
              {{ log.time }} - {{ log.message }}
            </div>
            <div v-if="lifecycleLogs.length === 0" class="empty-log">
              等待生命周期事件...
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== 父子组件通信 ==================== -->
    <section class="section">
      <h2>👨‍👧 父子组件通信</h2>

      <div class="parent-component">
        <h3>🎯 父组件 (App.vue)</h3>
        <p>父组件数据：<strong>{{ parentMessage }}</strong></p>
        <input v-model="parentMessage" placeholder="修改父组件消息" />

        <div v-if="childEmitData" class="emit-log">
          📨 接收到子组件消息：{{ childEmitData }}
        </div>

        <ChildComponent
          :parent-msg="parentMessage"
          :count="parentCount"
          @update-parent="handleChildUpdate"
          @increment="parentCount++"
        />
      </div>
    </section>

    <!-- ==================== 模板引用与 defineExpose ==================== -->
    <section class="section">
      <h2>🎯 模板引用与 defineExpose</h2>

      <div class="ref-demo">
        <div class="ref-box">
          <h3>DOM 元素引用</h3>
          <input ref="inputRef" placeholder="我是一个输入框" />
          <div class="button-group">
            <button @click="focusInput">聚焦输入框</button>
            <button @click="getInputValue">获取输入值</button>
          </div>
          <div v-if="inputValue" class="result-box">
            输入框的值：{{ inputValue }}
          </div>
        </div>

        <div class="ref-box">
          <h3>组件实例引用</h3>
          <ExposeDemo ref="exposeRef" />
          <div class="button-group">
            <button @click="callExposedMethod">调用暴露方法</button>
            <button @click="getExposedData">获取暴露数据</button>
          </div>
          <div v-if="exposedDataResult" class="result-box">
            暴露的数据：{{ exposedDataResult }}
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== Provide/Inject 跨层通信 ==================== -->
    <section class="section">
      <h2>🌳 Provide/Inject 跨层通信</h2>

      <div class="provide-demo">
        <h3>祖先组件（提供数据）</h3>
        <div class="input-row">
          <label>
            主题颜色：
            <input v-model="themeColor" type="color" />
          </label>
          <label>
            用户名：
            <input v-model="username" placeholder="输入用户名" />
          </label>
        </div>

        <div class="tree-structure">
          <div class="root-node">🏠 根组件 (App.vue) - provide 数据</div>
          <MiddleComponent />
        </div>
      </div>
    </section>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: white;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.section h2 {
  color: #667eea;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
}

.section h3 {
  color: #333;
  margin-bottom: 15px;
}

/* 生命周期演示 */
.lifecycle-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.lifecycle-box {
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
}

.lifecycle-box h3 {
  color: #764ba2;
}

.demo-area {
  margin-top: 15px;
}

.log-container {
  background: #2d2d2d;
  color: #00ff00;
  padding: 15px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  max-height: 200px;
  overflow-y: auto;
}

.log-entry {
  margin: 5px 0;
  padding: 3px;
}

.log-entry.mount {
  color: #4caf50;
}
.log-entry.update {
  color: #ffc107;
}
.log-entry.unmount {
  color: #f44336;
}

.empty-log {
  color: #666;
}

/* 按钮样式 */
.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 10px 0;
}

button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

button.secondary {
  background: #666;
}

/* 输入框样式 */
input[type='text'],
input:not([type]) {
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  margin: 5px 0;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

/* 父子组件通信 */
.parent-component {
  border: 2px dashed #f093fb;
  border-radius: 8px;
  padding: 20px;
  background: linear-gradient(135deg, #f093fb10 0%, #f5576c10 100%);
}

.parent-component h3 {
  color: #f093fb;
}

.emit-log {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 8px;
  padding: 10px;
  margin: 15px 0;
  color: #856404;
}

/* 模板引用演示 */
.ref-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.ref-box {
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
}

.result-box {
  background: #e8f5e9;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  font-family: monospace;
}

/* Provide/Inject 演示 */
.provide-demo {
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.input-row {
  display: flex;
  gap: 20px;
  margin: 15px 0;
}

.input-row label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tree-structure {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
}

.root-node {
  padding: 12px 15px;
  background: #e3f2fd;
  border-radius: 8px;
  margin-bottom: 10px;
  font-weight: 500;
}

/* 响应式 */
@media (max-width: 768px) {
  .lifecycle-demo,
  .ref-demo {
    grid-template-columns: 1fr;
  }

  .input-row {
    flex-direction: column;
  }
}
</style>
