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
      <q-route-tab :to="'/about'" name="about" icon="alarm" label="About" />
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
    </q-tabs>
  </div>
  <div>
    <Breadcrumbs :breadcrumbsList="breadcrumbsList" />
  </div>
</template>

<script setup>
import Breadcrumbs from './Breadcrumbs.vue'
import { ref, watch } from 'vue'
import route from '@/router'

const tab = ref('home')
let breadcrumbsList = ref([])

const getRouter = () => {
  breadcrumbsList.value = route.currentRoute.value.matched
}

watch(() => {
  getRouter()
})
</script>

<style lang="scss" scoped></style>
