import { defineStore } from 'pinia'
export const userLoginStore = defineStore('user', {
  state: () => {
    return {
      id: null,
      name: '',
      isLoggedIn: false
    }
  },
  persist: true
})
