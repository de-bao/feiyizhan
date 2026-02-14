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
        ref="chatAreaRef"
        :messages="currentChatMessages"
        :is-chat-mode="isChatMode"
        :is-loading="isLoading"
        :on-drag-over="dragHandlers.onDragOver"
        :on-drag-leave="dragHandlers.onDragLeave"
        :on-drop="dragHandlers.onDrop"
      />

      <!-- 拖拽覆盖层 -->
      <DragOverlay :is-visible="isDragging" />

      <!-- 输入区域 -->
      <InputArea v-model="inputValue" @send="handleSend" @attach="handleAttach">
        <SuggestionCards v-if="!isChatMode" @card-click="handleExampleClick" />
      </InputArea>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { MODELS } from './constants'
import { useDragAndDrop } from './composables/useDragAndDrop'
import {
  sendChatMessage,
  saveChatToServer,
  loadChatsFromServer,
  loadChatFromServer,
  deleteChatFromServer
} from './services/api'
import {
  saveChatsToLocal,
  loadChatsFromLocal,
  saveCurrentChatId,
  loadCurrentChatId,
  saveChatIdCounter,
  loadChatIdCounter
} from './services/storage'
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
const isLoading = ref(false) // API请求加载状态
const chatAreaRef = ref(null) // ChatArea组件引用

// 聊天会话管理
const chats = ref(new Map()) // Map<chatId, { id, name, messages, serverId? }>
const currentChatId = ref(null)
let chatIdCounter = loadChatIdCounter()
const isSyncing = ref(false) // 同步状态

// 从本地存储加载聊天记录
const loadedChats = loadChatsFromLocal()
if (loadedChats.size > 0) {
  chats.value = loadedChats
  // 恢复聊天ID计数器（取最大值+1）
  const maxId = Math.max(...Array.from(loadedChats.keys()), 0)
  chatIdCounter = maxId + 1
  saveChatIdCounter(chatIdCounter)
}

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

// 自动保存聊天记录到本地存储（防抖处理）
let saveTimer = null
let syncTimer = null
watch(chats, () => {
  // 防抖：500ms内只保存一次
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    saveChatsToLocal(chats.value)
  }, 500)
  
  // 同步到服务器（防抖：2秒内只同步一次，避免频繁请求）
  if (syncTimer) clearTimeout(syncTimer)
  syncTimer = setTimeout(() => {
    syncChatsToServer()
  }, 2000)
}, { deep: true })

// 保存当前聊天ID
watch(currentChatId, (newId) => {
  if (newId !== null) {
    saveCurrentChatId(newId)
  }
})

// 同步聊天记录到服务器（后台异步，不阻塞UI）
async function syncChatsToServer() {
  // 只在有网络连接时同步
  if (!navigator.onLine || isSyncing.value) return
  
  try {
    isSyncing.value = true
    
    // 遍历所有聊天，同步到服务器
    for (const [localId, chat] of chats.value.entries()) {
      // 只同步有消息的聊天
      if (chat.messages && chat.messages.length > 0) {
        try {
          const result = await saveChatToServer(
            chat.serverId || null, // 如果有serverId则更新，否则新建
            chat.name,
            chat.messages
          )
          
          // 保存服务器返回的session_id
          if (result.session_id && !chat.serverId) {
            chat.serverId = result.session_id
          }
        } catch (error) {
          // 单个聊天同步失败不影响其他聊天
          console.warn(`同步聊天 ${localId} 失败:`, error)
        }
      }
    }
  } catch (error) {
    console.error('同步到服务器失败:', error)
  } finally {
    isSyncing.value = false
  }
}

