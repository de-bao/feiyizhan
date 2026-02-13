<template>
  <div
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
          :class="['message-item', { 'user-message': message.role === 'user' }]"
        >
          <div :class="['avatar', { 'user-avatar': message.role === 'user' }]">
            {{ message.role === 'user' ? '我' : '元' }}
          </div>
          <div :class="['message-content', { 'user-content': message.role === 'user' }]">
            {{ message.content }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  isChatMode: {
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
  white-space: pre-wrap;
  background: white;
  color: #1f2937;
  border: 1px solid #e5e7eb;
}

.user-content {
  background: #0066ff;
  color: white;
  border: none;
}
</style>
