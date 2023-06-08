<template>
  <q-page class="bg-light-green window-height window-width row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 400px; height: 485px">
          <q-card-section class="bg-blue-13">
            <h4 class="text-h5 text-white q-my-md">Chat - VN</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input square clearable v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="username" type="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              class="full-width text-white bg-light-green"
              label="Register"
              @click="signUpUser()"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm text-login" @click="goToLogin">
            <p class="text-grey-6">Return to login</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { auth, db } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import route from '@/router'

let email = ref('')
let username = ref('')
let password = ref('')

const signUpUser = async () => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = res.user
    const docRef = await addDoc(collection(db, 'users'), {
      email: email.value,
      id: user.uid,
      image: '',
      name: username.value,
      password: password.value
    })
    console.log('Document written with ID:', docRef.id)
  } catch (error) {
    console.error('Error signing up:', error)
    const errorCode = error.code
    const errorMessage = error.message
  }
}
const goToLogin = () => {
  route.push('/login')
}
</script>

<style lang="scss" scoped>
.text-login {
  cursor: pointer;
  :hover {
    color: #8bc34a !important;
  }
}
</style>
