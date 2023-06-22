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
        <div class="files">
          <ShowFileComp @handleUploadFileSelect="handleUploadFileSelect" :dialog="dialog" />
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
const emit = defineEmits(['handleCloseDialog', 'handleFlieSelectToMessage'])

const handleShowAndCloseDialog = () => {
  emit('handleCloseDialog', false)
}
const handleUploadFileSelect = (filesSelect) => {
  emit('handleFlieSelectToMessage', filesSelect)
}
watch(
  () => props.dialogUploadImage,
  (show) => (dialog.value = show)
)
</script>

<style lang="scss" scoped>
.from_dialog {
  min-width: 600px;
  max-width: 1013px;
  .close_dialog {
    margin: 4px 0 0 4px;
  }
  .files {
    width: 100%;
  }
}
</style>
