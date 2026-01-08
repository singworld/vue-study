/**
 * 练习 2: Pinia 异步 Action + TypeScript
 *
 * 目标：掌握异步 action 和类型定义
 *
 * 知识点：
 * - 异步 action（async/await）
 * - TypeScript 类型定义
 * - 加载状态管理
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// ==================== 类型定义 ====================

// TODO(human): 定义频道数据类型
interface Channel {
  id: number
  name: string
}

// TODO(human): 定义 API 响应类型
interface ChannelResponse {
  data: {
    channels: Channel[]
  }
}

export const useChannelStore = defineStore('channel', () => {
  // ==================== State ====================

  // 频道列表
  const channels = ref<Channel[]>([])

  // TODO(human): 添加 loading 状态，类型为 boolean
  const loading = ref(false)

  // TODO(human): 添加 error 状态，类型为 string | null
  const error = ref<string | null>(null)

  // 当前选中的频道 ID
  const activeChannelId = ref<number | null>(null)

  // ==================== Getters ====================

  // TODO(human): 实现 activeChannel getter
  // 根据 activeChannelId 返回当前选中的频道对象
  const activeChannel = computed(() => {
    return channels.value.find(c => c.id === activeChannelId.value) || null
  })

  // 频道数量
  const channelCount = computed(() => channels.value.length)

  // ==================== Actions ====================

  // TODO(human): 实现 fetchChannels 异步方法
  // 1. 设置 loading 为 true
  // 2. 清空 error
  // 3. 模拟 API 请求（使用 setTimeout 延迟 500ms）
  // 4. 设置 channels 数据
  // 5. 设置 loading 为 false
  // 6. 如果出错，设置 error 信息

  async function fetchChannels() {
    loading.value = true
    error.value = null

    try {
      // 模拟 API 请求
      await new Promise(resolve => setTimeout(resolve, 500))

      // 模拟返回数据
      const mockData: ChannelResponse = {
        data: {
          channels: [
            { id: 0, name: '推荐' },
            { id: 1, name: '科技' },
            { id: 2, name: '娱乐' },
            { id: 3, name: '体育' },
            { id: 4, name: '财经' }
          ]
        }
      }

      channels.value = mockData.data.channels

      // 默认选中第一个
      const firstChannel = channels.value[0]
      if (firstChannel && activeChannelId.value === null) {
        activeChannelId.value = firstChannel.id
      }
    } catch (e) {
      error.value = '获取频道失败'
    } finally {
      loading.value = false
    }
  }

  // 设置当前频道
  function setActiveChannel(id: number) {
    activeChannelId.value = id
  }

  return {
    // state
    channels,
    loading,
    error,
    activeChannelId,
    // getters
    activeChannel,
    channelCount,
    // actions
    fetchChannels,
    setActiveChannel
  }
})
