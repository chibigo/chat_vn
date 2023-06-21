<template>
  <div class="q-pa-md flex flex-start">
    <q-btn
      class="btn_select"
      color="white"
      text-color="black"
      label="Select All"
      @click="handleSelectAll()"
    />
    <q-btn
      class="btn_select"
      color="white"
      text-color="black"
      label="Unselect All"
      @click="handleUnselectAll()"
    />
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <LoadingComp v-if="isLoading" />
    <q-card v-else class="my-card file" v-for="(file, index) in listRedcordPagination" :key="index">
      <q-checkbox v-model="selection" color="teal" :val="file" />
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
          @click="handleDownloadFile(file.url, file.name)"
        >
          Download
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-pa-lg flex flex-center" v-if="listRedcordPagination.length > 0">
    <PaginationComponent
      :listRecord="listRecord"
      :totalPages="totalPages"
      @handlePagination="handlePagination"
    />
  </div>
</template>

<script setup>
import { ref, watch, defineProps, computed } from 'vue'
import { storage } from '@/firebase'
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage'
import { userLoginStore } from '@/stores/user.js'
import PaginationComponent from '@/components/buttons/pagination_component.vue'
import LoadingComp from '../dialogs/loadingComp.vue'

const props = defineProps({
  isUploadFile: {
    type: Boolean,
    default: false
  }
})

const userStore = userLoginStore()
const files = ref([])
const listRecord = ref([])
const totalPages = ref(5)
const page = ref(1)
const isUpload = ref(false)
const regexImage = /^.*\.(jpg|jpeg|png|gif|bmp|tiff|psd|raw|cr2|nef|orf|sr2)$/i
const folder = `${userStore.name}_${userStore.id}`
const listRef = storageRef(storage, folder)
const isLoading = ref(false)
const isCheckBox = ref(false)
const selection = ref([])
const emit = defineEmits(['isHandleUnUpload'])

// get list files
const getListFilesStore = async () => {
  try {
    const res = await listAll(listRef)
    files.value = []
    isLoading.value = true
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
    isLoading.value = false
    listRecord.value = files.value
    if (isUpload.value == true) {
      emit('isHandleUnUpload', false)
    }
  } catch (error) {
    // Uh-oh, an error occurred!
  }
}
// Handle download file
const handleDownloadFile = (url, name) => {
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'
  xhr.onload = (event) => {
    const blob = xhr.response

    // Create a temporary <a> element to download the file
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = name // Set the desired file name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  xhr.open('GET', url)
  xhr.send()
}
// Handle checkbox
const handleSubmitFileChecked = (file, index) => {
  console.log(selection.value)
}
const handleSelectAll = () => {
  selection.value = listRecord.value
}
const handleUnselectAll = () => {
  selection.value = []
}
// handle Pagination
const handlePagination = (val) => {
  page.value = val.value
}
const listRedcordPagination = computed(() => {
  return listRecord.value.slice(
    (page.value - 1) * totalPages.value,
    (page.value - 1) * totalPages.value + totalPages.value
  )
})

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
// watch(isCheckBox, () => handleCheckBox())
</script>

<style lang="scss" scoped>
.btn_select {
  margin-right: 12px;
}
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
