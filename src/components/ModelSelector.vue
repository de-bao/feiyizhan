<template>
  <div ref="dropdownRef" class="model-selector">
    <button
      class="model-button"
      @click="toggleDropdown"
      @mouseenter="handleHover"
      @mouseleave="handleLeave"
    >
      {{ selectedModel }}
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
    <div v-if="showDropdown" class="dropdown">
      <div
        v-for="model in modelList"
        :key="model"
        :class="['dropdown-item', { active: selectedModel === model }]"
        @click="selectModel(model)"
        @mouseenter="handleItemHover"
        @mouseleave="handleItemLeave(model)"
      >
        <div>
          <div class="model-name">{{ MODEL_CONFIG[model].name }}</div>
          <div class="model-desc">{{ MODEL_CONFIG[model].description }}</div>
        </div>
        <span v-if="selectedModel === model" class="checkmark">✓</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MODELS, MODEL_CONFIG } from '../constants'
import { useClickOutside } from '../composables/useClickOutside'

const props = defineProps({
  selectedModel: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:selectedModel'])

const showDropdown = ref(false)
const dropdownRef = useClickOutside(() => {
  showDropdown.value = false
})

const modelList = Object.values(MODELS)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectModel = (model) => {
  emit('update:selectedModel', model)
  showDropdown.value = false
}

const handleHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f3f4f6'
}

const handleLeave = (e) => {
  e.currentTarget.style.backgroundColor = 'transparent'
}

const handleItemHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f3f4f6'
}

const handleItemLeave = (model) => (e) => {
  e.currentTarget.style.backgroundColor = props.selectedModel === model ? '#f3f4f6' : 'transparent'
}
</script>

<style scoped>
.model-selector {
  position: relative;
}

.model-button {
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  padding: 8px 0;
  margin-top: 8px;
  z-index: 1000;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-item.active {
  background-color: #f3f4f6;
}

.model-name {
  font-weight: bold;
  font-size: 14px;
}

.model-desc {
  font-size: 12px;
  color: #6b7280;
}

.checkmark {
  color: #0066ff;
}
</style>
