<template>
  <div class="header">
    <ModelSelector :selected-model="selectedModel" @update:selected-model="$emit('update:selectedModel', $event)" />
    <div ref="downloadDropdownRef" class="download-dropdown">
      <button class="download-button" @click="showDownloadDropdown = !showDownloadDropdown" @mouseenter="handleHover" @mouseleave="handleLeave">
        安装电脑版
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M3.5 5.00024L6.5 8.00024L9.5 5.00024"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div v-if="showDownloadDropdown" class="download-dropdown-menu">
        <div class="download-dropdown-item" @click="showDownloadDropdown = false" @mouseenter="handleItemHover" @mouseleave="handleItemLeave">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModelSelector from './ModelSelector.vue'
import { useClickOutside } from '../composables/useClickOutside'

defineProps({
  selectedModel: {
    type: String,
    required: true
  }
})

defineEmits(['update:selectedModel'])

const showDownloadDropdown = ref(false)

// 点击外部关闭下载下拉菜单
const downloadDropdownRef = useClickOutside(() => {
  showDownloadDropdown.value = false
})

const handleHover = (e) => {
  e.currentTarget.style.backgroundColor = '#16a34a'
}

const handleLeave = (e) => {
  e.currentTarget.style.backgroundColor = '#22c55e'
}

const handleItemHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f3f4f6'
}

const handleItemLeave = (e) => {
  e.currentTarget.style.backgroundColor = 'transparent'
}
</script>

<style scoped>
.header {
  padding: 12px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
}

.download-dropdown {
  position: relative;
}

.download-button {
  background: #22c55e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.download-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  z-index: 1000;
  overflow: hidden;
}

.download-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #1f2937;
  transition: background-color 0.2s;
}

.download-dropdown-item svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}
</style>
