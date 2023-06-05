<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-light-green window-height window-width row justify-center items-center">
        <div class="column q-pa-lg">
          <div class="row">
            <q-card square class="shadow-24" style="width: 400px; height: 540px">
              <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
              </q-card-section>
              <q-card-section>
                <q-fab
                  color="primary"
                  @click="switchTypeForm"
                  icon="add"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%)"
                >
                  <q-tooltip> New User Registration </q-tooltip>
                </q-fab>
                <q-form class="q-px-sm q-pt-xl">
                  <q-input
                    ref="email"
                    square
                    clearable
                    v-model="email"
                    type="email"
                    lazy-rules
                    :rules="[required, isEmail, short]"
                    label="Email"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    ref="username"
                    v-if="register"
                    square
                    clearable
                    v-model="username"
                    lazy-rules
                    :rules="[required, short]"
                    type="username"
                    label="Username"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    ref="password"
                    square
                    clearable
                    v-model="password"
                    :type="passwordFieldType"
                    lazy-rules
                    :rules="[required, short]"
                    label="Password"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibilityIcon"
                        @click="switchVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                  <q-input
                    ref="repassword"
                    v-if="register"
                    square
                    clearable
                    v-model="repassword"
                    :type="passwordFieldType"
                    lazy-rules
                    :rules="[required, short, diffPassword]"
                    label="Repeat password"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibilityIcon"
                        @click="switchVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>

              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="secondary"
                  @click="submit"
                  class="full-width text-white"
                  :label="btnLabel"
                />
              </q-card-actions>
              <q-card-section v-if="!register" class="text-center q-pa-sm">
                <p class="text-grey-6">Forgot your password?</p>
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

const required = (val) => {
  return (val && val.length > 0) || 'Vui long dien thong tin'
}

const diffPassword = (val) => {
  const val2 = email.value
  return (val && val === val2) || 'Mat khau khong khop!'
}

const short = (val) => {
  return (val && val.length > 3) || 'Gia tri qua ngan'
}

const isEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(val) || 'Email khong dung dinh dang'
}

const submit = () => {
  if (register.value) {
    email.value.$refs.validate()
    username.value.$refs.validate()
    password.value.$refs.validate()
    repassword.value.$refs.validate()
  } else {
    email.value.$refs.validate()
    password.value.$refs.validate()
  }

  if (!register.value) {
    if (!email.value.$refs.hasError && !password.value.$refs.hasError) {
      $q.notify({
        icon: 'done',
        color: 'positive',
        message: 'go go'
      })
    }
  }
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
