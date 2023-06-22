import { defineStore } from 'pinia'
export const useLoadingStore = defineStore('isLoading', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    setLoading(status) {
      this.isLoading = status
    }
  }
})
