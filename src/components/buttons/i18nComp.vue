<template>
  <div class="language_in18n">
    <q-select
      filled
      v-model="valueModel"
      :options="options"
      :label="$t('language.title')"
      emit-value
      map-options
    >
    </q-select>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/i18n/index.js'

const { t } = useI18n()
const valueModel = ref(t(`language.${i18n.global.locale.value}`))
const options = computed(() => [
  {
    label: t(`language.En`),
    value: 'En'
  },
  {
    label: t(`language.Vi`),
    value: 'Vi'
  }
])

watch(valueModel, (newLocale) => {
  i18n.global.locale.value = newLocale
})
</script>

<style lang="scss" scoped>
.language_in18n {
  color: #fff;
  width: 150px;
  height: 48px;
  :deep(.q-field) {
    height: 100%;
    .q-field__label {
      top: 15px;
    }
    span {
      color: #fff !important;
    }
  }
}
</style>
