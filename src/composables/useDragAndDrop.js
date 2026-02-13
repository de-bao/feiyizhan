import { ref } from 'vue'

/**
 * 拖拽上传Composable
 * @param {Function} onDrop - 文件拖放完成后的回调
 * @returns {Object} { isDragging, handlers }
 */
export function useDragAndDrop(onDrop) {
  const isDragging = ref(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    isDragging.value = true
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    isDragging.value = false
  }

  const handleDrop = (e) => {
    e.preventDefault()
    isDragging.value = false
    if (onDrop) {
      onDrop(e.dataTransfer.files)
    }
  }

  return {
    isDragging,
    handlers: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    }
  }
}
