<template>
  <div v-if="isVisible" class="drag-overlay">
    <div class="overlay-content">
      <div class="overlay-icon">📁</div>
      <div class="overlay-title">文件拖动到此处即可上传</div>
      <div class="overlay-tip">
        支持文件格式：{{ supportedTypes }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { SUPPORTED_FILE_TYPES } from '../constants'

defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const supportedTypes = SUPPORTED_FILE_TYPES.join('、')
</script>

<style scoped>
.drag-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.overlay-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
}

.overlay-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.overlay-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.overlay-tip {
  font-size: 14px;
  color: #6b7280;
}
</style>
