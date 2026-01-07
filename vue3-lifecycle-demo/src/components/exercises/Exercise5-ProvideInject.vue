<script setup>
import { provide, ref } from 'vue'
import Exercise5Child from './Exercise5-Child.vue'

/**
 * 练习 5: Provide/Inject 综合练习 (父组件)
 *
 * 任务：实现一个主题切换系统
 *
 * 要求：
 * 1. 使用 provide 提供主题配置（颜色、字体大小、暗色模式）
 * 2. 子组件通过 inject 获取并使用这些配置
 * 3. 修改配置时，所有使用的组件都会更新
 */

// 主题配置
const primaryColor = ref('#667eea')
const fontSize = ref(16)
const isDarkMode = ref(false)

// TODO(human): 使用 provide 提供主题配置
// 提示：
// - provide('primaryColor', primaryColor)
// - provide('fontSize', fontSize)
// - provide('isDarkMode', isDarkMode)

provide('primaryColor', primaryColor)
provide('fontSize', fontSize)
provide('isDarkMode', isDarkMode)


// 预设主题
const presetThemes = [
  { name: '默认蓝', color: '#667eea' },
  { name: '活力橙', color: '#ff9800' },
  { name: '清新绿', color: '#4caf50' },
  { name: '优雅紫', color: '#9c27b0' },
  { name: '热情红', color: '#f44336' }
]

const applyTheme = (color) => {
  primaryColor.value = color
}
</script>

<template>
  <div class="exercise-card" :class="{ dark: isDarkMode }">
    <h3>🎨 练习 5: 主题系统 (Provide/Inject)</h3>
    <p class="description">使用 provide/inject 实现跨组件主题配置</p>

    <div class="controls-section">
      <div class="control-group">
        <label>主题颜色:</label>
        <div class="color-presets">
          <button
            v-for="theme in presetThemes"
            :key="theme.color"
            :style="{ background: theme.color }"
            :class="{ active: primaryColor === theme.color }"
            @click="applyTheme(theme.color)"
            :title="theme.name"
          ></button>
          <input type="color" v-model="primaryColor" />
        </div>
      </div>

      <div class="control-group">
        <label>字体大小: {{ fontSize }}px</label>
        <input
          type="range"
          v-model.number="fontSize"
          min="12"
          max="24"
          step="1"
        />
      </div>

      <div class="control-group">
        <label>
          <input type="checkbox" v-model="isDarkMode" />
          暗色模式
        </label>
      </div>
    </div>

    <div class="preview-section">
      <h4>👇 子组件预览 (使用 inject 获取配置)</h4>
      <Exercise5Child />
    </div>
  </div>
</template>

<style scoped>
.exercise-card {
  border: 2px solid #ff9800;
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  transition: all 0.3s;
}

.exercise-card.dark {
  background: linear-gradient(135deg, #263238 0%, #37474f 100%);
  color: #fff;
}

.exercise-card h3 {
  color: #e65100;
  margin-bottom: 10px;
}

.exercise-card.dark h3 {
  color: #ffb74d;
}

.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

.exercise-card.dark .description {
  color: #b0bec5;
}

.controls-section {
  background: rgba(255,255,255,0.8);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.exercise-card.dark .controls-section {
  background: rgba(0,0,0,0.3);
}

.control-group {
  margin: 15px 0;
}

.control-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.color-presets {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.color-presets button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.color-presets button:hover {
  transform: scale(1.1);
}

.color-presets button.active {
  border-color: #333;
}

.color-presets input[type="color"] {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"] {
  width: 100%;
  max-width: 300px;
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.preview-section {
  padding: 15px;
  background: rgba(255,255,255,0.5);
  border-radius: 8px;
}

.exercise-card.dark .preview-section {
  background: rgba(0,0,0,0.2);
}

.preview-section h4 {
  margin-bottom: 15px;
  color: #555;
}

.exercise-card.dark .preview-section h4 {
  color: #ccc;
}
</style>
