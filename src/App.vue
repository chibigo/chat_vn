<script setup>
import { RouterView } from 'vue-router'
import route from '@/router'
import Header from '@/components/Header.vue'
import { ref, watchEffect } from 'vue'
let isLogin = ref(false)

const isCheckRouter = () => {
  const routeItem = route.currentRoute.value.path
  if (routeItem !== '/login' && routeItem !== '/register') {
    isLogin.value = true
    return
  }
  isLogin.value = false
  return
}
watchEffect(isCheckRouter)
</script>

<template>
  <q-layout>
    <q-page-container>
      <Header v-if="isLogin" />
      <RouterView :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
