<script setup>
import { inject, ref } from 'vue'

/**
 * 练习 5: Provide/Inject 综合练习 (子组件)
 *
 * 任务：从祖先组件获取主题配置并应用
 *
 * 要求：
 * 1. 使用 inject 获取主题配置
 * 2. 将配置应用到组件样式
 */

// 使用 inject 获取主题配置
// 注意：父组件 provide 的是 ref，所以这里获取到的也是 ref
// 第二个参数是默认值（当找不到 provide 时使用）

const primaryColor = inject('primaryColor')
const fontSize = inject('fontSize')
const isDarkMode = inject('isDarkMode')
</script>

<template>
  <div
    class="child-component"
    :class="{ dark: isDarkMode }"
    :style="{
      borderColor: primaryColor,
      fontSize: fontSize + 'px'
    }"
  >
    <h5 :style="{ color: primaryColor }">
      🎯 这是使用 inject 的子组件
    </h5>

    <div class="info-grid">
      <div class="info-item">
        <span class="label">主题色:</span>
        <span
          class="color-box"
          :style="{ background: primaryColor }"
        ></span>
        <span>{{ primaryColor || '未获取' }}</span>
      </div>

      <div class="info-item">
        <span class="label">字体大小:</span>
        <span>{{ fontSize || '未获取' }}px</span>
      </div>

      <div class="info-item">
        <span class="label">暗色模式:</span>
        <span>{{ isDarkMode ? '开启' : '关闭' }}</span>
      </div>
    </div>

    <p class="sample-text" :style="{ color: primaryColor }">
      这段文字会随主题配置变化。字体大小、颜色都由 inject 获取的配置控制。
    </p>

    <button
      class="themed-button"
      :style="{ background: primaryColor }"
    >
      主题按钮
    </button>
  </div>
</template>

<style scoped>
.child-component {
  padding: 20px;
  border: 3px solid #ccc;
  border-radius: 12px;
  background: white;
  transition: all 0.3s;
}

.child-component.dark {
  background: #1a1a2e;
  color: #eee;
}

.child-component h5 {
  margin-bottom: 15px;
}

.info-grid {
  display: grid;
  gap: 10px;
  margin: 15px 0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(0,0,0,0.05);
  border-radius: 6px;
}

.child-component.dark .info-item {
  background: rgba(255,255,255,0.1);
}

.label {
  font-weight: 500;
  min-width: 80px;
}

.color-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.2);
}

.sample-text {
  margin: 15px 0;
  line-height: 1.6;
}

.themed-button {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}

.themed-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>
