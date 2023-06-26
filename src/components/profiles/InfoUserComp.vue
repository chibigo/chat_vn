<template>
  <q-page class="row justify-center items-center profile_page">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 400px; min-height: 385px">
          <q-card-section class="row justify-center">
            <q-avatar size="120px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-sm q-pb-sm">
              <q-input square clearable v-model="dataUser.email" type="email" label="Email">
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
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              class="full-width text-white bg-light-green"
              label="Update"
              @click="signUpUser()"
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
import { collection, getDocs, query, where } from 'firebase/firestore'
import { userLoginStore } from '@/stores/user.js'

// const email = ref('')
// const username = ref('')
const dataUser = ref({
  email: '',
  username: ''
})

const userStore = userLoginStore()

const getCurrentUser = async () => {
  const users = query(collection(db, 'users'), where('id', '==', userStore.id))
  const querySnapshot = await getDocs(users)
  querySnapshot.forEach((doc) => {
    ;(dataUser.value.email = doc.data().email), (dataUser.value.username = doc.data().name)
  })
}
getCurrentUser()
</script>

<style lang="scss" scoped>
.profile_page {
  min-height: 500px !important;
}
</style>
