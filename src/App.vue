<template>
  <div class="app">
    <!-- 移动端遮罩层（侧边栏展开时显示） -->
    <div v-if="!sidebarCollapsed" class="sidebar-overlay" @click="sidebarCollapsed = true"></div>

    <!-- 左侧导航栏 -->
    <Sidebar 
      :collapsed="sidebarCollapsed" 
      :current-chat-id="currentChatId"
      :chat-history="Array.from(chats.values())"
      @toggle="sidebarCollapsed = !sidebarCollapsed"
      @new-chat="handleNewChat"
      @select-chat="handleSelectChat"
      @rename-chat="handleRenameChat"
      @delete-chat="handleDeleteChat"
    />

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 顶部栏 -->
      <Header 
        :selected-model="selectedModel" 
        :sidebar-collapsed="sidebarCollapsed"
        @update:selected-model="selectedModel = $event"
        @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed"
      />

      <!-- 聊天区域 -->
      <ChatArea
        :messages="currentChatMessages"
        :is-chat-mode="isChatMode"
        :on-drag-over="dragHandlers.onDragOver"
        :on-drag-leave="dragHandlers.onDragLeave"
        :on-drop="dragHandlers.onDrop"
      />

      <!-- 拖拽覆盖层 -->
      <DragOverlay :is-visible="isDragging" />

      <!-- 输入区域 -->
      <InputArea v-model="inputValue" @send="handleSend">
        <SuggestionCards v-if="!isChatMode" @card-click="handleExampleClick" />
      </InputArea>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { MODELS } from './constants'
import { useDragAndDrop } from './composables/useDragAndDrop'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import ChatArea from './components/ChatArea.vue'
import SuggestionCards from './components/SuggestionCards.vue'
import InputArea from './components/InputArea.vue'
import DragOverlay from './components/DragOverlay.vue'

// 状态管理
const inputValue = ref('')
const selectedModel = ref(MODELS.QWEN)
const sidebarCollapsed = ref(false)

// 聊天会话管理
const chats = ref(new Map()) // Map<chatId, { id, name, messages }>
const currentChatId = ref(null)
let chatIdCounter = 1

// 当前聊天的消息
const currentChatMessages = computed(() => {
  if (!currentChatId.value || !chats.value.has(currentChatId.value)) {
    return []
  }
  return chats.value.get(currentChatId.value).messages || []
})

// 当前聊天是否有消息（判断是否显示建议卡片）
const isChatMode = computed(() => {
  return currentChatMessages.value.length > 0
})

// 检测移动端并默认隐藏侧边栏（只在真正的触摸设备上）
onMounted(() => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
  if (window.innerWidth <= 768 && isTouchDevice) {
    sidebarCollapsed.value = true
  }
  
  // 初始化一个默认聊天
  handleNewChat()
})

// 拖拽上传
const { isDragging, handlers: dragHandlers } = useDragAndDrop((files) => {
  console.log('Files dropped:', files)
  // TODO: 处理文件上传
})

// 事件处理函数
const handleSend = (text) => {
  if (!text?.trim()) return

  // 确保有当前聊天会话
  if (!currentChatId.value) {
    handleNewChat()
  }

  const chat = chats.value.get(currentChatId.value)
  if (!chat) return

  // 添加用户消息
  chat.messages.push({ role: 'user', content: text })
  
  // TODO: 调用AI API获取回复
  setTimeout(() => {
    chat.messages.push({ role: 'assistant', content: '这是AI的回复（待接入真实API）' })
  }, 500)
  
  inputValue.value = ''
}

const handleExampleClick = (text) => {
  inputValue.value = text
  setTimeout(() => {
    handleSend(text)
  }, 100)
}

// 新建聊天
const handleNewChat = () => {
  // 创建新聊天会话
  const newChatId = chatIdCounter++
  const newChat = {
    id: newChatId,
    name: `新对话 ${newChatId}`,
    messages: []
  }
  
  chats.value.set(newChatId, newChat)
  currentChatId.value = newChatId
  inputValue.value = ''
}

// 选择聊天
const handleSelectChat = (chatId) => {
  if (chats.value.has(chatId)) {
    currentChatId.value = chatId
    inputValue.value = ''
  }
}

// 重命名聊天
const handleRenameChat = (chatId, newName) => {
  const chat = chats.value.get(chatId)
  if (chat) {
    chat.name = newName
  }
}

// 删除聊天
const handleDeleteChat = (chatId) => {
  chats.value.delete(chatId)
  // 如果删除的是当前聊天，切换到其他聊天或创建新聊天
  if (currentChatId.value === chatId) {
    if (chats.value.size > 0) {
      // 切换到第一个聊天
      currentChatId.value = Array.from(chats.value.keys())[0]
    } else {
      // 创建新聊天
      handleNewChat()
    }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
  height: 100dvh; /* 动态视口高度，移动端更准确 */
  background-color: #ffffff;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

/* 移动端响应式 - 只在真正的触摸设备上应用 */
@media (max-width: 768px) and (pointer: coarse) {
  .app {
    position: relative;
  }

  .main-content {
    width: 100%;
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}
</style>