// 从服务器加载聊天记录（可选，用于多设备同步）
async function loadChatsFromServerOnMount() {
  if (!navigator.onLine) return
  
  try {
    const serverChats = await loadChatsFromServer()
    
    // 合并服务器和本地数据（服务器优先）
    for (const serverChat of serverChats) {
      // 检查本地是否已有该聊天（通过serverId匹配）
      let localChat = null
      for (const [localId, chat] of chats.value.entries()) {
        if (chat.serverId === serverChat.id) {
          localChat = chat
          break
        }
      }
      
      if (!localChat) {
        // 服务器有但本地没有，从服务器加载详情
        try {
          const chatDetail = await loadChatFromServer(serverChat.id)
          const newLocalId = chatIdCounter++
          saveChatIdCounter(chatIdCounter)
          
          chats.value.set(newLocalId, {
            id: newLocalId,
            serverId: serverChat.id,
            name: chatDetail.name,
            messages: chatDetail.messages
          })
        } catch (error) {
          console.warn(`加载服务器聊天 ${serverChat.id} 失败:`, error)
        }
      }
    }
  } catch (error) {
    console.warn('从服务器加载聊天失败:', error)
    // 失败不影响本地使用
  }
}

// 检测移动端并默认隐藏侧边栏（只在真正的触摸设备上）
onMounted(async () => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
  if (window.innerWidth <= 768 && isTouchDevice) {
    sidebarCollapsed.value = true
  }
  
  // 尝试从服务器加载聊天记录（后台进行，不阻塞）
  loadChatsFromServerOnMount()
  
  // 恢复当前聊天ID
  const savedChatId = loadCurrentChatId()
  if (savedChatId && chats.value.has(savedChatId)) {
    currentChatId.value = savedChatId
  } else {
    // 如果没有保存的聊天或聊天不存在，创建新聊天
    if (chats.value.size === 0) {
      handleNewChat()
    } else {
      // 使用第一个聊天
      currentChatId.value = Array.from(chats.value.keys())[0]
    }
  }
})

// 处理附件
const handleAttach = async (attachment) => {
  if (!attachment) return
  
  // 确保有当前聊天会话
  if (!currentChatId.value) {
    handleNewChat()
  }
  
  const chat = chats.value.get(currentChatId.value)
  if (!chat) return
  
  // 构建附件消息
  let messageContent = ''
  let attachmentInfo = null
  
  if (attachment.source === 'network' && attachment.url) {
    // 联网文档
    messageContent = `请帮我分析这个文档：${attachment.url}`
    attachmentInfo = {
      type: 'document',
      url: attachment.url,
      source: 'network'
    }
  } else if (attachment.file) {
    // 本地文件
    const file = attachment.file
    if (file.fileType === 'image') {
      // 图片：显示图片并询问
      messageContent = '请帮我分析这张图片'
      attachmentInfo = {
        type: 'image',
        name: file.name,
        data: file.data,
        size: file.size
      }
    } else {
      // 其他文件：显示文件名和内容（如果有）
      messageContent = `请帮我分析这个文件：${file.name}`
      if (file.text) {
        messageContent += `\n\n文件内容：\n${file.text}`
      }
      attachmentInfo = {
        type: file.fileType,
        name: file.name,
        size: file.size,
        text: file.text || null
      }
    }
  }
  
  if (messageContent) {
    // 添加用户消息（包含附件信息）
    chat.messages.push({
      role: 'user',
      content: messageContent,
      attachment: attachmentInfo
    })
    
    // 如果是第一条消息，自动设置标题
    if (chat.messages.length === 1) {
      const title = attachmentInfo?.name || attachmentInfo?.url || '新对话'
      chat.name = title.slice(0, 20) || `新对话 ${chat.id}`
    }
    
    // 滚动到顶部（等待DOM更新）
    nextTick(() => {
      if (chatAreaRef.value) {
        chatAreaRef.value.scrollToTop()
      }
    })
    
    // 发送消息
    await handleSendMessage(chat)
  }
}

