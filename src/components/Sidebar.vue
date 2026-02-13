<template>
  <div class="sidebar">
    <!-- 顶部按钮 -->
    <div class="sidebar-header">
      <div
        v-for="i in 2"
        :key="i"
        class="header-button"
        @mouseenter="handleHover"
        @mouseleave="handleLeave"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            v-if="i === 1"
            d="M3 5H17M3 10H17M3 15H17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            v-else
            d="M10 4V16M4 10H16"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="sidebar-search">
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
    <div class="sidebar-content">
      <div
        v-for="item in navItems"
        :key="item.id"
        :class="['nav-item', { active: item.active }]"
        @mouseenter="!item.active && handleHover($event)"
        @mouseleave="!item.active && handleLeave($event)"
      >
        <div v-if="item.id === 'yuanbao'" class="yuanbao-icon">元</div>
        <span v-else class="nav-icon">{{ item.icon }}</span>
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
      </div>
      <div
        v-for="i in 5"
        :key="i"
        class="chat-item"
        @mouseenter="handleHover"
        @mouseleave="handleLeave"
      >
        💬 {{ `0112新对话 ${i}` }}
      </div>
    </div>

    <!-- 底部 -->
    <div class="sidebar-footer">
      <div class="footer-item" @mouseenter="handleHover" @mouseleave="handleLeave">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2V14M2 8H14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span>前往下载中心</span>
      </div>
      <div class="footer-user" @mouseenter="handleHover" @mouseleave="handleLeave">
        <div class="user-avatar"></div>
        <span>用户名称</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NAV_ITEMS } from '../constants'

const navItems = NAV_ITEMS

const handleHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f3f4f6'
}

const handleLeave = (e) => {
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

.yuanbao-icon {
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bold;
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

.group-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chat-header {
  margin-top: 16px;
  margin-bottom: 8px;
  padding: 0 12px;
}

.chat-title {
  font-size: 12px;
  color: #9ca3af;
}

.chat-item {
  padding: 8px 12px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 4px;
}

.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #6b7280;
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 6px;
}

.footer-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
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
}
</style>
