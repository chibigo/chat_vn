<template>
  <q-btn class="button_profile" color="primary" label="Account Settings">
    <q-menu class="button_profile_menu">
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-item clickable v-close-popup @click="onClickProfile()">
            <q-item-section>Profile</q-item-section>
          </q-item>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img
              :src="userStore.image ?? 'https://img.freepik.com/free-icon/user_318-159711.jpg'"
            />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">{{ props.name }}</div>

          <q-btn
            color="primary"
            label="Logout"
            push
            size="sm"
            @click="handleLogout()"
            v-close-popup
          />
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup>
import route from '@/router'
import { userLoginStore } from '@/stores/user.js'

const userStore = userLoginStore()

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
const onClickProfile = () => {
  route.push('/profile')
}
const handleLogout = () => {
  localStorage.removeItem('token')
  userStore.$reset()
  route.push('/login')
}
</script>

<style lang="scss" scoped>
.button_profile {
  position: relative;
  margin-right: 24px;
  line-height: 2.8em;
  &::before {
    box-shadow: none;
  }
}
</style>
