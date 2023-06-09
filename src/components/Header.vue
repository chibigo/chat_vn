<template>
  <div class="q-gutter-y-md">
    <q-tabs
      v-model="tab"
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-primary text-white shadow-2"
    >
      <q-route-tab :to="'/'" name="home" icon="home" label="Home" />
      <q-route-tab :to="'/chats'" name="Chat" icon="chat" label="Chat" />
      <q-route-tab :to="'/photos'" name="photos" icon="photo" label="Photos" />
      <q-route-tab :to="'/videos'" name="videos" icon="slow_motion_video" label="Videos" />
      <q-route-tab color="primary" label="Products">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Tab 1</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Tab 2</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-menu>
      </q-route-tab>
      <q-chip class="q-ml-auto">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        {{ name }}
      </q-chip>
      <q-tab name="logouts" icon="logout" label="Logut" @click="handleLogout()" />
    </q-tabs>
  </div>
  <div>
    <Breadcrumbs :breadcrumbsList="breadcrumbsList" />
  </div>
</template>

<script setup>
import Breadcrumbs from './Breadcrumbs.vue'
import { ref, watchEffect } from 'vue'
import route from '@/router'
import { userLoginStore } from '@/stores/user.js'

const tab = ref('home')
const name = ref('No_name')
let breadcrumbsList = ref([])
const userStore = userLoginStore()

const getRouter = () => {
  breadcrumbsList.value = route.currentRoute.value.matched
}

const handleLogout = () => {
  localStorage.removeItem('token')
  route.push('/login')
}
const getUserItem = async () => {
  name.value = userStore.name
}
watchEffect(getRouter)
watchEffect(getUserItem)
</script>

<style lang="scss" scoped></style>
