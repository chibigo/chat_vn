import { createI18n } from 'vue-i18n'
import En from './locales/en.json'
import Vi from './locales/vi.json'

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCAL,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCAL,
  legacy: false,
  globalInjection: true,
  messages: { En, Vi }
})
