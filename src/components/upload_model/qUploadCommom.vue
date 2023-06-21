<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-form @submit="onSubmit">
        <div class="row justify-center">
          <q-uploader
            ref="uploader"
            label="Images / Videos"
            square
            flat
            multiple
            accept="image/*, video/*"
            removeUploadedFiles
            @added="onFileAdded"
            @removed="removeFlies"
            bordered
          />
        </div>
        <div class="row justify-center">
          <q-btn
            :loading="isloading"
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
import { db } from '@/firebase'
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { userLoginStore } from '@/stores/user.js'
import { Notify } from 'quasar'

const filesList = ref([])
const userStore = userLoginStore()
const uploader = ref(null)
const isloading = ref(false)
const emit = defineEmits(['handle_getListFiles'])

// add files
const onFileAdded = (files) => {
  filesList.value = [...files]
}

// remove files
const removeFlies = (files) => {
  filesList.value = filesList.value.filter((f) => f !== files[0])
}

const onSubmit = async () => {
  const folder = `${userStore.name}_${userStore.id}`
  if (!filesList.value) {
    console.log('No value')
    return
  } else {
    isloading.value = true
    await Promise.all(
      filesList.value.map(async (file) => {
        const stRef = storageRef(storage, `${folder}/` + file.name)
        await uploadBytes(stRef, file).then((snapshot) => {
          // Remove the uploaded file from filesList
          filesList.value = filesList.value.filter((f) => f !== file)
        })
        await addDoc(collection(db, 'files'), {
          userId: folder,
          fileName: file.name,
          fileUrl: 'file.url'
        })
      })
    )
    emit('handle_getListFiles', true)
    uploader.value.reset()
    isloading.value = false
    if (isloading.value == false) {
      Notify.create({
        message: 'Thêm file thành công',
        color: 'green',
        position: 'top',
        icon: 'check'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload_file {
  margin-left: 0;
}
</style>
