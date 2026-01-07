<script setup>
import { ref, watch, computed } from 'vue'

/**
 * 练习 2: Watch 侦听器
 *
 * 任务：实现一个搜索框，带防抖和搜索历史
 *
 * 要求：
 * 1. 监听 searchText，当用户停止输入 500ms 后执行搜索
 * 2. 将搜索记录添加到 searchHistory 数组
 * 3. 监听 searchHistory 数组长度变化，超过 5 条时提示
 */

const searchText = ref('')
const searchHistory = ref([])
const searchResult = ref('')
const isSearching = ref(false)

// 模拟搜索函数
const doSearch = (keyword) => {
  if (!keyword.trim()) return

  isSearching.value = true

  // 模拟 API 延迟
  setTimeout(() => {
    searchResult.value = `搜索 "${keyword}" 找到 ${Math.floor(Math.random() * 100)} 条结果`
    searchHistory.value.push({
      keyword,
      time: new Date().toLocaleTimeString()
    })
    isSearching.value = false
  }, 300)
}

// TODO(human): 监听 searchText，实现防抖搜索
// 提示：
// - 使用 watch 监听 searchText
// - 在回调中使用 setTimeout 实现 500ms 防抖
// - 记得清除上一次的定时器（需要在外部声明 let debounceTimer = null）
// - 调用 doSearch(newValue) 执行搜索

let debounceTimer = null

watch(searchText, (newValue) => {
  // 清除上一次的定时器（防抖核心）
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  // 设置新的定时器，500ms 后执行搜索
  debounceTimer = setTimeout(() => {
    doSearch(newValue)
  }, 500)
})

// TODO(human): 监听 searchHistory 数组长度
// 提示：
// - 使用 () => searchHistory.value.length 作为监听源
// - 当长度超过 5 时，用 alert 或 console.log 提示用户

watch(
  () => searchHistory.value.length,
  (newLen, oldLen) => {
    if (newLen > 5) {
      console.log(`⚠️ 搜索历史已有 ${newLen} 条，建议清理`)
    }
  }
)


// 清空历史
const clearHistory = () => {
  searchHistory.value = []
  searchResult.value = ''
}
</script>

<template>
  <div class="exercise-card">
    <h3>🔍 练习 2: 防抖搜索</h3>
    <p class="description">使用 watch 实现输入防抖和历史记录监控</p>

    <div class="search-box">
      <input
        v-model="searchText"
        placeholder="输入搜索内容..."
        class="search-input"
      />
      <span v-if="isSearching" class="searching">搜索中...</span>
    </div>

    <div v-if="searchResult" class="result">
      {{ searchResult }}
    </div>

    <div class="history-section">
      <div class="history-header">
        <span>📜 搜索历史 ({{ searchHistory.length }})</span>
        <button @click="clearHistory" class="clear-btn">清空</button>
      </div>
      <ul v-if="searchHistory.length > 0">
        <li v-for="(item, index) in searchHistory" :key="index">
          <span class="keyword">{{ item.keyword }}</span>
          <span class="time">{{ item.time }}</span>
        </li>
      </ul>
      <p v-else class="empty">暂无搜索历史</p>
    </div>
  </div>
</template>

<style scoped>
.exercise-card {
  border: 2px solid #2196f3;
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

.exercise-card h3 {
  color: #1565c0;
  margin-bottom: 10px;
}

.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

.search-box {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #90caf9;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #1976d2;
}

.searching {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #1976d2;
  font-size: 14px;
}

.result {
  margin-top: 15px;
  padding: 12px;
  background: #c8e6c9;
  border-radius: 8px;
  color: #2e7d32;
  font-weight: 500;
}

.history-section {
  margin-top: 20px;
  padding: 15px;
  background: rgba(255,255,255,0.8);
  border-radius: 8px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 500;
}

.clear-btn {
  padding: 4px 12px;
  font-size: 12px;
  background: #ef5350;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.history-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-section li {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.keyword {
  color: #1976d2;
}

.time {
  color: #999;
  font-size: 12px;
}

.empty {
  color: #999;
  text-align: center;
  padding: 10px;
}
</style>
