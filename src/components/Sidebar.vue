<template>
  <div :class="['sidebar', { collapsed: collapsed }]">
    <!-- 顶部按钮 -->
    <div class="sidebar-header">
      <div
        class="header-button"
        @click="$emit('toggle')"
        @mouseenter="handleHover"
        @mouseleave="handleLeave"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 5H17M3 10H17M3 15H17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>

    <!-- 搜索框 -->
    <div v-if="!collapsed" class="sidebar-search">
      <div class="search-box">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM13 13l-3-3"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <input type="text" placeholder="Q 搜索" class="search-input" />
      </div>
    </div>

    <!-- 导航项 -->
    <div v-if="!collapsed" class="sidebar-content">
        <div
          v-for="item in navItems"
          :key="item.id"
          :class="['nav-item', { active: item.active }]"
          @mouseenter="!item.active && handleHover($event)"
          @mouseleave="!item.active && handleLeave($event)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span :class="['nav-label', { 'font-medium': item.active }]">{{ item.label }}</span>
        </div>

      <!-- 分组 -->
      <div class="group-header">
        <span class="group-title">分组</span>
        <span class="group-add">➕</span>
      </div>
      <div class="group-item" @mouseenter="handleHover" @mouseleave="handleLeave">
        <span class="nav-icon">📄</span>
        <span class="nav-label">分组示例</span>
      </div>

      <!-- 聊天历史 -->
      <div class="chat-header">
        <span class="chat-title">聊天</span>
        <span class="chat-add" @click="handleNewChat" @mouseenter="handleAddHover" @mouseleave="handleAddLeave">➕</span>
      </div>
      <div
        v-for="chat in chatHistory"
        :key="chat.id"
        class="chat-item"
        @mouseenter="(e) => handleChatHover(e, chat.id)"
        @mouseleave="(e) => handleChatLeave(e, chat.id)"
      >
        <span class="chat-item-name" @click="handleChatClick(chat.id)">{{ chat.name }}</span>
        <div v-if="hoveredChatId === chat.id" class="chat-item-actions">
          <div class="chat-menu-trigger" @click.stop="showChatMenu(chat.id)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="4" r="1" fill="currentColor" />
              <circle cx="8" cy="8" r="1" fill="currentColor" />
              <circle cx="8" cy="12" r="1" fill="currentColor" />
            </svg>
          </div>
          <div v-if="activeChatMenuId === chat.id" ref="chatMenuRef" class="chat-menu">
            <div class="chat-menu-item" @click.stop="handleRenameChat(chat.id)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 2.5L13.5 4.5L5.5 12.5H3.5V10.5L11.5 2.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>重命名</span>
            </div>
            <div class="chat-menu-item" @click.stop="handleDeleteChat(chat.id)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 4.5H12.5M6.5 7.5V11.5M9.5 7.5V11.5M5.5 4.5V13.5C5.5 14.0523 5.94772 14.5 6.5 14.5H9.5C10.0523 14.5 10.5 14.0523 10.5 13.5V4.5M5.5 4.5H10.5M5.5 4.5H4.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div v-if="!collapsed" class="sidebar-footer">
      <div ref="userDropdownRef" class="user-dropdown">
        <div class="footer-user" @click="showUserDropdown = !showUserDropdown" @mouseenter="handleHover" @mouseleave="handleLeave">
          <div class="user-avatar"></div>
          <span>用户名称</span>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M3.5 5.00024L6.5 8.00024L9.5 5.00024"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div v-if="showUserDropdown" class="user-dropdown-menu">
          <div class="user-dropdown-item" @click="showUserDropdown = false" @mouseenter="handleItemHover" @mouseleave="handleItemLeave">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2L10 6L14 7L10 8L8 12L6 8L2 7L6 6L8 2Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>设置</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NAV_ITEMS } from '../constants'
import { useClickOutside } from '../composables/useClickOutside'

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle', 'new-chat', 'select-chat'])

const navItems = NAV_ITEMS
const showUserDropdown = ref(false)
const hoveredChatId = ref(null)
const activeChatMenuId = ref(null)
const chatMenuRef = ref(null)

// 聊天历史
const chatHistory = ref([
  { id: 1, name: '新对话 1' },
  { id: 2, name: '新对话 2' }
])

let chatIdCounter = 3

// 点击外部关闭用户下拉菜单
const userDropdownRef = useClickOutside(() => {
  showUserDropdown.value = false
})

