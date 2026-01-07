<script setup>
/**
 * 练习 3: Props 与 Emits (子组件)
 *
 * 任务：实现一个评分组件
 *
 * 要求：
 * 1. 接收 props: rating (当前评分), maxRating (最大评分，默认5)
 * 2. 发送 emit: 'update:rating' (评分变化时), 'hover' (鼠标悬停时)
 * 3. 实现星星点击和悬停效果
 */

import { ref } from 'vue'

// TODO(human): 定义 Props
// 提示：
// - rating: Number 类型，必传
// - maxRating: Number 类型，默认值 5
// - readonly: Boolean 类型，默认值 false（只读模式不可点击）

const props = defineProps({
  // 在这里定义 props...
  rating: {
    type: Number,
    required: true
  },
  maxRating: {
    type: Number,
    default: 5
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

// TODO(human): 定义 Emits
// 提示：定义 'update:rating' 和 'hover' 两个事件

const emit = defineEmits([
  // 在这里定义 emits...
  'update:rating',
  'hover'
])

// 悬停状态
const hoverRating = ref(0)

// TODO(human): 实现点击星星的处理函数
// 提示：
// - 如果 props.readonly 为 true，直接 return
// - 否则 emit('update:rating', index)
const handleClick = (index) => {
  // 实现点击逻辑...
  if (props.readonly) return
  emit('update:rating', index)
}

// TODO(human): 实现鼠标悬停的处理函数
const handleMouseEnter = (index) => {
  if (props.readonly) return
  hoverRating.value = index
  emit('hover', index)
}

const handleMouseLeave = () => {
  hoverRating.value = 0
}

// 判断星星是否高亮
const isActive = (index) => {
  if (hoverRating.value > 0) {
    return index <= hoverRating.value
  }
  return index <= (props.rating || 0)
}
</script>

<template>
  <div class="rating-component" :class="{ readonly: props.readonly }">
    <span
      v-for="index in (props.maxRating || 5)"
      :key="index"
      class="star"
      :class="{ active: isActive(index) }"
      @click="handleClick(index)"
      @mouseenter="handleMouseEnter(index)"
      @mouseleave="handleMouseLeave"
    >
      ★
    </span>
    <span class="rating-text">{{ props.rating || 0 }} / {{ props.maxRating || 5 }}</span>
  </div>
</template>

<style scoped>
.rating-component {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star {
  font-size: 28px;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
}

.star:hover {
  transform: scale(1.2);
}

.star.active {
  color: #ffc107;
}

.readonly .star {
  cursor: default;
}

.readonly .star:hover {
  transform: none;
}

.rating-text {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}
</style>
