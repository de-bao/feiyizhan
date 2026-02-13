<template>
  <div class="input-area">
    <div class="input-container">
      <!-- 工具栏（在搜索框上方） -->
      <div class="toolbar">
        <div
          :class="['toolbar-item', { 'deep-think-active': isDeepThinkActive }]"
          @click="isDeepThinkActive = !isDeepThinkActive"
          @mouseenter="handleHover"
          @mouseleave="handleLeave"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M7.74121 3.17676C9.89642 1.88502 11.9715 1.59281 13.001 2.62207L13.1289 2.76465C14.002 3.83505 13.6794 5.82083 12.4443 7.88086C13.7358 10.0358 14.0282 12.1093 12.999 13.1387L12.8574 13.2676C11.7872 14.1405 9.8019 13.8175 7.74219 12.583C5.68184 13.8185 3.69561 14.1417 2.625 13.2686L2.4834 13.1396C1.45403 12.1102 1.74622 10.0361 3.03809 7.88086C1.80268 5.82062 1.48033 3.83423 2.35352 2.76367L2.48145 2.62207C3.51103 1.59274 5.58588 1.88478 7.74121 3.17676Z"
              fill="currentColor"
              fill-opacity="0.9"
            />
          </svg>
          <span>深度思考</span>
        </div>
        
        <!-- 自动搜索下拉 -->
        <div ref="searchDropdownRef" class="toolbar-dropdown">
          <div
            class="toolbar-item active"
            @click="showSearchDropdown = !showSearchDropdown"
            @mouseenter="handleActiveHover"
            @mouseleave="handleActiveLeave"
          >
            <!-- 地球图标 -->
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.2" />
              <path d="M2 8H14M8 2C9.5 4.5 10.5 6.5 10.5 8C10.5 9.5 9.5 11.5 8 14C6.5 11.5 5.5 9.5 5.5 8C5.5 6.5 6.5 4.5 8 2Z" stroke="currentColor" stroke-width="1.2" />
            </svg>
            <span>{{ searchMode === 'auto' ? '自动搜索' : '手动搜索' }}</span>
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
          <div v-if="showSearchDropdown" class="dropdown-menu">
            <div
              class="dropdown-item"
              :class="{ active: searchMode === 'auto' }"
              @click="selectSearchMode('auto')"
            >
              自动
            </div>
            <div
              class="dropdown-item"
              :class="{ active: searchMode === 'manual' }"
              @click="selectSearchMode('manual')"
            >
              手动
            </div>
          </div>
        </div>

        <!-- 工具下拉 -->
        <div ref="toolDropdownRef" class="toolbar-dropdown">
          <div
            class="toolbar-item"
            @click="showToolDropdown = !showToolDropdown"
            @mouseenter="handleHover"
            @mouseleave="handleLeave"
          >
            <!-- 工具图标（扳手） -->
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6.5 2.5L3.5 5.5L5.5 7.5L2.5 10.5L5.5 13.5L8.5 10.5L10.5 12.5L13.5 9.5L10.5 6.5L8.5 8.5L5.5 5.5L6.5 2.5Z"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M9.5 6.5L11.5 4.5"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
            <span>{{ toolMode || '工具' }}</span>
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
          <div v-if="showToolDropdown" class="dropdown-menu">
            <div
              class="dropdown-item"
              :class="{ active: toolMode === '写作' }"
              @click="selectToolMode('写作')"
            >
              写作
            </div>
            <div
              class="dropdown-item"
              :class="{ active: toolMode === '编程' }"
              @click="selectToolMode('编程')"
            >
              编程
            </div>
            <div
              class="dropdown-item"
              :class="{ active: toolMode === '解题' }"
              @click="selectToolMode('解题')"
            >
              解题
            </div>
          </div>
        </div>
      </div>

      <!-- 输入框容器 -->
      <div class="input-wrapper">
        <!-- 输入框 -->
        <textarea
          ref="textareaRef"
          v-model="inputValue"
          class="input-textarea"
          placeholder="有问题，尽管问，shift+enter换行"
          @keydown="handleKeyDown"
        />

        <!-- 右侧按钮 -->
        <div class="input-actions">
          <div ref="attachDropdownRef" class="attach-dropdown">
            <div class="action-button" @click="showAttachDropdown = !showAttachDropdown" @mouseenter="handleHover" @mouseleave="handleLeave">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10.002 3.06055C10.4161 3.06065 10.752 3.39639 10.752 3.81055V9.25H16.1914C16.6056 9.25 16.9414 9.58579 16.9414 10C16.9414 10.4142 16.6056 10.75 16.1914 10.75H10.752V16.1895C10.752 16.6036 10.4161 16.9394 10.002 16.9395C9.58774 16.9395 9.25195 16.6037 9.25195 16.1895V10.75H3.8125C3.39829 10.75 3.0625 10.4142 3.0625 10C3.0625 9.58579 3.39829 9.25 3.8125 9.25H9.25195V3.81055C9.25195 3.39633 9.58774 3.06055 10.002 3.06055Z"
                />
              </svg>
            </div>
            <div v-if="showAttachDropdown" class="attach-dropdown-menu">
              <div class="attach-dropdown-item" @click="handleAttach('image')" @mouseenter="handleItemHover" @mouseleave="handleItemLeave">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.2" />
                  <circle cx="6" cy="6" r="1.5" fill="currentColor" />
                  <path d="M2 10L5 7L8 10L11 7L14 10V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V10Z" fill="currentColor" />
                </svg>
                <span>图片</span>
              </div>
              <div class="attach-dropdown-item" @click="handleAttach('file')" @mouseenter="handleItemHover" @mouseleave="handleItemLeave">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 2H9.5L13 5.5V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V3C3 2.44772 3.44772 2 4 2Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9 2V6H13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>本地文件</span>
              </div>
              <div class="attach-dropdown-item" @click="handleAttach('document')" @mouseenter="handleItemHover" @mouseleave="handleItemLeave">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8.0019 13.1391C10.8399 13.1391 13.1405 10.8384 13.1405 8.00044C13.1405 5.16245 10.8399 2.86182 8.0019 2.86182C5.16392 2.86182 2.86328 5.16245 2.86328 8.00044C2.86328 10.8384 5.16392 13.1391 8.0019 13.1391Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M2 8H14M8 2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                <span>联网文档</span>
              </div>
            </div>
          </div>
          <button
            class="send-button"
            :disabled="!inputValue.trim()"
            @click="handleSend"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2V12M4 8L8 4L12 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div class="copyright">内容由AI生成，仅供参考</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useClickOutside } from '../composables/useClickOutside'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'send'])

