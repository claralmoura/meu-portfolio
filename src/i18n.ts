import { createI18n } from 'vue-i18n'

import pt from './locales/pt.json'
import en from './locales/en.json'

export const messages = {
  pt,
  en,
} as const

export type Locale = keyof typeof messages

export const i18n = createI18n({
  legacy: false,
  locale: navigator.language.startsWith('pt') ? 'pt' : 'en',
  fallbackLocale: 'en',
  messages,
  globalInjection: true,
})

export type I18nMessage = (typeof messages)[Locale]