// 点击外部关闭聊天菜单
const handleClickOutside = (event) => {
  if (chatMenuRef.value && !chatMenuRef.value.contains(event.target)) {
    // 检查是否点击的是菜单触发器
    if (!event.target.closest('.chat-menu-trigger')) {
      activeChatMenuId.value = null
    }
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// 新建聊天
const handleNewChat = () => {
  const newChat = {
    id: chatIdCounter++,
    name: `新对话 ${chatIdCounter - 2}`
  }
  chatHistory.value.unshift(newChat)
  emit('new-chat', newChat.id)
}

// 点击聊天项
const handleChatClick = (chatId) => {
  emit('select-chat', chatId)
}

// 聊天项悬停
const handleChatHover = (e, chatId) => {
  hoveredChatId.value = chatId
  handleHover(e)
}

const handleChatLeave = (e, chatId) => {
  hoveredChatId.value = null
  handleLeave(e)
}

// 显示聊天菜单
const showChatMenu = (chatId) => {
  activeChatMenuId.value = activeChatMenuId.value === chatId ? null : chatId
}

// 重命名聊天
const handleRenameChat = (chatId) => {
  const chat = chatHistory.value.find(c => c.id === chatId)
  if (chat) {
    const newName = prompt('请输入新名称:', chat.name)
    if (newName && newName.trim()) {
      chat.name = newName.trim()
    }
  }
  activeChatMenuId.value = null
}

// 删除聊天
const handleDeleteChat = (chatId) => {
  const index = chatHistory.value.findIndex(c => c.id === chatId)
  if (index > -1) {
    chatHistory.value.splice(index, 1)
  }
  activeChatMenuId.value = null
}

const handleHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f3f4f6'
}

const handleLeave = (e) => {
  e.currentTarget.style.backgroundColor = 'transparent'
}

const handleAddHover = (e) => {
  e.currentTarget.style.color = '#0066ff'
}

const handleAddLeave = (e) => {
  e.currentTarget.style.color = '#9ca3af'
}

const handleItemHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f3f4f6'
}

const handleItemLeave = (e) => {
  e.currentTarget.style.backgroundColor = 'transparent'
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  background-color: #f5f5f5;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.header-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.sidebar-search {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  background: transparent;
}

.sidebar-content {
  padding: 8px;
  flex: 1;
  overflow: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 4px;
}

.nav-item.active {
  background-color: #e0e7ff;
  color: #0066ff;
}

.nav-item:not(.active) {
  color: #6b7280;
}

.nav-item:not(.active):last-of-type {
  margin-bottom: 16px;
}


.nav-icon {
  font-size: 16px;
}

.nav-label {
  font-size: 14px;
}

.font-medium {
  font-weight: 500;
}

.group-header {
  margin-top: 16px;
  margin-bottom: 8px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.group-title {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
}

.group-add {
  cursor: pointer;
  font-size: 12px;
  color: #9ca3af;
}

.chat-header {
  margin-top: 16px;
  margin-bottom: 8px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-title {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
}

.chat-add {
  cursor: pointer;
  font-size: 12px;
  color: #9ca3af;
  transition: color 0.2s;
}

.chat-item {
  padding: 8px 12px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.chat-item-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-item-actions {
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.chat-menu-trigger {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  color: #6b7280;
  transition: background-color 0.2s;
}

.chat-menu-trigger:hover {
  background-color: #e5e7eb;
}

.chat-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 4px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  z-index: 1000;
  overflow: hidden;
}

.chat-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #1f2937;
  transition: background-color 0.2s;
}

.chat-menu-item:hover {
  background-color: #f3f4f6;
}

.chat-menu-item svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.group-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}


.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
}


.user-dropdown {
  position: relative;
}

.footer-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  width: 100%;
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #d1d5db;
}

.footer-user span {
  font-size: 14px;
  color: #6b7280;
  flex: 1;
}

.user-dropdown-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
}

.user-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #1f2937;
  transition: background-color 0.2s;
}

.user-dropdown-item svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

/* 移动端响应式 - 只在真正的触摸设备上应用 */
@media (max-width: 768px) and (pointer: coarse) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .sidebar.collapsed {
    width: 60px;
    overflow: visible;
  }

  .sidebar.collapsed .sidebar-header {
    width: 100%;
    padding: 10px;
    justify-content: center;
  }

  .sidebar.collapsed .header-button {
    width: 40px;
    height: 40px;
  }

  .sidebar-header {
    padding: 10px 12px;
  }

  .sidebar-search {
    padding: 10px 12px;
  }

  .sidebar-content {
    padding: 6px;
  }

  .nav-item {
    padding: 6px 10px;
    font-size: 13px;
  }

  .chat-item {
    padding: 6px 10px;
    font-size: 13px;
  }

  .sidebar-footer {
    padding: 10px 12px;
  }
}
</style>