const textareaRef = ref(null)
const inputValue = ref(props.modelValue)

// 下拉菜单状态
const showSearchDropdown = ref(false)
const showToolDropdown = ref(false)
const showAttachDropdown = ref(false)
const searchMode = ref('auto') // 'auto' | 'manual'
const toolMode = ref('') // '写作' | '编程' | '解题'
const isDeepThinkActive = ref(false) // 深度思考激活状态

// 点击外部关闭下拉菜单
const searchDropdownRef = useClickOutside(() => {
  showSearchDropdown.value = false
})

const toolDropdownRef = useClickOutside(() => {
  showToolDropdown.value = false
})

const attachDropdownRef = useClickOutside(() => {
  showAttachDropdown.value = false
})

// 选择搜索模式
const selectSearchMode = (mode) => {
  searchMode.value = mode
  showSearchDropdown.value = false
}

// 选择工具模式
const selectToolMode = (mode) => {
  toolMode.value = mode
  showToolDropdown.value = false
}

const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

const handleSend = () => {
  if (!inputValue.value.trim()) return
  emit('send', inputValue.value)
  inputValue.value = ''
  if (textareaRef.value) {
    textareaRef.value.value = ''
  }
}

const handleHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f3f4f6'
}

const handleLeave = (e) => {
  e.currentTarget.style.backgroundColor = 'transparent'
}

