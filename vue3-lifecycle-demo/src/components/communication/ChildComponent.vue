<script setup>
import { ref } from 'vue'

// ========== Props ==========
// defineProps 定义从父组件接收的数据
const props = defineProps({
  parentMsg: {
    type: String,
    default: ''
  },
  count: {
    type: Number,
    default: 0
  }
})

// ========== Emits ==========
// defineEmits 定义向父组件发送的事件
const emit = defineEmits(['update-parent', 'increment'])

// ========== 组件内部状态 ==========
const childMessage = ref('我是子组件的内部消息')

// ========== 方法 ==========
const sendToParent = () => {
  // 通过 emit 向父组件发送消息
  emit('update-parent', `来自子组件的消息 - ${new Date().toLocaleTimeString()}`)
}

const handleIncrement = () => {
  // 触发父组件的 increment 事件
  emit('increment')
}
</script>

<template>
  <div class="child-component">
    <h3>👶 子组件 (ChildComponent)</h3>

    <div class="data-section">
      <h4>📥 接收到的 Props:</h4>
      <p>父组件消息: <strong>{{ parentMsg }}</strong></p>
      <p>计数值: <strong>{{ count }}</strong></p>
    </div>

    <div class="internal-section">
      <h4>🏠 内部状态:</h4>
      <p>{{ childMessage }}</p>
    </div>

    <div class="actions">
      <button @click="sendToParent">📤 发送消息给父组件</button>
      <button @click="handleIncrement">➕ 增加父组件计数</button>
    </div>
  </div>
</template>

<style scoped>
.child-component {
  border: 2px dashed #667eea;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
  background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
}

.child-component h3 {
  color: #667eea;
  margin-bottom: 15px;
}

.child-component h4 {
  color: #555;
  font-size: 14px;
  margin-bottom: 8px;
}

.data-section,
.internal-section {
  background: white;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.data-section p,
.internal-section p {
  margin: 5px 0;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>
