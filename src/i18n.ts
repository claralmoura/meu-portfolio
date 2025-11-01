import { createI18n } from 'vue-i18n'

type MessageSchema = typeof import('./locales/pt.json')
const files = import.meta.glob<Record<string, any>>('./locales/*.json', { eager: true })

const messages = Object.fromEntries(
  Object.entries(files).map(([path, module]) => {
    const localeName = path.match(/\/(\w+)\.json$/)?.[1] || path
    return [localeName, module.default as MessageSchema]
  })
)

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages,
})

export default i18n