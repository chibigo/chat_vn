<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card file" v-for="(file, index) in files" :key="index">
      <q-img class="file_item_image" v-if="regexImage.test(file.name)" :src="file.url" />
      <q-video v-else class="file_item_image" :src="file.url" />

      <q-card-section>
        <div class="file_item_title">{{ file.name }}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          dark-percentage
          color="primary"
          icon="download"
          @click="handleDownloadFile(file.url)"
        >
          Download</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'
import { storage } from '@/firebase'
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage'
import { userLoginStore } from '@/stores/user.js'

const props = defineProps({
  isUploadFile: {
    type: Boolean,
    default: false
  }
})

const userStore = userLoginStore()
const folder = `${userStore.name}_${userStore.id}`
const listRef = storageRef(storage, folder)
const files = ref([])
const isUpload = ref(false)
const regexImage = /^.*\.(jpg|jpeg|png|gif|bmp|tiff|psd|raw|cr2|nef|orf|sr2)$/i
const emit = defineEmits(['isHandleUnUpload'])

const getListFilesStore = async () => {
  try {
    const res = await listAll(listRef)
    files.value = []
    for (const itemRef of res.items) {
      const storeRefDownload = storageRef(storage, `${folder}/${itemRef.name}`)
      try {
        const url = await getDownloadURL(storeRefDownload)
        files.value.push({
          name: itemRef.name,
          url: url
        })
      } catch (error) {
        // Handle individual download error
      }
    }
    if (isUpload.value == true) {
      emit('isHandleUnUpload', false)
    }
  } catch (error) {
    // Uh-oh, an error occurred!
  }
}
const handleDownloadFile = (url) => {
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'
  xhr.onload = (event) => {
    const blob = xhr.response

    // Create a temporary <a> element to download the file
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'file.zip' // Set the desired file name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  xhr.open('GET', url)
  xhr.send()
}

getListFilesStore()
watch(
  () => props.isUploadFile,
  (isGet) => (isUpload.value = isGet)
)
watch(isUpload, () => {
  if (isUpload.value == true) {
    getListFilesStore()
  }
})
</script>

<style lang="scss" scoped>
.my-card {
  max-height: 300px;
  width: 100%;
  max-width: 300px;
  .file_item_image {
    height: 150px;
  }
  .file_item_title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
}
</style>
