<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

/**
 * 练习 1: 生命周期钩子
 *
 * 任务：实现一个实时时钟组件
 *
 * 要求：
 * 1. 在 onMounted 中启动定时器，每秒更新时间
 * 2. 在 onUnmounted 中清除定时器（防止内存泄漏）
 * 3. 在 onUpdated 中打印日志（观察更新频率）
 */

const currentTime = ref('')
let timer = null  // 用于存储定时器 ID

// TODO(human): 实现 onMounted 钩子
// 提示：
// - 使用 setInterval 每秒执行一次
// - 更新 currentTime.value 为当前时间
// - 获取时间：new Date().toLocaleTimeString()
// - 将定时器 ID 赋值给 timer 变量

onMounted(() => {
  currentTime.value = new Date().toLocaleTimeString()
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString()
  }, 1000)
})

// TODO(human): 实现 onUnmounted 钩子
// 提示：
// - 使用 clearInterval(timer) 清除定时器
// - 可以加一个 console.log 确认清理执行了

onUnmounted(() => {
  clearInterval(timer)
  console.log('❌ onUnmounted: 定时器已清除，防止内存泄漏')
})

// TODO(human): 实现 onUpdated 钩子（可选）
// 提示：打印一条日志观察组件更新频率

onUpdated(() => {
  console.log('🔄 onUpdated: DOM 已更新，当前时间:', currentTime.value)
})

</script>

<template>
  <div class="exercise-card">
    <h3>⏰ 练习 1: 实时时钟</h3>
    <p class="description">使用生命周期钩子实现自动更新的时钟</p>

    <div class="clock-display">
      {{ currentTime || '等待启动...' }}
    </div>

    <div class="tips">
      <p>💡 提示：打开控制台观察 onUpdated 日志</p>
      <p>💡 销毁组件时检查 onUnmounted 是否执行</p>
    </div>
  </div>
</template>

<style scoped>
.exercise-card {
  border: 2px solid #4caf50;
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.exercise-card h3 {
  color: #2e7d32;
  margin-bottom: 10px;
}

.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

.clock-display {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  background: #1a1a2e;
  color: #00ff88;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 10px #00ff88;
}

.tips {
  margin-top: 15px;
  padding: 10px;
  background: rgba(255,255,255,0.7);
  border-radius: 6px;
  font-size: 13px;
}

.tips p {
  margin: 5px 0;
  color: #555;
}
</style>
