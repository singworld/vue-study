<script setup lang="ts">
/**
 * 练习 2: Pinia 异步 Action + TypeScript
 *
 * 知识点：
 * - 异步 action (async/await)
 * - TypeScript 类型定义
 * - 加载状态管理
 * - 错误处理
 */
import { onMounted } from 'vue'
import { useChannelStore } from '@/stores/channel'
import { storeToRefs } from 'pinia'

const channelStore = useChannelStore()

// TODO(human): 解构 store 的状态和方法
const { channels, loading, error, activeChannel, channelCount } = storeToRefs(channelStore)
const { fetchChannels, setActiveChannel } = channelStore

// 组件挂载时获取数据
onMounted(() => {
  fetchChannels()
})

function handleChannelClick(id: number) {
  setActiveChannel(id)
}
</script>

<template>
  <div class="pinia-channel">
    <h2>练习 2: Pinia 异步 Action + TypeScript</h2>

    <div class="info-box">
      <h4>知识点</h4>
      <ul>
        <li>异步 action：<code>async/await</code></li>
        <li>TypeScript 接口定义</li>
        <li>加载状态：<code>loading</code></li>
        <li>错误处理：<code>error</code></li>
        <li>计算属性 getter</li>
      </ul>
    </div>

    <div class="demo-section">
      <h4>频道列表 (共 {{ channelCount }} 个)</h4>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading">
        <span class="spinner"></span> 加载中...
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="error">
        {{ error }}
        <button @click="fetchChannels">重试</button>
      </div>

      <!-- 数据展示 -->
      <div v-else class="channel-list">
        <div
          v-for="channel in channels"
          :key="channel.id"
          class="channel-item"
          :class="{ active: activeChannel?.id === channel.id }"
          @click="handleChannelClick(channel.id)"
        >
          {{ channel.name }}
        </div>
      </div>

      <!-- 当前选中 -->
      <div v-if="activeChannel" class="active-info">
        当前选中：<strong>{{ activeChannel.name }}</strong> (ID: {{ activeChannel.id }})
      </div>
    </div>

    <div class="code-hint">
      <h4>关键代码</h4>
      <pre><code>// 类型定义
interface Channel {
  id: number
  name: string
}

// 异步 action
async function fetchChannels() {
  loading.value = true
  try {
    const data = await api.getChannels()
    channels.value = data
  } catch (e) {
    error.value = '获取失败'
  } finally {
    loading.value = false
  }
}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.pinia-channel {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.info-box {
  background: #e3f2fd;
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

.loading {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-top-color: #42b883;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #d32f2f;
  display: flex;
  align-items: center;
  gap: 10px;
}

.channel-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.channel-item {
  padding: 10px 20px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.channel-item:hover {
  border-color: #42b883;
}

.channel-item.active {
  background: #42b883;
  border-color: #42b883;
  color: white;
}

.active-info {
  margin-top: 20px;
  padding: 10px;
  background: #e8f5e9;
  border-radius: 4px;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #42b883;
  color: white;
  cursor: pointer;
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
