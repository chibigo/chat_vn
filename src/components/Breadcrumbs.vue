<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" icon="home" />
      <q-breadcrumbs-el
        v-if="!checkGetRouter"
        v-for="itemBread in props.breadcrumbsList"
        :key="itemBread.meta.title"
        :label="itemBread.meta.title"
      />
    </q-breadcrumbs>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  breadcrumbsList: {
    type: Array,
    default: () => []
  }
})
let isMeta = ref(false)

const checkGetRouter = computed(() => {
  isMeta = JSON.stringify(props.breadcrumbsList[0]?.meta) === '{}' ? true : false
  return isMeta
})
</script>