// 发送消息（内部函数，处理AI回复）
const handleSendMessage = async (chat) => {
  // 清空输入框
  inputValue.value = ''
  
  // 设置加载状态
  isLoading.value = true
  
  try {
    // 调用AI API获取回复
    const response = await sendChatMessage(chat.messages, selectedModel.value)
    
    // 添加AI回复
    chat.messages.push({
      role: response.role,
      content: response.content
    })
    
    // 消息发送成功后，立即同步到服务器（不等待防抖）
    if (navigator.onLine) {
      syncChatsToServer().catch(err => {
        console.warn('消息发送后同步失败:', err)
      })
    }
  } catch (error) {
    // 错误处理：添加错误消息
    let errorMessage = error.message || '请求失败，请稍后重试'
    
    // 如果是连接错误，提供更详细的提示
    if (errorMessage.includes('Connection error') || errorMessage.includes('连接')) {
      errorMessage = '无法连接到AI服务\n\n可能的原因：\n1. 后端服务无法访问OpenAI API服务器\n2. 网络连接问题\n3. API服务器地址配置错误\n\n请检查后端配置和网络连接。'
    }
    
    chat.messages.push({
      role: 'assistant',
      content: `❌ 错误：${errorMessage}`
    })
    console.error('发送消息失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 拖拽上传
import { processFiles } from './utils/fileHandler'
const { isDragging, handlers: dragHandlers } = useDragAndDrop(async (files) => {
  if (!files || files.length === 0) return
  
  try {
    const processedFiles = await processFiles(files)
    
    // 处理每个文件
    for (const file of processedFiles) {
      await handleAttach({
        type: file.fileType,
        file: file,
        source: 'local'
      })
    }
  } catch (error) {
    console.error('处理拖拽文件失败:', error)
  }
})

// 事件处理函数
const handleSend = async (text) => {
  if (!text?.trim() || isLoading.value) return

  // 确保有当前聊天会话
  if (!currentChatId.value) {
    handleNewChat()
  }

  const chat = chats.value.get(currentChatId.value)
  if (!chat) return

  // 添加用户消息
  chat.messages.push({ role: 'user', content: text.trim() })
  
  // 如果这是第一条消息，自动设置聊天标题
  if (chat.messages.length === 1) {
    const title = text.trim().slice(0, 20) // 取前20个字符作为标题
    chat.name = title || `新对话 ${chat.id}`
  }
  
  // 清空输入框
  inputValue.value = ''
  
  // 滚动到最新消息（等待DOM更新）
  nextTick(() => {
    if (chatAreaRef.value) {
      chatAreaRef.value.scrollToLatest()
    }
  })
  
  // 设置加载状态
  isLoading.value = true
  
  try {
    // 调用AI API获取回复
    const response = await sendChatMessage(chat.messages, selectedModel.value)
    
    // 添加AI回复
    chat.messages.push({
      role: response.role,
      content: response.content
    })
    
    // 消息发送成功后，立即同步到服务器（不等待防抖）
    if (navigator.onLine) {
      syncChatsToServer().catch(err => {
        console.warn('消息发送后同步失败:', err)
      })
    }
  } catch (error) {
    // 错误处理：添加错误消息
    let errorMessage = error.message || '请求失败，请稍后重试'
    
    // 如果是连接错误，提供更详细的提示
    if (errorMessage.includes('Connection error') || errorMessage.includes('连接')) {
      errorMessage = '无法连接到AI服务\n\n可能的原因：\n1. 后端服务无法访问OpenAI API服务器\n2. 网络连接问题\n3. API服务器地址配置错误\n\n请检查后端配置和网络连接。'
    }
    
    chat.messages.push({
      role: 'assistant',
      content: `❌ 错误：${errorMessage}`
    })
    console.error('发送消息失败:', error)
  } finally {
    isLoading.value = false
  }
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
  saveChatIdCounter(chatIdCounter) // 保存计数器
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
const handleDeleteChat = async (chatId) => {
  const chat = chats.value.get(chatId)
  
  // 如果服务器有记录，先删除服务器记录
  if (chat && chat.serverId && navigator.onLine) {
    try {
      await deleteChatFromServer(chat.serverId)
    } catch (error) {
      console.warn('从服务器删除聊天失败:', error)
      // 即使服务器删除失败，也继续删除本地记录
    }
  }
  
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
  // 删除后立即保存
  saveChatsToLocal(chats.value)
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
