import { defineStore } from 'pinia'
export const breadCrumbStore = defineStore('breadCrumb', {
  state: () => {
    return {
      breadItem: []
    }
  },
  persist: true
})
