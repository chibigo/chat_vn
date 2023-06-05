<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Login from '@/views/LoginView.vue'
</script>

<template>
  <q-layout>
    <q-page-container v-if="true">
      <Login />
    </q-page-container>
    <q-page-container v-else>
      <Header />
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
