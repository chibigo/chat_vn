<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-light-green window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md">{{ title }}</h5>
          </div>
          <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form ref="myForm" class="q-gutter-md" greedy>
                  <q-input
                    square
                    filled
                    clearable
                    v-model="email"
                    type="email"
                    label="email"
                    lazy-rules
                    :rules="[required, isEmail, short]"
                    ><template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    filled
                    clearable
                    v-model="password"
                    type="password"
                    label="password"
                    lazy-rules
                    :rules="[required, short]"
                  >
                    <template v-slot:prepend> <q-icon name="lock" /> </template
                  ></q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  :loading="isLoadingStore.isLoading"
                  color="light-green-7"
                  size="lg"
                  class="full-width"
                  label="Login"
                  @click="submit"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-none text-register" @click="goToRgister">
                <p class="text-grey-6">Not reigistered? Created an Account</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { auth, db } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { useLoadingStore } from '@/stores/loading'
import { useRouter } from 'vue-router'
import { userLoginStore } from '@/stores/user.js'

const myForm = ref(null)
const title = ref('Chat - VN')
const email = ref('')
const name = ref('')
const password = ref('')
const router = useRouter()
const userStore = userLoginStore()
const isLoadingStore = useLoadingStore()

const required = (val) => {
  return (val && val.length > 0) || 'Vui lòng điền thông tin'
}

const diffPassword = (val) => {
  const val2 = email.value
  return (val && val === val2) || 'Mật khẩu không khớp'
}

const short = (val) => {
  return (val && val.length >= 6) || 'Giá trị nhập vào phải lớn hơn 6 ký tự'
}

const isEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(val) || 'Email không đúng định dạng'
}
const getUserItem = async (user) => {
  const querySnapshot = await getDocs(collection(db, 'users'))
  querySnapshot.forEach((doc) => {
    if (user.email === doc.data().email) {
      name.value = doc.data().name
    }
  })
}

const submit = async () => {
  try {
    const success = await myForm.value.validate()
    if (success) {
      let dataLogin = {
        email: email.value,
        password: password.value
      }
      isLoadingStore.setLoading(true)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        dataLogin.email,
        dataLogin.password
      )
      const user = userCredential.user
      await getUserItem(user)
      userStore.id = user.uid
      userStore.name = name.value
      localStorage.setItem('token', user.accessToken)
      isLoadingStore.setLoading(false)
      return router.push('/')
    } else {
      console.log('No')
    }
  } catch (error) {
    console.log('Login Failed')
  }
}

// const switchTypeForm = () => {
//   register.value = !register.value
//   title.value = register.value ? 'Dang Ky' : 'Dang Nhap'
//   btnLabel.value = register.value ? 'Register' : 'Login'
// }

// const switchVisibility = () => {
//   visibility.value = !visibility.value
//   passwordFieldType.value = visibility.value ? 'text' : 'password'
//   visibilityIcon.value = visibility.value ? 'visibility_off' : 'visibility'
// }

const goToRgister = () => {
  router.push('/register')
}
</script>

<style lang="scss" scoped>
.q-card {
  width: 360px;
}
.text-register {
  cursor: pointer;
  :hover {
    color: #8bc34a !important;
  }
}
</style>
