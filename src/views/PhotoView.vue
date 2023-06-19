<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm row items-start">
      <QUploadCommom class="upload_file" @handle_getListFiles="handle_getListFiles" />
    </div>
    <div>
      <FileComponent :isUploadFile="isUploadFile" @isHandleUnUpload="isHandleUnUpload" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QUploadCommom from '@/components/upload_model/qUploadCommom.vue'
import FileComponent from '../components/photos/showFileComponent.vue'

const isUploadFile = ref(null)

const handle_getListFiles = (isUpload) => {
  isUploadFile.value = isUpload
}
const isHandleUnUpload = (isUnUpload) => {
  isUploadFile.value = isUnUpload
}
</script>

<style lang="scss" scoped></style>
