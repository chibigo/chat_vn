<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Login from '@/views/LoginView.vue'
import { auth } from '@/firebase/index'
import { ref, watch, computed } from 'vue'
let isLogin = ref(true)
</script>

<template>
  <q-layout>
    <q-page-container>
      <Header v-if="$route.path !== '/login'" />
      <RouterView :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
