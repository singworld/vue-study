<script setup lang="ts">
/**
 * 练习 3: defineProps 和 defineEmits 类型标注
 *
 * 知识点：
 * - defineProps<T>() 泛型类型标注
 * - withDefaults() 设置默认值
 * - defineEmits<T>() 事件类型标注
 */
import { ref } from 'vue'
import CustomButton from '@/components/exercises/CustomButton.vue'

const clickCount = ref(0)
const lastEvent = ref<string>('')

function handleClick(e: MouseEvent) {
  clickCount.value++
  lastEvent.value = `点击事件 - 坐标: (${e.clientX}, ${e.clientY})`
}

function handleChange(value: string) {
  lastEvent.value = `Change 事件 - 值: ${value}`
}
</script>

<template>
  <div class="props-emits">
    <h2>练习 3: Props 和 Emits 类型标注</h2>

    <div class="info-box">
      <h4>知识点</h4>
      <ul>
        <li><code>defineProps&lt;T&gt;()</code> 泛型类型标注</li>
        <li><code>withDefaults()</code> 设置默认值</li>
        <li><code>defineEmits&lt;T&gt;()</code> 事件类型标注</li>
        <li>可选属性 <code>?</code> 和必填属性</li>
      </ul>
    </div>

    <div class="demo-section">
      <h4>自定义按钮组件</h4>

      <div class="button-demo">
        <p>不同颜色：</p>
        <div class="button-row">
          <CustomButton color="primary" @click="handleClick" @change="handleChange">
            Primary
          </CustomButton>
          <CustomButton color="success" @click="handleClick" @change="handleChange">
            Success
          </CustomButton>
          <CustomButton color="danger" @click="handleClick" @change="handleChange">
            Danger
          </CustomButton>
        </div>
      </div>

      <div class="button-demo">
        <p>不同尺寸：</p>
        <div class="button-row">
          <CustomButton color="primary" size="small" @click="handleClick">
            Small
          </CustomButton>
          <CustomButton color="primary" size="medium" @click="handleClick">
            Medium
          </CustomButton>
          <CustomButton color="primary" size="large" @click="handleClick">
            Large
          </CustomButton>
        </div>
      </div>

      <div class="button-demo">
        <p>禁用状态：</p>
        <div class="button-row">
          <CustomButton color="primary" :disabled="true" @click="handleClick">
            Disabled
          </CustomButton>
        </div>
      </div>

      <div class="event-log">
        <p>点击次数：{{ clickCount }}</p>
        <p>最近事件：{{ lastEvent || '无' }}</p>
      </div>
    </div>

    <div class="code-hint">
      <h4>关键代码</h4>
      <pre><code>// Props 类型定义
interface Props {
  color: string        // 必填
  size?: 'small' | 'medium' | 'large'  // 可选
  disabled?: boolean   // 可选
}

// 带默认值
const props = withDefaults(defineProps&lt;Props&gt;(), {
  size: 'medium',
  disabled: false
})

// Emits 类型定义
interface Emits {
  (e: 'click', value: MouseEvent): void
  (e: 'change', value: string): void
}

const emit = defineEmits&lt;Emits&gt;()</code></pre>
    </div>
  </div>
</template>

<style scoped>
.props-emits {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.info-box {
  background: #fff3e0;
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

.button-demo {
  margin-bottom: 20px;
}

.button-demo p {
  margin: 0 0 10px;
  color: #666;
}

.button-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.event-log {
  margin-top: 20px;
  padding: 15px;
  background: #e8f5e9;
  border-radius: 4px;
}

.event-log p {
  margin: 5px 0;
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
