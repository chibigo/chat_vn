<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-form @submit="onSubmit">
        <div class="row justify-center">
          <q-uploader
            label="Images / Videos / Files"
            square
            flat
            multiple
            @added="onFileAdded"
            bordered
          />
        </div>
        <div class="row justify-center">
          <q-btn label="Add" type="submit" color="primary" class="q-ma-sm" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { ref } from 'vue'

const filesList = ref(null)

const onFileAdded = (files) => {
  filesList.value = [...files]
}

const onSubmit = () => {
  console.log('123')
}
</script>

<style lang="scss" scoped>
.upload_file {
  margin-left: 0;
}
</style>
