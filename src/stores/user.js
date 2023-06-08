import { defineStore } from 'pinia'
export const userLoginStore = defineStore('user', {
  state: () => {
    return {
      name: ''
    }
  },
  persist: true
})
