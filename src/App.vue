<template>
  <div class="app">
    <!-- 左侧导航栏 -->
    <Sidebar />

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
import { ref } from 'vue'
import { MODELS, COLORS } from './constants'
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
const selectedModel = ref(MODELS.HUNYUAN)

// 拖拽上传
const { isDragging, handlers: dragHandlers } = useDragAndDrop((files) => {
  // TODO: 处理文件上传
  console.log('Files dropped:', files)
})

// 事件处理函数
const handleSend = (text) => {
  if (!text?.trim()) return

  isChatMode.value = true
  messages.value.push({ role: 'user', content: text })
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
</style>
