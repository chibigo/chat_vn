import { defineStore } from 'pinia'
export const userLoginStore = defineStore('user', {
  state: () => {
    return {
      id: null,
      name: '',
      image: '',
      isLoggedIn: false
    }
  },
  persist: true
})
