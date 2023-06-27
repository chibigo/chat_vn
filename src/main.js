import './assets/main.css'
import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from './i18n'

import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)
app.use(Quasar, {
  plugins: { Notify }
})
app.mount('#app')
