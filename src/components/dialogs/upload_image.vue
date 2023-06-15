<template>
  <q-dialog persistent v-model="dialog">
    <q-card>
      <q-btn
        class="close_dialog"
        no-caps
        label="X"
        color="red"
        v-close-popup
        @click="handleShowAndCloseDialog"
      />
      <q-card-section class="row items-center q-gutter-sm">
        <div class="q-gutter-sm row items-start">
          <QUploadCommom />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import QUploadCommom from '../upload_model/qUploadCommom.vue'

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
.close_dialog {
  margin: 4px 0 0 4px;
}
.upload_file {
  margin-left: 0;
}
</style>
