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
                  color="light-green-7"
                  size="lg"
                  class="full-width"
                  label="Login"
                  @click="submit"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-none">
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
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import route from '@/router'
import { useRouter } from 'vue-router'

const myForm = ref(null)
const title = ref('Chat - VN')
const email = ref('')
const username = ref('')
const password = ref('')
const repassword = ref('')
const register = ref(false)
const passwordFieldType = ref('password')
const btnLabel = ref('GO!')
const visibility = ref(false)
const visibilityIcon = ref('visibility')
let isLogined = ref(true)
let message = ref('')
const router = useRouter()

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

// const submit = () => {
//   if (register.value) {
//     email.value.$refs.validate()
//     username.value.$refs.validate()
//     password.value.$refs.validate()
//     repassword.value.$refs.validate()
//   } else {
//     email.value.$refs.validate()
//     password.value.$refs.validate()
//   }

//   if (!register.value) {
//     if (!email.value.$refs.hasError && !password.value.$refs.hasError) {
//       $q.notify({
//         icon: 'done',
//         color: 'positive',
//         message: 'go go'
//       })
//     }
//   }
// }
const submit = async () => {
  myForm.value.validate().then(async (success) => {
    if (success) {
      let dataLogin = {
        email: email.value,
        password: password.value
      }
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          dataLogin.email,
          dataLogin.password
        )
        const user = userCredential.user
        localStorage.setItem('token', user.accessToken)
        router.push('/')
      } catch (error) {
        console.log('Login Faild')
        // const errorCode = error.code
        // isLogined = false
        // if (errorCode.includes('user-not-found') || errorCode.includes('invalid-email')) {
        //   message = 'Email không tồn tại!'
        // } else {
        //   message = 'Mật khẩu không chính xác'
        // }
      }
    } else {
      console.log('No')
    }
  })
}

const switchTypeForm = () => {
  register.value = !register.value
  title.value = register.value ? 'Dang Ky' : 'Dang Nhap'
  btnLabel.value = register.value ? 'Register' : 'Login'
}

const switchVisibility = () => {
  visibility.value = !visibility.value
  passwordFieldType.value = visibility.value ? 'text' : 'password'
  visibilityIcon.value = visibility.value ? 'visibility_off' : 'visibility'
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
