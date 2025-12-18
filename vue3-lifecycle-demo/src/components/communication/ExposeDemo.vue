<script setup>
import { ref } from 'vue'

// ========== 组件内部状态 ==========
const privateData = ref('这是私有数据，外部无法访问')
const exposedData = ref('这是暴露的数据')
const exposedCount = ref(0)

// ========== 方法 ==========
const privateMethod = () => {
  console.log('私有方法被调用，外部无法访问')
}

const exposedMethod = () => {
  exposedCount.value++
  alert(`暴露的方法被调用了 ${exposedCount.value} 次`)
  return `调用次数：${exposedCount.value}`
}

// ========== defineExpose ==========
// 使用 defineExpose 显式指定哪些内容可以被父组件通过 ref 访问
// 未列出的属性和方法对父组件不可见
defineExpose({
  exposedData,
  exposedMethod,
  exposedCount
})
</script>

<template>
  <div class="expose-component">
    <h4>🔐 组件实例（defineExpose 示例）</h4>

    <div class="info-row">
      <span class="label">私有数据:</span>
      <span class="value private">{{ privateData }}</span>
    </div>

    <div class="info-row">
      <span class="label">暴露的数据:</span>
      <span class="value exposed">{{ exposedData }}</span>
    </div>

    <div class="info-row">
      <span class="label">调用次数:</span>
      <span class="value">{{ exposedCount }}</span>
    </div>
  </div>
</template>

<style scoped>
.expose-component {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.expose-component h4 {
  color: #333;
  margin-bottom: 15px;
}

.info-row {
  display: flex;
  align-items: center;
  margin: 8px 0;
  padding: 8px;
  background: white;
  border-radius: 4px;
}

.label {
  font-weight: 500;
  color: #666;
  min-width: 100px;
}

.value {
  color: #333;
}

.value.private {
  color: #f44336;
  font-style: italic;
}

.value.exposed {
  color: #4caf50;
  font-weight: 500;
}
</style>
