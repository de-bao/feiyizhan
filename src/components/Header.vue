<template>
  <div class="header">
    <ModelSelector :selected-model="selectedModel" @update:selected-model="$emit('update:selectedModel', $event)" />
    <button class="download-button" @mouseenter="handleHover" @mouseleave="handleLeave">
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
  </div>
</template>

<script setup>
import ModelSelector from './ModelSelector.vue'

defineProps({
  selectedModel: {
    type: String,
    required: true
  }
})

defineEmits(['update:selectedModel'])

const handleHover = (e) => {
  e.currentTarget.style.backgroundColor = '#16a34a'
}

const handleLeave = (e) => {
  e.currentTarget.style.backgroundColor = '#22c55e'
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
</style>
