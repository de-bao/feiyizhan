<template>
  <div class="app">
    <!-- 移动端遮罩层 -->
    <div v-if="!sidebarCollapsed" class="sidebar-overlay" @click="sidebarCollapsed = true"></div>

    <!-- 左侧导航栏 -->
    <Sidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 顶部栏 -->
      <Header :selected-model="selectedModel" @update:selected-model="selectedModel = $event" />

      <!-- 聊天区域 -->
      <ChatArea
        :messages="messages"
        :is-chat-mode="isChatMode"
        :on-drag-over="dragHandlers.onDragOver"
        :on-drag-leave="dragHandlers.onDragLeave"
        :on-drop="dragHandlers.onDrop"
      >
        <SuggestionCards @card-click="handleExampleClick" />
      </ChatArea>

      <!-- 拖拽覆盖层 -->
      <DragOverlay :is-visible="isDragging" />

      <!-- 输入区域 -->
      <InputArea v-model="inputValue" @send="handleSend" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
const messages = ref([])
const isChatMode = ref(false)
const selectedModel = ref(MODELS.QWEN)
// 移动端默认隐藏侧边栏
const sidebarCollapsed = ref(false)

// 检测移动端并默认隐藏侧边栏（只在真正的触摸设备上）
onMounted(() => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
  if (window.innerWidth <= 768 && isTouchDevice) {
    sidebarCollapsed.value = true
  }
})

// 拖拽上传
const { isDragging, handlers: dragHandlers } = useDragAndDrop((files) => {
  console.log('Files dropped:', files)
  // TODO: 处理文件上传
})

// 事件处理函数
const handleSend = (text) => {
  if (!text?.trim()) return

  isChatMode.value = true
  messages.value.push({ role: 'user', content: text })
  
  // TODO: 调用AI API获取回复
  setTimeout(() => {
    messages.value.push({ role: 'assistant', content: '这是AI的回复（待接入真实API）' })
  }, 500)
  
  inputValue.value = ''
}

const handleExampleClick = (text) => {
  inputValue.value = text
  setTimeout(() => {
    handleSend(text)
  }, 100)
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
