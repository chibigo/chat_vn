<template>
  <div class="q-gutter-y-md">
    <q-tabs
      v-model="tab"
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-primary text-white shadow-2"
    >
      <q-route-tab :to="'/'" name="home" icon="home" :label="$t('nav.home')" />
      <q-route-tab :to="'/chats'" name="Chat" icon="chat" :label="$t('nav.chat')" />
      <q-route-tab :to="'/photos'" name="photos" icon="photo" :label="$t('nav.photo')" />
      <q-route-tab
        :to="'/videos'"
        name="videos"
        icon="slow_motion_video"
        :label="$t('nav.video')"
      />
      <q-route-tab color="primary" :label="$t('nav.product')">
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
      <I18nComp class="q-ml-auto" />
      <ButtonProfileComp :name="name" />
    </q-tabs>
  </div>
  <div>
    <Breadcrumbs :breadcrumbsList="breadcrumbsList" />
  </div>
</template>

<script setup>
import route from '@/router'
import { ref, watchEffect } from 'vue'
import { userLoginStore } from '@/stores/user.js'
import ButtonProfileComp from '@/components/buttons/buttonProfileComp.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import I18nComp from '@/components/buttons/i18nComp.vue'

const tab = ref('home')
const name = ref('No_name')
let breadcrumbsList = ref([])
const userStore = userLoginStore()

const getRouter = () => {
  breadcrumbsList.value = route.currentRoute.value.matched
}

const getUserItem = async () => {
  name.value = userStore.name
}
watchEffect(getRouter)
watchEffect(getUserItem)
</script>

<style lang="scss" scoped></style>
