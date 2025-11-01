import { createI18n } from 'vue-i18n'

import pt from './locales/pt.json'
import en from './locales/en.json'

const messages = {
  pt: pt,
  en: en
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages,
})

export default i18n