import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 检测点击外部区域的Composable
 * @param {Function} handler - 点击外部时执行的回调
 * @returns {Object} targetRef - 需要绑定到目标元素的ref
 */
export function useClickOutside(handler) {
  const targetRef = ref(null)

  const handleClickOutside = (event) => {
    if (targetRef.value && !targetRef.value.contains(event.target)) {
      handler()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })

  return targetRef
}
