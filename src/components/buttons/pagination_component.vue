<template>
  <q-pagination
    v-model="page"
    :max="Math.ceil(props.listRecord.length / props.totalPages)"
    :max-pages="4"
    direction-links
    boundary-links
    icon-first="skip_previous"
    icon-last="skip_next"
    icon-prev="fast_rewind"
    icon-next="fast_forward"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const page = ref(1)

const props = defineProps({
  listRecord: {
    type: Array,
    default: []
  },
  totalPages: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['handlePagination'])
const handleGetRecord = () => {
  emit('handlePagination', page)
}
watch(page, () => handleGetRecord())
</script>
