<template>
  <div>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="info" icon="info" label="Infos" />
          <q-tab name="password" icon="password" label="Change Password" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="info">
            <div class="text-h4 q-mb-md">Thông tin của bạn</div>
            <InfoUserComp />
          </q-tab-panel>

          <q-tab-panel name="password">
            <div class="text-h4 q-mb-md">Thay đổi mật khẩu</div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InfoUserComp from '@/components/profiles/InfoUserComp.vue'
const tab = ref('info')
const splitterModel = ref(10)
</script>

<style lang="scss" scoped></style>
