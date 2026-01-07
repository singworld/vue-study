<script setup>
import { ref } from 'vue'

// 导入所有练习组件
import Exercise1Lifecycle from './Exercise1-Lifecycle.vue'
import Exercise2Watch from './Exercise2-Watch.vue'
import Exercise3PropsEmits from './Exercise3-PropsEmits.vue'
import Exercise4RefExpose from './Exercise4-RefExpose.vue'
import Exercise5ProvideInject from './Exercise5-ProvideInject.vue'

// 控制显示哪个练习
const showExercise1 = ref(true)

// 练习3: 评分组件的父组件逻辑
const rating = ref(0)
const hoverInfo = ref('')

const handleRatingChange = (newRating) => {
  rating.value = newRating
}

const handleHover = (index) => {
  hoverInfo.value = index ? `悬停在第 ${index} 颗星` : ''
}

// 练习4: 视频播放器引用
const videoPlayerRef = ref(null)

const parentControlPlay = () => {
  videoPlayerRef.value?.play()
}

const parentControlPause = () => {
  videoPlayerRef.value?.pause()
}

const parentControlReset = () => {
  videoPlayerRef.value?.reset()
}
</script>

<template>
  <div class="exercises-page">
    <h1>📝 Vue3 综合练习</h1>
    <p class="intro">完成以下练习，巩固本次学习的所有知识点</p>

    <!-- 练习 1: 生命周期 -->
    <section class="exercise-section">
      <div class="section-header">
        <h2>练习 1: 生命周期钩子</h2>
        <button @click="showExercise1 = !showExercise1">
          {{ showExercise1 ? '销毁组件' : '创建组件' }}
        </button>
      </div>
      <div class="knowledge-points">
        <span>onMounted</span>
        <span>onUpdated</span>
        <span>onUnmounted</span>
        <span>定时器清理</span>
      </div>
      <Exercise1Lifecycle v-if="showExercise1" />
      <p v-else class="unmounted-hint">组件已销毁，查看控制台确认 onUnmounted 执行</p>
    </section>

    <!-- 练习 2: Watch -->
    <section class="exercise-section">
      <h2>练习 2: Watch 侦听器</h2>
      <div class="knowledge-points">
        <span>watch</span>
        <span>防抖</span>
        <span>监听数组</span>
      </div>
      <Exercise2Watch />
    </section>

    <!-- 练习 3: Props & Emits -->
    <section class="exercise-section">
      <h2>练习 3: Props 与 Emits</h2>
      <div class="knowledge-points">
        <span>defineProps</span>
        <span>defineEmits</span>
        <span>v-model</span>
      </div>

      <div class="exercise-card props-demo">
        <h3>⭐ 评分组件演示</h3>
        <p class="description">子组件接收 rating prop，发送 update:rating 事件</p>

        <div class="demo-area">
          <div class="parent-controls">
            <p>父组件控制：当前评分 = <strong>{{ rating }}</strong></p>
            <div class="preset-ratings">
              <button @click="rating = 1">设为 1 星</button>
              <button @click="rating = 3">设为 3 星</button>
              <button @click="rating = 5">设为 5 星</button>
              <button @click="rating = 0">清零</button>
            </div>
          </div>

          <div class="child-area">
            <p>子组件（可交互）:</p>
            <Exercise3PropsEmits
              :rating="rating"
              :max-rating="5"
              @update:rating="handleRatingChange"
              @hover="handleHover"
            />
            <p class="hover-info">{{ hoverInfo }}</p>
          </div>

          <div class="child-area">
            <p>子组件（只读模式）:</p>
            <Exercise3PropsEmits
              :rating="rating"
              :max-rating="5"
              :readonly="true"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 练习 4: Ref & Expose -->
    <section class="exercise-section">
      <h2>练习 4: 模板引用与 defineExpose</h2>
      <div class="knowledge-points">
        <span>ref</span>
        <span>defineExpose</span>
        <span>父调用子方法</span>
      </div>

      <div class="exercise-card ref-demo">
        <h3>🎬 父组件远程控制</h3>
        <p class="description">父组件通过 ref 调用子组件暴露的方法</p>

        <div class="parent-controls">
          <button @click="parentControlPlay">父组件调用 play()</button>
          <button @click="parentControlPause">父组件调用 pause()</button>
          <button @click="parentControlReset">父组件调用 reset()</button>
        </div>

        <Exercise4RefExpose ref="videoPlayerRef" />
      </div>
    </section>

    <!-- 练习 5: Provide/Inject -->
    <section class="exercise-section">
      <h2>练习 5: Provide/Inject 跨层通信</h2>
      <div class="knowledge-points">
        <span>provide</span>
        <span>inject</span>
        <span>响应式传递</span>
      </div>
      <Exercise5ProvideInject />
    </section>

    <!-- 总结 -->
    <section class="summary-section">
      <h2>🎯 知识点总结</h2>
      <table>
        <thead>
          <tr>
            <th>知识点</th>
            <th>用途</th>
            <th>练习</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>生命周期钩子</td>
            <td>组件创建、更新、销毁时执行代码</td>
            <td>练习 1</td>
          </tr>
          <tr>
            <td>watch</td>
            <td>监听数据变化，执行副作用</td>
            <td>练习 2</td>
          </tr>
          <tr>
            <td>props / emits</td>
            <td>父子组件数据传递与事件通信</td>
            <td>练习 3</td>
          </tr>
          <tr>
            <td>ref / defineExpose</td>
            <td>DOM 引用和组件方法暴露</td>
            <td>练习 4</td>
          </tr>
          <tr>
            <td>provide / inject</td>
            <td>跨层级组件通信</td>
            <td>练习 5</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.exercises-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
}

.intro {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.exercise-section {
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exercise-section h2 {
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
}

.knowledge-points {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.knowledge-points span {
  padding: 4px 12px;
  background: #e3f2fd;
  color: #1565c0;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.unmounted-hint {
  padding: 20px;
  text-align: center;
  color: #f44336;
  background: #ffebee;
  border-radius: 8px;
}

.exercise-card {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
}

.exercise-card h3 {
  margin-bottom: 10px;
  color: #333;
}

.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

.demo-area {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
}

.parent-controls {
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255,255,255,0.8);
  border-radius: 6px;
}

.preset-ratings {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.preset-ratings button {
  padding: 6px 12px;
  font-size: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.child-area {
  margin: 15px 0;
  padding: 15px;
  background: white;
  border-radius: 8px;
}

.child-area p {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.hover-info {
  color: #ff9800;
  font-size: 12px;
  min-height: 20px;
}

.ref-demo .parent-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.ref-demo .parent-controls button {
  padding: 8px 16px;
  background: #9c27b0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* 总结表格 */
.summary-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 25px;
  border-radius: 12px;
  color: white;
}

.summary-section h2 {
  border-bottom-color: rgba(255,255,255,0.3);
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255,255,255,0.95);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  color: #333;
}

th {
  background: rgba(102, 126, 234, 0.1);
  font-weight: 600;
}

tr:not(:last-child) td {
  border-bottom: 1px solid #eee;
}

/* 通用按钮样式 */
button {
  transition: transform 0.2s, opacity 0.2s;
}

button:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}
</style>
