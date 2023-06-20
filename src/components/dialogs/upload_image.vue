<template>
  <q-dialog persistent v-model="dialog">
    <q-card class="from_dialog">
      <q-btn
        class="close_dialog"
        no-caps
        label="X"
        color="red"
        v-close-popup
        @click="handleShowAndCloseDialog"
      />
      <q-card-section class="row items-center">
        <div>
          <ShowFileComp />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import ShowFileComp from '@/components/photos/showFileComponent.vue'

const dialog = ref(false)

const props = defineProps({
  dialogUploadImage: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['handleCloseDialog'])

const handleShowAndCloseDialog = () => {
  emit('handleCloseDialog', false)
}

watch(
  () => props.dialogUploadImage,
  (show) => (dialog.value = show)
)
</script>

<style lang="scss" scoped>
.from_dialog {
  max-width: 1013px;
}
.close_dialog {
  margin: 4px 0 0 4px;
}
.upload_file {
  margin-left: 0;
}
</style>