const handleActiveHover = (e) => {
  e.currentTarget.style.backgroundColor = '#d1d5db'
}

const handleActiveLeave = (e) => {
  e.currentTarget.style.backgroundColor = '#e5e7eb'
}

const handleItemHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f3f4f6'
}

const handleItemLeave = (e) => {
  e.currentTarget.style.backgroundColor = 'transparent'
}

const handleAttach = (type) => {
  console.log('Attach type:', type)
  showAttachDropdown.value = false
  // TODO: 实现附件上传逻辑
}
</script>

<style scoped>
.input-area {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-container {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toolbar {
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  padding: 0 4px;
}

.input-wrapper {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.toolbar-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toolbar-item.active {
  background: #e5e7eb;
}

.toolbar-item.deep-think-active {
  background: #dcfce7;
  color: #16a34a;
}

.toolbar-item.deep-think-active svg {
  color: #16a34a;
}

.toolbar-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  z-index: 1000;
  overflow: hidden;
}

.dropdown-item {
  padding: 8px 12px;
  font-size: 14px;
  color: #1f2937;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item.active {
  background-color: #e0e7ff;
  color: #0066ff;
  font-weight: 500;
}

.input-textarea {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  min-height: 24px;
  max-height: 120px;
  overflow-y: auto;
  outline: none;
  color: #1f2937;
  line-height: 1.5;
}


.input-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  position: relative;
}

.attach-dropdown {
  position: relative;
}

.action-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.attach-dropdown-menu {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 140px;
  z-index: 1000;
  overflow: hidden;
}

.attach-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #1f2937;
  transition: background-color 0.2s;
}

.attach-dropdown-item svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.send-button {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
  background: #0066ff;
  color: white;
  pointer-events: auto;
}

.send-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  pointer-events: none;
}

.copyright {
  text-align: center;
  color: #9ca3af;
  font-size: 12px;
}

/* 移动端响应式 - 只在真正的触摸设备上应用 */
@media (max-width: 768px) and (pointer: coarse) {
  .input-area {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px;
    padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
    z-index: 100;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  }

  .input-container {
    gap: 6px;
  }

  .toolbar {
    gap: 6px;
    font-size: 12px;
    padding: 0 2px;
    flex-wrap: wrap;
  }

  .toolbar-item {
    padding: 3px 6px;
    gap: 3px;
    font-size: 12px;
  }

  .toolbar-item span {
    display: none;
  }

  .toolbar-item svg {
    width: 14px;
    height: 14px;
  }

  .input-wrapper {
    padding: 10px;
    gap: 8px;
    border-radius: 10px;
  }

  .input-textarea {
    font-size: 16px; /* 防止iOS自动缩放 */
    min-height: 22px;
    max-height: 100px;
  }

  .action-button,
  .send-button {
    width: 28px;
    height: 28px;
  }

  .action-button svg,
  .send-button svg {
    width: 18px;
    height: 18px;
  }

  .dropdown-menu {
    min-width: 100px;
    font-size: 13px;
  }

  .dropdown-item {
    padding: 6px 10px;
    font-size: 13px;
  }

  .attach-dropdown-menu {
    bottom: 100%;
    right: 0;
    left: auto;
    min-width: 120px;
  }

  .attach-dropdown-item {
    padding: 6px 10px;
    font-size: 13px;
  }

  .copyright {
    font-size: 11px;
  }
}

/* 小屏幕手机 - 只在真正的触摸设备上应用 */
@media (max-width: 480px) and (pointer: coarse) {
  .input-area {
    padding: 10px 12px;
    padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
  }

  .toolbar {
    gap: 4px;
  }

  .toolbar-item {
    padding: 2px 4px;
  }

  .input-wrapper {
    padding: 8px;
  }

  .action-button,
  .send-button {
    width: 26px;
    height: 26px;
  }
}
</style>
