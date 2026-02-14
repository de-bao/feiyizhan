<template>
  <div
    ref="chatAreaRef"
    class="chat-area"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <template v-if="!isChatMode">
      <h1 class="greeting">Hi，</h1>
      <div class="divider"></div>
      <slot />
    </template>
    <template v-else>
      <div class="messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :ref="el => { if (el) messageRefs[index] = el }"
          :class="['message-item', { 'user-message': message.role === 'user' }]"
        >
          <div :class="['avatar', { 'user-avatar': message.role === 'user' }]">
            {{ message.role === 'user' ? '我' : '元' }}
          </div>
          <div :class="['message-content', { 'user-content': message.role === 'user' }]">
            <!-- 附件显示 -->
            <div v-if="message.attachment" class="message-attachment">
              <div v-if="message.attachment.type === 'image' && message.attachment.data" class="attachment-image">
                <img :src="message.attachment.data" :alt="message.attachment.name || '图片'" />
                <div class="attachment-info">{{ message.attachment.name || '图片' }}</div>
              </div>
              <div v-else-if="message.attachment.type === 'document'" class="attachment-document">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 2H9.5L13 5.5V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V3C3 2.44772 3.44772 2 4 2Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9 2V6H13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>{{ message.attachment.name || message.attachment.url || '文档' }}</span>
              </div>
              <div v-else class="attachment-file">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 2H9.5L13 5.5V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V3C3 2.44772 3.44772 2 4 2Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9 2V6H13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>{{ message.attachment.name || '文件' }}</span>
              </div>
            </div>
            <!-- 消息内容 -->
            <div class="message-text">{{ message.content }}</div>
          </div>
        </div>
        <!-- 加载指示器 -->
        <div v-if="isLoading" class="message-item">
          <div class="avatar">元</div>
          <div class="message-content loading">
            <span class="loading-dot"></span>
            <span class="loading-dot"></span>
            <span class="loading-dot"></span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  isChatMode: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  onDragOver: {
    type: Function,
    default: () => {}
  },
  onDragLeave: {
    type: Function,
    default: () => {}
  },
  onDrop: {
    type: Function,
    default: () => {}
  }
})

const chatAreaRef = ref(null)
const messageRefs = ref({})

// 滚动到最新消息（让最新消息显示在顶部）
const scrollToLatest = () => {
  if (chatAreaRef.value && props.messages.length > 0) {
    // 获取最新消息的索引（最后一条）
    const lastIndex = props.messages.length - 1
    const lastMessageEl = messageRefs.value[lastIndex]
    
    if (lastMessageEl) {
      // 将最新消息滚动到顶部
      lastMessageEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // 如果元素还没渲染，直接滚动到容器顶部（作为后备方案）
      chatAreaRef.value.scrollTop = chatAreaRef.value.scrollHeight
    }
  }
}

// 暴露方法给父组件
defineExpose({
  scrollToLatest
})

// 监听消息变化，自动滚动到最新消息
watch(() => props.messages.length, () => {
  nextTick(() => {
    scrollToLatest()
  })
})

// 监听加载状态变化，加载完成后也滚动
watch(() => props.isLoading, (newVal) => {
  if (!newVal) {
    // 加载完成后滚动到最新消息
    nextTick(() => {
      scrollToLatest()
    })
  }
})
</script>

<style scoped>
.chat-area {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px 200px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.greeting {
  font-size: 48px;
  font-weight: 600;
  color: #1f2937;
  margin: 40px 0 24px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin-bottom: 32px;
}

.messages {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.message-item.user-message {
  flex-direction: row-reverse;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 500;
  background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%);
}

.user-avatar {
  background: #0066ff;
}

.message-content {
  max-width: 70%;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.6;
  word-wrap: break-word;
  background: white;
  color: #1f2937;
  border: 1px solid #e5e7eb;
}

.user-content {
  background: #0066ff;
  color: white;
  border: none;
}

.message-content.loading {
  background: white;
  border: 1px solid #e5e7eb;
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 12px 20px;
}

.loading-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
  animation: loading-bounce 1.4s infinite ease-in-out both;
}

.loading-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading-bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.message-attachment {
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.user-content .message-attachment {
  border-bottom-color: rgba(255, 255, 255, 0.3);
}

.attachment-image {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.attachment-image img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  object-fit: contain;
  background: #f3f4f6;
}

.attachment-info {
  font-size: 12px;
  opacity: 0.8;
}

.attachment-document,
.attachment-file {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  font-size: 13px;
}

.user-content .attachment-document,
.user-content .attachment-file {
  background: rgba(255, 255, 255, 0.2);
}

.message-text {
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* 移动端响应式 - 只在真正的触摸设备上应用 */
@media (max-width: 768px) and (pointer: coarse) {
  .chat-area {
    padding: 20px 12px 200px;
    padding-bottom: calc(200px + env(safe-area-inset-bottom, 0px));
  }

  .greeting {
    font-size: 32px;
    margin: 20px 0 16px;
  }

  .divider {
    margin-bottom: 20px;
  }

  .messages {
    gap: 12px;
  }

  .message-item {
    gap: 8px;
  }

  .avatar {
    width: 28px;
    height: 28px;
    font-size: 11px;
  }

  .message-content {
    max-width: 85%;
    padding: 10px 12px;
    font-size: 13px;
    border-radius: 10px;
  }
}
</style>
