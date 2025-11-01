import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<Record<string, any>>('./locales/*.json', { eager: true })
  ).map(([key, value]) => {
    const localeName = key.match(/\.\/locales\/(.*)\.json/)?.[1] || key
    return [localeName, value.default] as const
  })
)

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages,
})

export default i18n