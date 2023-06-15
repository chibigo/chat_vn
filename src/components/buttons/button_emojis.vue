<template>
  <div class="emoji_picker">
    <q-scroll-area class="picker_container">
      <div class="category" v-for="category in categories" :key="`category_${category}`">
        <span>{{ category }}</span>
        <div class="emojis_container">
          <button
            @click="handleEmojiClick($event, emoji)"
            v-for="(emoji, index) in category_emojis(category)"
            :key="`emoji_${index}`"
          >
            {{ emoji }}
          </button>
        </div>
      </div>
    </q-scroll-area>

    <div class="bottom_arrow" v-if="show_arrow"></div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import data from '@/jsons/emojis-data.json'
const props = defineProps({
  show_arrow: {
    type: Boolean,
    required: false,
    default: true
  }
})
const emit = defineEmits(['emoji_click'])
const categories = computed(() => {
  return Object.keys(data)
})
const category_emojis = (category) => {
  return Object.values(data[category])
}
const handleEmojiClick = (e, emoji) => {
  e.preventDefault()
  emit('emoji_click', emoji)
}
</script>

<style lang="scss" scoped>
.emoji_picker {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 20rem;
  max-width: 100%;
}

.emoji_picker,
.bottom_arrow {
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
}

.emoji_picker,
.picker_container {
  border-radius: 0.5rem;
  background: white;
}

.picker_container {
  position: relative;
  padding: 1rem;
  z-index: 1;
  height: 100%;
}

.category {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  color: rgb(169, 169, 169);
}

.emojis_container {
  display: flex;
  flex-wrap: wrap;
}

.category button {
  margin: 0.2rem;
  margin-left: 0;
  background: inherit;
  border: none;
  font-size: 1.2rem;
  padding: 0;
}

.bottom_arrow {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0.75rem;
  height: 0.75rem;
  transform: translate(-50%, 50%) rotate(45deg);
  background: white;
}
</style>
