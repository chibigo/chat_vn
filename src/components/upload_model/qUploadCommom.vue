<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-form @submit="onSubmit">
        <div class="row justify-center">
          <q-uploader
            ref="uploader"
            label="Images / Videos / Files"
            square
            flat
            multiple
            removeUploadedFiles
            @added="onFileAdded"
            @removed="removeFlies"
            bordered
          />
        </div>
        <div class="row justify-center">
          <q-btn
            :disable="filesList.length < 1 ? true : false"
            class="q-ma-sm"
            type="submit"
            dark-percentage
            color="primary"
            text-color="grey-9"
            icon="cloud_upload"
            style="width: 100px"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { ref } from 'vue'
import { userLoginStore } from '@/stores/user.js'
import { useLoadingStore } from '@/stores/loading'

const filesList = ref([])
const userStore = userLoginStore()
const isLoadingStore = useLoadingStore()
const uploader = ref(null)

const onFileAdded = (files) => {
  filesList.value = [...files]
}

const removeFlies = (files) => {
  console.log(files)
}

const onSubmit = async () => {
  const folder = `${userStore.name}_${userStore.id}`

  if (!filesList.value) {
    console.log('No value')
    return
  } else {
    isLoadingStore.setLoading(false)
    await Promise.all(
      filesList.value.map(async (file) => {
        const stRef = storageRef(storage, `${folder}/` + file.name)
        await uploadBytes(stRef, file).then((snapshot) => {
          console.log('success')
          // Remove the uploaded file from filesList
          filesList.value = filesList.value.filter((f) => f !== file)
        })
      })
    )
    uploader.value.reset()
    isLoadingStore.setLoading(false)
  }
}
</script>

<style lang="scss" scoped>
.upload_file {
  margin-left: 0;
}
</style>
