<script setup lang="ts">
/**
 * 练习 3: Vue3 + TS 组件 - Props 和 Emits 类型
 *
 * 知识点：
 * - defineProps<T>() 定义 props 类型
 * - withDefaults() 设置默认值
 * - defineEmits<T>() 定义 emits 类型
 */

// ==================== Props 类型定义 ====================

// TODO(human): 理解 Props 类型定义
// 使用 defineProps<T>() 泛型方式定义 props
interface Props {
  // 必填属性
  color: string
  // 可选属性
  size?: 'small' | 'medium' | 'large'
  // 可选属性
  disabled?: boolean
}

// 使用 withDefaults 设置默认值
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  disabled: false
})

// ==================== Emits 类型定义 ====================

// TODO(human): 理解 Emits 类型定义
// 使用 defineEmits<T>() 泛型方式定义事件
interface Emits {
  // 事件名: [参数类型列表]
  (e: 'click', value: MouseEvent): void
  (e: 'change', value: string): void
}

const emit = defineEmits<Emits>()

// ==================== 事件处理 ====================

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    class="custom-button"
    :class="[`size-${props.size}`, { disabled: props.disabled }]"
    :style="{ backgroundColor: props.color }"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <slot>按钮</slot>
  </button>
</template>

<style scoped>
.custom-button {
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.custom-button:hover:not(.disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.size-small {
  padding: 6px 12px;
  font-size: 12px;
}

.size-medium {
  padding: 10px 20px;
  font-size: 14px;
}

.size-large {
  padding: 14px 28px;
  font-size: 16px;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
