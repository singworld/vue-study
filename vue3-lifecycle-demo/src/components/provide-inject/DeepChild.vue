<script setup>
import { inject } from 'vue'

// ========== Inject ==========
// TODO(human): 使用 inject 从祖先组件获取数据
// inject 函数接收两个参数：
//   1. key (字符串) - 与 provide 中使用的 key 匹配
//   2. defaultValue (可选) - 如果没有找到 provide 的数据时使用的默认值
//
// 需要注入的数据：
//   - 'themeColor' - 主题颜色
//   - 'username' - 用户名
//
// 示例语法: const xxx = inject('key', '默认值')

const injectedTheme = null    // 替换为正确的 inject 调用
const injectedUsername = null // 替换为正确的 inject 调用
</script>

<template>
  <div class="deep-child" :style="{ borderColor: injectedTheme }">
    <div class="content">
      <h4>👶 深层子组件 (DeepChild)</h4>
      <p>
        接收到的主题颜色:
        <span class="color-value" :style="{ color: injectedTheme, fontWeight: 'bold' }">
          {{ injectedTheme || '未注入' }}
        </span>
      </p>
      <p>
        接收到的用户名:
        <strong>{{ injectedUsername || '未注入' }}</strong>
      </p>
    </div>
  </div>
</template>

<style scoped>
.deep-child {
  margin-left: 20px;
  padding: 10px;
  border-left: 3px solid #ccc;
  position: relative;
}

.deep-child::before {
  content: "";
  position: absolute;
  left: -3px;
  top: 50%;
  width: 15px;
  height: 3px;
  background: #ccc;
}

.content {
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content h4 {
  color: #333;
  margin-bottom: 10px;
}

.content p {
  margin: 8px 0;
}

.color-value {
  padding: 2px 8px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
