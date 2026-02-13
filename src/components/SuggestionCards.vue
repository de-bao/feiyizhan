<template>
  <div class="suggestion-cards">
    <!-- 促销卡片 -->
    <div class="promo-card">
      <div class="promo-badge">元宝派红包 新春领不停</div>
      <div class="promo-title">抢10亿红包!</div>
      <div class="promo-subtitle">万元小马卡天天抽!</div>
      <img
        :src="`/yuanbao_files/NzFkYzk2NzYtNGM4Mi00Y2U4LWI1NzYtZmRmM2FlMmYwNmYx_compress.webp`"
        alt="Red Envelope"
        class="promo-image"
      />
    </div>

    <!-- 其他建议卡片 -->
    <div
      v-for="card in suggestionCards"
      :key="card.id"
      :class="['suggestion-card', { 'download-card': card.type === 'download' }]"
      @click="handleCardClick(card.prompt)"
      @mouseenter="handleEnter(card.type)"
      @mouseleave="handleLeave"
    >
      <div v-if="card.type === 'download'" class="download-content">
        <img :src="`${card.image}`" :alt="card.title" class="card-icon" />
        <span class="card-title">{{ card.title }}</span>
        <span class="card-arrow">→</span>
      </div>
      <div v-else class="normal-content">
        <div class="card-title">{{ card.title }}</div>
        <div class="card-subtitle">{{ card.subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SUGGESTION_CARDS } from '../constants'

const suggestionCards = SUGGESTION_CARDS

const emit = defineEmits(['cardClick'])

const handleCardClick = (prompt) => {
  emit('cardClick', prompt)
}

const handleEnter = (type) => (e) => {
  e.currentTarget.style.borderColor = '#0066ff'
  if (type === 'download') {
    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 102, 255, 0.1)'
  }
}

const handleLeave = (e) => {
  e.currentTarget.style.borderColor = '#e5e7eb'
  e.currentTarget.style.boxShadow = 'none'
}
</script>

<style scoped>
.suggestion-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  width: 100%;
}

.promo-card {
  background: linear-gradient(135deg, #ff4d4f 0%, #ff7a45 100%);
  border-radius: 8px;
  padding: 16px;
  color: white;
  cursor: pointer;
  flex: 0 0 228px;
  max-width: 228px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
  position: relative;
  overflow: hidden;
}

.promo-badge {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 8px 8px 0 0;
}

.promo-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 24px;
}

.promo-subtitle {
  font-size: 14px;
}

.promo-image {
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 80px;
  height: auto;
  opacity: 0.8;
}

.suggestion-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  min-width: 144px;
  flex: 0 0 auto;
  transition: all 0.2s;
}

.download-card {
  min-width: 200px;
}

.download-content {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.card-icon {
  width: 16px;
  height: 16px;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
}

.card-arrow {
  margin-left: auto;
  color: #666666;
}

.card-subtitle {
  font-size: 12px;
  color: #6b7280;
}

.normal-content .card-title {
  margin-bottom: 4px;
}
</style>
