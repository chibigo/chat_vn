<template>
  <q-page class="row justify-center items-center profile_page">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 400px; min-height: 385px">
          <q-card-section class="row justify-center">
            <div class="column avatar">
              <q-avatar size="120px">
                <img
                  v-if="dataUser.image == '' || dataUser.image == null"
                  src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                />
                <img v-else :src="dataUser.image" />
              </q-avatar>
              <div class="edit_avatar">
                <div class="icon_edit">
                  <input
                    type="file"
                    id="actual-btn"
                    class="input_file"
                    accept="image/*"
                    @change="uploadImage"
                  />
                  <label class="btn_icon" for="actual-btn">
                    <q-icon name="edit" />
                  </label>
                </div>
                <q-btn icon="delete" @click="deleteImage" />
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-sm q-pb-sm">
              <q-input
                square
                clearable
                v-model="dataUser.email"
                type="email"
                label="Email"
                :rules="[ruleFrom.required, ruleFrom.isEmail, ruleFrom.short]"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="dataUser.username"
                type="username"
                label="Username"
                :rules="[ruleFrom.required, ruleFrom.short]"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              :loading="isloading"
              unelevated
              size="lg"
              class="full-width text-white bg-light-green"
              :label="$t('from.update')"
              @click="updateCurrentUser()"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '@/firebase'
import { doc, collection, getDocs, query, where, updateDoc } from 'firebase/firestore'
import { userLoginStore } from '@/stores/user.js'
import { RULE_INPUT_FROM } from '@/common/validate/index'
import { Notify } from 'quasar'

const dataUser = ref({
  email: '',
  username: '',
  image: ''
})
const imageUpload = ref(null)
const idUserFireStore = ref(null)

const isloading = ref(false)
const userStore = userLoginStore()
const ruleFrom = RULE_INPUT_FROM

const getCurrentUser = async () => {
  const users = query(collection(db, 'users'), where('id', '==', userStore.id))
  const querySnapshot = await getDocs(users)
  querySnapshot.forEach((doc) => {
    idUserFireStore.value = doc.id
    dataUser.value.email = doc.data().email
    dataUser.value.username = doc.data().name
    dataUser.value.image = doc.data().image
  })
}

const uploadImage = (val) => {
  const image = val.target.files[0]
  dataUser.value.image = URL.createObjectURL(image)

  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = (e) => {
    imageUpload.value = e.target.result
  }
}

const deleteImage = () => {
  dataUser.value.image = ''
}

const updateCurrentUser = async () => {
  const connectDB = doc(db, 'users', idUserFireStore.value)
  isloading.value = true
  await updateDoc(connectDB, {
    email: dataUser.value.email,
    image: imageUpload.value,
    name: dataUser.value.username
  })
  userStore.name = dataUser.value.username
  userStore.image = imageUpload.value

  isloading.value = false

  Notify.create({
    message: 'Cập nhật thành công',
    color: 'green',
    position: 'top',
    icon: 'check',
    timeout: 1500
  })
}

getCurrentUser()
</script>

<style lang="scss" scoped>
.profile_page {
  min-height: 500px !important;
}
.edit_avatar {
  display: flex;
  justify-content: space-around;
  margin-top: 8px;
  .icon_edit {
    width: 40px;
    .input_file {
      display: none;
    }
    .btn_icon {
      width: 40px;
      height: 40px;
      cursor: pointer;
      .q-icon {
        font-size: 23px;
        width: 100%;
        height: 100%;
        &:hover {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #ececec;
        }
      }
    }
  }

  .q-btn {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    &::before {
      box-shadow: none;
    }
  }
}
</style>
