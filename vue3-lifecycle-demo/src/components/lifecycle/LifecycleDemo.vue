<script setup>
import { ref, watch, onMounted, onUpdated, onUnmounted } from 'vue'

// 定义 props
const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
})

// 定义 emits
const emit = defineEmits(['log'])

// 组件内部状态
const internalData = ref('初始数据')

// ========== 生命周期钩子 ==========

// 组件挂载完成后执行
onMounted(() => {
  emit('log', {
    type: 'mount',
    message: '✅ onMounted - 组件已挂载到 DOM',
    time: new Date().toLocaleTimeString()
  })
})

// 响应式数据变化导致 DOM 更新后执行
onUpdated(() => {
  emit('log', {
    type: 'update',
    message: '🔄 onUpdated - DOM 已更新',
    time: new Date().toLocaleTimeString()
  })
})

// 组件卸载前执行
onUnmounted(() => {
  // 注意：此时组件已经从父组件移除，无法 emit
  // 所以只能用 console.log
  console.log('❌ onUnmounted - 组件即将卸载，清理资源...')
})

// ========== 侦听器 ==========

// 监听 props.count 变化
watch(
  () => props.count,
  (newVal, oldVal) => {
    emit('log', {
      type: 'update',
      message: `📊 Watch: count 从 ${oldVal} 变为 ${newVal}`,
      time: new Date().toLocaleTimeString()
    })
  }
)
</script>

<template>
  <div class="lifecycle-component">
    <h4>🎯 生命周期演示组件</h4>
    <p>Props count: <strong>{{ count }}</strong></p>
    <p>内部数据: {{ internalData }}</p>
  </div>
</template>

<style scoped>
.lifecycle-component {
  padding: 15px;
  background: #e8f5e9;
  border-radius: 8px;
  border: 2px solid #4caf50;
}

.lifecycle-component h4 {
  color: #2e7d32;
  margin-bottom: 10px;
}

.lifecycle-component p {
  margin: 5px 0;
  color: #333;
}
</style>
