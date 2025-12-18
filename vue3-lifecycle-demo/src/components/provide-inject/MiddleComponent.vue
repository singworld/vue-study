<script setup>
import DeepChild from './DeepChild.vue'

// 中间层组件：不需要使用 provide/inject 的数据
// 它的作用是展示数据可以跨越多层组件传递
</script>

<template>
  <div class="middle-component">
    <div class="header">
      👨 中间层组件 (MiddleComponent)
      <span class="note">— 不使用 provide/inject 数据，只是传递</span>
    </div>
    <DeepChild />
  </div>
</template>

<style scoped>
.middle-component {
  margin-left: 20px;
  padding: 10px;
  border-left: 3px solid #ccc;
}

.header {
  padding: 12px 15px;
  background: #fff9c4;
  border-radius: 8px;
  margin-bottom: 10px;
  font-weight: 500;
}

.note {
  font-size: 12px;
  color: #666;
  font-weight: normal;
}
</style>
