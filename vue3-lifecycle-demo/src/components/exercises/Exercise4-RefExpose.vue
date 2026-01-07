<script setup>
import { ref } from 'vue'

/**
 * 练习 4: 模板引用与 defineExpose
 *
 * 任务：实现一个可控制的视频播放器组件
 *
 * 要求：
 * 1. 使用 ref 获取 video 元素的引用
 * 2. 实现 play(), pause(), reset() 方法
 * 3. 使用 defineExpose 暴露方法给父组件
 */

// TODO(human): 创建 video 元素的模板引用
const videoRef = ref(null)

// 播放状态
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

// TODO(human): 实现播放方法
// 提示：调用 videoRef.value.play()
const play = () => {
  if (videoRef.value) {
    videoRef.value.play()
  }
}

// TODO(human): 实现暂停方法
const pause = () => {
  if (videoRef.value) {
    videoRef.value.pause()
  }
}

// TODO(human): 实现重置方法（回到开头并暂停）
// 提示：设置 videoRef.value.currentTime = 0
const reset = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = 0
    videoRef.value.pause()
  }
}

// 获取当前播放时间（内部使用）
const handleTimeUpdate = () => {
  if (videoRef.value) {
    currentTime.value = Math.floor(videoRef.value.currentTime)
  }
}

// 视频加载完成
const handleLoadedMetadata = () => {
  if (videoRef.value) {
    duration.value = Math.floor(videoRef.value.duration)
  }
}

// TODO(human): 使用 defineExpose 暴露方法给父组件
// 提示：暴露 play, pause, reset, isPlaying, currentTime

defineExpose({
  play,
  pause,
  reset,
  isPlaying,
  currentTime
})

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="video-player">
    <h4>🎬 视频播放器组件</h4>

    <div class="video-container">
      <!-- TODO(human): 添加 ref="videoRef" 到 video 元素 -->
      <video
        ref="videoRef"
        width="100%"
        @timeupdate="handleTimeUpdate"
        @loadedmetadata="handleLoadedMetadata"
        @play="isPlaying = true"
        @pause="isPlaying = false"
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        您的浏览器不支持视频播放
      </video>
    </div>

    <div class="progress-bar">
      <span>{{ formatTime(currentTime) }}</span>
      <div class="bar">
        <div
          class="progress"
          :style="{ width: duration ? (currentTime / duration * 100) + '%' : '0%' }"
        ></div>
      </div>
      <span>{{ formatTime(duration) }}</span>
    </div>

    <div class="controls">
      <button @click="play" :disabled="isPlaying">▶ 播放</button>
      <button @click="pause" :disabled="!isPlaying">⏸ 暂停</button>
      <button @click="reset">⏮ 重置</button>
    </div>

    <p class="status">
      状态: <strong>{{ isPlaying ? '播放中' : '已暂停' }}</strong>
    </p>
  </div>
</template>

<style scoped>
.video-player {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 12px;
  border: 2px solid #9c27b0;
}

.video-player h4 {
  color: #7b1fa2;
  margin-bottom: 15px;
}

.video-container {
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.progress-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
  font-size: 12px;
  color: #666;
}

.bar {
  flex: 1;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #9c27b0, #e91e63);
  transition: width 0.1s;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.controls button {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #9c27b0, #e91e63);
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status {
  text-align: center;
  margin-top: 10px;
  color: #666;
}
</style>
